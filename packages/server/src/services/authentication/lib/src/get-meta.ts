/* @flow */
/*
 * Extract a value from a meta tag, usually placed in the head of the html
 */
export default function getMetaTagContent(tagName: string): string | null {
  // @ts-ignore
  const metas = document.getElementsByTagName('meta');

  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('property') === tagName) {
      // $FlowFixMe
      return metas[i].getAttribute('content');
    }
  }

  return null;
}
