import { TransportConfig } from "../../src/Config/TransportConfig";




describe('Testing getTransportConstValue intro TransportConfig class', () => {
    let transportConfig: TransportConfig;


    beforeEach(() => {
        transportConfig = new TransportConfig();
    });

        
      it('should throw an error if env variable is not a number', () => {
        process.env['NOT_A_NUMBER'] = 'hello';
        expect(() => (transportConfig as any).getTransportConstValue('NOT_A_NUMBER')).toThrow("It must be a number: NOT_A_NUMBER");
      });

})
