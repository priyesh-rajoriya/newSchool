import React, { Component } from "react";
import { View, Modal, ActivityIndicator } from "react-native";

export default class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          transparent={true}
          supportedOrientations={["portrait", "landscape"]}
          visible={this.state.isLoading}
          onRequestClose={() => console.log("sdfdf")}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-around",
              backgroundColor: "#00000040"
            }}
          >
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around"
              }}
            >
              <ActivityIndicator color={"white"} size="large" />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
