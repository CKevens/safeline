import React, { useEffect, useRef } from "react";
import { getSetupCount } from "@/api";
import Features from "@/components/home/Features";
import Abilities from "@/components/home/Abilities";
import Partner from "@/components/home/Partner";
import {
  Box,
  Grid,
  Button,
  Link,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import Image from "next/image";

const ARTICLES = [
  "《阮一峰·科技爱好者周刊》",
  "《Hello Github 月刊》",
  "《码农出击》",
  "《GitHub Daily》",
  "《Open Github 社区》",
  "《科技 lion》",
];

const totalSx = {
  color: "primary.main",
  fontSize: { xs: "58px", md: "70px" },
  background: "linear-gradient(90deg, #8FE5D7 0%, #0FC6C2 100%)",
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent",
  lineHeight: 1.25,
  fontFamily: "AlimamaShuHeiTi-Bold",
};

const textAligns = ["left", "center", "right"];

export async function getServerSideProps() {
  let total = 46151;
  try {
    const result = await getSetupCount();
    total = result.total;
  } finally {
    return {
      props: {
        total,
      },
    };
  }
}

export default function Home({ total }: { total: number }) {
  const totalRef = useRef(null);
  const startRef = useRef(null);

  const initTotal = async (n: number) => {
    const countUpModule = await import("countup.js");
    const anim = new countUpModule.CountUp(totalRef.current!, Math.max(0, n), {
      duration: 2,
    });
    anim.start();
    const startAnim = new countUpModule.CountUp(
      startRef.current!,
      Math.max(0, 6.4),
      {
        duration: 2,
        decimalPlaces: 1,
      }
    );
    startAnim.start();
  };

  useEffect(() => {
    initTotal(total);
  }, [total]);

  return (
    <main className="flex flex-col justify-between" title="雷池 WAF 社区版">
      <Box>
        <Box
          sx={{
            width: "100%",
            height: "866px",
            position: "relative",
            backgroundImage: "url(/images/home-banner.png)",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Box pt={26.5}>
            <Stack alignItems="center">
              <Stack
                direction="row"
                sx={{
                  color: "#86909C",
                  letterSpacing: 8,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mr: 35,
                    fontWeight: 400,
                  }}
                >
                  基于智能语义分析的
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 400,
                  }}
                >
                  下一代 Web 应用防火墙
                </Typography>
              </Stack>
              <Stack
                direction="row"
                mt={2}
                sx={{
                  fontFamily: "AlimamaShuHeiTi-Bold",
                  letterSpacing: 10,
                  background:
                    "linear-gradient(90deg, #160847 0%, #0A7977 100%)",
                  "-webkit-background-clip": "text",
                  "-webkit-text-fill-color": "transparent",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    mr: 15.5,
                  }}
                >
                  不让黑客
                </Typography>
                <Typography variant="h1" sx={{}}>
                  越雷池一步
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 351,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Box sx={{ width: "369px" }}>
              <Image
                src="/images/gif/waf-logo.gif"
                alt="WAf logo"
                layout="responsive"
                width={369}
                height={369}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ position: "relative", bottom: "360px", marginBottom: "-360px" }}
        >
          <Container>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                target="_blank"
                sx={{
                  width: { xs: "100%", sm: "188px" },
                  height: "60px",
                  ml: { xs: 0, sm: 0 },
                  mb: { xs: 0, sm: 0 },
                  fontSize: "20px",
                  boxShadow: "0px 15px 25px 0px rgba(15,198,194,0.3)",
                }}
                href="/docs/guide/install"
              >
                立即安装
              </Button>
            </Box>
          </Container>
          <Container>
            <Box mt={7.5}>
              <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                  <Stack spacing={2} alignItems="center">
                    <Typography
                      variant="h1"
                      sx={{
                        ...totalSx,
                      }}
                      ref={totalRef}
                    >
                      -
                    </Typography>
                    <Typography variant="h5">装机量</Typography>
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Link
                    href="https://github.com/chaitin/SafeLine"
                    target="_blank"
                  >
                    <Stack direction="row" justifyContent="center">
                      <Stack spacing={2} alignItems="center">
                        <Stack direction="row" sx={{ ...totalSx }}>
                          <Typography variant="h1" ref={startRef}>
                            -
                          </Typography>
                          <Typography variant="h1">k</Typography>
                        </Stack>
                        <Typography variant="h5">GitHub Star</Typography>
                      </Stack>
                      <Image
                        src="/images/gif/starred.gif"
                        alt="starred"
                        width={80}
                        height={78}
                        style={{ marginTop: "6px" }}
                      />
                    </Stack>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
          <Container>
            <Box mt={7}>
              <Grid container spacing={2}>
                {ARTICLES.map((article, index) => (
                  <Grid key={article} item xs={12} sm={4}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#86909C",
                        textAlign: { xs: "center", md: textAligns[index % 3] },
                        fontFamily: "AlimamaShuHeiTi-Bold",
                        fontSize: "20px",
                      }}
                    >
                      {article}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
          <Container sx={{ pb: 3, mb: 3, mt: 18 }}>
            <Features />
          </Container>
          <Abilities />
          <Box
            sx={{
              backgroundImage: "url(/images/partner-bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Partner />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: { xs: "243px", md: "343px" },
              mt: 19,
              backgroundImage: "url(/images/enterprise-bg.svg)",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Container className="relative h-full">
              <Stack justifyContent="center" className="h-full">
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 400,
                    color: "common.white",
                    fontSize: { xs: "20px", md: "28px" },
                    fontFamily: "AlimamaShuHeiTi-Bold",
                    letterSpacing: "3px",
                  }}
                >
                  欢迎使用雷池其他版本
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    width: { xs: "146px" },
                    height: "50px",
                    mt: 4,
                    backgroundColor: "common.white",
                    fontSize: "16px",
                    "&:hover": {
                      color: "#0A8A87",
                      backgroundColor: "common.white",
                    },
                  }}
                  href="/version"
                >
                  版本对比
                </Button>
              </Stack>
              <Box
                sx={{
                  position: "absolute",
                  right: -96,
                  top: -65,
                }}
              >
                <Image
                  src="/images/shield.png"
                  alt="雷池"
                  width={417}
                  height={359}
                />
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </main>
  );
}
