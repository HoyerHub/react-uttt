import React, {Component} from 'react';
import './Latency.css';

class Latency extends Component {
    render() {
        return (
            <div className="latency">
                Latency: {this.props.latency} ms
            </div>
        );
    }
}

export default Latency;