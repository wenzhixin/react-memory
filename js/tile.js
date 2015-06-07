var React = require('react');

var Tile = React.createClass({
    propTypes: {
        status: React.PropTypes.string.isRequired,
        word: React.PropTypes.string.isRequired
    },
    render: function () {
        return (
            <div className={'brick ' + this.props.status}>
                <div className='front'><i className='glyphicon glyphicon-question-sign'></i></div>
                <div className='back'>{this.props.word}</div>
            </div>
        );
    }
});

module.exports = Tile;