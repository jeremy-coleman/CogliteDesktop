//https://github.com/donavon/build-uri-path/blob/master/src/index.js

export const buildUriPath = (strings, ...values) => (
  strings.reduce((partialUri, string, i) => (
    `${partialUri}${encodeURIComponent(values[i - 1])}${string}`
  ))
);

export default buildUriPath;

// import buildUriPath from 'build-uri-path';

// const resource = 'topic';
// const id = 'form/function';

// const path = buildUriPath`/${resource}/${id}`;
// In this example, path would equal "/topic/form%2Ffunction/"