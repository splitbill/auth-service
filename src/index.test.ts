import { HelloWorld } from "./index";

describe("hello word test", () => {
    it('should be return hello world', function () {
        expect(HelloWorld()).toBe("hello world");
    });
})