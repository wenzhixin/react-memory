var React = require('react'),
    _ = require('lodash');

var WordForm = React.createClass({
    // 需要提供 onWordsEntered 方法，用于触发提交方法，在 Game 中我们使用了 startGame
    propTypes: {
        onWordsEntered: React.PropTypes.func.isRequired
    },
    // 初始化 error 状态
    getInitialState: function () {
        return {error: undefined};
    },
    // 显示错误信息，2s 后自动消失
    setError: function (msg) {
        this.setState({error: msg});
        setTimeout(function () {
            this.setState({error: ''});
        }.bind(this), 2000);
    },
    // 提交文字信息，判断是否符合条件
    submitWords: function (e) {
        e.preventDefault();

        var node = this.refs.words.getDOMNode(),
            // unique 用于生成唯一的字符
            words = _.unique((node.value || '').trim().split(''));

        if (words.length < 3) {
            this.setError('请至少输入三个不同的字符！');
        } else {
            this.props.onWordsEntered(words);
            node.value = '';
        }
    },
    render: function () {
        return (
            <form className='form-inline' onSubmit={this.submitWords}>
                <span>请输入你想记忆的字符：</span>
                <input className='form-control' type='text' ref='words' maxLength='10'
                    defaultValue='文字记忆游戏' />
                <button className='btn btn-default' type='submit'>开始记忆</button>
                <p className='error'>{this.state.error}</p>
            </form>
        );
    }
});

module.exports = WordForm;