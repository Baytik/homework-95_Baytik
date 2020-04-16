import React, {Component} from 'react';
import {connect} from "react-redux";

class MyIngredients extends Component {
    render() {
        console.log(this.props.user)
        return (
            <div>
                here
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MyIngredients);