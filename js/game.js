var React = require('react'),
    _ = require('lodash'),
    Board = require('./board'),
    WordForm = require('./word-form');

var Game = React.createClass({
    // 初始化 state，这里我们使用了 words 数组，用于保存输入的文字
    getInitialState: function () {
        return {words: undefined};
    },
    // 开始游戏
    startGame: function (words) {
        this.setState({
            // 组合并打乱输入的文字
            words: _.shuffle(words.concat(words))
        });
    },
    // 结束游戏，设置 words 为 undefined
    endGame: function () {
        this.setState({words: undefined});
    },
    // 根据 words 来显示我们自定义的组件
    render: function () {
        return (
            this.state.words ?
                <Board onEndGame={this.endGame} words={this.state.words}/> :
                <WordForm onWordsEntered={this.startGame} />
        );
    }
});

module.exports = Game;