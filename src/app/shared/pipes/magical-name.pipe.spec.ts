import {MagicalNamePipe} from './magical-name.pipe';

describe('MagicalNamePipe', () => {
    fit('create an instance', () => {
        const pipe = new MagicalNamePipe();
        expect(pipe).toBeTruthy();
    });
});
