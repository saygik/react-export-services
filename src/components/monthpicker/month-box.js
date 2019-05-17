import React, {Component} from 'react'

class MonthBox extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            value: this.props.value || 'Н/О',
        }
        this._handleClick = this._handleClick.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            value: nextProps.value || 'Н/О',
        })
    }
    render() {
        return (
            <span className="box" onClick={this._handleClick}>
                <label>{this.state.value}</label>
            </span>
        )
    }

    _handleClick(e) {
        this.props.onClick && this.props.onClick(e)
    }
}

export default MonthBox
