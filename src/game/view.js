const Log = {
	reset: "\x1b[0m",
	bright: "\x1b[1m",
	dim: "\x1b[2m",
	underscore: "\x1b[4m",
	blink: "\x1b[5m",
	reverse: "\x1b[7m",
	hidden: "\x1b[8m",
	// Foreground (text) colors
	fg: {
		black: "\x1b[30m",
		red: "\x1b[31m",
		green: "\x1b[32m",
		yellow: "\x1b[33m",
		blue: "\x1b[34m",
		magenta: "\x1b[35m",
		cyan: "\x1b[36m",
		white: "\x1b[37m",
		crimson: "\x1b[38m",
	},
	// Background colors
	bg: {
		black: "\x1b[40m",
		red: "\x1b[41m",
		green: "\x1b[42m",
		yellow: "\x1b[43m",
		blue: "\x1b[44m",
		magenta: "\x1b[45m",
		cyan: "\x1b[46m",
		white: "\x1b[47m",
		crimson: "\x1b[48m",
	},
};

const color = [
	{ // 0
		bg: "black",
		fg: "white",
		state: "bright"
	},
	{ // 1
		bg: "red",
		fg: "white",
		state: "bright"
	},
	{ // 2
		bg: "green",
		fg: "white",
		state: "bright"
	},
	{ // 3
		bg: "yellow",
		fg: "white",
		state: "bright"
	},
	{ // 4
		bg: "blue",
		fg: "white",
		state: "bright"
	},
	{ // 5
		bg: "magenta",
		fg: "white",
		state: "bright"
	},
	{ // 6
		bg: "cyan",
		fg: "white",
		state: "bright"
	},
	{ // 7
		bg: "green",
		fg: "white",
		state: "dim"
	},
	{ // 8
		bg: "white",
		fg: "white",
		state: "bright"
	}
];
color[ -1 ] = {
	bg: "crimson",
	fg: "crimson",
	state: "dim"
};

const printCar = key => `${Log[ color[ key ].state ]}${Log.bg[ color[ key ].bg ]}${Log.fg[ color[ key ].fg ]}[]${Log.reset}`;

function drawMap(map, clear, text) {
	map = map.map(row => row.map(cell => cell));
	if (clear)
		console.clear();
	if (text)
		console.log(text);
	for (const row of map) {
		for (const cell of row) {
			process.stdout.write(printCar(cell));
		}
		console.log("\r");
	}
}

const moveDirection = (isForward, isHorisontal) => {
	if (isHorisontal === true) {
		if (isForward)
			return "right";
		else
			return "left";
	} else if (isForward)
		return "down";
	else
		return "up";
};

const moveFormat = move => {
	const curretColor = color[ move.carNumber + 1 ].bg;
	const consoleStyle = color[ move.carNumber + 1 ].state;
	return {
		car: `${Log.bg[curretColor]}${Log[consoleStyle]}${curretColor}${Log.reset}`,
		move: moveDirection(move.isForward, move.isHorisontal)
	};
};
function printMove(formatedMove) {
	process.stdout.write(`\n\rCar ${formatedMove.car} moves ${formatedMove.move}\n`);
}

async function drawWinner(winner) {
	let state = winner;
	const history = [];
	while (state !== null) {
		history.push(state);
		state = state?.parent;
	}

	console.log("\n\nStart state: ");
	for (const state of history.reverse()) {
		// Wait for 3 seconds
		if (state.previousMove)
			printMove(moveFormat(state.previousMove));
		await drawAfterMs(333, state.map);
	}
}


async function drawAfterMs(ms, map) {
	return new Promise(resolve => {
		setTimeout(() => {
			drawMap(map, false);
			resolve();
		}, ms);
	});
}
export { drawMap, drawWinner };
