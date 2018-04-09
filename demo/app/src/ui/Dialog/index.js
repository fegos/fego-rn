import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Button, Dialog } from 'fego-rn';
import { Style } from '../../../common';


export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      fullScreenDialogVisible: false,
    };
  }

  render() {
    return (
      <ScrollView style={Style.container}>
        <Text style={Style.title}>Dialog</Text>
        <Button onPress={() => { this.setState({ dialogVisible: true }); }}>普通对话框</Button>
        <Dialog
          title="标题"
          visible={this.state.dialogVisible}
          onClose={() => this.setState({ dialogVisible: false })}
          footer={[
            { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
            { text: '确定', onPress: () => console.log('ok'), style: 'confirm' },
          ]}
        >
          <View>
            <Text style={{ color: '#333' }}>简单的对话框</Text>
          </View>
        </Dialog>

        <Button onPress={() => { this.setState({ dialog2Visible: true }); }}>多按钮对话框</Button>
        <Dialog
          title="标题"
          visible={this.state.dialog2Visible}
          onClose={() => this.setState({ dialog2Visible: false })}
          footer={[
            { text: '按钮1', style: 'cancel' },
            { text: '按钮2' },
            { text: '按钮3' },
            { text: '按钮4', style: 'confirm' },
          ]}
        >
          <View>
            <Text style={{ color: '#333' }}>多按钮对话框</Text>
          </View>
        </Dialog>

        <Button onPress={() => { this.setState({ fullScreenDialogVisible: true }); }}>全屏对话框</Button>
        <Dialog
          fullScreen
          visible={this.state.fullScreenDialogVisible}
        >
          <View>
            <Text style={{ color: '#333' }}>全屏对话框</Text>
            <Button onPress={() => this.setState({ fullScreenDialogVisible: false })}>关闭</Button>
          </View>
        </Dialog>
        <Text style={Style.title}>Dialog.tip/alert/confirm</Text>
        <Button onPress={() => Dialog.tip('删除', '确定删除么???', [
          { text: '不好', onPress: () => console.log('cancel') },
          { text: '可以', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
        ])}
        >自定义按钮tip
        </Button>
        <Button onPress={() => Dialog.alert('新密码须至少包含1个字母和1个数字，6-10位')}>alert</Button>
        <Button onPress={() => Dialog.confirm('你很帅吗？', (btn) => {
          if (btn.type === 'confirm') {
            Dialog.alert('你很自信嘛！');
          } else {
            Dialog.alert('这就对了！');
          }
        })}
        >confirm
        </Button>
        <Button onPress={() => Dialog.confirm(<Text style={{ color: '#338811' }}>这窗口点确定是没用的</Text>, (btn) => {
          if (btn.type === 'confirm') {
            return false;
          } else {
            return true;
          }
        })}
        >可判断是否关闭
        </Button>
        <Button onPress={() => { /* 假如有弹出多个弹窗的需求，需要使用timeout */
          Dialog.alert('第一个');
          Dialog.alert('第二个');
          setTimeout(() => {
            Dialog.alert('第三个');
            setTimeout(() => {
              Dialog.alert('第四个');
            }, 1000);
          }, 200);
        }}
        >连续弹出多个Dialog(使用示例)
        </Button>
        <Button onPress={() => Dialog.confirm('动画结束回调', (btn, aniEnd) => {
          console.log('按钮被点击，但动画未结束');
          aniEnd(() => {
            console.log('动画结束后才执行');
          });
        })}
        >动画结束回调
        </Button>
      </ScrollView>
    );
  }
}
