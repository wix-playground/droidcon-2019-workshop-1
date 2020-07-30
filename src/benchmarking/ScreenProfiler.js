const RNFS = require('react-native-fs');

function ScreenProfiler() {
  function aggregateSamples(samples) {
    return Object.keys(samples || {}).reduce((acc, screenName) => {
      Object.keys(samples[screenName] || {}).forEach(instanceId => {
        const samplesPerInstance = samples[screenName][instanceId];
        if (samplesPerInstance.length === 0) {
          console.warn(
            `No samples for instanceId: ${instanceId} at ${screenName}.`,
          );
        } else if (samplesPerInstance.length % 2 !== 0) {
          console.warn(
            `Uneven samples for instanceId: ${instanceId} at ${screenName}.`,
          );
        } else {
          for (let i = 0; i < samplesPerInstance.length; i += 2) {
            acc.push({
              screenName,
              instanceId: `${screenName} (${instanceId})`,
              start: samplesPerInstance[i],
              end: samplesPerInstance[i + 1],
            });
          }
        }
      });
      return acc;
    }, []);
  }

  function sortedSamples(samples) {
    return aggregateSamples(samples).sort(
      (sample1, sample2) => sample1.start - sample2.start,
    );
  }

  function processData(samples) {
    const loadTimesPerScreen = {};
    let accumulatedLoadTime = 0;
    const processedData = sortedSamples(samples).reduce((acc, sample) => {
      const loadTime = sample.end - sample.start;
      const screenLoadTimes = loadTimesPerScreen[sample.screenName] || [];
      screenLoadTimes.push(loadTime);
      loadTimesPerScreen[sample.screenName] = screenLoadTimes;
      accumulatedLoadTime += loadTime;
      acc.push({
        screenName: sample.screenName,
        instanceId: sample.instanceId,
        startDate: new Date(sample.start).toISOString(),
        endDate: new Date(sample.end).toISOString(),
        loadTime,
        accumulatedLoadTime,
      });
      return acc;
    }, []);
    const avgLoadTimes = Object.keys(loadTimesPerScreen).reduce(
      (acc, screenName) => {
        acc[screenName] =
          loadTimesPerScreen[screenName].reduce((sum, time) => sum + time, 0) /
          loadTimesPerScreen[screenName].length;
        return acc;
      },
      {},
    );
    processedData.forEach(data => {
      data.avgLoadTime = avgLoadTimes[data.screenName];
    });
    return processedData;
  }

  const scenarios = {};
  let context = null;

  return {
    scenario(name) {
      if (!scenarios[name]) {
        scenarios[name] = {};
      }
      const samples = scenarios[name];
      return {
        sample(screenName, instanceId) {
          console.log(
            `Sampling ${screenName} with ${instanceId} for scenario ${name}`,
          );
          const screenSamples = samples[screenName] || {};
          const instanceSamples = screenSamples[instanceId] || [];

          instanceSamples.push(new Date().getTime());

          screenSamples[instanceId] = instanceSamples;
          samples[screenName] = screenSamples;
        },
        exportSamples() {
          console.log(`Exporting samples for scenario ${name}`);
          const processedData = processData(samples);
          const formatted = jsonToCsv(processedData);
          const path = `${RNFS.DocumentDirectoryPath}/benchmarks_${
            context ? context + '_' : ''
          }${name}_${new Date().getTime()}.csv`;
          return RNFS.writeFile(path, formatted, 'utf8');
        },
      };
    },
    context(description) {
      context = description;
    },
    clear() {
      return RNFS.readDir(RNFS.DocumentDirectoryPath).then(items => {
        return items
          .filter(({name}) => name.isFile() && name.includes(context))
          .map(({path}) => RNFS.unlink(path));
      });
    },
  };
}

function jsonToCsv(processedData) {
  return processedData.reduce((formatted, data, index) => {
    if (index === 0) {
      formatted = Object.keys(data).join(', '); // CSV header row
    }
    return (
      formatted +
      '\n' +
      Object.values(data)
        .map(value => value.toString())
        .join(',')
    );
  }, '');
}

const profiler = new ScreenProfiler();
export default profiler;
