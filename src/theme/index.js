import { createMuiTheme } from 'material-ui/styles';
import { amber } from 'material-ui/colors';//https://material-ui.com/style/color/

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#7986cb",
      main: amber['A200'],
      dark: "#303f9f",
      contrastText: "#fff"
    },
  },
});


export default theme