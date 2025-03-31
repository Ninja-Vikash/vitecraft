export function appJsxContent(framework) {
    if (framework === "Material UI") {
        return `import ImageCard from "@components/ImageCard";
import { ImageBase } from "@components/ui/extended";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [isOn, setIsOn] = useState(false);

  const iconsData = [
    { src: "react.svg", elevation: 1 },
    { src: "tailwindcss.svg", elevation: 0 },
    { src: "material-ui.svg", elevation: 2 },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
          <ImageBase src="flash.svg" sx={{ height: "160px" }} />
          <Box sx={{ mt: 1, mb: 2, display: "flex", gap: 1, justifyContent: "center" }}>
            {iconsData.map((props, index) => (
              <ImageCard {...props} key={index} />
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              component="span"
              sx={{
                fontSize: "20px",
                letterSpacing: "0.05em",
                fontWeight: 400,
                fontFamily: "sans-serif",
                textAlign: "center",
                bgcolor: "#333",
                color: "#bbb",
                py: 0.5,
                px: 1.5,
                borderRadius: "8px",
                width: "max-content",
              }}
            >
              <code>npx flash-setup</code>
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            disableElevation
            color={isOn ? "error" : "success"}
            onClick={() => setIsOn((prev) => !prev)}
            sx={{
              px: 4,
              py: 2,
              borderRadius: "12px",
              fontWeight: "600",
            }}
          >
            {isOn ?"OFF" : "ON"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
`
    }
    return `import { useState } from "react";
import "./App.css";

const App = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="App min-h-screen bg-zinc-950 flex items-center justify-center">
            <div>
                <div className="flex flex-col mb-2">
                    <img src="thunder.svg" alt="thunder" className="h-48" />
                    <h1 className="text-3xl -translate-y-4 tracking-wider text-zinc-50 font-light font-sans text-center">
                        Streamline your react development!
                    </h1>
                    <p className="text-xl text-zinc-600 text-center">with the flash</p>
                </div>
                <div className="card flex flex-col items-center justify-center">
                    <button
                        onClick={() => setCount((count) => count + 1)}
                        className="bg-zinc-50 px-4 py-2 rounded-xl font-semibold"
                    >
                        Count is {count}
                    </button>
                    <p className="text-zinc-300 mt-4">
                        Edit <code>src/App.jsx</code> and save to test HMR
                    </p>
                </div>
            </div>
        </div>
    );
};

export default App;
`;
}
