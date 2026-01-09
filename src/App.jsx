import "./App.css";
import GallerySideScroll from "./components/Gallery/GallerySideScroll";
import LilDeath from "./components/LilDeath/LilDeath";
import Section from "./components/Section/Section";

function App() {
    return (
        <div className="App">
          <LilDeath/>
            <Section title="LilDeaths Spookie Gallery" />
            <GallerySideScroll />
            <Section title="End of the gallery" />
        </div>
    );
}

export default App;