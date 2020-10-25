import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  onFindPetsClick = async () => {
    let url;
    if (this.state.filters.type === "all") {
      url = "/api/pets";
    } else {
      url = `/api/pets?type=${this.state.filters.type}`;
    }
    let res = await fetch(url);
    let data = await res.json();
    this.setState({
      pets: data,
    });
  };

  onChangeType = (e) => {
    this.setState({
      filters: { type: e.target.value },
    });
  };

  onAdoptPet = (id) => {
    let pets = this.state.pets.map((pet) => {
      if (pet.id === id) {
        return { ...pet, isAdopted: true };
      } else {
        return pet;
      }
    });
    this.setState({
      pets: pets,
    });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onFindPetsClick={this.onFindPetsClick}
                onChangeType={this.onChangeType}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
