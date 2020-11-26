import { offset } from 'dom-helpers';

import Plugin from './plugin';

export default class GridConstraint extends Plugin {
	constructor(draggable) {
		super(draggable);
		this.attach();
	}

	get grid() {
		const { options } = this.draggable;

		return Array.isArray(options.grid) && options.grid.length === 2 ? options.grid : null;
	}

	constraintPosition = pos => {
		if (this.grid) {
			let xMin, xMax, yMin, yMax;
			const [x, y] = this.grid;
			const { containmentCoords, containmentContainer, startEvent } = this.draggable;
			const { click } = this.draggable.offset;

			if (containmentCoords) {
				[xMin, yMin, xMax, yMax] = containmentCoords;

				if (containmentCoords && containmentContainer) {
					const containerOffset = offset(containmentContainer);

					xMin += containerOffset.left;
					yMin += containerOffset.top;
					xMax += containerOffset.left;
					yMax += containerOffset.top;
				}
			}

			const left = x ? startEvent.pageX + Math.round((pos.pageX - startEvent.pageX) / x) * x : startEvent.pageX;
			const top = y ? startEvent.pageY + Math.round((pos.pageY - startEvent.pageY) / y) * y : startEvent.pageY;

			if (containmentCoords) {
				if (left - click.left >= xMin || left - click.left > xMax) {
					pos.pageX = left;
				} else {
					pos.pageX = left + x;
				}
				if (top - click.top >= yMin || top - click.top > yMax) {
					pos.pageY = top;
				} else {
					pos.pageY = top + y;
				}
			} else {
				pos.pageX = left;
				pos.pageY = top;
			}
		}

		return pos;
	};
}
