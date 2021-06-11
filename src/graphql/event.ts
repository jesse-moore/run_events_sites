export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  FeatureCollectionObject: any;
  FeatureObject: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Event = {
  __typename?: 'Event';
  id: Scalars['ID'];
  name: Scalars['String'];
  heroImg: Scalars['String'];
  dateTime: Scalars['Date'];
  address: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  eventDetails: Scalars['String'];
  races: Array<Race>;
};

export type EventDetailsInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  dateTime: Scalars['Date'];
  address: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
};

export type EventInput = {
  name: Scalars['String'];
  heroImg?: Maybe<Scalars['Upload']>;
  dateTime: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  eventDetails?: Maybe<Scalars['String']>;
};



export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  createEvent?: Maybe<Event>;
  createRace?: Maybe<Race>;
  deleteEvent?: Maybe<Scalars['String']>;
  deleteRace?: Maybe<Scalars['String']>;
  updateRace?: Maybe<Race>;
  fileUpload?: Maybe<Scalars['String']>;
  saveHeroImg?: Maybe<Event>;
  saveEventDetails?: Maybe<Event>;
  saveEventDescription?: Maybe<Event>;
};


export type MutationCreateEventArgs = {
  event: EventInput;
};


export type MutationCreateRaceArgs = {
  eventId: Scalars['String'];
  race: RaceInput;
};


export type MutationDeleteEventArgs = {
  eventId: Scalars['String'];
};


export type MutationDeleteRaceArgs = {
  raceId: Scalars['String'];
};


export type MutationUpdateRaceArgs = {
  raceId: Scalars['String'];
  raceUpdates: UpdateRaceInput;
};


export type MutationFileUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationSaveHeroImgArgs = {
  file: Scalars['Upload'];
  id: Scalars['String'];
};


export type MutationSaveEventDetailsArgs = {
  eventDetails: EventDetailsInput;
};


export type MutationSaveEventDescriptionArgs = {
  eventDescription: Scalars['String'];
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  events: Array<Maybe<Event>>;
  eventBySlug?: Maybe<Event>;
  userEvents: Array<Maybe<Event>>;
  userEventByID?: Maybe<Event>;
  userRaceByID?: Maybe<Race>;
};


export type QueryEventBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryUserEventByIdArgs = {
  id: Scalars['String'];
};


export type QueryUserRaceByIdArgs = {
  id: Scalars['String'];
};

export type Race = {
  __typename?: 'Race';
  id: Scalars['String'];
  name: Scalars['String'];
  distance: Scalars['Int'];
  route: Route;
  event: Event;
};

export type RaceInput = {
  name: Scalars['String'];
  distance: Scalars['Int'];
  route: RouteInput;
};

export type Route = {
  __typename?: 'Route';
  points: Scalars['FeatureCollectionObject'];
  route: Scalars['FeatureCollectionObject'];
  routeStartMarker?: Maybe<Scalars['FeatureObject']>;
  routeEndMarker?: Maybe<Scalars['FeatureObject']>;
};

export type RouteInput = {
  points: Scalars['FeatureCollectionObject'];
  route: Scalars['FeatureCollectionObject'];
  routeStartMarker?: Maybe<Scalars['FeatureObject']>;
  routeEndMarker?: Maybe<Scalars['FeatureObject']>;
};

export type UpdateRaceInput = {
  name?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Int']>;
  route?: Maybe<UpdateRouteInput>;
};

export type UpdateRouteInput = {
  points?: Maybe<Scalars['FeatureCollectionObject']>;
  route?: Maybe<Scalars['FeatureCollectionObject']>;
  routeStartMarker?: Maybe<Scalars['FeatureObject']>;
  routeEndMarker?: Maybe<Scalars['FeatureObject']>;
};


export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  email: Scalars['String'];
};

export type EventQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type EventQuery = (
  { __typename?: 'Query' }
  & { eventBySlug?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'name' | 'dateTime' | 'address' | 'city' | 'state' | 'eventDetails' | 'heroImg'>
    & { races: Array<(
      { __typename?: 'Race' }
      & Pick<Race, 'id' | 'name' | 'distance'>
      & { route: (
        { __typename?: 'Route' }
        & Pick<Route, 'points' | 'route' | 'routeStartMarker' | 'routeEndMarker'>
      ) }
    )> }
  )> }
);
