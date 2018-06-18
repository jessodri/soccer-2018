import React, { Component } from 'react';
import moment from 'moment'
import './App.css';



class App extends Component {

  state = {
    message: "Hello World",
    matches: null,
    group: {
      name: null
    },
    teams: null
  }

  componentDidMount() {
    this.fetchGroupMatches()
    .catch(err => console.error(err))
  }

  // handleChanges = (value) => {

  //   const message = value

  //   // set state and return new object with message
  //   this.setState(() => ({message}))

  // }

  async fetchGroupMatches() {
    const url = 'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json'
    const response = await fetch(url)
    const data = await response.json()

    const matches = data.groups.a.matches
    const teams = data.teams

    matches.forEach(match => {
      const homeTeam = match.home_team
      const awayTeam = match.away_team

      match.home_team = teams.find(team => homeTeam === team.id)
      match.away_team = teams.find(team => awayTeam === team.id)
    })


    this.setState({
      matches: matches,
      group: {
        name: data.groups.a.name,
      },
      teams: teams
    })
  }
  
  render() {
    const {message, group, matches} = this.state
    
    if(!group.name) {
      return <div className="App">Loading...</div>
    }
    
    const games = matches.map(match => {
      return <div>{
        moment(match.date)
          .format('MMMM Do YYYY h:mm a')
      }</div>
    })

    return (
      <div className="App">
      <h1>{group.name}</h1>
      {games}
      </div>
    );
  }
}

export default App;
