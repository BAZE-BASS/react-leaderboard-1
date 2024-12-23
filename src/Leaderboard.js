import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import './styles.css';

/**
 * @class Leaderboard
 * @desc Leaderboard component to display user rankings.
 * @param {Prop} users - an array of objects with name and score properties.
 * @param {Prop} paginate - number of users to display on each page.
 */
class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.sortUsersByScore = this.sortUsersByScore.bind(this);
    this.sortUsersByName = this.sortUsersByName.bind(this);
    this.filterRank = this.filterRank.bind(this);
    this.increasePage = this.increasePage.bind(this);
    this.decreasePage = this.decreasePage.bind(this);

    this.state = {
      users: this.props.users,
      ranking: [],
      asc: false,
      alph: false,
      page: 1,
      pageMax: 1,
    };
  }

  componentDidMount() {
    const ranking = [...this.state.users];
    const paginate = this.props.paginate;
    ranking.sort(this.compareScore).reverse();
    ranking.forEach((user, index) => {
      user.rank = index + 1;
      user.page = Math.ceil((index + 1) / paginate);
    });
    this.setState({
      ranking: ranking,
      pageMax: ranking[ranking.length - 1].page,
    });
  }

  compareScore(a, b) {
    return a.score - b.score;
  }

  compareName(a, b) {
    return a.name.localeCompare(b.name);
  }

  sortUsersByScore() {
    const ranking = [...this.state.ranking];
    const paginate = this.props.paginate;
    const asc = !this.state.asc;
    ranking.sort(this.compareScore);
    if (!asc) ranking.reverse();
    ranking.forEach((user, index) => (user.page = Math.ceil((index + 1) / paginate)));
    this.setState({ ranking, asc, alph: false });
  }

  sortUsersByName() {
    const ranking = [...this.state.ranking];
    const paginate = this.props.paginate;
    const alph = !this.state.alph;
    ranking.sort(this.compareName);
    if (!alph) ranking.reverse();
    ranking.forEach((user, index) => (user.page = Math.ceil((index + 1) / paginate)));
    this.setState({ ranking, alph, asc: false });
  }

  filterRank(e) {
    const search = e.target.value.toLowerCase();
    const ranking = this.state.users.filter((user) => user.name.toLowerCase().startsWith(search));
    const paginate = this.props.paginate;
    ranking.sort(this.compareScore).reverse();
    ranking.forEach((user, index) => (user.page = Math.ceil((index + 1) / paginate)));
    this.setState({ ranking, page: 1, pageMax: ranking.length ? ranking[ranking.length - 1].page : 1 });
  }

  increasePage() {
    this.setState((prevState) => ({ page: Math.min(prevState.page + 1, prevState.pageMax) }));
  }

  decreasePage() {
    this.setState((prevState) => ({ page: Math.max(prevState.page - 1, 1) }));
  }

  render() {
    return (
      <div>
        <Header />
        <table id="lBoard">
          <thead>
            <tr>
              <td colSpan="3">
                <h1>Leaderboard</h1>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <form>
                  Name: <input type="search" placeholder="Search" onChange={this.filterRank} />
                </form>
              </td>
            </tr>
            <tr>
              <th className="rank-header sortScore" onClick={this.sortUsersByScore}>
                Rank
              </th>
              <th className="rank-header sortAlpha" onClick={this.sortUsersByName}>
                Name
              </th>
              <th className="rank-header" onClick={this.sortUsersByScore}>
                Score
              </th>
            </tr>
          </thead>
          <tbody className="ranking">
            {this.state.ranking.map((user) => {
              if (user.page === this.state.page) {
                const rankClass =
                  user.rank === 1
                    ? "first-place"
                    : user.rank === 2
                    ? "second-place"
                    : user.rank === 3
                    ? "third-place"
                    : "normal-rank";
                return (
                  <tr key={user.rank} className={`ranking-row ${rankClass}`}>
                    <td className="data">{user.rank}</td>
                    <td className="data">{user.name}</td>
                    <td className="data">{user.score}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
        <div className="pagination">
          {this.state.page > 1 && <button onClick={this.decreasePage}>Prev</button>}
          <span>Page {this.state.page} of {this.state.pageMax}</span>
          {this.state.page < this.state.pageMax && <button onClick={this.increasePage}>Next</button>}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Leaderboard;
