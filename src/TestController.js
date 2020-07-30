import profiler from './benchmarking/ScreenProfiler';
import {View, Button, Text, TextInput} from 'react-native-ui-lib';
import React from 'react';

const TestController = props => {
  const {
    thisComponentName,
    otherComponentName,
    otherProps = {},
    instanceId,
    navigation,
  } = {
    ...props,
    ...(props.route && props.route.params),
  };
  return (
    <>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          left: 0,
          bottom: 0,
        }}>
        <View row>
          <TextInput
            testID={'context'}
            placeholder={'Context'}
            onChangeText={text => {
              profiler.context(text);
            }}
          />
          <Button
            testID="clear"
            label="Clear"
            onPress={async () => {
              await profiler.clear();
            }}
          />
        </View>
        {['constructor', 'appear', 'render'].map(scenario => {
          const nextInstanceId = (instanceId || 0) + 1;
          return (
            <View row>
              <Button
                testID={`push-self-${scenario}`}
                label={`S(${scenario})`}
                centerH
                onPress={async () => {
                  profiler
                    .scenario(scenario)
                    .sample(thisComponentName, nextInstanceId);
                  await navigation.push(thisComponentName, {
                    ...props,
                    scenario,
                    instanceId: nextInstanceId,
                  });
                }}
              />
              <Button
                testID={`push-other-${scenario}`}
                label={`P(${scenario})`}
                centerH
                onPress={async () => {
                  profiler
                    .scenario(scenario)
                    .sample(otherComponentName, nextInstanceId);
                  await navigation.push(otherComponentName, {
                    scenario,
                    instanceId: nextInstanceId,
                    ...otherProps,
                  });
                }}
              />
              <Button
                testID={`export-${scenario}`}
                label={'Finish'}
                onPress={async () => {
                  await profiler.scenario(scenario).exportSamples();
                }}
              />
            </View>
          );
        })}
      </View>
    </>
  );
};

export default TestController;
