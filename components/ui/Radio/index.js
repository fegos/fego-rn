/**
 * Radio
 * @author esky
 */
import Group from '../Group';

export default class Radio extends Group.Item {
  static defaultProps = {
    // 禁止操作
    disabled: false,
    // 非控属性：默认选中状态，
    defaultChecked: false,
    // 选中态图标
    iconCheckName: 'dot-circle-o',
    // 未选中态图标
    iconUncheckName: 'circle-o',
    // 图标位置
    left: true,
  }
}
