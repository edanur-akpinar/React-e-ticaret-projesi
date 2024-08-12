import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';

const items = [
  {
    src: 'https://images.hepsiburada.net/banners/s/1/672-378/bannerImage2088_20240808130708.png/format:webp',
    key: 1,
  },
  {
    src: 'https://images.hepsiburada.net/banners/s/1/672-378/bannerImage2153_20240807194235.jpeg/format:webp',
    key: 2,
  },    
  {
    src: 'https://images.hepsiburada.net/banners/s/1/672-378/bannerImage2113_20240724094842.jpeg/format:webp',
    key: 3,
  },
  {
    src: 'https://images.hepsiburada.net/banners/s/1/672-378/bannerImage2055_20240807090046.jpeg/format:webp',
    key: 3,
  },
  {
    src: 'https://images.hepsiburada.net/banners/s/1/672-378/bannerImage2161_20240808164838.jpeg/format:webp',
    key: 3,
  },
  {
    src: 'https://images.hepsiburada.net/banners/s/1/672-378/bannerImage2141_20240808103337.jpeg/format:webp',
    key: 3,
  },
];

function Slide(args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}

export default Slide;
