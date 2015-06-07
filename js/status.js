var React = require('react');

var Status = React.createClass({
    propTypes: {
        found: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
        message: React.PropTypes.oneOf([
            'chooseTile', 'findMate', 'wrong', 'foundMate', 'foundAll'
        ]).isRequired
    },
    render: function () {
        var found = this.props.found,
            max = this.props.max,
            texts = {
                chooseTile: '选择一张卡片！',
                findMate: '现在我们来查找相对应的卡片！',
                wrong: '很遗憾，这两张卡片不匹配！',
                foundMate: '不错，他们是一对的！',
                foundAll: '恭喜过关，你已经找到所有' + max + '对卡片了！'
            };
        return (
            <p>({found}/{max})&nbsp;&nbsp;{texts[this.props.message]}</p>
        );
    }
});

module.exports = Status;