import React from 'react';
import {
  CssBaseline,
  Container,
  Box,
  Typography,
  Link,
  Button,
  Hidden,
} from '@material-ui/core';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { Language, Menu } from '@material-ui/icons';

import NavBar from './components/NavBar';
import NavHotItemCard from './components/NavHotItemCard';
import NavItemCard from './components/NavItemCard';

import { get } from './services/fetch';

import './App.css';

import LogoImg from './assets/agile123-logo.svg';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff7828',
      contrastText: '#fff',
    },
  },
});

const translation = {
  zh: {
    subTitle: '敏捷学习资源大全',
    more: '一起发现更多资源',
    submit: '提　交',
  },
  en: {
    subTitle: 'A Portal for awesome Agile learning resources',
    more: 'Discover more resources',
    submit: 'Submit',
  }
}

class App extends React.Component {

  state = {
    footerVisible: false,
    tagList: [],
    navList: [],

    language: 'zh',
    drawerVisible: false,
  }

  componentDidMount() {
    this.fetchTagList();
    this.fetchNavList();
  }

  fetchTagList = async (navList) => {
    const res = await get('/tagList.json');
    //const res = await get(`${jsonHost}/main/tagList.json`);
    if (res && (res || []).length) {
      this.setState({
        tagList: res,
      });
    }
  }

  fetchNavList = async () => {
    const res = await get('/resource.json');
    //const res = await get(`${jsonHost}/main/resource.json`);
    if (res && (res || []).length) {
      this.setState({
        navList: res,
        footerVisible: true,
      });
    }
  }

  translate = (key) => {
    const { language } = this.state;
    return translation[language][key];
  }

  render() {

    const {
      navList,
      tagList,
      footerVisible,
      language,

      drawerVisible,
    } = this.state;

    const t = this.translate;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt={{ xs: 1, sm: 2 }}>
            <Hidden lgUp>
              <Box
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  this.setState({
                    drawerVisible: true,
                  });
                }}>
                <Menu />
              </Box>
            </Hidden>
            <Box flex="1" />
            <Button
              disableElevation={true}
              variant="outlined"
              onClick={() => {
                this.setState({
                  language: language === 'zh' ? 'en' : 'zh',
                })
              }}
              size="small"
              startIcon={<Language />}
              className="languageBtn"
              style={{ textTransform: 'none' }}>
              <Box fontWeight="400" className="languageBtn_text">
                {language === "zh" ? '中文' : 'English'}
              </Box>
            </Button>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mb={{ xs: 2, sm: 3, md: 4 }}>
            <Box mb={{ xs: .5, sm: 1 }}>
              <a href="https://agile123.net/"><img src ={LogoImg} style={{height: "100px"}} alt="" /></a>
            </Box>
            <Box>
              <Typography color="textSecondary">
                -- {t('subTitle')} --
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row">
            <NavBar
              tagList={tagList}
              language={language}
              key={`NavBar-${(tagList || []).length}`}
              drawerVisible={drawerVisible}
              onClose={() => {
                this.setState({ drawerVisible: false });
              }}
            />
            <Box flex="1" />
            <Box className="tagContent" key={(navList || []).length}>
              <NavHotItemCard
                navList={navList}
                tagList={tagList}
              />
              <NavItemCard
                navList={navList}
                tagList={tagList}
                language={language}
              />
            </Box>
            <Hidden lgUp>
              <Box flex="1" />
            </Hidden>
          </Box>
        </Container>
        {
          footerVisible ? (
            <Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                className="footer"
                py={{ xs: 3, sm: 3, md: 4 }}>
                <Box mb={{ xs: 1.25, sm: 2, md: 3 }}>
                  <Typography variant="h5" className="footer_title">
                    {t('more')}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  className="submitBtn"
                  color="primary"
                  style={{ textTransform: 'none' }}
                  onClick={() => {
                    window.open('https://github.com/bobjiang/agile123.net/issues');
                  }}
                  >
                  {t('submit')}
                </Button>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                py={{ xs: 1, sm: 2 }}>
                <Box>Sponsored By&nbsp;</Box>
                <Box color="#ff7828">
                  <Link href="https://bobjiang.com/" underline="none">
                    Bob Jiang&nbsp;
                  </Link>
                </Box>
                <Box>|&nbsp;Inspired By&nbsp;</Box>
                <Box color="#ff7828">
                  <Link href="https://eth123.org/" underline="none">
                    ETH123.org
                  </Link>
                </Box>
              </Box>
            </Box>
          ) : null
        }
      </ThemeProvider>
    );

  }

}

export default App;
