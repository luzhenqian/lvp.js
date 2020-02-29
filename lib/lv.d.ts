export default Lv;
export as namespace Lv;

declare namespace Lv {
  const Rules: IRules;
  const Result: IResult;

  interface IRules {
    required: boolean;
    min: number | string;
    max: number | string;
    message: string;
    name: string;
    params: any;
  }

  interface IResult {
    status: boolean;
    message: string;
  }
}
