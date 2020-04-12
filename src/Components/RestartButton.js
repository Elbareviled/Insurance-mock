import React from 'react';
class RestartButton extends React.Component {
    render() {
      return ( <button onClick = {this._refreshPage}> Restart </button>);
      }

      _refreshPage() {
        console.log("Clicked");
        window.location.reload();
      }
    }

export default RestartButton