var React = require('react'),
    _ = require('lodash'),
    Tile = require('./tile'),
    Status = require('./status');

var Board = React.createClass({
    // 需要提供 words 属性，以及 onEndGame 方法，分别对应 Game 的属性和方法
    propTypes: {
        words: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        onEndGame: React.PropTypes.func.isRequired
    },
    // 在组件还未 mount 之前用于计算总共有多少对文字卡片
    componentWillMount: function () {
        this.max = this.props.words.length / 2;
    },
    // State 状态
    // found：表示找到了多少对文字卡片
    // message：显示当前的状态
    // tileStates
    getInitialState: function () {
        return {
            found: 0,
            message: 'chooseTile',
            tileStates: new Array(this.props.words.length + 1).join('unturned ').trim().split(' ')
        };
    },
    // 游戏逻辑的处理方法
    clickedTile: function (index) {
        // 当卡片的状态为 unturned（未翻转）时，才进行处理
        if (this.state.tileStates[index] === 'unturned') {
            // flippedTile 用于保存上个点击的卡片的 index
            if (this.flippedTile === undefined) {
                this.flippedTile = index;
                // 设置状态为 findMate
                this.setState({
                    message: 'findMate',
                    // 使用 lodash 方法，将对应的下标置为 revealed（翻转）状态
                    tileStates: _.extend(this.state.tileStates, _.object([index], ['revealed']))
                });
            } else {
                var otherIndex = this.flippedTile,
                    matched = this.props.words[index] === this.props.words[this.flippedTile];

                if (matched) {
                    // 找到相对应的卡片，found + 1，并将状态置为 foundMate
                    this.setState({
                        found: this.state.found + 1,
                        message: 'foundMate',
                        // 使用 lodash 方法，将对应的下标置为 correct（正确）状态
                        tileStates: _.extend(this.state.tileStates,
                            _.object([index, otherIndex], ['correct', 'correct']))
                    });
                } else {
                    // 没有找到相对应的卡片，将状态置为 wrong
                    this.setState({
                        message: 'wrong',
                        // 使用 lodash 方法，将对应的下标置为 wrong（错误）状态
                        tileStates: _.extend(this.state.tileStates,
                            _.object([index, otherIndex], ['wrong', 'wrong']))
                    });
                }
                // 删除保存的信息
                delete this.flippedTile;

                // 1.5s 后我们将卡片翻转回来
                setTimeout(function () {
                    // 需要判断组件是否 mounted
                    if (this.isMounted()) {
                        // 假如所有都选中了，将状态置为 foundAll
                        this.setState({
                            message: this.state.message === 'findMate' ? 'findMate' :
                                this.max === this.state.found ? 'foundAll' : 'chooseTile',
                            tileStates: matched ? this.state.tileStates : _.extend(this.state.tileStates,
                                _.object([index, otherIndex], ['unturned', 'unturned']))
                        });
                    }
                }.bind(this), 1500);
            }
        }
    },
    render: function () {
        // 使用 map 方式，将所有的卡片显示出来
        var tiles = this.props.words.map(function (word, i) {
            return (
                <div key={i} onClick={_.partial(this.clickedTile, i)}>
                    <Tile word={word} status={this.state.tileStates[i]} />
                </div>
            );
        }.bind(this));
        return (
            <div>
                <button className='btn btn-default' onClick={this.props.onEndGame}>结束记忆</button>
                <Status found={this.state.found} max={this.max} message={this.state.message} />
                {tiles}
            </div>
        );
    }
});

module.exports = Board;