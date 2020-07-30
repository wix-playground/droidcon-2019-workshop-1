import profiler from './benchmarking/ScreenProfiler';
import {CHARACTERS_LIST, HERO_DETAILS} from '../index';
import {Navigation} from 'react-native-navigation';
import {View, Button, Text, TextInput} from 'react-native-ui-lib';
import React from 'react';

const TestController = props => {
  const {
    componentId,
    thisComponentName,
    otherComponentName,
    instanceId,
  } = props;
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
                  await Navigation.push(componentId, {
                    component: {
                      name: thisComponentName,
                      passProps: {
                        ...props,
                        scenario,
                        instanceId: nextInstanceId,
                      },
                      options: {
                        animations: {
                          push: {
                            waitForRender: true,
                          },
                        },
                      },
                    },
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
                  await Navigation.push(componentId, {
                    component: {
                      name: otherComponentName,
                      passProps: {
                        scenario,
                        instanceId: nextInstanceId,
                      },
                      options: {
                        animations: {
                          push: {
                            waitForRender: true,
                          },
                        },
                      },
                    },
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
