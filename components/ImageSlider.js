import { View, Text, Dimensions, Image } from "react-native";
import React, { useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { appColor, images, icons } from "../constants";

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [entries, setEntries] = useState([
    {
      url: images.iphone,
      title: "Create.",
      text: "Easily create a group, add members either from your contacts and use it any time",
    },
    {
      url: images.pay,
      title: "Payment.",
      text: "Pay your team with just one click. Choose who recieve any time you want to make a payment",
    },
  ]);
  let _carousel;

  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 7, justifyContent: "center" }}>
          <Image source={item.url} style={{height: "100%", width: "100%"}}/>
        </View>
        <View style={{ flex: 3, paddingHorizontal: 16 }}>
          <View style={{ flex: 3 }}>
            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
                color: appColor.black,
              }}
            >
              {item.title}
            </Text>
          </View>
          <View style={{ flex: 7 }}>
            <Text style={{ color: appColor.black, fontSize: 18 }}>
              {item.text}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={(c) => (_carousel = c)}
        layout={"default"}
        data={entries}
        renderItem={_renderItem}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width - 50}
        loop={true}
        loopClonesPerSide={2}
        autoplay={true}
        autoplayDelay={5000}
        autoplayInterval={6000}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeIndex}
        dotColor={appColor.lightPink}
        inactiveDotColor={appColor.lighterPink}
        inactiveDotScale={0.6}
        inactiveDotOpacity={0.4}
        carouselRef={_carousel}
        tappableDots={!!_carousel}
      />
    </View>
  );
};

export default ImageSlider;
