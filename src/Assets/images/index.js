import {Image} from 'react-native';
const getUri = image => Image.resolveAssetSource(image).uri;

export const logo = getUri(require('./logo.png'));
export const noData = getUri(require('./no-data.png'));
