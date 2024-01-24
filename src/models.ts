export type d3DragBehavior = d3.ZoomBehavior<Element, unknown>;
export type d3BaseType = d3.BaseType;
export type d3SelectionBase = d3.Selection<
  d3.BaseType,
  any,
  HTMLElement | any,
  any
>;

export interface ICoordinates {
  xCoordinate: number;
  yCoordinate: number;
  rotationAngle?: number;
}
