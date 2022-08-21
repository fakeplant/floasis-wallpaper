import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

import {
  AspectRatio,
  Box,
  Card,
  Popover,
  ColorPicker,
  Text,
  Container,
  Grid,
  Group,
  Paper,
  useMantineTheme,
  ActionIcon,
  MantineGradient,
  Button,
  Affix,
  Drawer,
  Stack,
  Title,
  Divider,
  Space,
  Slider,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import Logo from "../components/logo";
import FloasisLogo from "../components/logo";

const Home: NextPage = () => {
  // theme
  const theme = useMantineTheme();

  // state
  const [open, setOpen] = useState(false);
  const [fromColor, setFromColor] = useState("rgb(244, 45, 150)");
  const [toColor, setToColor] = useState("rgb(12, 99, 255)");
  const [degrees, setDegrees] = useState(45);
  const [fillColor, setFillColor] = useState("#ffffff");
  const [name, setName] = useState("First Last");

  // gradient
  const gradient: MantineGradient = {
    from: fromColor,
    to: toColor,
    deg: degrees,
  };

  // ref
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <Box
      sx={{
        background: theme.colors.gray[0],
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Head>
        <title>Floasis</title>
        <meta name="description" content="Generate a camp wallpaper." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          height: "90vh",
          width: "50.625vh",
          maxWidth: "90vw",
          maxHeight: "160vw",
          margin: "auto",
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        }}
      >
        <Card
          ref={ref}
          shadow="sm"
          sx={{
            background: theme.fn.gradient(gradient),
            width: "100%",
            height: "100%",
          }}
        >
          <Stack align="center" justify="center" sx={{ height: "100%" }}>
            <FloasisLogo fill={fillColor} />
            {/*<FloasisOrnament fill={fillColor} />*/}
            <Title align="center" order={1} sx={{ color: fillColor }}>
              {name}
            </Title>
            <Box>
              <Title
                align="center"
                transform="uppercase"
                order={5}
                sx={{ color: fillColor, margin: 0 }}
              >
                Floasis
              </Title>
              <Text align="center" sx={{ color: fillColor }}>
                4:30 & G
              </Text>
            </Box>
          </Stack>
        </Card>
      </Box>

      <Affix position={{ bottom: 20, left: 20 }}>
        <Button
          variant="default"
          onClick={() => {
            if (!ref.current) return;
            htmlToImage
              .toBlob(ref.current)
              .then(function (blob) {
                // @ts-ignore
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement("a");
                a.href = url;
                a.download = "wallpaper.png";
                a.click();
              })
              .catch(function (error) {
                console.error("oops, something went wrong!", error);
              });
          }}
        >
          Download
        </Button>
      </Affix>

      <Affix position={{ bottom: 20, right: 20 }}>
        <Popover>
          <Popover.Target>
            <Button
              variant="default"
              // onClick={() => setOpen(true)}
              leftIcon={
                <Box
                  sx={{
                    background: theme.fn.gradient({
                      from: fillColor,
                      to: fillColor,
                      deg: 0,
                    }),
                    boxShadow: theme.shadows.sm,
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                  }}
                />
              }
            >
              Logo + Name
            </Button>
          </Popover.Target>
          <Popover.Dropdown sx={{ padding: 0 }}>
            <ColorPicker
              size="sm"
              value={fillColor}
              onChange={(c) => setFillColor(c)}
              p="xs"
            />
            <Divider />
            <TextInput
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              p="xs"
            />
          </Popover.Dropdown>
        </Popover>
        <Space h="xs" />
        <Popover position="left-end">
          <Popover.Target>
            <Button
              variant="default"
              // onClick={() => setOpen(true)}
              leftIcon={
                <Box
                  sx={{
                    background: theme.fn.gradient(gradient),
                    boxShadow: theme.shadows.md,
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                  }}
                />
              }
            >
              &nbsp;Background&nbsp;
            </Button>
          </Popover.Target>
          <Popover.Dropdown sx={{ padding: 0 }}>
            <ColorPicker
              size="sm"
              value={fromColor}
              onChange={(c) => setFromColor(c)}
              p="xs"
            />
            <Divider />
            <ColorPicker
              size="sm"
              value={toColor}
              onChange={(c) => setToColor(c)}
              p="xs"
            />
            <Divider />
            <Slider
              min={0}
              max={360}
              value={degrees}
              onChange={(v) => setDegrees(v)}
              px="xs"
              py="lg"
            />
          </Popover.Dropdown>
        </Popover>
      </Affix>

      <Drawer
        position="left"
        opened={open}
        onClose={() => setOpen(false)}
        title="Edit"
        padding="xl"
        size="xl"
      ></Drawer>
    </Box>
  );
};

export default Home;
