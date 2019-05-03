import {Headers} from 'apollo-server-env';
// @ts-ignore
import fetch from 'fetch';

interface Json {
  username: string;
  password: string;
  grant_type: string;
}

/* @flow */
const request = async ({
  url,
  headers,
  json,
}: {
  url: string;
  headers: Headers;
  json: Json;
}) => {
  const response = await fetch(url, {
    headers,
    body: JSON.stringify(json),
    method: 'POST',
  });

  let data;

  if (response.ok) {
    data = await response.json();
  } else if (response.status === 401) {
    throw new Error('Authentication Failed');
  } else {
    data = await response.json();
    throw new Error(data.error || data.message || data);
  }

  return data;
};

export default class LoginService {
  constructor(
    private serverUri: string,
    private base64Encode: (text: string) => string
  ) {}

  login(username: string, password: string) {
    const headers = new Headers();
    const credentials = this.base64Encode(`${username}:${password}`);
    const json = {
      username,
      password,
      grant_type: 'password',
    };

    headers.append('Authorization', `Basic ${credentials}`);
    headers.append('Content-Type', 'application/json');

    const url = `${this.serverUri}/oauth/token`;

    return request({
      url,
      headers,
      json,
    });
  }
}
