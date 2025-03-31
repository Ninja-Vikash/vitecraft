export const imageCardContent = `import { ImageBase } from "@components/ui/extended";
import { Card } from "@mui/material";

const ImageCard = ({ src, elevation = 2, sx = {} }) => {
  return (
    <Card
      elevation={elevation}
      sx={{
        p: 1.5,
        bgcolor: "#313131",
        borderRadius: "12px",
        width: "max-content",
        display: "flex",
        alignItems: "center",
        ...sx,
      }}
    >
      <ImageBase src={src} sx={{ height: "40px" }} />
    </Card>
  );
};

export default ImageCard;
`;
