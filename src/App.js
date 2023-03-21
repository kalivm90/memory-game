import React, { useEffect, useState } from 'react';

import Card from './components/Card';
import Navbar from './components/Navbar';

import './App.css';


const App = () => {
  const [imageSources, setImageSources] = useState([]);

  // count of correct guesses
  const [count, setCount] = useState(0);
  // list of already picked images
  const [clickedImages, setClickedImages] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [message, setMessage] = useState("Try not to click on the same character twice!");

  // shuffles order of images 
  const shuffle = (array) => {
    let copy = array
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy

  }

  // when image is clicked shuffle list and update
  const handleClick = (e) => {    
    // not in list
    if (!clickedImages.includes(e.target.id)) {
      setMessage("Good Job!")
      setCount(count + 1);
      setClickedImages([...clickedImages, ...e.target.id])
    } else {
      if (count > bestScore) {
        setBestScore(count)
      }
      setMessage("OOF! Better luck next time")
      setCount(0)
      setClickedImages([]);
    }

    const newArray = shuffle(imageSources)
    setImageSources([...newArray]);
  }

  // import and consolidate images
  useEffect(() => {
    const importImages = async () => {

      const imageNames = [
        {"src": "bart.jpeg", "name": "Bart Simpson"},
        {"src": "bubbles.png", "name": "Bubbles"},
        {"src": "bugs.jpg", "name": "Bugs Bunny"},
        {"src": "dexter.webp", "name": "Dexter"},
        {"src": "johnny.webp", "name": "Johnny Bravo"},
        {"src": "mickey.jpg", "name": "Mickey Mouse"},
        {"src": "peppa.webp", "name": "Peppa Pig"},
        {"src": "pikachu.webp", "name": "Pikachu"},
        {"src": "scrat.webp", "name": "Scrat"},
        {"src": "sponge.webp", "name": "SpongeBob"},
        {"src": "timmy.jpeg", "name": "Timmy Turner"},
        {"src": "tom.png", "name": "Tom"},
      ]

      const imports = imageNames.map(imageName => import(`./assets/images/${imageName.src}`));

      const sources = await Promise.all(
        imports.map(async (importedModule, index) => ({
          src: (await importedModule).default,
          name: imageNames[index].name,
          key: index,
        }))
      );

      setImageSources(sources);
    };

    importImages();
  }, []);


  return (
    <div className='App'>
      <Navbar count={count} bestScore={bestScore} message={message}/>
      <div className='App-Main'>
        {imageSources.map(image => {
          return <Card image={image} click={handleClick}/> 
        })}
      </div>
    </div>
  );
};

export default App;

