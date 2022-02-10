const sounds = [
  {
    id: "Kick 1",
    text: "Q",
    url: "http://www.denhaku.com/r_box/tr707/bd2.wav",
  },
  {
    id: "Kick 2",
    text: "W",
    url: "http://www.denhaku.com/r_box/sr16/sr16bd/roomkik1.wav",
  },
  {
    id: "Hi Hat 1",
    text: "E",
    url: "https://bigsoundbank.com/UPLOAD/wav/2303.wav",
  },
  {
    id: "Loud kick",
    text: "A",
    url:
      "https://dight310.byu.edu/media/audio/FreeLoops.com/1/1/Bass%20Drum%206-9186-Free-Loops.com.mp3",
  },
  {
    id: "Cymbal",
    text: "S",
    url:
      "https://dight310.byu.edu/media/audio/FreeLoops.com/1/1/909%20Crash%2003-5820-Free-Loops.com.mp3",
  },
  {
    id: "Cymbal 2",
    text: "D",
    url:
      "https://dight310.byu.edu/media/audio/FreeLoops.com/1/1/909%20Crash%2001-5826-Free-Loops.com.mp3",
  },
  {
    id: "Snare",
    text: "Z",
    url:
      "https://dight310.byu.edu/media/audio/FreeLoops.com/2/2/DnB%20Snare%2017-9453-Free-Loops.com.mp3",
  },
  {
    id: "Snare 2",
    text: "X",
    url:
      "https://dight310.byu.edu/media/audio/FreeLoops.com/3/3/Free%20Drum%20Snare%209-963-Free-Loops.com.mp3",
  },
  {
    id: "Hi Hat",
    text: "C",
    url:
      "https://dight310.byu.edu/media/audio/FreeLoops.com/4/4/HiHat%2008.wav-9252-Free-Loops.com.mp3",
  },
];

function PowerButton({ handlePower, power }) {
  return (
    <div className="power-btn" onClick={handlePower}>
      <i className={power ? `fas fa-power-off play` : `fas fa-power-off `} />
    </div>
  );
}

function Display({ display }) {
  return <div id="display">{display}</div>;
}

function Pad({ id, text, url, playSound, power }) {
  return (
    <div
      className="drum-pad"
      id={id}
      onClick={() => playSound(text, id, power)}
    >
      {text}
      <audio
        src={url}
        type="audio/wav"
        className="clip"
        id={text}
        muted={!power && true}
      />
    </div>
  );
}

function PadsTable({ sounds, playSound, power }) {
  return (
    <div className="pads-table">
      {sounds.map((sound) => {
        const { id, text, url } = sound;
        return (
          <Pad
            key={id}
            id={id}
            text={text}
            url={url}
            playSound={playSound}
            power={power}
          />
        );
      })}
    </div>
  );
}

const usePlay = () => {
  const [display, setDisplay] = React.useState("");

  const playSound = (text, id, power) => {
    const sound = document.getElementById(text);
    sound.play();
    if (power) {
      setDisplay(id);
    } else {
      setDisplay("");
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", (e) => {
      const key = e.key.toUpperCase();
      const sound = sounds.find((item) => item.text === key);
      const text = sound.id;
      playSound(key, text);
      setDisplay(text);
    });
  }, [display]);

  return [display, playSound];
};

function App({ sounds }) {
  const [display, playSound] = usePlay(on);
  const [on, setOn] = React.useState(true);

  const handlePower = () => {
    if (on) {
      setOn(false);
    } else {
      setOn(true);
    }
  };

  return (
    <section id="drum-machine">
      <PadsTable sounds={sounds} playSound={playSound} power={on} />
      <div className="container">
        <Display display={display} />
        <PowerButton handlePower={handlePower} power={on} />
      </div>
    </section>
  );
}

ReactDOM.render(<App sounds={sounds} />, document.getElementById("root"));
