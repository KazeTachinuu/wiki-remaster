// ==UserScript==
// @name         wiki-remaster
// @namespace    hugo.wikimasters
// @version      0.12.0
// @author       Hugo Sibony
// @description  Redesigned client for wiki-masters.com. Uses the real API and session.
// @homepage     https://github.com/KazeTachinuu/wiki-remaster
// @supportURL   https://github.com/KazeTachinuu/wiki-remaster/issues
// @downloadURL  https://raw.githubusercontent.com/KazeTachinuu/wiki-remaster/main/wm-userscript/dist/wikimasters-app.user.js
// @updateURL    https://raw.githubusercontent.com/KazeTachinuu/wiki-remaster/main/wm-userscript/dist/wikimasters-app.user.js
// @match        https://www.wiki-masters.com/*
// @match        https://wiki-masters.com/*
// @grant        none
// ==/UserScript==

(function() {
	"use strict";
	var __defProp = Object.defineProperty;
	var __exportAll = (all, no_symbols) => {
		let target = {};
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
		if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
		return target;
	};
	var CORE = /^\/(pulls|collection|global-collection|trades|marketplace(\/[^/]+)?)?\/?$/;
	var isOurs = (path) => typeof path === "string" && CORE.test(path.split(/[?#]/)[0]);
	var is_array = Array.isArray;
	var index_of = Array.prototype.indexOf;
	var includes = Array.prototype.includes;
	var array_from = Array.from;
	var define_property = Object.defineProperty;
	var get_descriptor = Object.getOwnPropertyDescriptor;
	var get_descriptors = Object.getOwnPropertyDescriptors;
	var object_prototype = Object.prototype;
	var array_prototype = Array.prototype;
	var get_prototype_of = Object.getPrototypeOf;
	var is_extensible = Object.isExtensible;
	var noop = () => {};
	function run_all(arr) {
		for (var i = 0; i < arr.length; i++) arr[i]();
	}
	function deferred() {
		var resolve;
		var reject;
		return {
			promise: new Promise((res, rej) => {
				resolve = res;
				reject = rej;
			}),
			resolve,
			reject
		};
	}
	function to_array(value, n) {
		if (Array.isArray(value)) return value;
		if (n === void 0 || !(Symbol.iterator in value)) return Array.from(value);
		const array = [];
		for (const element of value) {
			array.push(element);
			if (array.length === n) break;
		}
		return array;
	}
	var MANAGED_EFFECT = 1 << 24;
	var CLEAN = 1024;
	var DIRTY = 2048;
	var MAYBE_DIRTY = 4096;
	var INERT = 8192;
	var DESTROYED = 16384;
	var REACTION_RAN = 32768;
	var DESTROYING = 1 << 25;
	var EFFECT_TRANSPARENT = 65536;
	var EFFECT_PRESERVED = 1 << 19;
	var USER_EFFECT = 1 << 20;
	var EFFECT_OFFSCREEN = 1 << 25;
	var REACTION_IS_UPDATING = 1 << 21;
	var ASYNC = 1 << 22;
	var ERROR_VALUE = 1 << 23;
	var STATE_SYMBOL = Symbol("$state");
	var COMPONENT_SYMBOL = Symbol("component");
	var LEGACY_PROPS = Symbol("legacy props");
	var LOADING_ATTR_SYMBOL = Symbol("");
	var ATTRIBUTES_CACHE = Symbol("attributes");
	var CLASS_CACHE = Symbol("class");
	var STYLE_CACHE = Symbol("style");
	var TEXT_CACHE = Symbol("text");
	var FORM_RESET_HANDLER = Symbol("form reset");
	var STALE_REACTION = new class StaleReactionError extends Error {
		name = "StaleReactionError";
		message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
	}();
	var IS_XHTML = !!globalThis.document?.contentType && globalThis.document.contentType.includes("xml");
	var HYDRATION_ERROR = {};
	var UNINITIALIZED = Symbol("uninitialized");
	var NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
	var NAMESPACE_SVG = "http://www.w3.org/2000/svg";
	var NAMESPACE_MATHML = "http://www.w3.org/1998/Math/MathML";
	function derived_inert() {
		console.warn(`https://svelte.dev/e/derived_inert`);
	}
	function hydration_mismatch(location) {
		console.warn(`https://svelte.dev/e/hydration_mismatch`);
	}
	function select_multiple_invalid_value() {
		console.warn(`https://svelte.dev/e/select_multiple_invalid_value`);
	}
	function svelte_boundary_reset_noop() {
		console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
	}
	var hydrating = false;
	function set_hydrating(value) {
		hydrating = value;
	}
	var hydrate_node;
	function set_hydrate_node(node) {
		if (node === null) {
			hydration_mismatch();
			throw HYDRATION_ERROR;
		}
		return hydrate_node = node;
	}
	function hydrate_next() {
		return set_hydrate_node(get_next_sibling(hydrate_node));
	}
	function reset(node) {
		if (!hydrating) return;
		if (get_next_sibling(hydrate_node) !== null) {
			hydration_mismatch();
			throw HYDRATION_ERROR;
		}
		hydrate_node = node;
	}
	function next(count = 1) {
		if (hydrating) {
			var i = count;
			var node = hydrate_node;
			while (i--) node = get_next_sibling(node);
			hydrate_node = node;
		}
	}
	function skip_nodes(remove = true) {
		var depth = 0;
		var node = hydrate_node;
		while (true) {
			if (node.nodeType === 8) {
				var data = node.data;
				if (data === "]") {
					if (depth === 0) return node;
					depth -= 1;
				} else if (data === "[" || data === "[!" || data[0] === "[" && !isNaN(Number(data.slice(1)))) depth += 1;
			}
			var next = get_next_sibling(node);
			if (remove) node.remove();
			node = next;
		}
	}
	function read_hydration_instruction(node) {
		if (!node || node.nodeType !== 8) {
			hydration_mismatch();
			throw HYDRATION_ERROR;
		}
		return node.data;
	}
	function equals(value) {
		return value === this.v;
	}
	function safe_not_equal(a, b) {
		return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
	}
	function safe_equals(value) {
		return !safe_not_equal(value, this.v);
	}
	function async_derived_orphan() {
		throw new Error(`https://svelte.dev/e/async_derived_orphan`);
	}
	function each_key_duplicate(a, b, value) {
		throw new Error(`https://svelte.dev/e/each_key_duplicate`);
	}
	function effect_in_teardown(rune) {
		throw new Error(`https://svelte.dev/e/effect_in_teardown`);
	}
	function effect_in_unowned_derived() {
		throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
	}
	function effect_orphan(rune) {
		throw new Error(`https://svelte.dev/e/effect_orphan`);
	}
	function effect_update_depth_exceeded() {
		throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
	}
	function props_invalid_value(key) {
		throw new Error(`https://svelte.dev/e/props_invalid_value`);
	}
	function state_descriptors_fixed() {
		throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
	}
	function state_prototype_fixed() {
		throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
	}
	function state_unsafe_mutation() {
		throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
	}
	function svelte_boundary_reset_onerror() {
		throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
	}
	var async_mode_flag = false;
	var legacy_mode_flag = false;
	var component_context = null;
	function set_component_context(context) {
		component_context = context;
	}
	function push(props, runes = false, fn) {
		component_context = {
			p: component_context,
			i: false,
			c: null,
			e: null,
			s: props,
			x: null,
			r: active_effect,
			l: legacy_mode_flag && !runes ? {
				s: null,
				u: null,
				$: []
			} : null
		};
	}
	function pop(component) {
		var context = component_context;
		var effects = context.e;
		if (effects !== null) {
			context.e = null;
			for (var fn of effects) create_user_effect(fn);
		}
		if (component !== void 0) context.x = component;
		context.i = true;
		component_context = context.p;
		return mark_as_component(component);
	}
	function mark_as_component(component = {}) {
		define_property(component, COMPONENT_SYMBOL, { value: true });
		return component;
	}
	function is_runes() {
		return !legacy_mode_flag || component_context !== null && component_context.l === null;
	}
	var micro_tasks = [];
	function run_micro_tasks() {
		var tasks = micro_tasks;
		micro_tasks = [];
		run_all(tasks);
	}
	function queue_micro_task(fn) {
		if (micro_tasks.length === 0 && !is_flushing_sync) {
			var tasks = micro_tasks;
			queueMicrotask(() => {
				if (tasks === micro_tasks) run_micro_tasks();
			});
		}
		micro_tasks.push(fn);
	}
	function flush_tasks() {
		while (micro_tasks.length > 0) run_micro_tasks();
	}
	var STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
	function set_signal_status(signal, status) {
		signal.f = signal.f & STATUS_MASK | status;
	}
	function update_derived_status(derived) {
		if ((derived.f & 512) !== 0 || derived.deps === null) set_signal_status(derived, CLEAN);
		else set_signal_status(derived, MAYBE_DIRTY);
	}
	function defer_effect(effect, dirty_effects, maybe_dirty_effects) {
		if ((effect.f & 2048) !== 0) dirty_effects.add(effect);
		else if ((effect.f & 4096) !== 0) maybe_dirty_effects.add(effect);
		set_signal_status(effect, CLEAN);
	}
	function autofocus(dom, value) {
		if (value) {
			const body = document.body;
			dom.autofocus = true;
			queue_micro_task(() => {
				if (document.activeElement === body) dom.focus();
			});
		}
	}
	var listening_to_form_reset = false;
	function add_form_reset_listener() {
		if (!listening_to_form_reset) {
			listening_to_form_reset = true;
			document.addEventListener("reset", (evt) => {
				Promise.resolve().then(() => {
					if (!evt.defaultPrevented) for (const e of evt.target.elements) e[FORM_RESET_HANDLER]?.();
				});
			}, { capture: true });
		}
	}
	function without_reactive_context(fn) {
		var previous_reaction = active_reaction;
		var previous_effect = active_effect;
		set_active_reaction(null);
		set_active_effect(null);
		try {
			return fn();
		} finally {
			set_active_reaction(previous_reaction);
			set_active_effect(previous_effect);
		}
	}
	function listen_to_event_and_reset_event(element, event, handler, on_reset = handler) {
		element.addEventListener(event, () => without_reactive_context(handler));
		const prev = element[FORM_RESET_HANDLER];
		if (prev) element[FORM_RESET_HANDLER] = () => {
			prev();
			on_reset(true);
		};
		else element[FORM_RESET_HANDLER] = () => on_reset(true);
		add_form_reset_listener();
	}
	function flatten(blockers, sync, async, fn) {
		const d = is_runes() ? derived : derived_safe_equal;
		var pending = blockers.filter((b) => !b.settled);
		var deriveds = sync.map(d);
		if (async.length === 0 && pending.length === 0) {
			fn(deriveds);
			return;
		}
		var parent = active_effect;
		var restore = capture();
		var blocker_promise = pending.length === 1 ? pending[0].promise : pending.length > 1 ? Promise.all(pending.map((b) => b.promise)) : null;
		function finish(async) {
			if ((parent.f & 16384) !== 0) return;
			restore();
			try {
				fn([...deriveds, ...async]);
			} catch (error) {
				invoke_error_boundary(error, parent);
			}
			unset_context();
		}
		var decrement_pending = increment_pending();
		if (async.length === 0) {
			blocker_promise.then(() => finish([])).finally(decrement_pending);
			return;
		}
		function run() {
			Promise.all(async.map((expression) => async_derived(expression))).then(finish).catch((error) => invoke_error_boundary(error, parent)).finally(decrement_pending);
		}
		if (blocker_promise) blocker_promise.then(() => {
			restore();
			run();
			unset_context();
		});
		else run();
	}
	function capture() {
		var previous_effect = active_effect;
		var previous_reaction = active_reaction;
		var previous_component_context = component_context;
		var previous_batch = current_batch;
		return function restore(activate_batch = true) {
			set_active_effect(previous_effect);
			set_active_reaction(previous_reaction);
			set_component_context(previous_component_context);
			if (activate_batch && (previous_effect.f & 16384) === 0) {
				previous_batch?.activate();
				previous_batch?.apply();
			}
		};
	}
	function unset_context(deactivate_batch = true) {
		set_active_effect(null);
		set_active_reaction(null);
		set_component_context(null);
		if (deactivate_batch) current_batch?.deactivate();
	}
	function increment_pending() {
		var effect = active_effect;
		var boundary = effect.b;
		var batch = current_batch;
		var blocking = !!boundary?.is_rendered();
		boundary?.update_pending_count(1, batch);
		batch.increment(blocking, effect);
		return () => {
			boundary?.update_pending_count(-1, batch);
			batch.decrement(blocking, effect);
		};
	}
	function derived(fn) {
		var flags = 2 | DIRTY;
		if (active_effect !== null) active_effect.f |= EFFECT_PRESERVED;
		return {
			ctx: component_context,
			deps: null,
			effects: null,
			equals,
			f: flags,
			fn,
			reactions: null,
			rv: 0,
			v: UNINITIALIZED,
			wv: 0,
			parent: active_effect,
			ac: null
		};
	}
	var OBSOLETE = Symbol("obsolete");
	function async_derived(fn, label, location) {
		let parent = active_effect;
		if (parent === null) async_derived_orphan();
		var promise = void 0;
		var signal = source(UNINITIALIZED);
		var should_suspend = !active_reaction;
		var deferreds = new Set();
		async_effect(() => {
			var effect = active_effect;
			var d = deferred();
			promise = d.promise;
			try {
				Promise.resolve(fn()).then(d.resolve, (e) => {
					if (e !== STALE_REACTION) d.reject(e);
				}).finally(unset_context);
			} catch (error) {
				d.reject(error);
				unset_context();
			}
			var batch = current_batch;
			if (should_suspend) {
				if ((effect.f & 32768) !== 0) var decrement_pending = increment_pending();
				if (parent.b?.is_rendered()) batch.async_deriveds.get(effect)?.reject(OBSOLETE);
				else for (const d of deferreds.values()) d.reject(OBSOLETE);
				deferreds.add(d);
				batch.async_deriveds.set(effect, d);
			}
			const handler = (value, error = void 0) => {
				decrement_pending?.();
				deferreds.delete(d);
				if (error === OBSOLETE) return;
				batch.activate();
				if (error) {
					signal.f |= ERROR_VALUE;
					internal_set(signal, error);
				} else {
					if ((signal.f & 8388608) !== 0) signal.f ^= ERROR_VALUE;
					internal_set(signal, value);
				}
				batch.deactivate();
			};
			d.promise.then(handler, (e) => handler(null, e || "unknown"));
		});
		teardown(() => {
			for (const d of deferreds) d.reject(OBSOLETE);
		});
		return new Promise((fulfil) => {
			function next(p) {
				function go() {
					if (p === promise) fulfil(signal);
					else next(promise);
				}
				p.then(go, go);
			}
			next(promise);
		});
	}
	function user_derived(fn) {
		const d = derived(fn);
		if (!async_mode_flag) push_reaction_value(d);
		return d;
	}
	function derived_safe_equal(fn) {
		const signal = derived(fn);
		signal.equals = safe_equals;
		return signal;
	}
	function destroy_derived_effects(derived) {
		var effects = derived.effects;
		if (effects !== null) {
			derived.effects = null;
			for (var i = 0; i < effects.length; i += 1) destroy_effect(effects[i]);
		}
	}
	function execute_derived(derived) {
		var value;
		var prev_active_effect = active_effect;
		var parent = derived.parent;
		if (!is_destroying_effect && parent !== null && derived.v !== UNINITIALIZED && (parent.f & 24576) !== 0) {
			derived_inert();
			return derived.v;
		}
		set_active_effect(parent);
		try {
			destroy_derived_effects(derived);
			value = update_reaction(derived);
		} finally {
			set_active_effect(prev_active_effect);
		}
		return value;
	}
	function update_derived(derived) {
		var value = execute_derived(derived);
		if (!derived.equals(value)) {
			derived.wv = increment_write_version();
			if (!current_batch?.is_fork || derived.deps === null) {
				if (current_batch !== null) {
					current_batch.capture(derived, value, true);
					previous_batch?.capture(derived, value, true);
				} else derived.v = value;
				if (derived.deps === null) {
					set_signal_status(derived, CLEAN);
					return;
				}
			}
		}
		if (is_destroying_effect) return;
		if (batch_values !== null) {
			if (effect_tracking() || current_batch?.is_fork) batch_values.set(derived, value);
		} else update_derived_status(derived);
	}
	function freeze_derived_effects(derived) {
		if (derived.effects === null) return;
		for (const e of derived.effects) if (e.teardown || e.ac) {
			e.teardown?.();
			if (e.ac !== null) without_reactive_context(() => {
				e.ac.abort(STALE_REACTION);
				e.ac = null;
			});
			if (e.fn !== null) e.teardown = noop;
			remove_reactions(e, 0);
			destroy_effect_children(e);
		}
	}
	function unfreeze_derived_effects(derived) {
		if (derived.effects === null) return;
		for (const e of derived.effects) if (e.teardown && e.fn !== null) update_effect(e);
	}
	var first_batch = null;
	var last_batch = null;
	var current_batch = null;
	var previous_batch = null;
	var batch_values = null;
	var last_scheduled_effect = null;
	var is_flushing_sync = false;
	var is_processing = false;
	var collected_effects = null;
	var legacy_updates = null;
	var flush_count = 0;
	var uid = 1;
	var Batch = class Batch {
		id = uid++;
		#started = false;
		linked = true;
		#prev = null;
		#next = null;
		async_deriveds = new Map();
		current = new Map();
		previous = new Map();
		#commit_callbacks = new Set();
		#discard_callbacks = new Set();
		#pending = 0;
		#blocking_pending = new Map();
		#deferred = null;
		#scheduled = [];
		#new_effects = [];
		#dirty_effects = new Set();
		#maybe_dirty_effects = new Set();
		#skipped_branches = new Map();
		#unskipped_branches = new Set();
		is_fork = false;
		#decrement_queued = false;
		constructor() {
			if (last_batch === null) first_batch = last_batch = this;
			else {
				last_batch.#next = this;
				this.#prev = last_batch;
			}
			last_batch = this;
		}
		#is_deferred() {
			if (this.is_fork) return true;
			for (const effect of this.#blocking_pending.keys()) {
				var e = effect;
				var skipped = false;
				while (e.parent !== null) {
					if (this.#skipped_branches.has(e)) {
						skipped = true;
						break;
					}
					e = e.parent;
				}
				if (!skipped) return true;
			}
			return false;
		}
		skip_effect(effect) {
			if (!this.#skipped_branches.has(effect)) this.#skipped_branches.set(effect, {
				d: [],
				m: []
			});
			this.#unskipped_branches.delete(effect);
		}
		unskip_effect(effect, callback = (e) => this.schedule(e)) {
			var tracked = this.#skipped_branches.get(effect);
			if (tracked) {
				this.#skipped_branches.delete(effect);
				for (var e of tracked.d) {
					set_signal_status(e, DIRTY);
					callback(e);
				}
				for (e of tracked.m) {
					set_signal_status(e, MAYBE_DIRTY);
					callback(e);
				}
			}
			this.#unskipped_branches.add(effect);
		}
		#resolve() {
			var roots = [];
			for (const effect of this.#scheduled) {
				if ((effect.f & 16384) !== 0 || (effect.f & 6144) === 0) continue;
				var e = effect;
				var covered = false;
				while (e.parent !== null) {
					e = e.parent;
					var flags = e.f;
					if ((flags & 96) !== 0) {
						if ((flags & 1024) === 0) {
							covered = true;
							break;
						}
						e.f ^= CLEAN;
					}
				}
				if (!covered) roots.push(e);
			}
			this.#scheduled = [];
			return roots;
		}
		#process() {
			this.#started = true;
			for (const e of this.#dirty_effects) {
				this.#maybe_dirty_effects.delete(e);
				set_signal_status(e, DIRTY);
				this.schedule(e);
			}
			for (const e of this.#maybe_dirty_effects) {
				set_signal_status(e, MAYBE_DIRTY);
				this.schedule(e);
			}
			this.apply();
			var effects = collected_effects = [];
			var render_effects = [];
			var updates = legacy_updates = [];
			while (this.#scheduled.length > 0) {
				if (flush_count++ > 1e3) {
					this.#unlink();
					infinite_loop_guard();
				}
				for (const root of this.#resolve()) try {
					this.#traverse(root, effects, render_effects);
				} catch (e) {
					reset_all(root);
					if (!this.#is_deferred()) this.discard();
					throw e;
				}
			}
			current_batch = null;
			if (updates.length > 0) {
				var batch = Batch.ensure();
				for (const e of updates) batch.schedule(e);
			}
			collected_effects = null;
			legacy_updates = null;
			if (this.#is_deferred()) {
				this.#defer_effects(render_effects);
				this.#defer_effects(effects);
				for (const [e, t] of this.#skipped_branches) reset_branch(e, t);
				if (updates.length > 0) current_batch.#process();
				return;
			}
			const earlier_batch = this.#find_earlier_batch();
			if (earlier_batch) {
				this.#defer_effects(render_effects);
				this.#defer_effects(effects);
				earlier_batch.#merge(this);
				return;
			}
			this.#dirty_effects.clear();
			this.#maybe_dirty_effects.clear();
			for (const fn of this.#commit_callbacks) fn(this);
			this.#commit_callbacks.clear();
			previous_batch = this;
			flush_queued_effects(render_effects);
			flush_queued_effects(effects);
			previous_batch = null;
			this.#deferred?.resolve();
			var next_batch = current_batch;
			if (this.#pending === 0 && (this.#scheduled.length === 0 || next_batch !== null)) {
				this.#unlink();
				if (async_mode_flag) {
					this.#commit();
					current_batch = next_batch;
				}
			}
			if (this.#scheduled.length > 0) {
				if (next_batch !== null) {
					for (const e of this.#scheduled) next_batch.#scheduled.push(e);
					this.#scheduled = [];
				} else next_batch = this;
			}
			if (next_batch !== null) {
				old_values.clear();
				next_batch.#process();
			}
		}
		#traverse(root, effects, render_effects) {
			root.f ^= CLEAN;
			var effect = root.first;
			while (effect !== null) {
				var flags = effect.f;
				var is_branch = (flags & 96) !== 0;
				if (!(is_branch && (flags & 1024) !== 0 || (flags & 8192) !== 0 || this.#skipped_branches.has(effect)) && effect.fn !== null) {
					if (is_branch) effect.f ^= CLEAN;
					else if ((flags & 4) !== 0) effects.push(effect);
					else if (async_mode_flag && (flags & 16777224) !== 0) render_effects.push(effect);
					else if (is_dirty(effect)) {
						if ((flags & 16) !== 0) this.#maybe_dirty_effects.add(effect);
						update_effect(effect);
					}
					var child = effect.first;
					if (child !== null) {
						effect = child;
						continue;
					}
				}
				while (effect !== null) {
					var next = effect.next;
					if (next !== null) {
						effect = next;
						break;
					}
					effect = effect.parent;
				}
			}
		}
		#find_earlier_batch() {
			var batch = this.#prev;
			while (batch !== null) {
				if (!batch.is_fork) {
					for (const [value, [, is_derived]] of this.current) if (batch.current.has(value) && !is_derived) return batch;
				}
				batch = batch.#prev;
			}
			return null;
		}
		#merge(batch) {
			for (const [source, value] of batch.current) {
				if (!this.previous.has(source) && batch.previous.has(source)) this.previous.set(source, batch.previous.get(source));
				this.current.set(source, value);
			}
			for (const [effect, deferred] of batch.async_deriveds) {
				const d = this.async_deriveds.get(effect);
				if (d) deferred.promise.then(d.resolve).catch(d.reject);
			}
			batch.async_deriveds.clear();
			this.transfer_effects(batch.#dirty_effects, batch.#maybe_dirty_effects);
			const mark = (value) => {
				var reactions = value.reactions;
				if (reactions === null) return;
				if ((value.f & 2) !== 0 && (value.f & 6144) === 0) return;
				for (const reaction of reactions) {
					var flags = reaction.f;
					if ((flags & 2) !== 0) mark(reaction);
					else {
						var effect = reaction;
						if (flags & 4194320 && !this.async_deriveds.has(effect)) {
							this.#maybe_dirty_effects.delete(effect);
							set_signal_status(effect, DIRTY);
							this.schedule(effect);
						}
					}
				}
			};
			for (const source of this.current.keys()) mark(source);
			this.oncommit(() => batch.discard());
			batch.#unlink();
			current_batch = this;
			this.#process();
		}
		#defer_effects(effects) {
			for (var i = 0; i < effects.length; i += 1) defer_effect(effects[i], this.#dirty_effects, this.#maybe_dirty_effects);
		}
		capture(source, value, is_derived = false) {
			if (source.v !== UNINITIALIZED && !this.previous.has(source)) this.previous.set(source, source.v);
			if ((source.f & 8388608) === 0) {
				this.current.set(source, [value, is_derived]);
				batch_values?.set(source, value);
			}
			if (!this.is_fork) source.v = value;
		}
		activate() {
			current_batch = this;
		}
		deactivate() {
			current_batch = null;
			batch_values = null;
		}
		flush() {
			try {
				is_processing = true;
				current_batch = this;
				this.#process();
			} finally {
				flush_count = 0;
				last_scheduled_effect = null;
				collected_effects = null;
				legacy_updates = null;
				is_processing = false;
				current_batch = null;
				batch_values = null;
				old_values.clear();
			}
		}
		discard() {
			for (const fn of this.#discard_callbacks) fn(this);
			this.#discard_callbacks.clear();
			for (const deferred of this.async_deriveds.values()) deferred.reject(OBSOLETE);
			this.#unlink();
			this.#deferred?.resolve();
		}
		register_created_effect(effect) {
			this.#new_effects.push(effect);
		}
		#commit() {
			for (let batch = first_batch; batch !== null; batch = batch.#next) {
				var is_earlier = batch.id < this.id;
				var sources = [];
				for (const [source, [value, is_derived]] of this.current) {
					if (batch.current.has(source)) {
						var batch_value = batch.current.get(source)[0];
						if (is_earlier && value !== batch_value) batch.current.set(source, [value, is_derived]);
						else continue;
					}
					sources.push(source);
				}
				if (is_earlier) for (const [effect, deferred] of this.async_deriveds) {
					const d = batch.async_deriveds.get(effect);
					if (d) deferred.promise.then(d.resolve).catch(d.reject);
				}
				var current = [...batch.current.keys()].filter((source) => !batch.current.get(source)[1]);
				if (!batch.#started || current.length === 0) continue;
				var others = current.filter((source) => !this.current.has(source));
				if (others.length === 0) {
					if (is_earlier) batch.discard();
				} else if (sources.length > 0) {
					if (is_earlier) for (const unskipped of this.#unskipped_branches) batch.unskip_effect(unskipped, (e) => {
						if ((e.f & 4194320) !== 0) batch.schedule(e);
						else batch.#defer_effects([e]);
					});
					batch.activate();
					var marked = new Set();
					var checked = new Map();
					for (var source of sources) mark_effects(source, others, marked, checked);
					checked = new Map();
					var current_unequal = [...batch.current].filter(([c, v1]) => {
						const v2 = this.current.get(c);
						if (!v2) return true;
						return v2[0] !== v1[0] || v2[1] !== v1[1];
					}).map(([c]) => c);
					if (current_unequal.length > 0) {
						for (const effect of this.#new_effects) if ((effect.f & 155648) === 0 && depends_on(effect, current_unequal, checked)) {
							if ((effect.f & 4194320) !== 0) {
								set_signal_status(effect, DIRTY);
								batch.schedule(effect);
							} else batch.#dirty_effects.add(effect);
						}
					}
					if (batch.#scheduled.length > 0 && !batch.#decrement_queued) {
						batch.apply();
						for (var root of batch.#resolve()) batch.#traverse(root, [], []);
					}
					batch.deactivate();
				}
			}
		}
		increment(blocking, effect) {
			this.#pending += 1;
			if (blocking) {
				let blocking_pending_count = this.#blocking_pending.get(effect) ?? 0;
				this.#blocking_pending.set(effect, blocking_pending_count + 1);
			}
		}
		decrement(blocking, effect) {
			this.#pending -= 1;
			if (blocking) {
				let blocking_pending_count = this.#blocking_pending.get(effect) ?? 0;
				if (blocking_pending_count === 1) this.#blocking_pending.delete(effect);
				else this.#blocking_pending.set(effect, blocking_pending_count - 1);
			}
			if (this.#decrement_queued) return;
			this.#decrement_queued = true;
			queue_micro_task(() => {
				this.#decrement_queued = false;
				if (this.linked) this.flush();
			});
		}
		transfer_effects(dirty_effects, maybe_dirty_effects) {
			for (const e of dirty_effects) this.#dirty_effects.add(e);
			for (const e of maybe_dirty_effects) this.#maybe_dirty_effects.add(e);
			dirty_effects.clear();
			maybe_dirty_effects.clear();
		}
		oncommit(fn) {
			this.#commit_callbacks.add(fn);
		}
		ondiscard(fn) {
			this.#discard_callbacks.add(fn);
		}
		settled() {
			return (this.#deferred ??= deferred()).promise;
		}
		static ensure() {
			if (current_batch === null) {
				const batch = current_batch = new Batch();
				if (!is_processing && !is_flushing_sync) queue_micro_task(() => {
					if (!batch.#started) batch.flush();
				});
			}
			return current_batch;
		}
		apply() {
			if (!async_mode_flag || !this.is_fork && this.#prev === null && this.#next === null) {
				batch_values = null;
				return;
			}
			batch_values = new Map();
			for (const [source, [value]] of this.current) batch_values.set(source, value);
			for (let batch = first_batch; batch !== null; batch = batch.#next) {
				if (batch === this || batch.is_fork) continue;
				var intersects = false;
				if (batch.id < this.id) for (const [source, [, is_derived]] of batch.current) {
					if (is_derived) continue;
					if (this.current.has(source)) {
						intersects = true;
						break;
					}
				}
				if (!intersects) {
					for (const [source, previous] of batch.previous) if (!batch_values.has(source)) batch_values.set(source, previous);
				}
			}
		}
		schedule(effect) {
			last_scheduled_effect = effect;
			if (effect.b?.is_pending && (effect.f & 16777228) !== 0 && (effect.f & 32768) === 0) {
				effect.b.defer_effect(effect);
				return;
			}
			this.#scheduled.push(effect);
		}
		#unlink() {
			if (!this.linked) return;
			var prev = this.#prev;
			var next = this.#next;
			if (prev === null) first_batch = next;
			else prev.#next = next;
			if (next === null) last_batch = prev;
			else next.#prev = prev;
			this.linked = false;
		}
	};
	function flushSync(fn) {
		var was_flushing_sync = is_flushing_sync;
		is_flushing_sync = true;
		try {
			var result;
			if (fn) {
				if (current_batch !== null && !current_batch.is_fork) current_batch.flush();
				result = fn();
			}
			while (true) {
				flush_tasks();
				if (current_batch === null) return result;
				current_batch.flush();
			}
		} finally {
			is_flushing_sync = was_flushing_sync;
		}
	}
	function infinite_loop_guard() {
		try {
			effect_update_depth_exceeded();
		} catch (error) {
			invoke_error_boundary(error, last_scheduled_effect);
		}
	}
	var eager_block_effects = null;
	function flush_queued_effects(effects) {
		var length = effects.length;
		if (length === 0) return;
		var i = 0;
		while (i < length) {
			var effect = effects[i++];
			if ((effect.f & 24576) === 0 && is_dirty(effect)) {
				eager_block_effects = new Set();
				update_effect(effect);
				if (effect.deps === null && effect.first === null && effect.nodes === null && effect.teardown === null && effect.ac === null) unlink_effect(effect);
				if (eager_block_effects?.size > 0) {
					old_values.clear();
					for (const e of eager_block_effects) {
						if ((e.f & 24576) !== 0) continue;
						const ordered_effects = [e];
						let ancestor = e.parent;
						while (ancestor !== null) {
							if (eager_block_effects.has(ancestor)) {
								eager_block_effects.delete(ancestor);
								ordered_effects.push(ancestor);
							}
							ancestor = ancestor.parent;
						}
						for (let j = ordered_effects.length - 1; j >= 0; j--) {
							const e = ordered_effects[j];
							if ((e.f & 24576) !== 0) continue;
							update_effect(e);
						}
					}
					eager_block_effects.clear();
				}
			}
		}
		eager_block_effects = null;
	}
	function mark_effects(value, sources, marked, checked) {
		if (marked.has(value)) return;
		marked.add(value);
		if (value.reactions !== null) for (const reaction of value.reactions) {
			const flags = reaction.f;
			if ((flags & 2) !== 0) mark_effects(reaction, sources, marked, checked);
			else if ((flags & 4194320) !== 0 && (flags & 2048) === 0 && depends_on(reaction, sources, checked)) {
				set_signal_status(reaction, DIRTY);
				schedule_effect(reaction);
			}
		}
	}
	function depends_on(reaction, sources, checked) {
		const depends = checked.get(reaction);
		if (depends !== void 0) return depends;
		if (reaction.deps !== null) for (const dep of reaction.deps) {
			if (includes.call(sources, dep)) return true;
			if ((dep.f & 2) !== 0 && depends_on(dep, sources, checked)) {
				checked.set(dep, true);
				return true;
			}
		}
		checked.set(reaction, false);
		return false;
	}
	function schedule_effect(effect) {
		current_batch.schedule(effect);
	}
	function reset_branch(effect, tracked) {
		if ((effect.f & 32) !== 0 && (effect.f & 1024) !== 0) return;
		if ((effect.f & 2048) !== 0) tracked.d.push(effect);
		else if ((effect.f & 4096) !== 0) tracked.m.push(effect);
		set_signal_status(effect, CLEAN);
		var e = effect.first;
		while (e !== null) {
			reset_branch(e, tracked);
			e = e.next;
		}
	}
	function reset_all(effect) {
		set_signal_status(effect, CLEAN);
		var e = effect.first;
		while (e !== null) {
			reset_all(e);
			e = e.next;
		}
	}
	var eager_effects = new Set();
	var old_values = new Map();
	var eager_effects_deferred = false;
	function source(v, stack) {
		return {
			f: 0,
			v,
			reactions: null,
			equals,
			rv: 0,
			wv: 0
		};
	}
	function state(v, stack) {
		const s = source(v, stack);
		push_reaction_value(s);
		return s;
	}
	function mutable_source(initial_value, immutable = false, trackable = true) {
		const s = source(initial_value);
		if (!immutable) s.equals = safe_equals;
		if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) (component_context.l.s ??= []).push(s);
		return s;
	}
	function set(source, value, should_proxy = false) {
		if (active_reaction !== null && (!untracking || (active_reaction.f & 131072) !== 0) && is_runes() && (active_reaction.f & 4325394) !== 0 && (current_sources === null || !current_sources.has(source))) state_unsafe_mutation();
		return internal_set(source, should_proxy ? proxy(value) : value, legacy_updates);
	}
	var seen = null;
	var count_deps = 0;
	function internal_set(source, value, updated_during_traversal = null) {
		if (!source.equals(value)) {
			if (is_destroying_effect) old_values.set(source, value);
			else if (!old_values.has(source)) old_values.set(source, source.v);
			var batch = Batch.ensure();
			batch.capture(source, value);
			if ((source.f & 2) !== 0) {
				const derived = source;
				if ((source.f & 2048) !== 0) execute_derived(derived);
				if (batch_values === null) update_derived_status(derived);
			}
			source.wv = increment_write_version();
			seen = null;
			count_deps = 0;
			mark_reactions(source, DIRTY, updated_during_traversal);
			seen = null;
			if (is_runes() && active_effect !== null && (active_effect.f & 1024) !== 0 && (active_effect.f & 96) === 0) {
				if (untracked_writes === null) set_untracked_writes([source]);
				else untracked_writes.push(source);
			}
			if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) flush_eager_effects();
		}
		return value;
	}
	function flush_eager_effects() {
		eager_effects_deferred = false;
		for (const effect of eager_effects) {
			if ((effect.f & 1024) !== 0) set_signal_status(effect, MAYBE_DIRTY);
			let dirty;
			try {
				dirty = is_dirty(effect);
			} catch {
				dirty = true;
			}
			if (dirty) update_effect(effect);
		}
		eager_effects.clear();
	}
	function update(source, d = 1) {
		var value = get(source);
		var result = d === 1 ? value++ : value--;
		set(source, value);
		return result;
	}
	function increment(source) {
		set(source, source.v + 1);
	}
	function mark_reactions(signal, status, updated_during_traversal) {
		var reactions = signal.reactions;
		if (reactions === null) return;
		var runes = is_runes();
		var length = reactions.length;
		count_deps += length;
		if (count_deps > 1e5 && seen === null) seen = new Set();
		if (seen !== null) {
			if (seen.has(signal)) return;
			seen.add(signal);
		}
		for (var i = 0; i < length; i++) {
			var reaction = reactions[i];
			var flags = reaction.f;
			if (!runes && reaction === active_effect) continue;
			var not_dirty = (flags & DIRTY) === 0;
			if (not_dirty) set_signal_status(reaction, status);
			if ((flags & 131072) !== 0) eager_effects.add(reaction);
			else if ((flags & 2) !== 0) {
				var derived = reaction;
				batch_values?.delete(derived);
				mark_reactions(derived, MAYBE_DIRTY, updated_during_traversal);
			} else if (not_dirty) {
				var effect = reaction;
				if ((flags & 16) !== 0 && eager_block_effects !== null) eager_block_effects.add(effect);
				if (updated_during_traversal !== null) updated_during_traversal.push(effect);
				else schedule_effect(effect);
			}
		}
	}
	function proxy(value) {
		if (typeof value !== "object" || value === null || STATE_SYMBOL in value || COMPONENT_SYMBOL in value) return value;
		const prototype = get_prototype_of(value);
		if (prototype !== object_prototype && prototype !== array_prototype) return value;
		var sources = new Map();
		var is_proxied_array = is_array(value);
		var version = state(0);
		var stack = null;
		var parent_version = update_version;
		var with_parent = (fn) => {
			if (update_version === parent_version) return fn();
			var reaction = active_reaction;
			var version = update_version;
			set_active_reaction(null);
			set_update_version(parent_version);
			var result = fn();
			set_active_reaction(reaction);
			set_update_version(version);
			return result;
		};
		if (is_proxied_array) sources.set("length", state(value.length, stack));
		return new Proxy(value, {
			defineProperty(_, prop, descriptor) {
				if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) state_descriptors_fixed();
				var s = sources.get(prop);
				if (s === void 0) with_parent(() => {
					var s = state(descriptor.value, stack);
					sources.set(prop, s);
					return s;
				});
				else set(s, descriptor.value, true);
				return true;
			},
			deleteProperty(target, prop) {
				var s = sources.get(prop);
				if (s === void 0) {
					if (prop in target) {
						const s = with_parent(() => state(UNINITIALIZED, stack));
						sources.set(prop, s);
						increment(version);
					}
				} else {
					set(s, UNINITIALIZED);
					increment(version);
				}
				return true;
			},
			get(target, prop, receiver) {
				if (prop === STATE_SYMBOL) return value;
				var s = sources.get(prop);
				var exists = prop in target;
				if (s === void 0 && (!exists || get_descriptor(target, prop)?.writable)) {
					s = with_parent(() => {
						return state(proxy(exists ? target[prop] : UNINITIALIZED), stack);
					});
					sources.set(prop, s);
				}
				if (s !== void 0) {
					var v = get(s);
					return v === UNINITIALIZED ? void 0 : v;
				}
				return Reflect.get(target, prop, receiver);
			},
			getOwnPropertyDescriptor(target, prop) {
				this.has?.(target, prop);
				var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
				var s = sources.get(prop);
				if (s !== void 0) {
					var value = get(s);
					if (value === UNINITIALIZED) return;
					if (descriptor && "value" in descriptor) descriptor.value = value;
					else return {
						enumerable: true,
						configurable: true,
						value,
						writable: true
					};
				}
				return descriptor;
			},
			has(target, prop) {
				if (prop === STATE_SYMBOL) return true;
				var s = sources.get(prop);
				var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop);
				if (s !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop)?.writable)) {
					if (s === void 0) {
						s = with_parent(() => {
							return state(has ? proxy(target[prop]) : UNINITIALIZED, stack);
						});
						sources.set(prop, s);
					}
					if (get(s) === UNINITIALIZED) return false;
				}
				return has;
			},
			set(target, prop, value, receiver) {
				var s = sources.get(prop);
				var has = prop in target;
				if (is_proxied_array && prop === "length") for (var i = value; i < s.v; i += 1) {
					var other_s = sources.get(i + "");
					if (other_s !== void 0) set(other_s, UNINITIALIZED);
					else if (i in target) {
						other_s = with_parent(() => state(UNINITIALIZED, stack));
						sources.set(i + "", other_s);
					}
				}
				if (s === void 0) {
					if (!has || get_descriptor(target, prop)?.writable) {
						s = with_parent(() => state(void 0, stack));
						set(s, proxy(value));
						sources.set(prop, s);
					}
				} else {
					has = s.v !== UNINITIALIZED;
					var p = with_parent(() => proxy(value));
					set(s, p);
				}
				var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
				if (descriptor?.set) descriptor.set.call(receiver, value);
				if (!has) {
					if (is_proxied_array && typeof prop === "string") {
						var ls = sources.get("length");
						var n = Number(prop);
						if (Number.isInteger(n) && n >= ls.v) set(ls, n + 1);
					}
					increment(version);
				}
				return true;
			},
			ownKeys(target) {
				get(version);
				var own_keys = Reflect.ownKeys(target).filter((key) => {
					var source = sources.get(key);
					return source === void 0 || source.v !== UNINITIALIZED;
				});
				for (var [key, source] of sources) if (source.v !== UNINITIALIZED && !(key in target)) own_keys.push(key);
				return own_keys;
			},
			setPrototypeOf() {
				state_prototype_fixed();
			}
		});
	}
	function get_proxied_value(value) {
		try {
			if (value !== null && typeof value === "object" && STATE_SYMBOL in value) return value[STATE_SYMBOL];
		} catch {}
		return value;
	}
	function is(a, b) {
		return Object.is(get_proxied_value(a), get_proxied_value(b));
	}
	var $window;
	var is_firefox;
	var first_child_getter;
	var next_sibling_getter;
	function init_operations() {
		if ($window !== void 0) return;
		$window = window;
		is_firefox = /Firefox/.test(navigator.userAgent);
		var element_prototype = Element.prototype;
		var node_prototype = Node.prototype;
		var text_prototype = Text.prototype;
		first_child_getter = get_descriptor(node_prototype, "firstChild").get;
		next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
		if (is_extensible(element_prototype)) {
			element_prototype[CLASS_CACHE] = void 0;
			element_prototype[ATTRIBUTES_CACHE] = null;
			element_prototype[STYLE_CACHE] = void 0;
			element_prototype.__e = void 0;
		}
		if (is_extensible(text_prototype)) text_prototype[TEXT_CACHE] = void 0;
	}
	function create_text(value = "") {
		return document.createTextNode(value);
	}
	function get_first_child(node) {
		return first_child_getter.call(node);
	}
	function get_next_sibling(node) {
		return next_sibling_getter.call(node);
	}
	function child(node, is_text) {
		if (!hydrating) return get_first_child(node);
		var child = get_first_child(hydrate_node);
		if (child === null) child = hydrate_node.appendChild(create_text());
		else if (is_text && child.nodeType !== 3) {
			var text = create_text();
			child?.before(text);
			set_hydrate_node(text);
			return text;
		}
		if (is_text) merge_text_nodes(child);
		set_hydrate_node(child);
		return child;
	}
	function first_child(node, is_text = false) {
		if (!hydrating) {
			var first = get_first_child(node);
			if (first instanceof Comment && first.data === "") return get_next_sibling(first);
			return first;
		}
		if (is_text) {
			if (hydrate_node?.nodeType !== 3) {
				var text = create_text();
				hydrate_node?.before(text);
				set_hydrate_node(text);
				return text;
			}
			merge_text_nodes(hydrate_node);
		}
		return hydrate_node;
	}
	function only_child(node, is_text = false) {
		if (!hydrating) return get_first_child(node);
		var first = child(node, is_text);
		reset(node);
		return first;
	}
	function sibling(node, count = 1, is_text = false) {
		let next_sibling = hydrating ? hydrate_node : node;
		var last_sibling;
		while (count--) {
			last_sibling = next_sibling;
			next_sibling = get_next_sibling(next_sibling);
		}
		if (!hydrating) return next_sibling;
		if (is_text) {
			if (next_sibling?.nodeType !== 3) {
				var text = create_text();
				if (next_sibling === null) last_sibling?.after(text);
				else next_sibling.before(text);
				set_hydrate_node(text);
				return text;
			}
			merge_text_nodes(next_sibling);
		}
		set_hydrate_node(next_sibling);
		return next_sibling;
	}
	function clear_text_content(node) {
		node.textContent = "";
	}
	function should_defer_append() {
		if (!async_mode_flag) return false;
		if (eager_block_effects !== null) return false;
		return (active_effect.f & REACTION_RAN) !== 0;
	}
	function create_element(tag, namespace, is) {
		if (namespace == null || namespace === "http://www.w3.org/1999/xhtml") return is ? document.createElement(tag, { is }) : document.createElement(tag);
		return is ? document.createElementNS(namespace, tag, { is }) : document.createElementNS(namespace, tag);
	}
	function merge_text_nodes(text) {
		if (text.nodeValue.length < 65536) return;
		let next = text.nextSibling;
		while (next !== null && next.nodeType === 3) {
			next.remove();
			text.nodeValue += next.nodeValue;
			next = text.nextSibling;
		}
	}
	function handle_error(error) {
		var effect = active_effect;
		if (effect === null) {
			active_reaction.f |= ERROR_VALUE;
			return error;
		}
		if ((effect.f & 32768) === 0 && (effect.f & 4) === 0) throw error;
		invoke_error_boundary(error, effect);
	}
	function invoke_error_boundary(error, effect) {
		if (effect !== null && (effect.f & 16384) !== 0) return;
		while (effect !== null) {
			if ((effect.f & 128) !== 0 && (effect.f & 33570816) === 0) {
				if ((effect.f & 32768) === 0) throw error;
				try {
					effect.b.error(error);
					return;
				} catch (e) {
					error = e;
				}
			}
			effect = effect.parent;
		}
		throw error;
	}
	function validate_effect(rune) {
		if (active_effect === null) {
			if (active_reaction === null) effect_orphan(rune);
			effect_in_unowned_derived();
		}
		if (is_destroying_effect) effect_in_teardown(rune);
	}
	function push_effect(effect, parent_effect) {
		var parent_last = parent_effect.last;
		if (parent_last === null) parent_effect.last = parent_effect.first = effect;
		else {
			parent_last.next = effect;
			effect.prev = parent_last;
			parent_effect.last = effect;
		}
	}
	function create_effect(type, fn) {
		var parent = active_effect;
		if (parent !== null && (parent.f & 8192) !== 0) type |= INERT;
		var effect = {
			ctx: component_context,
			deps: null,
			nodes: null,
			f: type | DIRTY | 512,
			first: null,
			fn,
			last: null,
			next: null,
			parent,
			b: parent && parent.b,
			prev: null,
			teardown: null,
			wv: 0,
			ac: null
		};
		current_batch?.register_created_effect(effect);
		var e = effect;
		if ((type & 4) !== 0) {
			if (collected_effects !== null) collected_effects.push(effect);
			else Batch.ensure().schedule(effect);
		} else if (fn !== null) {
			try {
				update_effect(effect);
			} catch (e) {
				destroy_effect(effect);
				throw e;
			}
			if (e.deps === null && e.teardown === null && e.nodes === null && e.first === e.last && (e.f & 524288) === 0) {
				e = e.first;
				if ((type & 16) !== 0 && (type & 65536) !== 0 && e !== null) e.f |= EFFECT_TRANSPARENT;
			}
		}
		if (e !== null) {
			e.parent = parent;
			if (parent !== null) push_effect(e, parent);
			if (active_reaction !== null && (active_reaction.f & 2) !== 0 && (type & 64) === 0) {
				var derived = active_reaction;
				(derived.effects ??= []).push(e);
			}
		}
		return effect;
	}
	function effect_tracking() {
		return active_reaction !== null && !untracking;
	}
	function teardown(fn) {
		const effect = create_effect(8, null);
		set_signal_status(effect, CLEAN);
		effect.teardown = fn;
		return effect;
	}
	function user_effect(fn) {
		validate_effect("$effect");
		var flags = active_effect.f;
		if (!active_reaction && (flags & 32) !== 0 && component_context !== null && !component_context.i) {
			var context = component_context;
			(context.e ??= []).push(fn);
		} else return create_user_effect(fn);
	}
	function create_user_effect(fn) {
		return create_effect(4 | USER_EFFECT, fn);
	}
	function effect_root(fn) {
		Batch.ensure();
		const effect = create_effect(64 | EFFECT_PRESERVED, fn);
		return () => {
			destroy_effect(effect);
		};
	}
	function component_root(fn) {
		Batch.ensure();
		const effect = create_effect(64 | EFFECT_PRESERVED, fn);
		return (options = {}) => {
			return new Promise((fulfil) => {
				if (options.outro) pause_effect(effect, () => {
					destroy_effect(effect);
					fulfil(void 0);
				});
				else {
					destroy_effect(effect);
					fulfil(void 0);
				}
			});
		};
	}
	function effect(fn) {
		return create_effect(4, fn);
	}
	function async_effect(fn) {
		return create_effect(ASYNC | EFFECT_PRESERVED, fn);
	}
	function render_effect(fn, flags = 0) {
		return create_effect(8 | flags, fn);
	}
	function template_effect(fn, sync = [], async = [], blockers = []) {
		flatten(blockers, sync, async, (values) => {
			create_effect(8, () => {
				fn(...values.map(get));
			});
		});
	}
	function block(fn, flags = 0) {
		return create_effect(16 | flags, fn);
	}
	function managed(fn, flags = 0) {
		return create_effect(MANAGED_EFFECT | flags, fn);
	}
	function branch(fn) {
		return create_effect(32 | EFFECT_PRESERVED, fn);
	}
	function execute_effect_teardown(effect) {
		var teardown = effect.teardown;
		if (teardown !== null) {
			const previously_destroying_effect = is_destroying_effect;
			const previous_reaction = active_reaction;
			set_is_destroying_effect(true);
			set_active_reaction(null);
			try {
				teardown.call(null);
			} catch (error) {
				invoke_error_boundary(error, effect.parent);
			} finally {
				set_is_destroying_effect(previously_destroying_effect);
				set_active_reaction(previous_reaction);
			}
		}
	}
	function destroy_effect_children(signal, remove_dom = false) {
		var effect = signal.first;
		signal.first = signal.last = null;
		while (effect !== null) {
			const controller = effect.ac;
			if (controller !== null) without_reactive_context(() => {
				controller.abort(STALE_REACTION);
			});
			var next = effect.next;
			if ((effect.f & 64) !== 0) effect.parent = null;
			else destroy_effect(effect, remove_dom);
			effect = next;
		}
	}
	function destroy_block_effect_children(signal) {
		var effect = signal.first;
		while (effect !== null) {
			var next = effect.next;
			if ((effect.f & 32) === 0) destroy_effect(effect);
			effect = next;
		}
	}
	function destroy_effect(effect, remove_dom = true) {
		var removed = false;
		if ((remove_dom || (effect.f & 262144) !== 0) && effect.nodes !== null && effect.nodes.end !== null) {
			remove_effect_dom(effect.nodes.start, effect.nodes.end);
			removed = true;
		}
		effect.f |= DESTROYING;
		destroy_effect_children(effect, remove_dom && !removed);
		remove_reactions(effect, 0);
		var transitions = effect.nodes && effect.nodes.t;
		if (transitions !== null) for (const transition of transitions) transition.stop();
		execute_effect_teardown(effect);
		effect.f ^= DESTROYING;
		effect.f |= DESTROYED;
		var parent = effect.parent;
		if (parent !== null && parent.first !== null) unlink_effect(effect);
		effect.next = effect.prev = effect.teardown = effect.ctx = effect.deps = effect.fn = effect.nodes = effect.ac = effect.b = null;
	}
	function remove_effect_dom(node, end) {
		while (node !== null) {
			var next = node === end ? null : get_next_sibling(node);
			node.remove();
			node = next;
		}
	}
	function unlink_effect(effect) {
		var parent = effect.parent;
		var prev = effect.prev;
		var next = effect.next;
		if (prev !== null) prev.next = next;
		if (next !== null) next.prev = prev;
		if (parent !== null) {
			if (parent.first === effect) parent.first = next;
			if (parent.last === effect) parent.last = prev;
		}
	}
	function pause_effect(effect, callback, destroy = true) {
		var transitions = [];
		effect.f |= 256;
		pause_children(effect, transitions, true);
		var fn = () => {
			if (destroy) destroy_effect(effect);
			if (callback) callback();
		};
		var remaining = transitions.length;
		if (remaining > 0) {
			var check = () => --remaining || fn();
			for (var transition of transitions) transition.out(check);
		} else fn();
	}
	function pause_children(effect, transitions, local) {
		if ((effect.f & 8192) !== 0) return;
		effect.f ^= INERT;
		var t = effect.nodes && effect.nodes.t;
		if (t !== null) {
			for (const transition of t) if (transition.is_global || local) transitions.push(transition);
		}
		var child = effect.first;
		while (child !== null) {
			var sibling = child.next;
			if ((child.f & 64) === 0) {
				var transparent = (child.f & 65536) !== 0 || (child.f & 32) !== 0 && (effect.f & 16) !== 0;
				pause_children(child, transitions, transparent ? local : false);
			}
			child = sibling;
		}
	}
	function resume_effect(effect) {
		effect.f &= -257;
		resume_children(effect, true);
	}
	function resume_children(effect, local) {
		if ((effect.f & 256) !== 0) return;
		if ((effect.f & 8192) === 0) return;
		effect.f ^= INERT;
		if ((effect.f & 1024) === 0) {
			set_signal_status(effect, DIRTY);
			Batch.ensure().schedule(effect);
		}
		var child = effect.first;
		while (child !== null) {
			var sibling = child.next;
			var transparent = (child.f & 65536) !== 0 || (child.f & 32) !== 0;
			resume_children(child, transparent ? local : false);
			child = sibling;
		}
		var t = effect.nodes && effect.nodes.t;
		if (t !== null) {
			for (const transition of t) if (transition.is_global || local) transition.in();
		}
	}
	function move_effect(effect, fragment) {
		if (!effect.nodes) return;
		var node = effect.nodes.start;
		var end = effect.nodes.end;
		while (node !== null) {
			var next = node === end ? null : get_next_sibling(node);
			fragment.append(node);
			node = next;
		}
	}
	var captured_signals = null;
	var is_updating_effect = false;
	var is_destroying_effect = false;
	function set_is_destroying_effect(value) {
		is_destroying_effect = value;
	}
	var active_reaction = null;
	var untracking = false;
	function set_active_reaction(reaction) {
		active_reaction = reaction;
	}
	var active_effect = null;
	function set_active_effect(effect) {
		active_effect = effect;
	}
	var current_sources = null;
	function push_reaction_value(value) {
		if (active_reaction !== null && (!async_mode_flag && (active_reaction.f & 2097152) !== 0 || (active_reaction.f & 2) !== 0)) (current_sources ??= new Set()).add(value);
	}
	var new_deps = null;
	var skipped_deps = 0;
	var untracked_writes = null;
	function set_untracked_writes(value) {
		untracked_writes = value;
	}
	var write_version = 1;
	var read_version = 0;
	var update_version = read_version;
	function set_update_version(value) {
		update_version = value;
	}
	function increment_write_version() {
		return ++write_version;
	}
	function is_dirty(reaction) {
		var flags = reaction.f;
		if ((flags & 2048) !== 0) return true;
		if ((flags & 4096) !== 0) {
			var dependencies = reaction.deps;
			var length = dependencies.length;
			for (var i = 0; i < length; i++) {
				var dependency = dependencies[i];
				if (is_dirty(dependency)) update_derived(dependency);
				if (dependency.wv > reaction.wv) return true;
			}
			if ((flags & 512) !== 0 && batch_values === null) set_signal_status(reaction, CLEAN);
		}
		return false;
	}
	function schedule_possible_effect_self_invalidation(signal, effect, root = true) {
		var reactions = signal.reactions;
		if (reactions === null) return;
		if (!async_mode_flag && current_sources !== null && current_sources.has(signal)) return;
		for (var i = 0; i < reactions.length; i++) {
			var reaction = reactions[i];
			if ((reaction.f & 2) !== 0) schedule_possible_effect_self_invalidation(reaction, effect, false);
			else if (effect === reaction) {
				if (root) set_signal_status(reaction, DIRTY);
				else if ((reaction.f & 1024) !== 0) set_signal_status(reaction, MAYBE_DIRTY);
				schedule_effect(reaction);
			}
		}
	}
	function update_reaction(reaction) {
		var previous_deps = new_deps;
		var previous_skipped_deps = skipped_deps;
		var previous_untracked_writes = untracked_writes;
		var previous_reaction = active_reaction;
		var previous_sources = current_sources;
		var previous_component_context = component_context;
		var previous_untracking = untracking;
		var previous_update_version = update_version;
		var flags = reaction.f;
		new_deps = null;
		skipped_deps = 0;
		untracked_writes = null;
		active_reaction = (flags & 96) === 0 ? reaction : null;
		current_sources = null;
		set_component_context(reaction.ctx);
		untracking = false;
		update_version = ++read_version;
		if (reaction.ac !== null) {
			without_reactive_context(() => {
				reaction.ac.abort(STALE_REACTION);
			});
			reaction.ac = null;
		}
		try {
			reaction.f |= REACTION_IS_UPDATING;
			var fn = reaction.fn;
			var result = fn();
			reaction.f |= REACTION_RAN;
			var deps = update_dependencies(reaction);
			if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & 6146) === 0) for (var i = 0; i < untracked_writes.length; i++) schedule_possible_effect_self_invalidation(untracked_writes[i], reaction);
			if (previous_reaction !== null && previous_reaction !== reaction) {
				read_version++;
				if (previous_reaction.deps !== null) for (let i = 0; i < previous_skipped_deps; i += 1) previous_reaction.deps[i].rv = read_version;
				if (previous_deps !== null) for (const dep of previous_deps) dep.rv = read_version;
				if (untracked_writes !== null) {
					if (previous_untracked_writes === null) previous_untracked_writes = untracked_writes;
					else previous_untracked_writes.push(...untracked_writes);
				}
			}
			if ((reaction.f & 8388608) !== 0) reaction.f ^= ERROR_VALUE;
			return result;
		} catch (error) {
			update_dependencies(reaction);
			return handle_error(error);
		} finally {
			reaction.f ^= REACTION_IS_UPDATING;
			new_deps = previous_deps;
			skipped_deps = previous_skipped_deps;
			untracked_writes = previous_untracked_writes;
			active_reaction = previous_reaction;
			current_sources = previous_sources;
			set_component_context(previous_component_context);
			untracking = previous_untracking;
			update_version = previous_update_version;
		}
	}
	function update_dependencies(reaction) {
		var deps = reaction.deps;
		var is_fork = current_batch?.is_fork;
		if (new_deps !== null) {
			var i;
			if (!is_fork) remove_reactions(reaction, skipped_deps);
			if (deps !== null && skipped_deps > 0) {
				deps.length = skipped_deps + new_deps.length;
				for (i = 0; i < new_deps.length; i++) deps[skipped_deps + i] = new_deps[i];
			} else reaction.deps = deps = new_deps;
			if (effect_tracking() && (reaction.f & 512) !== 0) for (i = skipped_deps; i < deps.length; i++) (deps[i].reactions ??= []).push(reaction);
		} else if (!is_fork && deps !== null && skipped_deps < deps.length) {
			remove_reactions(reaction, skipped_deps);
			deps.length = skipped_deps;
		}
		return deps;
	}
	function remove_reaction(signal, dependency) {
		let reactions = dependency.reactions;
		if (reactions !== null) {
			var index = index_of.call(reactions, signal);
			if (index !== -1) {
				var new_length = reactions.length - 1;
				if (new_length === 0) reactions = dependency.reactions = null;
				else {
					reactions[index] = reactions[new_length];
					reactions.pop();
				}
			}
		}
		if (reactions === null && (dependency.f & 2) !== 0 && (new_deps === null || !includes.call(new_deps, dependency))) {
			var derived = dependency;
			if ((derived.f & 512) !== 0) derived.f ^= 512;
			if (derived.v !== UNINITIALIZED) update_derived_status(derived);
			if (derived.ac !== null) without_reactive_context(() => {
				derived.ac.abort(STALE_REACTION);
				derived.ac = null;
				set_signal_status(derived, DIRTY);
			});
			freeze_derived_effects(derived);
			remove_reactions(derived, 0);
		}
	}
	function remove_reactions(signal, start_index) {
		var dependencies = signal.deps;
		if (dependencies === null) return;
		for (var i = start_index; i < dependencies.length; i++) remove_reaction(signal, dependencies[i]);
	}
	function update_effect(effect) {
		var flags = effect.f;
		if ((flags & 16384) !== 0) return;
		set_signal_status(effect, CLEAN);
		var previous_effect = active_effect;
		var was_updating_effect = is_updating_effect;
		active_effect = effect;
		is_updating_effect = (flags & 96) === 0;
		try {
			if ((flags & 16777232) !== 0) destroy_block_effect_children(effect);
			else destroy_effect_children(effect);
			execute_effect_teardown(effect);
			var teardown = update_reaction(effect);
			effect.teardown = typeof teardown === "function" ? teardown : null;
			effect.wv = write_version;
		} finally {
			is_updating_effect = was_updating_effect;
			active_effect = previous_effect;
		}
	}
	async function tick() {
		if (async_mode_flag) return new Promise((f) => {
			requestAnimationFrame(() => f());
			setTimeout(() => f());
		});
		await Promise.resolve();
		flushSync();
	}
	function get(signal) {
		var is_derived = (signal.f & 2) !== 0;
		captured_signals?.add(signal);
		if (active_reaction !== null && !untracking) {
			if (!(active_effect !== null && (active_effect.f & 16384) !== 0) && (current_sources === null || !current_sources.has(signal))) {
				var deps = active_reaction.deps;
				if ((active_reaction.f & 2097152) !== 0) {
					if (signal.rv < read_version) {
						signal.rv = read_version;
						if (new_deps === null && deps !== null && deps[skipped_deps] === signal) skipped_deps++;
						else if (new_deps === null) new_deps = [signal];
						else new_deps.push(signal);
					}
				} else {
					active_reaction.deps ??= [];
					if (!includes.call(active_reaction.deps, signal)) active_reaction.deps.push(signal);
					var reactions = signal.reactions;
					if (reactions === null) signal.reactions = [active_reaction];
					else if (!includes.call(reactions, active_reaction)) reactions.push(active_reaction);
				}
			}
		}
		if (is_destroying_effect && old_values.has(signal)) return old_values.get(signal);
		if (is_derived) {
			var derived = signal;
			if (is_destroying_effect) {
				var value = derived.v;
				if ((derived.f & 1024) === 0 && derived.reactions !== null || depends_on_old_values(derived)) value = execute_derived(derived);
				old_values.set(derived, value);
				return value;
			}
			var should_connect = (derived.f & 512) === 0 && !untracking && active_reaction !== null && (is_updating_effect || (active_reaction.f & 512) !== 0);
			var is_new = (derived.f & REACTION_RAN) === 0;
			if (is_dirty(derived)) {
				if (should_connect) derived.f |= 512;
				update_derived(derived);
			}
			if (should_connect && !is_new) {
				unfreeze_derived_effects(derived);
				reconnect(derived);
			}
		}
		if (batch_values?.has(signal)) return batch_values.get(signal);
		if ((signal.f & 8388608) !== 0) throw signal.v;
		return signal.v;
	}
	function reconnect(derived) {
		derived.f |= 512;
		if (derived.deps === null) return;
		for (const dep of derived.deps) {
			(dep.reactions ??= []).push(derived);
			if ((dep.f & 2) !== 0 && (dep.f & 512) === 0) {
				unfreeze_derived_effects(dep);
				reconnect(dep);
			}
		}
	}
	function depends_on_old_values(derived) {
		if (derived.v === UNINITIALIZED) return true;
		if (derived.deps === null) return false;
		for (const dep of derived.deps) {
			if (old_values.has(dep)) return true;
			if ((dep.f & 2) !== 0 && depends_on_old_values(dep)) return true;
		}
		return false;
	}
	function untrack(fn) {
		var previous_untracking = untracking;
		try {
			untracking = true;
			return fn();
		} finally {
			untracking = previous_untracking;
		}
	}
	function deep_read_state(value) {
		if (typeof value !== "object" || !value || value instanceof EventTarget) return;
		if (STATE_SYMBOL in value) deep_read(value);
		else if (!Array.isArray(value)) for (let key in value) {
			const prop = value[key];
			if (typeof prop === "object" && prop && STATE_SYMBOL in prop) deep_read(prop);
		}
	}
	function deep_read(value, visited = new Set()) {
		if (typeof value === "object" && value !== null && !(value instanceof EventTarget) && !visited.has(value)) {
			visited.add(value);
			if (value instanceof Date) value.getTime();
			for (let key in value) try {
				deep_read(value[key], visited);
			} catch (e) {}
			const proto = get_prototype_of(value);
			if (proto !== Object.prototype && proto !== Array.prototype && proto !== Map.prototype && proto !== Set.prototype && proto !== Date.prototype) {
				const descriptors = get_descriptors(proto);
				for (let key in descriptors) {
					const get = descriptors[key].get;
					if (get) try {
						get.call(value);
					} catch (e) {}
				}
			}
		}
	}
	function is_capture_event(name) {
		return name.endsWith("capture") && name !== "gotpointercapture" && name !== "lostpointercapture";
	}
	var DELEGATED_EVENTS = [
		"beforeinput",
		"click",
		"change",
		"dblclick",
		"contextmenu",
		"focusin",
		"focusout",
		"input",
		"keydown",
		"keyup",
		"mousedown",
		"mousemove",
		"mouseout",
		"mouseover",
		"mouseup",
		"pointerdown",
		"pointermove",
		"pointerout",
		"pointerover",
		"pointerup",
		"touchend",
		"touchmove",
		"touchstart"
	];
	function can_delegate_event(event_name) {
		return DELEGATED_EVENTS.includes(event_name);
	}
	var DOM_BOOLEAN_ATTRIBUTES = [
		"allowfullscreen",
		"async",
		"autofocus",
		"autoplay",
		"checked",
		"controls",
		"default",
		"disabled",
		"formnovalidate",
		"indeterminate",
		"inert",
		"ismap",
		"loop",
		"multiple",
		"muted",
		"nomodule",
		"novalidate",
		"open",
		"playsinline",
		"readonly",
		"required",
		"reversed",
		"seamless",
		"selected",
		"webkitdirectory",
		"defer",
		"disablepictureinpicture",
		"disableremoteplayback"
	];
	var ATTRIBUTE_ALIASES = {
		formnovalidate: "formNoValidate",
		ismap: "isMap",
		nomodule: "noModule",
		playsinline: "playsInline",
		readonly: "readOnly",
		defaultvalue: "defaultValue",
		defaultchecked: "defaultChecked",
		srcobject: "srcObject",
		novalidate: "noValidate",
		allowfullscreen: "allowFullscreen",
		disablepictureinpicture: "disablePictureInPicture",
		disableremoteplayback: "disableRemotePlayback"
	};
	function normalize_attribute(name) {
		name = name.toLowerCase();
		return ATTRIBUTE_ALIASES[name] ?? name;
	}
	[...DOM_BOOLEAN_ATTRIBUTES];
	var PASSIVE_EVENTS = ["touchstart", "touchmove"];
	function is_passive_event(name) {
		return PASSIVE_EVENTS.includes(name);
	}
	var RAW_TEXT_ELEMENTS = [
		"textarea",
		"script",
		"style",
		"title"
	];
	function is_raw_text_element(name) {
		return RAW_TEXT_ELEMENTS.includes(name);
	}
	var event_symbol = Symbol("events");
	var all_registered_events = new Set();
	var root_event_handles = new Set();
	function replay_events(dom) {
		if (!hydrating) return;
		dom.removeAttribute("onload");
		dom.removeAttribute("onerror");
		const event = dom.__e;
		if (event !== void 0) {
			dom.__e = void 0;
			queueMicrotask(() => {
				if (dom.isConnected) dom.dispatchEvent(event);
			});
		}
	}
	function create_event(event_name, dom, handler, options = {}) {
		function target_handler(event) {
			if (!options.capture) handle_event_propagation.call(dom, event);
			if (!event.cancelBubble) return without_reactive_context(() => {
				return handler?.call(this, event);
			});
		}
		if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
			target_handler.__removed = false;
			queue_micro_task(() => {
				if (!target_handler.__removed) dom.addEventListener(event_name, target_handler, options);
			});
		} else dom.addEventListener(event_name, target_handler, options);
		return target_handler;
	}
	function event(event_name, dom, handler, capture, passive) {
		var options = {
			capture,
			passive
		};
		var target_handler = create_event(event_name, dom, handler, options);
		if (dom === document.body || dom === window || dom === document || dom instanceof HTMLMediaElement) teardown(() => {
			target_handler.__removed = true;
			dom.removeEventListener(event_name, target_handler, options);
		});
	}
	function delegated(event_name, element, handler) {
		(element[event_symbol] ??= {})[event_name] = handler;
	}
	function delegate(events) {
		for (var i = 0; i < events.length; i++) all_registered_events.add(events[i]);
		for (var fn of root_event_handles) fn(events);
	}
	var last_propagated_event = null;
	var last_propagated_event_clear_scheduled = false;
	function handle_event_propagation(event) {
		var handler_element = this;
		var owner_document = handler_element.ownerDocument;
		var event_name = event.type;
		var path = event.composedPath?.() || [];
		var current_target = path[0] || event.target;
		last_propagated_event = event;
		if (!last_propagated_event_clear_scheduled) {
			last_propagated_event_clear_scheduled = true;
			setTimeout(() => {
				last_propagated_event_clear_scheduled = false;
				last_propagated_event = null;
			});
		}
		var path_idx = 0;
		var handled_at = last_propagated_event === event && event[event_symbol];
		if (handled_at) {
			var at_idx = path.indexOf(handled_at);
			if (at_idx !== -1 && (handler_element === document || handler_element === window)) {
				event[event_symbol] = handler_element;
				return;
			}
			var handler_idx = path.indexOf(handler_element);
			if (handler_idx === -1) return;
			if (at_idx <= handler_idx) path_idx = at_idx;
		}
		current_target = path[path_idx] || event.target;
		if (current_target === handler_element) return;
		define_property(event, "currentTarget", {
			configurable: true,
			get() {
				return current_target || owner_document;
			}
		});
		var previous_reaction = active_reaction;
		var previous_effect = active_effect;
		set_active_reaction(null);
		set_active_effect(null);
		try {
			var throw_error;
			var other_errors = [];
			while (current_target !== null) {
				if (current_target === handler_element) break;
				try {
					var delegated = current_target[event_symbol]?.[event_name];
					if (delegated != null && (!current_target.disabled || event.target === current_target)) delegated.call(current_target, event);
				} catch (error) {
					if (throw_error) other_errors.push(error);
					else throw_error = error;
				}
				if (event.cancelBubble) break;
				path_idx++;
				current_target = path_idx < path.length ? path[path_idx] : null;
			}
			if (throw_error) {
				for (let error of other_errors) queueMicrotask(() => {
					throw error;
				});
				throw throw_error;
			}
		} finally {
			event[event_symbol] = handler_element;
			delete event.currentTarget;
			set_active_reaction(previous_reaction);
			set_active_effect(previous_effect);
		}
	}
	var policy = globalThis?.window?.trustedTypes && globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (html) => {
		return html;
	} });
	function create_trusted_html(html) {
		return policy?.createHTML(html) ?? html;
	}
	function create_fragment_from_html(html) {
		var elem = create_element("template");
		elem.innerHTML = create_trusted_html(html.replaceAll("<!>", "<!---->"));
		return elem.content;
	}
	function assign_nodes(start, end) {
		var effect = active_effect;
		if (effect.nodes === null) effect.nodes = {
			start,
			end,
			a: null,
			t: null
		};
	}
	function from_html(content, flags) {
		var is_fragment = (flags & 1) !== 0;
		var use_import_node = (flags & 2) !== 0;
		var node;
		var has_start = !content.startsWith("<!>");
		return () => {
			if (hydrating) {
				assign_nodes(hydrate_node, null);
				return hydrate_node;
			}
			if (node === void 0) {
				node = create_fragment_from_html(has_start ? content : "<!>" + content);
				if (!is_fragment) node = get_first_child(node);
			}
			var clone = use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true);
			if (is_fragment) {
				var start = get_first_child(clone);
				var end = clone.lastChild;
				assign_nodes(start, end);
			} else assign_nodes(clone, clone);
			return clone;
		};
	}
	function from_namespace(content, flags, ns = "svg") {
		var has_start = !content.startsWith("<!>");
		var is_fragment = (flags & 1) !== 0;
		var wrapped = `<${ns}>${has_start ? content : "<!>" + content}</${ns}>`;
		var node;
		return () => {
			if (hydrating) {
				assign_nodes(hydrate_node, null);
				return hydrate_node;
			}
			if (!node) {
				var root = get_first_child(create_fragment_from_html(wrapped));
				if (is_fragment) {
					node = document.createDocumentFragment();
					while (get_first_child(root)) node.appendChild(get_first_child(root));
				} else node = get_first_child(root);
			}
			var clone = node.cloneNode(true);
			if (is_fragment) {
				var start = get_first_child(clone);
				var end = clone.lastChild;
				assign_nodes(start, end);
			} else assign_nodes(clone, clone);
			return clone;
		};
	}
	function from_svg(content, flags) {
		return from_namespace(content, flags, "svg");
	}
	function text(value = "") {
		if (!hydrating) {
			var t = create_text(value + "");
			assign_nodes(t, t);
			return t;
		}
		var node = hydrate_node;
		if (node.nodeType !== 3) {
			node.before(node = create_text());
			set_hydrate_node(node);
		} else merge_text_nodes(node);
		assign_nodes(node, node);
		return node;
	}
	function comment() {
		if (hydrating) {
			assign_nodes(hydrate_node, null);
			return hydrate_node;
		}
		var frag = document.createDocumentFragment();
		var start = document.createComment("");
		var anchor = create_text();
		frag.append(start, anchor);
		assign_nodes(start, anchor);
		return frag;
	}
	function append(anchor, dom) {
		if (hydrating) {
			var effect = active_effect;
			if ((effect.f & 32768) === 0 || effect.nodes.end === null) effect.nodes.end = hydrate_node;
			hydrate_next();
			return;
		}
		if (anchor === null) return;
		anchor.before(dom);
	}
	function createSubscriber(start) {
		let subscribers = 0;
		let version = source(0);
		let stop;
		return () => {
			if (effect_tracking()) {
				get(version);
				render_effect(() => {
					if (subscribers === 0) stop = untrack(() => start(() => increment(version)));
					subscribers += 1;
					return () => {
						queue_micro_task(() => {
							subscribers -= 1;
							if (subscribers === 0) {
								stop?.();
								stop = void 0;
								increment(version);
							}
						});
					};
				});
			}
		};
	}
	var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;
	function boundary(node, props, children, transform_error) {
		new Boundary(node, props, children, transform_error);
	}
	var Boundary = class {
		parent;
		is_pending = false;
		transform_error;
		#anchor;
		#hydrate_open = hydrating ? hydrate_node : null;
		#props;
		#children;
		#effect;
		#main_effect = null;
		#pending_effect = null;
		#failed_effect = null;
		#offscreen_fragment = null;
		#local_pending_count = 0;
		#pending_count = 0;
		#pending_count_update_queued = false;
		#dirty_effects = new Set();
		#maybe_dirty_effects = new Set();
		#effect_pending = null;
		#effect_pending_subscriber = createSubscriber(() => {
			this.#effect_pending = source(this.#local_pending_count);
			return () => {
				this.#effect_pending = null;
			};
		});
		constructor(node, props, children, transform_error) {
			this.#anchor = node;
			this.#props = props;
			this.#children = (anchor) => {
				var effect = active_effect;
				effect.b = this;
				effect.f |= 128;
				children(anchor);
			};
			this.parent = active_effect.b;
			this.transform_error = transform_error ?? this.parent?.transform_error ?? ((e) => e);
			this.#effect = block(() => {
				if (hydrating) {
					const comment = this.#hydrate_open;
					hydrate_next();
					const server_rendered_pending = comment.data === "[!";
					if (comment.data.startsWith("[?")) {
						const serialized_error = JSON.parse(comment.data.slice(2));
						this.#hydrate_failed_content(serialized_error);
					} else if (server_rendered_pending) this.#hydrate_pending_content();
					else this.#hydrate_resolved_content();
				} else this.#render();
			}, flags);
			if (hydrating) this.#anchor = hydrate_node;
		}
		#hydrate_resolved_content() {
			try {
				this.#main_effect = branch(() => this.#children(this.#anchor));
			} catch (error) {
				this.error(error);
			}
		}
		#hydrate_failed_content(error) {
			const failed = this.#props.failed;
			const { reset, invoke_onerror } = this.#create_reset(error);
			queue_micro_task(invoke_onerror);
			if (!failed) return;
			this.#failed_effect = branch(() => {
				failed(this.#anchor, () => error, () => reset);
			});
		}
		#create_reset(error) {
			var did_reset = false;
			var calling_on_error = false;
			const reset = () => {
				if (did_reset) {
					svelte_boundary_reset_noop();
					return;
				}
				did_reset = true;
				if (calling_on_error) svelte_boundary_reset_onerror();
				if (this.#failed_effect !== null) pause_effect(this.#failed_effect, () => {
					this.#failed_effect = null;
				});
				this.#run(() => {
					this.#render();
				});
			};
			const invoke_onerror = () => {
				try {
					calling_on_error = true;
					this.#props.onerror?.(error, reset);
					calling_on_error = false;
				} catch (err) {
					invoke_error_boundary(err, this.#effect && this.#effect.parent);
				}
			};
			return {
				reset,
				invoke_onerror
			};
		}
		#hydrate_pending_content() {
			const pending = this.#props.pending;
			if (!pending) return;
			this.is_pending = true;
			this.#pending_effect = branch(() => pending(this.#anchor));
			queue_micro_task(() => {
				var fragment = this.#offscreen_fragment = document.createDocumentFragment();
				var anchor = create_text();
				var handled = false;
				fragment.append(anchor);
				this.#main_effect = this.#run(() => {
					try {
						return branch(() => this.#children(anchor));
					} catch (error) {
						try {
							this.error(error);
							handled = true;
						} catch (error) {
							invoke_error_boundary(error, this.#effect.parent);
						}
						return null;
					}
				});
				if (this.#main_effect === null) {
					this.#offscreen_fragment = null;
					if (handled) this.#resolve(current_batch);
					return;
				}
				if (this.#pending_count === 0) {
					this.#anchor.before(fragment);
					this.#offscreen_fragment = null;
					pause_effect(this.#pending_effect, () => {
						this.#pending_effect = null;
					});
					this.#resolve(current_batch);
				}
			});
		}
		#render() {
			try {
				this.is_pending = this.has_pending_snippet();
				this.#pending_count = 0;
				this.#local_pending_count = 0;
				this.#main_effect = branch(() => {
					this.#children(this.#anchor);
				});
				if (this.#pending_count > 0) {
					var fragment = this.#offscreen_fragment = document.createDocumentFragment();
					move_effect(this.#main_effect, fragment);
					const pending = this.#props.pending;
					this.#pending_effect = branch(() => pending(this.#anchor));
				} else this.#resolve(current_batch);
			} catch (error) {
				this.error(error);
			}
		}
		#resolve(batch) {
			this.is_pending = false;
			batch.transfer_effects(this.#dirty_effects, this.#maybe_dirty_effects);
		}
		defer_effect(effect) {
			defer_effect(effect, this.#dirty_effects, this.#maybe_dirty_effects);
		}
		is_rendered() {
			return !this.is_pending && (!this.parent || this.parent.is_rendered());
		}
		has_pending_snippet() {
			return !!this.#props.pending;
		}
		#run(fn) {
			var previous_effect = active_effect;
			var previous_reaction = active_reaction;
			var previous_ctx = component_context;
			set_active_effect(this.#effect);
			set_active_reaction(this.#effect);
			set_component_context(this.#effect.ctx);
			try {
				Batch.ensure();
				return fn();
			} finally {
				set_active_effect(previous_effect);
				set_active_reaction(previous_reaction);
				set_component_context(previous_ctx);
			}
		}
		#update_pending_count(d, batch) {
			if (!this.has_pending_snippet()) {
				if (this.parent) this.parent.#update_pending_count(d, batch);
				return;
			}
			this.#pending_count += d;
			if (this.#pending_count === 0) {
				this.#resolve(batch);
				if (this.#pending_effect) pause_effect(this.#pending_effect, () => {
					this.#pending_effect = null;
				});
				if (this.#offscreen_fragment) {
					this.#anchor.before(this.#offscreen_fragment);
					this.#offscreen_fragment = null;
				}
			}
		}
		update_pending_count(d, batch) {
			this.#update_pending_count(d, batch);
			this.#local_pending_count += d;
			if (!this.#effect_pending || this.#pending_count_update_queued) return;
			this.#pending_count_update_queued = true;
			queue_micro_task(() => {
				this.#pending_count_update_queued = false;
				if (this.#effect_pending) internal_set(this.#effect_pending, this.#local_pending_count);
			});
		}
		get_effect_pending() {
			this.#effect_pending_subscriber();
			return get(this.#effect_pending);
		}
		error(error) {
			if (!this.#props.onerror && !this.#props.failed) throw error;
			if (current_batch?.is_fork) {
				if (this.#main_effect) current_batch.skip_effect(this.#main_effect);
				if (this.#pending_effect) current_batch.skip_effect(this.#pending_effect);
				if (this.#failed_effect) current_batch.skip_effect(this.#failed_effect);
				current_batch.oncommit(() => {
					this.#handle_error(error);
				});
			} else this.#handle_error(error);
		}
		#handle_error(error) {
			if (this.#main_effect) {
				destroy_effect(this.#main_effect);
				this.#main_effect = null;
			}
			if (this.#pending_effect) {
				destroy_effect(this.#pending_effect);
				this.#pending_effect = null;
			}
			if (this.#failed_effect) {
				destroy_effect(this.#failed_effect);
				this.#failed_effect = null;
			}
			if (hydrating) {
				set_hydrate_node(this.#hydrate_open);
				next();
				set_hydrate_node(skip_nodes());
			}
			let failed = this.#props.failed;
			const handle_error_result = (transformed_error) => {
				const { reset, invoke_onerror } = this.#create_reset(transformed_error);
				invoke_onerror();
				if (failed) this.#failed_effect = this.#run(() => {
					try {
						return branch(() => {
							var effect = active_effect;
							effect.b = this;
							effect.f |= 128;
							failed(this.#anchor, () => transformed_error, () => reset);
						});
					} catch (error) {
						invoke_error_boundary(error, this.#effect.parent);
						return null;
					}
				});
			};
			queue_micro_task(() => {
				var result;
				try {
					result = this.transform_error(error);
				} catch (e) {
					invoke_error_boundary(e, this.#effect && this.#effect.parent);
					return;
				}
				if (result !== null && typeof result === "object" && typeof result.then === "function") result.then(handle_error_result, (e) => invoke_error_boundary(e, this.#effect && this.#effect.parent));
				else handle_error_result(result);
			});
		}
	};
	function set_text(text, value) {
		var str = value == null ? "" : typeof value === "object" ? `${value}` : value;
		if (str !== (text[TEXT_CACHE] ??= text.nodeValue)) {
			text[TEXT_CACHE] = str;
			text.nodeValue = `${str}`;
		}
	}
	function mount(component, options) {
		return _mount(component, options);
	}
	var listeners = new Map();
	function _mount(Component, { target, anchor, props = {}, events, context, intro = true, transformError }) {
		init_operations();
		var component = void 0;
		var unmount = component_root(() => {
			var anchor_node = anchor ?? target.appendChild(create_text());
			boundary(anchor_node, { pending: () => {} }, (anchor_node) => {
				push({});
				var ctx = component_context;
				if (context) ctx.c = context;
				if (events) props.$$events = events;
				if (hydrating) assign_nodes(anchor_node, null);
				component = Component(anchor_node, props) || mark_as_component();
				if (hydrating) {
					active_effect.nodes.end = hydrate_node;
					if (hydrate_node === null || hydrate_node.nodeType !== 8 || hydrate_node.data !== "]") {
						hydration_mismatch();
						throw HYDRATION_ERROR;
					}
				}
				pop();
			}, transformError);
			var registered_events = new Set();
			var event_handle = (events) => {
				for (var i = 0; i < events.length; i++) {
					var event_name = events[i];
					if (registered_events.has(event_name)) continue;
					registered_events.add(event_name);
					var passive = is_passive_event(event_name);
					for (const node of [target, document]) {
						var counts = listeners.get(node);
						if (counts === void 0) {
							counts = new Map();
							listeners.set(node, counts);
						}
						var count = counts.get(event_name);
						if (count === void 0) {
							node.addEventListener(event_name, handle_event_propagation, { passive });
							counts.set(event_name, 1);
						} else counts.set(event_name, count + 1);
					}
				}
			};
			event_handle(array_from(all_registered_events));
			root_event_handles.add(event_handle);
			return () => {
				for (var event_name of registered_events) for (const node of [target, document]) {
					var counts = listeners.get(node);
					var count = counts.get(event_name);
					if (--count == 0) {
						node.removeEventListener(event_name, handle_event_propagation);
						counts.delete(event_name);
						if (counts.size === 0) listeners.delete(node);
					} else counts.set(event_name, count);
				}
				root_event_handles.delete(event_handle);
				if (anchor_node !== anchor) anchor_node.parentNode?.removeChild(anchor_node);
			};
		});
		mounted_components.set(component, unmount);
		return component;
	}
	var mounted_components = new WeakMap();
	function unmount(component, options) {
		const fn = mounted_components.get(component);
		if (fn) {
			mounted_components.delete(component);
			return fn(options);
		}
		return Promise.resolve();
	}
	var BranchManager = class {
		anchor;
		#batches = new Map();
		#onscreen = new Map();
		#offscreen = new Map();
		#outroing = new Set();
		#transition = true;
		constructor(anchor, transition = true) {
			this.anchor = anchor;
			this.#transition = transition;
		}
		#commit = (batch) => {
			if (!this.#batches.has(batch)) return;
			var key = this.#batches.get(batch);
			var onscreen = this.#onscreen.get(key);
			if (onscreen) {
				resume_effect(onscreen);
				this.#outroing.delete(key);
			} else {
				var offscreen = this.#offscreen.get(key);
				if (offscreen) {
					resume_effect(offscreen.effect);
					this.#onscreen.set(key, offscreen.effect);
					this.#offscreen.delete(key);
					offscreen.fragment.lastChild.remove();
					this.anchor.before(offscreen.fragment);
					onscreen = offscreen.effect;
				}
			}
			for (const [b, k] of this.#batches) {
				this.#batches.delete(b);
				if (b === batch) break;
				const offscreen = this.#offscreen.get(k);
				if (offscreen) {
					destroy_effect(offscreen.effect);
					this.#offscreen.delete(k);
				}
			}
			for (const [k, effect] of this.#onscreen) {
				if (k === key || this.#outroing.has(k)) continue;
				const on_destroy = () => {
					if (Array.from(this.#batches.values()).includes(k)) {
						var fragment = document.createDocumentFragment();
						move_effect(effect, fragment);
						fragment.append(create_text());
						this.#offscreen.set(k, {
							effect,
							fragment
						});
					} else destroy_effect(effect);
					this.#outroing.delete(k);
					this.#onscreen.delete(k);
				};
				if (this.#transition || !onscreen) {
					this.#outroing.add(k);
					pause_effect(effect, on_destroy, false);
				} else on_destroy();
			}
		};
		#discard = (batch) => {
			this.#batches.delete(batch);
			const keys = Array.from(this.#batches.values());
			for (const [k, branch] of this.#offscreen) if (!keys.includes(k)) {
				destroy_effect(branch.effect);
				this.#offscreen.delete(k);
			}
		};
		ensure(key, fn) {
			var batch = current_batch;
			var defer = should_defer_append();
			if (fn && !this.#onscreen.has(key) && !this.#offscreen.has(key)) {
				if (defer) {
					var fragment = document.createDocumentFragment();
					var target = create_text();
					fragment.append(target);
					this.#offscreen.set(key, {
						effect: branch(() => fn(target)),
						fragment
					});
				} else this.#onscreen.set(key, branch(() => fn(this.anchor)));
			}
			this.#batches.set(batch, key);
			if (defer) {
				for (const [k, effect] of this.#onscreen) if (k === key) batch.unskip_effect(effect);
				else batch.skip_effect(effect);
				for (const [k, branch] of this.#offscreen) if (k === key) batch.unskip_effect(branch.effect);
				else batch.skip_effect(branch.effect);
				batch.oncommit(this.#commit);
				batch.ondiscard(this.#discard);
			} else {
				if (hydrating) this.anchor = hydrate_node;
				this.#commit(batch);
			}
		}
	};
	function if_block(node, fn, elseif = false) {
		var marker;
		if (hydrating) {
			marker = hydrate_node;
			hydrate_next();
		}
		var branches = new BranchManager(node);
		var flags = elseif ? EFFECT_TRANSPARENT : 0;
		function update_branch(key, fn) {
			if (hydrating) {
				var data = read_hydration_instruction(marker);
				if (key !== parseInt(data.substring(1))) {
					var anchor = skip_nodes();
					set_hydrate_node(anchor);
					branches.anchor = anchor;
					set_hydrating(false);
					branches.ensure(key, fn);
					set_hydrating(true);
					return;
				}
			}
			branches.ensure(key, fn);
		}
		block(() => {
			var has_branch = false;
			fn((fn, key = 0) => {
				has_branch = true;
				update_branch(key, fn);
			});
			if (!has_branch) update_branch(-1, null);
		}, flags);
	}
	var NAN = Symbol("NaN");
	function key(node, get_key, render_fn) {
		if (hydrating) hydrate_next();
		var branches = new BranchManager(node);
		var legacy = !is_runes();
		block(() => {
			var key = get_key();
			if (key !== key) key = NAN;
			if (legacy && key !== null && typeof key === "object") key = {};
			branches.ensure(key, render_fn);
		});
	}
	function index(_, i) {
		return i;
	}
	function pause_effects(state, to_destroy, controlled_anchor) {
		var transitions = [];
		var length = to_destroy.length;
		var group;
		var remaining = to_destroy.length;
		for (var i = 0; i < length; i++) {
			let effect = to_destroy[i];
			pause_effect(effect, () => {
				if (group) {
					group.pending.delete(effect);
					group.done.add(effect);
					if (group.pending.size === 0) {
						var groups = state.outrogroups;
						destroy_effects(state, array_from(group.done));
						groups.delete(group);
						if (groups.size === 0) state.outrogroups = null;
					}
				} else remaining -= 1;
			}, false);
		}
		if (remaining === 0) {
			var fast_path = transitions.length === 0 && controlled_anchor !== null && state.pending.size === 0;
			if (fast_path) {
				var anchor = controlled_anchor;
				var parent_node = anchor.parentNode;
				clear_text_content(parent_node);
				parent_node.append(anchor);
				state.items.clear();
			}
			destroy_effects(state, to_destroy, !fast_path);
		} else {
			group = {
				pending: new Set(to_destroy),
				done: new Set()
			};
			(state.outrogroups ??= new Set()).add(group);
		}
	}
	function destroy_effects(state, to_destroy, remove_dom = true) {
		var preserved_effects;
		if (state.pending.size > 0) {
			preserved_effects = new Set();
			for (const keys of state.pending.values()) for (const key of keys) preserved_effects.add(state.items.get(key).e);
		}
		for (var i = 0; i < to_destroy.length; i++) {
			var e = to_destroy[i];
			if (preserved_effects?.has(e)) {
				e.f |= EFFECT_OFFSCREEN;
				move_effect(e, document.createDocumentFragment());
			} else destroy_effect(to_destroy[i], remove_dom);
		}
	}
	var offscreen_anchor;
	function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
		var anchor = node;
		var items = new Map();
		if ((flags & 4) !== 0) {
			var parent_node = node;
			anchor = hydrating ? set_hydrate_node(get_first_child(parent_node)) : parent_node.appendChild(create_text());
		}
		if (hydrating) hydrate_next();
		var fallback = null;
		var each_array = derived_safe_equal(() => {
			var collection = get_collection();
			return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
		});
		var array;
		var pending = new Map();
		var first_run = true;
		function commit(batch) {
			if ((state.effect.f & 16384) !== 0) return;
			state.pending.delete(batch);
			state.fallback = fallback;
			reconcile(state, array, anchor, flags, get_key);
			if (fallback !== null) {
				if (array.length === 0) {
					if ((fallback.f & 33554432) === 0) resume_effect(fallback);
					else {
						fallback.f ^= EFFECT_OFFSCREEN;
						move(fallback, null, anchor);
					}
				} else pause_effect(fallback, () => {
					fallback = null;
				});
			}
		}
		function discard(batch) {
			state.pending.delete(batch);
		}
		var state = {
			effect: block(() => {
				array = get(each_array);
				var length = array.length;
				let mismatch = false;
				if (hydrating) {
					if (read_hydration_instruction(anchor) === "[!" !== (length === 0)) {
						anchor = skip_nodes();
						set_hydrate_node(anchor);
						set_hydrating(false);
						mismatch = true;
					}
				}
				var keys = new Set();
				var batch = current_batch;
				var defer = should_defer_append();
				for (var index = 0; index < length; index += 1) {
					if (hydrating && hydrate_node.nodeType === 8 && hydrate_node.data === "]") {
						anchor = hydrate_node;
						mismatch = true;
						set_hydrating(false);
					}
					var value = array[index];
					var key = get_key(value, index);
					var item = first_run ? null : items.get(key);
					if (item) {
						if (item.v) internal_set(item.v, value);
						if (item.i) internal_set(item.i, index);
						if (defer) batch.unskip_effect(item.e);
					} else {
						item = create_item(items, first_run ? anchor : offscreen_anchor ??= create_text(), value, key, index, render_fn, flags, get_collection);
						if (!first_run) item.e.f |= EFFECT_OFFSCREEN;
						items.set(key, item);
					}
					keys.add(key);
				}
				if (length === 0 && fallback_fn && !fallback) {
					if (first_run) fallback = branch(() => fallback_fn(anchor));
					else {
						fallback = branch(() => fallback_fn(offscreen_anchor ??= create_text()));
						fallback.f |= EFFECT_OFFSCREEN;
					}
				}
				if (length > keys.size) each_key_duplicate("", "", "");
				if (hydrating && length > 0) set_hydrate_node(skip_nodes());
				if (!first_run) {
					pending.set(batch, keys);
					if (defer) {
						for (const [key, item] of items) if (!keys.has(key)) batch.skip_effect(item.e);
						batch.oncommit(commit);
						batch.ondiscard(discard);
					} else commit(batch);
				}
				if (mismatch) set_hydrating(true);
				get(each_array);
			}),
			flags,
			items,
			pending,
			outrogroups: null,
			fallback
		};
		first_run = false;
		if (hydrating) anchor = hydrate_node;
	}
	function skip_to_branch(effect) {
		while (effect !== null && (effect.f & 32) === 0) effect = effect.next;
		return effect;
	}
	function reconcile(state, array, anchor, flags, get_key) {
		var is_animated = (flags & 8) !== 0;
		var length = array.length;
		var items = state.items;
		var current = skip_to_branch(state.effect.first);
		var seen;
		var prev = null;
		var to_animate;
		var matched = [];
		var stashed = [];
		var value;
		var key;
		var effect;
		var i;
		if (is_animated) for (i = 0; i < length; i += 1) {
			value = array[i];
			key = get_key(value, i);
			effect = items.get(key).e;
			if ((effect.f & 33554432) === 0) {
				effect.nodes?.a?.measure();
				(to_animate ??= new Set()).add(effect);
			}
		}
		for (i = 0; i < length; i += 1) {
			value = array[i];
			key = get_key(value, i);
			effect = items.get(key).e;
			if (state.outrogroups !== null) for (const group of state.outrogroups) {
				group.pending.delete(effect);
				group.done.delete(effect);
			}
			if ((effect.f & 8192) !== 0) {
				resume_effect(effect);
				if (is_animated) {
					effect.nodes?.a?.unfix();
					(to_animate ??= new Set()).delete(effect);
				}
			}
			if ((effect.f & 33554432) !== 0) {
				effect.f ^= EFFECT_OFFSCREEN;
				if (effect === current) move(effect, null, anchor);
				else {
					var next = prev ? prev.next : current;
					if (effect === state.effect.last) state.effect.last = effect.prev;
					if (effect.prev) effect.prev.next = effect.next;
					if (effect.next) effect.next.prev = effect.prev;
					link(state, prev, effect);
					link(state, effect, next);
					move(effect, next, anchor);
					prev = effect;
					matched = [];
					stashed = [];
					current = skip_to_branch(prev.next);
					continue;
				}
			}
			if (effect !== current) {
				if (seen !== void 0 && seen.has(effect)) {
					if (matched.length < stashed.length) {
						var start = stashed[0];
						var j;
						prev = start.prev;
						var a = matched[0];
						var b = matched[matched.length - 1];
						for (j = 0; j < matched.length; j += 1) move(matched[j], start, anchor);
						for (j = 0; j < stashed.length; j += 1) seen.delete(stashed[j]);
						link(state, a.prev, b.next);
						link(state, prev, a);
						link(state, b, start);
						current = start;
						prev = b;
						i -= 1;
						matched = [];
						stashed = [];
					} else {
						seen.delete(effect);
						move(effect, current, anchor);
						link(state, effect.prev, effect.next);
						link(state, effect, prev === null ? state.effect.first : prev.next);
						link(state, prev, effect);
						prev = effect;
					}
					continue;
				}
				matched = [];
				stashed = [];
				while (current !== null && current !== effect) {
					(seen ??= new Set()).add(current);
					stashed.push(current);
					current = skip_to_branch(current.next);
				}
				if (current === null) continue;
			}
			if ((effect.f & 33554432) === 0) matched.push(effect);
			prev = effect;
			current = skip_to_branch(effect.next);
		}
		if (state.outrogroups !== null) {
			for (const group of state.outrogroups) if (group.pending.size === 0) {
				destroy_effects(state, array_from(group.done));
				state.outrogroups?.delete(group);
			}
			if (state.outrogroups.size === 0) state.outrogroups = null;
		}
		if (current !== null || seen !== void 0) {
			var to_destroy = [];
			if (seen !== void 0) {
				for (effect of seen) if ((effect.f & 8192) === 0) to_destroy.push(effect);
			}
			while (current !== null) {
				if ((current.f & 8192) === 0 && current !== state.fallback) to_destroy.push(current);
				current = skip_to_branch(current.next);
			}
			var destroy_length = to_destroy.length;
			if (destroy_length > 0) {
				var controlled_anchor = (flags & 4) !== 0 && length === 0 ? anchor : null;
				if (is_animated) {
					for (i = 0; i < destroy_length; i += 1) to_destroy[i].nodes?.a?.measure();
					for (i = 0; i < destroy_length; i += 1) to_destroy[i].nodes?.a?.fix();
				}
				pause_effects(state, to_destroy, controlled_anchor);
			}
		}
		if (is_animated) queue_micro_task(() => {
			if (to_animate === void 0) return;
			for (effect of to_animate) effect.nodes?.a?.apply();
		});
	}
	function create_item(items, anchor, value, key, index, render_fn, flags, get_collection) {
		var v = (flags & 1) !== 0 ? (flags & 16) === 0 ? mutable_source(value, false, false) : source(value) : null;
		var i = (flags & 2) !== 0 ? source(index) : null;
		return {
			v,
			i,
			e: branch(() => {
				render_fn(anchor, v ?? value, i ?? index, get_collection);
				return () => {
					items.delete(key);
				};
			})
		};
	}
	function move(effect, next, anchor) {
		if (!effect.nodes) return;
		var node = effect.nodes.start;
		var end = effect.nodes.end;
		var dest = next && (next.f & 33554432) === 0 ? next.nodes.start : anchor;
		while (node !== null) {
			var next_node = get_next_sibling(node);
			dest.before(node);
			if (node === end) return;
			node = next_node;
		}
	}
	function link(state, prev, next) {
		if (prev === null) state.effect.first = next;
		else prev.next = next;
		if (next === null) state.effect.last = prev;
		else next.prev = prev;
	}
	function html(node, get_value, is_controlled = false, svg = false, mathml = false, skip_warning = false) {
		var anchor = node;
		var value = "";
		if (is_controlled) {
			var parent_node = node;
			if (hydrating) anchor = set_hydrate_node(get_first_child(parent_node));
		}
		template_effect(() => {
			var effect = active_effect;
			if (value === (value = get_value() ?? "")) {
				if (hydrating) hydrate_next();
				return;
			}
			if (is_controlled && !hydrating) {
				effect.nodes = null;
				parent_node.innerHTML = value;
				if (value !== "") assign_nodes(get_first_child(parent_node), parent_node.lastChild);
				return;
			}
			if (effect.nodes !== null) {
				remove_effect_dom(effect.nodes.start, effect.nodes.end);
				effect.nodes = null;
			}
			if (value === "") return;
			if (hydrating) {
				hydrate_node.data;
				var next = hydrate_next();
				var last = next;
				while (next !== null && (next.nodeType !== 8 || next.data !== "")) {
					last = next;
					next = get_next_sibling(next);
				}
				if (next === null) {
					hydration_mismatch();
					throw HYDRATION_ERROR;
				}
				assign_nodes(hydrate_node, last);
				anchor = set_hydrate_node(next);
				return;
			}
			var wrapper = create_element(svg ? "svg" : mathml ? "math" : "template", svg ? NAMESPACE_SVG : mathml ? NAMESPACE_MATHML : void 0);
			wrapper.innerHTML = value;
			var node = svg || mathml ? wrapper : wrapper.content;
			assign_nodes(get_first_child(node), node.lastChild);
			if (svg || mathml) while (get_first_child(node)) anchor.before(get_first_child(node));
			else anchor.before(node);
		});
	}
	function snippet(node, get_snippet, ...args) {
		var branches = new BranchManager(node);
		block(() => {
			const snippet = get_snippet() ?? null;
			branches.ensure(snippet, snippet && ((anchor) => snippet(anchor, ...args)));
		}, EFFECT_TRANSPARENT);
	}
	function element(node, get_tag, is_svg, render_fn, get_namespace, location) {
		let was_hydrating = hydrating;
		if (hydrating) hydrate_next();
		var element = null;
		if (hydrating && hydrate_node.nodeType === 1) {
			element = hydrate_node;
			hydrate_next();
		}
		var anchor = hydrating ? hydrate_node : node;
		var branches = new BranchManager(anchor, false);
		block(() => {
			const next_tag = get_tag() || null;
			var ns = get_namespace ? get_namespace() : is_svg || next_tag === "svg" ? NAMESPACE_SVG : void 0;
			if (next_tag === null) {
				branches.ensure(null, null);
				return;
			}
			branches.ensure(next_tag, (anchor) => {
				if (next_tag) {
					element = hydrating ? element : create_element(next_tag, ns);
					assign_nodes(element, element);
					if (render_fn) {
						var tmp_comment = null;
						if (hydrating && is_raw_text_element(next_tag)) element.append(tmp_comment = document.createComment(""));
						var child_anchor = hydrating ? get_first_child(element) : element.appendChild(create_text());
						if (hydrating) {
							if (child_anchor === null) set_hydrating(false);
							else set_hydrate_node(child_anchor);
						}
						render_fn(element, child_anchor);
						tmp_comment?.remove();
					}
					active_effect.nodes.end = element;
					anchor.before(element);
				}
				if (hydrating) set_hydrate_node(anchor);
			});
			return () => {
				if (next_tag);
			};
		}, EFFECT_TRANSPARENT);
		teardown(() => {});
		if (was_hydrating) {
			set_hydrating(true);
			set_hydrate_node(anchor);
		}
	}
	function action(dom, action, get_value) {
		effect(() => {
			var payload = untrack(() => action(dom, get_value?.()) || {});
			if (get_value && payload?.update) {
				var inited = false;
				var prev = {};
				render_effect(() => {
					var value = get_value();
					deep_read_state(value);
					if (inited && safe_not_equal(prev, value)) {
						prev = value;
						payload.update(value);
					}
				});
				inited = true;
			}
			if (payload?.destroy) return () => payload.destroy();
		});
	}
	function attach(node, get_fn) {
		var fn = void 0;
		var e;
		managed(() => {
			if (fn !== (fn = get_fn())) {
				if (e) {
					destroy_effect(e);
					e = null;
				}
				if (fn) e = branch(() => {
					effect(() => fn(node));
				});
			}
		});
	}
	function r(e) {
		var t, f, n = "";
		if ("string" == typeof e || "number" == typeof e) n += e;
		else if ("object" == typeof e) if (Array.isArray(e)) {
			var o = e.length;
			for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
		} else for (f in e) e[f] && (n && (n += " "), n += f);
		return n;
	}
	function clsx$1() {
		for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
		return n;
	}
	function clsx(value) {
		if (typeof value === "object") return clsx$1(value);
		else return value ?? "";
	}
	var whitespace = [..." 	\n\r\f\xA0\v﻿"];
	function to_class(value, hash, directives) {
		var classname = value == null ? "" : "" + value;
		if (hash) classname = classname ? classname + " " + hash : hash;
		if (directives) {
			for (var key of Object.keys(directives)) if (directives[key]) classname = classname ? classname + " " + key : key;
			else if (classname.length) {
				var len = key.length;
				var a = 0;
				while ((a = classname.indexOf(key, a)) >= 0) {
					var b = a + len;
					if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
					else a = b;
				}
			}
		}
		return classname === "" ? null : classname;
	}
	function append_styles(styles, important = false) {
		var separator = important ? " !important;" : ";";
		var css = "";
		for (var key of Object.keys(styles)) {
			var value = styles[key];
			if (value != null && value !== "") css += " " + key + ": " + value + separator;
		}
		return css;
	}
	function to_css_name(name) {
		if (name[0] !== "-" || name[1] !== "-") return name.toLowerCase();
		return name;
	}
	function to_style(value, styles) {
		if (styles) {
			var new_style = "";
			var normal_styles;
			var important_styles;
			if (Array.isArray(styles)) {
				normal_styles = styles[0];
				important_styles = styles[1];
			} else normal_styles = styles;
			if (value) {
				value = String(value).replaceAll(/\/\*.*?\*\//g, "").trim();
				var in_str = false;
				var in_apo = 0;
				var in_comment = false;
				var reserved_names = [];
				if (normal_styles) reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
				if (important_styles) reserved_names.push(...Object.keys(important_styles).map(to_css_name));
				var start_index = 0;
				var name_index = -1;
				const len = value.length;
				for (var i = 0; i < len; i++) {
					var c = value[i];
					if (in_comment) {
						if (c === "/" && value[i - 1] === "*") in_comment = false;
					} else if (in_str) {
						if (in_str === c) in_str = false;
					} else if (c === "/" && value[i + 1] === "*") in_comment = true;
					else if (c === "\"" || c === "'") in_str = c;
					else if (c === "(") in_apo++;
					else if (c === ")") in_apo--;
					if (!in_comment && in_str === false && in_apo === 0) {
						if (c === ":" && name_index === -1) name_index = i;
						else if (c === ";" || i === len - 1) {
							if (name_index !== -1) {
								var name = to_css_name(value.substring(start_index, name_index).trim());
								if (!reserved_names.includes(name)) {
									if (c !== ";") i++;
									var property = value.substring(start_index, i).trim();
									new_style += " " + property + ";";
								}
							}
							start_index = i + 1;
							name_index = -1;
						}
					}
				}
			}
			if (normal_styles) new_style += append_styles(normal_styles);
			if (important_styles) new_style += append_styles(important_styles, true);
			new_style = new_style.trim();
			return new_style === "" ? null : new_style;
		}
		return value == null ? null : String(value);
	}
	function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
		var prev = dom[CLASS_CACHE];
		if (hydrating || prev !== value || prev === void 0) {
			var next_class_name = to_class(value, hash, next_classes);
			if (!hydrating || next_class_name !== dom.getAttribute("class")) {
				if (next_class_name == null) dom.removeAttribute("class");
				else if (is_html) dom.className = next_class_name;
				else dom.setAttribute("class", next_class_name);
			}
			dom[CLASS_CACHE] = value;
		} else if (next_classes && prev_classes !== next_classes) for (var key in next_classes) {
			var is_present = !!next_classes[key];
			if (prev_classes == null || is_present !== !!prev_classes[key]) dom.classList.toggle(key, is_present);
		}
		return next_classes;
	}
	function update_styles(dom, prev = {}, next, priority) {
		for (var key in next) {
			var value = next[key];
			if (prev[key] !== value) {
				if (next[key] == null) dom.style.removeProperty(key);
				else dom.style.setProperty(key, value, priority);
			}
		}
	}
	function set_style(dom, value, prev_styles, next_styles) {
		var prev = dom[STYLE_CACHE];
		if (hydrating || prev !== value) {
			var next_style_attr = to_style(value, next_styles);
			if (!hydrating || next_style_attr !== dom.getAttribute("style")) {
				if (next_style_attr == null) dom.removeAttribute("style");
				else dom.style.cssText = next_style_attr;
			}
			dom[STYLE_CACHE] = value;
		} else if (next_styles) {
			if (Array.isArray(next_styles)) {
				update_styles(dom, prev_styles?.[0], next_styles[0]);
				update_styles(dom, prev_styles?.[1], next_styles[1], "important");
			} else update_styles(dom, prev_styles, next_styles);
		}
		return next_styles;
	}
	function set_selected(option, selected) {
		if (selected) {
			if (!option.hasAttribute("selected")) option.setAttribute("selected", "");
		} else option.removeAttribute("selected");
	}
	function set_default_select_value(select, value) {
		var mounting = !("__defaultValue" in select);
		if (!mounting && select.__defaultValue === value) return;
		select.__defaultValue = value;
		apply_default_select_value(select, !mounting || "__value" in select);
	}
	function apply_default_select_value(select, preserve) {
		var value = select.__defaultValue;
		var multiple = select.multiple;
		var values = multiple ? value ?? [] : null;
		if (multiple && !is_array(values)) return;
		var index = select.selectedIndex;
		var selected = preserve && multiple ? new Set(select.selectedOptions) : null;
		for (var option of select.options) {
			var option_value = get_option_value(option);
			set_selected(option, multiple ? values.includes(option_value) : is(option_value, value));
		}
		if (!preserve) return;
		if (selected !== null) for (option of select.options) {
			var was_selected = selected.has(option);
			if (option.selected !== was_selected) option.selected = was_selected;
		}
		else if (select.selectedIndex !== index) select.selectedIndex = index;
	}
	function select_option(select, value, mounting = false) {
		if (select.multiple) {
			if (value == void 0) return;
			if (!is_array(value)) return select_multiple_invalid_value();
			for (var option of select.options) option.selected = value.includes(get_option_value(option));
			return;
		}
		for (option of select.options) if (is(get_option_value(option), value)) {
			option.selected = true;
			return;
		}
		if (!mounting || value !== void 0) select.selectedIndex = -1;
	}
	function init_select(select) {
		var observer = new MutationObserver((entries) => {
			if (entries.every(is_selectedcontent_mutation)) return;
			if ("__defaultValue" in select) apply_default_select_value(select, false);
			if ("__value" in select) select_option(select, select.__value);
		});
		observer.observe(select, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ["value"]
		});
		teardown(() => {
			observer.disconnect();
		});
	}
	function bind_select_value(select, get, set = get) {
		var batches = new WeakSet();
		var mounting = true;
		listen_to_event_and_reset_event(select, "change", (is_reset) => {
			var query = is_reset ? "[selected]" : ":checked";
			var value;
			if (select.multiple) value = [].map.call(select.querySelectorAll(query), get_option_value);
			else {
				var selected_option = select.querySelector(query) ?? select.querySelector("option:not([disabled])");
				value = selected_option && get_option_value(selected_option);
			}
			set(value);
			select.__value = value;
			if (current_batch !== null) batches.add(current_batch);
		});
		effect(() => {
			var value = get();
			if (select === document.activeElement) {
				var batch = async_mode_flag ? previous_batch : current_batch;
				if (batches.has(batch)) return;
			}
			select_option(select, value, mounting);
			if (mounting && value === void 0) {
				var selected_option = select.querySelector(":checked");
				if (selected_option !== null) {
					value = get_option_value(selected_option);
					set(value);
				}
			}
			select.__value = value;
			mounting = false;
		});
	}
	function get_option_value(option) {
		if ("__value" in option) return option.__value;
		else return option.value;
	}
	function is_selectedcontent_mutation(entry) {
		if (entry.target.closest("selectedcontent") !== null) return true;
		if (entry.type === "childList") {
			var nodes = [...entry.addedNodes, ...entry.removedNodes];
			return nodes.length > 0 && nodes.every((node) => node.nodeName === "SELECTEDCONTENT");
		}
		return false;
	}
	var CLASS = Symbol("class");
	var STYLE = Symbol("style");
	var IS_CUSTOM_ELEMENT = Symbol("is custom element");
	var IS_HTML = Symbol("is html");
	var LINK_TAG = IS_XHTML ? "link" : "LINK";
	var INPUT_TAG = IS_XHTML ? "input" : "INPUT";
	var OPTION_TAG = IS_XHTML ? "option" : "OPTION";
	var SELECT_TAG = IS_XHTML ? "select" : "SELECT";
	var PROGRESS_TAG = IS_XHTML ? "progress" : "PROGRESS";
	function remove_input_defaults(input) {
		if (!hydrating) return;
		var already_removed = false;
		var remove_defaults = () => {
			if (already_removed) return;
			already_removed = true;
			if (input.hasAttribute("value")) {
				var value = input.value;
				set_attribute(input, "value", null);
				input.value = value;
			}
			if (input.hasAttribute("checked")) {
				var checked = input.checked;
				set_attribute(input, "checked", null);
				input.checked = checked;
			}
		};
		input[FORM_RESET_HANDLER] = remove_defaults;
		queue_micro_task(remove_defaults);
		add_form_reset_listener();
	}
	function set_value(element, value) {
		var attributes = get_attributes(element);
		if (attributes.value === (attributes.value = value ?? void 0) || element.value === value && (value !== 0 || element.nodeName !== PROGRESS_TAG)) return;
		element.value = value ?? "";
	}
	function set_attribute(element, attribute, value, skip_warning) {
		var attributes = get_attributes(element);
		if (hydrating) {
			attributes[attribute] = element.getAttribute(attribute);
			if (attribute === "src" || attribute === "srcset" || attribute === "href" && element.nodeName === LINK_TAG) {
				if (!skip_warning);
				return;
			}
		}
		if (attributes[attribute] === (attributes[attribute] = value)) return;
		if (attribute === "loading") element[LOADING_ATTR_SYMBOL] = value;
		if (value == null) element.removeAttribute(attribute);
		else if (typeof value !== "string" && get_setters(element).has(attribute)) element[attribute] = value;
		else element.setAttribute(attribute, value);
	}
	function set_attributes(element, prev, next, css_hash, should_remove_defaults = false, skip_warning = false) {
		if (hydrating && should_remove_defaults && element.nodeName === INPUT_TAG) {
			if (!("defaultValue" in next || "defaultChecked" in next)) remove_input_defaults(element);
		}
		var attributes = get_attributes(element);
		var is_custom_element = attributes[IS_CUSTOM_ELEMENT];
		var preserve_attribute_case = !attributes[IS_HTML];
		let is_hydrating_custom_element = hydrating && is_custom_element;
		if (is_hydrating_custom_element) set_hydrating(false);
		var current = prev || {};
		var is_option_element = element.nodeName === OPTION_TAG;
		var is_select_element = element.nodeName === SELECT_TAG;
		for (var key in prev) if (!(key in next) && key[0] + key[1] !== "$$") next[key] = null;
		if (next.class) next.class = clsx(next.class);
		else if (css_hash || next[CLASS]) next.class = null;
		if (next[STYLE]) next.style ??= null;
		var setters = get_setters(element);
		if (element.nodeName === INPUT_TAG && "type" in next && ("value" in next || "__value" in next)) {
			var type = next.type;
			if (type !== current.type || type === void 0 && element.hasAttribute("type")) {
				current.type = type;
				set_attribute(element, "type", type, skip_warning);
			}
		}
		for (const key in next) {
			let value = next[key];
			if (is_option_element && key === "value" && value == null) {
				element.value = element.__value = "";
				current[key] = value;
				continue;
			}
			if (key === "class") {
				set_class(element, element.namespaceURI === "http://www.w3.org/1999/xhtml", value, css_hash, prev?.[CLASS], next[CLASS]);
				current[key] = value;
				current[CLASS] = next[CLASS];
				continue;
			}
			if (key === "style") {
				set_style(element, value, prev?.[STYLE], next[STYLE]);
				current[key] = value;
				current[STYLE] = next[STYLE];
				continue;
			}
			var prev_value = current[key];
			if (value === prev_value && !(value === void 0 && element.hasAttribute(key))) continue;
			current[key] = value;
			var prefix = key[0] + key[1];
			if (prefix === "$$") continue;
			if (prefix === "on") {
				const opts = {};
				const event_handle_key = "$$" + key;
				let event_name = key.slice(2);
				var is_delegated = can_delegate_event(event_name);
				if (is_capture_event(event_name)) {
					event_name = event_name.slice(0, -7);
					opts.capture = true;
				}
				if (!is_delegated && prev_value) {
					if (value != null) continue;
					element.removeEventListener(event_name, current[event_handle_key], opts);
					current[event_handle_key] = null;
				}
				if (is_delegated) {
					delegated(event_name, element, value);
					delegate([event_name]);
				} else if (value != null) {
					function handle(evt) {
						current[key].call(this, evt);
					}
					current[event_handle_key] = create_event(event_name, element, handle, opts);
				}
			} else if (key === "style") set_attribute(element, key, value);
			else if (key === "autofocus") autofocus(element, Boolean(value));
			else if (!is_custom_element && (key === "__value" || key === "value" && value != null)) element.value = element.__value = value;
			else if (key === "selected" && is_option_element) set_selected(element, value);
			else {
				var name = key;
				if (!preserve_attribute_case) name = normalize_attribute(name);
				var is_default = name === "defaultValue" || name === "defaultChecked";
				if (is_select_element && name === "defaultValue") continue;
				if (value == null && !is_custom_element && !is_default) {
					attributes[key] = null;
					if (name === "value" || name === "checked") {
						let input = element;
						const use_default = prev === void 0;
						if (name === "value") {
							let previous = input.defaultValue;
							input.removeAttribute(name);
							input.defaultValue = previous;
							input.value = input.__value = use_default ? previous : null;
						} else {
							let previous = input.defaultChecked;
							input.removeAttribute(name);
							input.defaultChecked = previous;
							input.checked = use_default ? previous : false;
						}
					} else element.removeAttribute(key);
				} else if (is_default || (is_custom_element || typeof value !== "string") && setters.has(name)) {
					element[name] = value;
					if (name in attributes) attributes[name] = UNINITIALIZED;
				} else if (typeof value !== "function") set_attribute(element, name, value, skip_warning);
			}
		}
		if (is_hydrating_custom_element) set_hydrating(true);
		return current;
	}
	function attribute_effect(element, fn, sync = [], async = [], blockers = [], css_hash, should_remove_defaults = false, skip_warning = false) {
		flatten(blockers, sync, async, (values) => {
			var prev = void 0;
			var effects = {};
			var is_select = element.nodeName === SELECT_TAG;
			var inited = false;
			managed(() => {
				var next = fn(...values.map(get));
				var current = set_attributes(element, prev, next, css_hash, should_remove_defaults, skip_warning);
				if (inited && is_select) {
					var select = element;
					if ("defaultValue" in next) set_default_select_value(select, next.defaultValue);
					if ("value" in next) select_option(select, next.value);
				}
				for (let symbol of Object.getOwnPropertySymbols(effects)) if (!next[symbol]) destroy_effect(effects[symbol]);
				for (let symbol of Object.getOwnPropertySymbols(next)) {
					var n = next[symbol];
					if (symbol.description === "@attach" && (!prev || n !== prev[symbol])) {
						if (effects[symbol]) destroy_effect(effects[symbol]);
						effects[symbol] = branch(() => attach(element, () => n));
					}
					current[symbol] = n;
				}
				prev = current;
			});
			if (is_select) {
				var select = element;
				effect(() => {
					var attrs = prev;
					if ("defaultValue" in attrs) set_default_select_value(select, attrs.defaultValue);
					select_option(select, attrs.value, true);
					init_select(select);
				});
			}
			inited = true;
		});
	}
	function get_attributes(element) {
		return element[ATTRIBUTES_CACHE] ??= {
			[IS_CUSTOM_ELEMENT]: element.nodeName.includes("-"),
			[IS_HTML]: element.namespaceURI === NAMESPACE_HTML
		};
	}
	var setters_cache = new Map();
	function get_setters(element) {
		var cache_key = element.getAttribute("is") || element.nodeName;
		var setters = setters_cache.get(cache_key);
		if (setters) return setters;
		setters_cache.set(cache_key, setters = new Set());
		var descriptors;
		var proto = element;
		var element_proto = Element.prototype;
		while (element_proto !== proto) {
			descriptors = get_descriptors(proto);
			for (var key in descriptors) if (descriptors[key].set && key !== "innerHTML" && key !== "textContent" && key !== "innerText") setters.add(key);
			proto = get_prototype_of(proto);
		}
		return setters;
	}
	function bind_value(input, get, set = get) {
		var batches = new WeakSet();
		listen_to_event_and_reset_event(input, "input", async (is_reset) => {
			var value = is_reset ? input.defaultValue : input.value;
			value = is_numberlike_input(input) ? to_number(value) : value;
			set(value);
			if (current_batch !== null) batches.add(current_batch);
			await tick();
			if (value !== (value = get())) {
				var start = input.selectionStart;
				var end = input.selectionEnd;
				var length = input.value.length;
				input.value = value ?? "";
				if (end !== null) {
					var new_length = input.value.length;
					if (start === end && end === length && new_length > length) {
						input.selectionStart = new_length;
						input.selectionEnd = new_length;
					} else {
						input.selectionStart = start;
						input.selectionEnd = Math.min(end, new_length);
					}
				}
			}
		});
		if (hydrating && input.defaultValue !== input.value || untrack(get) == null && input.value) {
			set(is_numberlike_input(input) ? to_number(input.value) : input.value);
			if (current_batch !== null) batches.add(current_batch);
		}
		render_effect(() => {
			var value = get();
			if (input === document.activeElement) {
				var batch = async_mode_flag ? previous_batch : current_batch;
				if (batches.has(batch)) return;
			}
			if (is_numberlike_input(input) && value === to_number(input.value)) return;
			if (input.type === "date" && !value && !input.value) return;
			if (value !== input.value) input.value = value ?? "";
		});
	}
	function is_numberlike_input(input) {
		var type = input.type;
		return type === "number" || type === "range";
	}
	function to_number(value) {
		return value === "" ? null : +value;
	}
	var ResizeObserverSingleton = class ResizeObserverSingleton {
		#listeners = new WeakMap();
		#observer;
		#options;
		static entries = new WeakMap();
		constructor(options) {
			this.#options = options;
		}
		observe(element, listener) {
			var listeners = this.#listeners.get(element) || new Set();
			listeners.add(listener);
			this.#listeners.set(element, listeners);
			this.#getObserver().observe(element, this.#options);
			return () => {
				var listeners = this.#listeners.get(element);
				listeners.delete(listener);
				if (listeners.size === 0) {
					this.#listeners.delete(element);
					this.#observer.unobserve(element);
				}
			};
		}
		#getObserver() {
			return this.#observer ?? (this.#observer = new ResizeObserver((entries) => {
				for (var entry of entries) {
					ResizeObserverSingleton.entries.set(entry.target, entry);
					for (var listener of this.#listeners.get(entry.target) || []) listener(entry);
				}
			}));
		}
	};
	var resize_observer_content_box = new ResizeObserverSingleton({ box: "content-box" });
	var resize_observer_border_box = new ResizeObserverSingleton({ box: "border-box" });
	var resize_observer_device_pixel_content_box = new ResizeObserverSingleton({ box: "device-pixel-content-box" });
	function bind_resize_observer(element, type, set) {
		teardown((type === "contentRect" || type === "contentBoxSize" ? resize_observer_content_box : type === "borderBoxSize" ? resize_observer_border_box : resize_observer_device_pixel_content_box).observe(element, (entry) => set(entry[type])));
	}
	function bind_element_size(element, type, set) {
		var unsub = resize_observer_border_box.observe(element, () => set(element[type]));
		effect(() => {
			untrack(() => set(element[type]));
			return unsub;
		});
	}
	function is_bound_this(bound_value, element_or_component) {
		return bound_value === element_or_component || bound_value?.[STATE_SYMBOL] === element_or_component;
	}
	function bind_this(element_or_component = mark_as_component(), update, get_value, get_parts) {
		var component_effect = component_context.r;
		var parent = active_effect;
		effect(() => {
			var old_parts;
			var parts;
			render_effect(() => {
				old_parts = parts;
				parts = get_parts?.() || [];
				untrack(() => {
					if (!is_bound_this(get_value(...parts), element_or_component)) {
						update(element_or_component, ...parts);
						if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) update(null, ...old_parts);
					}
				});
			});
			return () => {
				let p = parent;
				while (p !== component_effect && p.parent !== null && p.parent.f & 33554432) p = p.parent;
				const teardown = () => {
					if (parts && is_bound_this(get_value(...parts), element_or_component)) update(null, ...parts);
				};
				const original_teardown = p.teardown;
				p.teardown = () => {
					teardown();
					original_teardown?.();
				};
			};
		});
		return element_or_component;
	}
	var is_store_binding = false;
	function capture_store_binding(fn) {
		var previous_is_store_binding = is_store_binding;
		try {
			is_store_binding = false;
			return [fn(), is_store_binding];
		} finally {
			is_store_binding = previous_is_store_binding;
		}
	}
	function prop(props, key, flags, fallback) {
		var runes = !legacy_mode_flag || (flags & 2) !== 0;
		var bindable = (flags & 8) !== 0;
		var lazy = (flags & 16) !== 0;
		var fallback_value = fallback;
		var fallback_dirty = true;
		var fallback_signal = void 0;
		var get_fallback = () => {
			if (lazy && runes) {
				fallback_signal ??= derived(fallback);
				return get(fallback_signal);
			}
			if (fallback_dirty) {
				fallback_dirty = false;
				fallback_value = lazy ? untrack(fallback) : fallback;
			}
			return fallback_value;
		};
		let setter;
		if (bindable) {
			var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
			setter = get_descriptor(props, key)?.set ?? (is_entry_props && key in props ? (v) => props[key] = v : void 0);
		}
		var initial_value;
		var is_store_sub = false;
		if (bindable) [initial_value, is_store_sub] = capture_store_binding(() => props[key]);
		else initial_value = props[key];
		if (initial_value === void 0 && fallback !== void 0) {
			initial_value = get_fallback();
			if (setter) {
				if (runes) props_invalid_value(key);
				setter(initial_value);
			}
		}
		var getter;
		if (runes) getter = () => {
			var value = props[key];
			if (value === void 0) return get_fallback();
			fallback_dirty = true;
			return value;
		};
		else getter = () => {
			var value = props[key];
			if (value !== void 0) fallback_value = void 0;
			return value === void 0 ? fallback_value : value;
		};
		if (runes && (flags & 4) === 0) return getter;
		if (setter) {
			var legacy_parent = props.$$legacy;
			return (function(value, mutation) {
				if (arguments.length > 0) {
					if (!runes || !mutation || legacy_parent || is_store_sub) setter(mutation ? getter() : value);
					return value;
				}
				return getter();
			});
		}
		var overridden = false;
		var d = ((flags & 1) !== 0 ? derived : derived_safe_equal)(() => {
			overridden = false;
			return getter();
		});
		if (bindable) get(d);
		var parent_effect = active_effect;
		return (function(value, mutation) {
			if (arguments.length > 0) {
				const new_value = mutation ? get(d) : runes && bindable ? proxy(value) : value;
				set(d, new_value);
				overridden = true;
				if (fallback_value !== void 0) fallback_value = new_value;
				return value;
			}
			if (is_destroying_effect && overridden || (parent_effect.f & 16384) !== 0) return d.v;
			return get(d);
		});
	}
	if (typeof window !== "undefined") ((window.__svelte ??= {}).v ??= new Set()).add("5");
	var PREFIX = "wm-cache:v2:";
	function load$1(key, maxAgeMs) {
		try {
			const e = JSON.parse(localStorage.getItem(PREFIX + key));
			if (e && Date.now() - e.t < maxAgeMs) return e.v;
		} catch {}
		return null;
	}
	function save(key, v) {
		try {
			localStorage.setItem(PREFIX + key, JSON.stringify({
				t: Date.now(),
				v
			}));
		} catch {}
	}
	function drop(key) {
		try {
			localStorage.removeItem(PREFIX + key);
		} catch {}
	}
	var isReal = /(^|\.)wiki-masters\.com$/.test(globalThis.location?.hostname ?? "");
	var retry = {
		delays: [
			500,
			1500,
			4e3
		],
		readTimeout: 15e3,
		writeTimeout: 3e4
	};
	var health = {
		state: "ok",
		subs: new Set(),
		set(s) {
			if (s !== this.state) {
				this.state = s;
				for (const f of this.subs) f(s);
			}
		},
		subscribe(f) {
			this.subs.add(f);
			return () => this.subs.delete(f);
		},
		reset() {
			this.state = "ok";
		}
	};
	var LABELS = [
		[/^\/api\/packs\/open/, "Ouverture du paquet"],
		[/^\/api\/my-collection/, "Chargement de votre collection"],
		[/^\/api\/cards/, "Chargement des cartes"],
		[/^\/api\/marketplace\/[^/]+\/bid/, "Envoi de votre enchère"],
		[/^\/api\/marketplace/, "Chargement du marché"],
		[/^\/api\/trades/, "Chargement des échanges"],
		[/^\/api\/friends/, "Chargement de vos amis"],
		[/^\/api\/profile\//, "Chargement de sa collection"],
		[/^\/api\/chat/, "Chargement de la conversation"]
	];
	var labelFor = (path, read) => read ? LABELS.find(([re]) => re.test(path))?.[1] ?? "Chargement" : path.startsWith("/api/packs/open") ? "Ouverture du paquet" : "Envoi en cours";
	var activity = {
		items: new Map(),
		subs: new Set(),
		seq: 0,
		snapshot() {
			const all = [...this.items.values()];
			if (!all.length) return null;
			const last = all[all.length - 1];
			const retrying = all.find((x) => x.attempt > 1);
			return {
				count: all.length,
				label: last.label,
				since: Math.min(...all.map((x) => x.since)),
				retry: retrying && {
					attempt: retrying.attempt,
					max: retrying.max
				}
			};
		},
		emit() {
			const s = this.snapshot();
			for (const f of this.subs) f(s);
		},
		subscribe(f) {
			this.subs.add(f);
			f(this.snapshot());
			return () => this.subs.delete(f);
		},
		start(label, max) {
			const id = ++this.seq;
			this.items.set(id, {
				label,
				attempt: 1,
				max,
				since: Date.now()
			});
			this.emit();
			return id;
		},
		retrying(id, attempt) {
			const x = this.items.get(id);
			if (x) {
				x.attempt = attempt;
				this.emit();
			}
		},
		end(id) {
			this.items.delete(id);
			this.emit();
		}
	};
	var retryable = (status) => status === 0 || status >= 500;
	var isRateLimited = (e) => e?.status === 429 || e?.code === "rate_limited" || /trop de requ[eê]tes/i.test(e?.message || "");
	var sleep = (ms) => new Promise((r) => setTimeout(r, ms));
	var retryAfter = (r) => {
		const s = Number(r?.headers?.get?.("retry-after"));
		return s > 0 ? Math.min(s, 10) * 1e3 : null;
	};
	async function attempt(path, init, timeout) {
		const ctl = new AbortController();
		const t = setTimeout(() => ctl.abort(), timeout);
		try {
			return await fetch(path, {
				...init,
				signal: ctl.signal
			});
		} catch {
			return null;
		} finally {
			clearTimeout(t);
		}
	}
	async function api(path, { method = "GET", body, quiet = false, label, headers } = {}) {
		const read = method === "GET";
		const init = {
			method,
			credentials: "include",
			headers: {
				...body && { "content-type": "application/json" },
				...headers
			},
			body: body && JSON.stringify(body)
		};
		const tracked = quiet ? null : activity.start(label || labelFor(path, read), read ? retry.delays.length + 1 : 1);
		try {
			for (let i = 0;; i++) {
				const r = await attempt(path, init, read ? retry.readTimeout : retry.writeTimeout);
				const status = r?.status ?? 0;
				if (retryable(status)) {
					health.set("unstable");
					if (read && i < retry.delays.length) {
						if (tracked) activity.retrying(tracked, i + 2);
						await sleep(retryAfter(r) ?? retry.delays[i]);
						continue;
					}
				} else health.set("ok");
				const d = r ? await r.json().catch(() => ({})) : {};
				if (r?.ok) return d;
				throw Object.assign(new Error(errorMessage(d, status, read)), {
					status,
					code: d.code ?? (status === 429 ? "rate_limited" : void 0),
					min: d.min,
					data: d,
					uncertain: !read && retryable(status)
				});
			}
		} finally {
			if (tracked) activity.end(tracked);
		}
	}
	function errorMessage(d, status, read) {
		const server = typeof d.error === "string" && !d.error.trimStart().startsWith("<") ? d.error : null;
		if (status === 429) return server || "Trop de requêtes, réessayez dans un instant.";
		if (status && !retryable(status)) return server || `Erreur (${status}), réessayez.`;
		return read ? "Le serveur du jeu ne répond pas pour le moment. Réessayez dans un instant." : "Le serveur du jeu n'a pas répondu à temps : vérifiez le résultat avant de réessayer.";
	}
	var profile = load$1("profile", 36e5);
	var epoch = 0;
	var origFetch = null;
	var sb = null;
	var getProfile = () => profile;
	var getUserId = () => sb?.userId ?? null;
	var bumpEpoch = () => {
		epoch++;
	};
	function patchProfile(patch) {
		profile = {
			...profile,
			...patch
		};
		save("profile", profile);
		window.dispatchEvent(new Event("wm:profile"));
		return profile;
	}
	async function refreshProfile() {
		if (!sb?.headers || !sb.userId) return null;
		try {
			const r = await origFetch.call(window, `${sb.base}/rest/v1/rpc/sync_profile_packs`, {
				method: "POST",
				headers: {
					...sb.headers,
					"content-type": "application/json"
				},
				body: JSON.stringify({ user_id: sb.userId })
			});
			if (!r.ok) {
				health.set("unstable");
				return profile;
			}
			health.set("ok");
			return patchProfile(await r.json());
		} catch {
			return null;
		}
	}
	function header(init, name) {
		const h = init?.headers;
		if (!h) return null;
		if (typeof h.get === "function") return h.get(name);
		return (Array.isArray(h) ? h : Object.entries(h)).find(([k]) => k.toLowerCase() === name)?.[1] ?? null;
	}
	function tokenSubject(authorization) {
		try {
			const b64 = authorization.replace(/^Bearer\s+/i, "").split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
			const sub = JSON.parse(atob(b64.padEnd(b64.length + (4 - b64.length % 4) % 4, "="))).sub;
			return /^[0-9a-f-]{36}$/i.test(sub) ? sub : null;
		} catch {
			return null;
		}
	}
	function readSupabaseCall(url, init) {
		let u;
		try {
			u = new URL(url);
		} catch {
			return null;
		}
		if (u.protocol !== "https:" || !/^[a-z0-9-]+\.supabase\.co$/i.test(u.hostname) || !u.pathname.startsWith("/rest/v1/")) return null;
		const apikey = header(init, "apikey");
		const authorization = header(init, "authorization");
		const creds = apikey && authorization ? {
			apikey,
			authorization
		} : null;
		return {
			base: u.origin,
			path: u.pathname,
			headers: creds,
			userId: creds && tokenSubject(authorization)
		};
	}
	var peek = (ret, fn) => ret.then((res) => res.clone().json()).then(fn).catch(() => {});
	function initCapture() {
		if (!isReal) return;
		origFetch = window.fetch;
		window.fetch = function(...args) {
			const ret = origFetch.apply(window, args);
			const call = readSupabaseCall(typeof args[0] === "string" ? args[0] : args[0]?.url, args[1]);
			if (!call) return ret;
			if (call.headers && call.userId) sb = {
				base: call.base,
				headers: call.headers,
				userId: call.userId
			};
			if (call.path === "/rest/v1/rpc/sync_profile_packs") {
				const issued = epoch;
				ret.then((res) => res.ok && peek(Promise.resolve(res), (j) => {
					if (epoch === issued) patchProfile(j);
				}), () => {});
			} else if (call.path === "/rest/v1/profiles") peek(ret, (j) => {
				const row = (Array.isArray(j) ? j : [j]).find((r) => r?.id && r.id === sb?.userId);
				if (row?.is_pro !== void 0) patchProfile({ is_pro: row.is_pro });
			});
			return ret;
		};
	}
	function createLane({ concurrency = 2, gapMs = 450 } = {}) {
		const waiting = [];
		const subs = new Set();
		let active = 0, nextStart = 0, pausedUntil = 0, timer = null, state = "running";
		const emit = (s) => {
			if (s !== state) {
				state = s;
				for (const f of subs) f(s);
			}
		};
		function pump() {
			clearTimeout(timer);
			timer = null;
			const now = Date.now();
			if (pausedUntil > now) {
				emit("paused");
				timer = setTimeout(pump, pausedUntil - now);
				return;
			}
			emit("running");
			if (!waiting.length || active >= concurrency) return;
			if (nextStart > now) {
				timer = setTimeout(pump, nextStart - now);
				return;
			}
			nextStart = now + gapMs;
			active++;
			waiting.shift()();
			if (waiting.length) pump();
		}
		return {
			async run(task) {
				await new Promise((go) => {
					waiting.push(go);
					pump();
				});
				try {
					return await task();
				} finally {
					active--;
					pump();
				}
			},
			pause(ms) {
				pausedUntil = Math.max(pausedUntil, Date.now() + ms);
				pump();
			},
			subscribe(f) {
				subs.add(f);
				f(state);
				return () => subs.delete(f);
			},
			get state() {
				return state;
			}
		};
	}
	var backgroundLane = createLane({
		concurrency: 2,
		gapMs: 450
	});
	var nf = (n) => n == null ? "-" : Number(n).toLocaleString("fr");
	var compact = (n) => new Intl.NumberFormat("fr", {
		notation: "compact",
		maximumFractionDigits: 1
	}).format(n);
	function ago(iso, now = Date.now()) {
		const t = Date.parse(iso || "");
		if (isNaN(t)) return "";
		const m = Math.round(Math.max(0, now - t) / 6e4);
		if (m < 1) return "à l'instant";
		if (m < 60) return `il y a ${m} min`;
		const h = Math.round(m / 60);
		return h < 24 ? `il y a ${h} h` : `il y a ${Math.round(h / 24)} j`;
	}
	function countdown(s, { seconds = false } = {}) {
		if (s <= 0) return "Terminée";
		const d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
		const pad = (x) => String(x).padStart(2, "0");
		if (d) return `${d} j ${h} h`;
		if (h) return `${h} h ${pad(m)}`;
		if (m) return seconds ? `${m} min ${pad(sec)} s` : `${m} min`;
		return seconds ? `${sec} s` : "< 1 min";
	}
	function secondsUntil(iso, now = Date.now()) {
		const t = Date.parse(iso || "");
		return isNaN(t) ? null : Math.max(0, Math.round((t - now) / 1e3));
	}
	var STATUS = {
		pending: "En attente",
		countered: "Contre-offre",
		declined: "Refusé",
		accepted: "Accepté",
		cancelled: "Annulé"
	};
	var statusLabel = (s) => STATUS[s] || s;
	var SIDE = {
		give: "Vous donnez",
		get: "Vous recevez"
	};
	var NO_ME = "Session pas encore prête : rechargez la page puis réessayez.";
	function needMe(me) {
		if (!me) throw new Error(NO_ME);
		return me;
	}
	function whoAmI(raw, userId, username = null) {
		if (userId) return userId;
		if (username) for (const t of raw) {
			if (t.initiator?.username === username) return t.initiator_id ?? t.initiator.id;
			if (t.recipient?.username === username) return t.recipient_id ?? t.recipient.id;
		}
		let common = null;
		for (const t of raw) {
			const pair = [t.initiator_id, t.recipient_id];
			common = common ? common.filter((id) => pair.includes(id)) : pair;
		}
		return common?.length === 1 ? common[0] : null;
	}
	function chatMe(friendId, trades, messages, userId) {
		if (userId) return userId;
		return [...trades.flatMap((t) => [t.initiator_id, t.recipient_id]), ...messages.flatMap((m) => [m.sender_id, m.recipient_id])].find((id) => id && id !== friendId) ?? null;
	}
	var newest = (a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt));
	function tradeTabs(trades) {
		const answered = new Set(trades.map((t) => t.parentId).filter(Boolean));
		const latest = trades.filter((t) => !answered.has(t.id));
		const pending = latest.filter((t) => t.status === "pending");
		return {
			incoming: pending.filter((t) => t.incoming).sort(newest),
			outgoing: pending.filter((t) => !t.incoming).sort(newest),
			history: latest.filter((t) => t.status !== "pending").sort(newest)
		};
	}
	function sideValue(items, coins, values) {
		let total = coins || 0, unknown = 0;
		for (const it of items) {
			const v = values.get(it.card.id);
			if (v == null) unknown++;
			else total += v;
		}
		return {
			total,
			unknown
		};
	}
	function verdict(give, get) {
		const diff = get.total - give.total;
		const unknown = (give.unknown || 0) + (get.unknown || 0);
		if (unknown) return {
			kind: "unknown",
			diff,
			unknown
		};
		const scale = Math.max(give.total, get.total);
		if (!scale || Math.abs(diff) <= scale * .15) return {
			kind: "balanced",
			diff
		};
		return {
			kind: diff > 0 ? "advantage" : "disadvantage",
			diff
		};
	}
	var BALANCE = {
		unknown: () => "Non estimé",
		balanced: () => "Équilibré",
		advantage: (d) => `+${nf(d)} pour vous`,
		disadvantage: (d) => `${nf(d)} pour vous`
	};
	var balanceLabel = (v) => BALANCE[v.kind](v.diff);
	var TITLE = {
		unknown: BALANCE.unknown(),
		balanced: BALANCE.balanced(),
		advantage: "À votre avantage",
		disadvantage: "À votre désavantage"
	};
	var verdictTitle = (v) => TITLE[v.kind];
	var sideShort = (cards, coins) => [cards && String(cards), coins && `${nf(coins)} wb`].filter(Boolean).join(" + ") || "rien";
	function offerSummary(giveCards, giveCoins, getCards, getCoins) {
		if (!giveCards && !giveCoins && !getCards && !getCoins) return null;
		return `${sideShort(giveCards, giveCoins)} contre ${sideShort(getCards, getCoins)}`;
	}
	var cardsWord = (n) => `${n} carte${n > 1 ? "s" : ""}`;
	var withCoins = (cards, coins, word) => [cards && (word ? cardsWord(cards) : String(cards)), coins && `${nf(coins)} wb`].filter(Boolean).join(" + ");
	function dealLine(giveCards, giveCoins, getCards, getCoins) {
		const mineWord = giveCards > 0;
		const keep = (s) => s.replaceAll(" ", "\xA0");
		return `${keep(withCoins(giveCards, giveCoins, true) || "rien")} ${keep(`contre ${withCoins(getCards, getCoins, !mineWord) || "rien"}`)}`;
	}
	var BADGE = {
		unknown: () => "-",
		balanced: () => "=",
		advantage: (d) => `+${nf(d)}`,
		disadvantage: (d) => nf(d)
	};
	var balanceBadge = (v) => BADGE[v.kind](v.diff);
	function stepIn(list, id, delta) {
		if (!list.length) return null;
		const i = list.findIndex((t) => t.id === id);
		if (i < 0) return list[0];
		return list[Math.min(list.length - 1, Math.max(0, i + delta))];
	}
	function afterLeaving(list, id) {
		const i = list.findIndex((t) => t.id === id);
		if (i < 0) return null;
		return list[i + 1] ?? list[i - 1] ?? null;
	}
	function chainOf(trade, all) {
		const byId = new Map(all.map((t) => [t.id, t]));
		let root = trade;
		while (root.parentId && byId.has(root.parentId)) root = byId.get(root.parentId);
		const chain = [root];
		for (let cur = root;;) {
			const next = all.find((t) => t.parentId === cur.id);
			if (!next) break;
			chain.push(next);
			cur = next;
		}
		return chain;
	}
	var who = (mine, other) => mine ? "vous" : other;
	var OUTCOME = {
		pending: {
			text: "En attente de",
			by: "recipient"
		},
		accepted: {
			text: "Acceptée par",
			by: "recipient"
		},
		declined: {
			text: "Refusée par",
			by: "recipient"
		},
		cancelled: {
			text: "Annulée par",
			by: "initiator"
		}
	};
	function timeline(chain) {
		const steps = chain.map((c, i) => ({
			kind: i ? "counter" : "offer",
			text: i ? "Contre-offre de" : "Offre de",
			by: who(!c.incoming, c.other.username),
			at: c.createdAt,
			offer: c
		}));
		const last = chain.at(-1), end = last && OUTCOME[last.status];
		if (end) {
			const mine = end.by === "recipient" ? last.incoming : !last.incoming;
			steps.push({
				kind: last.status,
				text: end.text,
				by: who(mine, last.other.username),
				at: last.status === "pending" ? null : last.updatedAt
			});
		}
		return steps;
	}
	function otherOf(f, me) {
		const o = f.requester?.id === needMe(me) ? f.addressee : f.requester;
		return {
			id: o?.id,
			username: o?.username || "?",
			avatar: o?.avatar_url || null
		};
	}
	var RNAME = {
		C: "Commun",
		PC: "Peu Commun",
		R: "Rare",
		SR: "Super Rare",
		UR: "Ultra Rare",
		L: "Légendaire"
	};
	var RARITIES = [
		"C",
		"PC",
		"R",
		"SR",
		"UR",
		"L"
	];
	var RARITIES_DESC = [...RARITIES].reverse();
	function notifHref(n) {
		const d = n.data || {};
		const auctionId = d.auction_id || n.auction_id;
		if (/^marketplace_/.test(n.type) && auctionId) return `/marketplace/${auctionId}`;
		if (/^trade_/.test(n.type)) return "/trades";
		if (n.type === "battle_invite" && d.battle_id) return "/battle";
		if (n.type === "friend_request") return "/friends";
		if (n.type === "guild_invite") return "/guild";
		return null;
	}
	function normSearch(s) {
		return (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
	}
	function nCard(c) {
		return {
			id: c.id,
			title: c.wikipedia_title || c.title || "",
			category: c.category || "",
			image_url: c.hide_image ? null : c.image_url || null,
			rarity: c.rarity,
			atk: c.atk ?? 0,
			def: c.def ?? 0,
			q_score: c.q_score != null ? Number(c.q_score) : null,
			pageviews: c.pageviews ?? null,
			summary: c.summary || null,
			wikipedia_url: c.wikipedia_url || null,
			nsfw_image: !!c.nsfw_image
		};
	}
	var AUCTION_STATUS = {
		active: "active",
		cancelled: "cancelled",
		settled_sold: "sold",
		settled_unsold: "unsold"
	};
	var auctionStatus = (a) => AUCTION_STATUS[a.status ?? "active"] ?? (a.final_price != null || a.winner_id ? "sold" : "unsold");
	function nAuction(a, me = null) {
		const card = a.card ? nCard(a.card) : nCard({
			id: a.card_id,
			rarity: a.snapshot_rarity,
			atk: a.snapshot_atk,
			def: a.snapshot_def
		});
		return {
			id: a.id,
			card,
			is_shiny: !!a.is_shiny,
			base: a.base_amount ?? null,
			bid: a.current_bid ?? null,
			price: a.effective_bid ?? a.current_bid ?? a.base_amount ?? null,
			finalPrice: a.final_price ?? null,
			status: auctionStatus(a),
			endAt: a.end_at || null,
			createdAt: a.created_at || null,
			settledAt: a.settled_at || null,
			repricedAt: a.base_repriced_at || null,
			seller: a.seller?.username || null,
			sellerId: a.seller_id ?? null,
			currentBidderId: a.current_bidder_id ?? null,
			bidder: a.current_bidder?.username || null,
			winnerId: a.winner_id ?? null,
			winner: a.winner?.username || null,
			mine: !!me && a.seller_id === me,
			ownsCard: !!a.owned
		};
	}
	function nBid(b) {
		return {
			id: b.id,
			amount: b.amount,
			bidder: b.bidder?.username || null,
			bidderId: b.bidder_id || null,
			at: b.placed_at || null
		};
	}
	function nNotification(n) {
		return {
			id: n.id,
			title: n.data?.title || "Notification",
			message: n.data?.message || "",
			read: !!n.read,
			at: n.created_at || null,
			href: notifHref(n)
		};
	}
	function countsFrom(items) {
		const counts = Object.fromEntries(RARITIES.map((r) => [r, 0]));
		for (const it of items) if (it.card.rarity in counts) counts[it.card.rarity] += 1;
		return counts;
	}
	function validateCards(endpoint, cards) {
		if (!cards.length) return true;
		const broken = cards.filter((c) => c.id == null && !c.rarity).length;
		if (broken / cards.length <= .5) return true;
		console.warn(`[wiki-remaster] ${endpoint}: ${broken}/${cards.length} cards failed to normalize. The API shape may have changed, see src/wm/schema.js.`);
		return false;
	}
	function nTrade(t, me) {
		needMe(me);
		const mine = t.initiator_id === me;
		const other = mine ? t.recipient : t.initiator;
		const item = (i) => ({
			itemId: i.id,
			userCardId: i.user_card_id,
			is_shiny: !!(i.is_shiny ?? i.card?.is_shiny),
			card: nCard({
				...i.card || { id: i.card_id },
				rarity: i.snapshot_rarity ?? i.card?.rarity,
				atk: i.snapshot_atk ?? i.card?.atk,
				def: i.snapshot_def ?? i.card?.def
			})
		});
		const items = t.items || [];
		return {
			id: t.id,
			status: t.status || "pending",
			incoming: t.recipient_id === me,
			other: {
				id: other?.id ?? (mine ? t.recipient_id : t.initiator_id),
				username: other?.username || "?",
				avatar: other?.avatar_url || null
			},
			give: items.filter((i) => i.offered_by === me).map(item),
			get: items.filter((i) => i.offered_by !== me).map(item),
			giveCoins: (mine ? t.initiator_wikibidous : t.recipient_wikibidous) ?? 0,
			getCoins: (mine ? t.recipient_wikibidous : t.initiator_wikibidous) ?? 0,
			parentId: t.parent_trade_id ?? null,
			createdAt: t.created_at || null,
			updatedAt: t.updated_at || t.created_at || null
		};
	}
	function nMessage(m, me) {
		return {
			id: m.id,
			mine: m.sender_id === me,
			content: m.content || "",
			at: m.created_at || null
		};
	}
	var PAGE = 50;
	var PACK_CAP = 10;
	var REGEN_MS = 6e5;
	var tz = () => ({ "x-wiki-calendar-tz": Intl.DateTimeFormat().resolvedOptions().timeZone });
	var ACTION_LABEL = {
		accept: "Acceptation de l'échange",
		decline: "Refus de l'échange",
		cancel: "Annulation de l'offre"
	};
	var ownedIds = null;
	var qs = (params) => new URLSearchParams(Object.entries(params).filter(([, v]) => v != null && v !== "" && v !== false)).toString();
	function mapCollection(rows) {
		return rows.map((it) => {
			const card = nCard(it.card);
			return {
				id: it.id,
				card,
				count: it.count ?? 1,
				is_shiny: !!it.is_shiny,
				starred: !!it.starred,
				obtained_at: it.obtained_at || null,
				_s: normSearch(card.title + " " + card.category)
			};
		});
	}
	var RealData = {
		isReal: true,
		canReset: false,
		get userId() {
			return getUserId();
		},
		async profile() {
			if (getProfile()?.packs_remaining == null) await refreshProfile();
			const p = getProfile() || {};
			const balance = await api("/api/wikibidous", { quiet: true }).then((d) => d.balance, () => p.wikibidous_balance ?? null);
			const packs = p.packs_remaining ?? null;
			const last = Date.parse(p.packs_last_regen_at || "");
			const regen = packs != null && packs < PACK_CAP && !isNaN(last);
			return {
				username: p.username || null,
				packs_remaining: packs,
				pack_cap: PACK_CAP,
				currency: balance,
				next_regen_seconds: regen ? Math.max(0, Math.round((last + REGEN_MS - Date.now()) / 1e3)) : null,
				is_pro: !!p.is_pro
			};
		},
		async openPack() {
			ownedIds ??= await this.collection().then((c) => new Set(c.items.map((it) => it.card.id)), () => null);
			let d;
			try {
				d = await api("/api/packs/open", { method: "POST" });
			} catch (e) {
				if (e.data?.packs_remaining != null) {
					bumpEpoch();
					patchProfile({ packs_remaining: e.data.packs_remaining });
				}
				throw e;
			}
			bumpEpoch();
			patchProfile({ packs_remaining: d.packs_remaining });
			return {
				cards: (d.cards || []).map((c) => {
					const is_new = !!ownedIds && !ownedIds.has(c.id);
					ownedIds?.add(c.id);
					return {
						...nCard(c),
						is_new,
						is_shiny: !!c.is_shiny
					};
				}),
				packs_remaining: d.packs_remaining
			};
		},
		async collection({ onPartial } = {}) {
			const first = await api("/api/my-collection?sort=rarity&page=0&stats=1");
			const pending = first.pendingTradeCardIds || [];
			const rows = new Map();
			const add = (list) => {
				for (const it of mapCollection(list || [])) rows.set(it.id, it);
			};
			add(first.collection);
			const items = () => [...rows.values()];
			const copies = first.total ?? rows.size;
			const stats = (loading) => ({
				copies,
				unique: new Set(items().map((it) => it.card.id)).size,
				counts: first.rarityCounts || countsFrom(items()),
				loading
			});
			const pages = Math.ceil(copies / PAGE);
			if (pages > 1) {
				onPartial?.({
					items: items(),
					stats: stats(true)
				});
				await Promise.all(Array.from({ length: pages - 1 }, (_, i) => backgroundLane.run(() => api(`/api/my-collection?sort=rarity&page=${i + 1}&stats=0`, { quiet: true })).then((d) => {
					add(d.collection);
					onPartial?.({
						items: items(),
						stats: stats(true)
					});
				})));
			}
			ownedIds = new Set(items().map((it) => it.card.id));
			return {
				items: items(),
				stats: stats(false),
				pending
			};
		},
		async catalog({ page = 0, sort = "rarity", q, rarity, wishlist } = {}) {
			const d = await api(`/api/cards?${qs({
				page,
				sort,
				q,
				rarity,
				wishlist: wishlist && 1
			})}`);
			const owned = new Set(d.ownedCardIds);
			const wished = new Set(d.wishlistCardIds);
			const cards = (d.cards || []).map((c) => ({
				...nCard(c),
				owned: owned.has(c.id),
				wishlisted: wished.has(c.id)
			}));
			validateCards("catalog", cards);
			const total = d.total ?? null;
			return {
				cards,
				total,
				hasMore: total != null ? (page + 1) * PAGE < total : !!d.searchHasMore,
				rarityCounts: d.rarityCounts || null
			};
		},
		async marketplace({ page = 0, sort = "recent", q, rarity, quiet } = {}) {
			const d = await api(`/api/marketplace?${qs({
				page: page + 1,
				limit: PAGE,
				sort,
				q,
				rarity
			})}`, { quiet });
			return {
				auctions: (d.auctions || []).map((a) => nAuction(a, this.userId)),
				hasMore: !!d.hasMore
			};
		},
		async sameCard(card) {
			if (!card.title) return [];
			const out = [];
			for (let page = 0; page < 4; page++) {
				const d = await this.marketplace({
					page,
					sort: "price_asc",
					q: card.title,
					quiet: true
				});
				out.push(...d.auctions.filter((a) => a.card.id === card.id));
				if (!d.hasMore) break;
			}
			return out;
		},
		async myMarket() {
			const d = await api("/api/marketplace?page=1&limit=1&mine=1");
			const list = (k, mine) => (d[k] || []).map((a) => ({
				...nAuction(a, this.userId),
				...mine && { mine: true }
			}));
			return {
				selling: list("selling", true),
				bidding: list("bidding"),
				won: list("won"),
				history: list("history", true),
				max: d.maxConcurrentAuctions ?? 5
			};
		},
		async auction(id) {
			const d = await api(`/api/marketplace/${id}`, { quiet: true });
			return {
				...nAuction(d.auction, this.userId),
				bids: (d.bids || []).map(nBid)
			};
		},
		createAuction: (item, { price, durationHours }) => api("/api/marketplace", {
			method: "POST",
			label: "Mise en vente",
			body: {
				card_id: item.id,
				base_amount: price,
				duration_minutes: Math.round(durationHours * 60)
			}
		}),
		placeBid: (id, amount) => api(`/api/marketplace/${id}/bid`, {
			method: "POST",
			label: "Envoi de votre enchère",
			body: { amount }
		}),
		reprice: (id, amount) => api(`/api/marketplace/${id}/reprice`, {
			method: "POST",
			label: "Baisse du prix",
			body: { new_base_amount: amount }
		}),
		cancelAuction: (id) => api(`/api/marketplace/${id}`, {
			method: "DELETE",
			label: "Annulation de la vente"
		}),
		settle: (id) => api(`/api/marketplace/${id}/settle`, {
			method: "POST",
			label: "Finalisation de l'enchère"
		}),
		async trades({ quiet = false } = {}) {
			const raw = (await api("/api/trades", {
				quiet,
				label: "Chargement des échanges"
			})).trades || [];
			const me = whoAmI(raw, this.userId, getProfile()?.username);
			return raw.map((t) => nTrade(t, me));
		},
		tradeAction: (id, action) => api(`/api/trades/${id}`, {
			method: "PATCH",
			body: { action },
			headers: tz(),
			label: ACTION_LABEL[action]
		}),
		async proposeTrade({ to, give = [], get = [], giveCoins = 0, getCoins = 0, parentId = null }) {
			const me = needMe(this.userId);
			const items = [...give.map((it) => ({
				user_card_id: it.userCardId,
				card_id: it.card.id,
				offered_by: me
			})), ...get.map((it) => ({
				user_card_id: it.userCardId,
				card_id: it.card.id,
				offered_by: to
			}))];
			return api("/api/trades", {
				method: "POST",
				headers: tz(),
				label: parentId ? "Envoi de la contre-offre" : "Envoi de votre offre",
				body: {
					recipient_id: to,
					items,
					initiator_wikibidous: giveCoins,
					recipient_wikibidous: getCoins,
					parent_trade_id: parentId ?? void 0
				}
			});
		},
		async friends() {
			const list = ((await api("/api/friends", { label: "Chargement de vos amis" })).friendships || []).filter((f) => f.status === "accepted");
			const asTrade = (f) => ({
				initiator_id: f.requester_id ?? f.requester?.id,
				recipient_id: f.addressee_id ?? f.addressee?.id,
				initiator: f.requester,
				recipient: f.addressee
			});
			const me = whoAmI(list.map(asTrade), this.userId, getProfile()?.username);
			return list.map((f) => otherOf(f, me));
		},
		async profileCollection(username, { page = 0, q, rarity, sort } = {}) {
			const d = await api(`/api/profile/${encodeURIComponent(username)}/collection?${qs({
				page,
				q,
				rarity,
				sort: sort === "name" ? "name" : null
			})}`);
			const rows = d.collection || [];
			return {
				items: mapCollection(rows),
				pending: new Set(d.pendingTradeCardIds || []),
				hasMore: rows.length === PAGE
			};
		},
		humanCheck: (token) => api("/api/human-check", {
			method: "POST",
			body: { token },
			label: "Vérification"
		}),
		async chat(friendId) {
			const d = await api(`/api/chat/${friendId}`, { quiet: true });
			const trades = d.trades || [], messages = d.messages || [];
			const me = chatMe(friendId, trades, messages, this.userId);
			return {
				messages: messages.map((m) => nMessage(m, me)),
				trades: trades.map((t) => nTrade(t, me))
			};
		},
		sendChat: (friendId, content) => api(`/api/chat/${friendId}`, {
			method: "POST",
			body: { content },
			label: "Envoi du message"
		}),
		async marketStats(card) {
			const d = await api(`/api/marketplace/cards/${card.id}/sales?scope=summary`, { quiet: true });
			const stats = {
				soldAvg: d.summary?.[card.rarity]?.average ?? null,
				soldSeries: [],
				soldCount: 0,
				soldMin: null,
				soldMax: null,
				isPro: !!d.isPro
			};
			if (!d.isPro) return stats;
			const series = ((await api(`/api/marketplace/cards/${card.id}/sales`, { quiet: true }).catch(() => ({}))).sales || []).filter((s) => s.final_price != null).map((s) => ({
				price: s.final_price,
				t: Date.parse(s.settled_at || "") || 0
			})).sort((a, b) => a.t - b.t);
			const prices = series.map((s) => s.price);
			if (prices.length) {
				Object.assign(stats, {
					soldSeries: series,
					soldCount: prices.length,
					soldMin: Math.min(...prices),
					soldMax: Math.max(...prices)
				});
				stats.soldAvg ??= Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
			}
			return stats;
		},
		notifications: () => api("/api/notifications", { quiet: true }).then((d) => (d.notifications || []).map(nNotification)),
		markRead: (ids) => api("/api/notifications", {
			method: "PATCH",
			body: ids ? { ids } : {},
			quiet: true
		}),
		discard: (userCardId) => api(`/api/user-cards/${userCardId}/discard`, {
			method: "POST",
			label: "Défausse"
		}),
		bulkDiscard: (userCardIds) => api("/api/user-cards/bulk-discard", {
			method: "POST",
			label: "Défausse des cartes",
			body: { card_ids: userCardIds }
		}),
		specialAvailable: () => api("/api/packs/special", { quiet: true }).then((d) => !!d.available, () => false)
	};
	var MockData = {
		...RealData,
		isReal: false,
		canReset: true,
		userId: "me",
		async profile() {
			const p = await api("/api/profile", { quiet: true });
			return {
				username: p.username,
				packs_remaining: p.packs_remaining,
				pack_cap: p.pack_cap,
				currency: p.wikibidous_balance,
				next_regen_seconds: p.next_regen_seconds,
				is_pro: !!p.is_pro
			};
		},
		reset: () => api("/api/reset", { method: "POST" })
	};
	var session = {
		packs: 0,
		cards: 0,
		newCards: 0
	};
	function recordPull(cards) {
		session.packs += 1;
		session.cards += cards.length;
		session.newCards += cards.filter((c) => c.is_new).length;
	}
	var wm_exports = __exportAll({
		RARITIES: () => RARITIES,
		RARITIES_DESC: () => RARITIES_DESC,
		RNAME: () => RNAME,
		SIDE: () => SIDE,
		STATUS: () => STATUS,
		activity: () => activity,
		afterLeaving: () => afterLeaving,
		backgroundLane: () => backgroundLane,
		balanceBadge: () => balanceBadge,
		balanceLabel: () => balanceLabel,
		chainOf: () => chainOf,
		data: () => data,
		dealLine: () => dealLine,
		forgetCollection: () => forgetCollection,
		health: () => health,
		initCapture: () => initCapture,
		isRateLimited: () => isRateLimited,
		loadCollection: () => loadCollection,
		marketValueFor: () => marketValueFor,
		normSearch: () => normSearch,
		offerSummary: () => offerSummary,
		recordPull: () => recordPull,
		refreshProfile: () => refreshProfile,
		session: () => session,
		sideValue: () => sideValue,
		statusLabel: () => statusLabel,
		stepIn: () => stepIn,
		timeline: () => timeline,
		tradeTabs: () => tradeTabs,
		verdict: () => verdict,
		verdictTitle: () => verdictTitle
	});
	var data = /(^|\.)wiki-masters\.com$/.test(location.hostname) ? RealData : MockData;
	var VALUE_TTL = 864e5;
	var RATE_PAUSE_MS = 6e4;
	var saved$1 = Object.fromEntries(Object.entries(load$1("values", Infinity) || {}).filter(([, [, t]]) => Date.now() - t < VALUE_TTL));
	var inflight = new Map();
	var saveTimer = null;
	function marketValueFor(card) {
		const hit = saved$1[card.id];
		if (hit) return Promise.resolve(hit[0]);
		if (!inflight.has(card.id)) {
			const fetchValue = (left) => backgroundLane.run(() => data.marketStats(card)).then((s) => {
				saved$1[card.id] = [s.soldAvg, Date.now()];
				saveTimer ??= setTimeout(() => {
					saveTimer = null;
					save("values", saved$1);
				}, 1e3);
				return s.soldAvg;
			}, (e) => {
				if (!isRateLimited(e)) return null;
				backgroundLane.pause(RATE_PAUSE_MS);
				return left > 0 ? fetchValue(left - 1) : null;
			});
			inflight.set(card.id, fetchValue(2).finally(() => inflight.delete(card.id)));
		}
		return inflight.get(card.id);
	}
	var COLLECTION_TTL = 6048e5;
	var COLLECTION_KEY = "collection.v3";
	async function loadCollection({ onCached, onPartial } = {}) {
		const cached = load$1(COLLECTION_KEY, COLLECTION_TTL);
		if (cached) onCached?.(cached);
		const fresh = await data.collection({ onPartial: cached ? void 0 : onPartial });
		save(COLLECTION_KEY, fresh);
		return fresh;
	}
	var forgetCollection = () => drop(COLLECTION_KEY);
	var PATHS = {
		close: "<path d=\"M6 6l12 12M18 6L6 18\"/>",
		search: "<circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M20 20l-3.4-3.4\"/>",
		prev: "<path d=\"M15 18l-6-6 6-6\"/>",
		next: "<path d=\"M9 6l6 6-6 6\"/>",
		sort: "<path d=\"M7 5v14M7 19l-3-3M7 5l3 3M17 19V5M17 5l3 3M17 19l-3-3\"/>",
		eye: "<path d=\"M2.5 11.5S6 4.5 12 4.5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z\"/><circle cx=\"12\" cy=\"11.5\" r=\"3\"/>",
		eyeOff: "<path d=\"M3 3l18 18\"/><path d=\"M10.6 10.7a3 3 0 0 0 3.9 3.9\"/><path d=\"M9.8 4.7A10.4 10.4 0 0 1 12 4.5c6 0 9.5 7 9.5 7a17.6 17.6 0 0 1-2.9 3.8M6 6.2A17.3 17.3 0 0 0 2.5 11.5s3.5 7 9.5 7c1 0 1.9-.1 2.8-.4\"/>",
		heart: "<path d=\"M12 20.5S3.5 14.7 3.5 9.2A4.2 4.2 0 0 1 12 6.5a4.2 4.2 0 0 1 8.5 2.7c0 5.5-8.5 11.3-8.5 11.3z\"/>",
		star: "<path d=\"M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z\"/>",
		sparkle: "<path d=\"M12 2l1.9 6.4L20 10l-6.1 1.6L12 18l-1.9-6.4L4 10l6.1-1.6z\"/>",
		check: "<path d=\"M5 12.5l4.5 4.5L19 7.5\"/>",
		select: "<rect x=\"3.5\" y=\"3.5\" width=\"17\" height=\"17\" rx=\"4\"/><path d=\"M8 12l2.8 2.8L16.5 9\"/>",
		bell: "<path d=\"M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9\"/><path d=\"M13.5 21a2 2 0 0 1-3 0\"/>",
		coin: "<circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"3.4\"/>",
		pulls: "<rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M3 9h18\"/>",
		collection: "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"/><path d=\"M8 7h8M8 11h8M8 15h5\"/>",
		catalog: "<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"/>",
		market: "<path d=\"M4.5 9 6 5h12l1.5 4M5.5 9v10h13V9M9.5 19v-6h5v6\"/>",
		trades: "<path d=\"M4 9h13l-3-3M20 15H7l3 3\"/>",
		battle: "<path d=\"M4.5 19.5l1-3 9-9 2 2-9 9zM19.5 19.5l-1-3-9-9-2 2 9 9z\"/>",
		guild: "<path d=\"M12 3l7 2.5v5.5c0 4.2-2.9 7.4-7 9-4.1-1.6-7-4.8-7-9V5.5z\"/>",
		friends: "<circle cx=\"9\" cy=\"8\" r=\"3.2\"/><path d=\"M3.5 20a5.5 5.5 0 0 1 11 0\"/><path d=\"M16 5.2a3.2 3.2 0 0 1 0 5.6M20.5 20a5.5 5.5 0 0 0-3.5-5.1\"/>",
		dms: "<path d=\"M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 19.5l1.3-4A7.5 7.5 0 1 1 20 11.5z\"/>",
		leaderboard: "<path d=\"M4 20h16M6 20v-6M12 20V5M18 20v-9\"/>",
		achievements: "<path d=\"M7 4h10v5a5 5 0 0 1-10 0zM7 6H4.5v1.5A3 3 0 0 0 7.5 10.5M17 6h2.5v1.5a3 3 0 0 1-3 3M12 14v3M8.5 20h7l-.6-3H9.1z\"/>",
		profile: "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4.5 20a7.5 7.5 0 0 1 15 0\"/>",
		sound: "<path d=\"M4 9.5h3.5L12 5.5v13l-4.5-4H4z\"/><path d=\"M15.5 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11\"/>",
		soundLow: "<path d=\"M4 9.5h3.5L12 5.5v13l-4.5-4H4z\"/><path d=\"M15.5 9a4 4 0 0 1 0 6\"/>",
		mute: "<path d=\"M4 9.5h3.5L12 5.5v13l-4.5-4H4z\"/><path d=\"M16 9.5l5 5M21 9.5l-5 5\"/>",
		settings: "<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6\"/>"
	};
	var root$26 = from_svg(`<svg viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"></svg>`);
	function Icon($$anchor, $$props) {
		let filled = prop($$props, "filled", 3, false), width = prop($$props, "width", 3, 1.8), cls = prop($$props, "class", 3, "");
		var svg = root$26();
		html(svg, () => PATHS[$$props.name], true);
		reset(svg);
		template_effect(() => {
			set_class(svg, 0, clsx(cls()));
			set_attribute(svg, "fill", filled() ? "currentColor" : "none");
			set_attribute(svg, "stroke-width", width());
		});
		append($$anchor, svg);
	}
	var KEY$1 = "wm-settings";
	var DEFAULTS = {
		hideStats: false,
		hideSensitive: true,
		collection: {
			sort: "rarity",
			filter: "ALL",
			favOnly: false,
			shinyOnly: false
		},
		catalog: {
			sort: "rarity",
			rarity: "",
			wishOnly: false
		},
		market: {
			tab: "browse",
			sort: "recent",
			rarity: ""
		}
	};
	function load() {
		try {
			return JSON.parse(localStorage.getItem(KEY$1)) || {};
		} catch {
			return {};
		}
	}
	var saved = load();
	var settings = proxy(Object.fromEntries(Object.entries(DEFAULTS).map(([k, v]) => [k, typeof v === "object" ? {
		...v,
		...saved[k]
	} : saved[k] ?? v])));
	effect_root(() => {
		user_effect(() => {
			const json = JSON.stringify(settings);
			try {
				localStorage.setItem(KEY$1, json);
			} catch {}
		});
	});
	var toggleHideStats = () => settings.hideStats = !settings.hideStats;
	var toggleHideSensitive = () => settings.hideSensitive = !settings.hideSensitive;
	function useOriginalSite(path) {
		try {
			localStorage.setItem("wm-off", "1");
		} catch {}
		path ? location.assign(path) : location.reload();
	}
	var ASSET_BASE = "https://www.wiki-masters.com";
	var RBG = {
		C: "/commun.png",
		PC: "/peu_commun.png",
		R: "/rare.png",
		SR: "/super_rare.png",
		UR: "/ultra_rare.png",
		L: "/legendaire.png"
	};
	var isOnyx = (card, shiny = false) => !!shiny && card.rarity === "L";
	var rarityArt = (card, shiny = false) => ASSET_BASE + (isOnyx(card, shiny) ? "/shiny/onyx-art.webp" : RBG[card.rarity] || "/commun.png");
	var root$25 = from_html(`<img class="wc-photo onyx-photo" loading="lazy" crossorigin="anonymous"/>`);
	var root_1$25 = from_html(`<img class="wc-bg onyx" alt="" aria-hidden="true" loading="lazy"/> <span class="ox ox-shade" aria-hidden="true"></span> <span class="ox ox-tint" aria-hidden="true"></span> <span class="ox ox-wash" aria-hidden="true"></span> <!> <span class="ox ox-lines" aria-hidden="true"></span> <span class="ox ox-shine" aria-hidden="true"></span>`, 1);
	var root_2$20 = from_html(`<img class="wc-blur" alt="" aria-hidden="true" loading="lazy" crossorigin="anonymous"/> <img class="wc-photo" loading="lazy" crossorigin="anonymous"/>`, 1);
	var root_3$17 = from_html(`<img class="wc-bg" alt="" aria-hidden="true" loading="lazy"/>`);
	var root_4$16 = from_html(`<span aria-hidden="true"></span>`);
	var root_5$16 = from_html(`<span class="wc-nsfw" aria-hidden="true">Contenu sensible</span>`);
	var root_6$15 = from_html(`<span class="wc-wish" title="Liste de souhaits" aria-label="Liste de souhaits"><!></span>`);
	var root_7$14 = from_html(`<span class="wc-star" title="Favori" aria-label="Favori"><!></span>`);
	var root_8$12 = from_html(`<span class="wc-shiny" title="Brillante" aria-label="Brillante"><!></span>`);
	var root_9$10 = from_html(`<span class="wc-count"> </span>`);
	var root_10$9 = from_html(`<span class="wc-new">Nouvelle</span>`);
	var root_11$8 = from_html(`<span class="wc-stats"><span>ATK <b> </b></span> <span>DEF <b> </b></span></span>`);
	var root_12$8 = from_html(`<span class="wc-val" title="Valeur estimée d'après le marché"> </span>`);
	var root_13$7 = from_html(`<div class="wc-meta"><!> <!></div>`);
	var root_14$6 = from_html(`<article><div class="wc-face"><!> <!> <!></div> <div class="wc-scrim"></div> <div class="wc-top"><span class="wc-rtag"> </span> <span class="wc-flags"><!> <!> <!> <!> <!></span></div> <div class="wc-cap"><h3 class="wc-name"> </h3> <div class="wc-cat"> </div> <!></div></article>`);
	function Card($$anchor, $$props) {
		push($$props, true);
		let count = prop($$props, "count", 3, 1), isNew = prop($$props, "isNew", 3, false), shiny = prop($$props, "shiny", 3, false), starred = prop($$props, "starred", 3, false), value = prop($$props, "value", 3, void 0), owned = prop($$props, "owned", 3, true), wishlisted = prop($$props, "wishlisted", 3, false), big = prop($$props, "big", 3, false), caption = prop($$props, "caption", 3, true), stats = prop($$props, "stats", 3, true);
		const showStats = user_derived(() => stats() && !settings.hideStats);
		let hasValue = user_derived(() => typeof value() === "number");
		let blurred = user_derived(() => settings.hideSensitive && $$props.card.nsfw_image);
		const onyx = user_derived(() => isOnyx($$props.card, shiny()));
		const art = user_derived(() => rarityArt($$props.card, shiny()));
		let imgFailed = state(false);
		let artFailed = state(false);
		let showPhoto = user_derived(() => !!$$props.card.image_url && !get(imgFailed));
		let ready = state(false);
		function fadeIn(img) {
			const done = () => set(ready, true);
			if (img.complete && img.naturalWidth) done();
			img.addEventListener("load", done);
			img.addEventListener("error", done);
			return { destroy: () => {
				img.removeEventListener("load", done);
				img.removeEventListener("error", done);
			} };
		}
		var article = root_14$6();
		let classes;
		var div = child(article);
		var node = child(div);
		var consequent_1 = ($$anchor) => {
			var fragment = root_1$25();
			var img_1 = first_child(fragment);
			action(img_1, ($$node) => fadeIn?.($$node));
			var node_1 = sibling(img_1, 8);
			var consequent = ($$anchor) => {
				var img_2 = root$25();
				template_effect(() => {
					set_attribute(img_2, "src", $$props.card.image_url);
					set_attribute(img_2, "alt", $$props.card.title);
				});
				event("error", img_2, () => set(imgFailed, true));
				replay_events(img_2);
				append($$anchor, img_2);
			};
			if_block(node_1, ($$render) => {
				if (get(showPhoto)) $$render(consequent);
			});
			next(4);
			template_effect(() => set_attribute(img_1, "src", get(art)));
			replay_events(img_1);
			append($$anchor, fragment);
		};
		var consequent_2 = ($$anchor) => {
			var fragment_1 = root_2$20();
			var img_3 = first_child(fragment_1);
			var img_4 = sibling(img_3, 2);
			action(img_4, ($$node) => fadeIn?.($$node));
			template_effect(() => {
				set_attribute(img_3, "src", $$props.card.image_url);
				set_attribute(img_4, "src", $$props.card.image_url);
				set_attribute(img_4, "alt", $$props.card.title);
			});
			event("error", img_4, () => set(imgFailed, true));
			replay_events(img_4);
			append($$anchor, fragment_1);
		};
		var consequent_3 = ($$anchor) => {
			var img_5 = root_3$17();
			action(img_5, ($$node) => fadeIn?.($$node));
			template_effect(() => set_attribute(img_5, "src", get(art)));
			event("error", img_5, () => set(artFailed, true));
			replay_events(img_5);
			append($$anchor, img_5);
		};
		if_block(node, ($$render) => {
			if (get(onyx)) $$render(consequent_1);
			else if (get(showPhoto)) $$render(consequent_2, 1);
			else if (!get(artFailed)) $$render(consequent_3, 2);
		});
		var node_2 = sibling(node, 2);
		var consequent_4 = ($$anchor) => {
			var span = root_4$16();
			let classes_1;
			template_effect(() => classes_1 = set_class(span, 1, "wc-holo", null, classes_1, { onyx: get(onyx) }));
			append($$anchor, span);
		};
		if_block(node_2, ($$render) => {
			if (shiny()) $$render(consequent_4);
		});
		var node_3 = sibling(node_2, 2);
		var consequent_5 = ($$anchor) => {
			append($$anchor, root_5$16());
		};
		if_block(node_3, ($$render) => {
			if (get(blurred)) $$render(consequent_5);
		});
		reset(div);
		var div_1 = sibling(div, 4);
		var span_2 = child(div_1);
		var text = only_child(span_2, true);
		var span_3 = sibling(span_2, 2);
		var node_4 = child(span_3);
		var consequent_6 = ($$anchor) => {
			var span_4 = root_6$15();
			Icon(child(span_4), {
				name: "heart",
				filled: true,
				width: 0
			});
			reset(span_4);
			append($$anchor, span_4);
		};
		if_block(node_4, ($$render) => {
			if (wishlisted()) $$render(consequent_6);
		});
		var node_6 = sibling(node_4, 2);
		var consequent_7 = ($$anchor) => {
			var span_5 = root_7$14();
			Icon(child(span_5), {
				name: "star",
				filled: true,
				width: 0
			});
			reset(span_5);
			append($$anchor, span_5);
		};
		if_block(node_6, ($$render) => {
			if (starred()) $$render(consequent_7);
		});
		var node_8 = sibling(node_6, 2);
		var consequent_8 = ($$anchor) => {
			var span_6 = root_8$12();
			Icon(child(span_6), {
				name: "sparkle",
				filled: true,
				width: 0
			});
			reset(span_6);
			append($$anchor, span_6);
		};
		if_block(node_8, ($$render) => {
			if (shiny()) $$render(consequent_8);
		});
		var node_10 = sibling(node_8, 2);
		var consequent_9 = ($$anchor) => {
			var span_7 = root_9$10();
			var text_1 = only_child(span_7);
			template_effect(() => set_text(text_1, `x${count() ?? ""}`));
			append($$anchor, span_7);
		};
		if_block(node_10, ($$render) => {
			if (count() > 1) $$render(consequent_9);
		});
		var node_11 = sibling(node_10, 2);
		var consequent_10 = ($$anchor) => {
			append($$anchor, root_10$9());
		};
		if_block(node_11, ($$render) => {
			if (isNew()) $$render(consequent_10);
		});
		reset(span_3);
		reset(div_1);
		var div_2 = sibling(div_1, 2);
		var h3 = child(div_2);
		var text_2 = only_child(h3, true);
		var div_3 = sibling(h3, 2);
		var text_3 = only_child(div_3, true);
		var node_12 = sibling(div_3, 2);
		var consequent_13 = ($$anchor) => {
			var div_4 = root_13$7();
			var node_13 = child(div_4);
			var consequent_11 = ($$anchor) => {
				var span_9 = root_11$8();
				var span_10 = child(span_9);
				var text_4 = only_child(sibling(child(span_10)), true);
				reset(span_10);
				var span_11 = sibling(span_10, 2);
				var text_5 = only_child(sibling(child(span_11)), true);
				reset(span_11);
				reset(span_9);
				template_effect(($0, $1) => {
					set_text(text_4, $0);
					set_text(text_5, $1);
				}, [() => nf($$props.card.atk), () => nf($$props.card.def)]);
				append($$anchor, span_9);
			};
			if_block(node_13, ($$render) => {
				if (get(showStats)) $$render(consequent_11);
			});
			var node_14 = sibling(node_13, 2);
			var consequent_12 = ($$anchor) => {
				var span_12 = root_12$8();
				var text_6 = only_child(span_12, true);
				template_effect(($0) => set_text(text_6, $0), [() => nf(value())]);
				append($$anchor, span_12);
			};
			if_block(node_14, ($$render) => {
				if (get(hasValue)) $$render(consequent_12);
			});
			reset(div_4);
			append($$anchor, div_4);
		};
		if_block(node_12, ($$render) => {
			if (get(showStats) || get(hasValue)) $$render(consequent_13);
		});
		reset(div_2);
		reset(article);
		template_effect(() => {
			classes = set_class(article, 1, "wc", null, classes, {
				"is-ready": get(ready) || get(artFailed),
				"wc-big": big(),
				bare: !caption(),
				"is-noimg": !get(showPhoto),
				"is-shiny": shiny(),
				"is-unowned": !owned(),
				"is-nsfw": get(blurred)
			});
			set_attribute(article, "data-r", $$props.card.rarity);
			set_attribute(span_2, "data-r", $$props.card.rarity);
			set_text(text, $$props.card.rarity);
			set_text(text_2, $$props.card.title);
			set_text(text_3, $$props.card.category);
		});
		append($$anchor, article);
		pop();
	}
	var KEY = "wiki-masters-sound";
	var VOLUME_KEY = "wm-volume";
	var SCALE = .9;
	var ctx = null;
	var master = null;
	var noiseBuf = null;
	var subs = new Set();
	function soundOn() {
		try {
			return localStorage.getItem(KEY) !== "off";
		} catch {
			return true;
		}
	}
	function setSoundOn(on) {
		try {
			localStorage.setItem(KEY, on ? "on" : "off");
		} catch {}
		for (const f of subs) f(on);
	}
	function onSoundChange(f) {
		subs.add(f);
		f(soundOn());
		return () => subs.delete(f);
	}
	var volSubs = new Set();
	function volume() {
		try {
			const v = parseFloat(localStorage.getItem(VOLUME_KEY));
			return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : .7;
		} catch {
			return .7;
		}
	}
	function setVolume(v) {
		v = Math.min(1, Math.max(0, v));
		try {
			localStorage.setItem(VOLUME_KEY, String(v));
		} catch {}
		if (master) master.gain.value = v * SCALE;
		for (const f of volSubs) f(v);
	}
	function onVolumeChange(f) {
		volSubs.add(f);
		f(volume());
		return () => volSubs.delete(f);
	}
	function audio() {
		if (ctx) {
			if (ctx.state !== "running") ctx.resume().catch(() => {});
			return ctx;
		}
		const AC = globalThis.AudioContext || globalThis.webkitAudioContext;
		if (!AC) return null;
		ctx = new AC();
		const comp = ctx.createDynamicsCompressor();
		comp.threshold.value = -14;
		comp.knee.value = 12;
		comp.ratio.value = 3;
		comp.attack.value = .004;
		comp.release.value = .2;
		master = ctx.createGain();
		master.gain.value = volume() * SCALE;
		master.connect(comp).connect(ctx.destination);
		noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
		const d = noiseBuf.getChannelData(0);
		for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
		return ctx;
	}
	function env(g, t, peak, attack, decay) {
		g.gain.setValueAtTime(1e-4, t);
		g.gain.exponentialRampToValueAtTime(peak, t + attack);
		g.gain.exponentialRampToValueAtTime(1e-4, t + attack + decay);
	}
	function bell(freq, t, peak = .16, decay = .9) {
		for (const [mult, amp, dk] of [
			[
				1,
				1,
				decay
			],
			[
				2,
				.35,
				decay * .45
			],
			[
				3.01,
				.12,
				decay * .25
			]
		]) {
			const o = ctx.createOscillator(), g = ctx.createGain();
			o.type = "sine";
			o.frequency.value = freq * mult;
			env(g, t, peak * amp, .006, dk);
			o.connect(g).connect(master);
			o.start(t);
			o.stop(t + dk + .05);
		}
	}
	function tone(type, f0, f1, t, dur, peak) {
		const o = ctx.createOscillator(), g = ctx.createGain();
		o.type = type;
		o.frequency.setValueAtTime(f0, t);
		if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
		env(g, t, peak, .004, dur);
		o.connect(g).connect(master);
		o.start(t);
		o.stop(t + dur + .05);
	}
	function noise(t, dur, peak, type, f0, f1, q = 1) {
		const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
		s.buffer = noiseBuf;
		f.type = type;
		f.Q.value = q;
		f.frequency.setValueAtTime(f0, t);
		f.frequency.exponentialRampToValueAtTime(f1, t + dur);
		env(g, t, peak, .008, dur);
		s.connect(f).connect(g).connect(master);
		s.start(t, Math.random() * .5);
		s.stop(t + dur + .05);
	}
	var sparkle = (t, n, spread, top = 1) => {
		for (let i = 0; i < n; i++) bell(2093 * top * [
			1,
			1.26,
			1.5,
			1.68,
			2
		][i % 5], t + i * spread, .035, .35);
	};
	var N = {
		C4: 261.6,
		E4: 329.6,
		G4: 392,
		B4: 493.9,
		C5: 523.3,
		D5: 587.3,
		E5: 659.3,
		G5: 784,
		B5: 987.8,
		C6: 1046.5,
		E6: 1318.5,
		G6: 1568
	};
	var SOUNDS = {
		rip(t) {
			noise(t, .22, .22, "bandpass", 500, 1800, .8);
			tone("sine", 110, 48, t + .03, .26, .32);
			noise(t + .16, .4, .07, "lowpass", 1400, 250, .6);
		},
		flip(t) {
			noise(t, .09, .32, "bandpass", 2200, 900, 1.4);
			tone("triangle", 2400, 1800, t + .01, .03, .05);
		},
		C(t) {
			bell(N.E5, t, .11, .55);
		},
		PC(t) {
			bell(N.G5, t, .11, .5);
			bell(N.C6, t + .07, .1, .6);
		},
		R(t) {
			[
				N.C5,
				N.E5,
				N.G5
			].forEach((f, i) => bell(f, t + i * .07, .12, .8));
		},
		SR(t) {
			[
				N.C5,
				N.E5,
				N.G5,
				N.C6
			].forEach((f, i) => bell(f, t + i * .065, .12, .9));
			sparkle(t + .28, 4, .05);
		},
		UR(t) {
			[
				N.G4,
				N.B4,
				N.D5,
				N.G5,
				N.B5
			].forEach((f, i) => bell(f, t + i * .06, .13, 1.1));
			noise(t, .9, .05, "bandpass", 600, 3e3, .8);
			sparkle(t + .32, 6, .045);
		},
		L(t) {
			const f = ctx.createBiquadFilter(), g = ctx.createGain();
			f.type = "lowpass";
			f.Q.value = 2;
			f.frequency.setValueAtTime(350, t);
			f.frequency.exponentialRampToValueAtTime(3200, t + .9);
			g.gain.setValueAtTime(1e-4, t);
			g.gain.exponentialRampToValueAtTime(.16, t + .35);
			g.gain.exponentialRampToValueAtTime(1e-4, t + 2.2);
			f.connect(g).connect(master);
			for (const fr of [
				N.C4,
				N.E4,
				N.G4,
				N.C5
			]) for (const det of [-6, 6]) {
				const o = ctx.createOscillator();
				o.type = "sawtooth";
				o.frequency.value = fr;
				o.detune.value = det;
				o.connect(f);
				o.start(t);
				o.stop(t + 2.3);
			}
			tone("sine", 90, 38, t, .7, .55);
			[
				N.C5,
				N.E5,
				N.G5,
				N.C6,
				N.E6,
				N.G6
			].forEach((fr, i) => bell(fr, t + .12 + i * .075, .13, 1.3));
			sparkle(t + .6, 10, .07, 1.25);
		},
		select(t) {
			tone("sine", 880, 1320, t, .07, .16);
		},
		deselect(t) {
			tone("sine", 1320, 880, t, .07, .12);
		},
		success(t) {
			bell(N.C6, t, .14, .6);
			bell(N.G6, t + .09, .12, .8);
		},
		error(t) {
			tone("triangle", 220, 196, t, .14, .16);
			tone("triangle", 196, 174.6, t + .13, .2, .14);
		},
		tick(t) {
			tone("sine", 2600, 2400, t, .02, .04);
		}
	};
	function play(name, delay = 0) {
		if (!soundOn() || !SOUNDS[name]) return;
		if (!audio()) return;
		try {
			SOUNDS[name](ctx.currentTime + .01 + delay);
		} catch {}
	}
	function reveal(rarity) {
		play("flip");
		play(rarity, .12);
	}
	var rarest = (cards) => RARITIES_DESC.find((r) => cards?.some((c) => c.rarity === r)) ?? null;
	async function sounded(run, sfx = play) {
		try {
			const d = await run();
			sfx("success");
			return d;
		} catch (e) {
			sfx("error");
			throw e;
		}
	}
	var pickSound = (wasPicked, sfx = play) => sfx(wasPicked ? "deselect" : "select");
	function isTabSwitch(target) {
		const tab = target?.closest?.("[role=\"tab\"]");
		return !!tab && !tab.disabled && tab.getAttribute("aria-selected") !== "true";
	}
	function tabTicks(root, sfx = play) {
		const on = (e) => isTabSwitch(e.target) && sfx("tick");
		root.addEventListener("click", on, true);
		return () => root.removeEventListener("click", on, true);
	}
	var GAP = 16;
	function anchorCentered(dialog) {
		const backdrop = dialog.parentElement;
		const center = () => {
			backdrop.style.paddingTop = `${Math.max(GAP, Math.round((innerHeight - dialog.offsetHeight) / 2))}px`;
		};
		center();
		const raf = requestAnimationFrame(() => {
			if (!matchMedia("(prefers-reduced-motion: reduce)").matches) backdrop.style.transition = "padding-top .22s cubic-bezier(.2,.7,.3,1)";
		});
		const ro = new ResizeObserver(center);
		ro.observe(dialog);
		addEventListener("resize", center);
		return { destroy() {
			cancelAnimationFrame(raf);
			ro.disconnect();
			removeEventListener("resize", center);
		} };
	}
	var root$24 = from_html(`<div class="modal-cat"> </div>`);
	var root_1$24 = from_html(`<p class="modal-sum muted">Chargement du résumé...</p>`);
	var root_2$19 = from_html(`<p class="modal-sum"> </p>`);
	var root_3$16 = from_html(`<div class="fact"><div class="fk">Valeur estimée</div><div class="fv val"> </div></div>`);
	var root_4$15 = from_html(`<div class="fact"><div class="fk">Exemplaires</div><div class="fv"> <!></div></div>`);
	var root_5$15 = from_html(`<div class="fact"><div class="fk" title="Vues de l'article Wikipédia sur 30 jours">Popularité (30 j)</div><div class="fv"> </div></div>`);
	var root_6$14 = from_html(`<div class="fact"><div class="fk">Attaque</div><div class="fv atk"> </div></div> <div class="fact"><div class="fk">Défense</div><div class="fv def"> </div></div>`, 1);
	var root_7$13 = from_html(`<div class="modal-obtained"> </div>`);
	var root_8$11 = from_html(`<a class="modal-wiki" target="_blank" rel="noopener noreferrer">Voir l'article Wikipédia</a>`);
	var root_9$9 = from_html(`<div class="confirm"><div class="confirm-text">Défausser cette carte contre <b>1 point</b> ?</div> <div class="af-actions"><button class="btn">Annuler</button> <button class="btn danger">Défausser</button></div></div>`);
	var root_10$8 = from_html(`<button type="button" class="sell2-suggest"> </button>`);
	var root_11$7 = from_html(`<button type="button"> </button>`);
	var root_12$7 = from_html(`<div class="sell2"><div class="sell2-head">Mettre en vente</div> <div class="sell2-block"><div class="sell2-lab"><span>Prix de départ</span> <!></div> <div class="af-input-row"><input class="af-input" type="number" min="1" step="1" inputmode="numeric" placeholder="0"/> <span class="af-unit">pts</span></div></div> <div class="sell2-block"><div class="sell2-lab"><span>Durée de l'enchère</span></div> <div class="sell2-durs"></div></div> <div class="af-actions"><button class="btn">Annuler</button> <button class="btn primary"> </button></div></div>`);
	var root_13$6 = from_html(`<div class="actions"><button class="btn primary">Mettre en vente</button> <button class="btn danger">Défausser, +1 pt</button></div>`);
	var root_14$5 = from_html(`<div role="tabpanel" class="modal-panel"><!> <div class="facts"><!> <!> <!> <!></div> <!> <!> <!> <div class="modal-credit">Texte de l'article sous licence CC BY-SA 4.0</div></div>`);
	var root_15$4 = from_html(`<p class="modal-sum muted">Analyse du marché...</p>`);
	var root_16$4 = from_html(`<p class="modal-sum muted">Marché indisponible pour le moment.</p>`);
	var root_17$4 = from_html(`<div class="market-avg"><div class="ma-label">Prix moyen du marché</div> <div class="ma-value"> <span>pts</span></div></div>`);
	var root_18$3 = from_html(`<p class="modal-sum muted">Aucune vente enregistrée pour cette carte.</p>`);
	var root_19$2 = from_html(`<div class="market-chart"><div class="mc-head">Prix de vente dans le temps</div> <div class="mc-plot"><div class="mc-y"><span> </span><span> </span></div> <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-label="Prix de vente dans le temps"><path fill="var(--accent)" fill-opacity="0.12"></path><path fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"></path></svg></div> <div class="mc-x"><span> </span><span> </span></div></div>`);
	var root_20$2 = from_html(`<div class="market-grid"><div class="mstat"><div class="l">Prix moyen</div><div class="v"> </div></div> <div class="mstat"><div class="l">Min</div><div class="v"> </div></div> <div class="mstat"><div class="l">Max</div><div class="v"> </div></div> <div class="mstat"><div class="l">Ventes</div><div class="v"> </div></div></div>`);
	var root_21$2 = from_html(`<div class="rarity-note">Historique détaillé des ventes réservé aux membres Pro. La moyenne reste visible.</div>`);
	var root_22$1 = from_html(`<!> <!> <!> <!>`, 1);
	var root_23$1 = from_html(`<div role="tabpanel" class="modal-panel"><!></div>`);
	var root_24$1 = from_html(`<div> </div>`);
	var root_25$1 = from_html(`<div class="modal-backdrop" role="presentation"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="wm-modal-title" tabindex="-1"><button class="modal-close" aria-label="Fermer"><!></button> <div class="modal-card"><!></div> <div class="modal-info"><span class="modal-rar"> </span> <h2 class="modal-name" id="wm-modal-title"> </h2> <!> <div class="modal-tabs" role="tablist" aria-label="Détails de la carte"><button role="tab">Détails</button> <button role="tab">Marché</button></div> <!> <!></div></div></div>`);
	function CardModal($$anchor, $$props) {
		push($$props, true);
		let readonly = prop($$props, "readonly", 3, false);
		const c = user_derived(() => $$props.item.card);
		let tab = state("details");
		let summary = state(proxy($$props.item.card.summary || ""));
		let sumState = state(proxy($$props.item.card.summary ? "done" : "loading"));
		let market = state(null);
		let marketState = state("idle");
		let mval = state(null);
		let confirmDiscard = state(false);
		let sellOpen = state(false);
		let busy = state(false);
		let done = state(false);
		let msg = state("");
		let msgOk = state(false);
		let modalEl;
		if (!get(c).summary) fetch("https://fr.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(get(c).title)).then((r) => r.ok ? r.json() : {}).then((d) => set(summary, d.extract || "", true), () => {}).finally(() => set(sumState, get(summary) ? "done" : "none", true));
		marketValueFor(get(c)).then((v) => set(mval, v, true));
		user_effect(() => {
			if (get(tab) !== "market" || get(marketState) !== "idle") return;
			set(marketState, "loading");
			data.marketStats(get(c)).then((m) => {
				set(market, m, true);
				set(marketState, "done");
			}, () => set(marketState, "error"));
		});
		const DURATIONS = [
			1,
			3,
			6,
			12,
			24,
			48,
			72
		];
		let price = state("");
		let durationH = state(24);
		function openSell() {
			set(sellOpen, true);
			set(msg, "");
			if (!get(price) && get(mval) != null) set(price, String(get(mval)), true);
		}
		async function act(action, okMsg) {
			set(busy, true);
			set(msg, "");
			try {
				await action();
				$$props.onaction?.();
				set(done, true);
				set(msgOk, true);
				set(msg, okMsg, true);
			} catch (e) {
				set(msgOk, false);
				set(msg, e.message, true);
			}
			set(busy, false);
		}
		const sell = () => act(() => sounded(() => data.createAuction($$props.item, {
			price: Math.round(Number(get(price))),
			durationHours: get(durationH)
		})), "Carte mise en vente.");
		const discard = () => act(() => data.discard($$props.item.id), "Carte défaussée. +1 point.");
		function onKey(e) {
			if (e.key === "Escape") return $$props.onclose?.();
			if (e.key !== "Tab" || !modalEl) return;
			const f = [...modalEl.querySelectorAll("a[href],button:not([disabled]),input,[tabindex]:not([tabindex=\"-1\"])")].filter((el) => el.offsetParent !== null);
			if (!f.length) return;
			const first = f[0], last = f.at(-1);
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}
		const obtained = user_derived(() => $$props.item.obtained_at ? new Date($$props.item.obtained_at).toLocaleDateString("fr", {
			day: "numeric",
			month: "long",
			year: "numeric"
		}) : "");
		const dshort = (t) => t ? new Date(t).toLocaleDateString("fr", {
			day: "numeric",
			month: "short"
		}) : "";
		const chart = user_derived(() => {
			const s = get(market)?.soldSeries;
			if (!s || s.length < 2) return null;
			const prices = s.map((p) => p.price);
			const min = Math.min(...prices), max = Math.max(...prices), span = max - min || 1, H = 40, pad = 3;
			const pts = s.map((p, i) => [pad + i / (s.length - 1) * 94, pad + (1 - (p.price - min) / span) * 34]);
			const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
			return {
				d,
				area: `${d} L${pts.at(-1)[0].toFixed(1)} ${H} L${pts[0][0].toFixed(1)} ${H} Z`,
				min,
				max,
				first: dshort(s[0].t),
				last: dshort(s.at(-1).t)
			};
		});
		user_effect(() => {
			const html = document.documentElement;
			const prev = html.style.overflow;
			html.style.overflow = "hidden";
			return () => {
				html.style.overflow = prev;
			};
		});
		user_effect(() => {
			const trigger = document.activeElement;
			modalEl?.focus();
			return () => {
				if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus();
			};
		});
		user_effect(() => {
			if (!get(done)) return;
			const t = setTimeout(() => $$props.onclose?.(), 1e3);
			return () => clearTimeout(t);
		});
		var div = root_25$1();
		event("keydown", $window, onKey);
		var div_1 = child(div);
		var button = child(div_1);
		Icon(child(button), {
			name: "close",
			width: 2,
			class: "x-ico"
		});
		reset(button);
		var div_2 = sibling(button, 2);
		Card(child(div_2), {
			get card() {
				return get(c);
			},
			big: true,
			caption: false,
			get count() {
				return $$props.item.count;
			},
			get shiny() {
				return $$props.item.is_shiny;
			},
			get starred() {
				return $$props.item.starred;
			}
		});
		reset(div_2);
		var div_3 = sibling(div_2, 2);
		var span_1 = child(div_3);
		var text$5 = only_child(span_1, true);
		var h2 = sibling(span_1, 2);
		var text_1 = only_child(h2, true);
		var node_2 = sibling(h2, 2);
		var consequent = ($$anchor) => {
			var div_4 = root$24();
			var text_2 = only_child(div_4, true);
			template_effect(() => set_text(text_2, get(c).category));
			append($$anchor, div_4);
		};
		if_block(node_2, ($$render) => {
			if (get(c).category) $$render(consequent);
		});
		var div_5 = sibling(node_2, 2);
		var button_1 = child(div_5);
		let classes;
		var button_2 = sibling(button_1, 2);
		let classes_1;
		reset(div_5);
		var node_3 = sibling(div_5, 2);
		var consequent_14 = ($$anchor) => {
			var div_6 = root_14$5();
			var node_4 = child(div_6);
			var consequent_1 = ($$anchor) => {
				append($$anchor, root_1$24());
			};
			var consequent_2 = ($$anchor) => {
				var p_2 = root_2$19();
				var text_3 = only_child(p_2, true);
				template_effect(() => set_text(text_3, get(summary)));
				append($$anchor, p_2);
			};
			if_block(node_4, ($$render) => {
				if (get(sumState) === "loading") $$render(consequent_1);
				else if (get(summary)) $$render(consequent_2, 1);
			});
			var div_7 = sibling(node_4, 2);
			var node_5 = child(div_7);
			var consequent_3 = ($$anchor) => {
				var div_8 = root_3$16();
				var text_4 = only_child(sibling(child(div_8)));
				reset(div_8);
				template_effect(($0) => set_text(text_4, `${$0 ?? ""} pts`), [() => nf(get(mval))]);
				append($$anchor, div_8);
			};
			if_block(node_5, ($$render) => {
				if (get(mval) != null) $$render(consequent_3);
			});
			var node_6 = sibling(node_5, 2);
			var consequent_5 = ($$anchor) => {
				var div_10 = root_4$15();
				var div_11 = sibling(child(div_10));
				var text_5 = child(div_11, true);
				var node_7 = sibling(text_5);
				var consequent_4 = ($$anchor) => {
					append($$anchor, text("· brillante"));
				};
				if_block(node_7, ($$render) => {
					if ($$props.item.is_shiny) $$render(consequent_4);
				});
				reset(div_11);
				reset(div_10);
				template_effect(() => set_text(text_5, $$props.item.count));
				append($$anchor, div_10);
			};
			if_block(node_6, ($$render) => {
				if (!readonly()) $$render(consequent_5);
			});
			var node_8 = sibling(node_6, 2);
			var consequent_6 = ($$anchor) => {
				var div_12 = root_5$15();
				var text_7 = only_child(sibling(child(div_12)), true);
				reset(div_12);
				template_effect(($0) => set_text(text_7, $0), [() => nf(get(c).pageviews)]);
				append($$anchor, div_12);
			};
			if_block(node_8, ($$render) => {
				if (get(c).pageviews != null) $$render(consequent_6);
			});
			var node_9 = sibling(node_8, 2);
			var consequent_7 = ($$anchor) => {
				var fragment = root_6$14();
				var div_14 = first_child(fragment);
				var text_8 = only_child(sibling(child(div_14)), true);
				reset(div_14);
				var div_16 = sibling(div_14, 2);
				var text_9 = only_child(sibling(child(div_16)), true);
				reset(div_16);
				template_effect(($0, $1) => {
					set_text(text_8, $0);
					set_text(text_9, $1);
				}, [() => nf(get(c).atk), () => nf(get(c).def)]);
				append($$anchor, fragment);
			};
			if_block(node_9, ($$render) => {
				if (!settings.hideStats) $$render(consequent_7);
			});
			reset(div_7);
			var node_10 = sibling(div_7, 2);
			var consequent_8 = ($$anchor) => {
				var div_18 = root_7$13();
				var text_10 = only_child(div_18);
				template_effect(() => set_text(text_10, `Obtenue le ${get(obtained) ?? ""}`));
				append($$anchor, div_18);
			};
			if_block(node_10, ($$render) => {
				if (get(obtained)) $$render(consequent_8);
			});
			var node_11 = sibling(node_10, 2);
			var consequent_9 = ($$anchor) => {
				var a = root_8$11();
				template_effect(() => set_attribute(a, "href", get(c).wikipedia_url));
				append($$anchor, a);
			};
			if_block(node_11, ($$render) => {
				if (get(c).wikipedia_url) $$render(consequent_9);
			});
			var node_12 = sibling(node_11, 2);
			var consequent_13 = ($$anchor) => {
				var fragment_1 = comment();
				var node_13 = first_child(fragment_1);
				var consequent_10 = ($$anchor) => {
					var div_19 = root_9$9();
					var div_20 = sibling(child(div_19), 2);
					var button_3 = child(div_20);
					var button_4 = sibling(button_3, 2);
					reset(div_20);
					reset(div_19);
					template_effect(() => {
						button_3.disabled = get(busy);
						button_4.disabled = get(busy);
					});
					delegated("click", button_3, () => set(confirmDiscard, false));
					delegated("click", button_4, discard);
					append($$anchor, div_19);
				};
				var consequent_12 = ($$anchor) => {
					var div_21 = root_12$7();
					var div_22 = sibling(child(div_21), 2);
					var div_23 = child(div_22);
					var node_14 = sibling(child(div_23), 2);
					var consequent_11 = ($$anchor) => {
						var button_5 = root_10$8();
						var text_11 = only_child(button_5);
						template_effect(($0) => set_text(text_11, `Estimé ${$0 ?? ""}`), [() => nf(get(mval))]);
						delegated("click", button_5, () => set(price, String(get(mval)), true));
						append($$anchor, button_5);
					};
					if_block(node_14, ($$render) => {
						if (get(mval) != null) $$render(consequent_11);
					});
					reset(div_23);
					var div_24 = sibling(div_23, 2);
					var input = child(div_24);
					remove_input_defaults(input);
					next(2);
					reset(div_24);
					reset(div_22);
					var div_25 = sibling(div_22, 2);
					var div_26 = sibling(child(div_25), 2);
					each(div_26, 21, () => DURATIONS, index, ($$anchor, h) => {
						var button_6 = root_11$7();
						let classes_2;
						var text_12 = only_child(button_6);
						template_effect(() => {
							classes_2 = set_class(button_6, 1, "sell2-dur", null, classes_2, { on: get(durationH) === get(h) });
							set_text(text_12, `${get(h) ?? ""} h`);
						});
						delegated("click", button_6, () => set(durationH, get(h), true));
						append($$anchor, button_6);
					});
					reset(div_26);
					reset(div_25);
					var div_27 = sibling(div_25, 2);
					var button_7 = child(div_27);
					var button_8 = sibling(button_7, 2);
					var text_13 = only_child(button_8, true);
					reset(div_27);
					reset(div_21);
					template_effect(($0) => {
						button_7.disabled = get(busy);
						button_8.disabled = $0;
						set_text(text_13, get(busy) ? "Mise en vente..." : "Mettre en vente");
					}, [() => get(busy) || !(Number(get(price)) >= 1)]);
					bind_value(input, () => get(price), ($$value) => set(price, $$value));
					delegated("click", button_7, () => set(sellOpen, false));
					delegated("click", button_8, sell);
					append($$anchor, div_21);
				};
				var alternate = ($$anchor) => {
					var div_28 = root_13$6();
					var button_9 = child(div_28);
					var button_10 = sibling(button_9, 2);
					reset(div_28);
					delegated("click", button_9, openSell);
					delegated("click", button_10, () => set(confirmDiscard, true));
					append($$anchor, div_28);
				};
				if_block(node_13, ($$render) => {
					if (get(confirmDiscard)) $$render(consequent_10);
					else if (get(sellOpen)) $$render(consequent_12, 1);
					else $$render(alternate, -1);
				});
				append($$anchor, fragment_1);
			};
			if_block(node_12, ($$render) => {
				if (!readonly() && !get(done)) $$render(consequent_13);
			});
			next(2);
			reset(div_6);
			append($$anchor, div_6);
		};
		var alternate_2 = ($$anchor) => {
			var div_29 = root_23$1();
			var node_15 = child(div_29);
			var consequent_15 = ($$anchor) => {
				append($$anchor, root_15$4());
			};
			var consequent_16 = ($$anchor) => {
				append($$anchor, root_16$4());
			};
			var consequent_21 = ($$anchor) => {
				var fragment_2 = root_22$1();
				var node_16 = first_child(fragment_2);
				var consequent_17 = ($$anchor) => {
					var div_30 = root_17$4();
					var div_31 = sibling(child(div_30), 2);
					var text_14 = child(div_31);
					next();
					reset(div_31);
					reset(div_30);
					template_effect(($0) => set_text(text_14, `${$0 ?? ""} `), [() => nf(get(market).soldAvg)]);
					append($$anchor, div_30);
				};
				var alternate_1 = ($$anchor) => {
					append($$anchor, root_18$3());
				};
				if_block(node_16, ($$render) => {
					if (get(market).soldAvg != null) $$render(consequent_17);
					else $$render(alternate_1, -1);
				});
				var node_17 = sibling(node_16, 2);
				var consequent_18 = ($$anchor) => {
					var div_32 = root_19$2();
					var div_33 = sibling(child(div_32), 2);
					var div_34 = child(div_33);
					var span_2 = child(div_34);
					var text_15 = only_child(span_2, true);
					var text_16 = only_child(sibling(span_2), true);
					reset(div_34);
					var svg = sibling(div_34, 2);
					var path = child(svg);
					var path_1 = sibling(path);
					reset(svg);
					reset(div_33);
					var div_35 = sibling(div_33, 2);
					var span_4 = child(div_35);
					var text_17 = only_child(span_4, true);
					var text_18 = only_child(sibling(span_4), true);
					reset(div_35);
					reset(div_32);
					template_effect(($0, $1) => {
						set_text(text_15, $0);
						set_text(text_16, $1);
						set_attribute(path, "d", get(chart).area);
						set_attribute(path_1, "d", get(chart).d);
						set_text(text_17, get(chart).first);
						set_text(text_18, get(chart).last);
					}, [() => nf(get(chart).max), () => nf(get(chart).min)]);
					append($$anchor, div_32);
				};
				if_block(node_17, ($$render) => {
					if (get(chart)) $$render(consequent_18);
				});
				var node_18 = sibling(node_17, 2);
				var consequent_19 = ($$anchor) => {
					var div_36 = root_20$2();
					var div_37 = child(div_36);
					var text_19 = only_child(sibling(child(div_37)), true);
					reset(div_37);
					var div_39 = sibling(div_37, 2);
					var text_20 = only_child(sibling(child(div_39)), true);
					reset(div_39);
					var div_41 = sibling(div_39, 2);
					var text_21 = only_child(sibling(child(div_41)), true);
					reset(div_41);
					var div_43 = sibling(div_41, 2);
					var text_22 = only_child(sibling(child(div_43)), true);
					reset(div_43);
					reset(div_36);
					template_effect(($0, $1, $2) => {
						set_text(text_19, $0);
						set_text(text_20, $1);
						set_text(text_21, $2);
						set_text(text_22, get(market).soldCount);
					}, [
						() => nf(get(market).soldAvg),
						() => nf(get(market).soldMin),
						() => nf(get(market).soldMax)
					]);
					append($$anchor, div_36);
				};
				if_block(node_18, ($$render) => {
					if (get(market).soldCount) $$render(consequent_19);
				});
				var node_19 = sibling(node_18, 2);
				var consequent_20 = ($$anchor) => {
					append($$anchor, root_21$2());
				};
				if_block(node_19, ($$render) => {
					if (!get(market).isPro) $$render(consequent_20);
				});
				append($$anchor, fragment_2);
			};
			if_block(node_15, ($$render) => {
				if (get(marketState) === "loading") $$render(consequent_15);
				else if (get(marketState) === "error") $$render(consequent_16, 1);
				else if (get(market)) $$render(consequent_21, 2);
			});
			reset(div_29);
			append($$anchor, div_29);
		};
		if_block(node_3, ($$render) => {
			if (get(tab) === "details") $$render(consequent_14);
			else $$render(alternate_2, -1);
		});
		var node_20 = sibling(node_3, 2);
		var consequent_22 = ($$anchor) => {
			var div_46 = root_24$1();
			let classes_3;
			var text_23 = only_child(div_46, true);
			template_effect(() => {
				classes_3 = set_class(div_46, 1, "modal-msg", null, classes_3, { ok: get(msgOk) });
				set_text(text_23, get(msg));
			});
			append($$anchor, div_46);
		};
		if_block(node_20, ($$render) => {
			if (get(msg)) $$render(consequent_22);
		});
		reset(div_3);
		reset(div_1);
		bind_this(div_1, ($$value) => modalEl = $$value, () => modalEl);
		action(div_1, ($$node) => anchorCentered?.($$node));
		reset(div);
		template_effect(() => {
			set_attribute(span_1, "data-r", get(c).rarity);
			set_text(text$5, RNAME[get(c).rarity] || get(c).rarity);
			set_text(text_1, get(c).title);
			set_attribute(button_1, "aria-selected", get(tab) === "details");
			classes = set_class(button_1, 1, "", null, classes, { on: get(tab) === "details" });
			set_attribute(button_2, "aria-selected", get(tab) === "market");
			classes_1 = set_class(button_2, 1, "", null, classes_1, { on: get(tab) === "market" });
		});
		delegated("click", div, () => $$props.onclose?.());
		delegated("click", div_1, (e) => e.stopPropagation());
		delegated("click", button, () => $$props.onclose?.());
		delegated("click", button_1, () => set(tab, "details"));
		delegated("click", button_2, () => set(tab, "market"));
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var root$23 = from_html(`<span class="haul-chip"><b> </b> </span>`);
	var root_1$23 = from_html(`<div class="haul"></div>`);
	var root_2$18 = from_html(`<div class="rg-card"><div class="rg-aura"></div> <button class="card-btn"><!></button></div>`);
	var root_3$15 = from_html(`<div class="reveal reveal-all"><div class="reveal-all-head"><h2> </h2> <div class="sub"> </div> <!></div> <div class="reveal-grid"></div> <button class="btn primary">Terminé</button></div>`);
	var root_4$14 = from_html(`<div class="stage-aura"></div> <div class="flip-in"><button class="card-btn"><!></button></div>`, 1);
	var root_5$14 = from_html(`<div class="reveal-rarity"> </div>`);
	var root_6$13 = from_html(`<span></span>`);
	var root_7$12 = from_html(`<div class="reveal"><div class="count">Carte <b> </b> </div> <div class="stage" role="group" aria-label="Carte, glissez ou utilisez les flèches" style="touch-action:pan-y"><!></div> <!> <div class="dots"></div> <div class="navrow"><button class="arrow" aria-label="Précédent"><!></button> <button class="btn primary"> </button> <button class="arrow" aria-label="Suivant"><!></button></div> <button class="reveal-skip">Tout révéler</button></div>`);
	var root_8$10 = from_html(`<!> <!>`, 1);
	function Reveal($$anchor, $$props) {
		push($$props, true);
		let packs = prop($$props, "packs", 3, 1);
		let i = state(0);
		let showAll = state(packs() > 1);
		const RANK = {
			L: 5,
			UR: 4,
			SR: 3,
			R: 2,
			PC: 1,
			C: 0
		};
		const gridCards = user_derived(() => packs() > 1 ? [...$$props.cards].sort((a, b) => RANK[b.rarity] - RANK[a.rarity]) : $$props.cards);
		const tally = user_derived(() => Object.keys(RANK).reverse().map((r) => [r, $$props.cards.filter((c) => c.rarity === r).length]).filter(([, n]) => n));
		let selected = state(null);
		user_effect(() => reveal(get(showAll) ? rarest($$props.cards) : $$props.cards[get(i)].rarity));
		let last = user_derived(() => get(i) === $$props.cards.length - 1);
		let newCount = user_derived(() => $$props.cards.filter((c) => c.is_new).length);
		function openCard(c) {
			set(selected, {
				id: null,
				card: c,
				count: 0,
				is_shiny: c.is_shiny,
				starred: false,
				obtained_at: null,
				tags: []
			}, true);
		}
		function onKey(e) {
			if (get(selected)) return;
			if (get(showAll)) {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					$$props.ondone?.();
				}
				return;
			}
			if (e.key === "ArrowLeft" && get(i) > 0) set(i, get(i) - 1);
			else if (e.key === "ArrowRight" && !get(last)) set(i, get(i) + 1);
			else if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				if (get(last)) $$props.ondone?.();
				else set(i, get(i) + 1);
			}
		}
		let sx = null;
		function onDown(e) {
			sx = e.clientX;
		}
		function onUp(e) {
			if (sx === null) return;
			const dx = e.clientX - sx;
			sx = null;
			if (Math.abs(dx) < 40) return;
			if (dx < 0) {
				if (get(last)) $$props.ondone?.();
				else set(i, get(i) + 1);
			} else if (get(i) > 0) set(i, get(i) - 1);
		}
		var fragment = root_8$10();
		event("keydown", $window, onKey);
		var node = first_child(fragment);
		var consequent_1 = ($$anchor) => {
			var div = root_3$15();
			var div_1 = child(div);
			var h2 = child(div_1);
			var text = only_child(h2, true);
			var div_2 = sibling(h2, 2);
			var text_1 = only_child(div_2);
			var node_1 = sibling(div_2, 2);
			var consequent = ($$anchor) => {
				var div_3 = root_1$23();
				each(div_3, 21, () => get(tally), index, ($$anchor, $$item) => {
					var $$array = user_derived(() => to_array(get($$item), 2));
					let r = () => get($$array)[0];
					let n = () => get($$array)[1];
					var span = root$23();
					var b_1 = child(span);
					var text_2 = only_child(b_1, true);
					var text_3 = sibling(b_1);
					reset(span);
					template_effect(($0) => {
						set_style(span, `--rc:var(--r-${$0 ?? ""})`);
						set_text(text_2, n());
						set_text(text_3, ` ${RNAME[r()] ?? ""}`);
					}, [() => r().toLowerCase()]);
					append($$anchor, span);
				});
				reset(div_3);
				append($$anchor, div_3);
			};
			if_block(node_1, ($$render) => {
				if (packs() > 1) $$render(consequent);
			});
			reset(div_1);
			var div_4 = sibling(div_1, 2);
			each(div_4, 21, () => get(gridCards), index, ($$anchor, c, k) => {
				var div_5 = root_2$18();
				var div_6 = child(div_5);
				var button = sibling(div_6, 2);
				Card(child(button), {
					get card() {
						return get(c);
					},
					get isNew() {
						return get(c).is_new;
					},
					get shiny() {
						return get(c).is_shiny;
					}
				});
				reset(button);
				reset(div_5);
				template_effect(($0) => {
					set_style(div_5, `animation-delay:${$0 ?? ""}ms`);
					set_attribute(div_6, "data-r", get(c).rarity);
					set_attribute(button, "aria-label", get(c).title);
				}, [() => Math.min(k, 20) * 50]);
				delegated("click", button, () => openCard(get(c)));
				append($$anchor, div_5);
			});
			reset(div_4);
			var button_1 = sibling(div_4, 2);
			reset(div);
			template_effect(() => {
				set_text(text, packs() > 1 ? `Vos ${packs()} paquets` : "Votre paquet");
				set_text(text_1, `${$$props.cards.length ?? ""} cartes${get(newCount) ? `, ${get(newCount)} nouvelle${get(newCount) > 1 ? "s" : ""}` : ""}`);
			});
			delegated("click", button_1, () => $$props.ondone?.());
			append($$anchor, div);
		};
		var alternate = ($$anchor) => {
			var div_7 = root_7$12();
			var div_8 = child(div_7);
			var b_2 = sibling(child(div_8));
			var text_4 = only_child(b_2, true);
			var text_5 = sibling(b_2);
			reset(div_8);
			var div_9 = sibling(div_8, 2);
			key(child(div_9), () => get(i), ($$anchor) => {
				var fragment_1 = root_4$14();
				var div_10 = first_child(fragment_1);
				var div_11 = sibling(div_10, 2);
				var button_2 = child(div_11);
				Card(child(button_2), {
					get card() {
						return $$props.cards[get(i)];
					},
					big: true,
					get isNew() {
						return $$props.cards[get(i)].is_new;
					},
					get shiny() {
						return $$props.cards[get(i)].is_shiny;
					}
				});
				reset(button_2);
				reset(div_11);
				template_effect(() => {
					set_attribute(div_10, "data-r", $$props.cards[get(i)].rarity);
					set_attribute(button_2, "aria-label", `Détails de ${$$props.cards[get(i)].title ?? ""}`);
				});
				delegated("click", button_2, () => openCard($$props.cards[get(i)]));
				append($$anchor, fragment_1);
			});
			reset(div_9);
			var node_5 = sibling(div_9, 2);
			key(node_5, () => get(i), ($$anchor) => {
				var div_12 = root_5$14();
				var text_6 = only_child(div_12, true);
				template_effect(() => {
					set_attribute(div_12, "data-r", $$props.cards[get(i)].rarity);
					set_text(text_6, RNAME[$$props.cards[get(i)].rarity] || $$props.cards[get(i)].rarity);
				});
				append($$anchor, div_12);
			});
			var div_13 = sibling(node_5, 2);
			each(div_13, 21, () => $$props.cards, index, ($$anchor, _, k) => {
				var span_1 = root_6$13();
				let classes;
				template_effect(() => classes = set_class(span_1, 1, "d", null, classes, {
					on: k === get(i),
					seen: k < get(i)
				}));
				append($$anchor, span_1);
			});
			reset(div_13);
			var div_14 = sibling(div_13, 2);
			var button_3 = child(div_14);
			Icon(child(button_3), {
				name: "prev",
				width: 2
			});
			reset(button_3);
			var button_4 = sibling(button_3, 2);
			var text_7 = only_child(button_4, true);
			var button_5 = sibling(button_4, 2);
			Icon(child(button_5), {
				name: "next",
				width: 2
			});
			reset(button_5);
			reset(div_14);
			var button_6 = sibling(div_14, 2);
			reset(div_7);
			template_effect(() => {
				set_text(text_4, get(i) + 1);
				set_text(text_5, ` / ${$$props.cards.length ?? ""}`);
				set_attribute(div_9, "data-r", $$props.cards[get(i)].rarity);
				button_3.disabled = get(i) === 0;
				set_text(text_7, get(last) ? "Terminé" : "Suivant");
				button_5.disabled = get(last);
			});
			delegated("pointerdown", div_9, onDown);
			delegated("pointerup", div_9, onUp);
			event("pointercancel", div_9, () => sx = null);
			delegated("click", button_3, () => get(i) > 0 && set(i, get(i) - 1));
			delegated("click", button_4, () => get(last) ? $$props.ondone?.() : set(i, get(i) + 1));
			delegated("click", button_5, () => !get(last) && set(i, get(i) + 1));
			delegated("click", button_6, () => set(showAll, true));
			append($$anchor, div_7);
		};
		if_block(node, ($$render) => {
			if (get(showAll)) $$render(consequent_1);
			else $$render(alternate, -1);
		});
		var node_8 = sibling(node, 2);
		var consequent_2 = ($$anchor) => {
			CardModal($$anchor, {
				get item() {
					return get(selected);
				},
				readonly: true,
				onclose: () => set(selected, null)
			});
		};
		if_block(node_8, ($$render) => {
			if (get(selected)) $$render(consequent_2);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate([
		"click",
		"pointerdown",
		"pointerup"
	]);
	var human = {
		open: false,
		subs: new Set(),
		set(open) {
			this.open = open;
			for (const f of this.subs) f(open);
		},
		subscribe(f) {
			this.subs.add(f);
			f(this.open);
			return () => this.subs.delete(f);
		}
	};
	var waiting = null;
	var needsHuman = (e) => e?.code === "human_verification_required" || e?.data?.human_verification_required === true;
	function resolveHuman(ok) {
		human.set(false);
		waiting?.resolve(ok);
		waiting = null;
	}
	function ask() {
		if (!waiting) {
			let resolve;
			waiting = {
				promise: new Promise((r) => resolve = r),
				resolve
			};
			human.set(true);
		}
		return waiting.promise;
	}
	async function withHumanCheck(run) {
		try {
			return await run();
		} catch (e) {
			if (!needsHuman(e)) throw e;
			if (!await ask()) throw new Error("Vérification annulée : l'action n'a pas été faite.");
			return run();
		}
	}
	var root$22 = from_html(`<div class="special-note">Un paquet spécial est disponible sur le site. <button class="link-btn">Ouvrir la version originale</button></div>`);
	var root_1$22 = from_html(`<span class="booster-back b2"></span>`);
	var root_2$17 = from_html(`<span class="booster-back b1"></span>`);
	var root_3$14 = from_html(`<span class="pw-time"> </span> <span class="pw-lbl">avant le prochain paquet</span>`, 1);
	var root_4$13 = from_html(`<span class="pw-lbl">Plus de paquets pour le moment</span>`);
	var root_5$13 = from_html(`<span class="pw-sub"> </span>`);
	var root_6$12 = from_html(`<div class="pack-wait"><!> <!></div>`);
	var root_7$11 = from_html(`<button class="btn big"> </button>`);
	var root_8$9 = from_html(`<div class="regen-line">Prochain paquet dans <b> </b></div>`);
	var root_9$8 = from_html(`<div class="pack-count"><span class="pc-num"> </span> <span class="pc-lbl"> </span></div> <div class="pull-actions"><button class="btn primary big"> </button> <!></div> <!>`, 1);
	var root_10$7 = from_html(`<div class="special-note">Vérification humaine requise par le jeu. <button class="link-btn">Ouvrir la version originale pour valider</button></div>`);
	var root_11$6 = from_html(`<div class="regen-line err"> </div>`);
	var root_12$6 = from_html(`<div class="session-recap"> </div>`);
	var root_13$5 = from_html(`<div class="pull-ready"><!> <h1>Ouvrir un paquet</h1> <div class="sub">Découvrez 5 nouvelles cartes Wikipédia</div> <div class="booster-stage"><button aria-label="Ouvrir le paquet"><!> <!> <span class="booster-main"><img alt="Paquet WikiMasters" draggable="false"/> <span class="booster-shine"></span></span></button></div> <!> <!> <!> <!></div>`);
	var root_14$4 = from_html(`<div class="pulls"><!></div>`);
	function Pulls($$anchor, $$props) {
		push($$props, true);
		let phase = state("ready");
		let cards = state(proxy([]));
		let busy = state(false);
		let opening = state(false);
		let error = state("");
		let needVerify = state(false);
		let special = state(false);
		const PACK_IMG = "/card_pack.png";
		data.specialAvailable().then((v) => set(special, v, true));
		let packs = user_derived(() => $$props.profile?.packs_remaining ?? null);
		let empty = user_derived(() => !$$props.profile || get(packs) == null || get(packs) === 0);
		let stackDepth = user_derived(() => Math.min(3, Math.max(1, get(packs) || 1)));
		let batch = state(0);
		async function openOne() {
			const [d] = await Promise.all([withHumanCheck(() => data.openPack()), new Promise((r) => setTimeout(r, 900))]);
			if (!d?.cards?.length) throw new Error("Aucune carte reçue. Réessayez dans un instant.");
			recordPull(d.cards);
			return d;
		}
		async function open(all = false) {
			if (get(busy) || get(empty)) return;
			set(busy, true);
			set(opening, true);
			set(error, "");
			set(needVerify, false);
			set(batch, 0);
			play("rip");
			const haul = [];
			try {
				let left = get(packs);
				do {
					const d = await openOne();
					haul.push(...d.cards);
					update(batch);
					left = d.packs_remaining;
					$$props.onchanged?.();
				} while (all && left > 0);
			} catch (e) {
				if (needsHuman(e)) set(needVerify, true);
				else set(error, e.message || "Ouverture du paquet impossible.", true);
			}
			if (haul.length) {
				forgetCollection();
				set(cards, haul, true);
				set(phase, "revealing");
			}
			set(opening, false);
			set(busy, false);
		}
		function done() {
			set(phase, "ready");
			set(opening, false);
			$$props.onchanged?.();
		}
		let secs = state(null);
		user_effect(() => {
			const n = $$props.profile?.next_regen_seconds;
			if (n == null || get(packs) != null && $$props.profile?.pack_cap != null && get(packs) >= $$props.profile.pack_cap) {
				set(secs, null);
				return;
			}
			set(secs, n, true);
			const t = setInterval(() => {
				set(secs, get(secs) - 1);
				if (get(secs) <= 0) {
					clearInterval(t);
					set(secs, null);
					$$props.onchanged?.();
				}
			}, 1e3);
			return () => clearInterval(t);
		});
		function fmt(s) {
			const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
			if (h) return `${h} h ${String(m).padStart(2, "0")}`;
			if (m) return `${m} min ${String(sec).padStart(2, "0")}`;
			return `${sec} s`;
		}
		var div = root_14$4();
		event("keydown", $window, (e) => {
			if (e.key !== " " || get(phase) !== "ready" || e.composedPath()[0]?.matches?.("input, select, textarea, button")) return;
			e.preventDefault();
			open();
		});
		var node = child(div);
		var consequent = ($$anchor) => {
			Reveal($$anchor, {
				get cards() {
					return get(cards);
				},
				get packs() {
					return get(batch);
				},
				ondone: done
			});
		};
		var alternate_2 = ($$anchor) => {
			var div_1 = root_13$5();
			var node_1 = child(div_1);
			var consequent_1 = ($$anchor) => {
				var div_2 = root$22();
				var button = sibling(child(div_2));
				reset(div_2);
				delegated("click", button, () => useOriginalSite());
				append($$anchor, div_2);
			};
			if_block(node_1, ($$render) => {
				if (get(special)) $$render(consequent_1);
			});
			var div_3 = sibling(node_1, 6);
			var button_1 = child(div_3);
			let classes;
			var node_2 = child(button_1);
			var consequent_2 = ($$anchor) => {
				var span = root_1$22();
				set_style(span, "background-image:url(/card_pack.png)");
				append($$anchor, span);
			};
			if_block(node_2, ($$render) => {
				if (!get(opening) && get(stackDepth) > 2) $$render(consequent_2);
			});
			var node_3 = sibling(node_2, 2);
			var consequent_3 = ($$anchor) => {
				var span_1 = root_2$17();
				set_style(span_1, "background-image:url(/card_pack.png)");
				append($$anchor, span_1);
			};
			if_block(node_3, ($$render) => {
				if (!get(opening) && get(stackDepth) > 1) $$render(consequent_3);
			});
			var span_2 = sibling(node_3, 2);
			set_attribute(child(span_2), "src", PACK_IMG);
			next(2);
			reset(span_2);
			reset(button_1);
			reset(div_3);
			var node_4 = sibling(div_3, 2);
			var consequent_6 = ($$anchor) => {
				var div_4 = root_6$12();
				var node_5 = child(div_4);
				var consequent_4 = ($$anchor) => {
					var fragment_1 = root_3$14();
					var text = only_child(first_child(fragment_1), true);
					next(2);
					template_effect(($0) => set_text(text, $0), [() => fmt(get(secs))]);
					append($$anchor, fragment_1);
				};
				var alternate = ($$anchor) => {
					append($$anchor, root_4$13());
				};
				if_block(node_5, ($$render) => {
					if (get(secs) != null) $$render(consequent_4);
					else $$render(alternate, -1);
				});
				var node_6 = sibling(node_5, 2);
				var consequent_5 = ($$anchor) => {
					var span_5 = root_5$13();
					var text_1 = only_child(span_5);
					template_effect(() => set_text(text_1, `0 / ${$$props.profile.pack_cap ?? ""} paquets`));
					append($$anchor, span_5);
				};
				if_block(node_6, ($$render) => {
					if ($$props.profile?.pack_cap) $$render(consequent_5);
				});
				reset(div_4);
				append($$anchor, div_4);
			};
			var alternate_1 = ($$anchor) => {
				var fragment_2 = root_9$8();
				var div_5 = first_child(fragment_2);
				var span_6 = child(div_5);
				var text_2 = only_child(span_6, true);
				var text_3 = only_child(sibling(span_6, 2));
				reset(div_5);
				var div_6 = sibling(div_5, 2);
				var button_2 = child(div_6);
				var text_4 = only_child(button_2, true);
				var node_7 = sibling(button_2, 2);
				var consequent_7 = ($$anchor) => {
					var button_3 = root_7$11();
					var text_5 = only_child(button_3);
					template_effect(() => set_text(text_5, `Tout ouvrir (${get(packs) ?? ""})`));
					delegated("click", button_3, () => open(true));
					append($$anchor, button_3);
				};
				if_block(node_7, ($$render) => {
					if (get(packs) > 1 && !get(busy)) $$render(consequent_7);
				});
				reset(div_6);
				var node_8 = sibling(div_6, 2);
				var consequent_8 = ($$anchor) => {
					var div_7 = root_8$9();
					var text_6 = only_child(sibling(child(div_7)), true);
					reset(div_7);
					template_effect(($0) => set_text(text_6, $0), [() => fmt(get(secs))]);
					append($$anchor, div_7);
				};
				if_block(node_8, ($$render) => {
					if (get(secs) != null) $$render(consequent_8);
				});
				template_effect(() => {
					set_text(text_2, get(packs) ?? "-");
					set_text(text_3, `paquet${get(packs) > 1 ? "s" : ""} disponible${get(packs) > 1 ? "s" : ""}${$$props.profile?.pack_cap ? ` sur ${$$props.profile.pack_cap}` : ""}`);
					button_2.disabled = get(busy) || get(empty);
					set_text(text_4, get(busy) ? get(batch) ? `Ouverture... ${get(batch) + 1} / ${get(packs) + get(batch)}` : "Ouverture..." : "Ouvrir le paquet");
				});
				delegated("click", button_2, () => open());
				append($$anchor, fragment_2);
			};
			if_block(node_4, ($$render) => {
				if (get(packs) === 0 && !get(busy)) $$render(consequent_6);
				else $$render(alternate_1, -1);
			});
			var node_9 = sibling(node_4, 2);
			var consequent_9 = ($$anchor) => {
				var div_8 = root_10$7();
				var button_4 = sibling(child(div_8));
				reset(div_8);
				delegated("click", button_4, () => useOriginalSite());
				append($$anchor, div_8);
			};
			if_block(node_9, ($$render) => {
				if (get(needVerify)) $$render(consequent_9);
			});
			var node_10 = sibling(node_9, 2);
			var consequent_10 = ($$anchor) => {
				var div_9 = root_11$6();
				var text_7 = only_child(div_9, true);
				template_effect(() => set_text(text_7, get(error)));
				append($$anchor, div_9);
			};
			if_block(node_10, ($$render) => {
				if (get(error)) $$render(consequent_10);
			});
			var node_11 = sibling(node_10, 2);
			var consequent_11 = ($$anchor) => {
				var div_10 = root_12$6();
				var text_8 = only_child(div_10);
				template_effect(() => set_text(text_8, `Cette session : ${session.packs ?? ""} paquet${session.packs > 1 ? "s" : ""} ouvert${session.packs > 1 ? "s" : ""}, ${session.newCards ?? ""} nouvelle${session.newCards > 1 ? "s" : ""}`));
				append($$anchor, div_10);
			};
			if_block(node_11, ($$render) => {
				if (session.packs > 0) $$render(consequent_11);
			});
			reset(div_1);
			template_effect(() => {
				classes = set_class(button_1, 1, "booster", null, classes, {
					opening: get(opening),
					"is-empty": get(empty)
				});
				button_1.disabled = get(busy) || get(empty);
			});
			delegated("click", button_1, () => open());
			append($$anchor, div_1);
		};
		if_block(node, ($$render) => {
			if (get(phase) === "revealing") $$render(consequent);
			else $$render(alternate_2, -1);
		});
		reset(div);
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	function scrollFade(node, { axis = "x" } = {}) {
		const y = axis === "y";
		node.dataset.fadeAxis = y ? "y" : "x";
		const update = () => {
			const pos = y ? node.scrollTop : node.scrollLeft;
			const max = y ? node.scrollHeight - node.clientHeight : node.scrollWidth - node.clientWidth;
			const start = pos > 1, end = pos < max - 1;
			node.dataset.fade = start && end ? "both" : start ? "start" : end ? "end" : "";
		};
		const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
		const watch = () => {
			ro?.disconnect();
			ro?.observe(node);
			for (const c of node.children) ro?.observe(c);
		};
		const mo = typeof MutationObserver === "undefined" ? null : new MutationObserver(() => {
			watch();
			update();
		});
		watch();
		mo?.observe(node, { childList: true });
		node.addEventListener("scroll", update, { passive: true });
		update();
		return {
			update,
			destroy: () => {
				ro?.disconnect();
				mo?.disconnect();
				node.removeEventListener("scroll", update);
			}
		};
	}
	function scrollRow(node, { steps = ["wrap", "compact"] } = {}) {
		const fade = scrollFade(node, { axis: "x" });
		const over = () => node.scrollWidth > node.clientWidth + 1;
		const fit = () => {
			node.classList.remove(...steps);
			for (const s of steps) {
				if (!over()) break;
				node.classList.add(s);
			}
			fade.update();
		};
		const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(fit);
		ro?.observe(node);
		if (node.parentElement) ro?.observe(node.parentElement);
		fit();
		return { destroy: () => {
			ro?.disconnect();
			fade.destroy();
		} };
	}
	var root$21 = from_html(`<span class="rl-n"> </span>`);
	var root_1$21 = from_html(`<button><span class="rl-dot"></span> <span class="rl-name rl-full"> </span><span class="rl-code" aria-hidden="true"> </span><!></button>`);
	var root_2$16 = from_html(`<span class="rl-sep" aria-hidden="true"></span><!>`, 1);
	var root_3$13 = from_html(`<div><button><span class="rl-name">Toutes</span><!></button> <!> <!></div>`);
	function RarityChips($$anchor, $$props) {
		push($$props, true);
		let value = prop($$props, "value", 3, ""), counts = prop($$props, "counts", 3, null), total = prop($$props, "total", 3, null), scroll = prop($$props, "scroll", 3, false), cls = prop($$props, "class", 3, "");
		const row = (node, on) => on ? scrollRow(node) : void 0;
		var div = root_3$13();
		var button = child(div);
		let classes;
		var node_1 = sibling(child(button));
		var consequent = ($$anchor) => {
			var span = root$21();
			var text = only_child(span, true);
			template_effect(($0) => set_text(text, $0), [() => nf(total())]);
			append($$anchor, span);
		};
		if_block(node_1, ($$render) => {
			if (total() != null) $$render(consequent);
		});
		reset(button);
		var node_2 = sibling(button, 2);
		each(node_2, 17, () => RARITIES_DESC, index, ($$anchor, r) => {
			var fragment = comment();
			var node_3 = first_child(fragment);
			var consequent_2 = ($$anchor) => {
				var button_1 = root_1$21();
				let classes_1;
				var span_1 = child(button_1);
				var span_2 = sibling(span_1, 2);
				var text_1 = only_child(span_2, true);
				var span_3 = sibling(span_2);
				var text_2 = only_child(span_3, true);
				var node_4 = sibling(span_3);
				var consequent_1 = ($$anchor) => {
					var span_4 = root$21();
					var text_3 = only_child(span_4, true);
					template_effect(($0) => set_text(text_3, $0), [() => nf(counts()[get(r)])]);
					append($$anchor, span_4);
				};
				if_block(node_4, ($$render) => {
					if (counts()) $$render(consequent_1);
				});
				reset(button_1);
				template_effect(($0) => {
					classes_1 = set_class(button_1, 1, "rl", null, classes_1, { on: value() === get(r) });
					set_attribute(button_1, "title", RNAME[get(r)]);
					set_style(span_1, `background:var(--r-${$0 ?? ""})`);
					set_text(text_1, RNAME[get(r)]);
					set_text(text_2, get(r));
				}, [() => get(r).toLowerCase()]);
				delegated("click", button_1, () => $$props.onchange(value() === get(r) ? "" : get(r)));
				append($$anchor, button_1);
			};
			if_block(node_3, ($$render) => {
				if (!counts() || counts()[get(r)]) $$render(consequent_2);
			});
			append($$anchor, fragment);
		});
		var node_5 = sibling(node_2, 2);
		var consequent_3 = ($$anchor) => {
			var fragment_1 = root_2$16();
			snippet(sibling(first_child(fragment_1)), () => $$props.children);
			append($$anchor, fragment_1);
		};
		if_block(node_5, ($$render) => {
			if ($$props.children) $$render(consequent_3);
		});
		reset(div);
		action(div, ($$node, $$action_arg) => row?.($$node, $$action_arg), scroll);
		template_effect(() => {
			set_class(div, 1, `rarity-legend ${cls() ?? ""}`);
			classes = set_class(button, 1, "rl", null, classes, { on: !value() });
		});
		delegated("click", button, () => $$props.onchange(""));
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var root$20 = from_html(`<span><span class="pick-check"><!></span></span>`);
	function PickMark($$anchor, $$props) {
		let on = prop($$props, "on", 3, false);
		var span = root$20();
		let classes;
		var span_1 = child(span);
		var node = child(span_1);
		var consequent = ($$anchor) => {
			Icon($$anchor, {
				name: "check",
				width: 2.6
			});
		};
		if_block(node, ($$render) => {
			if (on()) $$render(consequent);
		});
		reset(span_1);
		reset(span);
		template_effect(() => classes = set_class(span, 1, "pick-overlay", null, classes, { on: on() }));
		append($$anchor, span);
	}
	var root$19 = from_html(`<span class="spin search-ico" role="status" aria-label="Recherche en cours"></span>`);
	var root_1$20 = from_html(`<button class="search-clear" aria-label="Effacer la recherche"><!></button>`);
	var root_2$15 = from_html(`<div class="search-wrap"><!> <input class="search" type="search"/> <!></div>`);
	function SearchBox($$anchor, $$props) {
		push($$props, true);
		let value = prop($$props, "value", 15, ""), loading = prop($$props, "loading", 3, false);
		var div = root_2$15();
		var node = child(div);
		var consequent = ($$anchor) => {
			append($$anchor, root$19());
		};
		var alternate = ($$anchor) => {
			Icon($$anchor, {
				name: "search",
				class: "search-ico"
			});
		};
		if_block(node, ($$render) => {
			if (loading()) $$render(consequent);
			else $$render(alternate, -1);
		});
		var input = sibling(node, 2);
		remove_input_defaults(input);
		var node_1 = sibling(input, 2);
		var consequent_1 = ($$anchor) => {
			var button = root_1$20();
			Icon(child(button), {
				name: "close",
				width: 2,
				class: "x-ico"
			});
			reset(button);
			delegated("click", button, () => value(""));
			append($$anchor, button);
		};
		if_block(node_1, ($$render) => {
			if (value()) $$render(consequent_1);
		});
		reset(div);
		template_effect(() => set_attribute(input, "placeholder", $$props.placeholder));
		bind_value(input, value);
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var SvelteMap = class extends Map {
		#sources = new Map();
		#version = state(0);
		#size = state(0);
		#update_version = update_version || -1;
		constructor(value) {
			super();
			if (value) {
				for (var [key, v] of value) super.set(key, v);
				this.#size.v = super.size;
			}
		}
		#source(value) {
			return update_version === this.#update_version ? state(value) : source(value);
		}
		has(key) {
			var sources = this.#sources;
			var s = sources.get(key);
			if (s === void 0) {
				if (super.has(key)) {
					s = this.#source(0);
					sources.set(key, s);
				} else {
					get(this.#version);
					return false;
				}
			}
			get(s);
			return true;
		}
		forEach(callbackfn, this_arg) {
			this.#read_all();
			super.forEach(callbackfn, this_arg);
		}
		get(key) {
			var sources = this.#sources;
			var s = sources.get(key);
			if (s === void 0) {
				if (super.has(key)) {
					s = this.#source(0);
					sources.set(key, s);
				} else {
					get(this.#version);
					return;
				}
			}
			get(s);
			return super.get(key);
		}
		getOrInsert(key, value) {
			if (!super.has(key)) this.set(key, value);
			return this.get(key);
		}
		getOrInsertComputed(key, callbackFn) {
			if (!super.has(key)) this.set(key, callbackFn(key));
			return this.get(key);
		}
		set(key, value) {
			var sources = this.#sources;
			var s = sources.get(key);
			var prev_res = super.get(key);
			var res = super.set(key, value);
			var version = this.#version;
			if (s === void 0) {
				s = this.#source(0);
				sources.set(key, s);
				set(this.#size, super.size);
				increment(version);
			} else if (prev_res !== value) {
				increment(s);
				var v_reactions = version.reactions === null ? null : new Set(version.reactions);
				if (v_reactions === null || !s.reactions?.every((r) => v_reactions.has(r))) increment(version);
			}
			return res;
		}
		delete(key) {
			var sources = this.#sources;
			var s = sources.get(key);
			var res = super.delete(key);
			if (s !== void 0) {
				sources.delete(key);
				set(s, -1);
			}
			if (res) {
				set(this.#size, super.size);
				increment(this.#version);
			}
			return res;
		}
		clear() {
			if (super.size === 0) return;
			super.clear();
			var sources = this.#sources;
			set(this.#size, 0);
			for (var s of sources.values()) set(s, -1);
			increment(this.#version);
			sources.clear();
		}
		#read_all() {
			get(this.#version);
			var sources = this.#sources;
			if (this.#size.v !== sources.size) {
				for (var key of super.keys()) if (!sources.has(key)) {
					var s = this.#source(0);
					sources.set(key, s);
				}
			}
			for ([, s] of this.#sources) get(s);
		}
		keys() {
			get(this.#version);
			return super.keys();
		}
		values() {
			this.#read_all();
			return super.values();
		}
		entries() {
			this.#read_all();
			return super.entries();
		}
		[Symbol.iterator]() {
			return this.entries();
		}
		get size() {
			get(this.#size);
			return super.size;
		}
	};
	function createQueue({ concurrency = 4 } = {}) {
		const seen = new Set();
		const pending = [];
		let active = 0;
		function pump() {
			while (active < concurrency && pending.length) {
				const { task } = pending.shift();
				active++;
				Promise.resolve().then(task).catch(() => {}).finally(() => {
					active--;
					pump();
				});
			}
		}
		return {
			push(key, task) {
				if (seen.has(key)) return;
				seen.add(key);
				pending.push({
					key,
					task
				});
				pump();
			},
			prioritize(key) {
				const i = pending.findIndex((p) => p.key === key);
				if (i > 0) pending.unshift(pending.splice(i, 1)[0]);
			},
			has: (key) => seen.has(key),
			get pendingCount() {
				return pending.length;
			},
			get activeCount() {
				return active;
			}
		};
	}
	function lazyValues(onvalue, { concurrency = 5 } = {}) {
		const queue = createQueue({ concurrency });
		function load(card, front = false) {
			queue.push(card.id, () => marketValueFor(card).then((v) => onvalue(card.id, v)));
			if (front) queue.prioritize(card.id);
		}
		const io = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
			for (const e of entries) {
				if (!e.isIntersecting) continue;
				io.unobserve(e.target);
				load(e.target.__card, true);
			}
		}, { rootMargin: "300px" });
		function watch(node, card) {
			node.__card = card;
			io?.observe(node);
			return {
				update: (c) => node.__card = c,
				destroy: () => io?.unobserve(node)
			};
		}
		return {
			load,
			watch,
			destroy: () => io?.disconnect()
		};
	}
	function valueMap() {
		const values = new SvelteMap();
		const lazy = lazyValues((id, v) => values.set(id, v));
		return {
			values,
			load: (items) => {
				for (const it of items) lazy.load(it.card);
			},
			watch: lazy.watch
		};
	}
	var root$18 = from_html(`<div class="empty"><b> </b><div>Vérifiez que vous êtes connecté, puis réessayez.</div><button class="btn">Réessayer</button></div>`);
	var root_1$19 = from_html(`<div class="wc skeleton"></div>`);
	var root_2$14 = from_html(`<div class="grid"></div>`);
	var root_3$12 = from_html(`<span class="sync"><span class="spin"></span> </span>`);
	var root_4$12 = from_html(`<option>Attaque</option> <option>Défense</option>`, 1);
	var root_5$12 = from_html(`<button class="iconbtn"> </button>`);
	var root_6$11 = from_html(`<div class="sort-hint"><!></div>`);
	var root_7$10 = from_html(`<div class="sort-hint"> </div>`);
	var root_8$8 = from_html(`<button title="Cartes favorites"><!><span class="rl-name">Favoris</span><span class="rl-n"> </span></button>`);
	var root_9$7 = from_html(`<button title="Cartes brillantes"><!><span class="rl-name">Brillantes</span><span class="rl-n"> </span></button>`);
	var root_10$6 = from_html(`<!> <!>`, 1);
	var root_11$5 = from_html(`<button></button>`);
	var root_12$5 = from_html(`<div class="rarity-panel"><div class="rarity-meter" role="img" aria-label="Répartition par rareté"></div> <!></div>`);
	var root_13$4 = from_html(`<b>Aucune carte ne correspond</b><div>Essayez un autre filtre ou une autre recherche.</div>`, 1);
	var root_14$3 = from_html(`<b>Rien ici pour l'instant</b><div>Ouvrez un paquet pour commencer votre collection.</div>`, 1);
	var root_15$3 = from_html(`<div class="empty"><!></div>`);
	var root_16$3 = from_html(`<button><!> <!></button>`);
	var root_17$3 = from_html(`<div class="coll-head"><div><h1>Ma collection</h1> <div class="meta"> <!><!></div></div> <div class="coll-tools"><!> <div class="tool-actions"><div class="isel" title="Trier les cartes"><!> <select aria-label="Trier"><option>Rareté</option><option>Valeur estimée</option><!><option>Nom</option></select></div> <button title="Afficher ou masquer l'ATK et la DEF"><!><span>ATK/DEF</span></button> <!> <button><!><span> </span></button></div></div></div> <!> <!> <!> <!>`, 1);
	var root_18$2 = from_html(`<span class="bulk-text"> <b> </b> ?</span> <button class="btn">Annuler</button> <button class="btn danger"> </button>`, 1);
	var root_19$1 = from_html(`<span class="bulk-text"> </span> <button class="btn danger"> </button>`, 1);
	var root_20$1 = from_html(`<div class="bulk-bar"><!></div>`);
	var root_21$1 = from_html(`<!> <!> <!>`, 1);
	function Collection($$anchor, $$props) {
		push($$props, true);
		let items = state(null);
		let stats = state(null);
		let error = state("");
		const prefs = settings.collection;
		let filter = state(proxy(prefs.filter));
		let search = state("");
		let sort = state(proxy(prefs.sort));
		let favOnly = state(proxy(prefs.favOnly));
		let shinyOnly = state(proxy(prefs.shinyOnly));
		user_effect(() => Object.assign(prefs, {
			filter: get(filter),
			sort: get(sort),
			favOnly: get(favOnly),
			shinyOnly: get(shinyOnly)
		}));
		let selected = state(null);
		let values = proxy({});
		let lanePaused = state(false);
		user_effect(() => backgroundLane.subscribe((st) => set(lanePaused, st === "paused")));
		let loaded = state(0);
		let tick = state(0);
		const sortVals = new Map();
		let tickTimer = null;
		const lazy = lazyValues((id, v) => {
			values[id] = v;
			sortVals.set(id, v ?? -1);
			update(loaded);
			tickTimer ??= setTimeout(() => {
				tickTimer = null;
				update(tick);
			}, 200);
		});
		user_effect(() => () => {
			lazy.destroy();
			clearTimeout(tickTimer);
		});
		user_effect(() => {
			if (get(sort) === "value" && get(items)) for (const it of get(items)) lazy.load(it.card);
		});
		function onToggleStats() {
			toggleHideStats();
			if (settings.hideStats && (get(sort) === "atk" || get(sort) === "def")) set(sort, "rarity");
		}
		async function load() {
			set(error, "");
			const show = (d, loading) => {
				set(items, d.items, true);
				set(stats, {
					...d.stats,
					loading
				}, true);
			};
			try {
				show(await loadCollection({
					onCached: (d) => show(d, true),
					onPartial: (d) => show(d, true)
				}), false);
			} catch {
				if (!get(items)) set(error, "Impossible de charger la collection.");
				else set(stats, {
					...get(stats),
					loading: false
				}, true);
			}
		}
		load();
		const reload = () => {
			forgetCollection();
			set(items, null);
			load();
		};
		let selecting = state(false);
		let picked = state(proxy(new Set()));
		let bulkConfirm = state(false);
		let bulkBusy = state(false);
		let bulkMsg = state("");
		function onCardClick(it) {
			if (!get(selecting)) {
				set(selected, it, true);
				return;
			}
			const n = new Set(get(picked));
			pickSound(n.has(it.id));
			n.has(it.id) ? n.delete(it.id) : n.add(it.id);
			set(picked, n, true);
		}
		function toggleSelecting() {
			set(selecting, !get(selecting));
			set(picked, new Set(), true);
			set(bulkConfirm, false);
		}
		async function bulkDiscard() {
			set(bulkBusy, true);
			try {
				const r = await data.bulkDiscard([...get(picked)]);
				const failed = r.failed?.length || 0;
				set(bulkMsg, `${r.discarded_count} carte${r.discarded_count > 1 ? "s" : ""} défaussée${r.discarded_count > 1 ? "s" : ""}` + (failed ? `, ${failed} en échec` : ""));
			} catch (e) {
				set(bulkMsg, e.message || "La défausse a échoué.", true);
			}
			set(bulkBusy, false);
			toggleSelecting();
			reload();
			$$props.onwallet?.();
		}
		const RANK = Object.fromEntries(RARITIES_DESC.map((r, i) => [r, -i]));
		const SORTS = {
			rarity: (a, b) => RANK[b.card.rarity] - RANK[a.card.rarity] || b.count - a.count,
			value: (a, b) => (sortVals.get(b.card.id) ?? -1) - (sortVals.get(a.card.id) ?? -1) || RANK[b.card.rarity] - RANK[a.card.rarity],
			atk: (a, b) => b.card.atk - a.card.atk,
			def: (a, b) => b.card.def - a.card.def,
			name: (a, b) => a.card.title.localeCompare(b.card.title, "fr")
		};
		let shown = user_derived(() => {
			if (!get(items)) return [];
			get(tick);
			const q = normSearch(get(search));
			return get(items).filter((it) => (get(filter) === "ALL" || it.card.rarity === get(filter)) && (!get(favOnly) || it.starred) && (!get(shinyOnly) || it.is_shiny) && (!q || it._s.includes(q))).sort(SORTS[get(sort)]);
		});
		let starredCount = user_derived(() => get(items)?.filter((it) => it.starred).length ?? 0);
		let shinyCount = user_derived(() => get(items)?.filter((it) => it.is_shiny).length ?? 0);
		let allPicked = user_derived(() => get(shown).length > 0 && get(shown).every((it) => get(picked).has(it.id)));
		const plural = (n, word) => `${n} ${word}${n > 1 ? "s" : ""}`;
		var fragment = root_21$1();
		var node = first_child(fragment);
		var consequent = ($$anchor) => {
			var div = root$18();
			var b_1 = child(div);
			var text = only_child(b_1, true);
			var button = sibling(b_1, 2);
			reset(div);
			template_effect(() => set_text(text, get(error)));
			delegated("click", button, reload);
			append($$anchor, div);
		};
		var consequent_1 = ($$anchor) => {
			var div_1 = root_2$14();
			each(div_1, 20, () => Array(10), index, ($$anchor, _) => {
				append($$anchor, root_1$19());
			});
			reset(div_1);
			append($$anchor, div_1);
		};
		var alternate_3 = ($$anchor) => {
			var fragment_1 = root_17$3();
			var div_3 = first_child(fragment_1);
			var div_4 = child(div_3);
			var div_5 = sibling(child(div_4), 2);
			var text_1 = child(div_5, true);
			var node_1 = sibling(text_1);
			var consequent_2 = ($$anchor) => {
				var text_2 = text();
				template_effect(() => set_text(text_2, `· ${get(stats).copies ?? ""} exemplaires`));
				append($$anchor, text_2);
			};
			if_block(node_1, ($$render) => {
				if (get(stats).copies !== get(stats).unique) $$render(consequent_2);
			});
			var node_2 = sibling(node_1);
			var consequent_3 = ($$anchor) => {
				var span = root_3$12();
				var text_3 = sibling(child(span));
				reset(span);
				template_effect(() => set_text(text_3, `Mise à jour ${get(items).length ?? ""} / ${get(stats).copies ?? ""}`));
				append($$anchor, span);
			};
			if_block(node_2, ($$render) => {
				if (get(stats).loading) $$render(consequent_3);
			});
			reset(div_5);
			reset(div_4);
			var div_6 = sibling(div_4, 2);
			var node_3 = child(div_6);
			SearchBox(node_3, {
				placeholder: "Rechercher une carte...",
				get value() {
					return get(search);
				},
				set value($$value) {
					set(search, $$value, true);
				}
			});
			var div_7 = sibling(node_3, 2);
			var div_8 = child(div_7);
			var node_4 = child(div_8);
			Icon(node_4, { name: "sort" });
			var select = sibling(node_4, 2);
			var option = child(select);
			option.value = option.__value = "rarity";
			var option_1 = sibling(option);
			option_1.value = option_1.__value = "value";
			var node_5 = sibling(option_1);
			var consequent_4 = ($$anchor) => {
				var fragment_3 = root_4$12();
				var option_2 = first_child(fragment_3);
				option_2.value = option_2.__value = "atk";
				var option_3 = sibling(option_2, 2);
				option_3.value = option_3.__value = "def";
				append($$anchor, fragment_3);
			};
			if_block(node_5, ($$render) => {
				if (!settings.hideStats) $$render(consequent_4);
			});
			var option_4 = sibling(node_5);
			option_4.value = option_4.__value = "name";
			reset(select);
			init_select(select);
			reset(div_8);
			var button_1 = sibling(div_8, 2);
			let classes;
			var node_6 = child(button_1);
			{
				let $0 = user_derived(() => settings.hideStats ? "eyeOff" : "eye");
				Icon(node_6, { get name() {
					return get($0);
				} });
			}
			next();
			reset(button_1);
			var node_7 = sibling(button_1, 2);
			var consequent_5 = ($$anchor) => {
				var button_2 = root_5$12();
				var text_4 = only_child(button_2, true);
				template_effect(() => set_text(text_4, get(allPicked) ? "Tout désélectionner" : "Tout sélectionner"));
				delegated("click", button_2, () => {
					pickSound(get(allPicked));
					set(picked, get(allPicked) ? new Set() : new Set(get(shown).map((it) => it.id)), true);
				});
				append($$anchor, button_2);
			};
			if_block(node_7, ($$render) => {
				if (get(selecting)) $$render(consequent_5);
			});
			var button_3 = sibling(node_7, 2);
			let classes_1;
			var node_8 = child(button_3);
			Icon(node_8, { name: "select" });
			var text_5 = only_child(sibling(node_8), true);
			reset(button_3);
			reset(div_7);
			reset(div_6);
			reset(div_3);
			var node_9 = sibling(div_3, 2);
			var consequent_7 = ($$anchor) => {
				var div_9 = root_6$11();
				var node_10 = child(div_9);
				var consequent_6 = ($$anchor) => {
					var text_6 = text();
					template_effect(() => set_text(text_6, `Le jeu limite les requêtes : estimation en pause une minute, reprise automatique (${get(loaded) ?? ""} / ${get(items).length ?? ""}).`));
					append($$anchor, text_6);
				};
				var alternate = ($$anchor) => {
					var text_7 = text();
					template_effect(() => set_text(text_7, `Estimation des valeurs... ${get(loaded) ?? ""} / ${get(items).length ?? ""}. Le tri s'affine au fur et à mesure.`));
					append($$anchor, text_7);
				};
				if_block(node_10, ($$render) => {
					if (get(lanePaused)) $$render(consequent_6);
					else $$render(alternate, -1);
				});
				reset(div_9);
				append($$anchor, div_9);
			};
			if_block(node_9, ($$render) => {
				if (get(sort) === "value" && get(loaded) < get(items).length) $$render(consequent_7);
			});
			var node_11 = sibling(node_9, 2);
			var consequent_8 = ($$anchor) => {
				var div_10 = root_7$10();
				var text_8 = only_child(div_10, true);
				template_effect(() => set_text(text_8, get(bulkMsg)));
				append($$anchor, div_10);
			};
			if_block(node_11, ($$render) => {
				if (get(bulkMsg)) $$render(consequent_8);
			});
			var node_12 = sibling(node_11, 2);
			var consequent_12 = ($$anchor) => {
				var div_11 = root_12$5();
				{
					const extras = ($$anchor) => {
						var fragment_6 = root_10$6();
						var node_13 = first_child(fragment_6);
						var consequent_9 = ($$anchor) => {
							var button_4 = root_8$8();
							let classes_2;
							var node_14 = child(button_4);
							Icon(node_14, {
								name: "star",
								width: 1.7,
								class: "rl-ico"
							});
							var text_9 = only_child(sibling(node_14, 2), true);
							reset(button_4);
							template_effect(() => {
								classes_2 = set_class(button_4, 1, "rl special fav", null, classes_2, { on: get(favOnly) });
								set_text(text_9, get(starredCount));
							});
							delegated("click", button_4, () => set(favOnly, !get(favOnly)));
							append($$anchor, button_4);
						};
						if_block(node_13, ($$render) => {
							if (get(starredCount)) $$render(consequent_9);
						});
						var node_15 = sibling(node_13, 2);
						var consequent_10 = ($$anchor) => {
							var button_5 = root_9$7();
							let classes_3;
							var node_16 = child(button_5);
							Icon(node_16, {
								name: "sparkle",
								filled: true,
								width: 0,
								class: "rl-ico"
							});
							var text_10 = only_child(sibling(node_16, 2), true);
							reset(button_5);
							template_effect(() => {
								classes_3 = set_class(button_5, 1, "rl special shiny", null, classes_3, { on: get(shinyOnly) });
								set_text(text_10, get(shinyCount));
							});
							delegated("click", button_5, () => set(shinyOnly, !get(shinyOnly)));
							append($$anchor, button_5);
						};
						if_block(node_15, ($$render) => {
							if (get(shinyCount)) $$render(consequent_10);
						});
						append($$anchor, fragment_6);
					};
					var div_12 = child(div_11);
					each(div_12, 21, () => RARITIES_DESC, index, ($$anchor, r) => {
						var fragment_7 = comment();
						var node_17 = first_child(fragment_7);
						var consequent_11 = ($$anchor) => {
							var button_6 = root_11$5();
							let classes_4;
							template_effect(($0) => {
								classes_4 = set_class(button_6, 1, "rm-seg", null, classes_4, {
									sel: get(filter) === get(r),
									dim: get(filter) !== "ALL" && get(filter) !== get(r)
								});
								set_style(button_6, `--rc:var(--r-${$0 ?? ""}); flex-grow:${get(stats).counts[get(r)] ?? ""}`);
								set_attribute(button_6, "title", `${RNAME[get(r)] ?? ""} : ${get(stats).counts[get(r)] ?? ""}`);
								set_attribute(button_6, "aria-label", `${RNAME[get(r)] ?? ""} : ${get(stats).counts[get(r)] ?? ""}`);
							}, [() => get(r).toLowerCase()]);
							delegated("click", button_6, () => set(filter, get(filter) === get(r) ? "ALL" : get(r), true));
							append($$anchor, button_6);
						};
						if_block(node_17, ($$render) => {
							if (get(stats).counts[get(r)]) $$render(consequent_11);
						});
						append($$anchor, fragment_7);
					});
					reset(div_12);
					var node_18 = sibling(div_12, 2);
					{
						let $0 = user_derived(() => get(filter) === "ALL" ? "" : get(filter));
						let $1 = user_derived(() => get(starredCount) || get(shinyCount) ? extras : void 0);
						RarityChips(node_18, {
							get value() {
								return get($0);
							},
							get counts() {
								return get(stats).counts;
							},
							get total() {
								return get(stats).copies;
							},
							onchange: (r) => set(filter, r || "ALL", true),
							get children() {
								return get($1);
							}
						});
					}
					reset(div_11);
				}
				append($$anchor, div_11);
			};
			if_block(node_12, ($$render) => {
				if (get(stats).copies > 0) $$render(consequent_12);
			});
			var node_19 = sibling(node_12, 2);
			var consequent_14 = ($$anchor) => {
				var div_13 = root_15$3();
				var node_20 = child(div_13);
				var consequent_13 = ($$anchor) => {
					var fragment_8 = root_13$4();
					next();
					append($$anchor, fragment_8);
				};
				var alternate_1 = ($$anchor) => {
					var fragment_9 = root_14$3();
					next();
					append($$anchor, fragment_9);
				};
				if_block(node_20, ($$render) => {
					if (get(search) || get(filter) !== "ALL") $$render(consequent_13);
					else $$render(alternate_1, -1);
				});
				reset(div_13);
				append($$anchor, div_13);
			};
			var alternate_2 = ($$anchor) => {
				var div_14 = root_2$14();
				each(div_14, 21, () => get(shown), (it) => it.id, ($$anchor, it) => {
					var button_7 = root_16$3();
					let classes_5;
					var node_21 = child(button_7);
					Card(node_21, {
						get card() {
							return get(it).card;
						},
						get count() {
							return get(it).count;
						},
						get shiny() {
							return get(it).is_shiny;
						},
						get starred() {
							return get(it).starred;
						},
						get value() {
							return values[get(it).card.id];
						}
					});
					var node_22 = sibling(node_21, 2);
					var consequent_15 = ($$anchor) => {
						{
							let $0 = user_derived(() => get(picked).has(get(it).id));
							PickMark($$anchor, { get on() {
								return get($0);
							} });
						}
					};
					if_block(node_22, ($$render) => {
						if (get(selecting)) $$render(consequent_15);
					});
					reset(button_7);
					action(button_7, ($$node, $$action_arg) => lazy.watch?.($$node, $$action_arg), () => get(it).card);
					template_effect(($0) => {
						classes_5 = set_class(button_7, 1, "card-btn", null, classes_5, {
							picking: get(selecting),
							picked: $0
						});
						set_attribute(button_7, "aria-label", get(it).card.title);
					}, [() => get(selecting) && get(picked).has(get(it).id)]);
					delegated("click", button_7, () => onCardClick(get(it)));
					append($$anchor, button_7);
				});
				reset(div_14);
				append($$anchor, div_14);
			};
			if_block(node_19, ($$render) => {
				if (get(shown).length === 0) $$render(consequent_14);
				else $$render(alternate_2, -1);
			});
			template_effect(($0) => {
				set_text(text_1, $0);
				classes = set_class(button_1, 1, "iconbtn", null, classes, { on: settings.hideStats });
				classes_1 = set_class(button_3, 1, "iconbtn", null, classes_1, { on: get(selecting) });
				set_text(text_5, get(selecting) ? "Annuler" : "Sélectionner");
			}, [() => plural(get(stats).unique, "carte")]);
			bind_select_value(select, () => get(sort), ($$value) => set(sort, $$value));
			delegated("click", button_1, onToggleStats);
			delegated("click", button_3, toggleSelecting);
			append($$anchor, fragment_1);
		};
		if_block(node, ($$render) => {
			if (get(error)) $$render(consequent);
			else if (!get(items)) $$render(consequent_1, 1);
			else $$render(alternate_3, -1);
		});
		var node_23 = sibling(node, 2);
		var consequent_17 = ($$anchor) => {
			var div_15 = root_20$1();
			var node_24 = child(div_15);
			var consequent_16 = ($$anchor) => {
				var fragment_11 = root_18$2();
				var span_4 = first_child(fragment_11);
				var text_11 = child(span_4);
				var text_12 = only_child(sibling(text_11), true);
				next();
				reset(span_4);
				var button_8 = sibling(span_4, 2);
				var button_9 = sibling(button_8, 2);
				var text_13 = only_child(button_9, true);
				template_effect(($0, $1) => {
					set_text(text_11, `Défausser ${$0 ?? ""} contre `);
					set_text(text_12, $1);
					button_8.disabled = get(bulkBusy);
					button_9.disabled = get(bulkBusy);
					set_text(text_13, get(bulkBusy) ? "Défausse..." : "Confirmer");
				}, [() => plural(get(picked).size, "carte"), () => plural(get(picked).size, "point")]);
				delegated("click", button_8, () => set(bulkConfirm, false));
				delegated("click", button_9, bulkDiscard);
				append($$anchor, fragment_11);
			};
			var alternate_4 = ($$anchor) => {
				var fragment_12 = root_19$1();
				var span_5 = first_child(fragment_12);
				var text_14 = only_child(span_5);
				var button_10 = sibling(span_5, 2);
				var text_15 = only_child(button_10);
				template_effect(() => {
					set_text(text_14, `${get(picked).size ?? ""} sélectionnée${get(picked).size > 1 ? "s" : ""}`);
					set_text(text_15, `Défausser · +${get(picked).size ?? ""} pts`);
				});
				delegated("click", button_10, () => set(bulkConfirm, true));
				append($$anchor, fragment_12);
			};
			if_block(node_24, ($$render) => {
				if (get(bulkConfirm)) $$render(consequent_16);
				else $$render(alternate_4, -1);
			});
			reset(div_15);
			append($$anchor, div_15);
		};
		if_block(node_23, ($$render) => {
			if (get(selecting) && get(picked).size > 0) $$render(consequent_17);
		});
		var node_25 = sibling(node_23, 2);
		var consequent_18 = ($$anchor) => {
			CardModal($$anchor, {
				get item() {
					return get(selected);
				},
				onclose: () => set(selected, null),
				onaction: () => {
					reload();
					$$props.onwallet?.();
				}
			});
		};
		if_block(node_25, ($$render) => {
			if (get(selected)) $$render(consequent_18);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate(["click"]);
	var root$17 = from_html(`<span class="spin"></span>`);
	var root_1$18 = from_html(`<div class="pager"><button class="btn pager-btn"><!>Précédent</button> <span class="pager-info"> </span> <button class="btn pager-btn">Suivant<!></button></div>`);
	function Pager($$anchor, $$props) {
		push($$props, true);
		let loading = prop($$props, "loading", 3, false);
		let dir = state(0);
		const go = (d) => {
			set(dir, d, true);
			$$props.ongo($$props.page + d);
		};
		var div = root_1$18();
		var button = child(div);
		var node = child(button);
		var consequent = ($$anchor) => {
			append($$anchor, root$17());
		};
		var alternate = ($$anchor) => {
			Icon($$anchor, {
				name: "prev",
				width: 1.9
			});
		};
		if_block(node, ($$render) => {
			if (loading() && get(dir) < 0) $$render(consequent);
			else $$render(alternate, -1);
		});
		next();
		reset(button);
		var span_1 = sibling(button, 2);
		var text = only_child(span_1);
		var button_1 = sibling(span_1, 2);
		var node_1 = sibling(child(button_1));
		var consequent_1 = ($$anchor) => {
			append($$anchor, root$17());
		};
		var alternate_1 = ($$anchor) => {
			Icon($$anchor, {
				name: "next",
				width: 1.9
			});
		};
		if_block(node_1, ($$render) => {
			if (loading() && get(dir) > 0) $$render(consequent_1);
			else $$render(alternate_1, -1);
		});
		reset(button_1);
		reset(div);
		template_effect(() => {
			button.disabled = $$props.page === 0 || loading();
			set_text(text, `Page ${$$props.page + 1}`);
			button_1.disabled = !$$props.hasNext || loading();
		});
		delegated("click", button, () => go(-1));
		delegated("click", button_1, () => go(1));
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var PagedList = class {
		#page = state(0);
		get page() {
			return get(this.#page);
		}
		set page(value) {
			set(this.#page, value, true);
		}
		#data = state(null);
		get data() {
			return get(this.#data);
		}
		set data(value) {
			set(this.#data, value, true);
		}
		#loaded = state(-1);
		get loaded() {
			return get(this.#loaded);
		}
		set loaded(value) {
			set(this.#loaded, value, true);
		}
		#loading = state(false);
		get loading() {
			return get(this.#loading);
		}
		set loading(value) {
			set(this.#loading, value, true);
		}
		#error = state(false);
		get error() {
			return get(this.#error);
		}
		set error(value) {
			set(this.#error, value, true);
		}
		#token = 0;
		constructor(fetchPage) {
			this.fetchPage = fetchPage;
		}
		async go(page = this.page) {
			const token = ++this.#token;
			this.page = page;
			this.loading = true;
			this.error = false;
			try {
				const d = await this.fetchPage(page);
				if (token === this.#token) {
					this.loaded = page;
					this.data = d;
				}
			} catch {
				if (token === this.#token) this.error = true;
			} finally {
				if (token === this.#token) this.loading = false;
			}
		}
	};
	function debouncedSearch(read, apply) {
		user_effect(() => {
			const q = read().trim();
			const t = setTimeout(() => apply(q), 350);
			return () => clearTimeout(t);
		});
	}
	var root$16 = from_html(`<option> </option>`);
	var root_1$17 = from_html(`<button></button>`);
	var root_2$13 = from_html(`<div class="rarity-panel"><div class="rarity-meter" role="group" aria-label="Filtrer par rareté"></div> <!></div>`);
	var root_3$11 = from_html(`<div class="empty"><b>Impossible de charger les cartes.</b><button class="btn">Réessayer</button></div>`);
	var root_4$11 = from_html(`<div class="wc skeleton"></div>`);
	var root_5$11 = from_html(`<div class="grid"></div>`);
	var root_6$10 = from_html(`<div class="empty"><b>Aucune carte ne correspond</b><div>Essayez un autre terme de recherche.</div></div>`);
	var root_7$9 = from_html(`<button class="card-btn"><!></button>`);
	var root_8$7 = from_html(`<div></div> <!>`, 1);
	var root_9$6 = from_html(`<div class="coll-head"><div><h1>Toutes les cartes</h1> <div class="meta"><!> <!></div></div> <div class="coll-tools"><!> <div class="tool-actions"><div class="isel" title="Trier"><!> <select aria-label="Trier"></select></div> <button title="N'afficher que ma liste de souhaits"><!><span>Souhaits</span></button> <button title="Afficher ou masquer l'ATK et la DEF"><!><span>ATK/DEF</span></button> <button title="Afficher ou flouter les images sensibles"><!><span>Sensible</span></button></div></div></div> <!> <!> <!>`, 1);
	function Catalog($$anchor, $$props) {
		push($$props, true);
		const SORTS = [
			["rarity", "Rareté"],
			["name", "Nom"],
			["atk", "Attaque"],
			["def", "Défense"]
		];
		let search = state("");
		let query = state("");
		const prefs = settings.catalog;
		let sort = state(proxy(prefs.sort));
		let rarity = state(proxy(prefs.rarity));
		let wishOnly = state(proxy(prefs.wishOnly));
		user_effect(() => Object.assign(prefs, {
			sort: get(sort),
			rarity: get(rarity),
			wishOnly: get(wishOnly)
		}));
		let selected = state(null);
		let rarityCounts = state(null);
		const list = new PagedList(async (page) => {
			const d = await data.catalog({
				page,
				sort: get(sort),
				q: get(query),
				rarity: get(rarity),
				wishlist: get(wishOnly)
			});
			if (d.rarityCounts && !get(query) && !get(rarity) && !get(wishOnly)) set(rarityCounts, d.rarityCounts, true);
			return d;
		});
		list.go(0);
		debouncedSearch(() => get(search), (q) => {
			if (q !== get(query)) {
				set(query, q, true);
				list.go(0);
			}
		});
		let values = proxy({});
		const lazy = lazyValues((id, v) => values[id] = v, { concurrency: 4 });
		user_effect(() => () => lazy.destroy());
		const refilter = (change) => {
			change();
			list.go(0);
		};
		const cards = user_derived(() => list.data?.cards);
		const hasNext = user_derived(() => !!list.data?.hasMore);
		const catalogTotal = user_derived(() => get(rarityCounts) ? Object.values(get(rarityCounts)).reduce((a, b) => a + b, 0) : null);
		var fragment = root_9$6();
		var div = first_child(fragment);
		var div_1 = child(div);
		var div_2 = sibling(child(div_1), 2);
		var node = child(div_2);
		var consequent = ($$anchor) => {
			var text$4 = text();
			template_effect(($0) => set_text(text$4, `${$0 ?? ""} cartes dans le jeu`), [() => nf(get(catalogTotal))]);
			append($$anchor, text$4);
		};
		if_block(node, ($$render) => {
			if (get(catalogTotal)) $$render(consequent);
		});
		var node_1 = sibling(node, 2);
		var consequent_1 = ($$anchor) => {
			var text_1 = text();
			template_effect(() => set_text(text_1, `· résultats pour « ${get(query) ?? ""} »`));
			append($$anchor, text_1);
		};
		if_block(node_1, ($$render) => {
			if (get(query)) $$render(consequent_1);
		});
		reset(div_2);
		reset(div_1);
		var div_3 = sibling(div_1, 2);
		var node_2 = child(div_3);
		{
			let $0 = user_derived(() => get(search).trim() !== get(query) || list.loading);
			let $1 = user_derived(() => get(catalogTotal) ? `Rechercher une carte parmi ${compact(get(catalogTotal))}` : "Rechercher une carte...");
			SearchBox(node_2, {
				get loading() {
					return get($0);
				},
				get placeholder() {
					return get($1);
				},
				get value() {
					return get(search);
				},
				set value($$value) {
					set(search, $$value, true);
				}
			});
		}
		var div_4 = sibling(node_2, 2);
		var div_5 = child(div_4);
		var node_3 = child(div_5);
		Icon(node_3, { name: "sort" });
		var select = sibling(node_3, 2);
		each(select, 21, () => SORTS, index, ($$anchor, $$item) => {
			var $$array = user_derived(() => to_array(get($$item), 2));
			let v = () => get($$array)[0];
			let label = () => get($$array)[1];
			var option = root$16();
			var text_2 = only_child(option, true);
			var option_value = {};
			template_effect(() => {
				set_text(text_2, label());
				if (option_value !== (option_value = v())) option.value = (option.__value = option_value) ?? "";
			});
			append($$anchor, option);
		});
		reset(select);
		var select_value;
		init_select(select);
		reset(div_5);
		var button = sibling(div_5, 2);
		let classes;
		Icon(child(button), {
			name: "heart",
			get filled() {
				return get(wishOnly);
			},
			width: 1.7
		});
		next();
		reset(button);
		var button_1 = sibling(button, 2);
		let classes_1;
		var node_5 = child(button_1);
		{
			let $0 = user_derived(() => settings.hideStats ? "eyeOff" : "eye");
			Icon(node_5, { get name() {
				return get($0);
			} });
		}
		next();
		reset(button_1);
		var button_2 = sibling(button_1, 2);
		let classes_2;
		var node_6 = child(button_2);
		{
			let $0 = user_derived(() => settings.hideSensitive ? "eyeOff" : "eye");
			Icon(node_6, { get name() {
				return get($0);
			} });
		}
		next();
		reset(button_2);
		reset(div_4);
		reset(div_3);
		reset(div);
		var node_7 = sibling(div, 2);
		var consequent_3 = ($$anchor) => {
			var div_6 = root_2$13();
			var div_7 = child(div_6);
			each(div_7, 21, () => RARITIES_DESC, index, ($$anchor, r) => {
				var fragment_3 = comment();
				var node_8 = first_child(fragment_3);
				var consequent_2 = ($$anchor) => {
					var button_3 = root_1$17();
					let classes_3;
					template_effect(($0, $1, $2) => {
						classes_3 = set_class(button_3, 1, "rm-seg", null, classes_3, {
							sel: get(rarity) === get(r),
							dim: get(rarity) && get(rarity) !== get(r)
						});
						set_style(button_3, `--rc:var(--r-${$0 ?? ""}); flex-grow:${get(rarityCounts)[get(r)] ?? ""}`);
						set_attribute(button_3, "title", `${RNAME[get(r)] ?? ""} : ${$1 ?? ""}`);
						set_attribute(button_3, "aria-label", `${RNAME[get(r)] ?? ""} : ${$2 ?? ""}`);
					}, [
						() => get(r).toLowerCase(),
						() => nf(get(rarityCounts)[get(r)]),
						() => nf(get(rarityCounts)[get(r)])
					]);
					delegated("click", button_3, () => refilter(() => set(rarity, get(rarity) === get(r) ? "" : get(r), true)));
					append($$anchor, button_3);
				};
				if_block(node_8, ($$render) => {
					if (get(rarityCounts)[get(r)]) $$render(consequent_2);
				});
				append($$anchor, fragment_3);
			});
			reset(div_7);
			RarityChips(sibling(div_7, 2), {
				get value() {
					return get(rarity);
				},
				get counts() {
					return get(rarityCounts);
				},
				onchange: (r) => refilter(() => set(rarity, r, true))
			});
			reset(div_6);
			append($$anchor, div_6);
		};
		if_block(node_7, ($$render) => {
			if (get(rarityCounts)) $$render(consequent_3);
		});
		var node_10 = sibling(node_7, 2);
		var consequent_4 = ($$anchor) => {
			var div_8 = root_3$11();
			var button_4 = sibling(child(div_8));
			reset(div_8);
			delegated("click", button_4, () => list.go());
			append($$anchor, div_8);
		};
		var consequent_5 = ($$anchor) => {
			var div_9 = root_5$11();
			each(div_9, 20, () => Array(12), index, ($$anchor, _) => {
				append($$anchor, root_4$11());
			});
			reset(div_9);
			append($$anchor, div_9);
		};
		var consequent_6 = ($$anchor) => {
			append($$anchor, root_6$10());
		};
		var alternate = ($$anchor) => {
			var fragment_4 = root_8$7();
			var div_12 = first_child(fragment_4);
			let classes_4;
			each(div_12, 21, () => get(cards), (c) => c.id, ($$anchor, c) => {
				var button_5 = root_7$9();
				Card(child(button_5), {
					get card() {
						return get(c);
					},
					get owned() {
						return get(c).owned;
					},
					get wishlisted() {
						return get(c).wishlisted;
					},
					get value() {
						return values[get(c).id];
					}
				});
				reset(button_5);
				action(button_5, ($$node, $$action_arg) => lazy.watch?.($$node, $$action_arg), () => get(c));
				template_effect(() => set_attribute(button_5, "aria-label", get(c).title));
				delegated("click", button_5, () => set(selected, get(c), true));
				append($$anchor, button_5);
			});
			reset(div_12);
			Pager(sibling(div_12, 2), {
				get page() {
					return list.page;
				},
				get hasNext() {
					return get(hasNext);
				},
				get loading() {
					return list.loading;
				},
				ongo: (p) => list.go(p)
			});
			template_effect(() => classes_4 = set_class(div_12, 1, "grid", null, classes_4, { dim: list.loading }));
			append($$anchor, fragment_4);
		};
		if_block(node_10, ($$render) => {
			if (list.error) $$render(consequent_4);
			else if (!get(cards)) $$render(consequent_5, 1);
			else if (get(cards).length === 0) $$render(consequent_6, 2);
			else $$render(alternate, -1);
		});
		var node_13 = sibling(node_10, 2);
		var consequent_7 = ($$anchor) => {
			{
				let $0 = user_derived(() => ({ card: get(selected) }));
				CardModal($$anchor, {
					get item() {
						return get($0);
					},
					readonly: true,
					onclose: () => set(selected, null)
				});
			}
		};
		if_block(node_13, ($$render) => {
			if (get(selected)) $$render(consequent_7);
		});
		template_effect(() => {
			if (select_value !== (select_value = get(sort))) select.value = (select.__value = select_value) ?? "", select_option(select, select_value);
			classes = set_class(button, 1, "iconbtn", null, classes, { on: get(wishOnly) });
			classes_1 = set_class(button_1, 1, "iconbtn", null, classes_1, { on: settings.hideStats });
			classes_2 = set_class(button_2, 1, "iconbtn", null, classes_2, { on: !settings.hideSensitive });
		});
		delegated("change", select, (e) => refilter(() => set(sort, e.currentTarget.value, true)));
		delegated("click", button, () => refilter(() => set(wishOnly, !get(wishOnly))));
		delegated("click", button_1, function(...$$args) {
			toggleHideStats?.apply(this, $$args);
		});
		delegated("click", button_2, function(...$$args) {
			toggleHideSensitive?.apply(this, $$args);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate(["change", "click"]);
	function compareListings(listings, now = Date.now()) {
		const live = listings.filter((a) => a.status === "active" && Date.parse(a.endAt) > now && a.price != null);
		const rows = [];
		const soonest = Math.min(...live.map((a) => Date.parse(a.endAt)));
		for (const shiny of [false, true]) {
			const group = live.filter((a) => !!a.is_shiny === shiny).sort((a, b) => a.price - b.price || Date.parse(a.endAt) - Date.parse(b.endAt));
			if (!group.length) continue;
			const min = group[0].price;
			for (const a of group) rows.push({
				...a,
				gap: a.price - min,
				cheapest: a.price === min,
				soonest: live.length > 1 && Date.parse(a.endAt) === soonest
			});
		}
		const prices = rows.filter((r) => !r.is_shiny).map((r) => r.price);
		const pool = prices.length ? prices : rows.map((r) => r.price);
		return {
			rows,
			stats: {
				count: rows.length,
				min: pool.length ? Math.min(...pool) : null,
				avg: pool.length ? Math.round(pool.reduce((s, p) => s + p, 0) / pool.length) : null
			}
		};
	}
	function countByCard(auctions) {
		const n = new Map();
		for (const a of auctions || []) n.set(a.card.id, (n.get(a.card.id) || 0) + 1);
		return n;
	}
	var root$15 = from_html(`<div class="auc-cat"> </div>`);
	var root_1$16 = from_html(`<div class="auc-k"> </div> <div class="auc-price"><span class="auc-coin"></span> </div> <div class="auc-sub"> </div>`, 1);
	var root_2$12 = from_html(`<div class="auc-k"> </div> <div class="auc-price muted"><span class="auc-coin"></span> </div> <div class="auc-sub"> </div>`, 1);
	var root_3$10 = from_html(`<span class="auc-live"><span class="auc-dot"></span>en direct</span>`);
	var root_4$10 = from_html(`<div class="auc-row"><div><div class="auc-k"> </div> <div class="auc-price"><span class="auc-coin"></span> </div></div> <div class="auc-clock"><div class="auc-k"> </div> <div class="auc-time"> </div></div></div> <div class="auc-sub"> <!></div>`, 1);
	var root_5$10 = from_html(`<div class="auc-flag lead">Vous êtes en tête</div>`);
	var root_6$9 = from_html(`<div class="auc-flag out">Enchère dépassée</div>`);
	var root_7$8 = from_html(`<button class="btn primary auc-cta">Finaliser l'enchère</button>`);
	var root_8$6 = from_html(`<div class="auc-note">En attente de finalisation.</div>`);
	var root_9$5 = from_html(`<div class="auc-inline"><div class="af-input-row"><input class="af-input" type="number" min="1" step="1" placeholder="Nouvelle mise de départ"/> <span class="af-unit">pts</span></div> <button class="btn">Baisser</button></div>`);
	var root_10$5 = from_html(`<div class="auc-note"> </div>`);
	var root_11$4 = from_html(`<div class="af-actions"><button class="btn">Garder</button> <button class="btn danger">Confirmer l'annulation</button></div>`);
	var root_12$4 = from_html(`<button class="btn danger auc-cta">Annuler la vente</button>`);
	var root_13$3 = from_html(`<!> <!>`, 1);
	var root_14$2 = from_html(`<button> </button>`);
	var root_15$2 = from_html(`<div> </div>`);
	var root_16$2 = from_html(`<div class="auc-inline"><div class="af-input-row"><input class="af-input" type="number" step="1" aria-label="Montant de l'enchère"/> <span class="af-unit">pts</span></div> <button class="btn primary"> </button></div> <div class="auc-quick"><button> </button> <!></div> <!>`, 1);
	var root_17$2 = from_html(` <b> </b>`, 1);
	var root_18$1 = from_html(`<span class="cmp-sum"> <b> </b> · moyenne <b> </b><!></span>`);
	var root_19 = from_html(`<li><div class="cmp-row sk"></div></li>`);
	var root_20 = from_html(`<ol class="cmp-list" aria-label="Recherche des autres ventes"></ol>`);
	var root_21 = from_html(`<div class="auc-empty">C'est la seule vente de cette carte en ce moment.<!></div>`);
	var root_22 = from_html(`<span class="cmp-shiny" title="Brillante"><!></span>`);
	var root_23 = from_html(`<span class="cmp-tag">Finit en premier</span>`);
	var root_24 = from_html(`<li><button><span class="cmp-price"><span class="auc-coin"></span> <!></span> <span> </span> <span> <!></span> <span class="cmp-who"> </span></button></li>`);
	var root_25 = from_html(`<ol class="cmp-list"></ol>`);
	var root_26 = from_html(`<span class="auc-pt"></span>`);
	var root_27 = from_html(`<div class="auc-chart"><div class="mc-y"><span> </span><span> </span></div> <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-label="Évolution du prix"><path fill="var(--accent)" fill-opacity="0.1"></path><path fill="none" stroke="var(--accent)" stroke-width="1.6" vector-effect="non-scaling-stroke"></path></svg> <!></div> <div class="auc-axis"><span> </span><span> </span></div>`, 1);
	var root_28 = from_html(`<div class="auc-empty"> </div>`);
	var root_29 = from_html(`<div class="auc-empty">Aucune enchère.</div>`);
	var root_30 = from_html(`<span class="tag"> </span>`);
	var root_31 = from_html(`<li><span class="who"> </span> <!> <span class="amt"> </span> <span class="when"> </span></li>`);
	var root_32 = from_html(`<ol class="auc-feed"></ol>`);
	var root_33 = from_html(`<div class="modal-backdrop" role="presentation"><div class="auc" role="dialog" aria-modal="true" aria-labelledby="wm-auc-title" tabindex="-1"><button class="modal-close" aria-label="Fermer"><!></button> <div class="auc-top"><div class="auc-card"><!></div> <div class="auc-body"><div class="auc-id"><span class="modal-rar"> </span> <h2 class="auc-name" id="wm-auc-title"> </h2> <!> <div class="auc-by"> </div></div> <div class="auc-state"><!></div> <!> <div class="auc-act"><!> <!></div></div></div> <section class="auc-panel cmp" aria-label="Toutes les ventes de cette carte"><div class="cmp-head"><h3>Toutes les ventes de cette carte</h3> <!></div> <!></section> <div class="auc-bottom"><section class="auc-panel"><h3>Évolution du prix</h3> <!></section> <section class="auc-panel"><h3>Activité</h3> <!></section></div></div></div>`);
	function AuctionModal($$anchor, $$props) {
		push($$props, true);
		let balance = prop($$props, "balance", 3, null);
		let a = state(proxy($$props.auction));
		let bids = state(proxy($$props.auction.bids || []));
		let iBid = state(false);
		let bal = state(proxy(balance()));
		let busy = state(false);
		let msg = state("");
		let msgOk = state(false);
		let confirmCancel = state(false);
		async function refresh() {
			try {
				const fresh = await data.auction($$props.auction.id);
				set(a, fresh, true);
				set(bids, fresh.bids, true);
				if (Number(get(amount)) < get(minBid)) set(amount, String(get(minBid)), true);
			} catch {}
		}
		refresh();
		user_effect(() => {
			if (get(phase) !== "live") return;
			const t = setInterval(refresh, 4e3);
			return () => clearInterval(t);
		});
		let others = state(null);
		let soldAvg = state(null);
		data.sameCard($$props.auction.card).then((l) => set(others, l, true), () => set(others, [], true));
		marketValueFor($$props.auction.card).then((v) => set(soldAvg, v, true));
		let now = state(proxy(Date.now()));
		user_effect(() => {
			const t = setInterval(() => set(now, Date.now(), true), 1e3);
			return () => clearInterval(t);
		});
		const secsLeft = user_derived(() => secondsUntil(get(a).endAt, get(now)) ?? 0);
		const phase = user_derived(() => get(a).status !== "active" ? get(a).status : get(secsLeft) > 0 ? "live" : "closing");
		const urgency = user_derived(() => get(secsLeft) < 60 ? "crit" : get(secsLeft) < 300 ? "warn" : "ok");
		const minBid = user_derived(() => get(a).bid != null ? get(a).bid + 1 : get(a).base ?? 1);
		const leading = user_derived(() => !!get(a).currentBidderId && get(a).currentBidderId === data.userId);
		const mine = user_derived(() => get(a).mine || !!$$props.auction.mine);
		const repriceAt = user_derived(() => (Date.parse(get(a).createdAt) + Date.parse(get(a).endAt)) / 2);
		const canReprice = user_derived(() => get(mine) && get(phase) === "live" && get(a).bid == null && get(now) >= get(repriceAt));
		const bidders = user_derived(() => new Set(get(bids).map((b) => b.bidder)).size);
		const cmp = user_derived(() => get(others) && compareListings([get(a), ...get(others).filter((o) => o.id !== get(a).id)], get(now)));
		let amount = state(proxy(String($$props.auction.bid != null ? $$props.auction.bid + 1 : $$props.auction.base ?? 1)));
		let newBase = state("");
		const tooPoor = user_derived(() => get(bal) != null && Number(get(amount)) > get(bal));
		async function run(action, ok) {
			set(busy, true);
			set(msg, "");
			try {
				const d = await action();
				set(msgOk, true);
				set(msg, ok(d), true);
				$$props.onwallet?.();
				await refresh();
			} catch (e) {
				set(msgOk, false);
				set(msg, e.message, true);
				if (e.min) set(amount, String(e.min), true);
			}
			set(busy, false);
			set(confirmCancel, false);
		}
		const bid = () => run(() => sounded(() => data.placeBid(get(a).id, Number(get(amount)))), (d) => {
			set(iBid, true);
			set(bal, d.bidder_balance ?? get(bal), true);
			return `Enchère placée à ${nf(d.current_bid)} pts.`;
		});
		const reprice = () => run(() => data.reprice(get(a).id, Number(get(newBase))), () => `Mise de départ baissée à ${nf(Number(get(newBase)))} pts.`);
		const cancel = () => run(() => data.cancelAuction(get(a).id), () => "Vente annulée, la carte revient dans votre collection.");
		const settle = () => run(() => data.settle(get(a).id), () => "Enchère finalisée.");
		const chart = user_derived(() => {
			const steps = [...get(bids)].filter((b) => b.at).sort((x, y) => Date.parse(x.at) - Date.parse(y.at)).map((b) => b.amount);
			const vs = get(a).base != null ? [get(a).base, ...steps] : steps;
			if (vs.length < 2) return null;
			const min = Math.min(...vs), max = Math.max(...vs), span = max - min || 1, H = 40, pad = 4;
			const pts = vs.map((v, i) => [pad + i / (vs.length - 1) * 92, pad + (1 - (v - min) / span) * 32]);
			let d = `M${pts[0][0]} ${pts[0][1]}`;
			for (let i = 1; i < pts.length; i++) d += ` H${pts[i][0]} V${pts[i][1]}`;
			return {
				d,
				area: `${d} V${H} H${pts[0][0]} Z`,
				dots: pts.slice(1),
				min,
				max
			};
		});
		const dateLabel = (iso) => iso ? new Date(iso).toLocaleString("fr", {
			day: "numeric",
			month: "short",
			hour: "2-digit",
			minute: "2-digit"
		}) : "";
		user_effect(() => {
			const html = document.documentElement;
			const prev = html.style.overflow;
			html.style.overflow = "hidden";
			return () => {
				html.style.overflow = prev;
			};
		});
		var div = root_33();
		event("keydown", $window, (e) => e.key === "Escape" && $$props.onclose?.());
		var div_1 = child(div);
		var button = child(div_1);
		Icon(child(button), {
			name: "close",
			width: 2,
			class: "x-ico"
		});
		reset(button);
		var div_2 = sibling(button, 2);
		var div_3 = child(div_2);
		Card(child(div_3), {
			get card() {
				return get(a).card;
			},
			get shiny() {
				return get(a).is_shiny;
			},
			big: true,
			caption: false
		});
		reset(div_3);
		var div_4 = sibling(div_3, 2);
		var div_5 = child(div_4);
		var span_1 = child(div_5);
		var text$3 = only_child(span_1);
		var h2 = sibling(span_1, 2);
		var text_1 = only_child(h2, true);
		var node_2 = sibling(h2, 2);
		var consequent = ($$anchor) => {
			var div_6 = root$15();
			var text_2 = only_child(div_6, true);
			template_effect(() => set_text(text_2, get(a).card.category));
			append($$anchor, div_6);
		};
		if_block(node_2, ($$render) => {
			if (get(a).card.category) $$render(consequent);
		});
		var text_3 = only_child(sibling(node_2, 2), true);
		reset(div_5);
		var div_8 = sibling(div_5, 2);
		var node_3 = child(div_8);
		var consequent_1 = ($$anchor) => {
			var fragment = root_1$16();
			var div_9 = first_child(fragment);
			var text_4 = only_child(div_9);
			var div_10 = sibling(div_9, 2);
			var text_5 = sibling(child(div_10), 1, true);
			reset(div_10);
			var text_6 = only_child(sibling(div_10, 2));
			template_effect(($0, $1) => {
				set_text(text_4, `Vendue${get(a).winner ? ` à ${get(a).winner}` : ""}`);
				set_text(text_5, $0);
				set_text(text_6, `${$1 ?? ""} · ${get(bids).length ?? ""} enchère${get(bids).length > 1 ? "s" : ""}`);
			}, [() => nf(get(a).finalPrice ?? get(a).price), () => dateLabel(get(a).settledAt || get(a).endAt)]);
			append($$anchor, fragment);
		};
		var consequent_2 = ($$anchor) => {
			var fragment_1 = root_2$12();
			var div_12 = first_child(fragment_1);
			var text_7 = only_child(div_12, true);
			var div_13 = sibling(div_12, 2);
			var text_8 = sibling(child(div_13), 1, true);
			reset(div_13);
			var text_9 = only_child(sibling(div_13, 2));
			template_effect(($0, $1) => {
				set_text(text_7, get(phase) === "cancelled" ? "Vente annulée" : "Invendue");
				set_text(text_8, $0);
				set_text(text_9, `Mise de départ · ${$1 ?? ""}`);
			}, [() => nf(get(a).base), () => dateLabel(get(a).settledAt || get(a).endAt)]);
			append($$anchor, fragment_1);
		};
		var alternate = ($$anchor) => {
			var fragment_2 = root_4$10();
			var div_15 = first_child(fragment_2);
			var div_16 = child(div_15);
			var div_17 = child(div_16);
			var text_10 = only_child(div_17, true);
			var div_18 = sibling(div_17, 2);
			var text_11 = sibling(child(div_18), 1, true);
			reset(div_18);
			reset(div_16);
			var div_19 = sibling(div_16, 2);
			var div_20 = child(div_19);
			var text_12 = only_child(div_20, true);
			var text_13 = only_child(sibling(div_20, 2), true);
			reset(div_19);
			reset(div_15);
			var div_22 = sibling(div_15, 2);
			var text_14 = child(div_22);
			var node_4 = sibling(text_14);
			var consequent_3 = ($$anchor) => {
				append($$anchor, root_3$10());
			};
			if_block(node_4, ($$render) => {
				if (get(phase) === "live") $$render(consequent_3);
			});
			reset(div_22);
			template_effect(($0, $1) => {
				set_text(text_10, get(a).bid != null ? "Enchère actuelle" : "Mise de départ");
				set_text(text_11, $0);
				set_attribute(div_19, "data-u", get(phase) === "closing" ? "end" : get(urgency));
				set_text(text_12, get(phase) === "closing" ? "Temps écoulé" : "Se termine dans");
				set_text(text_13, $1);
				set_text(text_14, `${get(bids).length ?? ""} enchère${get(bids).length > 1 ? "s" : ""}${get(bidders) ? ` · ${get(bidders)} enchérisseur${get(bidders) > 1 ? "s" : ""}` : ""} `);
			}, [() => nf(get(a).price), () => get(phase) === "closing" ? "Terminée" : countdown(get(secsLeft), { seconds: true })]);
			append($$anchor, fragment_2);
		};
		if_block(node_3, ($$render) => {
			if (get(phase) === "sold") $$render(consequent_1);
			else if (get(phase) === "unsold" || get(phase) === "cancelled") $$render(consequent_2, 1);
			else $$render(alternate, -1);
		});
		reset(div_8);
		var node_5 = sibling(div_8, 2);
		var consequent_4 = ($$anchor) => {
			append($$anchor, root_5$10());
		};
		var consequent_5 = ($$anchor) => {
			append($$anchor, root_6$9());
		};
		if_block(node_5, ($$render) => {
			if (get(leading) && get(phase) !== "sold") $$render(consequent_4);
			else if (get(iBid) && !get(leading) && get(phase) === "live") $$render(consequent_5, 1);
		});
		var div_25 = sibling(node_5, 2);
		var node_6 = child(div_25);
		var consequent_7 = ($$anchor) => {
			var fragment_3 = comment();
			var node_7 = first_child(fragment_3);
			var consequent_6 = ($$anchor) => {
				var button_1 = root_7$8();
				template_effect(() => button_1.disabled = get(busy));
				delegated("click", button_1, settle);
				append($$anchor, button_1);
			};
			var alternate_1 = ($$anchor) => {
				append($$anchor, root_8$6());
			};
			if_block(node_7, ($$render) => {
				if (get(mine) || get(leading)) $$render(consequent_6);
				else $$render(alternate_1, -1);
			});
			append($$anchor, fragment_3);
		};
		var consequent_11 = ($$anchor) => {
			var fragment_4 = root_13$3();
			var node_8 = first_child(fragment_4);
			var consequent_8 = ($$anchor) => {
				var div_27 = root_9$5();
				var div_28 = child(div_27);
				var input = child(div_28);
				remove_input_defaults(input);
				next(2);
				reset(div_28);
				var button_2 = sibling(div_28, 2);
				reset(div_27);
				template_effect(($0) => {
					set_attribute(input, "max", get(a).base - 1);
					button_2.disabled = $0;
				}, [() => get(busy) || !(Number(get(newBase)) >= 1 && Number(get(newBase)) < get(a).base)]);
				bind_value(input, () => get(newBase), ($$value) => set(newBase, $$value));
				delegated("click", button_2, reprice);
				append($$anchor, div_27);
			};
			var consequent_9 = ($$anchor) => {
				var div_29 = root_10$5();
				var text_15 = only_child(div_29);
				template_effect(($0) => set_text(text_15, `Baisse du prix possible dans ${$0 ?? ""}.`), [() => countdown(Math.round((get(repriceAt) - get(now)) / 1e3))]);
				append($$anchor, div_29);
			};
			if_block(node_8, ($$render) => {
				if (get(canReprice)) $$render(consequent_8);
				else if (get(a).bid == null) $$render(consequent_9, 1);
			});
			var node_9 = sibling(node_8, 2);
			var consequent_10 = ($$anchor) => {
				var div_30 = root_11$4();
				var button_3 = child(div_30);
				var button_4 = sibling(button_3, 2);
				reset(div_30);
				template_effect(() => {
					button_3.disabled = get(busy);
					button_4.disabled = get(busy);
				});
				delegated("click", button_3, () => set(confirmCancel, false));
				delegated("click", button_4, cancel);
				append($$anchor, div_30);
			};
			var alternate_2 = ($$anchor) => {
				var button_5 = root_12$4();
				template_effect(() => button_5.disabled = get(busy));
				delegated("click", button_5, () => set(confirmCancel, true));
				append($$anchor, button_5);
			};
			if_block(node_9, ($$render) => {
				if (get(confirmCancel)) $$render(consequent_10);
				else $$render(alternate_2, -1);
			});
			append($$anchor, fragment_4);
		};
		var consequent_13 = ($$anchor) => {
			var fragment_5 = root_16$2();
			var div_31 = first_child(fragment_5);
			var div_32 = child(div_31);
			var input_1 = child(div_32);
			remove_input_defaults(input_1);
			next(2);
			reset(div_32);
			var button_6 = sibling(div_32, 2);
			var text_16 = only_child(button_6, true);
			reset(div_31);
			var div_33 = sibling(div_31, 2);
			var button_7 = child(div_33);
			var text_17 = only_child(button_7);
			each(sibling(button_7, 2), 16, () => [
				5,
				25,
				100
			], index, ($$anchor, step) => {
				var button_8 = root_14$2();
				var text_18 = only_child(button_8);
				template_effect(() => set_text(text_18, `+${step ?? ""}`));
				delegated("click", button_8, () => set(amount, String(Math.max(get(minBid), Number(get(amount)) + step)), true));
				append($$anchor, button_8);
			});
			reset(div_33);
			var node_11 = sibling(div_33, 2);
			var consequent_12 = ($$anchor) => {
				var div_34 = root_15$2();
				let classes;
				var text_19 = only_child(div_34);
				template_effect(($0) => {
					classes = set_class(div_34, 1, "auc-bal", null, classes, { low: get(tooPoor) });
					set_text(text_19, `Solde : ${$0 ?? ""} WikiBidous. La mise est retenue tant que vous êtes en tête.`);
				}, [() => nf(get(bal))]);
				append($$anchor, div_34);
			};
			if_block(node_11, ($$render) => {
				if (get(bal) != null) $$render(consequent_12);
			});
			template_effect(($0, $1) => {
				set_attribute(input_1, "min", get(minBid));
				button_6.disabled = $0;
				set_text(text_16, get(busy) ? "..." : "Miser");
				set_text(text_17, `Min ${$1 ?? ""}`);
			}, [() => get(busy) || get(tooPoor) || !(Number(get(amount)) >= get(minBid)), () => nf(get(minBid))]);
			bind_value(input_1, () => get(amount), ($$value) => set(amount, $$value));
			delegated("click", button_6, bid);
			delegated("click", button_7, () => set(amount, String(get(minBid)), true));
			append($$anchor, fragment_5);
		};
		if_block(node_6, ($$render) => {
			if (get(phase) === "closing") $$render(consequent_7);
			else if (get(phase) === "live" && get(mine)) $$render(consequent_11, 1);
			else if (get(phase) === "live") $$render(consequent_13, 2);
		});
		var node_12 = sibling(node_6, 2);
		var consequent_14 = ($$anchor) => {
			var div_35 = root_15$2();
			let classes_1;
			var text_20 = only_child(div_35, true);
			template_effect(() => {
				classes_1 = set_class(div_35, 1, "modal-msg", null, classes_1, { ok: get(msgOk) });
				set_text(text_20, get(msg));
			});
			append($$anchor, div_35);
		};
		if_block(node_12, ($$render) => {
			if (get(msg)) $$render(consequent_14);
		});
		reset(div_25);
		reset(div_4);
		reset(div_2);
		var section = sibling(div_2, 2);
		var div_36 = child(section);
		var node_13 = sibling(child(div_36), 2);
		var consequent_16 = ($$anchor) => {
			var span_3 = root_18$1();
			var text_21 = child(span_3);
			var b_1 = sibling(text_21);
			var text_22 = only_child(b_1, true);
			var b_2 = sibling(b_1, 2);
			var text_23 = only_child(b_2, true);
			var node_14 = sibling(b_2);
			var consequent_15 = ($$anchor) => {
				var fragment_6 = root_17$2();
				var text_24 = first_child(fragment_6);
				text_24.nodeValue = " · vendue en moyenne ";
				var text_25 = only_child(sibling(text_24), true);
				template_effect(($0) => set_text(text_25, $0), [() => nf(get(soldAvg))]);
				append($$anchor, fragment_6);
			};
			if_block(node_14, ($$render) => {
				if (get(soldAvg) != null) $$render(consequent_15);
			});
			reset(span_3);
			template_effect(($0, $1) => {
				set_text(text_21, `${get(cmp).stats.count ?? ""} en vente · dès `);
				set_text(text_22, $0);
				set_text(text_23, $1);
			}, [() => nf(get(cmp).stats.min), () => nf(get(cmp).stats.avg)]);
			append($$anchor, span_3);
		};
		if_block(node_13, ($$render) => {
			if (get(cmp) && get(cmp).stats.count > 1) $$render(consequent_16);
		});
		reset(div_36);
		var node_15 = sibling(div_36, 2);
		var consequent_17 = ($$anchor) => {
			var ol = root_20();
			each(ol, 20, () => Array(3), index, ($$anchor, _) => {
				append($$anchor, root_19());
			});
			reset(ol);
			append($$anchor, ol);
		};
		var consequent_19 = ($$anchor) => {
			var div_37 = root_21();
			var node_16 = sibling(child(div_37));
			var consequent_18 = ($$anchor) => {
				var text_26 = text();
				template_effect(($0) => set_text(text_26, `Vendue en moyenne ${$0 ?? ""}.`), [() => nf(get(soldAvg))]);
				append($$anchor, text_26);
			};
			if_block(node_16, ($$render) => {
				if (get(soldAvg) != null) $$render(consequent_18);
			});
			reset(div_37);
			append($$anchor, div_37);
		};
		var alternate_3 = ($$anchor) => {
			var ol_1 = root_25();
			each(ol_1, 21, () => get(cmp).rows, (r) => r.id, ($$anchor, r) => {
				const left = user_derived(() => secondsUntil(get(r).endAt, get(now)) ?? 0);
				var li_1 = root_24();
				var button_9 = child(li_1);
				let classes_2;
				var span_4 = child(button_9);
				var text_27 = sibling(child(span_4), 1, true);
				var node_17 = sibling(text_27);
				var consequent_20 = ($$anchor) => {
					var span_5 = root_22();
					Icon(child(span_5), {
						name: "sparkle",
						width: 2
					});
					reset(span_5);
					append($$anchor, span_5);
				};
				if_block(node_17, ($$render) => {
					if (get(r).is_shiny) $$render(consequent_20);
				});
				reset(span_4);
				var span_6 = sibling(span_4, 2);
				let classes_3;
				var text_28 = only_child(span_6, true);
				var span_7 = sibling(span_6, 2);
				let classes_4;
				var text_29 = child(span_7, true);
				var node_19 = sibling(text_29);
				var consequent_21 = ($$anchor) => {
					append($$anchor, root_23());
				};
				if_block(node_19, ($$render) => {
					if (get(r).soonest) $$render(consequent_21);
				});
				reset(span_7);
				var text_30 = only_child(sibling(span_7, 2), true);
				reset(button_9);
				reset(li_1);
				template_effect(($0, $1, $2, $3, $4) => {
					classes_2 = set_class(button_9, 1, "cmp-row", null, classes_2, { here: get(r).id === get(a).id });
					button_9.disabled = get(r).id === get(a).id;
					set_attribute(button_9, "aria-label", `${$0 ?? ""} WikiBidous, se termine dans ${$1 ?? ""}`);
					set_text(text_27, $2);
					classes_3 = set_class(span_6, 1, "cmp-gap", null, classes_3, { best: get(r).cheapest && !get(r).is_shiny });
					set_text(text_28, $3);
					classes_4 = set_class(span_7, 1, "cmp-time", null, classes_4, { soon: get(left) < 3600 });
					set_text(text_29, $4);
					set_text(text_30, get(r).id === get(a).id ? "Celle-ci" : get(r).mine ? "Votre vente" : get(r).seller || "");
				}, [
					() => nf(get(r).price),
					() => countdown(get(left)),
					() => nf(get(r).price),
					() => get(r).cheapest ? get(r).is_shiny ? "Brillante" : "Le moins cher" : `+${nf(get(r).gap)}`,
					() => countdown(get(left))
				]);
				delegated("click", button_9, () => $$props.onswitch?.(get(r)));
				append($$anchor, li_1);
			});
			reset(ol_1);
			append($$anchor, ol_1);
		};
		if_block(node_15, ($$render) => {
			if (!get(cmp)) $$render(consequent_17);
			else if (get(cmp).rows.length <= 1) $$render(consequent_19, 1);
			else $$render(alternate_3, -1);
		});
		reset(section);
		var div_38 = sibling(section, 2);
		var section_1 = child(div_38);
		var node_20 = sibling(child(section_1), 2);
		var consequent_22 = ($$anchor) => {
			var fragment_8 = root_27();
			var div_39 = first_child(fragment_8);
			var div_40 = child(div_39);
			var span_10 = child(div_40);
			var text_31 = only_child(span_10, true);
			var text_32 = only_child(sibling(span_10), true);
			reset(div_40);
			var svg = sibling(div_40, 2);
			var path = child(svg);
			var path_1 = sibling(path);
			reset(svg);
			each(sibling(svg, 2), 17, () => get(chart).dots, index, ($$anchor, $$item) => {
				var $$array = user_derived(() => to_array(get($$item), 2));
				let x = () => get($$array)[0];
				let y = () => get($$array)[1];
				var span_12 = root_26();
				template_effect(() => set_style(span_12, `left:${x() ?? ""}%;top:${y() / 40 * 100}%`));
				append($$anchor, span_12);
			});
			reset(div_39);
			var div_41 = sibling(div_39, 2);
			var span_13 = child(div_41);
			var text_33 = only_child(span_13);
			var text_34 = only_child(sibling(span_13));
			reset(div_41);
			template_effect(($0, $1, $2) => {
				set_text(text_31, $0);
				set_text(text_32, $1);
				set_attribute(path, "d", get(chart).area);
				set_attribute(path_1, "d", get(chart).d);
				set_text(text_33, `Départ ${$2 ?? ""}`);
				set_text(text_34, `${get(bids).length ?? ""} enchère${get(bids).length > 1 ? "s" : ""}`);
			}, [
				() => nf(get(chart).max),
				() => nf(get(chart).min),
				() => nf(get(a).base)
			]);
			append($$anchor, fragment_8);
		};
		var alternate_4 = ($$anchor) => {
			var div_42 = root_28();
			var text_35 = only_child(div_42);
			template_effect(() => set_text(text_35, `Pas encore d'enchère. ${get(phase) === "live" && !get(mine) ? "Soyez le premier." : ""}`));
			append($$anchor, div_42);
		};
		if_block(node_20, ($$render) => {
			if (get(chart)) $$render(consequent_22);
			else $$render(alternate_4, -1);
		});
		reset(section_1);
		var section_2 = sibling(section_1, 2);
		var node_22 = sibling(child(section_2), 2);
		var consequent_23 = ($$anchor) => {
			append($$anchor, root_29());
		};
		var alternate_5 = ($$anchor) => {
			var ol_2 = root_32();
			each(ol_2, 23, () => get(bids), (b) => b.id, ($$anchor, b, i) => {
				var li_2 = root_31();
				let classes_5;
				var span_15 = child(li_2);
				var text_36 = only_child(span_15, true);
				var node_23 = sibling(span_15, 2);
				var consequent_24 = ($$anchor) => {
					var span_16 = root_30();
					var text_37 = only_child(span_16, true);
					template_effect(() => set_text(text_37, get(phase) === "sold" ? "Gagnant" : "En tête"));
					append($$anchor, span_16);
				};
				if_block(node_23, ($$render) => {
					if (get(i) === 0) $$render(consequent_24);
				});
				var span_17 = sibling(node_23, 2);
				var text_38 = only_child(span_17, true);
				var text_39 = only_child(sibling(span_17, 2), true);
				reset(li_2);
				template_effect(($0, $1) => {
					classes_5 = set_class(li_2, 1, "", null, classes_5, {
						top: get(i) === 0,
						me: get(b).bidderId && get(b).bidderId === data.userId
					});
					set_text(text_36, get(b).bidder || "Anonyme");
					set_text(text_38, $0);
					set_text(text_39, $1);
				}, [() => nf(get(b).amount), () => ago(get(b).at, get(now))]);
				append($$anchor, li_2);
			});
			reset(ol_2);
			append($$anchor, ol_2);
		};
		if_block(node_22, ($$render) => {
			if (get(bids).length === 0) $$render(consequent_23);
			else $$render(alternate_5, -1);
		});
		reset(section_2);
		reset(div_38);
		reset(div_1);
		action(div_1, ($$node) => anchorCentered?.($$node));
		reset(div);
		template_effect(() => {
			set_attribute(span_1, "data-r", get(a).card.rarity);
			set_text(text$3, `${(RNAME[get(a).card.rarity] || get(a).card.rarity) ?? ""}${get(a).is_shiny ? " · brillante" : ""}`);
			set_text(text_1, get(a).card.title);
			set_text(text_3, get(mine) ? "Votre vente" : get(a).seller ? `Vendu par ${get(a).seller}` : "");
			set_attribute(div_8, "data-phase", get(phase));
		});
		delegated("click", div, () => $$props.onclose?.());
		delegated("click", div_1, (e) => e.stopPropagation());
		delegated("click", button, () => $$props.onclose?.());
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var root$14 = from_html(`<option> </option>`);
	var root_1$15 = from_html(`<div class="coll-tools"><!> <div class="tool-actions"><div class="isel" title="Trier"><!> <select aria-label="Trier"></select></div></div></div>`);
	var root_2$11 = from_html(`<button role="tab"> </button>`);
	var root_3$9 = from_html(`<div class="empty"><b>Marché indisponible pour le moment.</b><button class="btn">Réessayer</button></div>`);
	var root_4$9 = from_html(`<div class="wc skeleton"></div>`);
	var root_5$9 = from_html(`<div class="grid"></div>`);
	var root_6$8 = from_html(`<div class="empty"><b> </b></div>`);
	var root_7$7 = from_html(`<span class="auc-dup"> </span>`);
	var root_8$5 = from_html(`<div class="auc-item"><button class="card-btn"><!></button> <div class="auc-meta"><span class="auc-bid"><span class="auc-coin"></span> </span> <span> </span></div> <div class="auc-foot"><span> </span> <!></div></div>`);
	var root_9$4 = from_html(`<div></div> <!>`, 1);
	var root_10$4 = from_html(`<div class="coll-head"><div><h1>Marché</h1> <div class="meta">Enchérissez sur des cartes ou vendez les vôtres contre des WikiBidous</div></div> <!></div> <div class="tabs" role="tablist"></div> <!> <!> <!>`, 1);
	function Marketplace($$anchor, $$props) {
		push($$props, true);
		let openId = prop($$props, "openId", 3, null);
		const SORTS = [
			["recent", "Plus récentes"],
			["ending_soon", "Fin proche"],
			["price_asc", "Prix croissant"],
			["price_desc", "Prix décroissant"]
		];
		const prefs = settings.market;
		let tab = state(proxy(prefs.tab));
		let search = state("");
		let query = state("");
		let sort = state(proxy(prefs.sort));
		let rarity = state(proxy(prefs.rarity));
		user_effect(() => Object.assign(prefs, {
			tab: get(tab),
			sort: get(sort),
			rarity: get(rarity)
		}));
		let selected = state(null);
		const list = new PagedList((page) => data.marketplace({
			page,
			sort: get(sort),
			q: get(query),
			rarity: get(rarity)
		}));
		list.go(0);
		debouncedSearch(() => get(search), (q) => {
			if (q !== get(query)) {
				set(query, q, true);
				list.go(0);
			}
		});
		let mine = state(null);
		let mineError = state(false);
		const loadMine = () => {
			set(mineError, false);
			return data.myMarket().then((m) => set(mine, m, true), () => set(mineError, !get(mine)));
		};
		loadMine();
		let now = state(proxy(Date.now()));
		user_effect(() => {
			const t = setInterval(() => set(now, Date.now(), true), 3e4);
			return () => clearInterval(t);
		});
		const refilter = (change) => {
			change();
			list.go(0);
		};
		user_effect(() => {
			if (openId() && untrack(() => get(selected)?.id) !== openId()) data.auction(openId()).then((a) => set(selected, a, true), () => history.replaceState({}, "", "/marketplace"));
		});
		function closeModal() {
			set(selected, null);
			if (openId()) history.replaceState({}, "", "/marketplace");
			loadMine();
			list.go();
			$$props.onwallet?.();
		}
		function statusLabel(a) {
			if (a.status === "active") return countdown(secondsUntil(a.endAt, get(now)));
			if (a.status === "sold") return a.finalPrice != null ? `Vendue ${nf(a.finalPrice)}` : "Vendue";
			return a.status === "cancelled" ? "Annulée" : "Invendue";
		}
		const tabs = user_derived(() => [
			["browse", "Toutes les ventes"],
			["selling", `Mes ventes ${get(mine) ? `${get(mine).selling.length}/${get(mine).max}` : ""}`],
			["bidding", `Mes enchères ${get(mine)?.bidding.length || ""}`],
			["won", `Remportées ${get(mine)?.won.length || ""}`],
			["history", "Historique"]
		]);
		const shown = user_derived(() => get(tab) === "browse" ? list.data?.auctions : get(mine)?.[get(tab)]);
		const dupes = user_derived(() => get(tab) === "browse" ? countByCard(get(shown)) : new Map());
		const EMPTY = {
			browse: "Aucune enchère ne correspond.",
			selling: "Aucune vente en cours. Ouvrez une carte dans Ma collection pour la vendre.",
			bidding: "Aucune enchère en cours.",
			won: "Aucune enchère remportée.",
			history: "Aucune vente terminée."
		};
		var fragment = root_10$4();
		var div = first_child(fragment);
		var node = sibling(child(div), 2);
		var consequent = ($$anchor) => {
			var div_1 = root_1$15();
			var node_1 = child(div_1);
			{
				let $0 = user_derived(() => get(search).trim() !== get(query) || list.loading);
				SearchBox(node_1, {
					get loading() {
						return get($0);
					},
					placeholder: "Rechercher une carte au marché...",
					get value() {
						return get(search);
					},
					set value($$value) {
						set(search, $$value, true);
					}
				});
			}
			var div_2 = sibling(node_1, 2);
			var div_3 = child(div_2);
			var node_2 = child(div_3);
			Icon(node_2, { name: "sort" });
			var select = sibling(node_2, 2);
			each(select, 21, () => SORTS, index, ($$anchor, $$item) => {
				var $$array = user_derived(() => to_array(get($$item), 2));
				let v = () => get($$array)[0];
				let label = () => get($$array)[1];
				var option = root$14();
				var text = only_child(option, true);
				var option_value = {};
				template_effect(() => {
					set_text(text, label());
					if (option_value !== (option_value = v())) option.value = (option.__value = option_value) ?? "";
				});
				append($$anchor, option);
			});
			reset(select);
			var select_value;
			init_select(select);
			reset(div_3);
			reset(div_2);
			reset(div_1);
			template_effect(() => {
				if (select_value !== (select_value = get(sort))) select.value = (select.__value = select_value) ?? "", select_option(select, select_value);
			});
			delegated("change", select, (e) => refilter(() => set(sort, e.currentTarget.value, true)));
			append($$anchor, div_1);
		};
		if_block(node, ($$render) => {
			if (get(tab) === "browse") $$render(consequent);
		});
		reset(div);
		var div_4 = sibling(div, 2);
		each(div_4, 21, () => get(tabs), index, ($$anchor, $$item) => {
			var $$array_1 = user_derived(() => to_array(get($$item), 2));
			let id = () => get($$array_1)[0];
			let label = () => get($$array_1)[1];
			var button = root_2$11();
			let classes;
			var text_1 = only_child(button, true);
			template_effect(() => {
				set_attribute(button, "aria-selected", get(tab) === id());
				classes = set_class(button, 1, "", null, classes, { on: get(tab) === id() });
				set_text(text_1, label());
			});
			delegated("click", button, () => set(tab, id(), true));
			append($$anchor, button);
		});
		reset(div_4);
		var node_3 = sibling(div_4, 2);
		var consequent_1 = ($$anchor) => {
			RarityChips($$anchor, {
				class: "mkt-filter",
				get value() {
					return get(rarity);
				},
				onchange: (r) => refilter(() => set(rarity, r, true))
			});
		};
		if_block(node_3, ($$render) => {
			if (get(tab) === "browse") $$render(consequent_1);
		});
		var node_4 = sibling(node_3, 2);
		var consequent_2 = ($$anchor) => {
			var div_5 = root_3$9();
			var button_1 = sibling(child(div_5));
			reset(div_5);
			delegated("click", button_1, () => get(tab) === "browse" ? list.go() : loadMine());
			append($$anchor, div_5);
		};
		var consequent_3 = ($$anchor) => {
			var div_6 = root_5$9();
			each(div_6, 20, () => Array(10), index, ($$anchor, _) => {
				append($$anchor, root_4$9());
			});
			reset(div_6);
			append($$anchor, div_6);
		};
		var consequent_4 = ($$anchor) => {
			var div_8 = root_6$8();
			var text_2 = only_child(child(div_8), true);
			reset(div_8);
			template_effect(() => set_text(text_2, EMPTY[get(tab)]));
			append($$anchor, div_8);
		};
		var alternate = ($$anchor) => {
			var fragment_2 = root_9$4();
			var div_9 = first_child(fragment_2);
			let classes_1;
			each(div_9, 21, () => get(shown), (a) => a.id, ($$anchor, a) => {
				var div_10 = root_8$5();
				var button_2 = child(div_10);
				Card(child(button_2), {
					get card() {
						return get(a).card;
					},
					get shiny() {
						return get(a).is_shiny;
					}
				});
				reset(button_2);
				var div_11 = sibling(button_2, 2);
				var span = child(div_11);
				var text_3 = sibling(child(span), 1, true);
				reset(span);
				var span_1 = sibling(span, 2);
				let classes_2;
				var text_4 = only_child(span_1, true);
				reset(div_11);
				var div_12 = sibling(div_11, 2);
				var span_2 = child(div_12);
				let classes_3;
				var text_5 = only_child(span_2, true);
				var node_6 = sibling(span_2, 2);
				var consequent_5 = ($$anchor) => {
					var span_3 = root_7$7();
					var text_6 = only_child(span_3);
					template_effect(($0, $1) => {
						set_attribute(span_3, "title", `Cette carte est en vente ${$0 ?? ""} fois sur cette page`);
						set_text(text_6, `x${$1 ?? ""}`);
					}, [() => get(dupes).get(get(a).card.id), () => get(dupes).get(get(a).card.id)]);
					append($$anchor, span_3);
				};
				var d = user_derived(() => get(dupes).get(get(a).card.id) > 1);
				if_block(node_6, ($$render) => {
					if (get(d)) $$render(consequent_5);
				});
				reset(div_12);
				reset(div_10);
				template_effect(($0, $1, $2) => {
					set_attribute(button_2, "aria-label", get(a).card.title);
					set_attribute(span, "title", get(a).bid != null ? "Enchère actuelle" : "Mise de départ");
					set_text(text_3, $0);
					classes_2 = set_class(span_1, 1, "auc-end", null, classes_2, { soon: $1 });
					set_text(text_4, $2);
					classes_3 = set_class(span_2, 1, "auc-seller", null, classes_3, { lead: get(a).currentBidderId === data.userId && get(a).status === "active" });
					set_text(text_5, get(a).mine ? "Votre vente" : get(a).currentBidderId === data.userId && get(a).status === "active" ? "Vous êtes en tête" : get(a).seller ? `Vendu par ${get(a).seller}` : "");
				}, [
					() => nf(get(a).price),
					() => get(a).status === "active" && secondsUntil(get(a).endAt, get(now)) < 3600,
					() => statusLabel(get(a))
				]);
				delegated("click", button_2, () => set(selected, get(a), true));
				append($$anchor, div_10);
			});
			reset(div_9);
			var node_7 = sibling(div_9, 2);
			var consequent_6 = ($$anchor) => {
				Pager($$anchor, {
					get page() {
						return list.page;
					},
					get hasNext() {
						return list.data.hasMore;
					},
					get loading() {
						return list.loading;
					},
					ongo: (p) => list.go(p)
				});
			};
			if_block(node_7, ($$render) => {
				if (get(tab) === "browse") $$render(consequent_6);
			});
			template_effect(() => classes_1 = set_class(div_9, 1, "grid", null, classes_1, { dim: get(tab) === "browse" && list.loading }));
			append($$anchor, fragment_2);
		};
		if_block(node_4, ($$render) => {
			if (get(tab) === "browse" && list.error || get(tab) !== "browse" && get(mineError)) $$render(consequent_2);
			else if (!get(shown)) $$render(consequent_3, 1);
			else if (get(shown).length === 0) $$render(consequent_4, 2);
			else $$render(alternate, -1);
		});
		var node_8 = sibling(node_4, 2);
		var consequent_7 = ($$anchor) => {
			var fragment_4 = comment();
			key(first_child(fragment_4), () => get(selected).id, ($$anchor) => {
				{
					let $0 = user_derived(() => $$props.profile?.currency ?? null);
					AuctionModal($$anchor, {
						get auction() {
							return get(selected);
						},
						get balance() {
							return get($0);
						},
						get onwallet() {
							return $$props.onwallet;
						},
						onclose: closeModal,
						onswitch: (a) => set(selected, a, true)
					});
				}
			});
			append($$anchor, fragment_4);
		};
		if_block(node_8, ($$render) => {
			if (get(selected)) $$render(consequent_7);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate(["change", "click"]);
	var root$13 = from_html(`<img alt="" loading="lazy"/>`);
	var root_1$14 = from_html(`<span class="avatar"><!></span>`);
	function Avatar($$anchor, $$props) {
		push($$props, true);
		let size = prop($$props, "size", 3, 32);
		const hue = user_derived(() => [...$$props.user?.username || "?"].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7));
		var span = root_1$14();
		var node = child(span);
		var consequent = ($$anchor) => {
			var img = root$13();
			template_effect(() => set_attribute(img, "src", $$props.user.avatar));
			append($$anchor, img);
		};
		var alternate = ($$anchor) => {
			var text$2 = text();
			template_effect(($0) => set_text(text$2, $0), [() => ($$props.user?.username || "?")[0].toUpperCase()]);
			append($$anchor, text$2);
		};
		if_block(node, ($$render) => {
			if ($$props.user?.avatar) $$render(consequent);
			else $$render(alternate, -1);
		});
		reset(span);
		template_effect(() => set_style(span, `--s:${size() ?? ""}px;--h:${get(hue) ?? ""}`));
		append($$anchor, span);
		pop();
	}
	var root$12 = from_html(`<span class="tside-total is-none">Non estimé</span>`);
	var root_1$13 = from_html(`<span class="tside-total"> </span>`);
	var root_2$10 = from_html(`<div class="tside-none"> </div>`);
	var root_3$8 = from_html(`<button class="card-btn"><!></button>`);
	var root_4$8 = from_html(`<div class="tside-coins"><!><b> </b><span>WikiBidous</span></div>`);
	var root_5$8 = from_html(`<div class="tside-chip"><!><span>+ <b> </b> </span></div>`);
	var root_6$7 = from_html(`<div class="tside-cards"><!> <!></div> <!>`, 1);
	var root_7$6 = from_html(`<section class="tside"><header class="tside-head"><span> </span><!></header> <!></section>`);
	function TradeSide($$anchor, $$props) {
		push($$props, true);
		let coins = prop($$props, "coins", 3, 0), cols = prop($$props, "cols", 3, 1), narrow = prop($$props, "narrow", 3, false), empty = prop($$props, "empty", 3, "Rien");
		const value = user_derived(() => sideValue($$props.items, coins(), $$props.values));
		const none = user_derived(() => get(value).unknown > 0 && get(value).unknown === $$props.items.length && !coins());
		const missing = user_derived(() => get(value).unknown ? `${get(value).unknown} carte${get(value).unknown > 1 ? "s" : ""} sans valeur estimée` : null);
		var section = root_7$6();
		var header = child(section);
		var span = child(header);
		var text = only_child(span, true);
		var node = sibling(span);
		var consequent = ($$anchor) => {
			var span_1 = root$12();
			template_effect(() => set_attribute(span_1, "title", get(missing)));
			append($$anchor, span_1);
		};
		var alternate = ($$anchor) => {
			var span_2 = root_1$13();
			var text_1 = only_child(span_2);
			template_effect(($0) => {
				set_attribute(span_2, "title", get(missing));
				set_text(text_1, `${get(value).unknown ? "≈ " : ""}${$0 ?? ""} pts`);
			}, [() => nf(get(value).total)]);
			append($$anchor, span_2);
		};
		if_block(node, ($$render) => {
			if (get(none)) $$render(consequent);
			else $$render(alternate, -1);
		});
		reset(header);
		var node_1 = sibling(header, 2);
		var consequent_1 = ($$anchor) => {
			var div = root_2$10();
			var text_2 = only_child(div, true);
			template_effect(() => set_text(text_2, empty()));
			append($$anchor, div);
		};
		var alternate_1 = ($$anchor) => {
			var fragment = root_6$7();
			var div_1 = first_child(fragment);
			let styles;
			var node_2 = child(div_1);
			each(node_2, 17, () => $$props.items, (it) => it.itemId ?? it.userCardId, ($$anchor, it) => {
				var button = root_3$8();
				var node_3 = child(button);
				{
					let $0 = user_derived(() => $$props.values.get(get(it).card.id));
					Card(node_3, {
						get card() {
							return get(it).card;
						},
						get shiny() {
							return get(it).is_shiny;
						},
						stats: false,
						get value() {
							return get($0);
						}
					});
				}
				reset(button);
				template_effect(() => set_attribute(button, "aria-label", get(it).card.title));
				delegated("click", button, () => $$props.onopen?.(get(it)));
				append($$anchor, button);
			});
			var node_4 = sibling(node_2, 2);
			var consequent_2 = ($$anchor) => {
				var div_2 = root_4$8();
				var node_5 = child(div_2);
				Icon(node_5, { name: "coin" });
				var text_3 = only_child(sibling(node_5), true);
				next();
				reset(div_2);
				template_effect(($0) => set_text(text_3, $0), [() => nf(coins())]);
				append($$anchor, div_2);
			};
			if_block(node_4, ($$render) => {
				if (coins() && !$$props.items.length) $$render(consequent_2);
			});
			reset(div_1);
			var node_6 = sibling(div_1, 2);
			var consequent_3 = ($$anchor) => {
				var div_3 = root_5$8();
				var node_7 = child(div_3);
				Icon(node_7, { name: "coin" });
				var span_3 = sibling(node_7);
				var b_1 = sibling(child(span_3));
				var text_4 = only_child(b_1, true);
				var text_5 = sibling(b_1);
				reset(span_3);
				reset(div_3);
				template_effect(($0) => {
					set_text(text_4, $0);
					set_text(text_5, ` ${narrow() ? "wb" : "WikiBidous"}`);
				}, [() => nf(coins())]);
				append($$anchor, div_3);
			};
			if_block(node_6, ($$render) => {
				if (coins() && $$props.items.length) $$render(consequent_3);
			});
			template_effect(() => styles = set_style(div_1, "", styles, { "--cols": cols() }));
			append($$anchor, fragment);
		};
		if_block(node_1, ($$render) => {
			if (!$$props.items.length && !coins()) $$render(consequent_1);
			else $$render(alternate_1, -1);
		});
		reset(section);
		template_effect(() => set_text(text, $$props.label));
		append($$anchor, section);
		pop();
	}
	delegate(["click"]);
	var root$11 = from_html(`<b> </b>`);
	var root_1$12 = from_html(`<span> </span>`);
	var root_2$9 = from_html(`<div class="tm-verdict"><!> <!> <!></div>`);
	function TradeVerdict($$anchor, $$props) {
		push($$props, true);
		var div = root_2$9();
		var node = child(div);
		Icon(node, { name: "trades" });
		var node_1 = sibling(node, 2);
		var consequent = ($$anchor) => {
			var b = root$11();
			var text = only_child(b, true);
			template_effect(($0) => set_text(text, $0), [() => verdictTitle($$props.v)]);
			append($$anchor, b);
		};
		if_block(node_1, ($$render) => {
			if ($$props.v.kind !== "unknown") $$render(consequent);
		});
		var node_2 = sibling(node_1, 2);
		var consequent_1 = ($$anchor) => {
			var span = root_1$12();
			var text_1 = only_child(span);
			template_effect(($0) => set_text(text_1, `${$$props.v.diff > 0 ? "+" : ""}${$0 ?? ""} pts`), [() => nf($$props.v.diff)]);
			append($$anchor, span);
		};
		if_block(node_2, ($$render) => {
			if ($$props.v.kind === "advantage" || $$props.v.kind === "disadvantage") $$render(consequent_1);
		});
		reset(div);
		template_effect(() => set_attribute(div, "data-k", $$props.v.kind));
		append($$anchor, div);
		pop();
	}
	var root$10 = from_html(`<div class="empty"><b> </b><button class="btn">Réessayer</button></div>`);
	var root_1$11 = from_html(`<div class="loading-more"><span class="spin"></span></div>`);
	var root_2$8 = from_html(`<div class="empty"><b>Aucun message.</b><span> </span></div>`);
	var root_3$7 = from_html(`<div><span> </span><time class="nowrap"> </time></div>`);
	var root_4$7 = from_html(`<button class="chat-trade"><!> </button>`);
	var root_5$7 = from_html(`<div class="modal-msg chat-msg"> </div>`);
	var root_6$6 = from_html(`<div class="chat"><div class="chat-feed" aria-live="polite"><!></div> <form class="chat-form"><input class="search chat-input" maxlength="500"/> <button class="btn primary">Envoyer</button></form> <!></div>`);
	function TradeChat($$anchor, $$props) {
		push($$props, true);
		let conv = state(null);
		let text = state("");
		let busy = state(false);
		let msg = state("");
		let list = state(null);
		let loadErr = state("");
		const load = () => data.chat($$props.friend.id).then((c) => {
			set(conv, c, true);
			set(loadErr, "");
		}, (e) => {
			set(loadErr, e.message, true);
		});
		load();
		user_effect(() => {
			const t = setInterval(() => document.visibilityState === "visible" && load(), 5e3);
			return () => clearInterval(t);
		});
		const feed = user_derived(() => get(conv) ? [...get(conv).messages.map((m) => ({
			kind: "msg",
			at: m.at,
			m
		})), ...get(conv).trades.map((t) => ({
			kind: "trade",
			at: t.createdAt,
			t
		}))].sort((a, b) => String(a.at).localeCompare(String(b.at))) : null);
		let stick = true;
		const onScroll = () => stick = get(list).scrollHeight - get(list).scrollTop - get(list).clientHeight < 40;
		user_effect(() => {
			get(feed);
			if (get(list) && stick) get(list).scrollTop = get(list).scrollHeight;
		});
		async function send() {
			const content = get(text).trim();
			if (!content || get(busy)) return;
			set(busy, true);
			set(msg, "");
			try {
				await data.sendChat($$props.friend.id, content);
				set(text, "");
				stick = true;
				await load();
			} catch (e) {
				set(msg, e.message, true);
			} finally {
				set(busy, false);
			}
		}
		var div = root_6$6();
		var div_1 = child(div);
		var node = child(div_1);
		var consequent = ($$anchor) => {
			var div_2 = root$10();
			var b_1 = child(div_2);
			var text_1 = only_child(b_1, true);
			var button = sibling(b_1);
			reset(div_2);
			template_effect(() => set_text(text_1, get(loadErr)));
			delegated("click", button, load);
			append($$anchor, div_2);
		};
		var consequent_1 = ($$anchor) => {
			append($$anchor, root_1$11());
		};
		var consequent_2 = ($$anchor) => {
			var div_4 = root_2$8();
			var text_2 = only_child(sibling(child(div_4)));
			reset(div_4);
			template_effect(() => set_text(text_2, `Écrivez à ${$$props.friend.username ?? ""} pour négocier.`));
			append($$anchor, div_4);
		};
		var alternate_1 = ($$anchor) => {
			var fragment = comment();
			each(first_child(fragment), 17, () => get(feed), (f) => f.kind + (f.m?.id ?? f.t.id), ($$anchor, f) => {
				var fragment_1 = comment();
				var node_2 = first_child(fragment_1);
				var consequent_3 = ($$anchor) => {
					var div_5 = root_3$7();
					let classes;
					var span_1 = child(div_5);
					var text_3 = only_child(span_1, true);
					var text_4 = only_child(sibling(span_1), true);
					reset(div_5);
					template_effect(($0) => {
						classes = set_class(div_5, 1, "bubble", null, classes, { mine: get(f).m.mine });
						set_text(text_3, get(f).m.content);
						set_text(text_4, $0);
					}, [() => ago(get(f).m.at)]);
					append($$anchor, div_5);
				};
				var alternate = ($$anchor) => {
					var button_1 = root_4$7();
					var node_3 = child(button_1);
					Icon(node_3, { name: "trades" });
					var text_5 = sibling(node_3);
					reset(button_1);
					template_effect(($0) => set_text(text_5, ` Échange · ${$0 ?? ""} · ${get(f).t.give.length ?? ""} contre ${get(f).t.get.length ?? ""}`), [() => statusLabel(get(f).t.status)]);
					delegated("click", button_1, () => $$props.onopentrade?.(get(f).t));
					append($$anchor, button_1);
				};
				if_block(node_2, ($$render) => {
					if (get(f).kind === "msg") $$render(consequent_3);
					else $$render(alternate, -1);
				});
				append($$anchor, fragment_1);
			});
			append($$anchor, fragment);
		};
		if_block(node, ($$render) => {
			if (!get(feed) && get(loadErr)) $$render(consequent);
			else if (!get(feed)) $$render(consequent_1, 1);
			else if (!get(feed).length) $$render(consequent_2, 2);
			else $$render(alternate_1, -1);
		});
		reset(div_1);
		bind_this(div_1, ($$value) => set(list, $$value), () => get(list));
		var form = sibling(div_1, 2);
		var input = child(form);
		remove_input_defaults(input);
		var button_2 = sibling(input, 2);
		reset(form);
		var node_4 = sibling(form, 2);
		var consequent_4 = ($$anchor) => {
			var div_6 = root_5$7();
			var text_6 = only_child(div_6, true);
			template_effect(() => set_text(text_6, get(msg)));
			append($$anchor, div_6);
		};
		if_block(node_4, ($$render) => {
			if (get(msg)) $$render(consequent_4);
		});
		reset(div);
		template_effect(($0) => {
			set_attribute(div, "aria-label", `Conversation avec ${$$props.friend.username ?? ""}`);
			set_attribute(input, "placeholder", `Écrire à ${$$props.friend.username ?? ""}...`);
			button_2.disabled = $0;
		}, [() => get(busy) || !get(text).trim()]);
		event("scroll", div_1, onScroll);
		event("submit", form, (e) => {
			e.preventDefault();
			send();
		});
		bind_value(input, () => get(text), ($$value) => set(text, $$value));
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var DEAL = {
		min: 180,
		floor: 110,
		max: 360,
		gap: 12,
		pad: 12,
		head: 32,
		headTall: 56,
		headWrapBelow: 190,
		chip: 48,
		verdictW: 88,
		verdictH: 44,
		bodyGap: 24,
		keepChain: .75,
		uneven: .85
	};
	var RATIO = 7 / 5;
	function sideShape(items, coins) {
		return {
			n: Math.max(1, items.length),
			chip: !!(items.length && coins)
		};
	}
	var lines = (n, cols) => Math.ceil(n / cols);
	var span = (cols, w, m) => cols * w + (cols - 1) * m.gap;
	var extra = (s, m) => s.chip ? m.chip : 0;
	var sideH = (s, cols, w, head, m) => lines(s.n, cols) * w * RATIO + (lines(s.n, cols) - 1) * m.gap + extra(s, m) + head + 2 * m.pad;
	function row(g, r, cg, cr, W, H, m) {
		const fitW = (W - 4 * m.pad - 2 * m.gap - m.verdictW - (cg + cr - 2) * m.gap) / (cg + cr);
		const head = span(Math.min(cg, cr), fitW, m) < m.headWrapBelow ? m.headTall : m.head;
		const height = (w) => Math.max(sideH(g, cg, w, head, m), sideH(r, cr, w, head, m));
		return {
			stacked: false,
			give: cg,
			get: cr,
			fitW,
			fitH: Math.min(...[[g, cg], [r, cr]].map(([s, c]) => {
				const L = lines(s.n, c);
				return (H - head - 2 * m.pad - extra(s, m) - (L - 1) * m.gap) / (L * RATIO);
			})),
			height,
			even: lines(g.n, cg) === lines(r.n, cr) ? 1 : m.uneven
		};
	}
	function stack(g, r, c, W, H, m) {
		const fitW = (W - 2 * m.pad - (c - 1) * m.gap) / c;
		const L = lines(g.n, c) + lines(r.n, c);
		const fixed = 2 * (m.head + 2 * m.pad) + extra(g, m) + extra(r, m) + m.verdictH + 2 * m.gap + (L - 2) * m.gap;
		const fitH = (H - fixed) / (L * RATIO);
		const height = (w) => L * w * RATIO + fixed;
		return {
			stacked: true,
			give: Math.min(c, g.n),
			get: Math.min(c, r.n),
			fitW,
			fitH,
			height,
			even: 1
		};
	}
	function dealLayout(W, H, give, get, m = DEAL) {
		const all = [];
		for (let cg = 1; cg <= give.n; cg++) for (let cr = 1; cr <= get.n; cr++) all.push(row(give, get, cg, cr, W, H, m));
		for (let c = 1; c <= Math.max(give.n, get.n); c++) all.push(stack(give, get, c, W, H, m));
		const pick = (score, lo, weigh) => {
			let best = null;
			for (const a of all) {
				const s = score(a);
				if (s < lo) continue;
				const rank = s * (weigh(a, s) ? a.even : 1);
				if (!best || rank > best.rank + .5 || Math.abs(rank - best.rank) <= .5 && a.height(s) < best.a.height(best.s)) best = {
					a,
					s,
					rank
				};
			}
			return best;
		};
		const fit = pick((a) => Math.min(m.max, a.fitW, a.fitH), m.floor, () => true);
		const best = fit ?? pick((a) => a.fitW < m.min ? -1 : Math.min(m.max, a.fitW, Math.max(a.fitH, m.min)), m.min, (a, s) => a.fitH >= s);
		if (!best) return {
			stacked: true,
			w: Math.max(0, Math.floor(Math.min(m.max, W - 2 * m.pad))),
			give: 1,
			get: 1,
			fits: false
		};
		const { a, s } = best;
		return {
			stacked: a.stacked,
			w: Math.floor(s),
			give: a.give,
			get: a.get,
			fits: !!fit
		};
	}
	var root_1$10 = from_html(`<button class="iconbtn tp-back" aria-label="Retour à la liste"><!></button>`);
	var root_2$7 = from_html(`<p class="tp-earlier"><span><b> </b> </span><button class="btn">Voir la dernière offre</button></p>`);
	var root_3$6 = from_html(`<button><span class="tp-chain-what"><b> </b> <span class="tp-step-deal"> </span></span> <span class="nowrap tp-chain-when"> </span></button>`);
	var root_4$6 = from_html(`<span class="nowrap tp-chain-when"> </span>`);
	var root_5$6 = from_html(`<span class="tp-chain-what"><b> </b> </span> <!>`, 1);
	var root_6$5 = from_html(`<li><!></li>`);
	var root_7$5 = from_html(`<section class="tp-chain"><h3>Négociation</h3> <ol></ol></section>`);
	var root_8$4 = from_html(`Accepter l'échange ? Vous donnez <b> </b> et recevez <b> </b>.`, 1);
	var root_9$3 = from_html(`<div class="tp-confirm" role="alertdialog" aria-label="Confirmation"><p class="confirm-text"><!></p> <div class="tp-actions"><button class="btn">Retour</button> <button> </button></div></div>`);
	var root_10$3 = from_html(`<div class="modal-msg tp-msg" role="alert"> </div>`);
	var root_11$3 = from_html(`<button class="btn">Contre-offre</button>`);
	var root_12$3 = from_html(`<div class="tp-actions"><button class="btn danger">Refuser</button> <!> <button class="btn primary">Accepter</button></div>`);
	var root_13$2 = from_html(`<div class="tp-actions"><button class="btn danger">Annuler l'offre</button></div>`);
	var root_14$1 = from_html(`<!> <!>`, 1);
	var root_15$1 = from_html(`<footer class="tp-foot"><!></footer>`);
	var root_16$1 = from_html(`<div class="tp-body"><!> <div><!> <!> <!></div> <!></div> <!>`, 1);
	var root_17$1 = from_html(`<section class="tp" aria-labelledby="wm-tp-title"><header class="tp-head"><!> <!> <div class="tp-title"><h2 id="wm-tp-title"> </h2> <span class="tp-sub"><span class="trade-status"> </span><span class="nowrap"> </span></span></div> <div class="modal-tabs tp-mode" role="tablist" aria-label="Affichage"><button role="tab"><!>Échange</button> <button role="tab"><!>Discussion</button></div></header> <!></section> <!>`, 1);
	function TradePane($$anchor, $$props) {
		push($$props, true);
		let all = prop($$props, "all", 19, () => []), mode = prop($$props, "mode", 15, "trade"), onback = prop($$props, "onback", 3, null);
		let ask = state(null);
		let busy = state(false);
		let msg = state("");
		let card = state(null);
		let viewing = state(null);
		const chain = user_derived(() => chainOf($$props.trade, all()));
		const steps = user_derived(() => timeline(get(chain)));
		const o = user_derived(() => get(chain).find((c) => c.id === get(viewing)) ?? $$props.trade);
		const earlier = user_derived(() => get(o).id !== $$props.trade.id);
		const v = user_derived(() => verdict(sideValue(get(o).give, get(o).giveCoins, $$props.values), sideValue(get(o).get, get(o).getCoins, $$props.values)));
		const canAnswer = user_derived(() => $$props.trade.status === "pending" && $$props.trade.incoming);
		const canCancel = user_derived(() => $$props.trade.status === "pending" && !$$props.trade.incoming);
		const ACT = {
			accept: ["Accepter l'échange", "primary"],
			decline: ["Refuser l'échange", "danger"],
			cancel: ["Annuler l'offre", "danger"]
		};
		let box = state(null);
		let chainH = state(0);
		let earlierH = state(0);
		const lay = user_derived(() => {
			if (!get(box)) return null;
			const shape = [sideShape(get(o).give, get(o).giveCoins), sideShape(get(o).get, get(o).getCoins)];
			const h = get(box).height - (get(earlier) ? get(earlierH) + DEAL.bodyGap : 0);
			const all = dealLayout(get(box).width, h, ...shape);
			if (!get(chainH)) return all;
			const both = dealLayout(get(box).width, h - get(chainH) - DEAL.bodyGap, ...shape);
			return both.fits && (get(chain).length > 1 || both.w >= all.w * DEAL.keepChain) ? both : all;
		});
		const slim = (cols) => !get(lay)?.stacked && (cols ?? 1) * (get(lay)?.w ?? 0) < DEAL.headWrapBelow;
		const dealVars = [
			"gap",
			"pad",
			"chip",
			"verdictW",
			"verdictH",
			"bodyGap"
		].map((k) => `--deal-${k}:${DEAL[k]}px`).join(";");
		const moves = (items, coins) => `${items.length} carte${items.length > 1 ? "s" : ""}${coins ? ` + ${nf(coins)} WikiBidous` : ""}`;
		async function act(action) {
			set(busy, true);
			set(msg, "");
			try {
				const write = () => withHumanCheck(() => data.tradeAction($$props.trade.id, action));
				await (action === "accept" ? sounded(write) : write());
				$$props.ondone?.($$props.trade);
			} catch (e) {
				set(msg, e.message, true);
				if (e.status != null) $$props.onchanged?.();
			} finally {
				set(busy, false);
				set(ask, null);
			}
		}
		let root = state(null);
		const OVERLAYS = ".modal-backdrop, .kbd-help-scrim, .notif-scrim";
		function onKey(e) {
			if (e.key !== "Escape" || get(busy) || e.defaultPrevented || get(card) || get(root)?.getRootNode().querySelector(OVERLAYS)) return;
			if (get(ask)) set(ask, null);
			else onback()?.();
		}
		var fragment = root_17$1();
		event("keydown", $window, onKey);
		var section = first_child(fragment);
		var header = child(section);
		var node = child(header);
		var consequent = ($$anchor) => {
			var button = root_1$10();
			Icon(child(button), {
				name: "prev",
				width: 2
			});
			reset(button);
			template_effect(() => button.disabled = get(busy));
			delegated("click", button, function(...$$args) {
				onback()?.apply(this, $$args);
			});
			append($$anchor, button);
		};
		if_block(node, ($$render) => {
			if (onback()) $$render(consequent);
		});
		var node_2 = sibling(node, 2);
		Avatar(node_2, {
			get user() {
				return $$props.trade.other;
			},
			size: 44
		});
		var div = sibling(node_2, 2);
		var h2 = child(div);
		var text$1 = only_child(h2);
		var span = sibling(h2, 2);
		var span_1 = child(span);
		var text_1 = only_child(span_1, true);
		var text_2 = only_child(sibling(span_1));
		reset(span);
		reset(div);
		var div_1 = sibling(div, 2);
		var button_1 = child(div_1);
		let classes;
		Icon(child(button_1), { name: "trades" });
		next();
		reset(button_1);
		var button_2 = sibling(button_1, 2);
		let classes_1;
		Icon(child(button_2), { name: "dms" });
		next();
		reset(button_2);
		reset(div_1);
		reset(header);
		var node_5 = sibling(header, 2);
		var consequent_1 = ($$anchor) => {
			var fragment_1 = comment();
			key(first_child(fragment_1), () => $$props.trade.other.id, ($$anchor) => {
				TradeChat($$anchor, {
					get friend() {
						return $$props.trade.other;
					},
					get onopentrade() {
						return $$props.onopentrade;
					}
				});
			});
			append($$anchor, fragment_1);
		};
		var alternate_3 = ($$anchor) => {
			var fragment_3 = root_16$1();
			var div_2 = first_child(fragment_3);
			var node_7 = child(div_2);
			var consequent_2 = ($$anchor) => {
				var p = root_2$7();
				var span_3 = child(p);
				var b = child(span_3);
				var text_3 = only_child(b);
				var text_4 = sibling(b);
				reset(span_3);
				var button_3 = sibling(span_3);
				reset(p);
				template_effect(($0, $1, $2) => {
					set_text(text_3, `${$0 ?? ""} ${$1 ?? ""}`);
					set_text(text_4, `, ${$2 ?? ""}: une offre précédente.`);
				}, [
					() => get(steps).find((s) => s.offer?.id === get(o).id)?.text,
					() => get(steps).find((s) => s.offer?.id === get(o).id)?.by,
					() => ago(get(o).createdAt)
				]);
				delegated("click", button_3, () => set(viewing, null));
				bind_element_size(p, "offsetHeight", ($$value) => set(earlierH, $$value));
				append($$anchor, p);
			};
			if_block(node_7, ($$render) => {
				if (get(earlier)) $$render(consequent_2);
			});
			var div_3 = sibling(node_7, 2);
			let classes_2;
			var node_8 = child(div_3);
			{
				let $0 = user_derived(() => get(lay)?.give);
				let $1 = user_derived(() => slim(get(lay)?.give));
				TradeSide(node_8, {
					get label() {
						return SIDE.give;
					},
					get items() {
						return get(o).give;
					},
					get coins() {
						return get(o).giveCoins;
					},
					get cols() {
						return get($0);
					},
					get narrow() {
						return get($1);
					},
					get values() {
						return $$props.values;
					},
					onopen: (it) => set(card, it, true)
				});
			}
			var node_9 = sibling(node_8, 2);
			TradeVerdict(node_9, { get v() {
				return get(v);
			} });
			var node_10 = sibling(node_9, 2);
			{
				let $0 = user_derived(() => get(lay)?.get);
				let $1 = user_derived(() => slim(get(lay)?.get));
				TradeSide(node_10, {
					get label() {
						return SIDE.get;
					},
					get items() {
						return get(o).get;
					},
					get coins() {
						return get(o).getCoins;
					},
					get cols() {
						return get($0);
					},
					get narrow() {
						return get($1);
					},
					get values() {
						return $$props.values;
					},
					onopen: (it) => set(card, it, true)
				});
			}
			reset(div_3);
			var node_11 = sibling(div_3, 2);
			var consequent_5 = ($$anchor) => {
				var section_1 = root_7$5();
				var ol = sibling(child(section_1), 2);
				each(ol, 21, () => get(steps), index, ($$anchor, s, i) => {
					var li = root_6$5();
					let classes_3;
					var node_12 = child(li);
					var consequent_3 = ($$anchor) => {
						var button_4 = root_3$6();
						let classes_4;
						var span_4 = child(button_4);
						var b_1 = child(span_4);
						var text_5 = only_child(b_1, true);
						var text_6 = sibling(b_1);
						var text_7 = only_child(sibling(text_6), true);
						reset(span_4);
						var text_8 = only_child(sibling(span_4, 2), true);
						reset(button_4);
						template_effect(($0, $1) => {
							classes_4 = set_class(button_4, 1, "tp-step", null, classes_4, { on: get(s).offer.id === get(o).id });
							set_attribute(button_4, "aria-pressed", get(s).offer.id === get(o).id);
							set_text(text_5, get(s).text);
							set_text(text_6, ` ${get(s).by ?? ""}`);
							set_text(text_7, $0);
							set_text(text_8, $1);
						}, [() => dealLine(get(s).offer.give.length, get(s).offer.giveCoins, get(s).offer.get.length, get(s).offer.getCoins), () => ago(get(s).at)]);
						delegated("click", button_4, () => set(viewing, get(s).offer.id, true));
						append($$anchor, button_4);
					};
					var alternate = ($$anchor) => {
						var fragment_4 = root_5$6();
						var span_7 = first_child(fragment_4);
						var b_2 = child(span_7);
						var text_9 = only_child(b_2, true);
						var text_10 = sibling(b_2);
						reset(span_7);
						var node_13 = sibling(span_7, 2);
						var consequent_4 = ($$anchor) => {
							var span_8 = root_4$6();
							var text_11 = only_child(span_8, true);
							template_effect(($0) => set_text(text_11, $0), [() => ago(get(s).at)]);
							append($$anchor, span_8);
						};
						if_block(node_13, ($$render) => {
							if (get(s).at) $$render(consequent_4);
						});
						template_effect(() => {
							set_text(text_9, get(s).text);
							set_text(text_10, ` ${get(s).by ?? ""}`);
						});
						append($$anchor, fragment_4);
					};
					if_block(node_12, ($$render) => {
						if (get(s).offer) $$render(consequent_3);
						else $$render(alternate, -1);
					});
					reset(li);
					template_effect(() => {
						set_attribute(li, "data-k", get(s).kind);
						classes_3 = set_class(li, 1, "", null, classes_3, { now: i === get(steps).length - 1 });
					});
					append($$anchor, li);
				});
				reset(ol);
				reset(section_1);
				bind_element_size(section_1, "offsetHeight", ($$value) => set(chainH, $$value));
				append($$anchor, section_1);
			};
			if_block(node_11, ($$render) => {
				if (get(steps).length > 2 || $$props.trade.status !== "pending") $$render(consequent_5);
			});
			reset(div_2);
			var node_14 = sibling(div_2, 2);
			var consequent_13 = ($$anchor) => {
				var footer = root_15$1();
				var node_15 = child(footer);
				var consequent_8 = ($$anchor) => {
					var div_4 = root_9$3();
					var p_1 = child(div_4);
					var node_16 = child(p_1);
					var consequent_6 = ($$anchor) => {
						var fragment_5 = root_8$4();
						var b_3 = sibling(first_child(fragment_5));
						var text_12 = only_child(b_3, true);
						var text_13 = only_child(sibling(b_3, 2), true);
						next();
						template_effect(($0, $1) => {
							set_text(text_12, $0);
							set_text(text_13, $1);
						}, [() => moves($$props.trade.give, $$props.trade.giveCoins), () => moves($$props.trade.get, $$props.trade.getCoins)]);
						append($$anchor, fragment_5);
					};
					var consequent_7 = ($$anchor) => {
						var text_14 = text();
						template_effect(() => set_text(text_14, `Refuser l'offre de ${$$props.trade.other.username ?? ""} ? Aucune carte ni WikiBidou ne sera échangé.`));
						append($$anchor, text_14);
					};
					var alternate_1 = ($$anchor) => {
						var text_15 = text();
						template_effect(() => set_text(text_15, `Annuler votre offre à ${$$props.trade.other.username ?? ""} ? Aucune carte ni WikiBidou ne sera échangé.`));
						append($$anchor, text_15);
					};
					if_block(node_16, ($$render) => {
						if (get(ask) === "accept") $$render(consequent_6);
						else if (get(ask) === "decline") $$render(consequent_7, 1);
						else $$render(alternate_1, -1);
					});
					reset(p_1);
					var div_5 = sibling(p_1, 2);
					var button_5 = child(div_5);
					var button_6 = sibling(button_5, 2);
					var text_16 = only_child(button_6, true);
					reset(div_5);
					reset(div_4);
					template_effect(() => {
						button_5.disabled = get(busy);
						set_class(button_6, 1, `btn ${ACT[get(ask)][1] ?? ""}`);
						button_6.disabled = get(busy);
						set_text(text_16, get(busy) ? "Envoi..." : ACT[get(ask)][0]);
					});
					delegated("click", button_5, () => set(ask, null));
					delegated("click", button_6, () => act(get(ask)));
					append($$anchor, div_4);
				};
				var alternate_2 = ($$anchor) => {
					var fragment_8 = root_14$1();
					var node_17 = first_child(fragment_8);
					var consequent_9 = ($$anchor) => {
						var div_6 = root_10$3();
						var text_17 = only_child(div_6, true);
						template_effect(() => set_text(text_17, get(msg)));
						append($$anchor, div_6);
					};
					if_block(node_17, ($$render) => {
						if (get(msg)) $$render(consequent_9);
					});
					var node_18 = sibling(node_17, 2);
					var consequent_11 = ($$anchor) => {
						var div_7 = root_12$3();
						var button_7 = child(div_7);
						var node_19 = sibling(button_7, 2);
						var consequent_10 = ($$anchor) => {
							var button_8 = root_11$3();
							delegated("click", button_8, () => $$props.oncounter($$props.trade));
							append($$anchor, button_8);
						};
						if_block(node_19, ($$render) => {
							if ($$props.oncounter) $$render(consequent_10);
						});
						var button_9 = sibling(node_19, 2);
						reset(div_7);
						delegated("click", button_7, () => set(ask, "decline"));
						delegated("click", button_9, () => set(ask, "accept"));
						append($$anchor, div_7);
					};
					var consequent_12 = ($$anchor) => {
						var div_8 = root_13$2();
						delegated("click", only_child(div_8), () => set(ask, "cancel"));
						append($$anchor, div_8);
					};
					if_block(node_18, ($$render) => {
						if (get(canAnswer)) $$render(consequent_11);
						else if (get(canCancel)) $$render(consequent_12, 1);
					});
					append($$anchor, fragment_8);
				};
				if_block(node_15, ($$render) => {
					if (get(ask)) $$render(consequent_8);
					else $$render(alternate_2, -1);
				});
				reset(footer);
				append($$anchor, footer);
			};
			if_block(node_14, ($$render) => {
				if (!get(earlier) && (get(ask) || get(canAnswer) || get(canCancel) || get(msg))) $$render(consequent_13);
			});
			template_effect(() => {
				set_style(div_2, `${dealVars ?? ""};--card-w:${get(lay)?.w ?? DEAL.min ?? ""}px`);
				classes_2 = set_class(div_3, 1, "tp-sides", null, classes_2, {
					stacked: get(lay)?.stacked,
					scrolls: get(lay) && !get(lay).fits,
					measuring: !get(lay)
				});
			});
			bind_resize_observer(div_2, "contentRect", ($$value) => set(box, $$value));
			append($$anchor, fragment_3);
		};
		if_block(node_5, ($$render) => {
			if (mode() === "chat") $$render(consequent_1);
			else $$render(alternate_3, -1);
		});
		reset(section);
		bind_this(section, ($$value) => set(root, $$value), () => get(root));
		var node_20 = sibling(section, 2);
		var consequent_14 = ($$anchor) => {
			{
				let $0 = user_derived(() => ({
					card: get(card).card,
					is_shiny: get(card).is_shiny
				}));
				CardModal($$anchor, {
					get item() {
						return get($0);
					},
					readonly: true,
					onclose: () => set(card, null)
				});
			}
		};
		if_block(node_20, ($$render) => {
			if (get(card)) $$render(consequent_14);
		});
		template_effect(($0, $1) => {
			set_text(text$1, `Échange avec ${$$props.trade.other.username ?? ""}`);
			set_attribute(span_1, "data-s", $$props.trade.status);
			set_text(text_1, $0);
			set_text(text_2, `${$$props.trade.incoming ? "Reçu" : "Envoyé"} ${$1 ?? ""}`);
			set_attribute(button_1, "aria-selected", mode() === "trade");
			classes = set_class(button_1, 1, "", null, classes, { on: mode() === "trade" });
			set_attribute(button_2, "aria-selected", mode() === "chat");
			classes_1 = set_class(button_2, 1, "", null, classes_1, { on: mode() === "chat" });
		}, [() => statusLabel($$props.trade.status), () => ago($$props.trade.createdAt)]);
		delegated("click", button_1, () => mode("trade"));
		delegated("click", button_2, () => mode("chat"));
		append($$anchor, fragment);
		pop();
	}
	delegate(["click"]);
	function inView(node, { onEnter, margin = "600px", key }) {
		let cb = onEnter, last = key;
		if (typeof IntersectionObserver === "undefined") return {};
		const io = new IntersectionObserver((entries) => {
			if (entries.some((e) => e.isIntersecting)) cb();
		}, { rootMargin: margin });
		io.observe(node);
		return {
			update(o) {
				cb = o.onEnter;
				if (o.key !== last) {
					last = o.key;
					io.unobserve(node);
					io.observe(node);
				}
			},
			destroy() {
				io.disconnect();
			}
		};
	}
	var RANK = Object.fromEntries(RARITIES_DESC.map((r, i) => [r, i]));
	var val = (values, it) => values.get(it.card.id) ?? -1;
	var byName = (a, b) => a.card.title.localeCompare(b.card.title, "fr", { sensitivity: "base" });
	var SORTS = {
		rarity: () => (a, b) => RANK[a.card.rarity] - RANK[b.card.rarity] || byName(a, b),
		value: (v) => (a, b) => val(v, b) - val(v, a) || RANK[a.card.rarity] - RANK[b.card.rarity] || byName(a, b),
		name: () => byName
	};
	var PICK_SORTS = [
		["rarity", "Rareté"],
		["value", "Valeur estimée"],
		["name", "Nom"]
	];
	var allValued = (items, values) => items.every((it) => values.has(it.card.id));
	function pickList(items, { q = "", rarity = "", sort = "rarity", values, isLocked = () => false }) {
		const nq = normSearch(q);
		const cmp = (SORTS[sort] ?? SORTS.rarity)(values);
		return items.filter((it) => (!rarity || it.card.rarity === rarity) && (!nq || normSearch(it.card.title).includes(nq))).map((it) => ({
			it,
			locked: !!isLocked(it)
		})).sort((a, b) => a.locked - b.locked || cmp(a.it, b.it)).map((x) => x.it);
	}
	var root$9 = from_html(`<option> </option>`);
	var root_1$9 = from_html(`<span class="pick-lock">Échange en attente</span>`);
	var root_2$6 = from_html(`<button><!> <!> <!></button>`);
	var root_3$5 = from_html(`<div class="empty"><b>Impossible de charger ces cartes.</b><button class="btn">Réessayer</button></div>`);
	var root_4$5 = from_html(`<div class="empty"><b> </b></div>`);
	var root_5$5 = from_html(`<span class="modal-msg">Impossible de charger la suite.</span><button class="btn">Réessayer</button>`, 1);
	var root_6$4 = from_html(`<span class="loading-more"><span class="spin"></span></span>`);
	var root_7$4 = from_html(`<div class="picker-more"><!></div>`);
	var root_8$3 = from_html(`<div class="picker"><div class="picker-bar"><!> <!> <!> <div class="isel" title="Trier les cartes"><!> <select aria-label="Trier"></select></div></div> <div class="picker-scroll"><div></div> <!></div></div>`);
	function CardPicker($$anchor, $$props) {
		push($$props, true);
		let items = prop($$props, "items", 19, () => []), locked = prop($$props, "locked", 19, () => new Set()), loading = prop($$props, "loading", 3, false), error = prop($$props, "error", 3, false), more = prop($$props, "more", 3, null), loadingMore = prop($$props, "loadingMore", 3, false), moreError = prop($$props, "moreError", 3, false), onquery = prop($$props, "onquery", 3, null);
		let q = state("");
		let rarity = state("");
		let sort = state("rarity");
		const isLocked = (it) => locked().has(it.id) || locked().has(it.card.id);
		let ranked = state(new Map());
		const settled = user_derived(() => get(sort) === "value" && allValued(items(), $$props.values));
		user_effect(() => {
			if (get(sort) !== "value") return;
			$$props.load?.(items());
			get(settled);
			set(ranked, untrack(() => new Map($$props.values)));
		});
		const remote = !!onquery();
		const shown = user_derived(() => pickList(items(), remote ? {
			sort: get(sort),
			values: get(ranked),
			isLocked
		} : {
			q: get(q),
			rarity: get(rarity),
			sort: get(sort),
			values: get(ranked),
			isLocked
		}));
		let asked = {
			q: "",
			rarity: "",
			sort: "rarity"
		};
		const ask = (change) => {
			const next = {
				...asked,
				...change
			};
			if (next.q === asked.q && next.rarity === asked.rarity && next.sort === asked.sort) return;
			asked = next;
			onquery()(next);
		};
		if (remote) {
			debouncedSearch(() => get(q), (text) => ask({ q: text }));
			user_effect(() => ask({
				rarity: get(rarity),
				sort: get(sort) === "name" ? "name" : "rarity",
				q: untrack(() => get(q)).trim()
			}));
		}
		const filling = user_derived(() => remote && get(sort) === "value" && !!more() && !moreError());
		user_effect(() => {
			if (get(filling) && !loadingMore()) untrack(() => more()());
		});
		var div = root_8$3();
		var div_1 = child(div);
		var node = child(div_1);
		snippet(node, () => $$props.lead ?? noop);
		var node_1 = sibling(node, 2);
		SearchBox(node_1, {
			placeholder: "Rechercher...",
			get value() {
				return get(q);
			},
			set value($$value) {
				set(q, $$value, true);
			}
		});
		var node_2 = sibling(node_1, 2);
		RarityChips(node_2, {
			class: "picker-chips",
			scroll: true,
			get value() {
				return get(rarity);
			},
			onchange: (r) => set(rarity, r, true)
		});
		var div_2 = sibling(node_2, 2);
		var node_3 = child(div_2);
		Icon(node_3, { name: "sort" });
		var select = sibling(node_3, 2);
		each(select, 21, () => PICK_SORTS, index, ($$anchor, $$item) => {
			var $$array = user_derived(() => to_array(get($$item), 2));
			let id = () => get($$array)[0];
			let label = () => get($$array)[1];
			var option = root$9();
			var text_1 = only_child(option, true);
			var option_value = {};
			template_effect(() => {
				set_text(text_1, label());
				if (option_value !== (option_value = id())) option.value = (option.__value = option_value) ?? "";
			});
			append($$anchor, option);
		});
		reset(select);
		init_select(select);
		reset(div_2);
		reset(div_1);
		var div_3 = sibling(div_1, 2);
		var div_4 = child(div_3);
		let classes;
		each(div_4, 21, () => get(shown), (it) => it.id, ($$anchor, it) => {
			const off = user_derived(() => isLocked(get(it)));
			const on = user_derived(() => $$props.picked.has(get(it).id));
			var button = root_2$6();
			let classes_1;
			var node_4 = child(button);
			{
				let $0 = user_derived(() => $$props.values.get(get(it).card.id));
				Card(node_4, {
					get card() {
						return get(it).card;
					},
					get shiny() {
						return get(it).is_shiny;
					},
					stats: false,
					get value() {
						return get($0);
					}
				});
			}
			var node_5 = sibling(node_4, 2);
			PickMark(node_5, { get on() {
				return get(on);
			} });
			var node_6 = sibling(node_5, 2);
			var consequent = ($$anchor) => {
				append($$anchor, root_1$9());
			};
			if_block(node_6, ($$render) => {
				if (get(off)) $$render(consequent);
			});
			reset(button);
			action(button, ($$node, $$action_arg) => $$props.watch?.($$node, $$action_arg), () => get(it).card);
			template_effect(() => {
				classes_1 = set_class(button, 1, "card-btn", null, classes_1, {
					picking: $$props.picked.size,
					picked: get(on)
				});
				button.disabled = get(off);
				set_attribute(button, "aria-pressed", get(on));
				set_attribute(button, "title", get(off) ? "Déjà dans un échange en attente" : get(it).card.title);
			});
			delegated("click", button, () => {
				pickSound(get(on));
				$$props.onpick(get(it));
			});
			append($$anchor, button);
		}, ($$anchor) => {
			var fragment = comment();
			var node_7 = first_child(fragment);
			var consequent_1 = ($$anchor) => {
				var div_5 = root_3$5();
				var button_1 = sibling(child(div_5));
				reset(div_5);
				delegated("click", button_1, function(...$$args) {
					$$props.onretry?.apply(this, $$args);
				});
				append($$anchor, div_5);
			};
			var alternate = ($$anchor) => {
				var div_6 = root_4$5();
				var text_2 = only_child(child(div_6), true);
				reset(div_6);
				template_effect(() => set_text(text_2, loading() ? "Chargement..." : items().length || get(q) || get(rarity) ? "Aucune carte ne correspond" : "Aucune carte"));
				append($$anchor, div_6);
			};
			if_block(node_7, ($$render) => {
				if (error() && !loading()) $$render(consequent_1);
				else $$render(alternate, -1);
			});
			append($$anchor, fragment);
		});
		reset(div_4);
		var node_8 = sibling(div_4, 2);
		var consequent_3 = ($$anchor) => {
			var div_7 = root_7$4();
			var node_9 = child(div_7);
			var consequent_2 = ($$anchor) => {
				var fragment_1 = root_5$5();
				delegated("click", sibling(first_child(fragment_1)), function(...$$args) {
					more()?.apply(this, $$args);
				});
				append($$anchor, fragment_1);
			};
			var alternate_1 = ($$anchor) => {
				append($$anchor, root_6$4());
			};
			if_block(node_9, ($$render) => {
				if (moreError() && !loadingMore()) $$render(consequent_2);
				else $$render(alternate_1, -1);
			});
			reset(div_7);
			action(div_7, ($$node, $$action_arg) => inView?.($$node, $$action_arg), () => ({
				key: `${items().length}:${loadingMore()}`,
				onEnter: () => {
					if (!loadingMore() && !moreError()) more()();
				}
			}));
			append($$anchor, div_7);
		};
		if_block(node_8, ($$render) => {
			if (more()) $$render(consequent_3);
		});
		reset(div_3);
		reset(div);
		template_effect(() => classes = set_class(div_4, 1, "grid picker-grid", null, classes, { dim: loading() }));
		bind_select_value(select, () => get(sort), ($$value) => set(sort, $$value));
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var root$8 = from_html(`<span class="coins-field af-input-row"><!> <input class="af-input" type="number" min="0"/> <span class="af-unit">wb</span> <button class="coins-x" aria-label="Retirer les WikiBidous"><!></button></span>`);
	var root_1$8 = from_html(`<button class="iconbtn coins-add"><!> </button>`);
	function CoinsField($$anchor, $$props) {
		push($$props, true);
		let value = prop($$props, "value", 15, 0), max = prop($$props, "max", 3, void 0), label = prop($$props, "label", 3, "Ajouter des WB");
		let open = state(value() > 0);
		let input = state(void 0);
		async function show() {
			if (!value()) value(null);
			set(open, true);
			await tick();
			get(input)?.focus({ preventScroll: true });
			get(input)?.scrollIntoView({ block: "nearest" });
		}
		function hide() {
			value(0);
			set(open, false);
		}
		var fragment = comment();
		var node = first_child(fragment);
		var consequent = ($$anchor) => {
			var span = root$8();
			var node_1 = child(span);
			Icon(node_1, {
				name: "coin",
				class: "coins-ico"
			});
			var input_1 = sibling(node_1, 2);
			remove_input_defaults(input_1);
			bind_this(input_1, ($$value) => set(input, $$value), () => get(input));
			var button = sibling(input_1, 4);
			Icon(child(button), {
				name: "close",
				width: 2
			});
			reset(button);
			reset(span);
			template_effect(() => {
				set_attribute(input_1, "max", max());
				set_attribute(input_1, "aria-label", label());
			});
			bind_value(input_1, value);
			delegated("click", button, hide);
			append($$anchor, span);
		};
		var alternate = ($$anchor) => {
			var button_1 = root_1$8();
			var node_3 = child(button_1);
			Icon(node_3, { name: "coin" });
			var text = sibling(node_3, 1, true);
			reset(button_1);
			template_effect(() => set_text(text, label()));
			delegated("click", button_1, show);
			append($$anchor, button_1);
		};
		if_block(node, ($$render) => {
			if (get(open)) $$render(consequent);
			else $$render(alternate, -1);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate(["click"]);
	var root$7 = from_html(`<img alt="" loading="lazy" crossorigin="anonymous"/>`);
	var root_1$7 = from_html(`<img alt="" loading="lazy"/>`);
	var root_2$5 = from_html(`<span aria-hidden="true"><!> <span class="cthumb-r"> </span></span>`);
	function CardThumb($$anchor, $$props) {
		push($$props, true);
		let shiny = prop($$props, "shiny", 3, false);
		let failed = state(false);
		const photo = user_derived(() => $$props.card.image_url && !get(failed) && !(settings.hideSensitive && $$props.card.nsfw_image));
		var span = root_2$5();
		let classes;
		var node = child(span);
		var consequent = ($$anchor) => {
			var img = root$7();
			template_effect(() => set_attribute(img, "src", $$props.card.image_url));
			event("error", img, () => set(failed, true));
			replay_events(img);
			append($$anchor, img);
		};
		var alternate = ($$anchor) => {
			var img_1 = root_1$7();
			template_effect(($0) => set_attribute(img_1, "src", $0), [() => rarityArt($$props.card, shiny())]);
			append($$anchor, img_1);
		};
		if_block(node, ($$render) => {
			if (get(photo)) $$render(consequent);
			else $$render(alternate, -1);
		});
		var text = only_child(sibling(node, 2), true);
		reset(span);
		template_effect(() => {
			classes = set_class(span, 1, "cthumb", null, classes, {
				art: !get(photo),
				shiny: shiny()
			});
			set_attribute(span, "data-r", $$props.card.rarity);
			set_text(text, $$props.card.rarity);
		});
		append($$anchor, span);
		pop();
	}
	var root$6 = from_html(`<span class="tab-n"> </span>`);
	var root_1$6 = from_html(`<span class="oside-total"> </span>`);
	var root_2$4 = from_html(`<span> </span>`);
	var root_3$4 = from_html(`<span class="oside-cat"> </span>`);
	var root_4$4 = from_html(`<li class="oside-row"><!> <span class="oside-txt"><b> </b> <span class="oside-sub"><!><!></span></span> <button class="oside-x" title="Retirer"><!></button></li>`);
	var root_5$4 = from_html(`<ul class="oside-list"></ul>`);
	var root_6$3 = from_html(`<button class="oside-hint"> </button>`);
	var root_7$3 = from_html(`<section class="oside"><header class="oside-head"><span> <!></span> <!></header> <!> <!></section>`);
	function OfferSide($$anchor, $$props) {
		push($$props, true);
		let coins = prop($$props, "coins", 15, 0), max = prop($$props, "max", 3, void 0);
		const value = user_derived(() => sideValue($$props.items, Math.max(0, Math.floor(+coins() || 0)), $$props.values));
		var section = root_7$3();
		var header = child(section);
		var span = child(header);
		var text = child(span, true);
		var node = sibling(text);
		var consequent = ($$anchor) => {
			var span_1 = root$6();
			var text_1 = only_child(span_1, true);
			template_effect(() => set_text(text_1, $$props.items.length));
			append($$anchor, span_1);
		};
		if_block(node, ($$render) => {
			if ($$props.items.length) $$render(consequent);
		});
		reset(span);
		var node_1 = sibling(span, 2);
		var consequent_1 = ($$anchor) => {
			var span_2 = root_1$6();
			var text_2 = only_child(span_2);
			template_effect(($0) => set_text(text_2, `${get(value).unknown ? "≈ " : ""}${$0 ?? ""} pts`), [() => nf(get(value).total)]);
			append($$anchor, span_2);
		};
		if_block(node_1, ($$render) => {
			if ($$props.items.length || get(value).total) $$render(consequent_1);
		});
		reset(header);
		var node_2 = sibling(header, 2);
		var consequent_4 = ($$anchor) => {
			var ul = root_5$4();
			each(ul, 21, () => $$props.items, (it) => it.userCardId, ($$anchor, it) => {
				const v = user_derived(() => $$props.values.get(get(it).card.id));
				var li = root_4$4();
				var node_3 = child(li);
				CardThumb(node_3, {
					get card() {
						return get(it).card;
					},
					get shiny() {
						return get(it).is_shiny;
					}
				});
				var span_3 = sibling(node_3, 2);
				var b = child(span_3);
				var text_3 = only_child(b, true);
				var span_4 = sibling(b, 2);
				var node_4 = child(span_4);
				var consequent_2 = ($$anchor) => {
					var span_5 = root_2$4();
					let classes;
					var text_4 = only_child(span_5, true);
					template_effect(($0) => {
						classes = set_class(span_5, 1, "oside-val", null, classes, { none: get(v) === null });
						set_text(text_4, $0);
					}, [() => get(v) === null ? "Non estimé" : nf(get(v))]);
					append($$anchor, span_5);
				};
				if_block(node_4, ($$render) => {
					if (get(v) !== void 0) $$render(consequent_2);
				});
				var node_5 = sibling(node_4);
				var consequent_3 = ($$anchor) => {
					var span_6 = root_3$4();
					var text_5 = only_child(span_6, true);
					template_effect(() => set_text(text_5, get(it).card.category));
					append($$anchor, span_6);
				};
				if_block(node_5, ($$render) => {
					if (get(it).card.category) $$render(consequent_3);
				});
				reset(span_4);
				reset(span_3);
				var button = sibling(span_3, 2);
				Icon(child(button), {
					name: "close",
					width: 2
				});
				reset(button);
				reset(li);
				template_effect(() => {
					set_attribute(span_3, "title", get(it).card.category ? `${get(it).card.title}, ${get(it).card.category}` : get(it).card.title);
					set_text(text_3, get(it).card.title);
					set_attribute(button, "aria-label", `Retirer ${get(it).card.title ?? ""}`);
				});
				delegated("click", button, () => $$props.onremove(get(it)));
				append($$anchor, li);
			});
			reset(ul);
			append($$anchor, ul);
		};
		var alternate = ($$anchor) => {
			var button_1 = root_6$3();
			var text_6 = only_child(button_1, true);
			template_effect(() => set_text(text_6, $$props.hint));
			delegated("click", button_1, function(...$$args) {
				$$props.onhint?.apply(this, $$args);
			});
			append($$anchor, button_1);
		};
		if_block(node_2, ($$render) => {
			if ($$props.items.length) $$render(consequent_4);
			else $$render(alternate, -1);
		});
		CoinsField(sibling(node_2, 2), {
			get max() {
				return max();
			},
			get label() {
				return $$props.coinsLabel;
			},
			get value() {
				return coins();
			},
			set value($$value) {
				coins($$value);
			}
		});
		reset(section);
		template_effect(() => set_text(text, $$props.label));
		append($$anchor, section);
		pop();
	}
	delegate(["click"]);
	var NO_PAGES = Object.freeze({
		loaded: -1,
		items: [],
		hasMore: false
	});
	function addPage(acc, page, d) {
		if (page === 0) return {
			loaded: 0,
			items: d.items,
			hasMore: !!d.hasMore
		};
		if (page !== acc.loaded + 1) return acc;
		return {
			loaded: page,
			items: [...acc.items, ...d.items],
			hasMore: !!d.hasMore
		};
	}
	var nextPage = (acc) => acc.loaded + 1;
	var root$5 = from_html(`<button class="friend"><!><b> </b></button>`);
	var root_1$5 = from_html(`<div class="empty"><b> </b><button class="btn">Réessayer</button></div>`);
	var root_2$3 = from_html(`<div class="empty"><b>Aucun ami pour l'instant.</b></div>`);
	var root_3$3 = from_html(`<div class="loading-more"><span class="spin"></span></div>`);
	var root_4$3 = from_html(`<p class="composer-sub">Avec qui voulez-vous échanger ?</p> <div class="friend-list"><!> <!></div>`, 1);
	var root_5$3 = from_html(`<span class="tab-n"> </span>`);
	var root_6$2 = from_html(`<div class="modal-tabs composer-tabs" role="tablist"><button role="tab">Mes cartes<!></button> <button role="tab"> <!></button></div>`);
	var root_7$2 = from_html(`<span class="modal-msg"> </span>`);
	var root_8$2 = from_html(`<span> </span>`);
	var root_9$2 = from_html(`<p class="offer-sum-empty">L'équilibre de l'échange s'affiche ici dès que vous choisissez des cartes.</p>`);
	var root_10$2 = from_html(`<div class="modal-msg"> </div>`);
	var root_11$2 = from_html(`<div class="composer-pick"><div class="composer-tab" role="tabpanel"><!></div> <div class="composer-tab" role="tabpanel"><!></div></div> <aside aria-label="Votre offre"><div class="offer-bar"><button class="offer-peek"><span class="offer-peek-txt"><b> </b><!></span> <!></button> <button class="btn primary"> </button></div> <div class="offer-panel"><h3 class="offer-title">Votre offre</h3> <div class="offer-sides"><!> <!></div> <div class="offer-sum"><!> <!></div> <div class="offer-actions"><button class="btn">Annuler</button> <button class="btn primary"> </button></div></div></aside>`, 1);
	var root_12$2 = from_html(`<div class="modal-backdrop" role="presentation"><div role="dialog" aria-modal="true" aria-labelledby="wm-compose-title" tabindex="-1"><button class="modal-close" aria-label="Fermer"><!></button> <header class="tm-head"><!> <h2 id="wm-compose-title"> </h2></header> <!></div></div>`);
	function TradeComposer($$anchor, $$props) {
		push($$props, true);
		let counter = prop($$props, "counter", 3, null), balance = prop($$props, "balance", 3, null);
		let friend = state(proxy(counter()?.other ?? null));
		let friends = state(null);
		let friendsError = state("");
		function loadFriends() {
			set(friends, null);
			set(friendsError, "");
			data.friends().then((f) => set(friends, f, true), (e) => set(friendsError, e.message || "Impossible de charger vos amis.", true));
		}
		if (!get(friend)) loadFriends();
		let mine = state(proxy([]));
		let myPending = state(proxy([]));
		let mineLoading = state(true);
		let mineError = state(false);
		const setMine = (d) => {
			set(mine, d.items, true);
			set(myPending, d.pending ?? [], true);
			set(mineLoading, false);
		};
		function loadMine() {
			set(mineLoading, true);
			set(mineError, false);
			loadCollection({ onCached: setMine }).then(setMine, () => {
				set(mineLoading, false);
				set(mineError, !get(mine).length);
			});
		}
		loadMine();
		let theirQuery = {};
		const theirPage = (page) => data.profileCollection(get(friend).username, {
			page,
			...theirQuery
		});
		const theirs = new PagedList((page) => page ? backgroundLane.run(() => theirPage(page)) : theirPage(page));
		const queryTheirs = (query) => {
			theirQuery = query;
			theirs.go(0);
		};
		const theirsFirst = user_derived(() => theirs.loading && theirs.page === 0);
		let theirPages = state(proxy(NO_PAGES));
		user_effect(() => {
			if (get(friend)) untrack(() => theirs.go(0));
		});
		user_effect(() => {
			const d = theirs.data;
			if (d) untrack(() => set(theirPages, addPage(get(theirPages), theirs.loaded, d), true));
		});
		const asItem = (row) => ({
			userCardId: row.id,
			card: row.card,
			is_shiny: row.is_shiny
		});
		let give = state(proxy(new Map((counter()?.give ?? []).map((it) => [it.userCardId, it]))));
		let get$1 = state(proxy(new Map((counter()?.get ?? []).map((it) => [it.userCardId, it]))));
		let giveCoins = state(proxy(counter()?.giveCoins ?? 0));
		let getCoins = state(proxy(counter()?.getCoins ?? 0));
		let tab = state("mine");
		let sheet = state(false);
		let busy = state(false);
		let msg = state("");
		const countered = new Set([...counter()?.give ?? [], ...counter()?.get ?? []].map((it) => it.userCardId));
		const lockedBut = (ids) => new Set([...ids].filter((id) => !countered.has(id)));
		const myLocked = user_derived(() => lockedBut(get(myPending)));
		const theirLocked = user_derived(() => lockedBut(theirs.data?.pending ?? []));
		const toggle = (map, row) => {
			const m = new Map(map);
			m.has(row.id) ? m.delete(row.id) : m.set(row.id, asItem(row));
			return m;
		};
		const without = (map, it) => {
			const m = new Map(map);
			m.delete(it.userCardId);
			return m;
		};
		const coins = (n) => Math.max(0, Math.floor(+n || 0));
		const cardValues = valueMap();
		const values = cardValues.values;
		const giveItems = user_derived(() => [...get(give).values()]);
		const getItems = user_derived(() => [...get(get$1).values()]);
		user_effect(() => cardValues.load([...get(giveItems), ...get(getItems)]));
		const v = user_derived(() => verdict(sideValue(get(giveItems), coins(get(giveCoins)), values), sideValue(get(getItems), coins(get(getCoins)), values)));
		const oneSided = user_derived(() => !(get(give).size || coins(get(giveCoins))) || !(get(get$1).size || coins(get(getCoins))));
		const tooPoor = user_derived(() => balance() != null && coins(get(giveCoins)) > balance());
		const summary = user_derived(() => offerSummary(get(give).size, coins(get(giveCoins)), get(get$1).size, coins(get(getCoins))));
		const blocked = user_derived(() => get(busy) || get(oneSided) || get(tooPoor));
		const sendTitle = user_derived(() => get(tooPoor) ? "Solde insuffisant" : get(oneSided) ? "Ajoutez au moins une carte ou des wb de chaque côté" : void 0);
		const sendLabel = user_derived(() => get(busy) ? "Envoi..." : counter() ? "Envoyer la contre-offre" : "Envoyer l'offre");
		const alert = user_derived(() => get(tooPoor) ? `Solde insuffisant : vous avez ${nf(balance())} wb.` : get(msg));
		const showTab = (t) => {
			set(tab, t, true);
			set(sheet, false);
		};
		async function send() {
			set(busy, true);
			set(msg, "");
			try {
				await sounded(() => withHumanCheck(() => data.proposeTrade({
					to: get(friend).id,
					give: get(giveItems),
					get: get(getItems),
					giveCoins: coins(get(giveCoins)),
					getCoins: coins(get(getCoins)),
					parentId: counter()?.id
				})));
				$$props.onsent?.(true);
				$$props.onclose?.();
			} catch (e) {
				set(msg, e.message, true);
				if (e.status != null) $$props.onsent?.(false);
			} finally {
				set(busy, false);
			}
		}
		const close = () => !get(busy) && $$props.onclose?.();
		const onKey = (e) => {
			if (e.key !== "Escape") return;
			if (get(sheet)) set(sheet, false);
			else close();
		};
		var div = root_12$2();
		event("keydown", $window, onKey);
		var div_1 = child(div);
		let classes;
		var button = child(div_1);
		Icon(child(button), {
			name: "close",
			width: 2,
			class: "x-ico"
		});
		reset(button);
		var header = sibling(button, 2);
		var node_1 = child(header);
		var consequent = ($$anchor) => {
			Avatar($$anchor, {
				get user() {
					return get(friend);
				},
				size: 36
			});
		};
		if_block(node_1, ($$render) => {
			if (get(friend)) $$render(consequent);
		});
		var text = only_child(sibling(node_1, 2), true);
		reset(header);
		var node_2 = sibling(header, 2);
		var consequent_4 = ($$anchor) => {
			var fragment_1 = root_4$3();
			var div_2 = sibling(first_child(fragment_1), 2);
			var node_3 = child(div_2);
			each(node_3, 17, () => get(friends) ?? [], (f) => f.id, ($$anchor, f) => {
				var button_1 = root$5();
				var node_4 = child(button_1);
				Avatar(node_4, {
					get user() {
						return get(f);
					},
					size: 52
				});
				var text_1 = only_child(sibling(node_4), true);
				reset(button_1);
				template_effect(() => set_text(text_1, get(f).username));
				delegated("click", button_1, () => set(friend, get(f), true));
				append($$anchor, button_1);
			});
			var node_5 = sibling(node_3, 2);
			var consequent_1 = ($$anchor) => {
				var div_3 = root_1$5();
				var b_1 = child(div_3);
				var text_2 = only_child(b_1, true);
				var button_2 = sibling(b_1);
				reset(div_3);
				template_effect(() => set_text(text_2, get(friendsError)));
				delegated("click", button_2, loadFriends);
				append($$anchor, div_3);
			};
			var consequent_2 = ($$anchor) => {
				append($$anchor, root_2$3());
			};
			var consequent_3 = ($$anchor) => {
				append($$anchor, root_3$3());
			};
			if_block(node_5, ($$render) => {
				if (get(friendsError)) $$render(consequent_1);
				else if (get(friends) && !get(friends).length) $$render(consequent_2, 1);
				else if (!get(friends)) $$render(consequent_3, 2);
			});
			reset(div_2);
			append($$anchor, fragment_1);
		};
		var alternate_2 = ($$anchor) => {
			var fragment_2 = root_11$2();
			var div_6 = first_child(fragment_2);
			{
				const tabs = ($$anchor) => {
					var div_7 = root_6$2();
					var button_3 = child(div_7);
					let classes_1;
					var node_6 = sibling(child(button_3));
					var consequent_5 = ($$anchor) => {
						var span = root_5$3();
						var text_3 = only_child(span, true);
						template_effect(() => set_text(text_3, get(give).size));
						append($$anchor, span);
					};
					if_block(node_6, ($$render) => {
						if (get(give).size) $$render(consequent_5);
					});
					reset(button_3);
					var button_4 = sibling(button_3, 2);
					let classes_2;
					var text_4 = child(button_4);
					var node_7 = sibling(text_4);
					var consequent_6 = ($$anchor) => {
						var span_1 = root_5$3();
						var text_5 = only_child(span_1, true);
						template_effect(() => set_text(text_5, get(get$1).size));
						append($$anchor, span_1);
					};
					if_block(node_7, ($$render) => {
						if (get(get$1).size) $$render(consequent_6);
					});
					reset(button_4);
					reset(div_7);
					template_effect(() => {
						set_attribute(button_3, "aria-selected", get(tab) === "mine");
						classes_1 = set_class(button_3, 1, "", null, classes_1, { on: get(tab) === "mine" });
						set_attribute(button_4, "aria-selected", get(tab) === "theirs");
						classes_2 = set_class(button_4, 1, "", null, classes_2, { on: get(tab) === "theirs" });
						set_text(text_4, `Cartes de ${get(friend).username ?? ""}`);
					});
					delegated("click", button_3, () => showTab("mine"));
					delegated("click", button_4, () => showTab("theirs"));
					append($$anchor, div_7);
				};
				var div_8 = child(div_6);
				CardPicker(child(div_8), {
					get lead() {
						return tabs;
					},
					get items() {
						return get(mine);
					},
					get picked() {
						return get(give);
					},
					get locked() {
						return get(myLocked);
					},
					get loading() {
						return get(mineLoading);
					},
					get error() {
						return get(mineError);
					},
					onretry: loadMine,
					onpick: (row) => set(give, toggle(get(give), row), true),
					get values() {
						return values;
					},
					get watch() {
						return cardValues.watch;
					},
					get load() {
						return cardValues.load;
					}
				});
				reset(div_8);
				var div_9 = sibling(div_8, 2);
				var node_9 = child(div_9);
				{
					let $0 = user_derived(() => theirs.error && theirs.page === 0);
					let $1 = user_derived(() => get(theirPages).hasMore ? () => theirs.go(nextPage(get(theirPages))) : null);
					let $2 = user_derived(() => theirs.loading && theirs.page > 0);
					let $3 = user_derived(() => theirs.error && theirs.page > 0);
					CardPicker(node_9, {
						get lead() {
							return tabs;
						},
						get items() {
							return get(theirPages).items;
						},
						get picked() {
							return get(get$1);
						},
						get locked() {
							return get(theirLocked);
						},
						get loading() {
							return get(theirsFirst);
						},
						get error() {
							return get($0);
						},
						onretry: () => theirs.go(0),
						onpick: (row) => set(get$1, toggle(get(get$1), row), true),
						get values() {
							return values;
						},
						get watch() {
							return cardValues.watch;
						},
						get load() {
							return cardValues.load;
						},
						get more() {
							return get($1);
						},
						get loadingMore() {
							return get($2);
						},
						get moreError() {
							return get($3);
						},
						onquery: queryTheirs
					});
				}
				reset(div_9);
				reset(div_6);
				template_effect(() => {
					set_attribute(div_8, "hidden", get(tab) !== "mine");
					set_attribute(div_9, "hidden", get(tab) !== "theirs");
				});
			}
			var aside = sibling(div_6, 2);
			let classes_3;
			var div_10 = child(aside);
			var button_5 = child(div_10);
			var span_2 = child(button_5);
			var b_2 = child(span_2);
			var text_6 = only_child(b_2, true);
			var node_10 = sibling(b_2);
			var consequent_7 = ($$anchor) => {
				var span_3 = root_7$2();
				var text_7 = only_child(span_3, true);
				template_effect(() => set_text(text_7, get(alert)));
				append($$anchor, span_3);
			};
			var alternate = ($$anchor) => {
				var span_4 = root_8$2();
				var text_8 = only_child(span_4, true);
				template_effect(($0) => {
					set_attribute(span_4, "data-k", get(summary) ? get(v).kind : null);
					set_text(text_8, $0);
				}, [() => get(summary) ? balanceLabel(get(v)) : "Choisissez des cartes de chaque côté"]);
				append($$anchor, span_4);
			};
			if_block(node_10, ($$render) => {
				if (get(alert)) $$render(consequent_7);
				else $$render(alternate, -1);
			});
			reset(span_2);
			Icon(sibling(span_2, 2), {
				name: "next",
				class: "offer-chev"
			});
			reset(button_5);
			var button_6 = sibling(button_5, 2);
			var text_9 = only_child(button_6, true);
			reset(div_10);
			var div_11 = sibling(div_10, 2);
			var div_12 = sibling(child(div_11), 2);
			var node_12 = child(div_12);
			{
				let $0 = user_derived(() => balance() ?? void 0);
				OfferSide(node_12, {
					get label() {
						return SIDE.give;
					},
					get items() {
						return get(giveItems);
					},
					get max() {
						return get($0);
					},
					coinsLabel: "Ajouter des WB",
					get values() {
						return values;
					},
					hint: "Choisissez dans Mes cartes",
					onhint: () => showTab("mine"),
					onremove: (it) => set(give, without(get(give), it), true),
					get coins() {
						return get(giveCoins);
					},
					set coins($$value) {
						set(giveCoins, $$value, true);
					}
				});
			}
			OfferSide(sibling(node_12, 2), {
				get label() {
					return SIDE.get;
				},
				get items() {
					return get(getItems);
				},
				coinsLabel: "Demander des WB",
				get values() {
					return values;
				},
				get hint() {
					return `Choisissez dans les cartes de ${get(friend).username ?? ""}`;
				},
				onhint: () => showTab("theirs"),
				onremove: (it) => set(get$1, without(get(get$1), it), true),
				get coins() {
					return get(getCoins);
				},
				set coins($$value) {
					set(getCoins, $$value, true);
				}
			});
			reset(div_12);
			action(div_12, ($$node, $$action_arg) => scrollFade?.($$node, $$action_arg), () => ({ axis: "y" }));
			var div_13 = sibling(div_12, 2);
			var node_14 = child(div_13);
			var consequent_8 = ($$anchor) => {
				TradeVerdict($$anchor, { get v() {
					return get(v);
				} });
			};
			var alternate_1 = ($$anchor) => {
				append($$anchor, root_9$2());
			};
			if_block(node_14, ($$render) => {
				if (get(summary)) $$render(consequent_8);
				else $$render(alternate_1, -1);
			});
			var node_15 = sibling(node_14, 2);
			var consequent_9 = ($$anchor) => {
				var div_14 = root_10$2();
				var text_10 = only_child(div_14, true);
				template_effect(() => set_text(text_10, get(alert)));
				append($$anchor, div_14);
			};
			if_block(node_15, ($$render) => {
				if (get(alert)) $$render(consequent_9);
			});
			reset(div_13);
			var div_15 = sibling(div_13, 2);
			var button_7 = child(div_15);
			var button_8 = sibling(button_7, 2);
			var text_11 = only_child(button_8, true);
			reset(div_15);
			reset(div_11);
			reset(aside);
			template_effect(() => {
				classes_3 = set_class(aside, 1, "offer", null, classes_3, { open: get(sheet) });
				set_attribute(button_5, "aria-expanded", get(sheet));
				set_text(text_6, get(summary) ?? "Votre offre");
				button_6.disabled = get(blocked);
				set_attribute(button_6, "title", get(sendTitle));
				set_text(text_9, get(busy) ? "Envoi..." : "Envoyer");
				button_7.disabled = get(busy);
				button_8.disabled = get(blocked);
				set_attribute(button_8, "title", get(sendTitle));
				set_text(text_11, get(sendLabel));
			});
			delegated("click", button_5, () => set(sheet, !get(sheet)));
			delegated("click", button_6, send);
			delegated("click", button_7, close);
			delegated("click", button_8, send);
			append($$anchor, fragment_2);
		};
		if_block(node_2, ($$render) => {
			if (!get(friend)) $$render(consequent_4);
			else $$render(alternate_2, -1);
		});
		reset(div_1);
		action(div_1, ($$node) => anchorCentered?.($$node));
		reset(div);
		template_effect(() => {
			classes = set_class(div_1, 1, "modal composer", null, classes, { "pick-friend": !get(friend) });
			button.disabled = get(busy);
			set_text(text, !get(friend) ? "Proposer un échange" : counter() ? `Contre-offre à ${get(friend).username}` : `Échanger avec ${get(friend).username}`);
		});
		delegated("click", div, close);
		delegated("click", div_1, (e) => e.stopPropagation());
		delegated("click", button, close);
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var root$4 = from_html(`<div class="tr-empty"><span class="tr-empty-ico"><!></span> <b> </b> <span> </span> <button class="btn primary">Proposer un échange</button></div>`);
	var root_1$4 = from_html(`<div class="empty"><b>Échanges indisponibles pour le moment.</b><button class="btn">Réessayer</button></div>`);
	var root_2$2 = from_html(`<span class="tab-n"> </span>`);
	var root_3$2 = from_html(`<button role="tab"> <!></button>`);
	var root_4$2 = from_html(`<div class="tr-row sk"></div>`);
	var root_5$2 = from_html(`<div class="tr-rows"></div>`);
	var root_6$1 = from_html(`<div class="tr-col-empty"><p class="tr-col-none">Rien ici pour l'instant.</p><!></div>`);
	var root_7$1 = from_html(`<span class="tr-row-rounds"> </span>`);
	var root_8$1 = from_html(`<span class="trade-status"> </span>`);
	var root_9$1 = from_html(`<span class="tr-badge"> </span>`);
	var root_10$1 = from_html(`<button><!> <span class="tr-row-main"><span class="tr-row-top"><b> </b><span class="tr-row-when nowrap"> </span></span> <span class="tr-row-line"> <!></span></span> <!></button>`);
	var root_11$1 = from_html(`<div class="tr-pane-sk"><div class="sk-line"></div><div class="sk-cards"><div class="wc skeleton"></div><div class="wc skeleton"></div></div></div>`);
	var root_12$1 = from_html(`<div><aside class="tr-col" aria-label="Vos échanges"><div class="tabs tr-tabs" role="tablist"></div> <!></aside> <div class="tr-pane"><!></div></div>`);
	var root_13$1 = from_html(`<div class="coll-head tr-head"><div><h1>Échanges</h1><div class="meta">Vos offres avec vos amis</div></div> <button class="btn primary"><!> Proposer un échange</button></div> <!> <!>`, 1);
	function Trades($$anchor, $$props) {
		push($$props, true);
		const emptyState = ($$anchor) => {
			var div = root$4();
			var span = child(div);
			Icon(child(span), { name: "trades" });
			reset(span);
			var b_1 = sibling(span, 2);
			var text = only_child(b_1, true);
			var span_1 = sibling(b_1, 2);
			var text_1 = only_child(span_1, true);
			var button = sibling(span_1, 2);
			reset(div);
			template_effect(() => {
				set_text(text, EMPTY[get(tab)][0]);
				set_text(text_1, EMPTY[get(tab)][1]);
			});
			delegated("click", button, () => set(compose, { counter: null }));
			append($$anchor, div);
		};
		const TABS = [
			["incoming", "Reçues"],
			["outgoing", "Envoyées"],
			["history", "Historique"]
		];
		const EMPTY = {
			incoming: ["Aucune offre reçue en attente.", "Les offres de vos amis apparaîtront ici."],
			outgoing: ["Aucune offre envoyée en attente.", "Proposez un échange à un ami pour commencer."],
			history: ["Aucun échange terminé pour l'instant.", "Les offres acceptées, refusées ou annulées apparaîtront ici."]
		};
		let tab = state("incoming");
		let trades = state(null);
		let error = state(false);
		const cardValues = valueMap();
		const values = cardValues.values;
		let picks = proxy({
			incoming: null,
			outgoing: null,
			history: null
		});
		let reading = state(false);
		let mode = state("trade");
		let compose = state(null);
		let rowsEl = state(null);
		async function load(quiet = false) {
			try {
				set(trades, await data.trades({ quiet }), true);
				set(error, false);
			} catch {
				if (!get(trades)) set(error, true);
			}
		}
		load();
		user_effect(() => {
			const t = setInterval(() => document.visibilityState === "visible" && load(true), 2e4);
			return () => clearInterval(t);
		});
		user_effect(() => cardValues.load((get(trades) || []).flatMap((t) => [...t.give, ...t.get])));
		const tabs = user_derived(() => get(trades) ? tradeTabs(get(trades)) : null);
		const shown = user_derived(() => get(tabs)?.[get(tab)] ?? null);
		const selected = user_derived(() => get(shown) && (get(trades).find((t) => t.id === picks[get(tab)]) ?? get(shown)[0] ?? null));
		const balance = (t) => verdict(sideValue(t.give, t.giveCoins, values), sideValue(t.get, t.getCoins, values));
		const tabOf = (t) => t.status !== "pending" ? "history" : t.incoming ? "incoming" : "outgoing";
		function select(t, open = true) {
			if (!t) return;
			picks[get(tab)] = t.id;
			if (open) set(reading, true);
		}
		function changed() {
			load();
			$$props.onwallet?.();
		}
		function done(t) {
			const next = afterLeaving(get(shown), t.id);
			picks[get(tab)] = next?.id ?? null;
			if (!next) set(reading, false);
			changed();
		}
		const sent = (ok) => ok && get(compose)?.counter ? done(get(compose).counter) : changed();
		function openTrade(t) {
			const full = get(trades)?.find((x) => x.id === t.id) ?? t;
			set(tab, tabOf(full), true);
			picks[get(tab)] = full.id;
			set(mode, "trade");
		}
		async function onRowsKey(e) {
			if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
			e.preventDefault();
			const t = stepIn(get(shown), get(selected)?.id, e.key === "ArrowDown" ? 1 : -1);
			if (!t) return;
			select(t, false);
			await tick();
			get(rowsEl)?.querySelector(`[data-id="${CSS.escape(t.id)}"]`)?.focus();
		}
		var fragment = root_13$1();
		var div_1 = first_child(fragment);
		var button_1 = sibling(child(div_1), 2);
		Icon(child(button_1), { name: "trades" });
		next();
		reset(button_1);
		reset(div_1);
		var node_2 = sibling(div_1, 2);
		var consequent = ($$anchor) => {
			var div_2 = root_1$4();
			var button_2 = sibling(child(div_2));
			reset(div_2);
			delegated("click", button_2, () => load());
			append($$anchor, div_2);
		};
		var alternate_3 = ($$anchor) => {
			var div_3 = root_12$1();
			let classes;
			var aside = child(div_3);
			var div_4 = child(aside);
			each(div_4, 21, () => TABS, index, ($$anchor, $$item) => {
				var $$array = user_derived(() => to_array(get($$item), 2));
				let id = () => get($$array)[0];
				let label = () => get($$array)[1];
				var button_3 = root_3$2();
				let classes_1;
				var text_2 = child(button_3, true);
				var node_3 = sibling(text_2);
				var consequent_1 = ($$anchor) => {
					var span_2 = root_2$2();
					var text_3 = only_child(span_2, true);
					template_effect(() => set_text(text_3, get(tabs)[id()].length));
					append($$anchor, span_2);
				};
				if_block(node_3, ($$render) => {
					if (get(tabs) && id() !== "history" && get(tabs)[id()].length) $$render(consequent_1);
				});
				reset(button_3);
				template_effect(() => {
					set_attribute(button_3, "aria-selected", get(tab) === id());
					classes_1 = set_class(button_3, 1, "", null, classes_1, { on: get(tab) === id() });
					set_text(text_2, label());
				});
				delegated("click", button_3, () => {
					set(tab, id(), true);
					set(reading, false);
				});
				append($$anchor, button_3);
			});
			reset(div_4);
			var node_4 = sibling(div_4, 2);
			var consequent_2 = ($$anchor) => {
				var div_5 = root_5$2();
				each(div_5, 20, () => Array(4), index, ($$anchor, _) => {
					append($$anchor, root_4$2());
				});
				reset(div_5);
				append($$anchor, div_5);
			};
			var consequent_3 = ($$anchor) => {
				var div_7 = root_6$1();
				var node_5 = sibling(child(div_7));
				emptyState(node_5);
				reset(div_7);
				append($$anchor, div_7);
			};
			var alternate_1 = ($$anchor) => {
				var div_8 = root_5$2();
				each(div_8, 21, () => get(shown), (t) => t.id, ($$anchor, t) => {
					const b = user_derived(() => balance(get(t)));
					const rounds = user_derived(() => chainOf(get(t), get(trades)).length);
					var button_4 = root_10$1();
					let classes_2;
					var node_6 = child(button_4);
					Avatar(node_6, {
						get user() {
							return get(t).other;
						},
						size: 40
					});
					var span_3 = sibling(node_6, 2);
					var span_4 = child(span_3);
					var b_2 = child(span_4);
					var text_4 = only_child(b_2, true);
					var text_5 = only_child(sibling(b_2), true);
					reset(span_4);
					var span_6 = sibling(span_4, 2);
					var text_6 = child(span_6, true);
					var node_7 = sibling(text_6);
					var consequent_4 = ($$anchor) => {
						var span_7 = root_7$1();
						var text_7 = only_child(span_7);
						template_effect(() => set_text(text_7, `· ${get(rounds) ?? ""} offres`));
						append($$anchor, span_7);
					};
					if_block(node_7, ($$render) => {
						if (get(rounds) > 1) $$render(consequent_4);
					});
					reset(span_6);
					reset(span_3);
					var node_8 = sibling(span_3, 2);
					var consequent_5 = ($$anchor) => {
						var span_8 = root_8$1();
						var text_8 = only_child(span_8, true);
						template_effect(($0) => {
							set_attribute(span_8, "data-s", get(t).status);
							set_text(text_8, $0);
						}, [() => statusLabel(get(t).status)]);
						append($$anchor, span_8);
					};
					var alternate = ($$anchor) => {
						var span_9 = root_9$1();
						var text_9 = only_child(span_9, true);
						template_effect(($0, $1) => {
							set_attribute(span_9, "data-k", get(b).kind);
							set_attribute(span_9, "title", $0);
							set_text(text_9, $1);
						}, [() => balanceLabel(get(b)), () => balanceBadge(get(b))]);
						append($$anchor, span_9);
					};
					if_block(node_8, ($$render) => {
						if (get(tab) === "history") $$render(consequent_5);
						else $$render(alternate, -1);
					});
					reset(button_4);
					template_effect(($0, $1, $2, $3) => {
						classes_2 = set_class(button_4, 1, "tr-row", null, classes_2, { on: get(selected)?.id === get(t).id });
						set_attribute(button_4, "data-id", get(t).id);
						set_attribute(button_4, "aria-current", get(selected)?.id === get(t).id ? "true" : void 0);
						set_attribute(button_4, "aria-label", `Échange avec ${get(t).other.username ?? ""}, ${$0 ?? ""}, ${$1 ?? ""}`);
						set_text(text_4, get(t).other.username);
						set_text(text_5, $2);
						set_text(text_6, $3);
					}, [
						() => dealLine(get(t).give.length, get(t).giveCoins, get(t).get.length, get(t).getCoins),
						() => balanceLabel(get(b)),
						() => ago(get(t).updatedAt),
						() => dealLine(get(t).give.length, get(t).giveCoins, get(t).get.length, get(t).getCoins)
					]);
					delegated("click", button_4, () => select(get(t)));
					append($$anchor, button_4);
				});
				reset(div_8);
				bind_this(div_8, ($$value) => set(rowsEl, $$value), () => get(rowsEl));
				delegated("keydown", div_8, onRowsKey);
				append($$anchor, div_8);
			};
			if_block(node_4, ($$render) => {
				if (!get(shown)) $$render(consequent_2);
				else if (!get(shown).length) $$render(consequent_3, 1);
				else $$render(alternate_1, -1);
			});
			reset(aside);
			var div_9 = sibling(aside, 2);
			var node_9 = child(div_9);
			var consequent_6 = ($$anchor) => {
				append($$anchor, root_11$1());
			};
			var consequent_7 = ($$anchor) => {
				var fragment_1 = comment();
				key(first_child(fragment_1), () => get(selected).id, ($$anchor) => {
					TradePane($$anchor, {
						get trade() {
							return get(selected);
						},
						get all() {
							return get(trades);
						},
						get values() {
							return values;
						},
						onback: () => set(reading, false),
						ondone: done,
						onchanged: changed,
						oncounter: (t) => set(compose, { counter: t }),
						onopentrade: openTrade,
						get mode() {
							return get(mode);
						},
						set mode($$value) {
							set(mode, $$value, true);
						}
					});
				});
				append($$anchor, fragment_1);
			};
			var alternate_2 = ($$anchor) => {
				emptyState($$anchor);
			};
			if_block(node_9, ($$render) => {
				if (!get(shown)) $$render(consequent_6);
				else if (get(selected)) $$render(consequent_7, 1);
				else $$render(alternate_2, -1);
			});
			reset(div_9);
			reset(div_3);
			template_effect(() => classes = set_class(div_3, 1, "tr-split", null, classes, { reading: get(reading) && get(selected) }));
			append($$anchor, div_3);
		};
		if_block(node_2, ($$render) => {
			if (get(error)) $$render(consequent);
			else $$render(alternate_3, -1);
		});
		var node_11 = sibling(node_2, 2);
		var consequent_8 = ($$anchor) => {
			{
				let $0 = user_derived(() => $$props.profile?.currency ?? null);
				TradeComposer($$anchor, {
					get counter() {
						return get(compose).counter;
					},
					get balance() {
						return get($0);
					},
					onclose: () => set(compose, null),
					onsent: sent
				});
			}
		};
		if_block(node_11, ($$render) => {
			if (get(compose)) $$render(consequent_8);
		});
		delegated("click", button_1, () => set(compose, { counter: null }));
		append($$anchor, fragment);
		pop();
	}
	delegate(["click", "keydown"]);
	var root$3 = from_html(`<span class="loadcap-t"> </span>`);
	var root_1$3 = from_html(`<div aria-hidden="true"></div> <div role="status" aria-live="polite"><span class="spin"></span> <span class="loadcap-txt"> </span> <!></div>`, 1);
	function LoadBar($$anchor, $$props) {
		push($$props, true);
		const BAR_AFTER = 150;
		const CAPTION_AFTER = 1e3;
		const COUNT_AFTER = 3e3;
		const SLOW_AFTER = 6e3;
		let snap = state(null);
		let now = state(proxy(Date.now()));
		let last = state(null);
		user_effect(() => activity.subscribe((s) => {
			set(snap, s, true);
			if (s) set(last, s, true);
		}));
		user_effect(() => {
			if (!get(snap)) return;
			const t = setInterval(() => set(now, Date.now(), true), 250);
			return () => clearInterval(t);
		});
		const elapsed = user_derived(() => get(snap) ? get(now) - get(snap).since : 0);
		const showBar = user_derived(() => !!get(snap) && get(elapsed) >= BAR_AFTER);
		const showCaption = user_derived(() => !!get(snap) && get(elapsed) >= CAPTION_AFTER);
		const text = user_derived(() => {
			const s = get(snap) || get(last);
			if (!s) return "";
			if (s.retry) return `${s.label}, nouvelle tentative ${s.retry.attempt}/${s.retry.max}`;
			if (get(elapsed) >= SLOW_AFTER) return `${s.label}, le serveur du jeu est lent`;
			return `${s.label}...`;
		});
		var fragment = root_1$3();
		var div = first_child(fragment);
		let classes;
		var div_1 = sibling(div, 2);
		let classes_1;
		var span = sibling(child(div_1), 2);
		var text_1 = only_child(span, true);
		var node = sibling(span, 2);
		var consequent = ($$anchor) => {
			var span_1 = root$3();
			var text_2 = only_child(span_1);
			template_effect(($0) => set_text(text_2, `${$0 ?? ""} s`), [() => Math.floor(get(elapsed) / 1e3)]);
			append($$anchor, span_1);
		};
		if_block(node, ($$render) => {
			if (get(elapsed) >= COUNT_AFTER) $$render(consequent);
		});
		reset(div_1);
		template_effect(() => {
			classes = set_class(div, 1, "loadbar", null, classes, { on: get(showBar) });
			classes_1 = set_class(div_1, 1, "loadcap", null, classes_1, {
				on: get(showCaption),
				slow: get(snap)?.retry || get(elapsed) >= SLOW_AFTER
			});
			set_text(text_1, get(text));
		});
		append($$anchor, fragment);
		pop();
	}
	var root$2 = from_html(`<div class="notif-scrim"></div> <div class="snd-panel" role="dialog" aria-label="Son"><div class="snd-head"><b>Son</b> <button class="snd-switch" role="switch" aria-label="Activer le son"><span></span></button></div> <label><!> <input type="range" min="0" max="100" step="5" aria-label="Volume"/> <!> <output> </output></label> <p class="snd-note"> </p></div>`, 1);
	var root_1$2 = from_html(`<div class="snd"><button><!></button> <!></div>`);
	function SoundControl($$anchor, $$props) {
		push($$props, true);
		let on = state(true);
		let vol = state(.7);
		let open = state(false);
		user_effect(() => onSoundChange((v) => set(on, v, true)));
		user_effect(() => onVolumeChange((v) => set(vol, v, true)));
		const pct = user_derived(() => Math.round(get(vol) * 100));
		const icon = user_derived(() => !get(on) || get(vol) === 0 ? "mute" : get(vol) < .4 ? "soundLow" : "sound");
		const label = user_derived(() => !get(on) || get(vol) === 0 ? "Son coupé" : `Son : ${get(pct)} %`);
		function slide(e) {
			setVolume(e.currentTarget.value / 100);
			if (!get(on)) setSoundOn(true);
		}
		var div = root_1$2();
		event("keydown", $window, (e) => {
			if (get(open) && e.key === "Escape") set(open, false);
		});
		var button = child(div);
		let classes;
		Icon(child(button), {
			get name() {
				return get(icon);
			},
			width: 1.7
		});
		reset(button);
		var node_1 = sibling(button, 2);
		var consequent = ($$anchor) => {
			var fragment = root$2();
			var div_1 = first_child(fragment);
			var div_2 = sibling(div_1, 2);
			var div_3 = child(div_2);
			var button_1 = sibling(child(div_3), 2);
			reset(div_3);
			var label_1 = sibling(div_3, 2);
			let classes_1;
			var node_2 = child(label_1);
			Icon(node_2, { name: "soundLow" });
			var input = sibling(node_2, 2);
			remove_input_defaults(input);
			var node_3 = sibling(input, 2);
			Icon(node_3, { name: "sound" });
			var text = only_child(sibling(node_3, 2));
			reset(label_1);
			var text_1 = only_child(sibling(label_1, 2), true);
			reset(div_2);
			template_effect(() => {
				set_attribute(button_1, "aria-checked", get(on));
				classes_1 = set_class(label_1, 1, "snd-vol", null, classes_1, { off: !get(on) });
				set_value(input, get(pct));
				set_attribute(input, "aria-valuetext", `${get(pct) ?? ""} %`);
				set_text(text, `${get(pct) ?? ""} %`);
				set_text(text_1, get(on) ? "Ouverture des paquets, révélations, sélection et confirmations." : "Tous les sons du remaster sont coupés, comme sur le site original.");
			});
			delegated("click", div_1, () => set(open, false));
			delegated("click", button_1, () => {
				setSoundOn(!get(on));
				if (!get(on)) play("tick");
			});
			delegated("input", input, slide);
			delegated("change", input, () => play("success"));
			append($$anchor, fragment);
		};
		if_block(node_1, ($$render) => {
			if (get(open)) $$render(consequent);
		});
		reset(div);
		template_effect(() => {
			classes = set_class(button, 1, "bell", null, classes, { has: get(on) && get(vol) > 0 });
			set_attribute(button, "aria-label", get(label));
			set_attribute(button, "title", get(label));
			set_attribute(button, "aria-expanded", get(open));
		});
		delegated("click", button, () => set(open, !get(open)));
		append($$anchor, div);
		pop();
	}
	delegate([
		"click",
		"input",
		"change"
	]);
	var SITE_KEY = "0x4AAAAAAEW_2IAWonrk_N5i";
	var loading = null;
	function loadTurnstile() {
		if (window.turnstile) return Promise.resolve(window.turnstile);
		loading ??= new Promise((resolve, reject) => {
			const s = document.createElement("script");
			s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
			s.async = true;
			const nonce = document.querySelector("script[nonce]")?.nonce;
			if (nonce) s.nonce = nonce;
			s.onload = () => window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile indisponible"));
			s.onerror = () => {
				loading = null;
				reject(new Error("Turnstile indisponible"));
			};
			document.head.appendChild(s);
		});
		return loading;
	}
	var root$1 = from_html(`<p class="modal-msg">La vérification ne peut pas s'afficher ici.</p> <button class="btn primary">Ouvrir la version originale pour valider</button>`, 1);
	var root_1$1 = from_html(`<div class="hc-box"></div>`);
	var root_2$1 = from_html(`<button class="btn primary">Je ne suis pas un robot</button>`);
	var root_3$1 = from_html(`<p class="hc-sub"><span class="spin"></span> Vérification...</p>`);
	var root_4$1 = from_html(`<p class="modal-msg"> </p>`);
	var root_5$1 = from_html(`<div class="modal-backdrop hc-backdrop" role="presentation"><div class="modal hc" role="dialog" aria-modal="true" aria-labelledby="wm-hc-title" tabindex="-1"><h2 class="hc-title" id="wm-hc-title">Vérification rapide</h2> <p class="hc-sub">Le jeu demande de temps en temps de confirmer que vous êtes humain. Votre action reprendra toute seule.</p> <!> <!> <!> <button class="link-btn hc-cancel">Annuler</button></div></div>`);
	function HumanCheck($$anchor, $$props) {
		push($$props, true);
		let open = state(false);
		user_effect(() => human.subscribe((v) => set(open, v, true)));
		let box = state(null);
		let error = state("");
		let busy = state(false);
		let failed = state(false);
		const FAILED = "La vérification a échoué. Réessayez.";
		async function verify(token) {
			set(busy, true);
			set(error, "");
			try {
				await data.humanCheck(token);
				resolveHuman(true);
			} catch (e) {
				set(error, e.message || FAILED, true);
			} finally {
				set(busy, false);
			}
		}
		user_effect(() => {
			if (!get(open) || !get(box) || !data.isReal) return;
			let id = null;
			loadTurnstile().then((ts) => {
				id = ts.render(get(box), {
					sitekey: SITE_KEY,
					theme: "dark",
					appearance: "interaction-only",
					callback: verify,
					"error-callback": () => set(error, FAILED)
				});
			}, () => set(failed, true));
			return () => {
				if (id != null) window.turnstile?.remove(id);
			};
		});
		var fragment = comment();
		event("keydown", $window, (e) => get(open) && e.key === "Escape" && resolveHuman(false));
		var node = first_child(fragment);
		var consequent_4 = ($$anchor) => {
			var div = root_5$1();
			var div_1 = child(div);
			var node_1 = sibling(child(div_1), 4);
			var consequent = ($$anchor) => {
				var fragment_1 = root$1();
				delegated("click", sibling(first_child(fragment_1), 2), () => useOriginalSite());
				append($$anchor, fragment_1);
			};
			var consequent_1 = ($$anchor) => {
				var div_2 = root_1$1();
				bind_this(div_2, ($$value) => set(box, $$value), () => get(box));
				append($$anchor, div_2);
			};
			var alternate = ($$anchor) => {
				var button_1 = root_2$1();
				template_effect(() => button_1.disabled = get(busy));
				delegated("click", button_1, () => verify("dev-token"));
				append($$anchor, button_1);
			};
			if_block(node_1, ($$render) => {
				if (get(failed)) $$render(consequent);
				else if (data.isReal) $$render(consequent_1, 1);
				else $$render(alternate, -1);
			});
			var node_2 = sibling(node_1, 2);
			var consequent_2 = ($$anchor) => {
				append($$anchor, root_3$1());
			};
			if_block(node_2, ($$render) => {
				if (get(busy)) $$render(consequent_2);
			});
			var node_3 = sibling(node_2, 2);
			var consequent_3 = ($$anchor) => {
				var p_1 = root_4$1();
				var text = only_child(p_1, true);
				template_effect(() => set_text(text, get(error)));
				append($$anchor, p_1);
			};
			if_block(node_3, ($$render) => {
				if (get(error)) $$render(consequent_3);
			});
			var button_2 = sibling(node_3, 2);
			reset(div_1);
			action(div_1, ($$node) => anchorCentered?.($$node));
			reset(div);
			delegated("click", div, () => resolveHuman(false));
			delegated("click", div_1, (e) => e.stopPropagation());
			delegated("click", button_2, () => resolveHuman(false));
			append($$anchor, div);
		};
		if_block(node, ($$render) => {
			if (get(open)) $$render(consequent_4);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate(["click"]);
	var root = from_html(`<button type="button"><!> </button>`);
	var root_1 = from_html(`<a><!><span class="nav-lbl"> </span></a>`);
	var root_2 = from_html(`<button class="ghost">Réinitialiser</button>`);
	var root_3 = from_html(`<span class="health" role="status" title="Le serveur du jeu répond mal : nouvelle tentative automatique, vos données restent affichées."><span class="health-dot"></span><span class="health-txt">Serveur du jeu instable</span></span>`);
	var root_4 = from_html(`<span class="bell-badge"> </span>`);
	var root_5 = from_html(`<span class="notif-count"> </span> <button class="link-btn">Tout marquer comme lu</button>`, 1);
	var root_6 = from_html(`<span class="notif-dot"></span>`);
	var root_7 = from_html(`<div class="notif-msg"> </div>`);
	var root_8 = from_html(`<!> <div class="notif-body"><div class="notif-title"> </div> <!> <div class="notif-time"> </div></div>`, 1);
	var root_9 = from_html(`<div class="notif-empty">Aucune notification</div>`);
	var root_10 = from_html(`<div class="notif-scrim"></div> <div class="notif-panel" role="dialog" aria-label="Notifications"><div class="notif-head">Notifications<!></div> <!></div>`, 1);
	var root_11 = from_html(`<span class="badge pro">Pro</span>`);
	var root_12 = from_html(`<span> </span>`);
	var root_13 = from_html(`<!> <div><b> </b><!></div>`, 1);
	var root_14 = from_html(`<div class="toast-wrap" role="presentation"><!> <button class="toast-x" aria-label="Fermer la notification" title="Fermer"><!></button></div>`);
	var root_15 = from_html(`<div class="toasts" role="status" aria-live="polite"></div>`);
	var root_16 = from_html(`<div class="kbd-row"><span class="kbd"> </span> </div>`);
	var root_17 = from_html(`<div class="kbd-help-scrim"><div class="kbd-help" role="dialog" aria-label="Raccourcis clavier"><h3>Raccourcis clavier</h3> <!></div></div>`);
	var root_18 = from_html(`<div class="app"><!> <aside class="side"><div class="brand"><span class="mk"></span><b>WikiMasters</b></div> <nav class="nav"><!> <div class="nav-sep">Le reste du site</div> <div class="nav-grid"></div></nav> <div class="side-foot"><!> <button class="foot-link"><span class="kbd">?</span>Raccourcis clavier</button> <div class="hintline"> </div></div></aside> <main class="main"><header class="topbar"><div class="crumb"> </div> <div class="wallet"><!> <!> <div class="notif"><button aria-label="Notifications"><!> <!></button> <!></div> <!> <span class="chip" title="Paquets"><!><b> </b><span class="chip-cap"> </span></span> <span class="chip" title="WikiBidous"><!><b> </b></span></div></header> <section class="view"><!></section></main> <!> <!> <!></div>`);
	function App($$anchor, $$props) {
		push($$props, true);
		const VIEWS = [
			{
				id: "pulls",
				path: "/pulls",
				label: "Ouvrir des paquets",
				icon: "pulls"
			},
			{
				id: "collection",
				path: "/collection",
				label: "Ma collection",
				icon: "collection"
			},
			{
				id: "catalog",
				path: "/global-collection",
				label: "Toutes les cartes",
				icon: "catalog"
			},
			{
				id: "market",
				path: "/marketplace",
				label: "Marché",
				icon: "market"
			},
			{
				id: "trades",
				path: "/trades",
				label: "Échanges",
				icon: "trades"
			}
		];
		const NATIVE = [
			[
				"/battle",
				"Duels",
				"battle"
			],
			[
				"/guild",
				"Guilde",
				"guild"
			],
			[
				"/friends",
				"Amis",
				"friends"
			],
			[
				"/dms",
				"Messages",
				"dms"
			],
			[
				"/leaderboard",
				"Classement",
				"leaderboard"
			],
			[
				"/achievements",
				"Succès",
				"achievements"
			],
			[
				"/profile",
				"Profil",
				"profile"
			],
			[
				"/settings",
				"Paramètres",
				"settings"
			]
		];
		const viewFromPath = () => ([
			"catalog",
			"market",
			"collection",
			"trades"
		].map((id) => VIEWS.find((v) => v.id === id)).find((v) => location.pathname.startsWith(v.path)) || VIEWS[0]).id;
		let view = state(proxy(viewFromPath()));
		const auctionFromPath = () => location.pathname.match(/^\/marketplace\/([^/]+)/)?.[1] ?? null;
		let openAuction = state(proxy(auctionFromPath()));
		const current = user_derived(() => VIEWS.find((v) => v.id === get(view)));
		let navEl = state(void 0);
		user_effect(() => {
			get(view);
			const b = get(navEl)?.querySelector("button.on");
			if (!b || get(navEl).scrollWidth <= get(navEl).clientWidth) return;
			const n = get(navEl).getBoundingClientRect(), r = b.getBoundingClientRect();
			get(navEl).scrollTo({ left: get(navEl).scrollLeft + r.left - n.left - (n.width - r.width) / 2 });
		});
		function go(v) {
			set(view, v.id, true);
			if (location.pathname !== v.path) history.pushState({}, "", v.path);
		}
		user_effect(() => {
			const onRoute = () => {
				set(view, viewFromPath(), true);
				set(openAuction, auctionFromPath(), true);
			};
			window.addEventListener("wm:route", onRoute);
			return () => window.removeEventListener("wm:route", onRoute);
		});
		let profile = state(null);
		const loadProfile = () => data.profile().then((p) => set(profile, p, true), () => {});
		loadProfile();
		user_effect(() => {
			window.addEventListener("wm:profile", loadProfile);
			return () => window.removeEventListener("wm:profile", loadProfile);
		});
		let collKey = state(0);
		function onchanged() {
			loadProfile();
			update(collKey);
		}
		async function reset$1() {
			await data.reset();
			onchanged();
			go(VIEWS[0]);
		}
		let unstable = state(health.state === "unstable");
		user_effect(() => health.subscribe((s) => set(unstable, s === "unstable")));
		let notifs = state(proxy([]));
		let notifOpen = state(false);
		let toasts = state(proxy([]));
		const unread = user_derived(() => get(notifs).filter((n) => !n.read));
		let seen = null;
		async function loadNotifs() {
			const list = await data.notifications().catch(() => null);
			if (!list) return;
			if (seen) {
				for (const n of list) if (!n.read && !seen.has(n.id)) toast(n);
			}
			seen = new Set(list.map((n) => n.id));
			set(notifs, list, true);
		}
		loadNotifs();
		user_effect(() => {
			const t = setInterval(() => document.visibilityState === "visible" && loadNotifs(), 3e4);
			return () => clearInterval(t);
		});
		const toastTimers = new Map();
		const dismiss = (n) => {
			clearTimeout(toastTimers.get(n.id));
			toastTimers.delete(n.id);
			set(toasts, get(toasts).filter((t) => t.id !== n.id), true);
		};
		const hideLater = (n, ms) => {
			clearTimeout(toastTimers.get(n.id));
			toastTimers.set(n.id, setTimeout(() => dismiss(n), ms));
		};
		function toast(n) {
			set(toasts, [...get(toasts), n].slice(-3), true);
			hideLater(n, 8e3);
		}
		const baseTitle = document.title;
		user_effect(() => {
			document.title = get(unread).length ? `(${get(unread).length}) ${baseTitle}` : baseTitle;
			return () => document.title = baseTitle;
		});
		function markRead(ids) {
			for (const n of get(notifs)) if (!ids || ids.includes(n.id)) n.read = true;
			data.markRead(ids).catch(() => {});
		}
		function openNotif(n, e) {
			if (!n.read) markRead([n.id]);
			if (isOurs(n.href)) {
				e?.preventDefault();
				history.pushState({}, "", n.href);
			}
			set(notifOpen, false);
			set(toasts, get(toasts).filter((t) => t.id !== n.id), true);
		}
		let appEl;
		user_effect(() => tabTicks(appEl.getRootNode()));
		let help = state(false);
		const SHORTCUTS = [
			["/", "Rechercher"],
			["1 à 5", "Changer d'écran"],
			["Espace", "Ouvrir un paquet"],
			["Flèches", "Parcourir les cartes révélées"],
			["Échap", "Fermer"],
			["?", "Afficher cette aide"]
		];
		function onKey(e) {
			if (e.ctrlKey || e.metaKey || e.altKey) return;
			const el = e.composedPath()[0];
			if (el?.matches?.("input, select, textarea")) {
				if (e.key === "Escape") el.blur();
				return;
			}
			if (e.key === "Escape") {
				if (get(help) || get(notifOpen)) e.preventDefault();
				set(help, false);
				set(notifOpen, false);
				return;
			}
			if (appEl?.querySelector(".modal-backdrop")) return;
			if (e.key === "?") set(help, !get(help));
			else if (e.key === "/") {
				e.preventDefault();
				appEl?.querySelector("input.search")?.focus();
			} else if (/^[1-5]$/.test(e.key)) go(VIEWS[e.key - 1]);
		}
		var div = root_18();
		event("keydown", $window, onKey);
		var node = child(div);
		LoadBar(node, {});
		var aside = sibling(node, 2);
		var nav = sibling(child(aside), 2);
		var node_1 = child(nav);
		each(node_1, 17, () => VIEWS, index, ($$anchor, v) => {
			var button = root();
			let classes;
			var node_2 = child(button);
			Icon(node_2, {
				get name() {
					return get(v).icon;
				},
				width: 1.7
			});
			var text = sibling(node_2, 1, true);
			reset(button);
			template_effect(() => {
				classes = set_class(button, 1, "", null, classes, { on: get(view) === get(v).id });
				set_text(text, get(v).label);
			});
			delegated("click", button, () => go(get(v)));
			append($$anchor, button);
		});
		var div_1 = sibling(node_1, 4);
		each(div_1, 21, () => NATIVE, index, ($$anchor, $$item) => {
			var $$array = user_derived(() => to_array(get($$item), 3));
			let path = () => get($$array)[0];
			let label = () => get($$array)[1];
			let icon = () => get($$array)[2];
			var a = root_1();
			var node_3 = child(a);
			Icon(node_3, {
				get name() {
					return icon();
				},
				width: 1.7
			});
			var text_1 = only_child(sibling(node_3), true);
			reset(a);
			template_effect(() => {
				set_attribute(a, "href", data.isReal ? path() : "https://www.wiki-masters.com" + path());
				set_attribute(a, "title", label());
				set_attribute(a, "aria-label", label());
				set_text(text_1, label());
			});
			append($$anchor, a);
		});
		reset(div_1);
		reset(nav);
		bind_this(nav, ($$value) => set(navEl, $$value), () => get(navEl));
		action(nav, ($$node, $$action_arg) => scrollFade?.($$node, $$action_arg), () => ({ axis: "x" }));
		var div_2 = sibling(nav, 2);
		var node_4 = child(div_2);
		var consequent = ($$anchor) => {
			var button_1 = root_2();
			delegated("click", button_1, reset$1);
			append($$anchor, button_1);
		};
		if_block(node_4, ($$render) => {
			if (data.canReset) $$render(consequent);
		});
		var button_2 = sibling(node_4, 2);
		var text_2 = only_child(sibling(button_2, 2), true);
		reset(div_2);
		reset(aside);
		var main = sibling(aside, 2);
		var header = child(main);
		var div_4 = child(header);
		var text_3 = only_child(div_4, true);
		var div_5 = sibling(div_4, 2);
		var node_5 = child(div_5);
		var consequent_1 = ($$anchor) => {
			append($$anchor, root_3());
		};
		if_block(node_5, ($$render) => {
			if (get(unstable)) $$render(consequent_1);
		});
		var node_6 = sibling(node_5, 2);
		SoundControl(node_6, {});
		var div_6 = sibling(node_6, 2);
		var button_3 = child(div_6);
		let classes_1;
		var node_7 = child(button_3);
		Icon(node_7, {
			name: "bell",
			width: 1.7
		});
		var node_8 = sibling(node_7, 2);
		var consequent_2 = ($$anchor) => {
			var span_2 = root_4();
			var text_4 = only_child(span_2, true);
			template_effect(() => set_text(text_4, get(unread).length));
			append($$anchor, span_2);
		};
		if_block(node_8, ($$render) => {
			if (get(unread).length) $$render(consequent_2);
		});
		reset(button_3);
		var node_9 = sibling(button_3, 2);
		var consequent_6 = ($$anchor) => {
			var fragment = root_10();
			var div_7 = first_child(fragment);
			var div_8 = sibling(div_7, 2);
			var div_9 = child(div_8);
			var node_10 = sibling(child(div_9));
			var consequent_3 = ($$anchor) => {
				var fragment_1 = root_5();
				var span_3 = first_child(fragment_1);
				var text_5 = only_child(span_3, true);
				var button_4 = sibling(span_3, 2);
				template_effect(() => set_text(text_5, get(unread).length));
				delegated("click", button_4, () => markRead());
				append($$anchor, fragment_1);
			};
			if_block(node_10, ($$render) => {
				if (get(unread).length) $$render(consequent_3);
			});
			reset(div_9);
			each(sibling(div_9, 2), 17, () => get(notifs), (n) => n.id, ($$anchor, n) => {
				var fragment_2 = comment();
				element(first_child(fragment_2), () => get(n).href ? "a" : "div", false, ($$element, $$anchor) => {
					var event_handler = (e) => openNotif(get(n), e);
					attribute_effect($$element, () => ({
						href: get(n).href,
						class: "notif-item",
						onclick: event_handler,
						[CLASS]: { unread: !get(n).read }
					}));
					var fragment_3 = root_8();
					var node_13 = first_child(fragment_3);
					var consequent_4 = ($$anchor) => {
						append($$anchor, root_6());
					};
					if_block(node_13, ($$render) => {
						if (!get(n).read) $$render(consequent_4);
					});
					var div_10 = sibling(node_13, 2);
					var div_11 = child(div_10);
					var text_6 = only_child(div_11, true);
					var node_14 = sibling(div_11, 2);
					var consequent_5 = ($$anchor) => {
						var div_12 = root_7();
						var text_7 = only_child(div_12, true);
						template_effect(() => set_text(text_7, get(n).message));
						append($$anchor, div_12);
					};
					if_block(node_14, ($$render) => {
						if (get(n).message) $$render(consequent_5);
					});
					var text_8 = only_child(sibling(node_14, 2), true);
					reset(div_10);
					template_effect(($0) => {
						set_text(text_6, get(n).title);
						set_text(text_8, $0);
					}, [() => ago(get(n).at)]);
					append($$anchor, fragment_3);
				});
				append($$anchor, fragment_2);
			}, ($$anchor) => {
				append($$anchor, root_9());
			});
			reset(div_8);
			delegated("click", div_7, () => set(notifOpen, false));
			append($$anchor, fragment);
		};
		if_block(node_9, ($$render) => {
			if (get(notifOpen)) $$render(consequent_6);
		});
		reset(div_6);
		var node_15 = sibling(div_6, 2);
		var consequent_7 = ($$anchor) => {
			append($$anchor, root_11());
		};
		if_block(node_15, ($$render) => {
			if (get(profile)?.is_pro) $$render(consequent_7);
		});
		var span_6 = sibling(node_15, 2);
		var node_16 = child(span_6);
		Icon(node_16, {
			name: "pulls",
			class: "cico pk"
		});
		var b_1 = sibling(node_16);
		var text_9 = only_child(b_1, true);
		var text_10 = only_child(sibling(b_1));
		reset(span_6);
		var span_8 = sibling(span_6, 2);
		var node_17 = child(span_8);
		Icon(node_17, {
			name: "coin",
			class: "cico coin"
		});
		var text_11 = only_child(sibling(node_17), true);
		reset(span_8);
		reset(div_5);
		reset(header);
		var section = sibling(header, 2);
		var node_18 = child(section);
		var consequent_8 = ($$anchor) => {
			Pulls($$anchor, {
				get profile() {
					return get(profile);
				},
				onchanged
			});
		};
		var consequent_9 = ($$anchor) => {
			var fragment_5 = comment();
			key(first_child(fragment_5), () => get(collKey), ($$anchor) => {
				Collection($$anchor, { onwallet: loadProfile });
			});
			append($$anchor, fragment_5);
		};
		var consequent_10 = ($$anchor) => {
			Catalog($$anchor, {});
		};
		var consequent_11 = ($$anchor) => {
			Trades($$anchor, {
				get profile() {
					return get(profile);
				},
				onwallet: loadProfile
			});
		};
		var alternate = ($$anchor) => {
			Marketplace($$anchor, {
				get profile() {
					return get(profile);
				},
				onwallet: loadProfile,
				get openId() {
					return get(openAuction);
				}
			});
		};
		if_block(node_18, ($$render) => {
			if (get(view) === "pulls") $$render(consequent_8);
			else if (get(view) === "collection") $$render(consequent_9, 1);
			else if (get(view) === "catalog") $$render(consequent_10, 2);
			else if (get(view) === "trades") $$render(consequent_11, 3);
			else $$render(alternate, -1);
		});
		reset(section);
		reset(main);
		var node_20 = sibling(main, 2);
		var consequent_13 = ($$anchor) => {
			var div_15 = root_15();
			each(div_15, 21, () => get(toasts), (n) => n.id, ($$anchor, n) => {
				var div_16 = root_14();
				var node_21 = child(div_16);
				element(node_21, () => get(n).href ? "a" : "div", false, ($$element_1, $$anchor) => {
					var event_handler_1 = (e) => openNotif(get(n), e);
					attribute_effect($$element_1, () => ({
						href: get(n).href,
						class: "toast",
						onclick: event_handler_1
					}));
					var fragment_10 = root_13();
					var node_22 = first_child(fragment_10);
					Icon(node_22, {
						name: "bell",
						width: 1.8
					});
					var div_17 = sibling(node_22, 2);
					var b_3 = child(div_17);
					var text_12 = only_child(b_3, true);
					var node_23 = sibling(b_3);
					var consequent_12 = ($$anchor) => {
						var span_9 = root_12();
						var text_13 = only_child(span_9, true);
						template_effect(() => set_text(text_13, get(n).message));
						append($$anchor, span_9);
					};
					if_block(node_23, ($$render) => {
						if (get(n).message) $$render(consequent_12);
					});
					reset(div_17);
					template_effect(() => set_text(text_12, get(n).title));
					append($$anchor, fragment_10);
				});
				var button_5 = sibling(node_21, 2);
				Icon(child(button_5), {
					name: "close",
					width: 2
				});
				reset(button_5);
				reset(div_16);
				event("mouseenter", div_16, () => clearTimeout(toastTimers.get(get(n).id)));
				event("mouseleave", div_16, () => hideLater(get(n), 3e3));
				delegated("click", button_5, () => dismiss(get(n)));
				append($$anchor, div_16);
			});
			reset(div_15);
			append($$anchor, div_15);
		};
		if_block(node_20, ($$render) => {
			if (get(toasts).length) $$render(consequent_13);
		});
		var node_25 = sibling(node_20, 2);
		var consequent_14 = ($$anchor) => {
			var div_18 = root_17();
			var div_19 = child(div_18);
			each(sibling(child(div_19), 2), 17, () => SHORTCUTS, index, ($$anchor, $$item) => {
				var $$array_1 = user_derived(() => to_array(get($$item), 2));
				let k = () => get($$array_1)[0];
				let what = () => get($$array_1)[1];
				var div_20 = root_16();
				var span_10 = child(div_20);
				var text_14 = only_child(span_10, true);
				var text_15 = sibling(span_10, 1, true);
				reset(div_20);
				template_effect(() => {
					set_text(text_14, k());
					set_text(text_15, what());
				});
				append($$anchor, div_20);
			});
			reset(div_19);
			reset(div_18);
			delegated("click", div_18, () => set(help, false));
			append($$anchor, div_18);
		};
		if_block(node_25, ($$render) => {
			if (get(help)) $$render(consequent_14);
		});
		HumanCheck(sibling(node_25, 2), {});
		reset(div);
		bind_this(div, ($$value) => appEl = $$value, () => appEl);
		template_effect(() => {
			set_text(text_2, data.isReal ? "Connecté à WikiMasters" : "Serveur de test local");
			set_text(text_3, get(current).label);
			classes_1 = set_class(button_3, 1, "bell", null, classes_1, { has: get(unread).length > 0 });
			set_text(text_9, get(profile)?.packs_remaining ?? "-");
			set_text(text_10, `/${get(profile)?.pack_cap ?? 10 ?? ""}`);
			set_text(text_11, get(profile)?.currency ?? "-");
		});
		delegated("click", button_2, () => set(help, true));
		delegated("click", button_3, () => {
			set(notifOpen, !get(notifOpen));
			if (get(notifOpen)) loadNotifs();
		});
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var app_default = ":host,:root{--bg:#0c0d0c;--surface:#141613;--elev:#191c18;--elev2:#20241f;--line:#262a26;--line2:#333833;--fg:#eceee9;--fg-soft:#98a29a;--fg-faint:#7d857c;--accent:#3ccb8e;--accent-ink:#07130e;--bad:#f6867a;--r-c:#7fd8b4;--r-pc:#7fb0e6;--r-r:#b18fe0;--r-sr:#e46f9f;--r-ur:#f0912f;--r-l:#e8c93a;--card-bg:#0f110e;--coin:radial-gradient(circle at 35% 30%,#ffe680,var(--r-l));--display:\"Outfit\",system-ui,sans-serif;--body:\"Inter\",system-ui,sans-serif;--s1:4px;--s2:8px;--s3:12px;--s4:16px;--s5:24px;--s6:32px;--s7:48px;--s8:64px;--radius:14px;--radius-lg:18px;--sidebar:268px}:where(#wm-app-root,#wm-app-root *){box-sizing:border-box;margin:0;padding:0}[data-r=C]{--rc:var(--r-c)}[data-r=PC]{--rc:var(--r-pc)}[data-r=R]{--rc:var(--r-r)}[data-r=SR]{--rc:var(--r-sr)}[data-r=UR]{--rc:var(--r-ur)}[data-r=L]{--rc:var(--r-l)}#wm-app-root{font-family:var(--body);color:var(--fg);-webkit-font-smoothing:antialiased;line-height:1.5}#wm-app-root button{cursor:pointer;font-family:inherit}#wm-app-root img{display:block}#wm-app-root a{color:inherit;text-decoration:none}#wm-app-root :is(a,button,input,select,textarea,[tabindex]:not([tabindex=\"-1\"])):focus-visible{outline:2px solid var(--accent);outline-offset:2px}#wm-app-root .modal:focus,#wm-app-root .modal:focus-visible{outline:none}.card-btn:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:var(--radius)}.app{grid-template-columns:var(--sidebar) 1fr;background:var(--bg);min-height:100vh;display:grid}.side{background:var(--surface);border-right:1px solid var(--line);padding:var(--s5) var(--s4);gap:var(--s5);flex-direction:column;height:100vh;display:flex;position:sticky;top:0;overflow:hidden}.brand{padding:0 var(--s3);align-items:center;gap:10px;display:flex}.brand .mk{background:var(--accent);border-radius:3px;width:9px;height:9px}.brand b{font-family:var(--display);letter-spacing:-.01em;font-size:19px;font-weight:700}.nav{scrollbar-width:none;flex-direction:column;flex:1;gap:2px;min-height:0;display:flex;overflow-y:auto}.nav::-webkit-scrollbar{display:none}.nav button{align-items:center;gap:var(--s3);color:var(--fg-soft);cursor:pointer;text-align:left;background:0 0;border:0;border-radius:11px;width:100%;padding:10px 12px;font-family:inherit;font-size:14px;font-weight:500;transition:background .15s,color .15s;display:flex}.nav button svg{opacity:.85;flex:none;width:19px;height:19px}.nav button:hover{background:var(--elev);color:var(--fg)}.nav button.on{background:color-mix(in oklab,var(--accent) 12%,transparent);color:var(--accent);font-weight:600}.nav button.on svg{opacity:1}.nav-sep{letter-spacing:.12em;text-transform:uppercase;color:var(--fg-faint);padding:var(--s4) 12px var(--s2);font-size:10px}.nav-grid{grid-template-columns:repeat(3,1fr);gap:2px;display:grid}.nav-grid a{color:var(--fg-soft);text-align:center;border-radius:10px;flex-direction:column;align-items:center;gap:6px;padding:10px 2px 9px;font-size:11px;line-height:1.1;transition:background .15s,color .15s;display:flex}.nav-grid a svg{opacity:.55;width:17px;height:17px}.nav-grid a:hover{background:var(--elev);color:var(--fg)}.nav-grid a:hover svg{opacity:.9}.side-foot{gap:var(--s2);padding:var(--s3) 12px 0;border-top:1px solid var(--line);flex-direction:column;display:flex}.ghost{border:1px solid var(--line2);color:var(--fg-soft);background:0 0;border-radius:10px;padding:9px;font-size:13px;font-weight:500;transition:all .15s}.ghost:hover{border-color:var(--fg-soft);color:var(--fg)}.foot-link{color:var(--fg-soft);font:inherit;cursor:pointer;text-align:left;background:0 0;border:0;align-items:center;gap:8px;padding:0;font-size:12.5px;display:flex}.foot-link svg{width:14px;height:14px}.foot-link:hover{color:var(--fg)}.hintline{color:var(--fg-faint);align-items:center;gap:8px;font-size:11.5px;display:flex}.hintline:before{content:\"\";background:var(--accent);border-radius:50%;width:6px;height:6px}@media (height<=760px) and (width>=901px){.side{padding:var(--s4) var(--s3);gap:var(--s3)}.nav button{padding:8px 12px}.nav-sep{padding:var(--s3) 12px 6px}.nav-grid a{gap:4px;padding:7px 2px 6px}}.main{flex-direction:column;min-width:0;display:flex}.topbar{justify-content:space-between;align-items:center;gap:var(--s4);padding:var(--s5) clamp(var(--s5),4vw,var(--s7));border-bottom:1px solid var(--line);z-index:5;background:color-mix(in oklab,var(--bg) 86%,transparent);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);display:flex;position:sticky;top:0}.crumb{font-family:var(--display);letter-spacing:-.01em;font-size:16px;font-weight:600}.wallet{gap:var(--s2);display:flex}.chip{color:var(--fg-soft);background:var(--elev);border:1px solid var(--line);border-radius:999px;align-items:center;gap:8px;padding:9px 15px;font-size:13.5px;display:flex}.chip b{color:var(--fg);font-weight:600}.chip .cico{flex:none;width:14px;height:14px}.chip .cico.pk{color:var(--accent)}.chip .cico.coin{color:var(--r-l)}.badge{font-family:var(--display);letter-spacing:.04em;border-radius:999px;align-items:center;padding:6px 11px;font-size:11px;font-weight:700;display:inline-flex}.badge.pro{background:var(--accent);color:var(--accent-ink)}.loadbar{z-index:2147483602;pointer-events:none;opacity:0;height:3px;transition:opacity .35s;position:fixed;top:0;left:0;right:0;overflow:hidden}.loadbar.on{opacity:1}.loadbar:before{content:\"\";background:linear-gradient(90deg,transparent,var(--accent) 30%,#b6f5d8 60%,var(--accent) 85%,transparent);width:45%;box-shadow:0 0 12px color-mix(in oklab,var(--accent) 70%,transparent),0 0 3px var(--accent);border-radius:0 3px 3px 0;animation:1.25s cubic-bezier(.45,.05,.4,.95) infinite loadbar;position:absolute;inset:0 auto 0 0}@keyframes loadbar{0%{transform:translate(-110%)}to{transform:translate(330%)}}.loadcap{z-index:2147483602;background:color-mix(in oklab,var(--elev2) 92%,transparent);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border:1px solid var(--line2);width:max-content;max-width:calc(100vw - 32px);color:var(--fg);opacity:0;pointer-events:none;border-radius:999px;align-items:center;gap:10px;margin-inline:auto;padding:10px 16px 10px 14px;font-size:13px;font-weight:500;transition:opacity .25s,transform .25s;display:flex;position:fixed;bottom:24px;left:0;right:0;transform:translateY(10px);box-shadow:0 18px 40px -18px #000}.loadcap.on{opacity:1;transform:none}.loadcap .spin{color:var(--accent);width:14px;height:14px}.loadcap.slow .spin{color:var(--r-ur)}.loadcap-txt{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.loadcap-t{color:var(--fg-faint);font-variant-numeric:tabular-nums;flex:none}@media (width<=560px){.loadcap{border-radius:16px;bottom:72px}.loadcap-txt{white-space:normal;line-height:1.35}}@media (prefers-reduced-motion:reduce){.loadbar:before{opacity:.8;width:100%;animation:none}.loadcap{transition:none}}.health{color:var(--r-ur);background:color-mix(in oklab,var(--r-ur) 12%,transparent);border:1px solid color-mix(in oklab,var(--r-ur) 30%,transparent);white-space:nowrap;border-radius:999px;align-self:center;align-items:center;gap:8px;padding:6px 12px;font-size:12.5px;font-weight:500;animation:.3s fade;display:inline-flex}.health-dot{background:var(--r-ur);border-radius:50%;width:7px;height:7px;animation:1.4s ease-in-out infinite auc-pulse}@media (width<=560px){.health{padding:9px}.health-txt{display:none}}@media (prefers-reduced-motion:reduce){.health-dot{animation:none}}.notif{display:flex;position:relative}.bell{border:1px solid var(--line);background:var(--elev);width:38px;height:38px;color:var(--fg-soft);cursor:pointer;border-radius:999px;justify-content:center;align-items:center;transition:all .15s;display:flex;position:relative}.bell:hover{color:var(--fg);border-color:var(--line2)}.bell.has{color:var(--fg)}.bell svg{width:18px;height:18px}.bell-badge{color:#fff;min-width:18px;height:18px;font-family:var(--display);text-align:center;box-shadow:0 0 0 2px var(--bg);background:#f26d6d;border-radius:999px;padding:0 5px;font-size:10.5px;font-weight:700;line-height:18px;position:absolute;top:-3px;right:-3px}.notif-scrim{z-index:30;position:fixed;inset:0}.snd{display:flex;position:relative}.snd-panel{width:min(300px,calc(100vw - 2 * var(--s4)));z-index:31;gap:var(--s3);padding:var(--s4);background:var(--surface);border:1px solid var(--line2);border-radius:var(--radius-lg);flex-direction:column;display:flex;position:absolute;top:46px;right:0;box-shadow:0 24px 60px -24px #000}.snd-head{justify-content:space-between;align-items:center;display:flex}.snd-head b{font:700 14px var(--display)}.snd-switch{border:1px solid var(--line2);background:var(--elev2);cursor:pointer;border-radius:999px;width:40px;height:24px;transition:background .15s,border-color .15s;position:relative}.snd-switch span{background:var(--fg-soft);border-radius:50%;width:16px;height:16px;transition:transform .18s cubic-bezier(.3,.7,.3,1),background .15s;position:absolute;top:3px;left:3px}.snd-switch[aria-checked=true]{background:color-mix(in oklab,var(--accent) 30%,var(--elev2));border-color:var(--accent)}.snd-switch[aria-checked=true] span{background:var(--accent);transform:translate(16px)}.snd-vol{color:var(--fg-soft);grid-template-columns:auto 1fr auto auto;align-items:center;gap:10px;transition:opacity .15s;display:grid}.snd-vol.off{opacity:.5}.snd-vol svg{width:16px;height:16px}.snd-vol input{width:100%;accent-color:var(--accent);cursor:pointer}.snd-vol output{text-align:right;font-variant-numeric:tabular-nums;min-width:4ch;color:var(--fg);font-size:13px}.snd-note{color:var(--fg-faint);font-size:12px;line-height:1.4}.notif-panel{background:var(--surface);border:1px solid var(--line2);border-radius:var(--radius-lg);z-index:31;width:min(340px,86vw);max-height:66vh;padding:var(--s2);overscroll-behavior:contain;position:absolute;top:46px;right:0;overflow:auto;box-shadow:0 24px 60px -24px #000}.notif-head{font-family:var(--display);align-items:center;gap:8px;padding:8px 10px 10px;font-size:14px;font-weight:700;display:flex}.notif-count{background:color-mix(in oklab,var(--accent) 16%,transparent);color:var(--accent);border-radius:999px;padding:2px 8px;font-size:11px;font-weight:700}.notif-empty{text-align:center;color:var(--fg-faint);padding:24px;font-size:13px}.notif-item{border-radius:12px;gap:10px;padding:11px 10px;transition:background .15s;display:flex}.notif-item:hover{background:var(--elev)}.notif-item.unread{background:color-mix(in oklab,var(--accent) 7%,transparent)}.notif-dot{background:var(--accent);border-radius:50%;flex:none;width:7px;height:7px;margin-top:6px}.notif-item:not(.unread) .notif-body{margin-left:17px}.notif-body{min-width:0}.notif-title{font-size:13.5px;font-weight:600;line-height:1.3}.notif-msg{color:var(--fg-soft);margin-top:2px;font-size:12.5px;line-height:1.4}.notif-time{color:var(--fg-faint);margin-top:4px;font-size:11px}.view{padding:clamp(var(--s5),3.5vw,var(--s7));padding-bottom:max(clamp(var(--s5),3.5vw,var(--s7)),72px);width:100%;max-width:1600px;margin:0 auto}.view:has(>.pulls>.reveal-all){max-width:none}.pulls{position:relative}.pull-ready{justify-content:center;align-items:center;gap:var(--s5);text-align:center;flex-direction:column;min-height:64vh;display:flex}.pull-ready h1{font-family:var(--display);letter-spacing:-.02em;font-size:clamp(26px,3vw,36px);font-weight:700}.special-note{background:color-mix(in oklab,var(--r-l) 12%,var(--elev));border:1px solid color-mix(in oklab,var(--r-l) 32%,var(--line));color:var(--fg);border-radius:12px;flex-wrap:wrap;justify-content:center;align-items:center;gap:10px;padding:10px 16px;font-size:13px;display:flex}.link-btn{color:var(--accent);font:inherit;cursor:pointer;text-underline-offset:3px;background:0 0;border:none;font-weight:600;text-decoration:underline}.pull-ready .sub{color:var(--fg-soft);margin-top:calc(-1 * var(--s3));font-size:15px}.booster-stage{width:100%;padding:var(--s3) 0;justify-content:center;align-items:center;display:flex;position:relative;overflow-x:clip}.booster{aspect-ratio:2550/3300;cursor:pointer;filter:drop-shadow(0 34px 54px #0009);background:0 0;border:none;width:clamp(200px,min(77.3dvh - 417.42px,62vw),480px);padding:0;transition:transform .3s cubic-bezier(.2,.7,.3,1);position:relative}.booster:hover:not(:disabled):not(.opening){transform:translateY(-8px)}.booster:disabled{cursor:default}.booster-main{transform-origin:50% 60%;animation:5.5s ease-in-out infinite booster-float;position:absolute;inset:0}.booster-main img{object-fit:contain;-webkit-user-drag:none;-webkit-user-select:none;user-select:none;width:100%;height:100%;display:block}.booster-shine{pointer-events:none;mix-blend-mode:screen;opacity:0;background:linear-gradient(115deg,#0000 40%,#ffffffd9 47%,#96d2ffb3 50%,#ffecb4b3 53%,#0000 60%) 0 0/260% 260% no-repeat;animation:5s ease-in-out infinite booster-sheen;position:absolute;inset:0;-webkit-mask:url(/card_pack.png) 50%/contain no-repeat;mask:url(/card_pack.png) 50%/contain no-repeat}@keyframes booster-sheen{0%{opacity:0;background-position:130% 0}30%{opacity:.95}52%{opacity:.95;background-position:-30% 100%}72%,to{opacity:0;background-position:-30% 100%}}@keyframes booster-float{0%,to{transform:translateY(0)rotate(-1.2deg)}50%{transform:translateY(-12px)rotate(1.2deg)}}.booster-back{filter:brightness(.62)grayscale(.25);background-position:50%;background-repeat:no-repeat;background-size:contain;position:absolute;inset:0}.booster-back.b1{opacity:.7;transform:translate(11px,9px)rotate(4deg)scale(.985)}.booster-back.b2{opacity:.4;transform:translate(22px,18px)rotate(8deg)scale(.97)}.booster.is-empty .booster-main{filter:grayscale(.7)brightness(.55);opacity:.8;animation-play-state:paused}.booster.is-empty .booster-shine{display:none}.booster.opening{cursor:default}.booster.opening .booster-main{animation:.9s cubic-bezier(.3,.6,.2,1) forwards booster-open}@keyframes booster-open{0%{transform:translateY(0)rotate(0)}14%{transform:rotate(-5deg)}28%{transform:rotate(5deg)}42%{transform:rotate(-4deg)}56%{transform:rotate(3deg)scale(1.03)}68%{transform:rotate(0)scale(1.06)}to{opacity:0;filter:brightness(2.2);transform:scale(1.5)}}.booster.opening:after{content:\"\";pointer-events:none;opacity:0;background:radial-gradient(circle,#fff6e0f2,#fff6e040 45%,#0000 66%);border-radius:50%;animation:.9s ease-out forwards booster-burst;position:absolute;inset:-25%}@keyframes booster-burst{0%,52%{opacity:0;transform:scale(.5)}74%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(1.5)}}.pack-count{flex-direction:column;align-items:center;gap:2px;display:flex}.pc-num{font-family:var(--display);color:var(--accent);font-variant-numeric:tabular-nums;font-size:clamp(36px,5vw,54px);font-weight:800;line-height:1}.pack-wait{flex-direction:column;align-items:center;gap:4px;display:flex}.pw-time{font-family:var(--display);color:var(--fg);font-variant-numeric:tabular-nums;font-size:clamp(34px,4.4vw,50px);font-weight:800;line-height:1}.pw-lbl{color:var(--fg-soft);font-size:15px}.pw-sub{color:var(--fg-faint);margin-top:var(--s2);font-size:12.5px}.pc-lbl{color:var(--fg-soft);font-size:14px}.regen-line{color:var(--fg-soft);font-size:13.5px}.regen-line b{color:var(--fg);font-weight:600}.regen-line.err{color:#f0a3a3}.btn.big{padding:14px 34px;font-size:16px}.btn{font-family:var(--display);white-space:nowrap;border:1px solid var(--line2);color:var(--fg);background:0 0;border-radius:12px;padding:13px 28px;font-size:15px;font-weight:600;transition:all .15s}.btn:hover{border-color:var(--fg-soft)}.btn.primary{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}.btn.primary:hover{filter:brightness(1.06)}.btn:disabled,.iconbtn:disabled,.modal-close:disabled{opacity:.45;cursor:not-allowed}.btn svg{vertical-align:-3px;flex:none;width:17px;height:17px}.pull-actions{gap:var(--s3);flex-wrap:wrap;justify-content:center;display:flex}.haul{margin-top:var(--s3);flex-wrap:wrap;justify-content:center;gap:8px;display:flex}.haul-chip{color:var(--fg-soft);background:color-mix(in oklab,var(--rc) 10%,var(--elev));border:1px solid color-mix(in oklab,var(--rc) 35%,var(--line));border-radius:999px;align-items:center;gap:6px;padding:5px 12px;font-size:12.5px;display:inline-flex}.haul-chip b{color:var(--rc);font-family:var(--display)}.session-recap{color:var(--fg-faint);margin-top:var(--s2);font-size:12.5px}.reveal{justify-content:center;align-items:center;gap:var(--s6);flex-direction:column;min-height:64vh;display:flex}.reveal .count{color:var(--fg-soft);font-size:14px}.reveal .count b{color:var(--accent);font-family:var(--display);margin:0 3px;font-size:18px}.stage{width:clamp(250px,min(71.4dvh - 342.72px,40vw),520px);max-width:100%;position:relative}.stage-aura{z-index:0;pointer-events:none;background:radial-gradient(closest-side, color-mix(in oklab,var(--rc) 60%, transparent), transparent 72%);filter:blur(34px);opacity:.35;border-radius:50%;animation:.55s cubic-bezier(.3,.8,.3,1) aurapop;position:absolute;inset:-14% -10%}.stage-aura[data-r=C]{opacity:.26}.stage-aura[data-r=PC]{opacity:.34}.stage-aura[data-r=R]{opacity:.46}.stage-aura[data-r=SR]{opacity:.58}.stage-aura[data-r=UR]{opacity:.72;inset:-18% -12%}.stage-aura[data-r=L]{opacity:.85;inset:-20% -14%}@keyframes aurapop{0%{transform:scale(.7)}to{transform:scale(1)}}.stage .flip-in{z-index:1;position:relative}.reveal-rarity{font-family:var(--display);letter-spacing:.06em;color:var(--rc);font-size:16px;font-weight:700;animation:.45s rarityin}.reveal-rarity[data-r=UR],.reveal-rarity[data-r=L]{letter-spacing:.1em;font-size:19px}@keyframes rarityin{0%{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}.dots{gap:var(--s2);align-items:center;display:flex}.dots .d{background:var(--line2);border-radius:50%;width:8px;height:8px;transition:all .2s}.dots .d.on{background:var(--accent);transform:scale(1.15)}.dots .d.seen{background:var(--fg-faint)}.navrow{align-items:center;gap:var(--s5);display:flex}.arrow{border:1px solid var(--line2);background:var(--elev);width:46px;height:46px;color:var(--fg);border-radius:50%;justify-content:center;align-items:center;transition:all .15s;display:flex}.arrow svg{width:20px;height:20px}.arrow:hover{border-color:var(--fg-soft)}.arrow:disabled{opacity:.3;cursor:not-allowed}.flip-in{animation:.5s cubic-bezier(.3,.8,.3,1) flipin}@keyframes flipin{0%{opacity:0;transform:rotateY(-14deg)translateY(14px)}to{opacity:1;transform:none}}.reveal-skip{color:var(--fg-faint);cursor:pointer;text-underline-offset:3px;background:0 0;border:none;padding:4px;font-size:13px;text-decoration:underline}.reveal-skip:hover{color:var(--fg-soft)}.reveal-all{gap:var(--s5)}.reveal-all-head{text-align:center;flex-direction:column;gap:4px;display:flex}.reveal-all-head h2{font-family:var(--display);letter-spacing:-.02em;font-size:clamp(22px,2.4vw,28px);font-weight:700}.reveal-all-head .sub{color:var(--fg-soft);font-size:14px}.reveal-grid{--rg-w:clamp(150px,min(calc((100% - 4 * var(--s5)) / 5),calc((100dvh - 380px) * .714)),440px);grid-template-columns:repeat(auto-fit,var(--rg-w));gap:var(--s5);justify-content:center;width:100%;display:grid}.rg-card{animation:.5s cubic-bezier(.2,.7,.3,1) both rgin;position:relative}.rg-aura{z-index:0;pointer-events:none;background:radial-gradient(closest-side,color-mix(in oklab,var(--rc) 55%,transparent),transparent 72%);filter:blur(26px);opacity:.3;border-radius:50%;position:absolute;inset:-10% -8%}.rg-aura[data-r=C]{opacity:.16}.rg-aura[data-r=PC]{opacity:.22}.rg-aura[data-r=R]{opacity:.34}.rg-aura[data-r=SR]{opacity:.46}.rg-aura[data-r=UR]{opacity:.6}.rg-aura[data-r=L]{opacity:.72}.rg-card .card-btn{z-index:1;position:relative}@keyframes rgin{0%{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}.wc{aspect-ratio:5/7;border-radius:var(--radius-lg);background:var(--card-bg);border:3.5px solid color-mix(in oklab,var(--rc) 65%,var(--line));cursor:pointer;transition:transform .2s cubic-bezier(.2,.7,.3,1),border-color .2s,box-shadow .2s;position:relative;overflow:hidden;container-type:inline-size}.wc[data-r=C]{box-shadow:0 6px 18px -12px color-mix(in oklab,var(--r-c) 45%,transparent)}.wc[data-r=PC]{box-shadow:0 6px 20px -12px color-mix(in oklab,var(--r-pc) 55%,transparent)}.wc[data-r=R]{box-shadow:0 8px 24px -12px color-mix(in oklab,var(--r-r) 62%,transparent)}.wc[data-r=SR]{box-shadow:0 8px 26px -11px color-mix(in oklab,var(--r-sr) 70%,transparent)}.wc[data-r=UR]{box-shadow:0 10px 30px -11px color-mix(in oklab,var(--r-ur) 78%,transparent)}.wc[data-r=L]{box-shadow:0 12px 36px -10px color-mix(in oklab,var(--r-l) 85%,transparent)}.wc[data-r=SR],.wc[data-r=UR],.wc[data-r=L]{border-color:color-mix(in oklab,var(--rc) 88%,var(--line))}.wc:hover{border-color:var(--rc);box-shadow:0 18px 42px -20px color-mix(in oklab,var(--rc) 42%,#000);transform:translateY(-5px)}.wc-face{background:linear-gradient(#181c16,#0d0f0c);position:absolute;inset:0}.wc:before{content:\"\";z-index:5;pointer-events:none;border-radius:inherit;position:absolute;inset:0;box-shadow:inset 0 1px #ffffff29,inset 0 0 0 1px #ffffff08,inset 0 -44px 52px -44px #0000008c}.wc:not(.is-noimg) .wc-face:after{content:\"\";pointer-events:none;background:linear-gradient(180deg, color-mix(in oklab,var(--rc) 26%, transparent), transparent 28%);position:absolute;inset:0}.wc-blur{object-fit:cover;filter:blur(22px)saturate(1.1)brightness(.5);z-index:0;width:100%;height:100%;position:absolute;inset:0;transform:scale(1.2)}.wc.is-noimg .wc-blur{display:none}.wc-photo{object-fit:contain;z-index:1;width:100%;height:100%;position:absolute;inset:0}.wc-bg{object-fit:cover;z-index:0;width:100%;height:100%;position:absolute;inset:0;transform:scale(1.8)}.wc-bg.onyx{transform:none}.wc[data-r=C] .wc-bg,.wc[data-r=PC] .wc-bg{filter:brightness(.6)saturate(1.2)}.wc-photo.onyx-photo{object-fit:cover;z-index:1}.wc.is-noimg .wc-face{background:radial-gradient(130% 90% at 50% 14%, color-mix(in oklab,var(--rc) 45%, transparent), transparent 64%), linear-gradient(180deg, color-mix(in oklab,var(--rc) 22%, #171b15), #0c0e0b)}.wc.is-shiny{box-shadow:inset 0 0 0 1px #e9c15a8c,0 0 16px #e9c15a4d,0 0 30px #00000080}.wc.is-shiny:hover{box-shadow:inset 0 0 0 1px #e9c15acc,0 0 22px #e9c15a80,0 18px 42px -20px #000}.wc-holo{z-index:2;pointer-events:none;mix-blend-mode:screen;opacity:.7;background:radial-gradient(circle at 50% 45%,#fff8e0 0%,#fff8e033 20%,#0000 46%) 0 0/175% 175% no-repeat;animation:6.5s ease-in-out infinite alternate shiny-drift;position:absolute;inset:0}.wc-holo.onyx{mix-blend-mode:soft-light;opacity:.9}@keyframes shiny-drift{0%{background-position:16% 12%}to{background-position:84% 82%}}@media (prefers-reduced-motion:reduce){.wc-holo{opacity:.5;background-position:50% 42%;animation:none}}.ox{z-index:1;pointer-events:none;position:absolute;inset:0}.ox-shade{mix-blend-mode:multiply;background:#2e2b36}.ox-tint{mix-blend-mode:color;background:#3b3b42}.ox-wash{background:radial-gradient(120% 80% at 50% 30%,#0000 40%,#05040866 78%,#050408cc 100%),linear-gradient(#0b0a12ec 0%,#0d0c15dd 55%,#0b0a1255 78%,#0b0a12bb 100%)}.ox-lines{opacity:.62;mix-blend-mode:screen;background:linear-gradient(160deg,#fff0b3 0%,#e9c15a 35%,#fff6d0 55%,#d7a93c 80%,#ffe9a6 100%);-webkit-mask:url(https://www.wiki-masters.com/shiny/onyx-lines.png) 50%/cover no-repeat;mask:url(https://www.wiki-masters.com/shiny/onyx-lines.png) 50%/cover no-repeat}.ox-shine{mix-blend-mode:screen;opacity:.95;background:radial-gradient(circle at 50% 45%,#fffbe8 0%,#f6d98aa6 16%,#e9c15a26 34%,#0000 52%) 0 0/210% 210% no-repeat;animation:5.5s ease-in-out infinite alternate onyx-shimmer;-webkit-mask:url(https://www.wiki-masters.com/shiny/onyx-lines.png) 50%/cover no-repeat;mask:url(https://www.wiki-masters.com/shiny/onyx-lines.png) 50%/cover no-repeat}@keyframes onyx-shimmer{0%{background-position:12% 8%}to{background-position:88% 86%}}@media (prefers-reduced-motion:reduce){.ox-shine{opacity:.7;background-position:42% 30%;animation:none}}.wc-scrim{pointer-events:none;background:linear-gradient(#0000 20%,#05060533 32%,#050605b3 50%,#050605fb 68%,#050605 100%);position:absolute;inset:0}.wc.bare .wc-cap,.wc.bare .wc-scrim{display:none}.wc-top{z-index:3;justify-content:space-between;align-items:flex-start;gap:6px;display:flex;position:absolute;top:11px;left:11px;right:11px}.wc-rtag{font-family:var(--display);color:var(--accent-ink);background:var(--rc);border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700;box-shadow:0 1px 5px #0006}.wc-flags{align-items:center;gap:5px;display:flex}.wc-count{color:#fff;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);background:#0000008c;border:1px solid #ffffff2e;border-radius:6px;padding:2px 7px;font-size:10.5px;font-weight:600}.wc-new{background:var(--accent);color:var(--accent-ink);border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700}.wc-shiny{color:#f3d27a;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);background:#111014;border-radius:6px;justify-content:center;align-items:center;width:22px;height:20px;font-size:12px;font-weight:700;display:inline-flex;box-shadow:inset 0 0 0 1px #d7a93c,0 0 10px #e9c15a73}.wc-star{border:1px solid color-mix(in oklab,var(--r-l) 55%,#ffffff4d);color:var(--r-l);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);background:#0000008c;border-radius:6px;justify-content:center;align-items:center;width:22px;height:20px;font-size:12px;font-weight:700;display:inline-flex}.wc-cap{z-index:3;gap:var(--s1);background:linear-gradient(#0000,#0506058c 28%,#050605eb);flex-direction:column;padding:14px 14px 16px;display:flex;position:absolute;bottom:0;left:0;right:0}.wc.bare .wc-cap{background:0 0}.wc-name{font-family:var(--display);color:#fff;text-shadow:0 1px 10px #000000a6;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:15px;font-weight:700;line-height:1.18;display:-webkit-box;overflow:hidden}.wc-cat{color:#ffffffd1;white-space:nowrap;text-overflow:ellipsis;text-shadow:0 1px 6px #000000b3;font-size:10.5px;line-height:1.3;overflow:hidden}.wc-meta{border-top:1px solid #ffffff38;justify-content:space-between;align-items:center;gap:8px;margin-top:9px;padding-top:9px;display:flex}.wc-stats{color:#ffffffd9;letter-spacing:.02em;text-shadow:0 1px 6px #000000b3;gap:12px;font-size:11px;display:flex}.wc-stats b{color:#fff;font-variant-numeric:tabular-nums;font-weight:700}.wc-val{color:var(--r-l);font-variant-numeric:tabular-nums;text-shadow:0 1px 6px #000000b3;white-space:nowrap;align-items:center;gap:4px;font-size:11px;font-weight:700;display:inline-flex}.wc-val:before{content:\"\";background:var(--coin);width:9px;height:9px;box-shadow:0 0 6px color-mix(in oklab,var(--r-l) 55%,transparent);border-radius:50%}.wc-name{font-size:clamp(15px,7cqw,30px)}.wc-cat{font-size:clamp(10.5px,4.6cqw,16px)}.wc-stats,.wc-val{font-size:clamp(11px,4.8cqw,17px)}.wc-cap{padding:clamp(14px,6.5cqw,24px) clamp(14px,6.5cqw,24px) clamp(16px,7.5cqw,28px)}.wc-top{top:clamp(11px,5cqw,18px);left:clamp(11px,5cqw,18px);right:clamp(11px,5cqw,18px)}.wc-rtag,.wc-new{padding:.3em .8em;font-size:clamp(10px,4.2cqw,14px)}.wc-big .wc-cat{white-space:normal}.coll-head{justify-content:space-between;align-items:flex-start;gap:var(--s4);margin-bottom:var(--s5);flex-wrap:wrap;display:flex}.coll-head h1{font-family:var(--display);letter-spacing:-.02em;font-size:clamp(24px,2.6vw,32px);font-weight:700}.coll-head .meta{color:var(--fg-soft);margin-top:6px;font-size:14px}.avatar{width:var(--s);height:var(--s);background:hsl(var(--h) 35% 26%);color:hsl(var(--h) 70% 85%);font:700 calc(var(--s) * .42)/1 var(--display);border-radius:50%;flex:none;justify-content:center;align-items:center;display:inline-flex;overflow:hidden}.avatar img{object-fit:cover;width:100%;height:100%}.coll-tools{gap:var(--s3);flex-wrap:wrap;flex:460px;justify-content:flex-end;align-items:center;display:flex}.search-wrap{flex:300px;align-items:center;min-width:220px;display:flex;position:relative}.search-ico{width:17px;height:17px;color:var(--fg-faint);pointer-events:none;position:absolute;left:14px}.search{background:var(--elev);border:1px solid var(--line);width:100%;color:var(--fg);font-family:var(--body);border-radius:11px;padding:11px 38px 11px 40px;font-size:14px}.search::placeholder{color:var(--fg-faint)}.search:focus{border-color:var(--fg-soft);background:var(--elev2)}.search::-webkit-search-cancel-button{display:none}.search-clear{width:24px;height:24px;color:var(--fg-faint);background:0 0;border:none;border-radius:7px;justify-content:center;align-items:center;font-size:18px;line-height:1;display:flex;position:absolute;right:8px}.search-clear:hover{background:var(--elev2);color:var(--fg)}.tool-actions{gap:var(--s2);flex-wrap:wrap;align-items:center;display:flex}.isel{background:var(--elev);border:1px solid var(--line);border-radius:11px;align-items:center;gap:8px;height:42px;padding:0 12px;transition:all .15s;display:inline-flex;position:relative}.isel:hover,.isel:focus-within{border-color:var(--line2)}.isel svg{width:16px;height:16px;color:var(--fg-soft);flex:none}.isel select{appearance:none;color:var(--fg);font-family:var(--body);cursor:pointer;background:0 0;border:none;outline:none;height:100%;padding:0 18px 0 0;font-size:14px;font-weight:500}.isel:after{content:\"\";border-right:2px solid var(--fg-soft);border-bottom:2px solid var(--fg-soft);pointer-events:none;width:8px;height:8px;position:absolute;right:12px;transform:rotate(45deg)translateY(-2px)}.iconbtn{background:var(--elev);border:1px solid var(--line);color:var(--fg-soft);height:42px;font-family:var(--body);white-space:nowrap;border-radius:11px;align-items:center;gap:8px;padding:0 14px;font-size:14px;font-weight:500;transition:all .15s;display:inline-flex}.iconbtn svg{flex:none;width:17px;height:17px}.iconbtn:hover{color:var(--fg);border-color:var(--line2)}.iconbtn.on{color:var(--fg);border-color:var(--fg-soft);background:var(--elev2)}.sort-hint{margin:-8px 0 var(--s4);color:var(--fg-soft);font-size:12.5px}.rarity-panel{gap:var(--s3);margin-bottom:var(--s6);flex-direction:column;display:flex}.rarity-meter{gap:5px;height:9px;display:flex}.rm-seg{background:var(--rc);cursor:pointer;border:none;border-radius:999px;min-width:14px;height:100%;padding:0;transition:flex-grow .45s cubic-bezier(.2,.7,.3,1),opacity .2s,filter .2s,transform .15s}.rm-seg:hover{filter:brightness(1.18)}.rm-seg.sel{filter:brightness(1.2);transform:scaleY(1.5)}.rm-seg.dim{opacity:.28}.rarity-legend{gap:var(--s2);flex-wrap:wrap;align-items:center;display:flex}.rl{background:var(--elev);border:1px solid var(--line);color:var(--fg-soft);border-radius:999px;align-items:center;gap:8px;padding:7px 13px;font-size:13px;font-weight:500;transition:all .15s;display:inline-flex}.rl:hover{color:var(--fg);border-color:var(--line2)}.rl.on{color:var(--fg);border-color:var(--fg-soft);background:var(--elev2)}.rl-dot{border-radius:3px;flex:none;width:9px;height:9px}.rl-n{color:var(--fg);font-variant-numeric:tabular-nums;font-weight:700}.rl-sep{background:var(--line2);width:1px;height:22px;margin:0 4px}.rl-ico{flex:none;width:14px;height:14px}.rl.fav.on{color:var(--r-l);border-color:color-mix(in oklab,var(--r-l) 55%,var(--line2));background:color-mix(in oklab,var(--r-l) 10%,var(--elev))}.rl.fav.on .rl-ico{fill:var(--r-l);stroke:var(--r-l)}.rl.shiny.on{color:var(--r-l);border-color:color-mix(in oklab,var(--r-l) 55%,var(--line2));background:color-mix(in oklab,var(--r-l) 10%,var(--elev))}.card-btn{text-align:left;cursor:pointer;content-visibility:auto;contain-intrinsic-size:auto 300px;background:0 0;border:none;width:100%;margin:0;padding:0;display:block;position:relative}.card-btn.picking .wc{opacity:.55;transition:opacity .15s}.card-btn.picked .wc{opacity:1}.pick-overlay{z-index:10;border-radius:var(--radius-lg);pointer-events:none;border:3px solid #0000;justify-content:flex-end;align-items:flex-start;padding:9px;transition:all .15s;display:flex;position:absolute;inset:0}.pick-overlay .pick-check{color:#fff;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);background:#0000008c;border:2px solid #ffffffe6;border-radius:50%;justify-content:center;align-items:center;width:28px;height:28px;font-size:15px;font-weight:800;display:flex}.pick-overlay.on{border-color:var(--accent);background:color-mix(in oklab,var(--accent) 22%,transparent);box-shadow:0 0 0 2px var(--accent) inset}.pick-check svg{width:16px;height:16px}.pick-overlay.on .pick-check{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}.loading-more{color:var(--fg-faint);padding:var(--s3) 0;text-align:center;font-size:13px}.bulk-bar{z-index:40;max-width:calc(100vw - 2 * var(--s4));background:var(--elev2);border:1px solid var(--line2);border-radius:999px;align-items:center;gap:12px;padding:8px 10px 8px 18px;display:flex;position:fixed;bottom:20px;left:50%;transform:translate(-50%);box-shadow:0 18px 44px -18px #000}.bulk-text{color:var(--fg);white-space:nowrap;font-size:13.5px}.bulk-text b{color:var(--r-l)}.bulk-bar .btn{padding:9px 18px}.grid{gap:var(--s5);grid-template-columns:repeat(auto-fill,minmax(200px,1fr));display:grid}.empty{justify-content:center;align-items:center;gap:var(--s3);min-height:44vh;color:var(--fg-soft);text-align:center;flex-direction:column;display:flex}.empty b{font-family:var(--display);color:var(--fg);font-size:19px}.loading{color:var(--fg-faint);padding:var(--s7);text-align:center}.wc.skeleton{border:1px solid var(--line);background:linear-gradient(100deg,#141613 30%,#1c201c 50%,#141613 70%) 0 0/200% 100%;animation:1.2s ease-in-out infinite sk}@keyframes sk{to{background-position:-200% 0}}.modal-backdrop{-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:2147483600;padding:var(--s4) var(--s5);background:#060806b8;justify-content:center;align-items:flex-start;animation:.18s fade;display:flex;position:fixed;inset:0}@keyframes fade{0%{opacity:0}to{opacity:1}}.modal{background:var(--surface);border:1px solid var(--line2);border-radius:var(--radius-lg);width:100%;max-width:clamp(740px,46vw,960px);max-height:calc(100dvh - 2 * var(--s4));gap:var(--s6);padding:var(--s6);grid-template-columns:minmax(0,1fr) minmax(0,1.618fr);align-items:start;display:grid;position:relative;overflow:auto}.modal-card{width:100%}.modal-close{color:var(--fg-soft);cursor:pointer;z-index:2;background:0 0;border:none;font-size:28px;line-height:1;position:absolute;top:12px;right:16px}.modal-close:hover{color:var(--fg)}.modal-info{gap:var(--s4);flex-direction:column;justify-content:flex-start;min-width:0;display:flex}.modal-rar{color:var(--rc);font-family:var(--display);letter-spacing:.04em;font-size:12px;font-weight:700}.modal-name{font-family:var(--display);letter-spacing:-.01em;font-size:26px;font-weight:700;line-height:1.15}.modal-cat{color:var(--fg-soft);font-size:14px;line-height:1.45}.modal-sum{color:var(--fg-soft);-webkit-line-clamp:4;-webkit-box-orient:vertical;font-size:13.5px;line-height:1.55;display:-webkit-box;overflow:hidden}.modal-sum.muted{color:var(--fg-faint)}.modal .btn{text-align:center;text-decoration:none}.modal-panel{align-items:stretch;gap:var(--s4);flex-direction:column;display:flex}.modal-wiki{color:var(--accent);align-self:flex-start;font-size:13.5px;font-weight:600;text-decoration:none}.modal-wiki:hover{text-decoration:underline}.actions{border-top:1px solid var(--line);padding-top:var(--s4)}.modal-credit{color:var(--fg-faint);font-size:11px}@media (prefers-reduced-motion:reduce){.flip-in,.stage-aura,.reveal-rarity,.rg-card,.booster-main,.booster-shine{animation:none}.booster,.wc{transition:none}}@media (width<=900px){:host,:root{--sidebar:100%}.app{grid-template-rows:auto 1fr;grid-template-columns:1fr}.side{align-items:center;gap:var(--s4);height:auto;padding:var(--s3) var(--s4);flex-flow:wrap;position:static}.side .brand{margin-right:auto}.side-foot{flex-direction:row;align-items:center;margin-top:0}.nav{-webkit-overflow-scrolling:touch;gap:var(--s2);flex-flow:row;overflow:auto visible}.nav button{white-space:nowrap;flex:none;width:auto;padding:9px 12px}.nav-sep{display:none}.nav-grid{padding-left:var(--s2);margin-left:var(--s1);border-left:1px solid var(--line2);gap:2px;display:flex}.nav-grid a{flex:none;padding:10px;font-size:13px}.nav-grid a svg{opacity:.7;width:18px;height:18px}.nav-lbl,.side-foot{display:none}.side .nav{scrollbar-width:none;flex:100%;order:2}.app{position:relative}.side .brand{min-height:38px}.topbar{top:var(--s3);right:var(--s4);-webkit-backdrop-filter:none;backdrop-filter:none;background:0 0;border:0;padding:0;position:absolute}.crumb{display:none}.wallet{position:relative}.notif,.snd{position:static}.notif-panel{width:min(340px,calc(100vw - 2 * var(--s4)))}}@media (width<=560px){.chip{padding:8px 12px}.badge.pro{display:none}.brand b{font-size:17px}.wallet{gap:6px}.wallet .bell{width:34px;height:34px}.chip-cap{display:none}}@media (width<=400px){.brand b{font-size:15px}.wallet{gap:4px}.chip{gap:6px;padding:7px 10px}}@media (width<=370px){.brand{gap:7px}.brand b{font-size:14px}}@media (width<=340px){.brand b{display:none}.bulk-bar{bottom:72px;left:var(--s4);right:var(--s4);justify-content:flex-end;gap:var(--s2) var(--s3);border-radius:var(--radius-lg);max-width:none;padding:var(--s3);flex-wrap:wrap;transform:none}.bulk-text{white-space:normal;flex:auto;min-width:0;padding-left:6px;line-height:1.35}.bulk-bar:has(.btn+.btn) .bulk-text{flex-basis:100%}.bulk-bar .btn{padding-inline:var(--s3);flex:1 1 0}}@media (width<=560px){.modal{text-align:center;justify-items:center;gap:var(--s4);padding:var(--s5);grid-template-columns:1fr}.modal-card{width:190px}.fact{flex-basis:40%}.grid{gap:var(--s4);grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}}.actions{gap:var(--s2);margin-top:var(--s2);display:flex}.actions .btn{padding-inline:var(--s3);flex:1}.btn.danger{color:#f0a0a0;border-color:#5a2b2b}.btn.danger:hover{color:#f8caca;border-color:#f26d6d}.af-input-row{align-items:center;display:flex;position:relative}.af-input{background:var(--surface);border:1px solid var(--line2);color:var(--fg);font-family:var(--body);border-radius:9px;flex:1;width:100%;padding:9px 40px 9px 12px;font-size:14px}.af-unit{color:var(--fg-faint);pointer-events:none;font-size:13px;position:absolute;right:12px}.af-input:focus{border-color:var(--accent)}.af-actions{gap:8px;margin-top:4px;display:flex}.af-actions .btn{padding-inline:var(--s3);flex:1}.modal-msg{color:#f0a0a0;font-size:12.5px}.modal-msg.ok{color:var(--accent)}.confirm{margin-top:var(--s2);background:var(--elev);border:1px solid var(--line);border-radius:12px;flex-direction:column;gap:10px;padding:14px;display:flex}.confirm-text{color:var(--fg);font-size:14px;line-height:1.4}.confirm-text b{color:var(--r-l);font-weight:700}.sell2{margin-top:var(--s2);background:var(--elev);border:1px solid var(--line);border-radius:14px;flex-direction:column;gap:14px;padding:16px;display:flex}.sell2-head{font-family:var(--display);color:var(--fg);font-size:15px;font-weight:700}.sell2-block{flex-direction:column;gap:8px;display:flex}.sell2-lab{letter-spacing:.02em;color:var(--fg-soft);text-transform:uppercase;justify-content:space-between;align-items:center;font-size:12px;font-weight:600;display:flex}.sell2-suggest{background:color-mix(in oklab,var(--r-l) 15%,transparent);border:1px solid color-mix(in oklab,var(--r-l) 30%,transparent);color:var(--r-l);cursor:pointer;text-transform:none;letter-spacing:0;border-radius:999px;padding:3px 10px;font-size:11.5px;font-weight:600;transition:all .12s}.sell2-suggest:hover{background:color-mix(in oklab,var(--r-l) 24%,transparent)}.sell2 .af-input{font-variant-numeric:tabular-nums;font-size:16px;font-weight:600}.sell2-durs{grid-template-columns:repeat(7,1fr);gap:6px;display:grid}.sell2-dur{white-space:nowrap;background:var(--elev2);border:1px solid var(--line);color:var(--fg-soft);cursor:pointer;font-variant-numeric:tabular-nums;border-radius:9px;padding:9px 2px;font-size:12px;font-weight:600;transition:all .12s}.sell2-dur:hover{color:var(--fg);border-color:var(--line2)}.sell2-dur.on{background:color-mix(in oklab,var(--accent) 16%,transparent);border-color:var(--accent);color:var(--accent)}.market-avg{background:var(--elev);border:1px solid var(--line);border-radius:12px;margin-bottom:10px;padding:12px 14px}.market-avg .ma-label{letter-spacing:.03em;text-transform:uppercase;color:var(--fg-soft);font-size:11.5px;font-weight:600}.market-avg .ma-value{font-family:var(--display);color:var(--r-l);font-variant-numeric:tabular-nums;margin-top:2px;font-size:24px;font-weight:700}.market-avg .ma-value span{color:var(--fg-faint);font-size:13px;font-weight:600}.modal-tabs{background:var(--elev);border:1px solid var(--line);border-radius:10px;align-self:flex-start;gap:4px;margin-top:2px;padding:3px;display:inline-flex}.modal-tabs button{color:var(--fg-soft);font-family:var(--display);cursor:pointer;background:0 0;border:none;border-radius:8px;padding:6px 14px;font-size:13px;font-weight:600;transition:all .15s}.modal-tabs button.on{background:var(--accent);color:var(--accent-ink)}.market-chart{margin-top:var(--s1)}.mc-head{color:var(--fg-soft);margin-bottom:6px;font-size:11.5px}.mc-plot{align-items:stretch;gap:8px;display:flex}.mc-y{text-align:right;min-width:30px;color:var(--fg-faint);font-variant-numeric:tabular-nums;flex-direction:column;justify-content:space-between;padding:2px 0;font-size:10px;display:flex}.mc-plot svg{background:var(--elev);border:1px solid var(--line);border-radius:10px;flex:1;height:56px;display:block}.mc-x{color:var(--fg-faint);justify-content:space-between;margin-top:4px;margin-left:38px;font-size:10px;display:flex}.market-grid{gap:var(--s3);margin-top:var(--s3);grid-template-columns:repeat(4,1fr);display:grid}.mstat{background:var(--elev);border:1px solid var(--line);text-align:center;border-radius:12px;padding:12px 10px}.mstat .l{color:var(--fg-faint);font-size:10.5px}.mstat .v{font-family:var(--display);font-variant-numeric:tabular-nums;margin-top:2px;font-size:20px;font-weight:700}@media (width<=560px){.market-grid{grid-template-columns:repeat(2,1fr)}}.facts{gap:var(--s2);flex-wrap:wrap;display:flex}.fact{background:var(--elev);border:1px solid var(--line);border-radius:11px;flex:112px;padding:10px 13px}.fk{color:var(--fg-faint);font-size:11px}.fv{font-family:var(--display);font-variant-numeric:tabular-nums;margin-top:3px;font-size:18px;font-weight:700;line-height:1.15}.fv.atk{color:#f26d6d}.fv.def{color:#5aa2ff}.fv.val{color:var(--r-l)}.modal-obtained{color:var(--fg-faint);margin-top:calc(-1 * var(--s2));font-size:12px}.modal-backdrop,.modal{overscroll-behavior:contain}.wc.is-unowned{filter:saturate(.72)brightness(.9)}.card-btn:hover .wc.is-unowned{filter:saturate()brightness()}.wc-wish{border:1px solid color-mix(in oklab,var(--r-sr) 60%,#ffffff4d);color:var(--r-sr);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);background:#0000008c;border-radius:6px;justify-content:center;align-items:center;width:22px;height:20px;font-size:12px;font-weight:700;display:inline-flex}.wc.is-nsfw .wc-photo,.wc.is-nsfw .wc-blur{filter:blur(18px)saturate(.7);transform:scale(1.2)}.wc-nsfw{z-index:3;font:600 11px/1 var(--display);color:var(--fg);border:1px solid var(--line2);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);white-space:nowrap;background:#0009;border-radius:999px;padding:6px 12px;position:absolute;top:44%;left:50%;transform:translate(-50%,-50%)}.grid{position:relative}.grid>*{transition:opacity .2s}.grid.dim{pointer-events:none}.grid.dim>*{opacity:.45}.grid.dim:before{content:\"\";left:0;right:0;top:calc(-1 * var(--s4));z-index:2;background:linear-gradient(90deg,transparent,var(--accent) 40%,var(--accent) 60%,transparent) no-repeat,color-mix(in oklab,var(--accent) 14%,transparent);background-size:40% 100%,100% 100%;border-radius:3px;height:3px;animation:1.1s ease-in-out infinite load-bar;position:absolute}.grid.dim:after{content:\"\";z-index:2;pointer-events:none;background:linear-gradient(100deg,#0000 30%,#ffffff0d 50%,#0000 70%) 0 0/220% 100%;animation:1.4s ease-in-out infinite reverse sk;position:absolute;inset:0}@keyframes load-bar{0%{background-position:-40% 0,0 0}to{background-position:140% 0,0 0}}.spin{border:2px solid color-mix(in oklab,currentColor 22%,transparent);border-top-color:currentColor;border-radius:50%;flex:none;width:15px;height:15px;animation:.7s linear infinite spin;display:inline-block}.search-wrap .spin.search-ico{width:16px;height:16px;color:var(--accent)}@keyframes spin{to{transform:rotate(360deg)}}.sync{color:var(--accent);background:color-mix(in oklab,var(--accent) 10%,transparent);font-variant-numeric:tabular-nums;vertical-align:1px;border-radius:999px;align-items:center;gap:7px;margin-left:10px;padding:2px 10px 2px 8px;font-size:12px;display:inline-flex}.sync .spin{width:11px;height:11px}.cmp-row.sk{cursor:default;background:linear-gradient(100deg,var(--elev2) 30%,color-mix(in oklab,var(--elev2) 70%,#fff 6%) 50%,var(--elev2) 70%);background-size:200% 100%;animation:1.2s ease-in-out infinite sk}.wc-photo,.wc-blur,.wc-bg{opacity:0;transition:opacity .35s}.wc.is-ready .wc-photo,.wc.is-ready .wc-blur,.wc.is-ready .wc-bg{opacity:1}.wc:not(.is-ready):not(.skeleton) .wc-face:before{content:\"\";z-index:0;background:linear-gradient(100deg,#0000 30%,#ffffff0f 50%,#0000 70%) 0 0/200% 100%;animation:1.2s ease-in-out infinite sk;position:absolute;inset:0}@media (prefers-reduced-motion:reduce){.grid.dim:before{background-size:100% 100%,100% 100%;animation:none}.grid.dim:after,.wc-face:before,.cmp-row.sk{animation:none}.spin{animation-duration:2s}.wc-photo,.wc-blur,.wc-bg{transition:none}}.pager{justify-content:center;align-items:center;gap:var(--s4);margin:var(--s6) 0 var(--s5);display:flex}.pager-info{color:var(--fg-soft);font-variant-numeric:tabular-nums;font-size:13.5px}.auc-item{flex-direction:column;gap:6px;display:flex}.auc-item .card-btn{width:100%}.auc-meta{justify-content:space-between;align-items:center;gap:8px;padding:0 2px;display:flex}.auc-bid{font-family:var(--display);color:var(--r-l);font-variant-numeric:tabular-nums;align-items:center;gap:5px;font-size:14px;font-weight:700;display:inline-flex}.auc-coin{background:var(--coin);width:11px;height:11px;box-shadow:0 0 6px color-mix(in oklab,var(--r-l) 55%,transparent);border-radius:50%;flex:none}.auc-end{color:var(--fg-soft);font-variant-numeric:tabular-nums;font-size:12.5px}.auc-seller{color:var(--fg-faint);white-space:nowrap;text-overflow:ellipsis;padding:0 2px;font-size:11.5px;overflow:hidden}.auc-seller.lead{color:var(--accent);font-weight:600}.auc-foot{justify-content:space-between;align-items:center;gap:8px;min-width:0;display:flex}.auc-foot .auc-seller{min-width:0}.auc-dup{font:700 11px/1 var(--display);color:var(--fg);background:var(--elev2);border:1px solid var(--line2);font-variant-numeric:tabular-nums;border-radius:999px;flex:none;padding:4px 8px}.cmp-head{justify-content:space-between;align-items:baseline;gap:var(--s3);flex-wrap:wrap;margin-bottom:10px;display:flex}.cmp-head h3{margin:0}.cmp-sum{color:var(--fg-soft);font-size:12.5px}.cmp-sum b{color:var(--fg);font-variant-numeric:tabular-nums}.cmp-list{scrollbar-width:thin;scrollbar-color:var(--line2) transparent;flex-direction:column;gap:4px;max-height:220px;margin:0;padding:0;list-style:none;display:flex;overflow:auto}.cmp-row{align-items:center;gap:var(--s3);background:var(--elev2);width:100%;min-height:40px;color:var(--fg);font:inherit;text-align:left;cursor:pointer;border:1px solid #0000;border-radius:10px;grid-template-columns:minmax(80px,1fr) minmax(96px,1fr) minmax(120px,1.4fr) minmax(0,1.2fr);padding:8px 12px;font-size:13px;transition:border-color .15s,background .15s;display:grid}.cmp-row:hover:not(:disabled){border-color:var(--line2)}.cmp-row.here{cursor:default;border-color:color-mix(in oklab,var(--accent) 45%,var(--line));background:color-mix(in oklab,var(--accent) 8%,var(--elev2))}.cmp-price{font-family:var(--display);color:var(--r-l);font-variant-numeric:tabular-nums;align-items:center;gap:6px;font-size:15px;font-weight:700;display:inline-flex}.cmp-shiny{color:#f3d27a;display:inline-flex}.cmp-shiny svg{width:12px;height:12px}.cmp-gap{font-variant-numeric:tabular-nums;color:var(--fg-soft)}.cmp-gap.best{color:var(--accent);font-weight:600}.cmp-time{font-variant-numeric:tabular-nums;flex-wrap:wrap;align-items:center;gap:8px;display:inline-flex}.cmp-time.soon{color:var(--bad)}.cmp-tag{color:var(--fg-soft);background:var(--elev);border:1px solid var(--line2);white-space:nowrap;border-radius:999px;padding:2px 7px;font-size:10.5px;font-weight:700}.cmp-who{color:var(--fg-faint);white-space:nowrap;text-overflow:ellipsis;text-align:right;overflow:hidden}@media (width<=560px){.cmp-list{max-height:none;overflow:visible}.cmp-row{grid-template-columns:auto 1fr;row-gap:6px}.cmp-gap{text-align:right}.cmp-time{justify-content:flex-start}}.auc-end.soon{color:var(--bad)}.mkt-filter{margin-bottom:var(--s5)}.tabs{gap:var(--s5);border-bottom:1px solid var(--line);margin-bottom:var(--s5);scrollbar-width:none;display:flex;overflow-x:auto}.tabs button{color:var(--fg-soft);font:inherit;white-space:nowrap;cursor:pointer;background:0 0;border:0;border-bottom:2px solid #0000;margin-bottom:-1px;padding:0 0 12px;font-size:14px;font-weight:500;transition:color .15s,border-color .15s}.tabs button:hover{color:var(--fg)}.tabs button.on{color:var(--fg);border-bottom-color:var(--accent);font-weight:600}.auc{width:min(900px,94vw);max-height:calc(100dvh - 2 * var(--s4));background:var(--surface);border:1px solid var(--line2);border-radius:var(--radius-lg);padding:var(--s6);gap:var(--s5);flex-direction:column;display:flex;position:relative;overflow:auto;box-shadow:0 40px 90px -30px #000}.auc-top{gap:var(--s6);grid-template-columns:minmax(0,1fr) minmax(0,1.618fr);align-items:start;display:grid}.auc-card .wc{border-radius:14px}.auc-body{gap:var(--s4);flex-direction:column;min-width:0;display:flex}.auc-name{font-family:var(--display);letter-spacing:-.02em;margin-top:6px;font-size:clamp(22px,2.6vw,30px);font-weight:700;line-height:1.1}.auc-cat{color:var(--fg-soft);margin-top:4px;font-size:14px}.auc-by{color:var(--fg-faint);margin-top:6px;font-size:12.5px}.auc-state{background:var(--elev);border:1px solid var(--line);border-radius:14px;flex-direction:column;gap:6px;padding:16px 18px;display:flex}.auc-state[data-phase=sold]{border-color:color-mix(in oklab,var(--accent) 40%,var(--line));background:color-mix(in oklab,var(--accent) 6%,var(--elev))}.auc-row{justify-content:space-between;gap:var(--s4);flex-wrap:wrap;display:flex}.auc-k{color:var(--fg-soft);letter-spacing:.02em;font-size:12px}.auc-price{font-family:var(--display);color:var(--r-l);font-variant-numeric:tabular-nums;align-items:center;gap:9px;font-size:34px;font-weight:800;line-height:1.1;display:inline-flex}.auc-price.muted{color:var(--fg-soft)}.auc-price .auc-coin{width:17px;height:17px}.auc-clock{text-align:right}.auc-time{font-family:var(--display);font-variant-numeric:tabular-nums;font-size:26px;font-weight:800;line-height:1.2}.auc-clock[data-u=warn] .auc-time{color:var(--r-ur)}.auc-clock[data-u=crit] .auc-time{color:var(--bad);animation:1s ease-in-out infinite auc-pulse}.auc-clock[data-u=end] .auc-time{color:var(--fg-faint)}.auc-sub{color:var(--fg-faint);flex-wrap:wrap;align-items:center;gap:10px;font-size:12.5px;display:flex}.auc-live{color:var(--accent);align-items:center;gap:6px;display:inline-flex}.auc-dot{background:var(--accent);border-radius:50%;width:7px;height:7px;animation:1.8s ease-out infinite auc-live}.auc-flag{border-radius:10px;padding:8px 12px;font-size:13px;font-weight:600}.auc-flag.lead{background:color-mix(in oklab,var(--accent) 14%,transparent);color:var(--accent)}.auc-flag.out{background:color-mix(in oklab,var(--bad) 14%,transparent);color:var(--bad)}.auc-act{flex-direction:column;gap:10px;display:flex}.auc-inline{gap:8px;display:flex}.auc-inline .af-input-row{flex:1}.auc-inline .btn{padding:10px 22px}.auc-cta{width:100%;padding:12px}.auc-quick{flex-wrap:wrap;gap:6px;display:flex}.auc-quick button{background:var(--elev);border:1px solid var(--line);color:var(--fg-soft);cursor:pointer;border-radius:999px;padding:6px 12px;font-size:12.5px;font-weight:600;transition:all .12s}.auc-quick button:hover{color:var(--fg);border-color:var(--line2)}.auc-bal{color:var(--fg-faint);font-size:12px}.auc-bal.low{color:var(--bad)}.auc-note{color:var(--fg-soft);font-size:13px}.auc-bottom{gap:var(--s4);grid-template-columns:1fr 1fr;display:grid}.auc-panel{background:var(--elev);border:1px solid var(--line);border-radius:14px;min-width:0;padding:14px 16px}.auc-panel h3{font-family:var(--display);color:var(--fg-soft);margin-bottom:10px;font-size:13px;font-weight:700}.auc-chart{height:130px;margin-left:36px;position:relative}.auc-chart svg{width:100%;height:100%;display:block;overflow:visible}.auc-chart .mc-y{position:absolute;top:0;bottom:0;left:-36px}.auc-pt{background:var(--accent);width:6px;height:6px;box-shadow:0 0 0 2px var(--elev);border-radius:50%;margin:-3px 0 0 -3px;position:absolute}.auc-axis{color:var(--fg-faint);justify-content:space-between;margin:8px 0 0 36px;font-size:11px;display:flex}.auc-empty{color:var(--fg-faint);padding:8px 0;font-size:13px}.auc-feed{max-height:176px;margin:0;padding:0;list-style:none;overflow:auto}.auc-feed li{border-top:1px solid var(--line);align-items:center;gap:8px;padding:7px 0;font-size:13px;display:flex}.auc-feed li:first-child{border-top:0}.auc-feed .who{white-space:nowrap;text-overflow:ellipsis;flex:1;min-width:0;font-weight:500;overflow:hidden}.auc-feed .me .who{color:var(--accent)}.auc-feed .tag{letter-spacing:.03em;color:var(--accent-ink);background:var(--accent);border-radius:999px;padding:2px 7px;font-size:10.5px;font-weight:700}.auc-feed .amt{color:var(--r-l);font-variant-numeric:tabular-nums;font-weight:700}.auc-feed li:not(.top) .amt{color:color-mix(in oklab,var(--r-l) 70%,var(--fg-soft))}.auc-feed .when{color:var(--fg-faint);text-align:right;min-width:74px;font-size:11.5px}.auc,.auc-feed,.modal,.notif-panel{scrollbar-width:thin;scrollbar-color:var(--line2) transparent}@keyframes auc-pulse{50%{opacity:.55}}@keyframes auc-live{0%{box-shadow:0 0 0 0 color-mix(in oklab,var(--accent) 55%,transparent)}70%{box-shadow:0 0 0 7px #0000}to{box-shadow:0 0 #0000}}@media (width<=760px){.auc-top,.auc-bottom{grid-template-columns:1fr}.auc-card{width:180px;margin:0 auto}}@media (prefers-reduced-motion:reduce){.auc-clock[data-u=crit] .auc-time,.auc-dot{animation:none}}.wc-wish svg,.wc-star svg,.wc-shiny svg{width:12px;height:12px;display:block}.pager-btn{align-items:center;gap:7px;display:inline-flex}.pager-btn svg{width:15px;height:15px}.modal-close .x-ico{width:16px;height:16px}.search-clear .x-ico{width:13px;height:13px}.toasts{z-index:2147483601;flex-direction:column;gap:10px;width:min(360px,100vw - 40px);display:flex;position:fixed;bottom:68px;right:16px}.toast{background:var(--elev2);border:1px solid var(--line2);color:var(--fg);cursor:pointer;border-radius:14px;align-items:flex-start;gap:12px;padding:14px 16px;animation:.25s toast-in;display:flex;box-shadow:0 20px 50px -20px #000}.toast svg{width:18px;height:18px;color:var(--accent);flex:none;margin-top:1px}.toast-wrap{animation:.25s toast-in;position:relative}.toast-wrap .toast{padding-right:40px;animation:none}.toast-x{width:26px;height:26px;color:var(--fg-faint);cursor:pointer;background:0 0;border:0;border-radius:8px;justify-content:center;align-items:center;transition:background .15s,color .15s;display:flex;position:absolute;top:8px;right:8px}.toast-x:hover{background:var(--elev);color:var(--fg)}.toast-x svg{width:13px;height:13px}.toast b{font-size:13.5px;font-weight:600;display:block}.toast span{color:var(--fg-soft);margin-top:2px;font-size:12.5px;line-height:1.4;display:block}@keyframes toast-in{0%{opacity:0;transform:translateY(8px)}}.kbd{border:1px solid var(--line2);background:var(--elev);min-width:22px;height:22px;font:600 11.5px/1 var(--body);color:var(--fg);border-bottom-width:2px;border-radius:6px;justify-content:center;align-items:center;padding:0 6px;display:inline-flex}.kbd-help-scrim{z-index:2147483601;background:#06080699;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}.kbd-help{background:var(--surface);border:1px solid var(--line2);border-radius:var(--radius-lg);flex-direction:column;gap:10px;min-width:300px;padding:22px 26px;display:flex}.kbd-help h3{font-family:var(--display);margin-bottom:4px;font-size:16px}.kbd-row{color:var(--fg-soft);align-items:center;gap:12px;font-size:13.5px;display:flex}.kbd-row .kbd{min-width:58px}@media (prefers-reduced-motion:reduce){.toast,.toast-wrap{animation:none}}.hc-backdrop{z-index:2147483601}.modal.hc{gap:var(--s3);text-align:center;grid-template-columns:1fr;justify-items:center;max-width:420px}.hc-title{font-family:var(--display);font-size:20px}.hc-sub{color:var(--fg-soft);align-items:center;gap:8px;font-size:13.5px;display:inline-flex}.hc-box{justify-content:center;min-height:70px;display:flex}.hc-cancel{color:var(--fg-faint);font-weight:500}.tab-n{min-width:18px;height:18px;font:700 11px/1 var(--display);background:color-mix(in oklab,var(--accent) 18%,transparent);color:var(--accent);border-radius:999px;justify-content:center;align-items:center;margin-left:6px;padding:0 6px;display:inline-flex}.nowrap{white-space:nowrap}.trade-status{background:var(--elev2);color:var(--fg-soft);white-space:nowrap;border-radius:999px;align-items:center;padding:4px 9px;font-size:11.5px;font-weight:700;line-height:1;display:inline-flex}.trade-status[data-s=pending]{background:color-mix(in oklab,var(--r-l) 14%,transparent);color:var(--r-l)}.trade-status[data-s=accepted]{background:color-mix(in oklab,var(--accent) 14%,transparent);color:var(--accent)}.trade-status[data-s=declined]{background:color-mix(in oklab,var(--bad) 15%,transparent);color:var(--bad)}.trade-status[data-s=cancelled]{color:var(--fg-faint)}.tr-head{margin-bottom:var(--s4);align-items:center}.tr-split{gap:var(--s4);grid-template-columns:minmax(0,1fr);display:grid}.tr-col,.tr-pane{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-lg);min-width:0}.tr-col{flex-direction:column;display:flex;overflow:hidden}.tr-tabs{padding:0 var(--s2);flex:none;gap:0;margin:0}.tr-tabs button{padding:var(--s4) var(--s2) 14px;flex:1;justify-content:center;align-items:center;display:inline-flex}.tr-rows{padding:var(--s2);overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--line2) transparent;flex-direction:column;gap:2px;display:flex;overflow:auto}.tr-row{align-items:center;gap:var(--s3);width:100%;min-height:68px;padding:10px var(--s3);color:var(--fg);font:inherit;text-align:left;cursor:pointer;background:0 0;border:1px solid #0000;border-radius:12px;grid-template-columns:40px minmax(0,1fr) auto;transition:background .15s,border-color .15s;display:grid;position:relative}.tr-row:hover{background:var(--elev)}.tr-row.on{background:var(--elev2);border-color:var(--line2)}.tr-row.on:before{content:\"\";background:var(--accent);border-radius:0 3px 3px 0;width:3px;position:absolute;top:14px;bottom:14px;left:-1px}.tr-row.sk{cursor:default;background:linear-gradient(100deg,var(--surface) 30%,var(--elev) 50%,var(--surface) 70%);background-size:200% 100%;height:68px;animation:1.2s ease-in-out infinite sk}.tr-row-main{flex-direction:column;gap:5px;min-width:0;display:flex}.tr-row-top{align-items:baseline;gap:var(--s2);min-width:0;display:flex}.tr-row-top b{text-overflow:ellipsis;white-space:nowrap;flex:0 auto;min-width:0;font-size:14.5px;font-weight:600;overflow:hidden}.tr-row-when{text-overflow:ellipsis;min-width:0;color:var(--fg-faint);flex:0 1000 auto;margin-left:auto;font-size:12px;overflow:hidden}.tr-row-line{min-width:0;color:var(--fg-soft);-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:13px;line-height:1.35;display:-webkit-box;overflow:hidden}.tr-col-none{padding:var(--s5) var(--s4);text-align:center;color:var(--fg-faint);font-size:13.5px;display:none}.tr-badge{text-align:center;min-width:46px;font:700 13px/1 var(--display);font-variant-numeric:tabular-nums;white-space:nowrap;background:var(--elev2);color:var(--fg-soft);border-radius:9px;padding:6px 9px}.tr-row.on .tr-badge[data-k=balanced],.tr-row.on .tr-badge[data-k=unknown]{background:var(--line)}.tr-badge[data-k=advantage]{background:color-mix(in oklab,var(--accent) 15%,transparent);color:var(--accent)}.tr-badge[data-k=disadvantage]{background:color-mix(in oklab,var(--bad) 15%,transparent);color:var(--bad)}.tr-badge[data-k=unknown]{color:var(--fg-faint)}.tr-row>.trade-status{padding:6px 9px}.tr-empty{justify-content:center;align-items:center;gap:var(--s2);min-height:340px;padding:var(--s6) var(--s5);text-align:center;color:var(--fg-soft);flex-direction:column;flex:1;font-size:14px;display:flex}.tr-empty b{font:700 19px/1.3 var(--display);color:var(--fg)}.tr-empty .btn{margin-top:var(--s3)}.tr-empty-ico{width:64px;height:64px;margin-bottom:var(--s2);color:var(--accent);background:color-mix(in oklab,var(--accent) 10%,var(--elev));border:1px solid color-mix(in oklab,var(--accent) 28%,var(--line));border-radius:50%;justify-content:center;align-items:center;display:flex}.tr-empty-ico svg{width:28px;height:28px}.tr-pane{flex-direction:column;display:flex;overflow:hidden;container:tpane/inline-size}.tr-pane-sk{padding:var(--s5);gap:var(--s5);flex-direction:column;display:flex}.tr-pane-sk .sk-line{background:var(--elev);border-radius:12px;width:min(320px,70%);height:44px;animation:1.2s ease-in-out infinite sk}.tr-pane-sk .sk-cards{justify-content:center;gap:var(--s7);grid-template-columns:repeat(2,minmax(0,220px));display:grid}.tr-pane-sk .wc{aspect-ratio:5/7}.tp{flex-direction:column;flex:1;min-height:0;display:flex}.tp-head{align-items:center;gap:var(--s3);padding:var(--s4) var(--s5);border-bottom:1px solid var(--line);flex:none;display:flex}.tp-back{flex:none;justify-content:center;width:42px;padding:0}.tp-title{flex-direction:column;flex:1;gap:5px;min-width:0;display:flex}.tp-title h2{font:700 20px/1.2 var(--display);letter-spacing:-.01em;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tp-sub{align-items:center;gap:4px var(--s2);color:var(--fg-faint);flex-wrap:wrap;font-size:12.5px;display:flex}.tp-mode{flex:none;align-self:center;margin:0}.tp-mode button{align-items:center;gap:7px;display:inline-flex}.tp-mode svg{width:15px;height:15px}.tp-body{overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--line2) transparent;min-height:0;padding:clamp(var(--s3),2.5cqi,var(--s5));gap:var(--deal-bodyGap);flex-direction:column;flex:1;display:flex;overflow:auto}.tp-body>:first-child{margin-top:auto}.tp-body>:last-child{margin-bottom:auto}.tp-sides{justify-content:center;align-items:stretch;gap:var(--deal-gap);display:flex}.tp-sides.measuring{visibility:hidden}.tp-sides.stacked{flex-direction:column}.tside{gap:var(--s3);min-width:0;padding:calc(var(--deal-pad) - 1px);border-radius:var(--radius);background:var(--elev);border:1px solid var(--line);flex-direction:column;flex:none;display:flex}.tside-head{justify-content:space-between;align-items:baseline;gap:4px var(--s2);white-space:nowrap;letter-spacing:.05em;text-transform:uppercase;color:var(--fg-soft);flex-wrap:wrap;font-size:11.5px;font-weight:700;display:flex}.tside-total{text-transform:none;letter-spacing:0;color:var(--fg);font:700 16px/1 var(--display);font-variant-numeric:tabular-nums;white-space:nowrap}.tside-total.is-none{font:500 13px var(--body);color:var(--fg-faint)}.tside-none{color:var(--fg-faint);padding:var(--s3) 0;width:var(--card-w);font-size:13px}.tside-cards{align-content:flex-start;gap:var(--deal-gap);width:calc(var(--cols,1) * var(--card-w) + (var(--cols,1) - 1) * var(--deal-gap));flex-wrap:wrap;margin-inline:auto;display:flex}.tside-cards>*{width:var(--card-w);flex:none}.tside>:nth-child(2){margin-top:auto}.tside>:last-child{margin-bottom:auto}.stacked .tside-none{width:auto}.tp-sides:not(.stacked) .tside{width:min-content}.tp-sides.scrolls:not(.stacked){align-items:flex-start}.tp-sides.scrolls .tside>*{margin-block:0}.tp-sides.scrolls:not(.stacked) .tm-verdict{top:var(--s4);margin-top:calc(var(--card-w) * .5);align-self:flex-start;position:sticky}.tside-coins{aspect-ratio:5/7;border-radius:var(--radius-lg);border:1px dashed color-mix(in oklab,var(--r-l) 45%,var(--line2));background:color-mix(in oklab,var(--r-l) 8%,var(--surface));color:var(--r-l);flex-direction:column;justify-content:center;align-items:center;gap:6px;display:flex}.tside-coins svg{flex:none;width:26px;height:26px}.tside-chip{height:calc(var(--deal-chip) - var(--s3));justify-content:center;align-items:center;gap:var(--s2);padding:0 var(--s3);border:1px dashed color-mix(in oklab,var(--r-l) 45%,var(--line2));background:color-mix(in oklab,var(--r-l) 8%,var(--surface));color:var(--fg-soft);white-space:nowrap;border-radius:999px;flex:none;font-size:13px;display:flex}.tside-chip svg{width:16px;height:16px;color:var(--r-l);flex:none}.tside-chip b{font:700 15px/1 var(--display);color:var(--r-l);font-variant-numeric:tabular-nums}.tside-coins b{font:800 26px/1 var(--display);font-variant-numeric:tabular-nums}.tside-coins span{color:var(--fg-soft);font-size:12px}.tm-verdict{text-align:center;color:var(--fg-soft);flex-direction:column;align-self:center;align-items:center;gap:6px;min-width:120px;display:flex}.tm-verdict svg{width:22px;height:22px}.tm-verdict b{font:700 14px/1.2 var(--display);color:var(--fg)}.tm-verdict span{font-variant-numeric:tabular-nums;overflow-wrap:anywhere}.tm-verdict[data-k=advantage] b,.tm-verdict[data-k=advantage] span{color:var(--accent)}.tm-verdict[data-k=disadvantage] b,.tm-verdict[data-k=disadvantage] span{color:var(--bad)}.tp .tm-verdict{width:var(--deal-verdictW);flex:none;min-width:0}.tp .tm-verdict svg{box-sizing:content-box;background:var(--elev2);border:1px solid var(--line2);border-radius:50%;padding:12px}.tp .tm-verdict[data-k=advantage] svg{background:color-mix(in oklab,var(--accent) 14%,var(--elev));border-color:color-mix(in oklab,var(--accent) 40%,var(--line))}.tp .tm-verdict[data-k=disadvantage] svg{background:color-mix(in oklab,var(--bad) 13%,var(--elev));border-color:color-mix(in oklab,var(--bad) 38%,var(--line))}.tp .tm-verdict b{font-size:13px}.tp .tm-verdict span{font:700 15px/1.2 var(--display)}.tp .stacked .tm-verdict{width:auto;min-height:var(--deal-verdictH);justify-content:center;gap:var(--s2) var(--s3);flex-flow:wrap}.tp .stacked .tm-verdict svg{padding:8px;transform:rotate(90deg)}.tp-chain{width:100%;max-width:720px;margin-inline:auto}.tp-chain h3{letter-spacing:.05em;text-transform:uppercase;color:var(--fg-soft);margin-bottom:var(--s2);font-size:11.5px;font-weight:700}.tp-chain ol{--dot:9px;flex-direction:column;margin:0;padding:0;list-style:none;display:flex}.tp-chain li{align-items:center;gap:var(--s3);min-height:34px;padding-left:calc(var(--dot) + var(--s3));color:var(--fg-soft);font-size:13.5px;display:flex;position:relative}.tp-chain li:before{content:\"\";width:var(--dot);height:var(--dot);margin-top:calc(var(--dot) / -2);background:var(--line2);z-index:1;border-radius:50%;position:absolute;top:50%;left:0}.tp-chain li:after{content:\"\";left:calc(var(--dot) / 2 - 1px);background:var(--line);width:2px;position:absolute;top:0;bottom:0}.tp-chain li:first-child:after{top:50%}.tp-chain li:last-child:after{bottom:50%}.tp-chain li:only-child:after{display:none}.tp-chain li.now{color:var(--fg)}.tp-chain li.now:before{background:var(--fg-soft)}.tp-chain li[data-k=accepted]:before{background:var(--accent)}.tp-chain li[data-k=accepted] b{color:var(--accent)}.tp-chain li[data-k=declined]:before{background:var(--bad)}.tp-chain li[data-k=declined] b{color:var(--bad)}.tp-chain li[data-k=pending]:before{background:var(--r-l)}.tp-step{align-items:center;gap:var(--s3);min-width:0;padding:6px var(--s2);border-radius:calc(var(--radius) / 1.618);color:inherit;font:inherit;text-align:left;cursor:pointer;background:0 0;border:0;flex:1;margin-inline-start:calc(-1 * var(--s2));display:flex}.tp-step:hover{background:var(--elev)}.tp-step.on{background:var(--elev);color:var(--fg)}.tp-step-deal{color:var(--fg-faint);font-size:12.5px;display:block}.tp-earlier{justify-content:space-between;align-items:center;gap:var(--s2) var(--s3);width:100%;max-width:720px;padding:6px 6px 6px var(--s4);border-radius:var(--radius);background:color-mix(in oklab,var(--r-l) 10%,var(--surface));border:1px solid color-mix(in oklab,var(--r-l) 30%,var(--line));color:var(--fg-soft);flex-wrap:wrap;margin-inline:auto;font-size:13.5px;display:flex}.tp-earlier b{color:var(--fg)}.tp-earlier .btn{padding:5px 12px;font-size:12.5px}.tr-row-rounds{color:var(--fg-faint);white-space:nowrap;margin-left:.35em}.tp-chain-what{flex:1;min-width:0}.tp-chain-when{color:var(--fg-faint);font-variant-numeric:tabular-nums;font-size:12.5px}.tp-foot{justify-content:flex-end;align-items:center;gap:var(--s3);padding:var(--s3) var(--s5);border-top:1px solid var(--line);background:var(--elev);flex-wrap:wrap;flex:none;display:flex}.tp-actions{gap:var(--s2);margin-left:auto;display:flex}.tp-actions .btn{padding:11px 22px}.tp-msg{flex:220px}.tp-confirm{align-items:center;gap:var(--s3);flex-wrap:wrap;flex:1;display:flex}.tp-confirm .confirm-text{flex:300px;margin:0}.chat{flex-direction:column;flex:1;min-height:0;display:flex}.chat-feed{overscroll-behavior:contain;min-height:0;padding:var(--s4) var(--s5);gap:var(--s2);scrollbar-width:thin;scrollbar-color:var(--line2) transparent;flex-direction:column;flex:1;display:flex;overflow:auto}.chat-feed .empty{flex:1;min-height:0}.chat-feed .empty span{font-size:13.5px}.chat-feed .loading-more{margin:auto}.bubble{background:var(--elev2);overflow-wrap:anywhere;border-radius:14px 14px 14px 4px;flex-direction:column;align-self:flex-start;gap:2px;max-width:min(80%,520px);padding:9px 12px;font-size:13.5px;line-height:1.4;display:flex}.bubble.mine{background:color-mix(in oklab,var(--accent) 18%,var(--elev2));border-radius:14px 14px 4px;align-self:flex-end}.bubble time{color:var(--fg-faint);align-self:flex-end;font-size:10.5px}.chat-trade{border:1px solid var(--line2);background:var(--elev);color:var(--fg-soft);font:inherit;cursor:pointer;border-radius:999px;align-self:center;align-items:center;gap:8px;padding:7px 12px;font-size:12.5px;display:inline-flex}.chat-trade:hover{color:var(--fg);border-color:var(--fg-soft)}.chat-trade svg{width:14px;height:14px}.chat-form{gap:var(--s2);padding:var(--s3) var(--s5);border-top:1px solid var(--line);background:var(--elev);flex:none;display:flex}.chat-input{padding-left:14px}.chat-form .btn{padding:10px 20px}.chat-msg{padding:0 var(--s5) var(--s3);background:var(--elev)}.tm-head{align-items:center;gap:var(--s3);padding-right:var(--s6);display:flex}.tm-head h2{font:700 20px/1.2 var(--display)}@media (width>=1000px){.main:has(.tr-split){height:100dvh}.view:has(>.tr-split){min-height:0;padding-top:var(--s4);flex-direction:column;flex:1;max-width:2200px;padding-bottom:72px;display:flex}.tr-head{margin-bottom:var(--s3);flex-wrap:nowrap}.tr-head>div{align-items:baseline;gap:4px var(--s3);flex-wrap:wrap;min-width:0;display:flex}.tr-head h1{font-size:clamp(22px,2vw,28px)}.tr-head .meta{margin:0}.tr-head .btn{padding:10px 20px}.tr-split{grid-template-columns:var(--tr-list) minmax(0,1fr);--tr-list:300px;flex:1;min-height:0}.tr-col{min-height:0}.tr-rows{flex:1;min-height:0}.tr-col-empty .tr-empty{display:none}.tr-col-none{display:block}.tp-back{display:none}}@media (width>=1280px){.tr-split{--tr-list:clamp(340px,24vw,380px)}}@media (width<=999.98px){.tr-pane{display:none}.tr-split.reading .tr-pane{z-index:2147483600;border:0;border-radius:0;animation:.15s fade;display:flex;position:fixed;inset:0}.tr-col-empty{display:flex}.tr-split:not(.reading) .tr-row.on{background:0 0;border-color:#0000}.tr-split:not(.reading) .tr-row.on:before{display:none}.tp-foot,.chat-form{padding-bottom:calc(var(--s3) + env(safe-area-inset-bottom))}}@media (width<=560px){.tr-head .btn{justify-content:center;width:100%}}@container tpane (width<=560px){.tp-head{padding:var(--s3) var(--s4);flex-wrap:wrap}.tp-mode{flex:100%;order:4;display:flex}.tp-mode button{flex:1;justify-content:center}.tp-foot{padding-inline:var(--s4)}.chat-feed{padding:var(--s4)}.chat-form{padding-inline:var(--s4)}}@container tpane (width<=520px){.tp-title h2{font-size:17px}.tp-actions{flex:1}.tp-actions .btn{padding-inline:var(--s2);flex:1}.tp-confirm .af-actions,.tp-confirm .tp-actions{flex:100%}}@media (prefers-reduced-motion:reduce){.tr-split.reading .tr-pane{animation:none}}.modal.composer{text-align:left;grid-template:\"pick head\"\"pick offer\"minmax(0,1fr)/minmax(0,1fr) clamp(340px,26vw,440px);place-items:stretch stretch;gap:0;max-width:min(2000px,96vw);height:94dvh;max-height:none;padding:0;overflow:hidden}.modal.composer.pick-friend{max-width:560px;height:auto;max-height:calc(100dvh - 2 * var(--s4));padding:var(--s6);gap:var(--s4);flex-direction:column;align-items:stretch;display:flex;overflow:auto}.composer:not(.pick-friend)>.tm-head{padding:var(--s4) var(--s7) var(--s3) var(--s4);border-left:1px solid var(--line);background:var(--elev);grid-area:head}.composer:not(.pick-friend)>.tm-head h2{text-overflow:ellipsis;white-space:nowrap;min-width:0;font-size:17px;overflow:hidden}.composer-sub{color:var(--fg-soft);margin-top:calc(-1 * var(--s2));font-size:14px}.composer-pick{min-width:0;min-height:0;padding:var(--s4) var(--s4) 0 var(--s5);flex-direction:column;grid-area:pick;display:flex}.composer-tab{flex-direction:column;flex:1;min-height:0;display:flex}.composer-tab[hidden]{display:none}.composer-tabs{flex:none;align-self:center;margin:0}.composer-tabs button{white-space:nowrap;align-items:center;padding:8px 14px;display:inline-flex}.composer-tabs button.on .tab-n{background:color-mix(in oklab,var(--accent-ink) 22%,transparent);color:var(--accent-ink)}.picker{gap:var(--s3);flex-direction:column;flex:1;min-height:0;display:flex;container-type:inline-size}.picker>*{flex:none}.picker-bar{align-items:center;gap:var(--s2);min-width:0;display:flex}.picker-bar .search-wrap{flex:160px;min-width:140px;max-width:420px}.picker-bar .isel{flex:none;margin-left:auto}[data-fade-axis]{--fade-to:to right;--fade:40px}[data-fade-axis=y]{--fade-to:to bottom;--fade:48px}[data-fade=end]{-webkit-mask-image:linear-gradient(var(--fade-to),#000 calc(100% - var(--fade)),transparent);mask-image:linear-gradient(var(--fade-to),#000 calc(100% - var(--fade)),transparent)}[data-fade=start]{-webkit-mask-image:linear-gradient(var(--fade-to),transparent,#000 var(--fade));mask-image:linear-gradient(var(--fade-to),transparent,#000 var(--fade))}[data-fade=both]{-webkit-mask-image:linear-gradient(var(--fade-to),transparent,#000 var(--fade),#000 calc(100% - var(--fade)),transparent);mask-image:linear-gradient(var(--fade-to),transparent,#000 var(--fade),#000 calc(100% - var(--fade)),transparent)}.picker-chips{scrollbar-width:none;min-width:0;scroll-padding-inline:var(--s5);flex-wrap:nowrap;flex:0 auto;gap:6px;overflow-x:auto}.picker-chips::-webkit-scrollbar{display:none}.picker-chips .rl{white-space:nowrap;flex:none;padding:8px 11px}.rl-code,.picker-chips.compact .rl-full{display:none}.picker-chips.compact .rl-code{display:inline}.picker-bar:has(>.picker-chips.wrap){row-gap:var(--s2);flex-wrap:wrap}.picker-chips.wrap{flex:100%;order:3}.picker-chips.wrap.compact{gap:4px}.picker-chips.wrap.compact .rl{flex:1 0 auto;justify-content:center;gap:5px;padding:8px 6px}@container (width<=720px){.picker-chips.wrap{flex:55%}.picker-bar .isel{order:4}}.picker-scroll{scrollbar-width:thin;scrollbar-color:var(--line2) transparent;min-height:0;padding:6px 8px var(--s5) 4px;gap:var(--s4);flex-direction:column;flex:1;margin-left:-4px;display:flex;overflow:auto}.picker-grid{gap:var(--s4);grid-template-columns:repeat(auto-fill,minmax(168px,1fr))}.picker-grid .empty{grid-column:1/-1;min-height:260px}.picker-more{align-items:center;gap:var(--s2);flex-direction:column;display:flex}.picker .card-btn.picking .wc{opacity:1}.picker .pick-overlay.on{box-shadow:none;background:color-mix(in oklab,var(--accent) 10%,transparent);border-color:#0000}.picker .card-btn.picked .wc{border-color:var(--rc);box-shadow:0 0 0 2px var(--rc),0 0 34px -4px color-mix(in oklab,var(--rc) 80%,transparent)}.card-btn:disabled{opacity:.35;cursor:not-allowed}.pick-lock{z-index:11;white-space:nowrap;max-width:90%;color:var(--fg);text-align:center;background:#060806d9;border-radius:999px;padding:5px 10px;font-size:11.5px;font-weight:600;line-height:1.25;position:absolute;top:42%;left:50%;transform:translate(-50%,-50%)}.offer{background:var(--elev);border-left:1px solid var(--line);flex-direction:column;grid-area:offer;min-width:0;min-height:0;display:flex}.offer-bar{display:none}.offer-panel{gap:var(--s3);min-height:0;padding:0 var(--s4) var(--s4);flex-direction:column;flex:1;display:flex}.offer-title{display:none}.offer-sides{overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--line2) transparent;gap:var(--s3);min-height:0;margin-right:calc(-1 * var(--s2));padding-right:var(--s2);scroll-padding-block:var(--fade,48px);flex-direction:column;flex:0 auto;display:flex;overflow:auto}.oside{gap:var(--s2);padding:var(--s3);border-radius:var(--radius);background:var(--surface);border:1px solid var(--line);flex-direction:column;display:flex}.oside-head{justify-content:space-between;align-items:center;gap:var(--s2);letter-spacing:.05em;text-transform:uppercase;min-width:0;color:var(--fg-soft);white-space:nowrap;font-size:11.5px;font-weight:700;display:flex}.oside-head>span:first-child{align-items:center;display:inline-flex}.oside-total{text-transform:none;letter-spacing:0;color:var(--fg);font:700 15px/1 var(--display);font-variant-numeric:tabular-nums}.oside-list{margin:0 calc(-1 * var(--s1));flex-direction:column;gap:2px;padding:0;list-style:none;display:flex}.oside-row{padding:5px var(--s1);border-radius:10px;grid-template-columns:44px minmax(0,1fr) 28px;align-items:center;gap:10px;transition:background .15s;display:grid}.oside-row:hover{background:var(--elev2)}.oside-txt{flex-direction:column;gap:3px;min-width:0;line-height:1.25;display:flex}.oside-txt b{-webkit-line-clamp:2;overflow-wrap:anywhere;-webkit-box-orient:vertical;font-size:13.5px;font-weight:600;display:-webkit-box;overflow:hidden}.oside-sub{align-items:center;gap:var(--s2);min-width:0;display:flex}.oside-cat{min-width:0;color:var(--fg-faint);text-overflow:ellipsis;white-space:nowrap;font-size:11.5px;overflow:hidden}.oside-val{color:var(--r-l);font-variant-numeric:tabular-nums;white-space:nowrap;flex:none;align-items:center;gap:5px;font-size:12.5px;font-weight:700;display:inline-flex}.oside-val:before{content:\"\";background:var(--coin);border-radius:50%;width:8px;height:8px}.oside-val.none{color:var(--fg-faint);font-weight:500}.oside-val.none:before{display:none}.oside-x{width:28px;height:28px;color:var(--fg-faint);cursor:pointer;opacity:.7;background:0 0;border:0;border-radius:8px;justify-content:center;align-items:center;transition:all .15s;display:flex}.oside-row:hover .oside-x,.oside-x:focus-visible{opacity:1}.oside-x:hover{background:var(--line);color:var(--fg)}.oside-x svg{width:13px;height:13px}.oside-hint{min-height:40px;padding:0 var(--s3);border:1px dashed var(--line2);color:var(--fg-faint);font:inherit;text-align:left;cursor:pointer;text-overflow:ellipsis;white-space:nowrap;background:0 0;border-radius:10px;align-items:center;font-size:13px;transition:all .15s;display:flex;overflow:hidden}.oside-hint:hover{color:var(--accent);border-color:color-mix(in oklab,var(--accent) 50%,var(--line2))}.oside .coins-add{align-self:flex-start;height:36px;font-size:13px}.oside .coins-field{flex:none;align-self:stretch}.cthumb{background:var(--card-bg);border:2px solid var(--rc);width:44px;height:44px;box-shadow:0 0 12px -4px color-mix(in oklab,var(--rc) 70%,transparent);border-radius:10px;flex:none;display:block;position:relative;overflow:hidden}.cthumb img{object-fit:cover;object-position:50% 22%;width:100%;height:100%;display:block}.cthumb.art img{transform:scale(1.8)}.cthumb.art[data-r=C] img,.cthumb.art[data-r=PC] img{filter:brightness(.6)saturate(1.2)}.cthumb.shiny{box-shadow:inset 0 0 0 1px #e9c15a8c,0 0 10px #e9c15a66}.cthumb.shiny:after{content:\"\";mix-blend-mode:screen;background:linear-gradient(135deg,#0000 30%,#fff8e055 50%,#0000 70%);position:absolute;inset:0}.cthumb-r{z-index:1;background:var(--rc);color:var(--accent-ink);font:800 9px/1 var(--display);letter-spacing:.02em;border-top-right-radius:6px;padding:2px 4px 1px 3px;position:absolute;bottom:0;left:0}.offer-sum{gap:var(--s2);flex-direction:column;flex:none;display:flex}.offer .tm-verdict{min-width:0;padding:14px var(--s3);border-radius:var(--radius);background:var(--surface);border:1px solid var(--line);flex-flow:wrap;justify-content:center;align-self:stretch;gap:4px 10px}.offer .tm-verdict svg{width:18px;height:18px}.offer .tm-verdict b{font-size:15px}.offer .tm-verdict span{font:700 15px/1.2 var(--display);font-variant-numeric:tabular-nums}.offer .tm-verdict[data-k=advantage]{background:color-mix(in oklab,var(--accent) 9%,var(--surface));border-color:color-mix(in oklab,var(--accent) 35%,var(--line))}.offer .tm-verdict[data-k=disadvantage]{background:color-mix(in oklab,var(--bad) 8%,var(--surface));border-color:color-mix(in oklab,var(--bad) 32%,var(--line))}.offer-sum-empty{padding:var(--s3);border-radius:var(--radius);border:1px dashed var(--line2);color:var(--fg-faint);text-align:center;margin:0;font-size:12.5px;line-height:1.45}.offer-sum .modal-msg{text-align:center}.offer-actions{gap:var(--s2);padding-top:var(--s3);border-top:1px solid var(--line);flex:none;margin-top:auto;display:flex}.offer-actions .btn{padding:12px 14px;font-size:14px}.offer-actions .btn.primary{text-overflow:ellipsis;flex:1;min-width:0;overflow:hidden}.coins-add{flex:none}.coins-add svg,.coins-ico{width:16px;height:16px;color:var(--r-l);flex:none}.coins-field{flex:0 0 200px}.coins-field .coins-ico{pointer-events:none;position:absolute;left:12px}.coins-field .af-input{font-variant-numeric:tabular-nums;border-color:color-mix(in oklab,var(--r-l) 40%,var(--line2));height:42px;padding:0 64px 0 36px;font-weight:600}.coins-field .af-unit{right:40px}.coins-field .af-input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.coins-field .af-input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.coins-field .af-input{appearance:textfield}.coins-x{width:26px;height:26px;color:var(--fg-faint);cursor:pointer;background:0 0;border:0;border-radius:7px;justify-content:center;align-items:center;display:flex;position:absolute;right:8px}.coins-x:hover{background:var(--elev2);color:var(--fg)}.coins-x svg{width:13px;height:13px}@media (height<=800px) and (width>=901px){.composer:not(.pick-friend)>.tm-head{padding-top:var(--s3);padding-bottom:var(--s2)}.offer-panel{gap:var(--s2);padding-bottom:var(--s3)}.offer-sides{gap:var(--s2)}.oside{padding:10px var(--s3);gap:6px}.oside-list{gap:0}.oside-row{padding:3px var(--s1);grid-template-columns:36px minmax(0,1fr) 28px}.oside .cthumb{border-radius:8px;width:36px;height:36px}.oside-txt{gap:1px}.oside-txt b{-webkit-line-clamp:1}.oside .coins-add{height:32px}.oside .coins-field .af-input{height:36px}.oside-hint{min-height:34px}.offer .tm-verdict{padding:9px var(--s3)}.offer-actions{padding-top:var(--s2)}.offer-actions .btn{padding:10px 14px}}.friend-list{gap:var(--s3);grid-template-columns:repeat(auto-fill,minmax(112px,1fr));display:grid}.friend-list .empty,.friend-list .loading-more{grid-column:1/-1;min-height:120px}.friend{align-items:center;gap:var(--s2);padding:var(--s4) var(--s2);border-radius:var(--radius);border:1px solid var(--line);background:var(--elev);color:var(--fg);font:inherit;cursor:pointer;flex-direction:column;transition:border-color .15s,background .15s;display:flex}.friend b{text-overflow:ellipsis;white-space:nowrap;max-width:100%;font-size:13.5px;font-weight:600;overflow:hidden}.friend:hover{border-color:var(--accent);background:var(--elev2)}@media (width<=900px){.modal.composer:not(.pick-friend){border:0;border-radius:0;grid-template:\"head\"\"pick\"minmax(0,1fr)\"offer\"/minmax(0,1fr);width:auto;max-width:none;height:auto;position:fixed;inset:0}.composer:not(.pick-friend)>.tm-head{padding:var(--s3) var(--s7) var(--s2) var(--s4);background:0 0;border-left:0}.composer:not(.pick-friend)>.modal-close{top:10px;right:10px}.composer-pick{padding:0 var(--s3)}.picker-bar{row-gap:var(--s2);flex-wrap:wrap}.composer-tabs{flex:100%;display:flex}.composer-tabs button{text-overflow:ellipsis;flex:1;justify-content:center;min-width:0;overflow:hidden}.picker-bar .search-wrap{flex:1 1 0;min-width:0}.picker-chips{flex:100%;order:3}.picker-bar .isel{order:0}.picker-chips .rl-full{display:inline}.picker-chips .rl-code{display:none}.picker-grid{gap:var(--s3);grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}.picker-scroll{padding-bottom:var(--s4)}.offer{border-left:0;border-top:1px solid var(--line2);background:var(--surface);position:relative}.offer-bar{align-items:center;gap:var(--s2);padding:var(--s2) var(--s3) calc(var(--s2) + env(safe-area-inset-bottom));display:flex}.offer-bar .btn{padding:11px 18px;font-size:14px}.offer-peek{align-items:center;gap:var(--s2);min-width:0;color:var(--fg);font:inherit;text-align:left;background:0 0;border:0;flex:1;padding:6px 4px;display:flex}.offer-peek-txt{flex-direction:column;flex:1;min-width:0;line-height:1.3;display:flex}.offer-peek-txt b{font:700 15px/1.25 var(--display);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.offer-peek-txt span{color:var(--fg-soft);text-overflow:ellipsis;white-space:nowrap;font-size:12.5px;overflow:hidden}.offer-peek-txt span[data-k=advantage]{color:var(--accent)}.offer-peek-txt span[data-k=disadvantage]{color:var(--bad)}.offer-chev{width:18px;height:18px;color:var(--fg-soft);flex:none;transition:transform .2s;transform:rotate(-90deg)}.offer.open .offer-chev{transform:rotate(90deg)}.offer-panel{max-height:calc(100dvh - 120px);padding:var(--s4);background:var(--surface);border-top:1px solid var(--line2);border-radius:var(--radius-lg) var(--radius-lg) 0 0;animation:.18s toast-in;display:none;position:absolute;bottom:100%;left:0;right:0;box-shadow:0 -24px 48px -16px #000}.offer.open .offer-panel{display:flex}.offer-title{font:700 16px/1.2 var(--display);display:block}.offer-sides{flex:0 auto}.offer-panel .offer-actions{display:none}}@media (prefers-reduced-motion:reduce){.offer-panel{animation:none}.offer-chev{transition:none}}";
	if (!window.__wmMounted) {
		window.__wmMounted = true;
		initCapture();
		try {
			if (localStorage.getItem("wm-debug")) window.__wm = wm_exports;
		} catch {}
		const isCore = () => isOurs(location.pathname);
		let instance = null;
		let host = null;
		let hideStyle = null;
		function showOverlay() {
			if (host) return;
			host = document.createElement("div");
			host.id = "wm-host";
			document.body.appendChild(host);
			const shadow = host.attachShadow({ mode: "open" });
			const style = document.createElement("style");
			style.textContent = app_default;
			shadow.appendChild(style);
			const root = document.createElement("div");
			root.id = "wm-app-root";
			shadow.appendChild(root);
			hideStyle = document.createElement("style");
			hideStyle.id = "wm-hide-real";
			hideStyle.textContent = "html,body{margin:0;background:#0C0D0C}body>*:not(#wm-host):not(#wm-switch){display:none !important}";
			(document.head || document.documentElement).appendChild(hideStyle);
			instance = mount(App, { target: root });
		}
		function hideOverlay() {
			if (instance) {
				unmount(instance);
				instance = null;
			}
			if (host) {
				host.remove();
				host = null;
			}
			if (hideStyle) {
				hideStyle.remove();
				hideStyle = null;
			}
		}
		const OFF_KEY = "wm-off";
		const LAST_KEY = "wm-last";
		const overlayOff = () => {
			try {
				return localStorage.getItem(OFF_KEY) === "1";
			} catch {
				return false;
			}
		};
		let switchBtn = null;
		function renderSwitch(remastered) {
			if (!switchBtn) {
				const css = document.createElement("style");
				css.textContent = "#wm-switch{position:fixed;z-index:2147483599;right:16px;bottom:16px;display:inline-flex;align-items:center;justify-content:center;gap:8px;min-width:148px;height:40px;padding:0 16px;border-radius:999px;border:1px solid #333833;background:#141613;color:#98A29A;font:600 13px/1 Inter,system-ui,sans-serif;cursor:pointer;box-shadow:0 10px 28px -14px #000}#wm-switch.to-remaster{color:#3CCB8E}#wm-switch:hover{border-color:#98A29A}@media(max-width:560px){#wm-switch{min-width:0;width:40px;padding:0}#wm-switch span{display:none}}";
				(document.head || document.documentElement).appendChild(css);
				switchBtn = document.createElement("button");
				switchBtn.id = "wm-switch";
				document.body.appendChild(switchBtn);
			}
			switchBtn.innerHTML = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4L3 8l4 4M3 8h13M17 20l4-4-4-4M21 16H8"/></svg><span>${remastered ? "Site original" : "Remaster"}</span>`;
			switchBtn.classList.toggle("to-remaster", !remastered);
			switchBtn.title = remastered ? "Revenir au site d'origine (aucune fonctionnalité perdue)" : "Revenir à l'interface remaster";
			switchBtn.setAttribute("aria-label", switchBtn.title);
			switchBtn.onclick = remastered ? () => {
				try {
					localStorage.setItem(OFF_KEY, "1");
				} catch {}
				location.reload();
			} : () => {
				try {
					localStorage.removeItem(OFF_KEY);
				} catch {}
				if (isCore()) return location.reload();
				let last = null;
				try {
					last = sessionStorage.getItem(LAST_KEY);
				} catch {}
				location.assign(last || "/pulls");
			};
		}
		function sync() {
			const on = !overlayOff() && isCore();
			if (on) {
				try {
					sessionStorage.setItem(LAST_KEY, location.pathname);
				} catch {}
				showOverlay();
			} else hideOverlay();
			renderSwitch(on);
		}
		for (const m of ["pushState", "replaceState"]) {
			const orig = history[m];
			history[m] = function(...a) {
				const r = orig.apply(this, a);
				sync();
				window.dispatchEvent(new Event("wm:route"));
				return r;
			};
		}
		window.addEventListener("popstate", () => {
			sync();
			window.dispatchEvent(new Event("wm:route"));
		});
		function start() {
			sync();
		}
		if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
		else start();
	}
})();
