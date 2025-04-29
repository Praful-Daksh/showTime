import React from 'react';
import { Helmet } from 'react-helmet';

const SeoMeta = ({
  title = "ShowTime - Create, Manage & Sell Tickets Online",
  description = "ShowTime is your one-stop platform to create, manage, buy, and sell tickets for events and shows. Track your ticket sales and revenue in real-time.",
  keywords = "showtime, ticketing, event management, sell tickets, buy tickets, event revenue, ticket sales , event management ,showTime , event, shows, ticketing platform, event organizer, ticket sales platform",
  url = "https://show-time-coral.vercel.app", 
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Praful Daksh" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Helmet>
  );
};

export default SeoMeta;
