import type { NextPage } from "next";
import Head from "next/head";
import * as htmlToImage from "html-to-image";

import {
  Affix,
  Box,
  Button,
  Card,
  ColorPicker,
  Divider,
  Drawer,
  MantineGradient,
  Popover,
  Slider,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
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
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");

  // gradient
  const gradient: MantineGradient = {
    from: fromColor,
    to: toColor,
    deg: degrees,
  };

  // ref
  const ref = React.useRef<HTMLDivElement>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);

  // png
  useEffect(() => {
    if (!ref.current || !imgRef.current) return;
    htmlToImage
      .toPng(ref.current)
      .then(function (dataUrl) {
        // @ts-ignore
        const img = imgRef.current;
        // @ts-ignore
        img.src = dataUrl;
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }, [fromColor, toColor, degrees, fillColor, name, contact1, contact2]);

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
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>

      <Box sx={{ width: "100%", height: "100%" }}>
        <img
          ref={imgRef}
          src={""}
          alt="wallpaper"
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </Box>

      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          // maxWidth: "100vw",
          // maxHeight: "177.77vw",
          margin: "auto",
          position: "absolute",
          top: "-111111110px",
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
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <Stack
            align="center"
            justify="center"
            sx={{ height: "100%" }}
            spacing="xs"
          >
            <FloasisLogo fill={fillColor} />
            {/*<FloasisOrnament fill={fillColor} />*/}
            <Text
              align="center"
              weight="bold"
              sx={{
                fontSize: "12vw",
                lineHeight: "1",
                color: fillColor,
                display: "block",
                width: "100%",
                marginBottom: "0.5rem",
              }}
            >
              {name}
            </Text>
            {name && (
              <Divider
                sx={{ width: "50%", margin: "5px 25%", borderColor: fillColor }}
              />
            )}
            <Box sx={{ width: "100%" }}>
              <Text
                align="center"
                transform="uppercase"
                weight="bold"
                sx={{
                  fontSize: "5.5vw",
                  color: fillColor,
                  margin: 0,
                  display: "block",
                  width: "100%",
                }}
              >
                Floasis
              </Text>
              <Text
                align="center"
                sx={{
                  fontSize: "5.5vw",
                  color: fillColor,
                  display: "block",
                  width: "100%",
                }}
              >
                4:30 & G
              </Text>
            </Box>
            {(contact1 || contact2) && (
              <>
                <Divider
                  sx={{
                    width: "50%",
                    margin: "5px 25%",
                    borderColor: fillColor,
                  }}
                />
                <Box sx={{ width: "100%" }}>
                  {contact1 && (
                    <Text
                      align="center"
                      sx={{
                        fontSize: "5.5vw",
                        color: fillColor,
                        display: "block",
                        width: "100%",
                      }}
                    >
                      {contact1}
                    </Text>
                  )}
                  {contact2 && (
                    <Text
                      align="center"
                      sx={{
                        fontSize: "5.5vw",
                        color: fillColor,
                        display: "block",
                        width: "100%",
                      }}
                    >
                      {contact2}
                    </Text>
                  )}
                </Box>
              </>
            )}
          </Stack>
        </Card>
      </Box>

      {/*<Affix position={{ bottom: 20, left: 20 }}>*/}
      {/*  <Button variant="default" onClick={() => {}}>*/}
      {/*    Download*/}
      {/*  </Button>*/}
      {/*</Affix>*/}

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
              placeholder={"Your Name"}
              onChange={(e) => setName(e.currentTarget.value)}
              p="xs"
            />
            <TextInput
              value={contact1}
              placeholder={"1.555.555.5555"}
              onChange={(e) => setContact1(e.currentTarget.value)}
              p="xs"
            />
            <TextInput
              value={contact2}
              placeholder={"email@address.com"}
              onChange={(e) => setContact2(e.currentTarget.value)}
              p="xs"
            />
          </Popover.Dropdown>
        </Popover>
        <Space h="xs" />
        <Popover>
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
