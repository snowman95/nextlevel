import { gql } from "@apollo/client";

export const GET_PHOTOS = gql`
  query Photos($page: Int!) {
    photos(page: $page) {
      albumId
      id
      title
      url
      thumbnailUrl
    }
  }
`;

export const GET_POSTS = gql`
  query getPosts {
    posts {
      userId
      id
      title
      body
    }
  }
`;

export const GET_ANIMALS = gql`
  query Animals {
    animals {
      id
      firstName
      type
      accessory
    }
  }
`;

export const GET_ASSETS = gql`
  query Assets($assetsId: Int!) {
    assets(id: $assetsId) {
      id
      x
      y
      name
      address
      date
      price
      view
      src
      detail {
        address
        mainUse
        buildType
        approvalDate
        landArea
        buildingArea
        statutoryFloorAreaRatio
        currentStatusFloorAreaRatio
        scale
        dealAmount
        dealPoint
        buildingDealArea
        buildingDealUnitPrice
        landDealArea
        landDealUnitPrice
        dealType
        registrationReason
        registrationReceipt
        sell
        buy
        source
        notes
      }
    }
  }
`;
