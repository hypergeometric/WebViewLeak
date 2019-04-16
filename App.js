import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default class App extends Component {
  state = { messageCount: 0 };

  render() {
    const html = `
      <html>
      <head></head>
      <body>
        <script>
          const message = "Hello!".repeat(1000000);
          setInterval(function () {
            window.ReactNativeWebView.postMessage(message);
          }, 1000);
        </script>
      </body>
      </html>
    `;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ height: 0 }}>
          <WebView
            originWhitelist={['*']}
            source={{ html }}
            onMessage={() => {
              this.setState(state => ({
                messageCount: state.messageCount + 1
              }));
            }}
          />
        </View>
        <Text style={{ fontSize: 20 }}>{this.state.messageCount}</Text>
      </View>
    );
  }
}
