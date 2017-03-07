export const TOOGLE_ITEM = 'TOOGLE_ITEM';

export function toogleItem(row, column) {
  return {type: TOOGLE_ITEM, row, column}
}
