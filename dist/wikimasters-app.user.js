// ==UserScript==
// @name         wiki-remaster
// @namespace    hugo.wikimasters
// @version      0.12.12
// @author       Hugo Sibony
// @description  Unofficial redesign of wiki-masters.com, on the game's own data and your own session.
// @license      MIT
// @icon         data:image/png;base64,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
// @homepage     https://github.com/KazeTachinuu/wiki-remaster
// @supportURL   https://github.com/KazeTachinuu/wiki-remaster/issues
// @downloadURL  https://raw.githubusercontent.com/KazeTachinuu/wiki-remaster/main/dist/wikimasters-app.user.js
// @updateURL    https://raw.githubusercontent.com/KazeTachinuu/wiki-remaster/main/dist/wikimasters-app.meta.js
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
	var CORE = /^\/(pulls|collection|global-collection|trades|marketplace(\/[^/]+)?|friends|achievements|profile(\/[^/]+)?)?\/?$/;
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
	function props_id() {
		if (hydrating && hydrate_node && hydrate_node.nodeType === 8 && hydrate_node.textContent?.startsWith(`$`)) {
			const id = hydrate_node.textContent.substring(1);
			hydrate_next();
			return id;
		}
		(window.__svelte ??= {}).uid ??= 1;
		return `c${window.__svelte.uid++}`;
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
	function bind_checked(input, get, set = get) {
		listen_to_event_and_reset_event(input, "change", (is_reset) => {
			set(is_reset ? input.defaultChecked : input.checked);
		});
		if (hydrating && input.defaultChecked !== input.checked || untrack(get) == null) set(input.checked);
		render_effect(() => {
			var value = get();
			input.checked = Boolean(value);
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
	var needsHuman = (e) => e?.code === "human_verification_required" || e?.data?.human_verification_required === true || /human_verification|turnstile|captcha/i.test(e?.code ?? "") || /anti-bot|vérification humaine/i.test(e?.message ?? "");
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
	var ROOT = "wm-cache:";
	var PREFIX = ROOT + "v3:";
	var MAX_AGE = 6048e5;
	function sweep() {
		try {
			const keys = Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i));
			for (const k of keys) {
				if (!k.startsWith(ROOT)) continue;
				let t = 0;
				try {
					t = JSON.parse(localStorage.getItem(k))?.t ?? 0;
				} catch {}
				if (!k.startsWith(PREFIX) || Date.now() - t > MAX_AGE) localStorage.removeItem(k);
			}
		} catch {}
	}
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
	function api(path, opts = {}) {
		return (opts.method ?? "GET") !== "GET" && path !== HUMAN_CHECK ? withHumanCheck(() => request(path, opts)) : request(path, opts);
	}
	var HUMAN_CHECK = "/api/human-check";
	async function request(path, { method = "GET", body, quiet = false, label, headers } = {}) {
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
	var SESSION_WAIT_MS = 1e4;
	var sessionWaiters = new Set();
	function sessionReady(ms = SESSION_WAIT_MS) {
		if (sb?.headers && sb.userId) return Promise.resolve(true);
		return new Promise((resolve) => {
			const done = (ok) => {
				clearTimeout(t);
				sessionWaiters.delete(done);
				resolve(ok);
			};
			const t = setTimeout(() => done(false), ms);
			sessionWaiters.add(done);
		});
	}
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
	async function supabase(path, { method = "GET", body, label } = {}) {
		if (!sb?.headers) await sessionReady();
		if (!sb?.headers) throw Object.assign(new Error("Session du jeu pas encore prête : réessayez dans un instant."), { status: 0 });
		const tracked = label ? activity.start(label, 1) : null;
		try {
			const r = await origFetch.call(window, `${sb.base}/rest/v1/${path}`, {
				method,
				headers: {
					...sb.headers,
					"content-type": "application/json",
					prefer: method === "GET" ? "" : "return=representation"
				},
				body: body == null ? void 0 : JSON.stringify(body)
			});
			const d = await r.json().catch(() => null);
			if (!r.ok) throw Object.assign(new Error(d?.message || "Enregistrement impossible pour le moment."), {
				status: r.status,
				code: d?.code
			});
			return d;
		} finally {
			if (tracked) activity.end(tracked);
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
			if (call.headers && call.userId) {
				sb = {
					base: call.base,
					headers: call.headers,
					userId: call.userId
				};
				for (const done of [...sessionWaiters]) done(true);
			}
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
	function clock(s) {
		const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), sec = Math.max(0, s % 60);
		return h ? `${h} h ${String(m).padStart(2, "0")}` : `${m}:${String(sec).padStart(2, "0")}`;
	}
	function secondsUntil(iso, now = Date.now()) {
		const t = Date.parse(iso || "");
		return isNaN(t) ? null : Math.max(0, Math.round((t - now) / 1e3));
	}
	var nUser = (o) => o ? {
		id: o.id,
		username: o.username || "?",
		avatar: o.avatar_url || null,
		ax: o.avatar_pos_x ?? 50,
		ay: o.avatar_pos_y ?? 50
	} : null;
	var nMe = (p) => p && {
		...nUser(p),
		isPublic: p.is_public ?? true,
		joinedAt: p.created_at || null,
		isPro: !!p.is_pro
	};
	function seenLabel(iso, now = Date.now()) {
		const ms = now - Date.parse(iso ?? "");
		if (!Number.isFinite(ms)) return null;
		const min = Math.floor(Math.max(0, ms) / 6e4);
		if (min < 5) return "En ligne récemment";
		if (min < 60) return `Vu il y a ${min} min`;
		const h = Math.floor(min / 60);
		if (h < 24) return `Vu il y a ${h} h`;
		const d = Math.floor(h / 24);
		if (d < 30) return `Vu il y a ${d} j`;
		const mo = Math.floor(d / 30);
		return mo < 12 ? `Vu il y a ${mo} mois` : "Vu il y a plus d'un an";
	}
	var nPlayer = (d) => ({
		...nMe(d.profile),
		lastSeenAt: d.lastSeenAt ?? null,
		isOwn: !!d.isOwn,
		isFriend: !!d.isFriend,
		friendshipId: d.friendshipId ?? null
	});
	function showcaseOf(d, rowOf) {
		const places = Array(SHOWCASE.places).fill(null);
		for (const s of d.showcase || []) {
			const uc = s.user_card;
			if (s.position >= 0 && s.position < SHOWCASE.places && uc?.card) places[s.position] = rowOf({
				...uc,
				card: {
					...uc.card,
					rarity: uc.snapshot_rarity ?? uc.card.rarity,
					atk: uc.snapshot_atk ?? uc.card.atk,
					def: uc.snapshot_def ?? uc.card.def
				}
			});
		}
		const names = {};
		for (const g of d.galleries || []) if (Number.isInteger(g.gallery_index) && typeof g.name === "string") names[g.gallery_index] = g.name;
		return {
			places,
			names
		};
	}
	var filledGalleries = (shelf) => Array.from({ length: SHOWCASE.maxGalleries }, (_, g) => ({
		g,
		name: galleryName(g, shelf.names),
		rows: shelf.places.slice(g * SHOWCASE.perGallery, (g + 1) * SHOWCASE.perGallery).filter(Boolean)
	})).filter((x) => x.rows.length);
	function friendshipsOf(rows, me) {
		const out = {
			friends: [],
			incoming: [],
			outgoing: []
		};
		for (const f of rows) {
			const mine = (f.requester_id ?? f.requester?.id) === me;
			const row = {
				fid: f.id,
				since: f.updated_at || f.created_at || null,
				user: nUser(mine ? f.addressee : f.requester)
			};
			if (!row.user) continue;
			if (f.status === "accepted") out.friends.push(row);
			else if (f.status === "pending") (mine ? out.outgoing : out.incoming).push(row);
		}
		const byName = (a, b) => a.user.username.localeCompare(b.user.username, "fr", { sensitivity: "base" });
		out.friends.sort(byName);
		return out;
	}
	function waitingBy(rows, me) {
		const by = new Map();
		for (const t of rows) {
			if (t.status && t.status !== "pending") continue;
			const mine = t.initiator_id === me;
			const other = mine ? t.recipient_id : t.initiator_id;
			const w = by.get(other) ?? {
				toAnswer: 0,
				sent: 0
			};
			if (mine) w.sent++;
			else w.toAnswer++;
			by.set(other, w);
		}
		return by;
	}
	function relationOf(id, split) {
		if (split.friends.some((r) => r.user.id === id)) return "friend";
		if (split.outgoing.some((r) => r.user.id === id)) return "sent";
		if (split.incoming.some((r) => r.user.id === id)) return "received";
		return null;
	}
	var FAMILIES = [
		{
			id: "collection",
			label: "Collection",
			rank: 3,
			test: /collect|first|dupe|star|showcase|pack|shiny|atk|def|_(c|pc|r|sr|ur|l)$/
		},
		{
			id: "trades",
			label: "Échanges",
			rank: 0,
			test: /trade/
		},
		{
			id: "battles",
			label: "Batailles",
			rank: 1,
			test: /win|streak|battle|duel/
		},
		{
			id: "market",
			label: "Marché",
			rank: 2,
			test: /sell|buy|auction|bid|_wb|wb_/
		},
		{
			id: "other",
			label: "Autres",
			rank: 4,
			test: /(?:)/
		}
	];
	var TRIED = [...FAMILIES].sort((a, b) => a.rank - b.rank);
	var familyOf = (code) => TRIED.find((f) => f.test.test(code ?? "")).id;
	function achievementsOf(list, mine) {
		const got = new Map((mine || []).map((u) => [u.achievement_id, u]));
		return (list || []).map((a) => {
			const u = got.get(a.id);
			const reward = a.wikibidous_reward ?? 0;
			return {
				id: a.id,
				code: a.code,
				title: a.title || a.code,
				description: a.description || "",
				icon: a.icon || "🏅",
				reward,
				family: familyOf(a.code),
				unlockedAt: u?.unlocked_at ?? null,
				claimedAt: u?.claimed_at ?? null,
				state: !u ? "locked" : reward > 0 && !u.claimed_at ? "claim" : "done"
			};
		}).sort((a, b) => a.reward - b.reward || a.title.localeCompare(b.title, "fr"));
	}
	var TIERS = [
		{
			id: "bronze",
			label: "Bronze",
			from: 0
		},
		{
			id: "silver",
			label: "Argent",
			from: 25
		},
		{
			id: "gold",
			label: "Or",
			from: 100
		},
		{
			id: "platinum",
			label: "Platine",
			from: 500
		}
	];
	var tierOf = (reward) => TIERS.findLast((t) => (reward ?? 0) >= t.from);
	function nextUp(list, progressFor, n = 3) {
		return list.filter((a) => a.state === "locked").map((a) => ({
			a,
			p: progressFor(a)
		})).filter((x) => x.p).sort((x, y) => y.p.have / y.p.goal - x.p.have / x.p.goal).slice(0, n);
	}
	function progressOf(description, stats, names) {
		const m = /^poss[ée]der\s+([\d\s\u202f]+)\s+cartes?\s*(.*)$/i.exec((description || "").trim());
		if (!m || !stats) return null;
		const goal = Number(m[1].replace(/\D/g, ""));
		const tail = m[2].trim().toLowerCase().replace(/s$/, "");
		const rarity = tail ? Object.keys(names).find((r) => names[r].toLowerCase() === tail) : null;
		if (tail && !rarity) return null;
		const have = rarity ? stats.rarityCounts?.[rarity] ?? 0 : stats.total;
		return goal > 0 && have != null && have < goal ? {
			have,
			goal
		} : null;
	}
	var SHOWCASE = {
		places: 40,
		perGallery: 4,
		maxGalleries: 10,
		cardsPerGallery: 5e3
	};
	var galleryCount = (cards) => cards > 0 ? Math.min(SHOWCASE.maxGalleries, Math.ceil(cards / SHOWCASE.cardsPerGallery)) : 1;
	var galleryName = (i, names) => names?.[i] || `Vitrine ${i + 1}`;
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
	var newest$1 = (a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt));
	function tradeTabs(trades) {
		const answered = new Set(trades.map((t) => t.parentId).filter(Boolean));
		const latest = trades.filter((t) => !answered.has(t.id));
		const pending = latest.filter((t) => t.status === "pending");
		return {
			incoming: pending.filter((t) => t.incoming).sort(newest$1),
			outgoing: pending.filter((t) => !t.incoming).sort(newest$1),
			history: latest.filter((t) => t.status !== "pending").sort(newest$1)
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
		const childOf = new Map(all.filter((t) => t.parentId).map((t) => [t.parentId, t]));
		let root = trade;
		while (root.parentId && byId.has(root.parentId)) root = byId.get(root.parentId);
		const chain = [root];
		for (let next = childOf.get(root.id); next; next = childOf.get(next.id)) chain.push(next);
		return chain;
	}
	function roundsOf(all) {
		const byId = new Map(all.map((t) => [t.id, t]));
		const rootOf = new Map();
		const root = (t) => {
			if (rootOf.has(t.id)) return rootOf.get(t.id);
			const r = t.parentId && byId.has(t.parentId) ? root(byId.get(t.parentId)) : t.id;
			rootOf.set(t.id, r);
			return r;
		};
		const size = new Map();
		for (const t of all) size.set(root(t), (size.get(root(t)) ?? 0) + 1);
		return new Map(all.map((t) => [t.id, size.get(rootOf.get(t.id))]));
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
		return nUser(f.requester?.id === needMe(me) ? f.addressee : f.requester) ?? nUser({ username: "?" });
	}
	var RNAME = {
		C: "Commun",
		PC: "Peu Commun",
		R: "Rare",
		SR: "Super Rare",
		UR: "Ultra Rare",
		L: "Légendaire"
	};
	var RARITIES$1 = [
		"C",
		"PC",
		"R",
		"SR",
		"UR",
		"L"
	];
	var RARITIES_DESC = [...RARITIES$1].reverse();
	function httpUrl(u) {
		try {
			return /^https?:$/.test(new URL(u).protocol) ? u : null;
		} catch {
			return null;
		}
	}
	function notifHref(n) {
		const d = n.data || {};
		const auctionId = d.auction_id || n.auction_id;
		if (/^marketplace_/.test(n.type) && auctionId) return `/marketplace/${encodeURIComponent(auctionId)}`;
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
			wikipedia_url: httpUrl(c.wikipedia_url),
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
	var wb = (n) => n == null ? "" : ` pour ${Number(n).toLocaleString("fr")} WikiBidous`;
	var NOTIF = {
		marketplace_outbid: (d) => ["Enchère dépassée", d.card_title && `${d.card_title}, nouvelle offre${wb(d.new_bid).replace(" pour", " de")}`],
		marketplace_auction_won: (d) => ["Enchère gagnée", d.card_title && `${d.card_title}${wb(d.final_price)}`],
		marketplace_auction_sold: (d) => ["Carte vendue", d.card_title && `${d.card_title}${wb(d.final_price)}`],
		marketplace_auction_unsold: (d) => ["Vente terminée sans acheteur", d.card_title],
		marketplace_wishlist_listed: (d) => ["Carte souhaitée en vente", d.card_title],
		trade_offer: (d) => ["Offre d'échange", d.initiator_username && `de ${d.initiator_username}`],
		trade_countered: (d) => ["Contre-offre", d.initiator_username && `de ${d.initiator_username}`],
		trade_accepted: (d) => ["Échange accepté", d.recipient_username && `par ${d.recipient_username}`],
		friend_request: (d) => ["Demande d'ami", d.requester_username && `de ${d.requester_username}`],
		battle_invite: (d) => ["Défi", d.challenger_username && `de ${d.challenger_username}`],
		guild_invite: (d) => ["Invitation de guilde", [d.guild_name, d.inviter_username && `de ${d.inviter_username}`].filter(Boolean).join(", ")]
	};
	var plainText = (s) => String(s || "").replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "").replace(/\s*!+\s*$/, "").replace(/\s+/g, " ").trim();
	function nNotification(n) {
		const d = n.data || {};
		const [title, detail] = NOTIF[n.type]?.(d) ?? [];
		return {
			id: n.id,
			type: n.type || null,
			title: title || plainText(d.title) || "Notification",
			message: detail || plainText(d.message),
			read: !!n.read,
			at: n.created_at || null,
			href: notifHref(n)
		};
	}
	function newInPack(cardIds, ownedCopies) {
		if (!Array.isArray(ownedCopies)) return null;
		const owned = new Map(), drawn = new Map();
		for (const c of ownedCopies) owned.set(c.card_id, (owned.get(c.card_id) ?? 0) + 1);
		for (const id of cardIds) drawn.set(id, (drawn.get(id) ?? 0) + 1);
		return new Set(cardIds.filter((id) => (owned.get(id) ?? 0) <= drawn.get(id)));
	}
	function pickCopy(rows, card) {
		const mine = (rows || []).filter((r) => r.card?.id === card.id);
		const t = (r) => Date.parse(r.obtained_at || "") || 0;
		return mine.sort((a, b) => (b.is_shiny === !!card.is_shiny) - (a.is_shiny === !!card.is_shiny) || t(b) - t(a))[0] ?? null;
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
	var REGEN_MS = {
		base: 6e5,
		pro: 18e4
	};
	var lastBalance = null;
	var SAME_CARD_MS = 6e4;
	var sameCards = new Map();
	var marketMemo = new Map();
	var tz = () => ({ "x-wiki-calendar-tz": Intl.DateTimeFormat().resolvedOptions().timeZone });
	var ACTION_LABEL = {
		accept: "Acceptation de l'échange",
		decline: "Refus de l'échange",
		cancel: "Annulation de l'offre"
	};
	var nTag = (t) => {
		const x = t?.tag ?? t;
		return x?.id ? {
			id: x.id,
			name: x.name ?? "",
			color: x.color ?? null
		} : null;
	};
	var COLLECTION_SORT = {
		rarity: null,
		name: "name",
		recent: "added",
		starred: "starred"
	};
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
				tags: (it.tags || []).map(nTag).filter(Boolean)
			};
		});
	}
	function packResult(d) {
		const fresh = newInPack((d.cards || []).map((c) => c.id), d.owned_copies);
		const cards = (d.cards || []).map((c) => ({
			...nCard(c),
			is_new: !!fresh?.has(c.id),
			is_shiny: !!c.is_shiny
		}));
		const raw = new Map((d.cards || []).map((c) => [c.id, c]));
		return {
			cards,
			copies: Array.isArray(d.owned_copies) ? mapCollection(d.owned_copies.filter((o) => raw.has(o.card_id)).map((o) => ({
				...o,
				card: raw.get(o.card_id)
			}))) : null
		};
	}
	var RealData = {
		isReal: true,
		canReset: false,
		get userId() {
			return getUserId();
		},
		async meNow() {
			await sessionReady();
			return needMe(this.userId);
		},
		async profile({ sync = false, balance = true } = {}) {
			if (sync || getProfile()?.packs_remaining == null) await refreshProfile();
			const p = getProfile() || {};
			if (balance || lastBalance == null) lastBalance = await api("/api/wikibidous", { quiet: true }).then((d) => d.balance, () => lastBalance ?? p.wikibidous_balance ?? null);
			const packs = p.packs_remaining ?? null;
			const last = Date.parse(p.packs_last_regen_at || "");
			const regen = packs != null && packs < PACK_CAP && !isNaN(last);
			return {
				username: p.username || null,
				packs_remaining: packs,
				pack_cap: PACK_CAP,
				currency: lastBalance,
				regen_seconds: REGEN_MS[p.is_pro ? "pro" : "base"] / 1e3,
				next_regen_seconds: regen ? Math.max(0, Math.round((last + REGEN_MS[p.is_pro ? "pro" : "base"] - Date.now()) / 1e3)) : null,
				is_pro: !!p.is_pro,
				is_vip: !!p.is_vip
			};
		},
		async openPack() {
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
				...packResult(d),
				packs_remaining: d.packs_remaining
			};
		},
		async proDaily() {
			const d = await api("/api/packs/pro-daily", {
				headers: tz(),
				quiet: true
			});
			return {
				eligible: !!d.eligible,
				claimedToday: !!d.claimed_today
			};
		},
		openProDaily: () => api("/api/packs/pro-daily", {
			method: "POST",
			headers: tz(),
			label: "Ouverture du pack PRO"
		}).then(packResult),
		async specialPacks() {
			const d = await api("/api/packs/special", { quiet: true });
			return {
				packs: d.packs || [],
				available: !!d.available,
				vip: !!d.is_vip,
				nextAt: d.next_available_at || null
			};
		},
		openSpecial: (packId) => api("/api/packs/special", {
			method: "POST",
			body: { packId },
			label: "Ouverture du pack spécial"
		}).then(packResult),
		async grace() {
			const d = await api("/api/packs/grace", {
				method: "POST",
				label: "Demande de paquets"
			});
			bumpEpoch();
			patchProfile({
				packs_remaining: d.packs_remaining,
				packs_last_regen_at: d.packs_last_regen_at
			});
			return d;
		},
		async myCards({ page = 0, q, rarity, sort, tag } = {}) {
			const d = await api(`/api/my-collection?${qs({
				page,
				q,
				rarity,
				sort: COLLECTION_SORT[sort],
				tag_id: tag && tag !== "none" ? tag : null,
				untagged: tag === "none" ? 1 : null,
				stats: page ? null : 1
			})}`, { quiet: page > 0 });
			const rows = d.collection || [];
			return {
				items: mapCollection(rows),
				hasMore: rows.length === PAGE,
				total: d.total ?? null,
				counts: d.rarityCounts || {},
				pending: d.pendingTradeCardIds || []
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
		sameCard(card) {
			if (!card.title) return Promise.resolve([]);
			const hit = sameCards.get(card.id);
			if (hit && Date.now() - hit.at < SAME_CARD_MS) return hit.list;
			const list = (async () => {
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
			})();
			sameCards.set(card.id, {
				at: Date.now(),
				list
			});
			list.catch(() => sameCards.delete(card.id));
			return list;
		},
		async myMarket({ quiet } = {}) {
			const d = await api("/api/marketplace?page=1&limit=1&mine=1", { quiet });
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
			const me = await this.meNow();
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
				sort: COLLECTION_SORT[sort]
			})}`);
			const rows = d.collection || [];
			return {
				items: mapCollection(rows),
				pending: new Set(d.pendingTradeCardIds || []),
				hasMore: rows.length === PAGE
			};
		},
		async myCopy(card) {
			return pickCopy((await this.myCards({ q: card.title })).items, card);
		},
		setStarred: (userCardId, starred) => supabase(`user_cards?id=eq.${encodeURIComponent(userCardId)}`, {
			method: "PATCH",
			body: { starred },
			label: starred ? "Ajout aux favoris" : "Retrait des favoris"
		}),
		async myTags() {
			const me = await this.meNow();
			return (await supabase(`tags?select=*&user_id=eq.${encodeURIComponent(me)}&order=name.asc`) || []).map(nTag).filter(Boolean);
		},
		async createTag(name, color) {
			const me = await this.meNow();
			try {
				const [row] = await supabase("tags", {
					method: "POST",
					body: {
						user_id: me,
						name,
						color
					},
					label: "Nouvelle étiquette"
				});
				return nTag(row);
			} catch (e) {
				if (e.code !== "23505") throw e;
				const [row] = await supabase(`tags?select=*&user_id=eq.${encodeURIComponent(me)}&name=eq.${encodeURIComponent(name)}`);
				return nTag(row);
			}
		},
		tagCard: (userCardId, tagId) => supabase("user_card_tags", {
			method: "POST",
			body: {
				user_card_id: userCardId,
				tag_id: tagId
			},
			label: "Étiquette"
		}),
		untagCard: (userCardId, tagId) => supabase(`user_card_tags?user_card_id=eq.${encodeURIComponent(userCardId)}&tag_id=eq.${encodeURIComponent(tagId)}`, {
			method: "DELETE",
			label: "Étiquette"
		}),
		async friendships() {
			const rows = (await api("/api/friends", { label: "Chargement de vos amis" })).friendships || [];
			const asTrade = (f) => ({
				initiator_id: f.requester_id ?? f.requester?.id,
				recipient_id: f.addressee_id ?? f.addressee?.id,
				initiator: f.requester,
				recipient: f.addressee
			});
			return friendshipsOf(rows, whoAmI(rows.map(asTrade), this.userId, getProfile()?.username));
		},
		async waitingTrades() {
			const raw = (await api("/api/trades?active=1", { quiet: true })).trades || [];
			return waitingBy(raw, whoAmI(raw, this.userId, getProfile()?.username));
		},
		async searchPlayers(q) {
			return ((await api(`/api/friends/search?q=${encodeURIComponent(q)}`, { quiet: true })).users || []).map(nUser);
		},
		requestFriend: (userId) => api("/api/friends", {
			method: "POST",
			body: { addressee_id: userId },
			label: "Demande d'ami"
		}),
		answerFriend: (fid, accept) => api(`/api/friends/${encodeURIComponent(fid)}`, {
			method: "PATCH",
			body: { action: accept ? "accept" : "decline" },
			label: accept ? "Acceptation" : "Refus"
		}),
		acceptAllFriends: () => api("/api/friends/accept-all", {
			method: "POST",
			label: "Acceptation des demandes"
		}),
		dropFriendship: (fid) => api(`/api/friends/${encodeURIComponent(fid)}`, {
			method: "DELETE",
			label: "Annulation de la demande"
		}),
		async me() {
			return nMe(await supabase("rpc/get_my_profile", {
				method: "POST",
				body: {}
			}));
		},
		async updateProfile(username, patch) {
			const d = await api(`/api/profile/${encodeURIComponent(username)}`, {
				method: "PATCH",
				body: patch,
				label: "Profil"
			});
			return d.profile ? nMe(d.profile) : null;
		},
		async collectionStats() {
			const d = await api("/api/my-collection/stats", { quiet: true });
			const total = Number(d.total);
			return {
				total: Number.isFinite(total) ? total : null,
				rarityCounts: d.rarityCounts || {}
			};
		},
		async showcase() {
			return showcaseOf(await api("/api/showcase", { quiet: true }), (uc) => mapCollection([uc])[0]);
		},
		async player(username) {
			return nPlayer(await api(`/api/profile/${encodeURIComponent(username)}`, { label: "Chargement du profil" }));
		},
		async playerShowcase(username) {
			return showcaseOf(await api(`/api/profile/${encodeURIComponent(username)}/showcase`, { quiet: true }), (uc) => mapCollection([uc])[0]);
		},
		async playerCollection(username) {
			const d = await api(`/api/profile/${encodeURIComponent(username)}/collection?page=0&stats=1`, { quiet: true });
			const total = Number(d.total);
			return {
				total: Number.isFinite(total) ? total : null,
				rarityCounts: d.rarityCounts || {},
				items: mapCollection(d.collection || [])
			};
		},
		showcasePut: (position, userCardId) => api("/api/showcase", {
			method: "PUT",
			body: {
				position,
				user_card_id: userCardId
			},
			label: "Vitrine"
		}),
		showcaseClear: (position) => api("/api/showcase", {
			method: "DELETE",
			body: { position },
			label: "Vitrine"
		}),
		showcaseName: (index, name) => api("/api/showcase/gallery", {
			method: "PUT",
			body: {
				gallery_index: index,
				name
			},
			label: "Vitrine"
		}),
		async achievements() {
			const me = await this.meNow();
			const [list, mine] = await Promise.all([supabase("achievements?select=*"), supabase(`user_achievements?select=*&user_id=eq.${encodeURIComponent(me)}`)]);
			return achievementsOf(list, mine);
		},
		syncAchievements: () => api("/api/achievements/check", {
			method: "POST",
			body: { event: "achievements_sync" },
			quiet: true
		}),
		claimAchievement: (id) => api("/api/achievements/claim", {
			method: "POST",
			body: { achievement_id: id },
			label: "Récompense"
		}),
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
		async marketValue(card) {
			return (await api(`/api/marketplace/cards/${card.id}/sales?scope=summary`, { quiet: true })).summary?.[card.rarity]?.average ?? null;
		},
		marketStats(card) {
			const hit = marketMemo.get(card.id);
			if (hit && Date.now() - hit.at < SAME_CARD_MS) return hit.stats;
			const stats = this.fetchMarketStats(card);
			marketMemo.set(card.id, {
				at: Date.now(),
				stats
			});
			stats.catch(() => marketMemo.delete(card.id));
			return stats;
		},
		async fetchMarketStats(card) {
			const d = await api(`/api/marketplace/cards/${card.id}/sales?scope=summary`, { quiet: true });
			const averages = Object.fromEntries(Object.entries(d.summary || {}).map(([r, v]) => [r, v?.average ?? null]));
			if (!d.isPro) return {
				averages,
				sales: [],
				isPro: false
			};
			return {
				averages,
				sales: ((await api(`/api/marketplace/cards/${card.id}/sales`, { quiet: true }).catch(() => ({}))).sales || []).map((s) => ({
					id: s.id,
					rarity: s.rarity ?? card.rarity,
					price: s.final_price ?? null,
					at: Date.parse(s.settled_at || "") || 0
				})),
				isPro: true
			};
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
		})
	};
	var MockData = {
		...RealData,
		isReal: false,
		canReset: true,
		userId: "me",
		meNow: async () => "me",
		async profile() {
			const p = await api("/api/profile", { quiet: true });
			return {
				username: p.username,
				packs_remaining: p.packs_remaining,
				pack_cap: p.pack_cap,
				currency: p.wikibidous_balance,
				regen_seconds: p.regen_seconds,
				next_regen_seconds: p.next_regen_seconds,
				is_pro: !!p.is_pro,
				is_vip: !!p.is_vip
			};
		},
		reset: () => api("/api/reset", { method: "POST" }),
		setStarred: (id, starred) => api("/api/__sb/star", {
			method: "PATCH",
			body: {
				id,
				starred
			},
			label: starred ? "Ajout aux favoris" : "Retrait des favoris"
		}),
		myTags: () => api("/api/__sb/tags", { quiet: true }),
		async createTag(name, color) {
			try {
				return (await api("/api/__sb/tags", {
					method: "POST",
					body: {
						name,
						color
					},
					label: "Nouvelle étiquette"
				}))[0];
			} catch (e) {
				if (e.data?.code !== "23505") throw e;
				return (await api("/api/__sb/tags", { quiet: true })).find((t) => t.name === name);
			}
		},
		tagCard: (userCardId, tagId) => api("/api/__sb/card-tags", {
			method: "POST",
			body: {
				user_card_id: userCardId,
				tag_id: tagId
			},
			label: "Étiquette"
		}),
		untagCard: (userCardId, tagId) => api(`/api/__sb/card-tags?user_card_id=${encodeURIComponent(userCardId)}&tag_id=${encodeURIComponent(tagId)}`, {
			method: "DELETE",
			label: "Étiquette"
		}),
		me: () => api("/api/__sb/me", { quiet: true }).then(nMe),
		achievements: () => api("/api/__sb/achievements", { quiet: true }).then((d) => achievementsOf(d.achievements, d.mine))
	};
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
	var pageLane = createLane({
		concurrency: 4,
		gapMs: 150
	});
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
		RARITIES: () => RARITIES$1,
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
		collectionAdd: () => collectionAdd,
		collectionRemove: () => collectionRemove,
		data: () => data,
		dealLine: () => dealLine,
		forgetCollection: () => forgetCollection,
		getProfile: () => getProfile,
		health: () => health,
		initCapture: () => initCapture,
		isRateLimited: () => isRateLimited,
		marketValueFor: () => marketValueFor,
		myCardsPage: () => myCardsPage,
		normSearch: () => normSearch,
		offerSummary: () => offerSummary,
		pageLane: () => pageLane,
		pickCopy: () => pickCopy,
		recordPull: () => recordPull,
		refreshProfile: () => refreshProfile,
		roundsOf: () => roundsOf,
		savedFirstPage: () => savedFirstPage,
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
	sweep();
	var VALUE_TTL = 864e5;
	var RATE_PAUSE_MS = 6e4;
	var saved$2 = Object.fromEntries(Object.entries(load$1("values", Infinity) || {}).filter(([, [, t]]) => Date.now() - t < VALUE_TTL));
	var inflight = new Map();
	var VALUE_KEEP = 4e3;
	var newest = (map, n) => {
		const e = Object.entries(map);
		return e.length <= n ? map : Object.fromEntries(e.sort((a, b) => b[1][1] - a[1][1]).slice(0, n));
	};
	var saveTimer = null;
	function marketValueFor(card) {
		const key = `${card.id}|${card.rarity}`;
		const hit = saved$2[key];
		if (hit) return Promise.resolve(hit[0]);
		if (!inflight.has(key)) {
			const fetchValue = (left) => backgroundLane.run(() => data.marketValue(card)).then((v) => {
				saved$2[key] = [v, Date.now()];
				saveTimer ??= setTimeout(() => {
					saveTimer = null;
					save("values", newest(saved$2, VALUE_KEEP));
				}, 1e3);
				return v;
			}, (e) => {
				if (!isRateLimited(e)) return null;
				backgroundLane.pause(RATE_PAUSE_MS);
				return left > 0 ? fetchValue(left - 1) : null;
			});
			inflight.set(key, fetchValue(2).finally(() => inflight.delete(key)));
		}
		return inflight.get(key);
	}
	var FIRST_TTL = 6048e5;
	var FIRST_KEY = "collection.first.v1";
	var savedFirstPage = () => load$1(FIRST_KEY, FIRST_TTL);
	async function myCardsPage(query = {}) {
		const d = await data.myCards(query);
		if (!query.page && !query.q && !query.rarity && (query.sort ?? "rarity") === "rarity") save(FIRST_KEY, d);
		return d;
	}
	var collectionAdd = () => drop(FIRST_KEY);
	var collectionRemove = () => drop(FIRST_KEY);
	var forgetCollection = () => drop(FIRST_KEY);
	var PATHS = {
		close: [["path", { "d": "M6 6l12 12M18 6L6 18" }]],
		search: [["circle", {
			"cx": "11",
			"cy": "11",
			"r": "7"
		}], ["path", { "d": "M20 20l-3.4-3.4" }]],
		prev: [["path", { "d": "M15 18l-6-6 6-6" }]],
		next: [["path", { "d": "M9 6l6 6-6 6" }]],
		sort: [["path", { "d": "M7 5v14M7 19l-3-3M7 5l3 3M17 19V5M17 5l3 3M17 19l-3-3" }]],
		eye: [["path", { "d": "M2.5 11.5S6 4.5 12 4.5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" }], ["circle", {
			"cx": "12",
			"cy": "11.5",
			"r": "3"
		}]],
		eyeOff: [
			["path", { "d": "M3 3l18 18" }],
			["path", { "d": "M10.6 10.7a3 3 0 0 0 3.9 3.9" }],
			["path", { "d": "M9.8 4.7A10.4 10.4 0 0 1 12 4.5c6 0 9.5 7 9.5 7a17.6 17.6 0 0 1-2.9 3.8M6 6.2A17.3 17.3 0 0 0 2.5 11.5s3.5 7 9.5 7c1 0 1.9-.1 2.8-.4" }]
		],
		heart: [["path", { "d": "M12 20.5S3.5 14.7 3.5 9.2A4.2 4.2 0 0 1 12 6.5a4.2 4.2 0 0 1 8.5 2.7c0 5.5-8.5 11.3-8.5 11.3z" }]],
		star: [["path", { "d": "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z" }]],
		sparkle: [["path", { "d": "M12 2l1.9 6.4L20 10l-6.1 1.6L12 18l-1.9-6.4L4 10l6.1-1.6z" }]],
		check: [["path", { "d": "M5 12.5l4.5 4.5L19 7.5" }]],
		select: [["rect", {
			"x": "3.5",
			"y": "3.5",
			"width": "17",
			"height": "17",
			"rx": "4"
		}], ["path", { "d": "M8 12l2.8 2.8L16.5 9" }]],
		bell: [["path", { "d": "M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" }], ["path", { "d": "M13.5 21a2 2 0 0 1-3 0" }]],
		coin: [["circle", {
			"cx": "12",
			"cy": "12",
			"r": "9"
		}], ["circle", {
			"cx": "12",
			"cy": "12",
			"r": "3.4"
		}]],
		pulls: [["rect", {
			"x": "3",
			"y": "4",
			"width": "18",
			"height": "16",
			"rx": "2"
		}], ["path", { "d": "M3 9h18" }]],
		collection: [["rect", {
			"x": "4",
			"y": "3",
			"width": "16",
			"height": "18",
			"rx": "2"
		}], ["path", { "d": "M8 7h8M8 11h8M8 15h5" }]],
		catalog: [
			["rect", {
				"x": "3",
				"y": "3",
				"width": "7",
				"height": "7",
				"rx": "1.5"
			}],
			["rect", {
				"x": "14",
				"y": "3",
				"width": "7",
				"height": "7",
				"rx": "1.5"
			}],
			["rect", {
				"x": "3",
				"y": "14",
				"width": "7",
				"height": "7",
				"rx": "1.5"
			}],
			["rect", {
				"x": "14",
				"y": "14",
				"width": "7",
				"height": "7",
				"rx": "1.5"
			}]
		],
		market: [["path", { "d": "M4.5 9 6 5h12l1.5 4M5.5 9v10h13V9M9.5 19v-6h5v6" }]],
		trades: [["path", { "d": "M4 9h13l-3-3M20 15H7l3 3" }]],
		battle: [["path", { "d": "M4.5 19.5l1-3 9-9 2 2-9 9zM19.5 19.5l-1-3-9-9-2 2 9 9z" }]],
		guild: [["path", { "d": "M12 3l7 2.5v5.5c0 4.2-2.9 7.4-7 9-4.1-1.6-7-4.8-7-9V5.5z" }]],
		tag: [["path", { "d": "M3.5 11.6V4.5a1 1 0 0 1 1-1h7.1l8.9 8.9a1 1 0 0 1 0 1.4l-7.1 7.1a1 1 0 0 1-1.4 0z" }], ["circle", {
			"cx": "8",
			"cy": "8",
			"r": "1.4"
		}]],
		friends: [
			["circle", {
				"cx": "9",
				"cy": "8",
				"r": "3.2"
			}],
			["path", { "d": "M3.5 20a5.5 5.5 0 0 1 11 0" }],
			["path", { "d": "M16 5.2a3.2 3.2 0 0 1 0 5.6M20.5 20a5.5 5.5 0 0 0-3.5-5.1" }]
		],
		dms: [["path", { "d": "M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 19.5l1.3-4A7.5 7.5 0 1 1 20 11.5z" }]],
		leaderboard: [["path", { "d": "M4 20h16M6 20v-6M12 20V5M18 20v-9" }]],
		achievements: [["path", { "d": "M7 4h10v5a5 5 0 0 1-10 0zM7 6H4.5v1.5A3 3 0 0 0 7.5 10.5M17 6h2.5v1.5a3 3 0 0 1-3 3M12 14v3M8.5 20h7l-.6-3H9.1z" }]],
		profile: [["circle", {
			"cx": "12",
			"cy": "8",
			"r": "4"
		}], ["path", { "d": "M4.5 20a7.5 7.5 0 0 1 15 0" }]],
		sound: [["path", { "d": "M4 9.5h3.5L12 5.5v13l-4.5-4H4z" }], ["path", { "d": "M15.5 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" }]],
		soundLow: [["path", { "d": "M4 9.5h3.5L12 5.5v13l-4.5-4H4z" }], ["path", { "d": "M15.5 9a4 4 0 0 1 0 6" }]],
		mute: [["path", { "d": "M4 9.5h3.5L12 5.5v13l-4.5-4H4z" }], ["path", { "d": "M16 9.5l5 5M21 9.5l-5 5" }]],
		sidebar: [["rect", {
			"x": "3.5",
			"y": "4.5",
			"width": "17",
			"height": "15",
			"rx": "3"
		}], ["path", { "d": "M9.5 4.5v15" }]],
		menu: [["path", { "d": "M4 7h16M4 12h16M4 17h16" }]],
		lock: [["rect", {
			"x": "5",
			"y": "10.5",
			"width": "14",
			"height": "10",
			"rx": "2.5"
		}], ["path", { "d": "M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" }]],
		settings: [["circle", {
			"cx": "12",
			"cy": "12",
			"r": "3"
		}], ["path", { "d": "M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6" }]]
	};
	var root$39 = from_svg(`<path></path>`);
	var root_1$39 = from_svg(`<circle></circle>`);
	var root_2$33 = from_svg(`<rect></rect>`);
	var root_3$28 = from_svg(`<svg viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"></svg>`);
	function Icon($$anchor, $$props) {
		let filled = prop($$props, "filled", 3, false), width = prop($$props, "width", 3, 1.8), cls = prop($$props, "class", 3, "");
		var svg = root_3$28();
		each(svg, 21, () => PATHS[$$props.name], index, ($$anchor, $$item) => {
			var $$array = user_derived(() => to_array(get($$item), 2));
			let tag = () => get($$array)[0];
			let attrs = () => get($$array)[1];
			var fragment = comment();
			var node = first_child(fragment);
			var consequent = ($$anchor) => {
				var path = root$39();
				attribute_effect(path, () => ({ ...attrs() }));
				append($$anchor, path);
			};
			var consequent_1 = ($$anchor) => {
				var circle = root_1$39();
				attribute_effect(circle, () => ({ ...attrs() }));
				append($$anchor, circle);
			};
			var alternate = ($$anchor) => {
				var rect = root_2$33();
				attribute_effect(rect, () => ({ ...attrs() }));
				append($$anchor, rect);
			};
			if_block(node, ($$render) => {
				if (tag() === "path") $$render(consequent);
				else if (tag() === "circle") $$render(consequent_1, 1);
				else $$render(alternate, -1);
			});
			append($$anchor, fragment);
		});
		reset(svg);
		template_effect(() => {
			set_class(svg, 0, clsx(cls()));
			set_attribute(svg, "fill", filled() ? "currentColor" : "none");
			set_attribute(svg, "stroke-width", width());
		});
		append($$anchor, svg);
	}
	var KEY$2 = "wm-settings";
	var DEFAULTS = {
		hideStats: false,
		hideSensitive: true,
		sideRail: false,
		collection: {
			sort: "rarity",
			filter: "ALL",
			favOnly: false
		},
		catalog: {
			sort: "rarity",
			rarity: "",
			wishOnly: false
		},
		market: {
			tab: "browse",
			sort: "recent",
			rarity: "",
			deal: "good"
		}
	};
	function load() {
		try {
			return JSON.parse(localStorage.getItem(KEY$2)) || {};
		} catch {
			return {};
		}
	}
	var saved$1 = load();
	var settings = proxy(Object.fromEntries(Object.entries(DEFAULTS).map(([k, v]) => [k, typeof v === "object" ? {
		...v,
		...saved$1[k]
	} : saved$1[k] ?? v])));
	effect_root(() => {
		user_effect(() => {
			const json = JSON.stringify(settings);
			try {
				localStorage.setItem(KEY$2, json);
			} catch {}
		});
	});
	var toggleHideStats = () => settings.hideStats = !settings.hideStats;
	var toggleHideSensitive = () => settings.hideSensitive = !settings.hideSensitive;
	var toggleSideRail = () => settings.sideRail = !settings.sideRail;
	function useOriginalSite(path) {
		try {
			localStorage.setItem("wm-off", "1");
		} catch {}
		path ? location.assign(path) : location.reload();
	}
	var RARITIES = new Set([
		"C",
		"PC",
		"R",
		"SR",
		"UR",
		"L"
	]);
	var isOnyx = (card, shiny = false) => !!shiny && card.rarity === "L";
	var artKey = (card, shiny = false) => isOnyx(card, shiny) ? "onyx" : RARITIES.has(card.rarity) ? card.rarity : "C";
	var ART = {
		C: "data:image/webp;base64,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",
		PC: "data:image/webp;base64,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",
		R: "data:image/webp;base64,UklGRuwUAABXRUJQVlA4WAoAAAAQAAAAVwIABwMAQUxQSNoCAAABkHNb27E5nolt2zY/VVlps1IZlf7C2J4uqdjbttHbto2xdX/387zPiQhHiCQpUhQMrJ983eoRoVbBf/gP/+E//If/8B/+w3/4D//hP/yH//Af/sN/+A//4T/8Zw2J7jZmrm9ejZlfh/gqzffVIf56SaCOCYYCdUzFCffXOT6f31frzK915lXerjbXwMTecRLTZWHxuYdv3r2ta941VN5XTL2v/3z48L7+U+kcVj6n9Z/6uMifXt+8pL+0tFl06GOJiPLj6obuojJ044cSMeXn/jmCMuNUiahyc3G0lMy+USKsPFsSKSOjLpSIK48WiEjH7SUCy+XhErLmm8T8L46XjwFXSkSWF375WPtLZko2xYln+YESobkzWjqmPZOan8ulY/kvqSkpjhaO5BKx2dVGNqLy5eZIB61y1LpyxL4aqEaeq12k4ByWjlzBMXYD/guHtLetHHIlyMFB2ebRQbWaOGhfTdhX2uG/cEGWeXQA/4UNMt1Xs82j/fjPNSIiw563ry0sS8d/HhR7XQnS9Ip9NWHRa0OD9uA/Z65U/Nd0pJhHu02dVL0a8B/+MyiSzaNdesU7ONEa/1G5JPwHVnbiP/xnj0i0rwb8Z/DtoGUJ+I87JUqOXr0+c0Mn0Zysgv9KOO32hBxNr+ykGvaVJPtqwH/4z8tlF/5z5krGf8ROr7g+P2fpFPyH/2wYe1wJE6k4SK+k4T+wstfhDmp+v0zp7lL78J/xlgHS1Mr+dmZOZCb+c6mgmt+3fxb+U2B69f+4AWntXVcOief/quYdnMBBue4Hh72DOsCyPIt+0Kv/97frUz5HO2pfDRbWhF59DsB61ccXatUfGnrVdxx61c8eatUnIXrVfyNq1dclatUvKHrVhypq1d8sWtU3L2rVjzFhfp/PvGu8fT4j4/6x8bXE/WOjVsF/+A//4T/8h//wH/7Df/gP/+E//If/8B/+w3/4D//hP/xnC4kAVlA4IOwRAADwxACdASpYAggDPpFInkwlq6moIzJY6XASCWlu4XSOYs45sJ3Db/9/8tWiiHkEdrv7z+d/0D///8fQe7/9V/3/mZ///UH75sysNYMU3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3GO4x3FpmE1Q03XYwJ+2NJ7LIjnK/mpMzz2TPbowriOQ7qLd21YirlFH8H4zo07nvmBsK4r1iIra9q4FWn/bVmeymWbL5BCIdINhmuaiB+wKJJuolF/Mv5l/Mv4S3aAMPaSSjzO4lbdOIOxREoBTbhD1aGpTZx6nxlrXDVwKCybp3Y5k990K4EXS913fxM2vacNGCg0zbYbbDbXm9RIdGN+EwWrpvH77sUBA3Gcme9CehYhlZR9/zhEod6YZs+CCOZu5JVsYs7DRBQDkEteL5/H6s/Vn6pA7WO9Wh/vSjN/f0IC/OID0UZhKb45vivb987spDML0kAOBfRoItvihXFo3/H6s/Vn6ssdbnOgHZuGj246IQ2/itbdF0bgML+yydf75CsfjbkWXodIm0tGlPfwQgCSidMPRkxZ44U4J1zUJPUN/x+rP1Z+rLHYdx4JP1QWx7QHjkgA5xLSNbSTqmdJDz6qX6kCqULRD/GRkhXyQtxjuMdxjt+Ich9V9ckS+MH+/e3TaAT4mYrxCfOXehgdpJpGpekE+GIcDNaKkB6sysyZuwjE/j9Ugagco/MXkNE6un7VfwBcF1uwypr4Qg3Yz0npDgdDJFz6+Y0nmAPHspTDUvn8fqz9WfqkDSTpGEBlTgREa9HSHCzHrkRDh2p82s0G7VoMEEvlB68d1KStDRthtsNthtmue9+3G6lzHEZ9Kzrx3Jm1Q2eJgputmHU+Zl4ykqcCCfx+rP1Z+dveTOXN1wKgHDvujOyGKCxZ9+O7jz1iJScXtMG/4/Vn6s/VljscwCmc+DmbfYwLHVAzUgBwu3fUncXfqEdlHQeXdraA7gcdxjuMdxjt98zfLyxFni3lEQ/pk+TEIDrLw2FboNFraxtCcZKXLOeXvO4CLymX8y/mX0ISnq5J3r8aJIqixEblXS35+kx7OrCXnlpvc7NthtsNthsh1dKs5bEc8SSQd7HrFWCZgg8RTxFzsNefVRjnvKZfzL+ZYfH2Eql/lpSCmrszRZ0NmkacK4U6F9p4pfXaRP4/Vn6s97gKs1Ym9WC3Y32rwjTdEUlHYfIcKMXmZSFuMdxjuMdvvn1k6thzE/TMruMwrPCaguMcGdpdnSZSUpl/Mv5l/CVko2uOUEo+v7ZGBPYwZfQAQ30M3i8y/mX8y/l/SYKHIQDj33/OLG8S/t+knTpGsPMOy8lNIjFjmOe8pl/Mv5lh7a7koBJUxINuxxUSI9yvK4V6Xz+P1Z+rP1SB1DZFRkUp9GkkGtvb8K1ApC3GO4x3GO3341mzLKlK8oIloqMRuUwoNM22G2w215vvFWmWo59CfIa0MgzJ1FdpE/j9Wfqz3ukdiMzRgKRoAtFM954yJQzUOdm2w22G2w2Q/G8tVC6/paFU7d1GD2qS+fx+rP1Z+qJrukUa57jVM3Nd4rVqmFh6MXLtIn8fqz9We9wH7zK6i7ohmsogcJZzYYJ1Dpm2w22G2vOHCe9V3dLn8NrUqDRBSsIReUy/mX8y+Z5MnRQN3GJ6u7N1u0uOuhu0ifx+rP1Z75d03ntnzka/ppV7sJQp1/2R7r/quwvbQr+Yjxrm3AwX95TL+ZfzL+ZfzL/6T9WfrK5Zm2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w22G2w214AAA/vmqxwAAI0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAEF/xQIK+2JBT1p/hqnJoKjsLbs+CkMaPUQEmu5PFLWIyWdUFJfjfzUYNn/ZYY/SSW0nNEfgxaJ2rSs6D2GfOT9MwEQDMOBSUws8CG9glPp7uPvwGwc+Nz3D2t+jEx+qofGx0s+RavZ5Gm/zpte8fDcSkhlykR08M3ys+hcIrCTLBbgvUvt/RBwnlV9lljxq9tgrMmg058lVxYyRCctx0pAlyz3zISXFhBJp0SM0dXrRt2qcfcJGl2x+W/h33NZQetZhp5h2SB/H4Ih/buctj1G/bDPHEKFt9BZm3b6Smn9Hyd4FXtqc/Z6GjpSclheQfiqIQRVe160qZi0g/YLImx9a68UM9gK5PaYxja9KwVkietHpuuslgAxt3GFioeUe7WkyNC1wOMUwxkRv9/fsBxM4aI4sckgU6w7Ev0j6MUxWD2y/jThRBZMKMhIub0X61xqBkHijm/mjriguati7iS8WcGEcWkEPCYFDdRCXibkWr3Ndoy2004NigX7K/+knH5bwCxuXwTcfJ7XBWDoZglsicV+nlfWnBxytSB1fNPsMDCApc5YTr+MdKNNShhTjyegL4gKyZLgP6nAVHJqPTTtACsOmTaw8TutpXREL78rWlGi7Zna7uAZAGvUuIHqpXPqwexmDBa6pN7bxwfJLEcTiXkZ5EanvXvtw7yzVxtqPSEe18blknBmqh2sPETilrWkszoB3fB4V7/QinMXgleE+K/OjlFptsbtVeqq5XDT/svFjQhZuxF9zlRLpIb3zHjfRh5VdgK19rQhIUZ6KABtGDdCTQ+cJcdz/5s5JmdLvf19N3UG9+tQN2Ss/nLEU6R1ncJgMcmpMkeuykUuLjuDBUubQIiobO22XI8vK5P7lwep/JW8dCmIV/s0bNz09ekiYaITgRwsnej6u49FGzDYgzlo/JL5vTIhL0D/IcFX/a98n2BfgKFYFdVY/BOJny4Jinz/ckfbEVn6gPjeSKkQ9MskX4UaU0ypu4Jb/WBhJjvtdSjDuTeDqYKgBqCxQ3QJ+CNDorHFj7sXsIe/EnLOWKdzywpMWw+QiGgHTNzM5f01Nqi6BxHRba7ZvcO7eqcGnzvqBlNDJIALevMgemr0oUYa0mKFMbXAmzTwl5BeeUVLoyalzmWimuI5/ZOwqote+v6hB+wuhO16wKXcU3FUfkRfQLtqBtmd+u026r1YF9jPOAAAUvbPhqN9dPjNBAKulLDMMfr1fXpsinVucQYCAKLBiNv3mYDGhZSFEToLID12YSd9P1kS6COr8WLLRhQbqL4NsUCHYkvOqHyvuZNgMC35bpQWezriUQZtBft/HMM11djBu/3W5R5SS23PxgJs47KkXSjnjX2Ftdsex8YjJFZQNDQx/tucwYHi0HOVGjf54nNgya/vSfDrufblsBwmN322CymXuSG8Q0otMqhagYAF88lcgBNY5mNJvWCO8E5E45gU4YIXBC+D8z7CxNB/0vS+zYH74n/CgmAknLc3N8yLANAadRSwQQs24pPdvGLeD7GG/40xyRy1LU4RMFb4clBzl45lXs0LP9mq//0U/pMxWEbwuypVtktobAhXQVny9KRitc+y3MIrwMHTqFiHB0m0z1QLLkydESVKQED1wPjZSq7uH3o7RxdeIGwveHi7BQKhggTmm37FOhygaxgzPJW934AQVXFHNvS9tqssW0U3dFeWTZg9nRG2t/vJC5O/QkvMUdb05H0bOOtL6ZttyhRBBo+wEg7vCl/Pa4kC41bHQBqNkc5EXgIGgPzuWJgNa+Z5LPJ22PTYggfNbcY0eLxvp3WMcoUvUz4J3M6xTG61Cx13oyUhqUf6vmt4U95+wyZ3g8KkFjlpWMkqd9EGuA96F3z1A9EfimS9RoV3z+1u1M8QF4vQf91L01lGPrkYMjGFyq9hKZWQInzQoENq54oRcd6v2StP+SfrEYLPEx4nPMw34ZOXETIap587XK2IzrSRcaelmjK2my8mzjOnHrVBnuEEkIXbNUhNQYaZSKktFvL10ci8LCDFU60PIinKPPSiQhuaVdI+Or6CwpPKgV3fLX5VLvPMXzeMHwFkzlOlzxJYOrrQ0802yi8LpnC080risOQCqc0Who2W9CBybeTRXz1pBlCrM2zooUkAAIItoeIQElQ7t/h+Ig1gFRAmX8jU9sFBtfO2Jw6hTgGBei0J2eL+r7C0RlfZZSvhr6ubPPxZ4E6vmqO9nO+Gunv6aanktoYokxF8z+3Ox83shivgUGvd19c4OUmZ2IF/zxuyfN0SSv5t5m7ylMevcfzif8JDmo7UOj/j3sCwaeVASBt1YpK0BQ0keg0DN20UzrlpNEWuHhtIhSDgSVjAASTHgQ1mtQWF7c8AVJj7d//+7zgn6lVURgigDuFXHR4cWcd59fyAefdo6gSBW4qevHjr0Unex3eWFXEi3sQEgXt3C3LVDY9DPKEApcRjL3XkXYwktEMHSt44Y4E+5Yfxs6AxucRQ6nWqf2AmNQBTUqAShxyVsdckkiBcxy3LA1HFY8NkUyejba4wyrvaJVcDwU34gdOTMr+X2TENohUgTGOqghPJC8YnxvAVV67oPwer1zQYmcgmuYAxFj6VHC+k0kB0sd0a9ehRSlekJlj8q9V1yoN4pPGqFnYSAMU+r1B8U/vWS4l+/RAyf2AgE463RxUNKHuzrM+rdxb2AuCwPCQXd5qlapVnHKps24diIej+itb5quHIm3pMMOSLKtACHnDcFSfpSpxd49zHCNQ0ta8vGAOHYEEDEmIyVVdcerRY2uQrbOsqUfobvr7bzWEZeIJf57b+T7NsJMJlDMlUIXD22iGMLXWy6skwARFyQFi5dW3ZTUbXZ4VZ/hrQ2aNE8AnmT0RvtmKjXnjCZYhF5NvuaOE+9YNqrPv4f3a/eki1U03gLp56xv9m8+XcBJcdFZKAZFg68sK69cGKDxF1qPtcn/2J8vKMini6SdlSS4CgRxPBSQJ+6iZowo66eAwEU4dauB+rP2no4WgOyKKNjzaciDD6papY47Y19z8pSOmobSjC47I3rlTJuw0BOObggAZsdyivxMmKYOtRcSEMttjcMOJbK9jRuqj62OkfVCOfCDwVKKg9ttyCK8oAoIDoFiHpGs7p3qbXudl+uSkkWKkuCBaJUXW0J3EUhpAw0TnQGiOatMPaOB0EvmyrlAz7zFYk+kGfOJizJyabbGVSftzE5QOly93homJ6eeDGM2993+H9AUd5RJ1wEOZaXUrTTQRptDSZ+sPMzFPlznUTCFXpTM+iFoQhxLuB5veC5JcKL6rsnaVjEOPHRzNlW3pwtzPh14GLmxsIJPGFujd3Uha09BkJFaVWMhNZFi+w2wcN7AgVz5nYgAXAVFuhN6eo3Dsaq0ce+JA1mRapBrJIQnw6gv1qXCwbVgBEgSs8ge8PpsEgCCJg3uO/u/QadfpDDQZJgCVnKauWJEcLOQCYhbhTeXml2qH01JzfbqY5PPwjZ1QJgcrxlXcAEpb+ZClfKN9zIdhHEjObiEl2FtylZWM8tWFEjfdYOLloUAT2/jR7uGBvJMWTx76kBuRbr0oVLKKCDUhOEZvw5Kzq86QGv64+AAWjKgpQ7uhowI1nSomBWHgIAJaHG6NmJyXqgTe4l7+QDb4iUBwpRdj1aI2M/+YMn+Ah/Y1f+mcwlUg9UAvbksRId4E5AgnpsYnwySJh1v/Lv5U7yqsEMts3xJkJTFkGID4ZV0AuGDhAX1TptSP+D5wLH4Fn1pVgAeiVOrTAFRMkOG4AQzA0/sAAPd5gtIdTq4+VBim2oPZ6ISZRAFwtxKRhCJiziDyL+hgIzaMBPlPQBoawAdLYIX7YWq0Hy1nEQKK/sKAiNICqz8rm0AC/4lwAWMCPy8nYwEpS2ep59k+RzDXRHDhpf5veS7Hv4RSMOpBUsxX/HSbrsrE5QeBC2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
		SR: "data:image/webp;base64,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",
		UR: "data:image/webp;base64,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",
		L: "data:image/webp;base64,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",
		onyx: "https://www.wiki-masters.com/shiny/onyx-art.webp"
	};
	var rarityArt = (card, shiny = false) => ART[artKey(card, shiny)];
	function transparentShare(rgba) {
		let clear = 0;
		for (let i = 3; i < rgba.length; i += 4) if (rgba[i] < 128) clear++;
		return rgba.length ? clear / (rgba.length / 4) : 0;
	}
	function seeThrough(img, threshold = .1) {
		if (/\.jpe?g($|\?)/i.test(img.currentSrc || img.src)) return false;
		try {
			const c = document.createElement("canvas");
			c.width = c.height = 24;
			const ctx = c.getContext("2d", { willReadFrequently: true });
			ctx.drawImage(img, 0, 0, 24, 24);
			return transparentShare(ctx.getImageData(0, 0, 24, 24).data) >= threshold;
		} catch {
			return false;
		}
	}
	function seed(text) {
		let h = 2166136261;
		for (const ch of text || "") h = Math.imul(h ^ ch.codePointAt(0), 16777619);
		return h >>> 0;
	}
	function random(text) {
		let s = seed(text) || 1;
		return () => ((s = Math.imul(s ^ s >>> 15, 2246822507) ^ Math.imul(s ^ s >>> 13, 3266489909)) >>> 0) / 4294967296;
	}
	var round = (x) => +x.toFixed(2);
	function cardSky(title) {
		const r = random(title);
		const stars = Array.from({ length: 46 }, () => [
			round(r() * 100),
			round(r() * 140),
			round(.15 + r() * .4),
			round(.25 + r() * .5)
		]);
		const angle = (20 + r() * 25) * Math.PI / 180;
		const shooting = Array.from({ length: 5 + Math.floor(r() * 4) }, () => {
			const x = 5 + r() * 90, y = 5 + r() * 115, len = 8 + r() * 20;
			return [
				round(x - len * Math.cos(angle)),
				round(y - len * Math.sin(angle)),
				round(x),
				round(y),
				round(.25 + r() * .45),
				round(.35 + r() * .55)
			];
		});
		const sparkles = Array.from({ length: 2 + Math.floor(r() * 2) }, () => {
			const a = r() * Math.PI * 2, d = 17 + r() * 8;
			return [
				round(50 + d * Math.cos(a)),
				round(52 + d * Math.sin(a)),
				round(1.6 + r() * 1.6)
			];
		});
		const dots = (keep) => stars.filter(keep).map(([x, y]) => `M${x} ${y}h0`).join("");
		return {
			stars,
			field: {
				dim: dots(([, , , o]) => o < .5),
				bright: dots(([, , , o]) => o >= .5)
			},
			shooting,
			sparkles
		};
	}
	var root$38 = from_svg(`<defs><radialGradient><stop offset="0" stop-color="#fff" stop-opacity=".55"></stop><stop offset=".22" class="glow-mid"></stop><stop offset="1" class="glow-out"></stop></radialGradient></defs>`);
	var root_1$38 = from_svg(`<path class="spark"></path>`);
	var root_2$32 = from_svg(`<circle cx="50" cy="52" r="30"></circle><!>`, 1);
	var root_3$27 = from_html(`<span class="wc-meteor" aria-hidden="true"></span>`);
	var root_4$26 = from_html(`<svg class="wc-sky" viewBox="0 0 100 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><!><path stroke="#fff" stroke-opacity=".38" stroke-width=".7" stroke-linecap="round"></path><path stroke="#fff" stroke-opacity=".7" stroke-width=".85" stroke-linecap="round"></path><!><g transform="translate(50 52)"><path class="ray"></path><path class="core"></path></g></svg> <!>`, 1);
	function CardSky($$anchor, $$props) {
		const id = props_id();
		push($$props, true);
		let shiny = prop($$props, "shiny", 3, false);
		const STAR = "M0-1C.08-.25.25-.08 1 0 .25.08.08.25 0 1-.08.25-.25.08-1 0-.25-.08-.08-.25 0-1Z";
		var fragment = root_4$26();
		var svg = first_child(fragment);
		var node = child(svg);
		var consequent = ($$anchor) => {
			var defs = root$38();
			var radialGradient = only_child(defs);
			template_effect(() => set_attribute(radialGradient, "id", `g${id}`));
			append($$anchor, defs);
		};
		if_block(node, ($$render) => {
			if (shiny()) $$render(consequent);
		});
		var path = sibling(node);
		var path_1 = sibling(path);
		var node_1 = sibling(path_1);
		var consequent_1 = ($$anchor) => {
			var fragment_1 = root_2$32();
			var circle = first_child(fragment_1);
			each(sibling(circle), 17, () => $$props.sky.sparkles, index, ($$anchor, $$item) => {
				var $$array = user_derived(() => to_array(get($$item), 3));
				let x = () => get($$array)[0];
				let y = () => get($$array)[1];
				let k = () => get($$array)[2];
				var path_2 = root_1$38();
				set_attribute(path_2, "d", STAR);
				template_effect(() => set_attribute(path_2, "transform", `translate(${x() ?? ""} ${y() ?? ""}) scale(${k() ?? ""})`));
				append($$anchor, path_2);
			});
			template_effect(() => set_attribute(circle, "fill", `url(#g${id})`));
			append($$anchor, fragment_1);
		};
		if_block(node_1, ($$render) => {
			if (shiny()) $$render(consequent_1);
		});
		var g = sibling(node_1);
		var path_3 = child(g);
		set_attribute(path_3, "d", STAR);
		var path_4 = sibling(path_3);
		set_attribute(path_4, "d", STAR);
		reset(g);
		reset(svg);
		var node_3 = sibling(svg, 2);
		var consequent_2 = ($$anchor) => {
			var fragment_2 = comment();
			each(first_child(fragment_2), 17, () => $$props.sky.shooting, index, ($$anchor, $$item, i) => {
				var $$array_1 = user_derived(() => to_array(get($$item), 6));
				let x0 = () => get($$array_1)[0];
				let y0 = () => get($$array_1)[1];
				let x1 = () => get($$array_1)[2];
				let y1 = () => get($$array_1)[3];
				let w = () => get($$array_1)[4];
				let o = () => get($$array_1)[5];
				var span = root_3$27();
				template_effect(($0, $1) => set_style(span, `left:${x0() ?? ""}%;top:${y0() / 140 * 100}%;width:${$0 ?? ""}%;--a:${$1 ?? ""}rad;--w:${w() * 2.4}px;opacity:${o() ?? ""};animation-delay:${-i * .55}s`), [() => Math.hypot(x1() - x0(), y1() - y0()), () => Math.atan2(y1() - y0(), x1() - x0())]);
				append($$anchor, span);
			});
			append($$anchor, fragment_2);
		};
		if_block(node_3, ($$render) => {
			if (shiny()) $$render(consequent_2);
		});
		template_effect(() => {
			set_attribute(path, "d", $$props.sky.field.dim);
			set_attribute(path_1, "d", $$props.sky.field.bright);
			set_attribute(path_3, "transform", `scale(${shiny() ? 15 : 13})`);
			set_attribute(path_4, "transform", `scale(${shiny() ? 8 : 6.5})`);
		});
		append($$anchor, fragment);
		pop();
	}
	var root$37 = from_html(`<img class="wc-photo onyx-photo" loading="lazy" crossorigin="anonymous"/>`);
	var root_1$37 = from_html(`<img class="wc-bg onyx" alt="" aria-hidden="true" loading="lazy"/> <span class="ox ox-shade" aria-hidden="true"></span> <span class="ox ox-tint" aria-hidden="true"></span> <span class="ox ox-wash" aria-hidden="true"></span> <!> <span class="ox ox-lines" aria-hidden="true"></span> <span class="ox ox-shine" aria-hidden="true"></span>`, 1);
	var root_2$31 = from_html(`<img class="wc-blur" alt="" aria-hidden="true" loading="lazy" crossorigin="anonymous"/> <img class="wc-photo" loading="lazy" crossorigin="anonymous"/>`, 1);
	var root_3$26 = from_html(`<span aria-hidden="true"></span>`);
	var root_4$25 = from_html(`<span class="wc-nsfw" aria-hidden="true">Contenu sensible</span>`);
	var root_5$25 = from_html(`<span class="wc-wish" title="Liste de souhaits" aria-label="Liste de souhaits"><!></span>`);
	var root_6$24 = from_html(`<span class="wc-star" title="Favori" aria-label="Favori"><!></span>`);
	var root_7$22 = from_html(`<span class="wc-shiny" title="Brillante" aria-label="Brillante"><!></span>`);
	var root_8$21 = from_html(`<span class="wc-count"> </span>`);
	var root_9$19 = from_html(`<span class="wc-new">Nouvelle</span>`);
	var root_10$16 = from_html(`<span class="wc-stats"><span>ATK <b> </b></span> <span>DEF <b> </b></span></span>`);
	var root_11$15 = from_html(`<span class="wc-val" title="Valeur estimée d'après le marché"> </span>`);
	var root_12$15 = from_html(`<div class="wc-meta"><!> <!></div>`);
	var root_13$15 = from_html(`<article><div class="wc-face"><!> <!> <!></div> <div class="wc-scrim"></div> <div class="wc-top"><span class="wc-rtag"> </span> <span class="wc-flags"><!> <!> <!> <!> <!></span></div> <div class="wc-cap"><h3 class="wc-name"> </h3> <div class="wc-cat"> </div> <!></div></article>`);
	function Card($$anchor, $$props) {
		push($$props, true);
		let count = prop($$props, "count", 3, 1), isNew = prop($$props, "isNew", 3, false), shiny = prop($$props, "shiny", 3, false), starred = prop($$props, "starred", 3, false), value = prop($$props, "value", 3, void 0), owned = prop($$props, "owned", 3, true), wishlisted = prop($$props, "wishlisted", 3, false), big = prop($$props, "big", 3, false), caption = prop($$props, "caption", 3, true), stats = prop($$props, "stats", 3, true);
		const showStats = user_derived(() => stats() && !settings.hideStats);
		let hasValue = user_derived(() => typeof value() === "number");
		let blurred = user_derived(() => settings.hideSensitive && $$props.card.nsfw_image);
		const onyx = user_derived(() => isOnyx($$props.card, shiny()) && get(showPhoto));
		const art = user_derived(() => rarityArt($$props.card, shiny()));
		let imgFailed = state(false);
		let paper = state(false);
		const sky = user_derived(() => get(showPhoto) ? null : cardSky($$props.card.title));
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
		var article = root_13$15();
		let classes;
		var div = child(article);
		var node = child(div);
		var consequent_1 = ($$anchor) => {
			var fragment = root_1$37();
			var img_1 = first_child(fragment);
			action(img_1, ($$node) => fadeIn?.($$node));
			var node_1 = sibling(img_1, 8);
			var consequent = ($$anchor) => {
				var img_2 = root$37();
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
			var fragment_1 = root_2$31();
			var img_3 = first_child(fragment_1);
			var img_4 = sibling(img_3, 2);
			action(img_4, ($$node) => fadeIn?.($$node));
			template_effect(() => {
				set_attribute(img_3, "src", $$props.card.image_url);
				set_attribute(img_4, "src", $$props.card.image_url);
				set_attribute(img_4, "alt", $$props.card.title);
			});
			event("load", img_4, (e) => set(paper, seeThrough(e.currentTarget), true));
			event("error", img_4, () => set(imgFailed, true));
			replay_events(img_4);
			append($$anchor, fragment_1);
		};
		var consequent_3 = ($$anchor) => {
			CardSky($$anchor, {
				get sky() {
					return get(sky);
				},
				get shiny() {
					return shiny();
				}
			});
		};
		if_block(node, ($$render) => {
			if (get(onyx)) $$render(consequent_1);
			else if (get(showPhoto)) $$render(consequent_2, 1);
			else if (get(sky)) $$render(consequent_3, 2);
		});
		var node_2 = sibling(node, 2);
		var consequent_4 = ($$anchor) => {
			var span = root_3$26();
			let classes_1;
			template_effect(() => classes_1 = set_class(span, 1, "wc-holo", null, classes_1, { onyx: get(onyx) }));
			append($$anchor, span);
		};
		if_block(node_2, ($$render) => {
			if (shiny()) $$render(consequent_4);
		});
		var node_3 = sibling(node_2, 2);
		var consequent_5 = ($$anchor) => {
			append($$anchor, root_4$25());
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
			var span_4 = root_5$25();
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
			var span_5 = root_6$24();
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
			var span_6 = root_7$22();
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
			var span_7 = root_8$21();
			var text_1 = only_child(span_7);
			template_effect(() => set_text(text_1, `x${count() ?? ""}`));
			append($$anchor, span_7);
		};
		if_block(node_10, ($$render) => {
			if (count() > 1) $$render(consequent_9);
		});
		var node_11 = sibling(node_10, 2);
		var consequent_10 = ($$anchor) => {
			append($$anchor, root_9$19());
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
			var div_4 = root_12$15();
			var node_13 = child(div_4);
			var consequent_11 = ($$anchor) => {
				var span_9 = root_10$16();
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
				var span_12 = root_11$15();
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
				paper: get(paper),
				"is-ready": get(ready) || !!get(sky),
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
	var KEY$1 = "wiki-masters-sound";
	var VOLUME_KEY = "wm-volume";
	var SCALE = .9;
	var ctx = null;
	var master = null;
	var noiseBuf = null;
	var subs = new Set();
	function soundOn() {
		try {
			return localStorage.getItem(KEY$1) !== "off";
		} catch {
			return true;
		}
	}
	function setSoundOn(on) {
		try {
			localStorage.setItem(KEY$1, on ? "on" : "off");
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
	function tone(type, f0, f1, t, dur, peak, attack = .004) {
		const o = ctx.createOscillator(), g = ctx.createGain();
		o.type = type;
		o.frequency.setValueAtTime(f0, t);
		if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
		env(g, t, peak, attack, dur);
		o.connect(g).connect(master);
		o.start(t);
		o.stop(t + dur + .05);
	}
	function noise(t, dur, peak, type, f0, f1, q = 1, attack = .008) {
		const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
		s.buffer = noiseBuf;
		f.type = type;
		f.Q.value = q;
		f.frequency.setValueAtTime(f0, t);
		f.frequency.exponentialRampToValueAtTime(f1, t + dur);
		env(g, t, peak, attack, dur);
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
	var vary = (f) => f * (1 + (Math.random() - .5) * .05);
	var N = {
		C4: 261.6,
		E4: 329.6,
		G4: 392,
		B4: 493.9,
		C5: 523.3,
		D5: 587.3,
		E5: 659.3,
		G5: 784,
		A5: 880,
		B5: 987.8,
		C6: 1046.5,
		E6: 1318.5,
		G6: 1568
	};
	var SOUNDS = {
		rip(t) {
			for (let i = 0; i < 4; i++) noise(t + i * .035, .05, .08, "bandpass", 1200 + i * 500, 2600 + i * 600, 1.5);
			noise(t + .1, .35, .05, "bandpass", 700, 3200, .7);
			tone("sine", N.C5, N.G5, t + .12, .25, .05, .03);
		},
		flip(t) {
			noise(t, .14, .12, "bandpass", 1300, 2800, .9, .025);
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
			tone("sine", 110, 82, t, .6, .18);
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
			const f = vary(N.E5);
			tone("sine", f, f * 1.33, t, .08, .09, .008);
		},
		deselect(t) {
			const f = vary(N.A5);
			tone("sine", f, f * .75, t, .08, .07, .008);
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
			const f = vary(440);
			tone("sine", f, f * .85, t, .05, .06, .006);
			noise(t, .025, .02, "bandpass", 1600, 1100, 1.2);
		}
	};
	var lastAt = {};
	function play(name, delay = 0) {
		if (!soundOn() || !SOUNDS[name]) return;
		if (!audio()) return;
		const t = ctx.currentTime + .01 + delay;
		if (t - (lastAt[name] ?? -1) < .06) return;
		lastAt[name] = t;
		try {
			SOUNDS[name](t);
		} catch {}
	}
	var CHIME_KEY = "wm-chime-from";
	var CHIME_ORDER = [
		"C",
		"PC",
		"R",
		"SR",
		"UR",
		"L"
	];
	var chimeSubs = new Set();
	function chimeFrom() {
		try {
			const r = localStorage.getItem(CHIME_KEY);
			return CHIME_ORDER.includes(r) ? r : "C";
		} catch {
			return "C";
		}
	}
	function setChimeFrom(r) {
		try {
			localStorage.setItem(CHIME_KEY, r);
		} catch {}
		for (const f of chimeSubs) f(r);
	}
	function onChimeChange(f) {
		chimeSubs.add(f);
		f(chimeFrom());
		return () => chimeSubs.delete(f);
	}
	function chime(rarity, delay = 0) {
		if (CHIME_ORDER.indexOf(rarity) >= CHIME_ORDER.indexOf(chimeFrom())) play(rarity, delay);
	}
	function reveal(rarity) {
		play("flip");
		chime(rarity, .12);
	}
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
	var root$36 = from_html(` <b> </b>`, 1);
	var root_1$36 = from_html(`<span class="cmp-sum"> <b> </b> · moyenne <b> </b><!></span>`);
	var root_2$30 = from_html(`<li><div class="cmp-row sk"></div></li>`);
	var root_3$25 = from_html(`<ol class="cmp-list" aria-label="Recherche des ventes en cours"></ol>`);
	var root_4$24 = from_html(`<div class="auc-empty"> <!></div>`);
	var root_5$24 = from_html(`<span class="cmp-shiny" title="Brillante"><!></span>`);
	var root_6$23 = from_html(`<span class="cmp-tag">Finit en premier</span>`);
	var root_7$21 = from_html(`<li><button><span class="cmp-price"><span class="auc-coin"></span> <!></span> <span> </span> <span> <!></span> <span class="cmp-who"> </span></button></li>`);
	var root_8$20 = from_html(`<ol class="cmp-list"></ol>`);
	var root_9$18 = from_html(`<section class="auc-panel cmp" aria-label="Ventes en cours de cette carte"><div class="cmp-head"><h3>Ventes en cours</h3> <!></div> <!></section>`);
	function ListingCompare($$anchor, $$props) {
		push($$props, true);
		let current = prop($$props, "current", 3, null), soldAvg = prop($$props, "soldAvg", 3, null);
		const all = user_derived(() => $$props.listings && (current() ? [current(), ...$$props.listings.filter((o) => o.id !== current().id)] : $$props.listings));
		const cmp = user_derived(() => get(all) && compareListings(get(all), $$props.now));
		const others = user_derived(() => get(cmp) ? get(cmp).rows.length - (current() ? 1 : 0) : 0);
		var section = root_9$18();
		var div = child(section);
		var node = sibling(child(div), 2);
		var consequent_1 = ($$anchor) => {
			var span = root_1$36();
			var text = child(span);
			var b = sibling(text);
			var text_1 = only_child(b, true);
			var b_1 = sibling(b, 2);
			var text_2 = only_child(b_1, true);
			var node_1 = sibling(b_1);
			var consequent = ($$anchor) => {
				var fragment = root$36();
				var text_3 = first_child(fragment);
				text_3.nodeValue = " · prix du marché ";
				var text_4 = only_child(sibling(text_3), true);
				template_effect(($0) => set_text(text_4, $0), [() => nf(soldAvg())]);
				append($$anchor, fragment);
			};
			if_block(node_1, ($$render) => {
				if (soldAvg() != null) $$render(consequent);
			});
			reset(span);
			template_effect(($0, $1) => {
				set_text(text, `${get(cmp).stats.count ?? ""} en vente · dès `);
				set_text(text_1, $0);
				set_text(text_2, $1);
			}, [() => nf(get(cmp).stats.min), () => nf(get(cmp).stats.avg)]);
			append($$anchor, span);
		};
		if_block(node, ($$render) => {
			if (get(cmp) && get(cmp).stats.count > 1) $$render(consequent_1);
		});
		reset(div);
		var node_2 = sibling(div, 2);
		var consequent_2 = ($$anchor) => {
			var ol = root_3$25();
			each(ol, 20, () => Array(3), index, ($$anchor, _) => {
				append($$anchor, root_2$30());
			});
			reset(ol);
			append($$anchor, ol);
		};
		var consequent_4 = ($$anchor) => {
			var div_1 = root_4$24();
			var text_5 = child(div_1, true);
			var node_3 = sibling(text_5);
			var consequent_3 = ($$anchor) => {
				var text_6 = text();
				template_effect(($0) => set_text(text_6, ` Prix du marché : ${$0 ?? ""}.`), [() => nf(soldAvg())]);
				append($$anchor, text_6);
			};
			if_block(node_3, ($$render) => {
				if (soldAvg() != null) $$render(consequent_3);
			});
			reset(div_1);
			template_effect(() => set_text(text_5, current() ? "C'est la seule vente de cette carte en ce moment." : "Aucune vente de cette carte en ce moment."));
			append($$anchor, div_1);
		};
		var alternate = ($$anchor) => {
			var ol_1 = root_8$20();
			each(ol_1, 21, () => get(cmp).rows, (r) => r.id, ($$anchor, r) => {
				const left = user_derived(() => secondsUntil(get(r).endAt, $$props.now) ?? 0);
				const here = user_derived(() => get(r).id === current()?.id);
				var li_1 = root_7$21();
				var button = child(li_1);
				let classes;
				var span_1 = child(button);
				var text_7 = sibling(child(span_1), 1, true);
				var node_4 = sibling(text_7);
				var consequent_5 = ($$anchor) => {
					var span_2 = root_5$24();
					Icon(child(span_2), {
						name: "sparkle",
						width: 2
					});
					reset(span_2);
					append($$anchor, span_2);
				};
				if_block(node_4, ($$render) => {
					if (get(r).is_shiny) $$render(consequent_5);
				});
				reset(span_1);
				var span_3 = sibling(span_1, 2);
				let classes_1;
				var text_8 = only_child(span_3, true);
				var span_4 = sibling(span_3, 2);
				let classes_2;
				var text_9 = child(span_4, true);
				var node_6 = sibling(text_9);
				var consequent_6 = ($$anchor) => {
					append($$anchor, root_6$23());
				};
				if_block(node_6, ($$render) => {
					if (get(r).soonest) $$render(consequent_6);
				});
				reset(span_4);
				var text_10 = only_child(sibling(span_4, 2), true);
				reset(button);
				reset(li_1);
				template_effect(($0, $1, $2, $3, $4) => {
					classes = set_class(button, 1, "cmp-row", null, classes, { here: get(here) });
					button.disabled = get(here);
					set_attribute(button, "aria-label", `${$0 ?? ""} WikiBidous, se termine dans ${$1 ?? ""}`);
					set_text(text_7, $2);
					classes_1 = set_class(span_3, 1, "cmp-gap", null, classes_1, { best: get(r).cheapest && !get(r).is_shiny });
					set_text(text_8, $3);
					classes_2 = set_class(span_4, 1, "cmp-time", null, classes_2, { soon: get(left) < 3600 });
					set_text(text_9, $4);
					set_text(text_10, get(here) ? "Celle-ci" : get(r).mine ? "Votre vente" : get(r).seller || "");
				}, [
					() => nf(get(r).price),
					() => countdown(get(left)),
					() => nf(get(r).price),
					() => get(r).cheapest ? get(r).is_shiny ? "Brillante" : "Le moins cher" : `+${nf(get(r).gap)}`,
					() => countdown(get(left))
				]);
				delegated("click", button, () => $$props.onpick?.(get(r)));
				append($$anchor, li_1);
			});
			reset(ol_1);
			append($$anchor, ol_1);
		};
		if_block(node_2, ($$render) => {
			if (!get(cmp)) $$render(consequent_2);
			else if (!get(others)) $$render(consequent_4, 1);
			else $$render(alternate, -1);
		});
		reset(section);
		append($$anchor, section);
		pop();
	}
	delegate(["click"]);
	function rarityMarket(market, rarity) {
		const sales = (market?.sales || []).filter((s) => s.rarity === rarity && s.price != null).sort((a, b) => a.at - b.at);
		const prices = sales.map((s) => s.price);
		const median = prices.length ? saleStats(sales).median : null;
		const avg = median ?? market?.averages?.[rarity] ?? null;
		return {
			avg,
			basis: median != null ? "median" : avg != null ? "average" : null,
			series: sales,
			count: prices.length,
			min: prices.length ? Math.min(...prices) : null,
			max: prices.length ? Math.max(...prices) : null,
			recent: sales.slice(-10).reverse()
		};
	}
	function marketVerdict(rm, cheapest) {
		const pct = (v) => rm.avg && v != null ? Math.round((v - rm.avg) / rm.avg * 100) : null;
		const last = rm.series.at(-1)?.price ?? null;
		const sellAt = cheapest != null ? Math.max(1, Math.min(cheapest - 1, rm.avg ?? cheapest)) : rm.avg;
		return {
			last,
			lastPct: pct(last),
			cheapest,
			cheapestPct: pct(cheapest),
			sellAt
		};
	}
	var quantile = (sorted, q) => {
		const i = q * (sorted.length - 1), lo = Math.floor(i);
		return lo + 1 < sorted.length ? sorted[lo] + (sorted[lo + 1] - sorted[lo]) * (i - lo) : sorted[lo];
	};
	function niceStep(raw) {
		const p = 10 ** Math.floor(Math.log10(raw || 1));
		return p * ([
			1,
			2,
			2.5,
			5,
			10
		].find((m) => m * p >= raw) ?? 10);
	}
	var DAY = 864e5;
	var PERIODS = [
		[
			"7",
			"7 j",
			7
		],
		[
			"30",
			"30 j",
			30
		],
		[
			"90",
			"90 j",
			90
		],
		[
			"all",
			"Tout",
			null
		]
	];
	var inPeriod = (series, days, now = Date.now()) => days == null ? series : series.filter((s) => s.at >= now - days * DAY);
	function saleStats(series) {
		const p = series.map((s) => s.price).sort((a, b) => a - b);
		if (!p.length) return {
			count: 0,
			last: null,
			median: null,
			avg: null,
			min: null,
			max: null
		};
		return {
			count: p.length,
			last: series.at(-1).price,
			median: Math.round(quantile(p, .5)),
			avg: Math.round(p.reduce((a, b) => a + b, 0) / p.length),
			min: p[0],
			max: p.at(-1)
		};
	}
	function groupStart(t, week = false) {
		const d = new Date(t);
		return new Date(d.getFullYear(), d.getMonth(), d.getDate() - (week ? (d.getDay() + 6) % 7 : 0)).getTime();
	}
	function priceChart(series, { avg = null, label = (t) => new Date(t).toLocaleDateString("fr", {
		day: "numeric",
		month: "short"
	}) } = {}) {
		const sales = (series || []).filter((s) => s.price != null && s.at).sort((a, b) => a.at - b.at);
		if (sales.length < 2) return null;
		const span = sales.at(-1).at - sales[0].at;
		const week = span > 120 * DAY;
		const groups = new Map();
		for (const s of sales) {
			const key = groupStart(s.at, week);
			(groups.get(key) ?? groups.set(key, {
				at: key + (week ? 3.5 : .5) * DAY,
				prices: []
			}).get(key)).prices.push(s.price);
		}
		const want = Math.min(25, Math.max(6, sales.length / 10));
		const half = Math.min(Math.max(DAY, span * want / sales.length), Math.max(DAY, span / 5)) / 2;
		const around = (t) => {
			let near = sales.filter((s) => Math.abs(s.at - t) <= half);
			const k = Math.max(3, Math.round(want / 2));
			if (near.length < k) near = [...sales].sort((a, b) => Math.abs(a.at - t) - Math.abs(b.at - t)).slice(0, k);
			return near.map((s) => s.price).sort((a, b) => a - b);
		};
		const buckets = [...groups].sort((a, b) => a[0] - b[0]).map(([key, { at, prices }]) => {
			const own = prices.sort((a, b) => a - b), win = around(at);
			return {
				key,
				at,
				count: own.length,
				min: own[0],
				max: own.at(-1),
				median: Math.round(quantile(own, .5)),
				trend: Math.round(quantile(win, .5)),
				q1: quantile(win, .25),
				q3: quantile(win, .75)
			};
		});
		const all = sales.map((s) => s.price).sort((a, b) => a - b);
		let lo = Math.min(quantile(all, .05), avg ?? Infinity);
		let hi = Math.max(quantile(all, .95), avg ?? -Infinity);
		if (hi - lo < 1) {
			hi += 1;
			lo = Math.max(0, lo - 1);
		}
		const pad = (hi - lo) * .1;
		lo = Math.max(0, lo - pad);
		hi += pad;
		const y = (v) => Math.min(100, Math.max(0, (1 - (v - lo) / (hi - lo)) * 100));
		const t0 = buckets[0].at, t1 = buckets.at(-1).at;
		const x = (t) => t1 === t0 ? 50 : Math.min(100, Math.max(0, (t - t0) / (t1 - t0) * 100));
		const f = (n) => n.toFixed(2);
		const points = buckets.map((b) => ({
			...b,
			x: x(b.at),
			y: y(b.trend),
			out: b.trend > hi || b.trend < lo
		}));
		points.forEach((p, i) => {
			p.x0 = i ? (points[i - 1].x + p.x) / 2 : 0;
			p.x1 = i < points.length - 1 ? (p.x + points[i + 1].x) / 2 : 100;
		});
		const steps = (t1 - t0) / (week ? 7 * DAY : DAY);
		const barW = steps ? Math.min(4, Math.max(.4, 100 / steps * .7)) : 4;
		const line = points.map((p, i) => `${i ? "L" : "M"}${f(p.x)} ${f(p.y)}`).join(" ");
		const band = points.length > 1 ? `${points.map((p, i) => `${i ? "L" : "M"}${f(p.x)} ${f(y(p.q3))}`).join(" ")} ${[...points].reverse().map((p) => `L${f(p.x)} ${f(y(p.q1))}`).join(" ")} Z` : null;
		const maxCount = Math.max(...points.map((p) => p.count));
		const step = niceStep((hi - lo) / 3);
		const yTicks = [];
		for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) yTicks.push({
			value: v,
			y: y(v)
		});
		const n = Math.min(4, points.length);
		const xTicks = n < 2 ? [{
			label: label(t0),
			x: 50
		}] : Array.from({ length: n }, (_, i) => {
			const t = t0 + (t1 - t0) * i / (n - 1);
			return {
				label: label(t),
				x: x(t)
			};
		});
		return {
			grouping: week ? "week" : "day",
			points,
			line,
			band,
			yTicks,
			xTicks,
			maxCount,
			barW,
			avgY: avg == null ? null : y(avg),
			dots: sales.map((s) => ({
				x: x(s.at),
				y: y(s.price),
				out: s.price > hi || s.price < lo
			}))
		};
	}
	var root$35 = from_html(`<div class="pc-grid"><span> </span></div>`);
	var root_1$35 = from_svg(`<path fill="var(--accent)" fill-opacity="0.12"></path>`);
	var root_2$29 = from_html(`<span></span>`);
	var root_3$24 = from_html(`<div class="pc-avg"><span>marché</span></div>`);
	var root_4$23 = from_html(`<button></button>`);
	var root_5$23 = from_html(`<div><b><span class="auc-coin"></span> <small>tendance</small></b> <span> </span> <span> </span></div>`);
	var root_6$22 = from_html(`<div class="pc-vol" aria-hidden="true"></div>`);
	var root_7$20 = from_html(`<span> </span>`);
	var root_8$19 = from_html(`<div><div class="pc-plot"><!> <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><!><path fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"></path></svg> <!> <!> <!> <!></div> <!> <div class="pc-x"></div></div>`);
	function PriceChart($$anchor, $$props) {
		push($$props, true);
		let avg = prop($$props, "avg", 3, null), full = prop($$props, "full", 3, false), picked = prop($$props, "picked", 3, null), onpick = prop($$props, "onpick", 3, null);
		const dshort = (t) => new Date(t).toLocaleDateString("fr", {
			day: "numeric",
			month: "short"
		});
		const chart = user_derived(() => priceChart($$props.series, {
			avg: avg(),
			label: dshort
		}));
		let hover = state(null);
		const pt = user_derived(() => get(hover) != null ? get(chart)?.points[get(hover)] : null);
		const per = user_derived(() => get(chart)?.grouping === "week" ? "semaine du" : "");
		const daySales = (p) => p.count > 1 ? `${p.count} ventes, de ${nf(p.min)} à ${nf(p.max)}` : `1 vente à ${nf(p.min)}`;
		var fragment = comment();
		var node = first_child(fragment);
		var consequent_5 = ($$anchor) => {
			var div = root_8$19();
			let classes;
			var div_1 = child(div);
			var node_1 = child(div_1);
			each(node_1, 17, () => get(chart).yTicks, (t) => t.value, ($$anchor, t) => {
				var div_2 = root$35();
				let styles;
				var text = only_child(child(div_2), true);
				reset(div_2);
				template_effect(($0) => {
					styles = set_style(div_2, "", styles, { top: `${get(t).y ?? ""}%` });
					set_text(text, $0);
				}, [() => nf(get(t).value)]);
				append($$anchor, div_2);
			});
			var svg = sibling(node_1, 2);
			var node_2 = child(svg);
			var consequent = ($$anchor) => {
				var path = root_1$35();
				template_effect(() => set_attribute(path, "d", get(chart).band));
				append($$anchor, path);
			};
			if_block(node_2, ($$render) => {
				if (get(chart).band) $$render(consequent);
			});
			var path_1 = sibling(node_2);
			reset(svg);
			var node_3 = sibling(svg, 2);
			var consequent_1 = ($$anchor) => {
				var fragment_1 = comment();
				each(first_child(fragment_1), 17, () => get(chart).dots, index, ($$anchor, d) => {
					var span_1 = root_2$29();
					let classes_1;
					let styles_1;
					template_effect(() => {
						classes_1 = set_class(span_1, 1, "pc-dot", null, classes_1, { out: get(d).out });
						styles_1 = set_style(span_1, "", styles_1, {
							left: `${get(d).x ?? ""}%`,
							top: `${get(d).y ?? ""}%`
						});
					});
					append($$anchor, span_1);
				});
				append($$anchor, fragment_1);
			};
			if_block(node_3, ($$render) => {
				if (full()) $$render(consequent_1);
			});
			var node_5 = sibling(node_3, 2);
			var consequent_2 = ($$anchor) => {
				var div_3 = root_3$24();
				let styles_2;
				template_effect(() => styles_2 = set_style(div_3, "", styles_2, { top: `${get(chart).avgY ?? ""}%` }));
				append($$anchor, div_3);
			};
			if_block(node_5, ($$render) => {
				if (get(chart).avgY != null) $$render(consequent_2);
			});
			var node_6 = sibling(node_5, 2);
			each(node_6, 19, () => get(chart).points, (p) => p.at, ($$anchor, p, i) => {
				var button = root_4$23();
				let classes_2;
				let styles_3;
				template_effect(($0, $1, $2) => {
					classes_2 = set_class(button, 1, "pc-slice", null, classes_2, {
						on: get(hover) === get(i) || picked() === get(p).key,
						pickable: !!onpick(),
						dense: full() || get(chart).points.length > 24
					});
					set_attribute(button, "aria-pressed", onpick() ? picked() === get(p).key : void 0);
					set_attribute(button, "aria-label", `${get(per) ?? ""} ${$0 ?? ""} : tendance ${$1 ?? ""} points ; ${$2 ?? ""}`);
					styles_3 = set_style(button, "", styles_3, {
						left: `${get(p).x0 ?? ""}%`,
						width: `${get(p).x1 - get(p).x0}%`,
						"--x": `${get(p).x1 > get(p).x0 ? (get(p).x - get(p).x0) / (get(p).x1 - get(p).x0) * 100 : 50}%`,
						"--y": `${get(p).y ?? ""}%`
					});
				}, [
					() => dshort(get(p).at),
					() => nf(get(p).trend),
					() => daySales(get(p))
				]);
				delegated("click", button, () => onpick()?.(picked() === get(p).key ? null : {
					key: get(p).key,
					at: get(p).at,
					week: get(chart).grouping === "week",
					count: get(p).count
				}));
				event("pointerenter", button, () => set(hover, get(i), true));
				event("pointerleave", button, () => get(hover) === get(i) && set(hover, null));
				event("focus", button, () => set(hover, get(i), true));
				event("blur", button, () => set(hover, null));
				append($$anchor, button);
			});
			var node_7 = sibling(node_6, 2);
			var consequent_3 = ($$anchor) => {
				var div_4 = root_5$23();
				let classes_3;
				let styles_4;
				var b = child(div_4);
				var text_1 = sibling(child(b), 1, true);
				next();
				reset(b);
				var span_2 = sibling(b, 2);
				var text_2 = only_child(span_2);
				var text_3 = only_child(sibling(span_2, 2), true);
				reset(div_4);
				template_effect(($0, $1, $2) => {
					classes_3 = set_class(div_4, 1, "pc-tip", null, classes_3, {
						flip: get(pt).x > 70,
						flop: get(pt).x < 30
					});
					styles_4 = set_style(div_4, "", styles_4, {
						left: `${get(pt).x ?? ""}%`,
						top: `${get(pt).y ?? ""}%`
					});
					set_text(text_1, $0);
					set_text(text_2, `${get(per) ?? ""} ${$1 ?? ""}`);
					set_text(text_3, $2);
				}, [
					() => nf(get(pt).trend),
					() => dshort(get(pt).at),
					() => daySales(get(pt))
				]);
				append($$anchor, div_4);
			};
			if_block(node_7, ($$render) => {
				if (get(pt)) $$render(consequent_3);
			});
			reset(div_1);
			var node_8 = sibling(div_1, 2);
			var consequent_4 = ($$anchor) => {
				var div_5 = root_6$22();
				each(div_5, 23, () => get(chart).points, (p) => p.at, ($$anchor, p, i) => {
					var span_4 = root_2$29();
					let classes_4;
					let styles_5;
					template_effect(() => {
						classes_4 = set_class(span_4, 1, "", null, classes_4, { on: get(hover) === get(i) || picked() === get(p).key });
						styles_5 = set_style(span_4, "", styles_5, {
							left: `${get(p).x ?? ""}%`,
							height: `${get(p).count / get(chart).maxCount * 100}%`,
							width: `${get(chart).barW ?? ""}%`
						});
					});
					append($$anchor, span_4);
				});
				reset(div_5);
				append($$anchor, div_5);
			};
			if_block(node_8, ($$render) => {
				if (full()) $$render(consequent_4);
			});
			var div_6 = sibling(node_8, 2);
			each(div_6, 21, () => get(chart).xTicks, index, ($$anchor, t) => {
				var span_5 = root_7$20();
				let styles_6;
				var text_4 = only_child(span_5, true);
				template_effect(() => {
					styles_6 = set_style(span_5, "", styles_6, { left: `${get(t).x ?? ""}%` });
					set_text(text_4, get(t).label);
				});
				append($$anchor, span_5);
			});
			reset(div_6);
			reset(div);
			template_effect(() => {
				classes = set_class(div, 1, "pc", null, classes, { full: full() });
				set_attribute(path_1, "d", get(chart).line);
			});
			append($$anchor, div);
		};
		if_block(node, ($$render) => {
			if (get(chart)) $$render(consequent_5);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate(["click"]);
	var root_1$34 = from_html(`<button role="radio"> </button>`);
	var root_2$28 = from_html(`<div class="pill-picks ma-periods" role="radiogroup" aria-label="Période"></div>`);
	var root_3$23 = from_html(`<div class="ma-fig"><span class="mk-h"> </span><b> </b></div>`);
	var root_4$22 = from_html(`<span><i class="lg-avg"></i> </span>`);
	var root_5$22 = from_html(`<span><i class="lg-out"></i> </span>`);
	var root_6$21 = from_html(`<button class="ma-day" aria-label="Revenir à toutes les ventes de la période"> <!></button>`);
	var root_7$19 = from_html(`<span class="ma-hint">un jour du graphique les filtre</span>`);
	var root_8$18 = from_html(`<li><span class="ma-when"> </span> <span> </span> <b><span class="auc-coin"></span> </b></li>`);
	var root_9$17 = from_html(`<p class="ma-note">Les 200 dernières ventes : tout ce que le jeu renvoie.</p>`);
	var root_10$15 = from_html(`<section class="ma" role="dialog" aria-modal="true" aria-labelledby="wm-ma-title" tabindex="-1"><header class="tp-head ma-head"><button class="iconbtn ma-back" aria-label="Retour à la carte"><!></button> <div class="tp-title"><h2 id="wm-ma-title">Analyse du marché</h2> <span class="tp-sub"><span class="nowrap"> </span><span class="ma-rar"> </span></span></div></header> <div class="ma-body"><!> <div class="ma-figs"></div> <div class="ma-main"><section class="ma-chart"><!> <p class="ma-legend"><span><i class="lg-line"></i>tendance</span> <span><i class="lg-band"></i>la moitié des prix autour</span> <span><i class="lg-dot"></i>une vente</span> <!> <!></p></section> <section class="ma-sales" aria-label="Ventes"><div class="ma-sales-head"><h3 class="mk-h">Ventes <span> </span></h3> <!></div> <div class="ma-sort" role="radiogroup" aria-label="Trier les ventes"></div> <ol class="ma-list"></ol> <!></section></div> <section class="ma-live"><!></section></div></section>`);
	function MarketAnalysis($$anchor, $$props) {
		push($$props, true);
		const all = user_derived(() => $$props.rm.series);
		const periods = user_derived(() => PERIODS.map(([id, label, days]) => ({
			id,
			label,
			days,
			n: inPeriod(get(all), days, $$props.now).length
		})).filter((p, i, list) => p.days == null || p.n > 1 && p.n < get(all).length && p.n !== list[i - 1]?.n));
		let period = state("all");
		const days = user_derived(() => get(periods).find((p) => p.id === get(period))?.days ?? null);
		const series = user_derived(() => inPeriod(get(all), get(days), $$props.now));
		const st = user_derived(() => saleStats(get(series)));
		const outside = user_derived(() => priceChart(get(series), { avg: $$props.rm.avg })?.dots.filter((d) => d.out).length ?? 0);
		const SORTS = [
			["recent", "Récentes"],
			["high", "Plus chères"],
			["low", "Moins chères"]
		];
		let sort = state("recent");
		let day = state(null);
		user_effect(() => {
			get(period);
			set(day, null);
		});
		const listed = user_derived(() => get(day) ? get(series).filter((s) => groupStart(s.at, get(day).week) === get(day).key) : get(series));
		const rows = user_derived(() => [...get(listed)].sort(get(sort) === "high" ? (a, b) => b.price - a.price : get(sort) === "low" ? (a, b) => a.price - b.price : (a, b) => b.at - a.at));
		const dday = (g) => (g.week ? "semaine du " : "") + new Date(g.key).toLocaleDateString("fr", {
			day: "numeric",
			month: "short"
		});
		const vsMedian = (p) => get(st).median ? Math.round((p - get(st).median) / get(st).median * 100) : null;
		const dtime = (t) => new Date(t).toLocaleString("fr", {
			day: "numeric",
			month: "short",
			hour: "2-digit",
			minute: "2-digit"
		});
		let root = state(void 0);
		user_effect(() => {
			get(root)?.focus();
		});
		const FIGURES = user_derived(() => [
			["Ventes", nf(get(st).count)],
			["Dernière", nf(get(st).last)],
			["Médiane", nf(get(st).median)],
			["Moyenne", nf(get(st).avg)],
			["Min", nf(get(st).min)],
			["Max", nf(get(st).max)]
		]);
		var section = root_10$15();
		var header = child(section);
		var button = child(header);
		Icon(child(button), {
			name: "prev",
			width: 2
		});
		reset(button);
		var div = sibling(button, 2);
		var span = sibling(child(div), 2);
		var span_1 = child(span);
		var text = only_child(span_1, true);
		var span_2 = sibling(span_1);
		var text_1 = only_child(span_2, true);
		reset(span);
		reset(div);
		reset(header);
		var div_1 = sibling(header, 2);
		var node_1 = child(div_1);
		var consequent = ($$anchor) => {
			var div_2 = root_2$28();
			each(div_2, 21, () => get(periods), (p) => p.id, ($$anchor, p) => {
				var button_1 = root_1$34();
				let classes;
				var text_2 = only_child(button_1, true);
				template_effect(() => {
					set_attribute(button_1, "aria-checked", get(period) === get(p).id);
					classes = set_class(button_1, 1, "", null, classes, { on: get(period) === get(p).id });
					set_text(text_2, get(p).label);
				});
				delegated("click", button_1, () => set(period, get(p).id, true));
				append($$anchor, button_1);
			});
			reset(div_2);
			append($$anchor, div_2);
		};
		if_block(node_1, ($$render) => {
			if (get(periods).length > 1) $$render(consequent);
		});
		var div_3 = sibling(node_1, 2);
		each(div_3, 21, () => get(FIGURES), ([label, value]) => label, ($$anchor, $$item) => {
			var $$array = user_derived(() => to_array(get($$item), 2));
			let label = () => get($$array)[0];
			let value = () => get($$array)[1];
			var div_4 = root_3$23();
			var span_3 = child(div_4);
			var text_3 = only_child(span_3, true);
			var text_4 = only_child(sibling(span_3), true);
			reset(div_4);
			template_effect(() => {
				set_text(text_3, label());
				set_text(text_4, value());
			});
			append($$anchor, div_4);
		});
		reset(div_3);
		var div_5 = sibling(div_3, 2);
		var section_1 = child(div_5);
		var node_2 = child(section_1);
		{
			let $0 = user_derived(() => get(day)?.key ?? null);
			PriceChart(node_2, {
				get series() {
					return get(series);
				},
				get avg() {
					return $$props.rm.avg;
				},
				full: true,
				get picked() {
					return get($0);
				},
				onpick: (g) => set(day, g, true)
			});
		}
		var p_1 = sibling(node_2, 2);
		var node_3 = sibling(child(p_1), 6);
		var consequent_1 = ($$anchor) => {
			var span_4 = root_4$22();
			var text_5 = sibling(child(span_4));
			reset(span_4);
			template_effect(($0) => set_text(text_5, `prix du marché ${$0 ?? ""}`), [() => nf($$props.rm.avg)]);
			append($$anchor, span_4);
		};
		if_block(node_3, ($$render) => {
			if ($$props.rm.avg != null) $$render(consequent_1);
		});
		var node_4 = sibling(node_3, 2);
		var consequent_2 = ($$anchor) => {
			var span_5 = root_5$22();
			var text_6 = sibling(child(span_5));
			reset(span_5);
			template_effect(() => set_text(text_6, `hors échelle (${get(outside) ?? ""})`));
			append($$anchor, span_5);
		};
		if_block(node_4, ($$render) => {
			if (get(outside)) $$render(consequent_2);
		});
		reset(p_1);
		reset(section_1);
		var section_2 = sibling(section_1, 2);
		var div_6 = child(section_2);
		var h3 = child(div_6);
		var text_7 = only_child(sibling(child(h3)), true);
		reset(h3);
		var node_5 = sibling(h3, 2);
		var consequent_3 = ($$anchor) => {
			var button_2 = root_6$21();
			var text_8 = child(button_2, true);
			Icon(sibling(text_8), {
				name: "close",
				width: 2
			});
			reset(button_2);
			template_effect(($0) => set_text(text_8, $0), [() => dday(get(day))]);
			delegated("click", button_2, () => set(day, null));
			append($$anchor, button_2);
		};
		var alternate = ($$anchor) => {
			append($$anchor, root_7$19());
		};
		if_block(node_5, ($$render) => {
			if (get(day)) $$render(consequent_3);
			else $$render(alternate, -1);
		});
		reset(div_6);
		var div_7 = sibling(div_6, 2);
		each(div_7, 21, () => SORTS, ([id, label]) => id, ($$anchor, $$item) => {
			var $$array_1 = user_derived(() => to_array(get($$item), 2));
			let id = () => get($$array_1)[0];
			let label = () => get($$array_1)[1];
			var button_3 = root_1$34();
			let classes_1;
			var text_9 = only_child(button_3, true);
			template_effect(() => {
				set_attribute(button_3, "aria-checked", get(sort) === id());
				classes_1 = set_class(button_3, 1, "", null, classes_1, { on: get(sort) === id() });
				set_text(text_9, label());
			});
			delegated("click", button_3, () => set(sort, id(), true));
			append($$anchor, button_3);
		});
		reset(div_7);
		var ol = sibling(div_7, 2);
		each(ol, 21, () => get(rows), (s) => s.id ?? s.at, ($$anchor, s) => {
			const g = user_derived(() => vsMedian(get(s).price));
			var li = root_8$18();
			var span_8 = child(li);
			var text_10 = only_child(span_8, true);
			var span_9 = sibling(span_8, 2);
			let classes_2;
			var text_11 = only_child(span_9, true);
			var b_2 = sibling(span_9, 2);
			var text_12 = sibling(child(b_2), 1, true);
			reset(b_2);
			reset(li);
			template_effect(($0, $1) => {
				set_text(text_10, $0);
				classes_2 = set_class(span_9, 1, "ma-gap", null, classes_2, {
					up: get(g) > 0,
					down: get(g) < 0
				});
				set_text(text_11, get(g) == null || get(g) === 0 ? "" : `${get(g) > 0 ? "+" : ""}${get(g)} %`);
				set_text(text_12, $1);
			}, [() => dtime(get(s).at), () => nf(get(s).price)]);
			append($$anchor, li);
		});
		reset(ol);
		var node_7 = sibling(ol, 2);
		var consequent_4 = ($$anchor) => {
			append($$anchor, root_9$17());
		};
		if_block(node_7, ($$render) => {
			if (get(all).length >= 200 && !get(day)) $$render(consequent_4);
		});
		reset(section_2);
		reset(div_5);
		var section_3 = sibling(div_5, 2);
		ListingCompare(child(section_3), {
			get listings() {
				return $$props.listings;
			},
			get soldAvg() {
				return $$props.rm.avg;
			},
			get now() {
				return $$props.now;
			},
			get onpick() {
				return $$props.onpick;
			}
		});
		reset(section_3);
		reset(div_1);
		reset(section);
		bind_this(section, ($$value) => set(root, $$value), () => get(root));
		template_effect(($0) => {
			set_text(text, $$props.card.title);
			set_attribute(span_2, "data-r", $$props.card.rarity);
			set_text(text_1, RNAME[$$props.card.rarity] || $$props.card.rarity);
			set_text(text_7, $0);
		}, [() => nf(get(listed).length)]);
		delegated("click", button, function(...$$args) {
			$$props.onclose?.apply(this, $$args);
		});
		append($$anchor, section);
		pop();
	}
	delegate(["click"]);
	var COLORS = [
		"#ef4444",
		"#f97316",
		"#eab308",
		"#22c55e",
		"#14b8a6",
		"#3b82f6",
		"#8b5cf6",
		"#ec4899"
	];
	var Tags = class {
		#list = state(null);
		get list() {
			return get(this.#list);
		}
		set list(value) {
			set(this.#list, value);
		}
		#loading = null;
		load() {
			this.#loading ??= data.myTags().then((l) => this.list = l, () => {
				this.#loading = null;
				this.list ??= [];
			});
			return this.#loading;
		}
		async named(name) {
			const clean = name.trim().slice(0, 48);
			const have = (this.list ?? []).find((t) => t.name.toLocaleLowerCase("fr") === clean.toLocaleLowerCase("fr"));
			if (have) return have;
			const tag = await data.createTag(clean, COLORS[Math.floor(Math.random() * COLORS.length)]);
			if (tag && !(this.list ?? []).some((t) => t.id === tag.id)) this.list = [...this.list ?? [], tag].sort((a, b) => a.name.localeCompare(b.name, "fr"));
			return tag;
		}
	};
	var tags = new Tags();
	var root$34 = from_html(`<button><!></button>`);
	var root_1$33 = from_html(`<div class="modal-cat"> </div>`);
	var root_2$27 = from_html(`<p class="modal-sum muted">Chargement du résumé...</p>`);
	var root_3$22 = from_html(`<p class="modal-sum"> </p>`);
	var root_4$21 = from_html(`<div class="fact"><div class="fk">Valeur estimée</div><div class="fv val"> </div></div>`);
	var root_5$21 = from_html(`<div class="fact"><div class="fk">Exemplaires</div><div class="fv"> <!></div></div>`);
	var root_6$20 = from_html(`<div class="fact"><div class="fk" title="Vues de l'article Wikipédia sur 30 jours">Vues (30 j)</div><div class="fv"> </div></div>`);
	var root_7$18 = from_html(`<div class="fact"><div class="fk">Attaque</div><div class="fv atk"> </div></div> <div class="fact"><div class="fk">Défense</div><div class="fv def"> </div></div>`, 1);
	var root_8$17 = from_html(`<div class="modal-obtained"> </div>`);
	var root_9$16 = from_html(`<span class="tag-chip"> <button><!></button></span>`);
	var root_10$14 = from_html(`<option></option>`);
	var root_11$14 = from_html(`<div class="modal-tags"><span class="mk-h">Étiquettes</span> <div class="tag-row"><!> <form class="tag-add"><input list="wm-tag-names" maxlength="48" aria-label="Ajouter une étiquette"/> <datalist id="wm-tag-names"></datalist></form></div></div>`);
	var root_12$14 = from_html(`<a class="modal-wiki" target="_blank" rel="noopener noreferrer">Voir l'article Wikipédia</a>`);
	var root_13$14 = from_html(`<div class="confirm"><div class="confirm-text">Défausser cette carte contre <b>1 point</b> ?</div> <div class="af-actions"><button class="btn">Annuler</button> <button class="btn danger">Défausser</button></div></div>`);
	var root_14$12 = from_html(`<button type="button" class="sell2-suggest"> </button>`);
	var root_15$12 = from_html(`<button type="button"> </button>`);
	var root_16$12 = from_html(`<div class="sell2"><div class="sell2-head">Mettre en vente</div> <div class="sell2-block"><div class="sell2-lab"><span>Prix de départ</span> <!></div> <div class="af-input-row"><input class="af-input" type="number" min="1" step="1" inputmode="numeric" placeholder="0"/> <span class="af-unit">pts</span></div></div> <div class="sell2-block"><div class="sell2-lab"><span>Durée de l'enchère</span></div> <div class="sell2-durs"></div></div> <div class="af-actions"><button class="btn">Annuler</button> <button class="btn primary"> </button></div></div>`);
	var root_17$12 = from_html(`<div class="actions"><button class="btn primary">Mettre en vente</button> <button class="btn danger">Défausser, +1 pt</button></div>`);
	var root_18$11 = from_html(`<div role="tabpanel" class="modal-panel"><!> <div class="facts"><!> <!> <!> <!></div> <!> <!> <!> <!> <div class="modal-credit">Texte de l'article sous licence CC BY-SA 4.0</div></div>`);
	var root_19$9 = from_html(`<p class="modal-sum muted">Analyse du marché...</p>`);
	var root_20$8 = from_html(`<div class="modal-sum muted">Marché indisponible pour le moment. <button class="link-btn">Réessayer</button></div>`);
	var root_21$8 = from_html(`<div class="mk-kpi"><span class="mk-h">Dernière vente</span> <b> </b> <small> </small></div>`);
	var root_22$6 = from_html(`<button><span class="mk-h">En vente dès</span> <b> </b> <small> <!></small></button>`);
	var root_23$4 = from_html(`<div class="mk-sell"><span>Pour vendre vite : <b> </b> </span> <button class="btn primary">Mettre en vente</button></div>`);
	var root_24$4 = from_html(`<section class="mk-price"><div class="mk-price-head"><h3 class="mk-h">Évolution des prix</h3> <button class="link-btn">Analyse complète<!></button></div> <!></section>`);
	var root_25$4 = from_html(`<div class="mk-kpis"><div class="mk-kpi"><span class="mk-h">Prix du marché</span> <b class="gold"> </b> <small> </small></div> <!> <!></div> <!> <!>`, 1);
	var root_26$4 = from_html(`<p class="modal-sum muted">Aucune vente de cette carte pour le moment.</p>`);
	var root_27$4 = from_html(`<button class="mk-all"><span>Toutes les ventes <b> </b></span><span class="mk-all-go">Analyse complète<!></span></button>`);
	var root_28$3 = from_html(`<div role="tabpanel" class="modal-panel"><!> <!> <!></div>`);
	var root_29$3 = from_html(`<div> </div>`);
	var root_30$2 = from_html(`<div class="modal-backdrop" role="presentation"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="wm-modal-title" tabindex="-1"><button class="modal-close" aria-label="Fermer"><!></button> <div class="modal-card"><!> <!></div> <div class="modal-info"><span class="modal-rar"> </span> <h2 class="modal-name" id="wm-modal-title"> </h2> <!> <div class="modal-tabs" role="tablist" aria-label="Détails de la carte"><button role="tab">Détails</button> <button role="tab">Marché</button></div> <!> <!></div></div></div> <!>`, 1);
	function CardModal($$anchor, $$props) {
		push($$props, true);
		let readonly = prop($$props, "readonly", 3, false);
		const c = user_derived(() => $$props.item.card);
		let tab = state("details");
		let summary = user_derived(() => get(c).summary || "");
		let sumState = user_derived(() => get(c).summary ? "done" : "loading");
		let market = state(null);
		let marketState = state("idle");
		let marketRetried = false;
		let mval = state(null);
		let confirmDiscard = state(false);
		let sellOpen = state(false);
		let busy = state(false);
		let done = state(false);
		const owned = user_derived(() => !readonly() && !!$$props.item.id);
		let starred = state(!!$$props.item.starred);
		let cardTags = state($$props.item.tags ?? []);
		let tagText = state("");
		const changedRow = () => $$props.onchange?.({
			...$$props.item,
			starred: get(starred),
			tags: get(cardTags)
		});
		user_effect(() => {
			if (get(owned)) tags.load();
		});
		async function toggleStar() {
			const was = get(starred);
			set(starred, !was);
			try {
				await data.setStarred($$props.item.id, get(starred));
				changedRow();
			} catch (e) {
				set(starred, was, true);
				set(msgOk, false);
				set(msg, e.message, true);
			}
		}
		async function addTag() {
			const name = get(tagText).trim();
			if (!name || get(busy)) return;
			set(busy, true);
			try {
				const tag = await tags.named(name);
				if (!get(cardTags).some((t) => t.id === tag.id)) {
					await data.tagCard($$props.item.id, tag.id);
					set(cardTags, [...get(cardTags), tag]);
					changedRow();
				}
				set(tagText, "");
			} catch (e) {
				set(msgOk, false);
				set(msg, e.message, true);
			}
			set(busy, false);
		}
		async function removeTag(tag) {
			const was = get(cardTags);
			set(cardTags, get(cardTags).filter((t) => t.id !== tag.id));
			try {
				await data.untagCard($$props.item.id, tag.id);
				changedRow();
			} catch (e) {
				set(cardTags, was);
				set(msgOk, false);
				set(msg, e.message, true);
			}
		}
		let msg = state("");
		let msgOk = state(false);
		let modalEl;
		user_effect(() => {
			if (get(c).summary) return;
			const ctl = new AbortController();
			fetch("https://fr.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(get(c).title), { signal: ctl.signal }).then((r) => r.ok ? r.json() : {}).then((d) => {
				set(summary, d.extract || "");
				set(sumState, get(summary) ? "done" : "none");
			}, () => {
				if (!ctl.signal.aborted) set(sumState, "none");
			});
			return () => ctl.abort();
		});
		user_effect(() => {
			let live = true;
			marketValueFor(get(c)).then((v) => live && set(mval, v, true));
			return () => live = false;
		});
		user_effect(() => {
			if (get(marketState) !== "idle") return;
			set(marketState, "loading");
			data.marketStats(get(c)).then((m) => {
				set(market, m, true);
				set(marketState, "done");
			}, () => {
				if (marketRetried) return set(marketState, "error");
				marketRetried = true;
				setTimeout(() => set(marketState, "idle"), 3e3);
			});
			data.sameCard(get(c)).then((l) => set(listings, l, true), () => set(listings, [], true));
		});
		let listings = state(null);
		let now = state(proxy(Date.now()));
		user_effect(() => {
			if (get(tab) !== "market") return;
			const t = setInterval(() => set(now, Date.now(), true), 3e4);
			return () => clearInterval(t);
		});
		function openListing(r) {
			history.pushState({}, "", `/marketplace/${r.id}`);
			$$props.onclose?.();
		}
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
			if (!get(price) && get(value) != null) set(price, String(get(value)), true);
		}
		async function act(kind, action, okMsg) {
			if (get(busy)) return;
			set(busy, true);
			set(msg, "");
			try {
				await action();
				$$props.onaction?.(kind);
				set(done, true);
				set(msgOk, true);
				set(msg, okMsg, true);
			} catch (e) {
				set(msgOk, false);
				if (e.status === 404) {
					$$props.onaction?.(kind);
					set(done, true);
					set(msg, "Cette carte n'est déjà plus dans votre collection.");
				} else {
					set(msg, e.message, true);
					if (e.uncertain) $$props.onaction?.("unsure");
				}
			}
			set(busy, false);
		}
		const sell = () => act("sell", () => sounded(() => data.createAuction($$props.item, {
			price: Math.round(Number(get(price))),
			durationHours: get(durationH)
		})), "Carte mise en vente.");
		const discard = () => act("discard", () => data.discard($$props.item.id), "Carte défaussée. +1 point.");
		function onKey(e) {
			if (e.key === "Escape") return get(analysis) ? set(analysis, false) : $$props.onclose?.();
			if (get(analysis)) return;
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
		const rm = user_derived(() => rarityMarket(get(market), get(c).rarity));
		const value = user_derived(() => get(market) ? get(rm).avg : get(mval));
		const deal = user_derived(() => get(listings) ? compareListings(get(listings), get(now)).rows.find((r) => r.cheapest && !r.is_shiny) ?? null : null);
		const v = user_derived(() => marketVerdict(get(rm), get(deal)?.price ?? null));
		const gap = (p) => p == null ? "" : p === 0 ? "au prix du marché" : p < 0 ? `${-p} % sous le marché` : `${p} % au-dessus`;
		function sellNow() {
			set(tab, "details");
			set(price, String(get(v).sellAt), true);
			openSell();
		}
		let analysis = state(false);
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
		var fragment = root_30$2();
		event("keydown", $window, onKey);
		var div = first_child(fragment);
		var div_1 = child(div);
		var button = child(div_1);
		Icon(child(button), {
			name: "close",
			width: 2,
			class: "x-ico"
		});
		reset(button);
		var div_2 = sibling(button, 2);
		var node_1 = child(div_2);
		{
			let $0 = user_derived(() => get(owned) ? false : $$props.item.starred);
			Card(node_1, {
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
					return get($0);
				}
			});
		}
		var node_2 = sibling(node_1, 2);
		var consequent = ($$anchor) => {
			var button_1 = root$34();
			let classes;
			Icon(child(button_1), {
				name: "star",
				get filled() {
					return get(starred);
				},
				width: 1.8
			});
			reset(button_1);
			template_effect(() => {
				classes = set_class(button_1, 1, "modal-star", null, classes, { on: get(starred) });
				set_attribute(button_1, "aria-pressed", get(starred));
				set_attribute(button_1, "aria-label", get(starred) ? "Retirer des favoris" : "Ajouter aux favoris");
				set_attribute(button_1, "title", get(starred) ? "Retirer des favoris" : "Ajouter aux favoris");
			});
			delegated("click", button_1, toggleStar);
			append($$anchor, button_1);
		};
		if_block(node_2, ($$render) => {
			if (get(owned)) $$render(consequent);
		});
		reset(div_2);
		var div_3 = sibling(div_2, 2);
		var span = child(div_3);
		var text$6 = only_child(span, true);
		var h2 = sibling(span, 2);
		var text_1 = only_child(h2, true);
		var node_4 = sibling(h2, 2);
		var consequent_1 = ($$anchor) => {
			var div_4 = root_1$33();
			var text_2 = only_child(div_4, true);
			template_effect(() => set_text(text_2, get(c).category));
			append($$anchor, div_4);
		};
		if_block(node_4, ($$render) => {
			if (get(c).category) $$render(consequent_1);
		});
		var div_5 = sibling(node_4, 2);
		var button_2 = child(div_5);
		let classes_1;
		var button_3 = sibling(button_2, 2);
		let classes_2;
		reset(div_5);
		var node_5 = sibling(div_5, 2);
		var consequent_16 = ($$anchor) => {
			var div_6 = root_18$11();
			var node_6 = child(div_6);
			var consequent_2 = ($$anchor) => {
				append($$anchor, root_2$27());
			};
			var consequent_3 = ($$anchor) => {
				var p_2 = root_3$22();
				var text_3 = only_child(p_2, true);
				template_effect(() => set_text(text_3, get(summary)));
				append($$anchor, p_2);
			};
			if_block(node_6, ($$render) => {
				if (get(sumState) === "loading") $$render(consequent_2);
				else if (get(summary)) $$render(consequent_3, 1);
			});
			var div_7 = sibling(node_6, 2);
			var node_7 = child(div_7);
			var consequent_4 = ($$anchor) => {
				var div_8 = root_4$21();
				var text_4 = only_child(sibling(child(div_8)));
				reset(div_8);
				template_effect(($0) => set_text(text_4, `${$0 ?? ""} pts`), [() => nf(get(value))]);
				append($$anchor, div_8);
			};
			if_block(node_7, ($$render) => {
				if (get(value) != null) $$render(consequent_4);
			});
			var node_8 = sibling(node_7, 2);
			var consequent_6 = ($$anchor) => {
				var div_10 = root_5$21();
				var div_11 = sibling(child(div_10));
				var text_5 = child(div_11, true);
				var node_9 = sibling(text_5);
				var consequent_5 = ($$anchor) => {
					append($$anchor, text("· brillante"));
				};
				if_block(node_9, ($$render) => {
					if ($$props.item.is_shiny) $$render(consequent_5);
				});
				reset(div_11);
				reset(div_10);
				template_effect(() => set_text(text_5, $$props.item.count));
				append($$anchor, div_10);
			};
			if_block(node_8, ($$render) => {
				if (!readonly()) $$render(consequent_6);
			});
			var node_10 = sibling(node_8, 2);
			var consequent_7 = ($$anchor) => {
				var div_12 = root_6$20();
				var text_7 = only_child(sibling(child(div_12)), true);
				reset(div_12);
				template_effect(($0) => set_text(text_7, $0), [() => nf(get(c).pageviews)]);
				append($$anchor, div_12);
			};
			if_block(node_10, ($$render) => {
				if (get(c).pageviews != null) $$render(consequent_7);
			});
			var node_11 = sibling(node_10, 2);
			var consequent_8 = ($$anchor) => {
				var fragment_1 = root_7$18();
				var div_14 = first_child(fragment_1);
				var text_8 = only_child(sibling(child(div_14)), true);
				reset(div_14);
				var div_16 = sibling(div_14, 2);
				var text_9 = only_child(sibling(child(div_16)), true);
				reset(div_16);
				template_effect(($0, $1) => {
					set_text(text_8, $0);
					set_text(text_9, $1);
				}, [() => nf(get(c).atk), () => nf(get(c).def)]);
				append($$anchor, fragment_1);
			};
			if_block(node_11, ($$render) => {
				if (!settings.hideStats) $$render(consequent_8);
			});
			reset(div_7);
			var node_12 = sibling(div_7, 2);
			var consequent_9 = ($$anchor) => {
				var div_18 = root_8$17();
				var text_10 = only_child(div_18);
				template_effect(() => set_text(text_10, `Obtenue le ${get(obtained) ?? ""}`));
				append($$anchor, div_18);
			};
			if_block(node_12, ($$render) => {
				if (get(obtained)) $$render(consequent_9);
			});
			var node_13 = sibling(node_12, 2);
			var consequent_10 = ($$anchor) => {
				var div_19 = root_11$14();
				var div_20 = sibling(child(div_19), 2);
				var node_14 = child(div_20);
				each(node_14, 17, () => get(cardTags), (t) => t.id, ($$anchor, t) => {
					var span_1 = root_9$16();
					let styles;
					var text_11 = child(span_1, true);
					var button_4 = sibling(text_11);
					Icon(child(button_4), {
						name: "close",
						width: 2
					});
					reset(button_4);
					reset(span_1);
					template_effect(() => {
						styles = set_style(span_1, "", styles, { "--tc": get(t).color });
						set_text(text_11, get(t).name);
						set_attribute(button_4, "aria-label", `Retirer l'étiquette ${get(t).name ?? ""}`);
					});
					delegated("click", button_4, () => removeTag(get(t)));
					append($$anchor, span_1);
				});
				var form = sibling(node_14, 2);
				var input = child(form);
				remove_input_defaults(input);
				var datalist = sibling(input, 2);
				each(datalist, 21, () => (tags.list ?? []).filter((t) => !get(cardTags).some((x) => x.id === t.id)), (t) => t.id, ($$anchor, t) => {
					var option = root_10$14();
					var option_value = {};
					template_effect(() => {
						if (option_value !== (option_value = get(t).name)) option.value = (option.__value = option_value) ?? "";
					});
					append($$anchor, option);
				});
				reset(datalist);
				reset(form);
				reset(div_20);
				reset(div_19);
				template_effect(() => set_attribute(input, "placeholder", get(cardTags).length ? "Ajouter..." : "Ajouter une étiquette..."));
				event("submit", form, (e) => {
					e.preventDefault();
					addTag();
				});
				bind_value(input, () => get(tagText), ($$value) => set(tagText, $$value));
				append($$anchor, div_19);
			};
			if_block(node_13, ($$render) => {
				if (get(owned)) $$render(consequent_10);
			});
			var node_16 = sibling(node_13, 2);
			var consequent_11 = ($$anchor) => {
				var a = root_12$14();
				template_effect(() => set_attribute(a, "href", get(c).wikipedia_url));
				append($$anchor, a);
			};
			if_block(node_16, ($$render) => {
				if (get(c).wikipedia_url) $$render(consequent_11);
			});
			var node_17 = sibling(node_16, 2);
			var consequent_15 = ($$anchor) => {
				var fragment_2 = comment();
				var node_18 = first_child(fragment_2);
				var consequent_12 = ($$anchor) => {
					var div_21 = root_13$14();
					var div_22 = sibling(child(div_21), 2);
					var button_5 = child(div_22);
					var button_6 = sibling(button_5, 2);
					reset(div_22);
					reset(div_21);
					template_effect(() => {
						button_5.disabled = get(busy);
						button_6.disabled = get(busy);
					});
					delegated("click", button_5, () => set(confirmDiscard, false));
					delegated("click", button_6, discard);
					append($$anchor, div_21);
				};
				var consequent_14 = ($$anchor) => {
					var div_23 = root_16$12();
					var div_24 = sibling(child(div_23), 2);
					var div_25 = child(div_24);
					var node_19 = sibling(child(div_25), 2);
					var consequent_13 = ($$anchor) => {
						var button_7 = root_14$12();
						var text_12 = only_child(button_7);
						template_effect(($0) => set_text(text_12, `Estimé ${$0 ?? ""}`), [() => nf(get(value))]);
						delegated("click", button_7, () => set(price, String(get(value)), true));
						append($$anchor, button_7);
					};
					if_block(node_19, ($$render) => {
						if (get(value) != null) $$render(consequent_13);
					});
					reset(div_25);
					var div_26 = sibling(div_25, 2);
					var input_1 = child(div_26);
					remove_input_defaults(input_1);
					next(2);
					reset(div_26);
					reset(div_24);
					var div_27 = sibling(div_24, 2);
					var div_28 = sibling(child(div_27), 2);
					each(div_28, 21, () => DURATIONS, index, ($$anchor, h) => {
						var button_8 = root_15$12();
						let classes_3;
						var text_13 = only_child(button_8);
						template_effect(() => {
							classes_3 = set_class(button_8, 1, "sell2-dur", null, classes_3, { on: get(durationH) === get(h) });
							set_text(text_13, `${get(h) ?? ""} h`);
						});
						delegated("click", button_8, () => set(durationH, get(h), true));
						append($$anchor, button_8);
					});
					reset(div_28);
					reset(div_27);
					var div_29 = sibling(div_27, 2);
					var button_9 = child(div_29);
					var button_10 = sibling(button_9, 2);
					var text_14 = only_child(button_10, true);
					reset(div_29);
					reset(div_23);
					template_effect(($0) => {
						button_9.disabled = get(busy);
						button_10.disabled = $0;
						set_text(text_14, get(busy) ? "Mise en vente..." : "Mettre en vente");
					}, [() => get(busy) || !(Number(get(price)) >= 1)]);
					bind_value(input_1, () => get(price), ($$value) => set(price, $$value));
					delegated("click", button_9, () => set(sellOpen, false));
					delegated("click", button_10, sell);
					append($$anchor, div_23);
				};
				var alternate = ($$anchor) => {
					var div_30 = root_17$12();
					var button_11 = child(div_30);
					var button_12 = sibling(button_11, 2);
					reset(div_30);
					delegated("click", button_11, openSell);
					delegated("click", button_12, () => set(confirmDiscard, true));
					append($$anchor, div_30);
				};
				if_block(node_18, ($$render) => {
					if (get(confirmDiscard)) $$render(consequent_12);
					else if (get(sellOpen)) $$render(consequent_14, 1);
					else $$render(alternate, -1);
				});
				append($$anchor, fragment_2);
			};
			if_block(node_17, ($$render) => {
				if (!readonly() && !get(done)) $$render(consequent_15);
			});
			next(2);
			reset(div_6);
			append($$anchor, div_6);
		};
		var alternate_2 = ($$anchor) => {
			var div_31 = root_28$3();
			var node_20 = child(div_31);
			var consequent_17 = ($$anchor) => {
				append($$anchor, root_19$9());
			};
			var consequent_18 = ($$anchor) => {
				var div_32 = root_20$8();
				var button_13 = sibling(child(div_32));
				reset(div_32);
				delegated("click", button_13, () => set(marketState, "idle"));
				append($$anchor, div_32);
			};
			var consequent_24 = ($$anchor) => {
				var fragment_3 = comment();
				var node_21 = first_child(fragment_3);
				var consequent_23 = ($$anchor) => {
					var fragment_4 = root_25$4();
					var div_33 = first_child(fragment_4);
					var div_34 = child(div_33);
					var b = sibling(child(div_34), 2);
					var text_15 = only_child(b, true);
					var text_16 = only_child(sibling(b, 2), true);
					reset(div_34);
					var node_22 = sibling(div_34, 2);
					var consequent_19 = ($$anchor) => {
						var div_35 = root_21$8();
						var b_1 = sibling(child(div_35), 2);
						var text_17 = only_child(b_1, true);
						var small_1 = sibling(b_1, 2);
						let classes_4;
						var text_18 = only_child(small_1, true);
						reset(div_35);
						template_effect(($0, $1) => {
							set_text(text_17, $0);
							classes_4 = set_class(small_1, 1, "", null, classes_4, {
								up: get(v).lastPct > 0,
								down: get(v).lastPct < 0
							});
							set_text(text_18, $1);
						}, [() => nf(get(v).last), () => gap(get(v).lastPct)]);
						append($$anchor, div_35);
					};
					if_block(node_22, ($$render) => {
						if (get(v).last != null) $$render(consequent_19);
					});
					var node_23 = sibling(node_22, 2);
					var consequent_20 = ($$anchor) => {
						var button_14 = root_22$6();
						let classes_5;
						var b_2 = sibling(child(button_14), 2);
						var text_19 = only_child(b_2, true);
						var small_2 = sibling(b_2, 2);
						var text_20 = child(small_2, true);
						Icon(sibling(text_20), {
							name: "next",
							width: 2
						});
						reset(small_2);
						reset(button_14);
						template_effect(($0, $1, $2) => {
							classes_5 = set_class(button_14, 1, "mk-kpi buy", null, classes_5, { good: get(v).cheapestPct < 0 });
							set_attribute(button_14, "aria-label", `Voir la vente la moins chère, ${$0 ?? ""} WikiBidous`);
							set_text(text_19, $1);
							set_text(text_20, $2);
						}, [
							() => nf(get(deal).price),
							() => nf(get(deal).price),
							() => gap(get(v).cheapestPct)
						]);
						delegated("click", button_14, () => openListing(get(deal)));
						append($$anchor, button_14);
					};
					if_block(node_23, ($$render) => {
						if (get(deal)) $$render(consequent_20);
					});
					reset(div_33);
					var node_25 = sibling(div_33, 2);
					var consequent_21 = ($$anchor) => {
						var div_36 = root_23$4();
						var span_2 = child(div_36);
						var b_3 = sibling(child(span_2));
						var text_21 = only_child(b_3);
						var text_22 = sibling(b_3, 1, true);
						reset(span_2);
						var button_15 = sibling(span_2, 2);
						reset(div_36);
						template_effect(($0) => {
							set_text(text_21, `${$0 ?? ""} pts`);
							set_text(text_22, get(deal) ? ", juste sous l'offre la moins chère" : ", le prix du marché");
						}, [() => nf(get(v).sellAt)]);
						delegated("click", button_15, sellNow);
						append($$anchor, div_36);
					};
					if_block(node_25, ($$render) => {
						if (!readonly() && !get(done) && $$props.item.count && get(v).sellAt) $$render(consequent_21);
					});
					var node_26 = sibling(node_25, 2);
					var consequent_22 = ($$anchor) => {
						var section = root_24$4();
						var div_37 = child(section);
						var button_16 = sibling(child(div_37), 2);
						Icon(sibling(child(button_16)), {
							name: "next",
							width: 2
						});
						reset(button_16);
						reset(div_37);
						PriceChart(sibling(div_37, 2), {
							get series() {
								return get(rm).series;
							},
							get avg() {
								return get(rm).avg;
							}
						});
						reset(section);
						delegated("click", button_16, () => set(analysis, true));
						append($$anchor, section);
					};
					if_block(node_26, ($$render) => {
						if (get(rm).count > 1) $$render(consequent_22);
					});
					template_effect(($0, $1) => {
						set_text(text_15, $0);
						set_text(text_16, $1);
					}, [() => nf(get(rm).avg), () => get(rm).basis === "median" ? `médiane de ${get(rm).count} vente${get(rm).count > 1 ? "s" : ""}, de ${nf(get(rm).min)} à ${nf(get(rm).max)}` : "moyenne des ventes"]);
					append($$anchor, fragment_4);
				};
				var alternate_1 = ($$anchor) => {
					append($$anchor, root_26$4());
				};
				if_block(node_21, ($$render) => {
					if (get(rm).avg != null) $$render(consequent_23);
					else $$render(alternate_1, -1);
				});
				append($$anchor, fragment_3);
			};
			if_block(node_20, ($$render) => {
				if (get(marketState) === "loading") $$render(consequent_17);
				else if (get(marketState) === "error") $$render(consequent_18, 1);
				else if (get(market)) $$render(consequent_24, 2);
			});
			var node_29 = sibling(node_20, 2);
			var consequent_25 = ($$anchor) => {
				ListingCompare($$anchor, {
					get listings() {
						return get(listings);
					},
					get soldAvg() {
						return get(rm).avg;
					},
					get now() {
						return get(now);
					},
					onpick: openListing
				});
			};
			if_block(node_29, ($$render) => {
				if (get(marketState) !== "error") $$render(consequent_25);
			});
			var node_30 = sibling(node_29, 2);
			var consequent_26 = ($$anchor) => {
				var button_17 = root_27$4();
				var span_3 = child(button_17);
				var text_23 = only_child(sibling(child(span_3)), true);
				reset(span_3);
				var span_4 = sibling(span_3);
				Icon(sibling(child(span_4)), {
					name: "next",
					width: 2
				});
				reset(span_4);
				reset(button_17);
				template_effect(($0) => set_text(text_23, $0), [() => nf(get(rm).count)]);
				delegated("click", button_17, () => set(analysis, true));
				append($$anchor, button_17);
			};
			if_block(node_30, ($$render) => {
				if (get(market) && get(rm).count > 1) $$render(consequent_26);
			});
			reset(div_31);
			append($$anchor, div_31);
		};
		if_block(node_5, ($$render) => {
			if (get(tab) === "details") $$render(consequent_16);
			else $$render(alternate_2, -1);
		});
		var node_32 = sibling(node_5, 2);
		var consequent_27 = ($$anchor) => {
			var div_38 = root_29$3();
			let classes_6;
			var text_24 = only_child(div_38, true);
			template_effect(() => {
				classes_6 = set_class(div_38, 1, "modal-msg", null, classes_6, { ok: get(msgOk) });
				set_text(text_24, get(msg));
			});
			append($$anchor, div_38);
		};
		if_block(node_32, ($$render) => {
			if (get(msg)) $$render(consequent_27);
		});
		reset(div_3);
		reset(div_1);
		bind_this(div_1, ($$value) => modalEl = $$value, () => modalEl);
		action(div_1, ($$node) => anchorCentered?.($$node));
		reset(div);
		var node_33 = sibling(div, 2);
		var consequent_28 = ($$anchor) => {
			MarketAnalysis($$anchor, {
				get card() {
					return get(c);
				},
				get rm() {
					return get(rm);
				},
				get listings() {
					return get(listings);
				},
				get now() {
					return get(now);
				},
				onclose: () => set(analysis, false),
				onpick: openListing
			});
		};
		if_block(node_33, ($$render) => {
			if (get(analysis)) $$render(consequent_28);
		});
		template_effect(() => {
			set_attribute(span, "data-r", get(c).rarity);
			set_text(text$6, RNAME[get(c).rarity] || get(c).rarity);
			set_text(text_1, get(c).title);
			set_attribute(button_2, "aria-selected", get(tab) === "details");
			classes_1 = set_class(button_2, 1, "", null, classes_1, { on: get(tab) === "details" });
			set_attribute(button_3, "aria-selected", get(tab) === "market");
			classes_2 = set_class(button_3, 1, "", null, classes_2, { on: get(tab) === "market" });
		});
		delegated("click", div, (e) => e.target === e.currentTarget && $$props.onclose?.());
		delegated("click", button, () => $$props.onclose?.());
		delegated("click", button_2, () => set(tab, "details"));
		delegated("click", button_3, () => set(tab, "market"));
		append($$anchor, fragment);
		pop();
	}
	delegate(["click"]);
	var root$33 = from_html(`<div><div class="rg-aura"></div> <button class="card-btn"><!></button></div>`);
	var root_1$32 = from_html(`<div class="reveal reveal-all"><div class="reveal-all-head"><h2>Votre paquet</h2> <div class="sub"> </div></div> <div class="reveal-grid"></div> <button class="btn primary">Terminé</button></div>`);
	var root_2$26 = from_html(`<div class="stage-aura"></div> <div class="flip-in"><button class="card-btn"><!></button></div>`, 1);
	var root_3$21 = from_html(`<div class="reveal-rarity"> </div>`);
	var root_4$20 = from_html(`<span></span>`);
	var root_5$20 = from_html(`<div class="reveal"><div class="count">Carte <b> </b> </div> <div class="stage" role="group" aria-label="Carte, glissez ou utilisez les flèches" style="touch-action:pan-y"><!></div> <!> <div class="dots"></div> <div class="navrow"><button class="arrow" aria-label="Précédent"><!></button> <button class="btn primary"> </button> <button class="arrow" aria-label="Suivant"><!></button></div> <button class="reveal-skip">Tout révéler</button></div>`);
	var root_6$19 = from_html(`<!> <!>`, 1);
	function Reveal($$anchor, $$props) {
		push($$props, true);
		let copies = prop($$props, "copies", 3, null);
		let i = state(0);
		let showAll = state(false);
		let selected = state(null);
		let from = state(0);
		const step = user_derived(() => Math.round(Math.min(260, Math.max(130, 2200 / Math.max(1, $$props.cards.length - get(from))))));
		user_effect(() => {
			if (!get(showAll)) return reveal($$props.cards[get(i)].rarity);
			untrack(() => $$props.cards.slice(get(from)).forEach((c, k) => {
				const t = k * get(step) / 1e3;
				play("flip", t);
				chime(c.rarity, t + .1);
			}));
		});
		function revealAll() {
			set(from, get(i) + 1);
			set(showAll, true);
			document.scrollingElement?.scrollTo({ top: 0 });
		}
		let last = user_derived(() => get(i) === $$props.cards.length - 1);
		let newCount = user_derived(() => $$props.cards.filter((c) => c.is_new).length);
		let left = state(copies() ?? []);
		let gone = state(new Set());
		function openCard(c) {
			const copy = pickCopy(get(left), c);
			set(selected, copy ? {
				...copy,
				count: 1
			} : {
				id: null,
				card: c,
				count: 0,
				is_shiny: c.is_shiny,
				starred: false,
				obtained_at: null,
				tags: []
			}, true);
			if (copy || copies()) return;
			data.myCopy(c).then((found) => {
				if (found && !get(gone).has(found.id) && get(selected)?.card === c && !get(selected).id) set(selected, {
					...found,
					count: 1
				}, true);
			}, () => {});
		}
		function acted(kind) {
			if (kind === "unsure") return $$props.onaction?.(kind);
			const id = get(selected).id;
			set(gone, new Set([...get(gone), id]));
			set(left, get(left).filter((r) => r.id !== id));
			collectionRemove([id]);
			$$props.onaction?.(kind);
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
		var fragment = root_6$19();
		event("keydown", $window, onKey);
		var node = first_child(fragment);
		var consequent = ($$anchor) => {
			var div = root_1$32();
			var div_1 = child(div);
			var text = only_child(sibling(child(div_1), 2));
			reset(div_1);
			var div_3 = sibling(div_1, 2);
			let styles;
			each(div_3, 21, () => $$props.cards, index, ($$anchor, c, k) => {
				var div_4 = root$33();
				let classes;
				let styles_1;
				var div_5 = child(div_4);
				var button = sibling(div_5, 2);
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
				reset(div_4);
				template_effect(($0) => {
					classes = set_class(div_4, 1, "rg-card", null, classes, { dealt: k >= get(from) });
					styles_1 = set_style(div_4, "", styles_1, { "--d": $0 });
					set_attribute(div_5, "data-r", get(c).rarity);
					set_attribute(button, "aria-label", get(c).title);
				}, [() => `${Math.max(0, k - get(from)) * get(step)}ms`]);
				delegated("click", button, () => openCard(get(c)));
				append($$anchor, div_4);
			});
			reset(div_3);
			var button_1 = sibling(div_3, 2);
			reset(div);
			template_effect(($0, $1) => {
				set_text(text, `${$$props.cards.length ?? ""} cartes${get(newCount) ? `, ${get(newCount)} nouvelle${get(newCount) > 1 ? "s" : ""}` : ""}`);
				styles = set_style(div_3, "", styles, {
					"--cols": $0,
					"--rows": $1
				});
			}, [() => Math.min($$props.cards.length, 5), () => Math.ceil($$props.cards.length / Math.min($$props.cards.length, 5))]);
			delegated("click", button_1, () => $$props.ondone?.());
			append($$anchor, div);
		};
		var alternate = ($$anchor) => {
			var div_6 = root_5$20();
			var div_7 = child(div_6);
			var b = sibling(child(div_7));
			var text_1 = only_child(b, true);
			var text_2 = sibling(b);
			reset(div_7);
			var div_8 = sibling(div_7, 2);
			key(child(div_8), () => get(i), ($$anchor) => {
				var fragment_1 = root_2$26();
				var div_9 = first_child(fragment_1);
				var div_10 = sibling(div_9, 2);
				var button_2 = child(div_10);
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
				reset(div_10);
				template_effect(() => {
					set_attribute(div_9, "data-r", $$props.cards[get(i)].rarity);
					set_attribute(button_2, "aria-label", `Détails de ${$$props.cards[get(i)].title ?? ""}`);
				});
				delegated("click", button_2, () => openCard($$props.cards[get(i)]));
				append($$anchor, fragment_1);
			});
			reset(div_8);
			var node_4 = sibling(div_8, 2);
			key(node_4, () => get(i), ($$anchor) => {
				var div_11 = root_3$21();
				var text_3 = only_child(div_11, true);
				template_effect(() => {
					set_attribute(div_11, "data-r", $$props.cards[get(i)].rarity);
					set_text(text_3, RNAME[$$props.cards[get(i)].rarity] || $$props.cards[get(i)].rarity);
				});
				append($$anchor, div_11);
			});
			var div_12 = sibling(node_4, 2);
			each(div_12, 21, () => $$props.cards, index, ($$anchor, _, k) => {
				var span = root_4$20();
				let classes_1;
				template_effect(() => classes_1 = set_class(span, 1, "d", null, classes_1, {
					on: k === get(i),
					seen: k < get(i)
				}));
				append($$anchor, span);
			});
			reset(div_12);
			var div_13 = sibling(div_12, 2);
			var button_3 = child(div_13);
			Icon(child(button_3), {
				name: "prev",
				width: 2
			});
			reset(button_3);
			var button_4 = sibling(button_3, 2);
			var text_4 = only_child(button_4, true);
			var button_5 = sibling(button_4, 2);
			Icon(child(button_5), {
				name: "next",
				width: 2
			});
			reset(button_5);
			reset(div_13);
			var button_6 = sibling(div_13, 2);
			reset(div_6);
			template_effect(() => {
				set_text(text_1, get(i) + 1);
				set_text(text_2, ` / ${$$props.cards.length ?? ""}`);
				set_attribute(div_8, "data-r", $$props.cards[get(i)].rarity);
				button_3.disabled = get(i) === 0;
				set_text(text_4, get(last) ? "Terminé" : "Suivant");
				button_5.disabled = get(last);
			});
			delegated("pointerdown", div_8, onDown);
			delegated("pointerup", div_8, onUp);
			event("pointercancel", div_8, () => sx = null);
			delegated("click", button_3, () => get(i) > 0 && set(i, get(i) - 1));
			delegated("click", button_4, () => get(last) ? $$props.ondone?.() : set(i, get(i) + 1));
			delegated("click", button_5, () => !get(last) && set(i, get(i) + 1));
			delegated("click", button_6, revealAll);
			append($$anchor, div_6);
		};
		if_block(node, ($$render) => {
			if (get(showAll)) $$render(consequent);
			else $$render(alternate, -1);
		});
		var node_7 = sibling(node, 2);
		var consequent_1 = ($$anchor) => {
			{
				let $0 = user_derived(() => !get(selected).id);
				CardModal($$anchor, {
					get item() {
						return get(selected);
					},
					get readonly() {
						return get($0);
					},
					onclose: () => set(selected, null),
					onaction: acted
				});
			}
		};
		if_block(node_7, ($$render) => {
			if (get(selected)) $$render(consequent_1);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate([
		"click",
		"pointerdown",
		"pointerup"
	]);
	var SYNC_GAP_MS = 3e4;
	var lastSync = 0;
	function packTimer(read, onready) {
		let secs = state(null);
		function ready() {
			if (Date.now() - lastSync < SYNC_GAP_MS) return;
			lastSync = Date.now();
			onready?.();
		}
		user_effect(() => {
			const n = read();
			set(secs, n, true);
			if (n == null) return;
			if (n === 0) {
				ready();
				return;
			}
			const t = setInterval(() => {
				set(secs, Math.max(0, get(secs) - 1), true);
				if (!get(secs)) {
					clearInterval(t);
					ready();
				}
			}, 1e3);
			return () => clearInterval(t);
		});
		return { get secs() {
			return get(secs);
		} };
	}
	var root$32 = from_html(`<span class="tab-ready" aria-label="disponible"></span>`);
	var root_1$31 = from_html(`<button role="tab"> <!></button>`);
	var root_2$25 = from_html(`<div class="tabs pull-tabs" role="tablist" aria-label="Paquets"></div>`);
	var root_3$20 = from_html(`<h1>Pack PRO du jour</h1> <div class="sub">Des cartes de rareté élevée, une fois par jour</div>`, 1);
	var root_4$19 = from_html(`<h1>Packs spéciaux</h1> <div class="sub"> </div>`, 1);
	var root_5$19 = from_html(`<h1>Ouvrir un paquet</h1> <div class="sub">Découvrez 5 nouvelles cartes Wikipédia</div>`, 1);
	var root_6$18 = from_html(`<span class="booster-back b2"></span>`);
	var root_7$17 = from_html(`<span class="booster-back b1"></span>`);
	var root_8$16 = from_html(`<span class="booster-mark"> </span>`);
	var root_9$15 = from_html(`<div class="pull-actions"><button class="btn primary big"> </button></div>`);
	var root_10$13 = from_html(`<div class="pack-wait"><span class="pw-time"> </span> <span class="pw-lbl">avant le prochain pack PRO</span> <span class="pw-sub">Ouvert aujourd'hui</span></div>`);
	var root_11$13 = from_html(`<button role="radio"> </button>`);
	var root_12$13 = from_html(`<div class="pill-picks" role="radiogroup" aria-label="Pack spécial"></div>`);
	var root_13$13 = from_html(`<div class="pull-actions"><button class="btn primary big"> </button></div> <div class="regen-line"> </div>`, 1);
	var root_14$11 = from_html(`<span class="pw-time"> </span><span class="pw-lbl">avant le prochain pack spécial</span>`, 1);
	var root_15$11 = from_html(`<span class="pw-lbl">Aucun pack spécial pour le moment</span>`);
	var root_16$11 = from_html(`<div class="pack-wait"><!></div>`);
	var root_17$11 = from_html(`<!> <!>`, 1);
	var root_18$10 = from_html(`<span class="pw-time"> </span> <span class="pw-lbl"> </span>`, 1);
	var root_19$8 = from_html(`<span class="pw-lbl">Plus de paquets pour le moment</span>`);
	var root_20$7 = from_html(`<span class="pw-sub"> </span>`);
	var root_21$7 = from_html(`<div class="pull-actions"><button class="btn">Demander des paquets (V.I.P.)</button></div>`);
	var root_22$5 = from_html(`<div class="pack-wait"><!> <!></div> <!>`, 1);
	var root_23$3 = from_html(`Prochain paquet dans <b> </b>`, 1);
	var root_24$3 = from_html(`Prochain paquet <b>prêt</b>`, 1);
	var root_25$3 = from_html(`<div class="regen-line"><!></div>`);
	var root_26$3 = from_html(`<div class="pack-count"><span class="pc-num"> </span> <span class="pc-lbl"> </span></div> <div class="pull-actions"><button class="btn primary big"> </button></div> <!>`, 1);
	var root_27$3 = from_html(`<div class="special-note">Vérification humaine requise par le jeu. <button class="link-btn">Ouvrir la version originale pour valider</button></div>`);
	var root_28$2 = from_html(`<div class="regen-line err"> </div>`);
	var root_29$2 = from_html(`<div class="session-recap"> </div>`);
	var root_30$1 = from_html(`<div><!> <!> <div class="booster-stage"><button aria-label="Ouvrir le paquet"><!> <!> <span class="booster-main"><span class="booster-img"></span> <span class="booster-shine"></span> <!></span></button></div> <!> <!> <!> <!></div>`);
	var root_31$1 = from_html(`<div class="pulls"><!></div>`);
	function Pulls($$anchor, $$props) {
		push($$props, true);
		let phase = state("ready");
		let cards = state(proxy([]));
		let copies = state(null);
		let busy = state(false);
		let opening = state(false);
		let error = state("");
		let needVerify = state(false);
		let packs = user_derived(() => $$props.profile?.packs_remaining ?? null);
		let empty = user_derived(() => !$$props.profile || get(packs) == null || get(packs) === 0);
		let stackDepth = user_derived(() => Math.min(3, Math.max(1, get(packs) || 1)));
		async function run(opener) {
			if (get(busy)) return;
			set(busy, true);
			set(opening, true);
			set(error, "");
			set(needVerify, false);
			play("rip");
			try {
				const [d] = await Promise.all([opener(), new Promise((r) => setTimeout(r, 900))]);
				if (!d?.cards?.length) throw new Error("Aucune carte reçue. Réessayez dans un instant.");
				recordPull(d.cards);
				collectionAdd();
				set(cards, d.cards, true);
				set(copies, d.copies, true);
				set(phase, "revealing");
				$$props.onchanged?.();
			} catch (e) {
				if (needsHuman(e)) set(needVerify, true);
				else set(error, e.message || "Ouverture du paquet impossible.", true);
			}
			set(opening, false);
			set(busy, false);
			loadExtras();
		}
		const open = () => {
			if (!get(empty)) run(() => data.openPack());
		};
		let daily = state(null);
		let special = state(null);
		function loadExtras() {
			if ($$props.profile?.is_pro) data.proDaily().then((d) => set(daily, d, true), () => set(daily, null));
			else set(daily, null);
			data.specialPacks().then((d) => set(special, d, true), () => set(special, null));
		}
		user_effect(() => {
			$$props.profile?.is_pro;
			untrack(loadExtras);
		});
		let nowTick = state(proxy(Date.now()));
		const specialSecs = user_derived(() => get(special)?.nextAt ? secondsUntil(get(special).nextAt, get(nowTick)) : null);
		let kind = state("normal");
		const kinds = user_derived(() => [
			{
				id: "normal",
				label: "Paquets",
				ready: !get(empty)
			},
			...get(daily) ? [{
				id: "pro",
				label: "Pack PRO",
				ready: get(daily).eligible
			}] : [],
			...get(special)?.packs.length ? [{
				id: "special",
				label: "Spéciaux",
				ready: get(special).available
			}] : []
		]);
		user_effect(() => {
			if (!get(kinds).some((k) => k.id === get(kind))) set(kind, "normal");
		});
		const openable = user_derived(() => get(kind) === "pro" ? !!get(daily)?.eligible : get(kind) === "special" ? !!get(special)?.available : !get(empty));
		let pick = state(null);
		const chosen = user_derived(() => get(special)?.packs.find((sp) => sp.id === get(pick)) ?? get(special)?.packs[0] ?? null);
		const untilTomorrow = user_derived(() => {
			const d = new Date(get(nowTick));
			d.setHours(24, 0, 0, 0);
			return Math.round((d - get(nowTick)) / 1e3);
		});
		user_effect(() => {
			if (get(kind) === "normal") return;
			const t = setInterval(() => set(nowTick, Date.now(), true), 3e4);
			return () => clearInterval(t);
		});
		function openCurrent() {
			if (get(kind) === "pro") {
				if (get(daily)?.eligible) run(() => data.openProDaily());
			} else if (get(kind) === "special") {
				if (get(special)?.available && get(chosen)) run(() => data.openSpecial(get(chosen).id));
			} else open();
		}
		async function grace() {
			set(busy, true);
			set(error, "");
			try {
				await data.grace();
				$$props.onprofile?.();
			} catch (e) {
				set(error, e.message || "Demande refusée.", true);
			}
			set(busy, false);
		}
		function done() {
			set(phase, "ready");
			set(opening, false);
			$$props.onchanged?.();
		}
		const timer = packTimer(() => get(packs) != null && $$props.profile?.pack_cap != null && get(packs) >= $$props.profile.pack_cap ? null : $$props.profile?.next_regen_seconds ?? null, () => $$props.onprofile?.());
		const secs = user_derived(() => timer.secs);
		function fmt(s) {
			if (s <= 0) return "Prêt";
			const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
			if (h) return `${h} h ${String(m).padStart(2, "0")}`;
			if (m) return `${m} min ${String(sec).padStart(2, "0")}`;
			return `${sec} s`;
		}
		var div = root_31$1();
		event("keydown", $window, (e) => {
			if (e.key !== " " || get(phase) !== "ready" || e.composedPath()[0]?.matches?.("input, select, textarea, button")) return;
			e.preventDefault();
			openCurrent();
		});
		var node = child(div);
		var consequent = ($$anchor) => {
			Reveal($$anchor, {
				get cards() {
					return get(cards);
				},
				get copies() {
					return get(copies);
				},
				ondone: done,
				onaction: (kind) => kind === "discard" && $$props.onprofile?.()
			});
		};
		var alternate_7 = ($$anchor) => {
			var div_1 = root_30$1();
			let classes;
			var node_1 = child(div_1);
			var consequent_2 = ($$anchor) => {
				var div_2 = root_2$25();
				each(div_2, 21, () => get(kinds), (k) => k.id, ($$anchor, k) => {
					var button = root_1$31();
					let classes_1;
					var text = child(button, true);
					var node_2 = sibling(text);
					var consequent_1 = ($$anchor) => {
						append($$anchor, root$32());
					};
					if_block(node_2, ($$render) => {
						if (get(k).ready) $$render(consequent_1);
					});
					reset(button);
					template_effect(() => {
						set_attribute(button, "aria-selected", get(kind) === get(k).id);
						classes_1 = set_class(button, 1, "", null, classes_1, { on: get(kind) === get(k).id });
						set_text(text, get(k).label);
					});
					delegated("click", button, () => set(kind, get(k).id, true));
					append($$anchor, button);
				});
				reset(div_2);
				append($$anchor, div_2);
			};
			if_block(node_1, ($$render) => {
				if (get(kinds).length > 1) $$render(consequent_2);
			});
			var node_3 = sibling(node_1, 2);
			var consequent_3 = ($$anchor) => {
				var fragment_1 = root_3$20();
				next(2);
				append($$anchor, fragment_1);
			};
			var consequent_4 = ($$anchor) => {
				var fragment_2 = root_4$19();
				var text_1 = only_child(sibling(first_child(fragment_2), 2), true);
				template_effect(() => set_text(text_1, get(chosen)?.description || "Super Rare ou mieux"));
				append($$anchor, fragment_2);
			};
			var alternate = ($$anchor) => {
				var fragment_3 = root_5$19();
				next(2);
				append($$anchor, fragment_3);
			};
			if_block(node_3, ($$render) => {
				if (get(kind) === "pro") $$render(consequent_3);
				else if (get(kind) === "special") $$render(consequent_4, 1);
				else $$render(alternate, -1);
			});
			var div_4 = sibling(node_3, 2);
			var button_1 = child(div_4);
			let classes_2;
			let styles;
			var node_4 = child(button_1);
			var consequent_5 = ($$anchor) => {
				append($$anchor, root_6$18());
			};
			if_block(node_4, ($$render) => {
				if (get(kind) === "normal" && !get(opening) && get(stackDepth) > 2) $$render(consequent_5);
			});
			var node_5 = sibling(node_4, 2);
			var consequent_6 = ($$anchor) => {
				append($$anchor, root_7$17());
			};
			if_block(node_5, ($$render) => {
				if (get(kind) === "normal" && !get(opening) && get(stackDepth) > 1) $$render(consequent_6);
			});
			var span_3 = sibling(node_5, 2);
			var node_6 = sibling(child(span_3), 4);
			var consequent_7 = ($$anchor) => {
				var span_4 = root_8$16();
				var text_2 = only_child(span_4, true);
				template_effect(() => set_text(text_2, get(kind) === "pro" ? "PRO" : "SR+"));
				append($$anchor, span_4);
			};
			if_block(node_6, ($$render) => {
				if (get(kind) !== "normal") $$render(consequent_7);
			});
			reset(span_3);
			reset(button_1);
			reset(div_4);
			var node_7 = sibling(div_4, 2);
			var consequent_9 = ($$anchor) => {
				var fragment_4 = comment();
				var node_8 = first_child(fragment_4);
				var consequent_8 = ($$anchor) => {
					var div_5 = root_9$15();
					var button_2 = child(div_5);
					var text_3 = only_child(button_2, true);
					reset(div_5);
					template_effect(() => {
						button_2.disabled = get(busy);
						set_text(text_3, get(busy) ? "Ouverture..." : "Ouvrir le pack PRO");
					});
					delegated("click", button_2, openCurrent);
					append($$anchor, div_5);
				};
				var alternate_1 = ($$anchor) => {
					var div_6 = root_10$13();
					var text_4 = only_child(child(div_6), true);
					next(4);
					reset(div_6);
					template_effect(($0) => set_text(text_4, $0), [() => countdown(get(untilTomorrow))]);
					append($$anchor, div_6);
				};
				if_block(node_8, ($$render) => {
					if (get(daily)?.eligible) $$render(consequent_8);
					else $$render(alternate_1, -1);
				});
				append($$anchor, fragment_4);
			};
			var consequent_13 = ($$anchor) => {
				var fragment_5 = root_17$11();
				var node_9 = first_child(fragment_5);
				var consequent_10 = ($$anchor) => {
					var div_7 = root_12$13();
					each(div_7, 21, () => get(special).packs, (sp) => sp.id, ($$anchor, sp) => {
						var button_3 = root_11$13();
						let classes_3;
						var text_5 = only_child(button_3, true);
						template_effect(() => {
							set_attribute(button_3, "aria-checked", get(chosen)?.id === get(sp).id);
							set_attribute(button_3, "title", get(sp).description);
							classes_3 = set_class(button_3, 1, "", null, classes_3, { on: get(chosen)?.id === get(sp).id });
							set_text(text_5, get(sp).name);
						});
						delegated("click", button_3, () => set(pick, get(sp).id, true));
						append($$anchor, button_3);
					});
					reset(div_7);
					append($$anchor, div_7);
				};
				if_block(node_9, ($$render) => {
					if (get(special).packs.length > 1) $$render(consequent_10);
				});
				var node_10 = sibling(node_9, 2);
				var consequent_11 = ($$anchor) => {
					var fragment_6 = root_13$13();
					var div_8 = first_child(fragment_6);
					var button_4 = child(div_8);
					var text_6 = only_child(button_4, true);
					reset(div_8);
					var text_7 = only_child(sibling(div_8, 2), true);
					template_effect(() => {
						button_4.disabled = get(busy) || !get(chosen);
						set_text(text_6, get(busy) ? "Ouverture..." : `Ouvrir le pack ${get(chosen)?.name ?? ""}`);
						set_text(text_7, get(special).vip ? "Illimité pour les V.I.P." : "Gratuit");
					});
					delegated("click", button_4, openCurrent);
					append($$anchor, fragment_6);
				};
				var alternate_3 = ($$anchor) => {
					var div_10 = root_16$11();
					var node_11 = child(div_10);
					var consequent_12 = ($$anchor) => {
						var fragment_7 = root_14$11();
						var text_8 = only_child(first_child(fragment_7), true);
						next();
						template_effect(($0) => set_text(text_8, $0), [() => countdown(get(specialSecs))]);
						append($$anchor, fragment_7);
					};
					var alternate_2 = ($$anchor) => {
						append($$anchor, root_15$11());
					};
					if_block(node_11, ($$render) => {
						if (get(specialSecs)) $$render(consequent_12);
						else $$render(alternate_2, -1);
					});
					reset(div_10);
					append($$anchor, div_10);
				};
				if_block(node_10, ($$render) => {
					if (get(special).available) $$render(consequent_11);
					else $$render(alternate_3, -1);
				});
				append($$anchor, fragment_5);
			};
			var consequent_17 = ($$anchor) => {
				var fragment_8 = root_22$5();
				var div_11 = first_child(fragment_8);
				var node_12 = child(div_11);
				var consequent_14 = ($$anchor) => {
					var fragment_9 = root_18$10();
					var span_8 = first_child(fragment_9);
					var text_9 = only_child(span_8, true);
					var text_10 = only_child(sibling(span_8, 2), true);
					template_effect(($0) => {
						set_text(text_9, $0);
						set_text(text_10, get(secs) ? "avant le prochain paquet" : "le prochain paquet arrive");
					}, [() => fmt(get(secs))]);
					append($$anchor, fragment_9);
				};
				var alternate_4 = ($$anchor) => {
					append($$anchor, root_19$8());
				};
				if_block(node_12, ($$render) => {
					if (get(secs) != null) $$render(consequent_14);
					else $$render(alternate_4, -1);
				});
				var node_13 = sibling(node_12, 2);
				var consequent_15 = ($$anchor) => {
					var span_11 = root_20$7();
					var text_11 = only_child(span_11);
					template_effect(() => set_text(text_11, `0 / ${$$props.profile.pack_cap ?? ""} paquets`));
					append($$anchor, span_11);
				};
				if_block(node_13, ($$render) => {
					if ($$props.profile?.pack_cap) $$render(consequent_15);
				});
				reset(div_11);
				var node_14 = sibling(div_11, 2);
				var consequent_16 = ($$anchor) => {
					var div_12 = root_21$7();
					var button_5 = only_child(div_12);
					template_effect(() => button_5.disabled = get(busy));
					delegated("click", button_5, grace);
					append($$anchor, div_12);
				};
				if_block(node_14, ($$render) => {
					if ($$props.profile?.is_vip) $$render(consequent_16);
				});
				append($$anchor, fragment_8);
			};
			var alternate_6 = ($$anchor) => {
				var fragment_10 = root_26$3();
				var div_13 = first_child(fragment_10);
				var span_12 = child(div_13);
				var text_12 = only_child(span_12, true);
				var text_13 = only_child(sibling(span_12, 2));
				reset(div_13);
				var div_14 = sibling(div_13, 2);
				var button_6 = child(div_14);
				var text_14 = only_child(button_6, true);
				reset(div_14);
				var node_15 = sibling(div_14, 2);
				var consequent_19 = ($$anchor) => {
					var div_15 = root_25$3();
					var node_16 = child(div_15);
					var consequent_18 = ($$anchor) => {
						var fragment_11 = root_23$3();
						var text_15 = only_child(sibling(first_child(fragment_11)), true);
						template_effect(($0) => set_text(text_15, $0), [() => fmt(get(secs))]);
						append($$anchor, fragment_11);
					};
					var alternate_5 = ($$anchor) => {
						var fragment_12 = root_24$3();
						next();
						append($$anchor, fragment_12);
					};
					if_block(node_16, ($$render) => {
						if (get(secs)) $$render(consequent_18);
						else $$render(alternate_5, -1);
					});
					reset(div_15);
					append($$anchor, div_15);
				};
				if_block(node_15, ($$render) => {
					if (get(secs) != null) $$render(consequent_19);
				});
				template_effect(() => {
					set_text(text_12, get(packs) ?? "-");
					set_text(text_13, `paquet${get(packs) > 1 ? "s" : ""} disponible${get(packs) > 1 ? "s" : ""}${$$props.profile?.pack_cap ? ` sur ${$$props.profile.pack_cap}` : ""}`);
					button_6.disabled = get(busy) || get(empty);
					set_text(text_14, get(busy) ? "Ouverture..." : "Ouvrir le paquet");
				});
				delegated("click", button_6, () => open());
				append($$anchor, fragment_10);
			};
			if_block(node_7, ($$render) => {
				if (get(kind) === "pro") $$render(consequent_9);
				else if (get(kind) === "special") $$render(consequent_13, 1);
				else if (get(packs) === 0 && !get(busy)) $$render(consequent_17, 2);
				else $$render(alternate_6, -1);
			});
			var node_17 = sibling(node_7, 2);
			var consequent_20 = ($$anchor) => {
				var div_16 = root_27$3();
				var button_7 = sibling(child(div_16));
				reset(div_16);
				delegated("click", button_7, () => useOriginalSite());
				append($$anchor, div_16);
			};
			if_block(node_17, ($$render) => {
				if (get(needVerify)) $$render(consequent_20);
			});
			var node_18 = sibling(node_17, 2);
			var consequent_21 = ($$anchor) => {
				var div_17 = root_28$2();
				var text_16 = only_child(div_17, true);
				template_effect(() => set_text(text_16, get(error)));
				append($$anchor, div_17);
			};
			if_block(node_18, ($$render) => {
				if (get(error)) $$render(consequent_21);
			});
			var node_19 = sibling(node_18, 2);
			var consequent_22 = ($$anchor) => {
				var div_18 = root_29$2();
				var text_17 = only_child(div_18);
				template_effect(() => set_text(text_17, `Cette session : ${session.packs ?? ""} paquet${session.packs > 1 ? "s" : ""} ouvert${session.packs > 1 ? "s" : ""}, ${session.newCards ?? ""} nouvelle${session.newCards > 1 ? "s" : ""}`));
				append($$anchor, div_18);
			};
			if_block(node_19, ($$render) => {
				if (session.packs > 0) $$render(consequent_22);
			});
			reset(div_1);
			template_effect(() => {
				classes = set_class(div_1, 1, "pull-ready", null, classes, { "has-tabs": get(kinds).length > 1 });
				set_attribute(div_1, "data-kind", get(kind));
				classes_2 = set_class(button_1, 1, "booster", null, classes_2, {
					opening: get(opening),
					"is-empty": !get(openable)
				});
				button_1.disabled = get(busy) || !get(openable);
				styles = set_style(button_1, "", styles, { "--pack": `url(data:image/webp;base64,UklGRkxPAABXRUJQVlA4WAoAAAAQAAAAzwIAowMAQUxQSKEhAAANF0EmbUPr3+sk7BuTEBEZPisjAUuS3bhNQQMChEzc/8DOJoDeqvIR0f8JkH9Rh9jdEDvszo6fjL+zCoGTupRkKYqSuhQnFcVZk8liTZwkHSVJJfW6M5x0cSxT0lDPTMdv6Zm4pOFYZuKYpGRiko6N6zQckIY6H5n0iY1RQLVJxHVrzmfjqCBd4sHJ2WOMUUF7zI0Bj61pkYh9SY+qPWJjWuTZjKeMdwwba7qzWWNuLKIFj051X9Bi1mj6nEUNpQU12Nh8ypo+PKNFPLq5MXs2qKEbk43NHrqxoi8Uj056zBrx2aBGU3147Ct6zBo9lX1JFZ6ynkUiWswa2oONFY0eUcM2Fi30OEocR4cxZ4URLaRGtJnXjS4yx3UKTZTraEMBaRMF5sb0F+jPIkRERVS440eqBeY8nZstJ8+lKO5L03FfjpOZirPONJw8l5LkuZS4Tuzmt5th6E3uNHEUEzEUEzEMdQxFE0OxRKHAv7YcxW3bOHL2X7tev19ETABaI2BJfCWr+DMKYHFPawbwLdu2bbttbeVc+wT17P//UYeAXsvDJH2/FFRcGBETYLmRJEGSJNWoWf4pntBH7xFggd6riJgA35IkWZIk2RaxiKqZZ/X6/9+ca2eGmaoIP4S7xdxnvU1ETMC/8Lf/v/7/+v/r/6//v/7/+v/r/6//v/7/+v/r/6//v/7/+v/r/6///8///+f/383Ut0aPFNCgJ0JuLD2RwBg9CYH9AwUG9ESIMtKTILD9TDJtoQdCdEM8EXJj6YmE20hPwoENeiDAtvRERLshnkgqG+mJRNtCD0S026EnQnYjPZFwG+lJQNtITwIKE0+E3Fh6EiQbmFpImdo06IOUQbvFw3C2vcp+IMVUbUAfBIpVJh9IkUO1208ik72r/Ukw1dXgT5Kct3eZJ2NS1YAeZKgXjxU5wmubzyITV3egT4S6SvKjGENrux9EBNytkD6F1N5gHkbMQTXoQQy020IfpFR4F4E+CM2Z+97ms4hhr070SZpQG/NZxJjj/RbztCI05/a2JX0aclUhfwhGxyrWfsI8j97bTvQhYbObp9JxHNn3tj9IOV/e170fOAbqvdt8FKG8tb9u+5M8zu69muC9lJMqF/YHRR7noWu3P5HjjL1WO/kYZHd1YX+QYp6vXPe238nM2Ytq5ScJefd2W+9EzPOMqzukd5JmULtJPo+R7r0g0TtiHOfx9Wc9GknXcucnxUx6r259InLOud/efGAjBDFyau/u4EOk3O4q8T5C+M7W6v4k6Ti2vSHC30R2l7KX/E5EzOMYcVfzWTnmfd2rQH6D0m17G+ublLBpX2XrA5GTvV0d8rscaqhu60NHjHke927pnYgxVu8qkf4wl0tN9SciYpxHdxUfReQabZuBARnFso2Lz6GY56uWnOiNldOLLiv8LiJay96htN6Ecszj92WIdyJmdbEUgd9wBK7qkvQhIsYcLy/7gYVwBBq5raIV/ibUS6SqbBnpsGrBq21E+J1NRqh28N2SemvEqMuBjFJA5OuXsaxvgWx/bYMRGBC7VqTcCECZZi3mRJJBGBB9k6Yd34wUN620kQAFEiZ/WQK9QZgNcjvAYHl5ZRxl8zZA0HmSwv6gRpyjFo0wCO+qcVL4m8TbPFEFw0JGwEJJ9TcDZPWdAkuJJUBuHyvQkGRhhdkVoQ0If5Pq7gikFAjaivJ45CVfqKOELZdRZrf1zeC1PUdqIyTmK9ZljnxNyQFyGPe+OV+4SttIqFcf46W4BFbkCX1Xj/83U9YbbNd9MwcEBchoXeQxRiEJ5YGvJY1fxwQEAkMvxzFwaTUS5qtWzmM0gNDA7r11jJAkZAD3MmdE0RsZmvqKeWTeshEKoHvteR5DBllgvOI4w31pI9HS+up5ZjowQonp2nWOdIvECNzdnmN092qhhrUuYg4MKMi28d7KmRmSsdSwd86D3rotGfD9Zc2hSElyANVd/vgD3uzTBqkV1F4rjjGo9moQro3GPEIgafw61+U+M8dMkAWWqXvNw6epurYbKA4NjlAgKc6/bK+v28cZEWqiQd576Twyha4N4F41Io4RAiLPX/uujmNwhr7JYPW+OeIY7n1VC7l3e8yRIQR5vJBr3zteGXxX27juPvIcrv5aYKmuETmHRtCG48D2XsvHnEM2COjaYyrm2vuuFjJ3Z84pSbZjnLJ77a1TopF4u+8YI6eqr92SzH135GvCRlKG3N1r11/HEEjQ0F0x8xjeda+WsO+7OWYmROA4wN5r+Qsf5FuSVEEkJlx7jZlTVF/L35uRZMwkIsd8zS/XIdkjQ1bkLjWuNTx04H197babzGx8TqHI1+ugq/a6a2RgZbYbd+05x0yjr3uXoWtESnlgZZ6vee8+huCIdKC07XbXyDEi3H++dmN3ezI0JzhzHke7e+21Z6btHG3srh4xZ0b3n2vZkhxHwMGQ7BHTtLvWGnOkJFXjdneaA+q+Vst0e46j64iJUczTdPfalUd029GNy+yMHDHc11rd0HePzJyjKafGYXdX73XOpJF2YXf14CQH+167jfurMo8ciUFxvCxX9d58eT7e/bqhjUYhd6VTU2Jd9zL2kaIiUzHncebdjEEVGSLHnNdq2SpwxiHV9Xu12q/cXeETjXm8cgHqupdCoTFf9y6r3cfMCEnrz70LnDNkUq0xzlPLzByuCiHFnF/V6oaBGCPt61rLbo6MzggUx3HOatve68qBlXPutRvbI9AYad/XfW+UM7vgyGNkRtK26VooY87Ma5Vty0Xni7Wu66525zGrUOYcoTHtBvpeIzOwWPcWbSQ0Iq297323PQ8FikQwE9uNeo8pHDH3WmVAY+dIhfe697Z7jNGRA0WMMbMKm16Pz0w2CTYhQ1QRgWRxjOHrureJFFbFzKFh7r8vnUNEmDki0bW2URARkUHn5l4VxxDQCu17A/fOVwoqIwDN6+4mghmWQlLA/fvSqcByzkxv9toxJgIzcoT0dZWQrEBE5lrc/VU+Q1DOHCPEXjd5Si0zRgp/rbIVCKwceTVZ9dXnYVlKYXJoV1vh2pKOJLmu1UjKSM3s8hZ13zoOjIkjBa5tW6K/0IwQcV1fhRRj5IiEr5Z6XfU6UFtJr9WE/pRewwhHTo2+7tXdipEjZshrKbTvK19BtHJGQrCrLZmaZ+Tbt6/7BmsgImyLDGQcmvny3t0IhMMema3ra+WZAcj2HBm9qxFIIsmQdV+tV4KQzYxaa10rXwGCCGVAdTWSCBTICvV93XlKoDZxKPpepTklgXCODPZuS0LYUmat+1rNqSBKVIwM73XpOBDCMGbGqtoIEFYrx773vm9eIaDDA4zXlxHCGylymK6yhBRkRjq011VxDCTUESPNvncjyd4EkQqqqiwUIpRB37vu26+QpIbDXrXrQn+FQ7KlzJRXGUkhRaTYe/dda5wIE82IxHUVIdE9MOb9JwFsAQoIEQoh7AjOIyMEAlSOFqyqOVO8NYj2GCkJQCil9DYv8VZ0TtXXdenEAiQU2fU1cgRvZYGj+trzTAuQwUOurTMMIIMVdIQCBAg3oXB7zBAi22rJrO1jIIGwpWxnREgCZLBY93X7GCBEaUDtda8Q321jWT1SKQFISpHUbp0hQFCKiN67MwS4bdSSMzIQCIlIs+97MZPvQhr0XuvKF29FwVDPzCFASArhquuuMSQJlQDZd2VKiIYB328PYSiikEK8FSziPI+QeCu2Nr0ZU+Kju+j9msFHiShFxwl6A06F68uJxFsRdN3nCOkNYFWzex4R4rvsBkuH+GyqqV9HiIc2Vpwpie8qebPNFB9Ft9HrSPFRbeN7OwLxXaCutbfyjRFNufs8U3wMJIHz5GG1hONIvbHoMvbrOIKPYTXem5D0riPR7ptE+gam2nGeMyS+C4y8qhTirWxXq4gU4rsZYGcYLAIZCXoDzY45UzxUsy2leGqXNUKfQGr3SJ4KgjLioaB7D4mH6mITGeKj3LY0kD7JTflIPesoJuKz3G6TIX0Au9Uz9cBQYTfiqd27yXiDQbTbM/UA1IKRSJ/ssjIl3hpDt3vOlD68bYz4LBC0EZ/VMowR4rNk4QbxUS65rZT4qDGMZmihHCYUPDSE+KFlxE9tft5Cj0Dm39IWjw0FEo/VBBKP1Vjih1uInxpJPG8k8dgyP5aNEU+tNhI/bH3nqWkkHlu2JPFDmZ/K/NjYEj80P1bbSDw0IgODLUAIif/WzX9e8/8BVRgy9MAhIP47+/+7gkoGawAdZbgadrAJxHSDEIcmuh35rFUYbzB4yXCFMgTuJsZIFxNzNn9pFfa7k6GKAQ4nuEMVA9luBJvw0+UEYGhjDgeiVDGR6QaYKsCANGXIcDhhsAiJIMMNIunBv7acEGDoomw3oYsdxpsQq7DfEPCOBSCX7HPklAeiZyxGueYJWIXA5biQMqw3gFzymI1lCJdDAlqFNHeTZII0sUOy3YBNoMNyQ4hl2K5GgvQwAYcDsoo9+J/txoBYhURmqyEwZQBzNfAnH1LESBmO72ZmqnA9HEar2d342ITL7fPBuxnMLiNVvHiOnclAAg5N7Fw4x2ODMUJwbILR9fPHWIwBJHTx/K3PQdwLYwJSRk9wjjLXjMrulEHoniPkWnAmSyE/cNNkrXEk0wch0EPOhZj9sA2gwccYa4BE6aOcUHQsbBJ87AMiHSCXEpKNI42UnzLWN1nyQScFzqncSchLZqYTAv6knfCS4NBKSSFmGvIC2goJjkthCRnTCqD0eGdiQBh6aXi8jFQwwdnUQoCjtBHks0M51XIhIokM1ZTOMZqICBnTDO3qiY06JA7lzPxIC9FIYjkkzuea+4hKmHYk4pH2gRBDyiHkocs+40DyQTstjww0DARpqJ5D82DRFdthgMeb6wgmUdqZ/wI0jx02ju0wAD9cxhl3IUg9JfgQjYPs5GVoqOFhH4tYEpSD64gLuA3pQwqOAxZlGgKKMs+gSEUF0XkQIyU9IjgPMmhH0AO5jgyRiqqk7DMOt1zAliS2j4x0VGKimWBHCLF9ANLT4GwkNUFGOj3ZqAG8YxLklMsxF8gpQ875QEpitg+TID3NeYCSniQvucFCBElDDKRyHUikpYEs1JQkGagBMB0xA8fx2dDTZKDGnnQKtxFVUhNA9hmkqTkPY6oyTxPA3DGQc26uGZ6zex4vWSYQvGMQJPzIn09ZHN7yA64jUxV5y2WjAVsCBM4DQkuTw++c0dyyv9XoxbcML4955zHrMNDYlIVKVy3XgV3ZqOmKA8GuDNTEW4akJpY5DhfAloxUutrZR1u9j5nXt8zrRkxNfus0xFP227JeHzPw+pZ55ffNTI4ZxGtmrhles5yzqloOxPTEK/t0sSe/nnt9zMDrW+aV3zcz1wziNSMeMznmOWemKl73cc9jU7wOxDTld854zcw1u+fxmv1+owFzyYDgMZOcMlk55C7S0077wEhqQqd9QOSWy283mmMWJafMRWrqdR2uGk65Kz85N6YnnRZCU70OJDblNc+BZNKUiboes1/M2kgkLUFoIZFbLj87j9eMXDOpaeeKjSMTitqJhcaeTNQ1nPN4zeScx0OW5wVpqdd9gFzzaFfSpuH70FSvPObynp91ZFIWW8fn2BRwHK4YqzLQKLdcqpoDAWJPTgsJQ1HdR4bQUyPXQTDWBGWgoajJQGNNTPaZWVMThHAcZCC2BDgMNFJUmWhq0gFcSE0lWWmsCDJTSUeGGvm75vmavei2EElRJproLZPwk3NzzbAothGwJiONtDRHIr/XGK9ZUy3fst86zTUDj1kEc8mMAQ/ZZ7nkkWNurhl4zCLmlP2p5+yax2smxzznTH7UT5uIIXZkp2puGWSOmbTU60QiVU1bR1MTkKc87S2T2KdpykSlqbmQWJRkoaYnaQupqiHNIxYFko2akiQLNUQ6apn7AENLjYUGaWk4EcCURMocSKSisVIhHflXGwhITeU3ThckDTEkmwcQpKICggMxtNRM9hnpqfzfjfmWxeEtVyZqejJS+f1zyTGL3HL5Gbq5ZJFjHuItMxxz+dl5vGbkmsk1j8csHPPMNYPYFCdSVXvMDMl9xJqALFSaag6krSOJLTE784hgWgKHhQrWxHAfQZoq+5Sa2kkmGkuCsRGJJQGZaIZbLkWVHEhbNxJbYmxUeupIuupATFcWmrlmVTV7yszwJfsp+zRdWWjmmn2Ol8wgpzxDUyVcR1cN5CE35DE/dOZhmmLgPD6bliQLNTTVidBV5+HGpsiD7lNm8pq/ZwuVHDPkl7H2mj3o4WOGPWZeRxJbMlPJMYv8tqzlW/YzXzN5yO01A3nMDd8yZKKmJQZOBExFTAD3YQg25KfM05Wm2j7AtSi4kLa6ENemgOPIBFyb8l/PrsesrPaa4XOGG3EtiQEupKkmD7mZLNQQK/JzIHk28gO/vWbgQgzEmjzmtg/Xohg4j7bKPjNxZ23Jb52utyxi7pgrRExNXAcIhGM+5yzesshvNgq5ZSBNzYV0Vf4T2hTFjVzzWJXOQExVRmpTbCLn3DSlsxBsykIleMpgAE8ZyK9iw4WYohxGOimJDNWO/Cd0JmBKkgv5SysiM42c8ijHPGXJcbhjqiILnargQAw2JfeBNFXm6RLtSZjjAIaa5mGfGWlpRwDXcdEjpigOZAIWJfcBArZE5ulS1QYCVkXeclmpaclSvWRCuOZ6ze655JhFftDPjdgTWamQjuw0yCnXUNOcSKSm8q29OWUG4iX7kb9Tp5fsV894zX5ybq4ZYDrSaSKGGCsy08gP+50esxe9c12HMUXpxC+csSsOxBA7koxUSiqQEwE7Asg8DRBq2kD+1ElF4jDQKJ9tiIw0Yjjn1iQHYjjlBklN0ubxWdOSlQYwl+yeS8QcMiSRQx7klhuumZBL5oKccoGcMhBzy4hc8shPzyUt8boQE6mphfNAmpoyUFMUayCRY26u2Tm3KF4nUlWvj9lPByKkKbkOE+SUK5CWWGcfkcgpj9xyhZyygFTUciGGCGkIWO4DJMghN9xyV3PKIHLPg7dMws/MzTXDc4Y9yZFgR0IZqcGGyEYzANLSMMcBGHp6GKk9sYUYMB3JcCFUVR5ze8oCXEisCQINpKkhj7m9ZYGW7xhS8pSnPOUhG3Utyc9cSE1D2WgmHQFyI0018hkLTTYabIgEOBGlo5Iy0XQkkcCFSE1D2acQK6LISKWkAjiRluYJ8x0DOclCY0sQyX1ITTskCzUtAWSjliRloUJMR5CFugyxJCPVDCmJQGcfTCQVUYicx8TENAQFZJyChrUgAljrAPmcfng5x9jn7ODSUMXMdcgwYRuCR2OfAhhSEM7xNpCoa+inKgyECQ8b62EYGx02Du00DZoI+IZpB3Ls4kJGCGg3On8oJqojidJNgUoXgmQjdoM/0EUW6vOYRbp5lHudiGD2RW2G/MO9xEZHA0g15RzEiajDG9RiCJ8/XTYqYwhSzc+HYyOBcdhVeyGeDzdHIpiVoZgej7FSg7Kgvfh8MlwJ4iRRWikHvbFTYdhFS4Hncwl3wjyTN8XoHLmy0wwEIqXUc/jrUtydh43YCOnoja0+SJapBHoOuRWDAjRCjnL/4lRgmCFE+/DzhmzVVUmkjuY5cV0L4jNZbIM/qiNzDTNhYxn48yEui3FgiK82QQ6fbofF5vVD3oBFwI+GOpkZhW9lOKodWax5g0vEInA7nxitbBbIUEMvnHNYbUKWYbAGPz3qaDDZdahCquzWBER6aHwOdzfADqGKguxWEmmjst3QR9sOpAvGeI2kCj9tOIZzrjGn7FerOZ5Yh/1GTBlyO59NF8ZrMFTRthMBUwWk5ZBPpgqA7cYgoYpek+EqGFOE+conTBVsOcDElSYKNp06egmHIwhpAmAsVwmX3KC5ZCiQOyZBuihNB4aYJhjr3aGMQk5HhDQBieUKhioa41XqaNsBSREk8n3XAKYHRGL8jgMauphA/I7jYhlw5TtvyhD5rmuQLoaA33EC2IQAMfi/ifXfjNF/COvfwvqZ9R/D+pnD/2VY6EeL2APcrMP/2Bbyj/4tLfknlvwjC/knlvwTS/5RYP3Ikn/0b2rxb2j9RzD/WS3kfz/Az5IYhyJuUMX/epZ+YpCkR3Z2WHpkWsQPjEB65mgP/6CDQHpkB8QPHO1Ez9xI8QMjpGcGEXpmm7SedfRo4UeWAz0zDfEDI6QfGKR4ZiyhH1gO/cCWMh7Ju44WgX3zPMp/rhF61jiJ0BO7WzFC8qc2dURI+mR67c6coU92l2Ok9cBNjyQjHnRTkTOQP9iuzpHSA9udOUD+5NqrZiZ64AJyOuQPto1mROiTu9fOTPTApjMGzUM3nTp4amptzZQe2FRohPTAjTMzFA/ca2sMHrtxRgT65DYcytQHyW4bkpeZR/xPsI3GI5uyjjHigXsv55hDWG/c9B55hFLoXde6/qzXX6eEPuz71nzN4U/dbMVf0hB6V6xNvo4ZPNz3ZpxzAH7T7Fa8GGG9M15fv7/O40j7g3vfGmcclN41tSvnMY9E7+z99fV1nHP4k3tZ4xXiDr2xu5biGBGNP9T683ueZ2L5Xa+lOOdQS29sV0eeOg6hT+vP349zBC2/c9dmzkOW3rl7a8751wy9i77/fJ8vDz0M7y4fHyP/8Xa1BkPI+ma2nal5ZOBvNr13aMYIrHhT5QQnUvLduPe6v34dkQq+2+6KnGNm2gjszYqMNYkQ392+7Zk5RuI3NmxyjBmJAUyVQ2ONGMJvaHvfv2NkBBZg1FsaMTPC/tauJWVGZATfDdX7/soxIm29wcWQPRmgb+yq4IgxcL8zvdfXHDFS5rtxwaGcGZK+0VuMcMyU/M7U+pMcI2m+G/f2GHNkEm/cbDKaKWF9g32/vh8PRTR8e/GZYf4sAxH8M9urSdAIMGCXnKMrGCEbgbvhiGrPzADhXho5rt/7QHxvGmdwh813GWzF66BqpMIG770jZ/25hsT31i7idVBFZJgAaMXriKqRkmxYVZrHXr+JFFjGEJnl1TOlkpAtjsMbjyEM7bo1fkVdGL+RgQh7O0PqMAg45/0vrXOmAvAucs7uHqGiMGBFWmVl0CEjwzzoHcdIxbfq0BH1e5cRAoMUsHuPOewEsK0jbWYMkEx7M8/657XN5+zXrzx0MeyL80wUogtBmUA23a055HUMaLu7iGOq/6xNDMnIKMYYve/yK0eo7d3jmPd937uMoDcKjePgvq6y6QhD5Pxb1L0qBmp67zXGUV/3vVfb4L7d83VGr6/FiGiFIDT/Nuu+t6YwvffOY3B/3csxZNoSMY7X8XVX5bBSEMQ8xl5X64iwm73z+DV9X/e9DXITipznse7bMcQIUERmrevPnudIoLsYxyvrup1BuwEpxvFrX3dlRKTCjhivWfe1Y44BuJp8zfpzf93LNphvx3HyezmPoZQQil+n+lqeY4ZM7dJfx/69/3x1WWDDZr9pGQybBQfQhA3R5xkZuBw5j2D10FB315U6Z9TV975DqU5FfGv3vc3IlL07fnktvFe7271vEWPM4/j6Wr3bilAoxsjq6y5HQtWunNl/VHVXta26m/N8xeW1VjulGWRE5LG81mqG6L2L86ivsu9FpOhSROShX7WvRiNmJArlubzXwmeq+mLM17kXda92295SZIzx2nctMpSpUEb4X43XlkaEXR7nmdX77oxB1VZExJzT66rK4VdGBDGPS3vfW5Ej3F3zzP4Tt9d2YbUUIf06q9elPOI1JCniFa77XkEmeFeeo/9F9FXt7w55l3m7IIPvtxeQhGwAfJ4ZY4SlfB3ipn+TQa1r+VewvxS1ahHJmREjgwup9y2I3h4v1z9rZFR3d+37GqmI4nVXV6v3OTKH6D9lvHdLeDn+Uv+j42W7qF7XpeN89W/AtcuZ85iRCn4XeFcr3NV6xf77ykPUgrT3CKHuibx2hF4zhxT6e8WovpsRseD8Nb/uUNhd5dr3CEW40qpdjjhnZkboH5SH9nWXQtUe56lrR9AeI1h3ZoQwmL2b43iNGCF+lwe97pKyq2OO/U/oRXe5q1cqFTIh6qvzPI+MzAj+7MDr2kTQpde8/yFyyu42Vc/z6IvpArzZl2dmE3hHZuYh7AAPxmvCHdiNYq/qkalqXlXlSPV5zoywf1cbN8dpBuev/LMM+4Ze+7o6QwbPNlDrnueZKfO7bGMqYeSZAuvX346uTWPGQNjRBtxrHsccMl+Nu8x5nHv3PM51NfQqK8VdxxDY6TZQNV7HHBJ/iuoy4zVZPY/X+mrw6laG95pDEgTebYbiOGeG9C+324ZqTM9XYDxef9VWpn3NMSQwRWNvv15HCv3r5bbNzUQepyScr7+6UeTer5kBuG3sqjzPmSldX9uu7dsRMKcsHL/+wqLu+/7Hx4eGRr5JmJ3Ax37Jl3k03yIpz5zJVUY5qlGbOWUbh78j8shwQwOW/DUOHXnmn2WwCtP76jFkANlC6qU8QrbLWKDeI+Zx8Fa//ibXAmaGGxCA6OoxA0ODTbePMTVzrqsBu10hHJECbBOAa+eZCWwDdHkcmTmPdRVgulsBHGEwYLqMds5DFl9ti6C3Yc5TADFe7UZhH8KAbSHYt44Zgj9ti2DvjpHHEIDGy91O0XPKAjAy6kvnMQP+FNjefZfGcczge74QuNb1xxeVRgbeyDyPD38wM5js2yPOkbrKBmUaHHkebAOSMC3nRjQPY9X9K0//vQxgCAnyl/sdQgqotpuPDjUex/D1TcRLaop5UDxUpK6227yV29XHeI257ua7oSHm6QYQwiD5rpABA9jsyuN1jLXafLfbxDhk89m2vhq7oQGDjD3GzP5GTNMmxsAGEDIK4vdCbmjAAKud54j6hga0iRjg5qMC/r4kG4q33rTzjPQbJUjRxUgrXePziJOYJQskWs1dNt+VsjXncZS/fZdx5H0t+4E4O81VzUPlOM+5/OatlPO6l/ksJEh081akFI4cY/tZxH1dyx/AWuaY567mvVrWnOftb+8l5XXd2+bhdh/H0bv5aGDM19pPMLq/1jIfZUnEmLr8hsCGGK/ab77LxFhfX9vmvSxiZ0Ysv0GA0Tz2Mp9NzD9fq7Z5OCAg/7xDb2KMd99WAON8qGt2yUKG77fNR4Ei58A817jvNk+jEGXzeMzzkHmsnPveT4BUlHa8A0mRkXI/gpi12jw17RzYPFXkHPUIx6zr2jx2iyGbx8o5yzyUFb2u/QCI1Ah28zzHXOapIr3+bB5nBOjmh5nH2k+EpPvrbh6KDEcv8TjG8frXr1sMmIFl+UszRs1zIaXMT9TND4eheS7FSPMDjWrzwyBaPBWhkHkuRZd5bkD8VErxXArv9jPs4MeKCPNDUW0ei5RsnkuZ/Qykbj8TIRV6JBTR5rmid/sJQsFPRcz5bdMMlX+niH9DSfxY4ufi3zAkfirxY0n8VJL4ufgPKYkfi/+QksSPxI8l8WNJ4qcSP5ZkfiyJnyr4saQfQUTwt///z/9f/3/9//X/1/9f/3/9//X/1/9f/3/9//X/1/9f/3/9//X/1/9f//+ICQBWUDgghC0AADCuAZ0BKtACpAM+eTybSaSzv6qj0flj8A8JaW77962m/wN6lA0gJ5YA3Avz2ofY3nPj9gHrvnz6LY44K7qfsS2//m182jTtt6mx9n4b+2P49/qH9Gvh/2z81fxP9j/Z856PB8s/LHnDjZ4B3tvhNwEdaRrzLFdAzyYv9zyo6E3Uf9CsajEHeb+4dmfQpgHeb+4dmfQpgHeb+4dmfQpgHeb+4dmfQpgHeb+4dmfQpgHeb+4dmfQpgHeb+4dmfQpgHeb+4dmfQpgHeb+4dmfQpgHeb+4dmfQpgHeb+4dmfQpgHeb+4dmfQpgHeb+4dmfQpgHeb+4dmfQpgHeb+4dmfQpgHeb+4dmfQpgHGCbmoR/9Et9bIQUlwSdjGbUb0Ed5lrWGZjCvzMKK4LO2exVOCc09g5EGLrZ/2CtnO0O5ENiiicE7Vv0sSkGZemLZrmOtCfs3fwd5v7h2Z897qhkn2fCHy/dNwHxh0K+2a4CFWMgQWM2QV7nKpEJQjTe8L5jE6aMus6UK4oFFAVhuQKaDE8cz+50Ak6LN8C8UXmjUsMYQq2K+AsDEMUI+FIE08JvLKFrBwEqZjaQpv4DcczG1wE335n0KYB3m/OLyMiP2Xr7Z8TsJT2Riid5sOjQsnSOC1uKWg8RoGXMsyeg/4xiRz/xU6xXL5YQHeb+4dmfEBMS7YlRH2EJfHmb1vAntJ/P+TsibZGN28cHww7EXqkAINQm4eko7DxTefhcn8GfMss+hTAO839bQ/iOI9sG09puCjnlzEEUS5JVcgTHaa3pBGzxrKymn0fHhIzq1hZcPHhz8QhP1bH0B7/E/TNZX5n0KYB3m/H8rylq1Al2lJNE2OIJedloEc+y3DDT/5i8ZYAQTUOBIYE4AaZHIu3ebli0mWDtU7pgi4zk69XwihbSBMA7zcKOZUDqX7IVKh44QwFkzqpVE2nQXhp0LPt5oLjAjex0/rA6sfEPVxOTT9x9eXAggKjmwMuo7R6pKYB3lgRe/UoqfteOfQyVQKzpgR89ydqYvyKlOcGDqx3XHtHOFLonmW/02i0984WTYF61HExq+OfNXrfYOpCkGFEG0wmzYGL2gvf/o9LI6b/q4ItzAO839esX5vjyBd6VL38+AJYkT/mRqLaFKpeaPFiAv3sugVFw3Iw8mC+wsTLUXxp/Ze5FzV8rnjRDdltkFla8tnR642dcZcffeHuHZn0KYB3lQ8YcO4/a9u9LoJUhx34tmsGdwNAMC7I6pCwWSiSC6WaADT4uzsvS8uMmX+qwhXAfGI/XlbYNzP5d7dh0KYB3m/uHXJ3Ic8KUOqk/iPNk2+c8xrokJS9io7YF/KEEhdkDkFh7pqtcUItZjqssBbFo9ljBXCBODWZ9CmAd5v0UkI0mg6CUJrll/u9nma0KYB3HoxFPzn7nmYbEP+X2674lG/PmhSZOuDj18gNZn0KYB3m/K9eeyYazcHpwxavOE7lfoK1+4dmbWsMKF0/g4w+lbJoeEKvfTzXUO+wEHUUmgC/XZqY1l2buCLcwDk1R5gHt+FDHy0UCjw3jNaKP0EuxLgi3MA7kGTIXPlTqpyYcZuT6Bs8aKuUVwFlarh3tyqsiCRwJW5gHeb+4dcnegcHUwQ3b0XrVBhFwRIXcK4L5MuVr7sxhcqtu839xE+dL4aso11udRN2r3KfgR7L01lQVWHJSs0NeYdCmAd5v7h1yd6HrPsiQFEwIvxnY8xh86pxHm5MzcyzY0TGxUNa6I87zyHIjuBCaUeEoRYOmkP+caimk8sBz+8D+ydNyKlck5JQ7/aOOU5qB/cOzPoUwDvK6k8iMad5H4yX/CvRcX4od1fi/bZhFqsvzvUcxN+MHjY0gPf2ukv8yWqEhUx1obp/ZH+75pY6NedILWXu1qwmM2rpJEqQEEX9w7M+hTAO8rreT8SVpjg60ZnYVTJpaHuH7/552jBKAhdlWQZ19fXLz5QGgOcL78fkle+f9/cLiHmersyfQ/EFythAd5v7h2Z8/G8XAUykZYe73TjkKGTwD7vWd3+ApYPfgtAbKHyHpx/gZ8spKIswQOXW68N+thIAHVQDBJSjNe60iiiAHk4sZru2AXNNg163dDJocflE7Vr9w7M+hSfe+uJciAEf/4/BBLBL9jKNruPJ2Fr3nzLUD/azb9jqFZ1NrS4WzmJcFH/hkT2O1tU/4DMedAP4matfuHZn0JcU9UGcUdkoy1zOhS+Xh0q9CKfQK95SW6c/B50A90XsBwOP4vakTjY39BaT73rFSTJ7/Kw8BWQwss+hTAO839v3UwOLMI7/OJ/7QRJmC8I2TGIY7RMHTrCpuWzaaPhzQgL6ejPcvz8rl2VNv2bDMNpVxtEUDk1OjfEixHJtaHZdCg2sZdm7gi3MA7oPWPDL2X03E7Ru0oQ+Eou5QJcJzoKX0Osh/bEfd7Rl+ZxEJj73xXbrUiP8rOqiO3n0X+ra28eAXynqM6j8YTW7gi3MA7zfookXsnMoRvtKzo55PV18DtG3n3ky27r5RyQ5KlWD8gpI05TE6IDAaq3N/J8ooPMhydfMICPxqUZEW5gHeb+4bUWDm0Tkccm/oaLjZKnaYGDmYVfMKZmx3nMrY/0HSzeQfXiqXIUlk5hVjav3hy2kfvu8w4DNa1iSwlbmAd5v7h1yd6DAZrjHZAmGCA4+r/Rn/rgZCX5a4J8U2fRheuVRKkLIqtfuHZn0KYB3ldcEeHgKyHWSLJeI0NtAP8P4nEyFAWGE7FC5z0M11+0z0IDvN/cOzPnyvfLWFjDANzHh5nCJr5mTijgz+PyqAAlYJy8SdMlBKVNrbsHryQGIsG7WA6FEfvrE7P7dhKM3gcTIi3MA7zf3DZ8ieRx70GPFYHN2ZVcITfawQIolFAMnwKvKSHDPgRgT3UFxV47S6k54iyk6Cv9CmAd5v7htXCN66Fd/13g7mdvnc9h1h+p+nACDceY1NCwjNZXL4KOASFaiX1L/2IJlEKYB3m/uHXLagam8BmjCkaaGGH2yzRZkK48WTA02j3MHe0LDNO78Rp0q+Uyn4Lt3f6FMA7zf3DauLC5R3LvAZoxB3m/EYg7MergUwqBdspDgYo5i9vYpUVmgZJaLBB+4ZZ9CmAd5v7fv6OSEauL5Gnx+TzB9im0W9TdwRWueGPKHQMcn/sLctlV5VFZEg08AyvaqD56uCLcwDvN/YXissqdS66QDeRV6C/V/UzUXRRr8MXTBRNJCwRbl6lcmDFkdNxOgdujHzxx5SEdUtLuxRHQ1wwOIYlGpBkhnajIi3MA7zf3DaeeIsMLcMvmS6s1ZjngUjROyALNiblGE3BfcOzNhIVpVvtdd8ifCSH6KK8ebZeQrTNX5zUDHYR/i9P8SquRq4ofq4ItzAO839hQM4SibWxDhj8LEsUAQy3sWVGtHanz7IUf9/K4+xSJFuXoROys2yacO5fOHHIFPlA+cxk1vUnQJnkhDBDyfbfSCKBDf+4dmfQpgHeV0dQQlH+CuHdZy6ay7/ssqkADs3ddhPzxrbVyert2BifMZPWfhQekByitmdScmpQmNKj6b5Vfe4nOLZ9IeEB3m/uHZnz8Y53C3FiQHuwxQnwXICfPDKXme9hDhwu+3m3qjicmDwSM2voReRU3ZiHIvjgj6JIjHwcllLhQKzZEW5gHeb+4bT7fuPZQhHnyytAXSaJCh/dPF4ohi5ZBDyzzceXPw8ANM1QIdnyqXGqZqlIHypXKtjp1dO4IOpKYk9rEcFa/cOzPoUmJDa3BPior//HkoGtWjmHato3qpX41P1fn6EuEKb00/iSwwpBA3RVsObyeODdTXtwYR51Yo/eLfw/jJj5u4ItzAO820yWUGJ674Cr55VMAvdrXJGHVq4Q66tVr7h5naWDyyTidywhGyVR4sLVHWipRN7FodAT8hcFcdwRbmAd5v64EbqlCApbzgR4LuN2ZXCqJu47IEU/X++O+NwiS5kHnx3VLC8hIA3g6XxFNpi17xfeQq+63ASDa/l6HTgPNaFMA7zchN0eXPaAX+OfFs8CSQaMjnegeJLDhwbquBjkb83AYKhaoHBXrIiWjEKmKp8CVn3lUAapiDvN/cOuT7atU3pnx/xDokolcFjbRHPFkMXL6qDswOeQd3b5bHPX24TiB/A9EO8Z3Ez6FMA7zf17qmRfzyZ1ljMcB9M6DUWBzZZjmi94iRTEr1Z5MtUJc0LvLEqfQrMylSj+TnBIKF9U0b1crdXHA+n8OJMwWdMA7zf3DsuK1aR7s0dg22qu+k3docq9+15X4k1rVjFLQOMvNTXKFNsCTnzgXK2H2nnKFMf3Nq8VGqdb1pBq7Bx+ZzQvltd4e5ysjsLrm+3zW/9v5STAsYQ/ZM5K6MxrttacOsgvs2tE1vt2+6uxVORbxjYAO57E3wihbR6pKYB3m/uHZn0KYB3m/uHZn0KYB3m/uHZn0KYB3m/uHZn0KYB3m/uHZn0KYB3m/uHZn0KYB3m/uHZn0KYB3m/uHZn0KYB3m/uHZn0KYB3m/uHZn0KYB3m/uHZn0KYB3m/uHZn0KYB3m/uHZn0KYB3m/uHZn0KYB3m/uHZn0KYB3m/uHZn0KYB3m/uHZn0KYB3m/uHZn0KYB3m2AAD+/1gAAAAAAAAAAAAAAAAAABCZjPgodoAjTouVFd2uxsOc7/lfP+wU+hn68oPA+YypYdH0FTx1+M8v/4Ob7r4AomgCZ2PXZzS0+MLjB/teucNxMBuxmaaqepNOrLq/Wtmd7Wr+E5HI4H5XTYq19/dooGGjFu18hqSsgyVxx2ScoAbQGolNkVXQNZBk1n9Z1F//sembhJpacQ8JfES97PKhF8VHETCrGD9aYq3FzQRGA9mH/e8LgzhtayD852RXxKAQ4OwnhRwHx/1MpBLjj46rtYhu6iPIYLAM52rtyQP3U2JMt81gKWHmCXGVnEIqSmKTzNYAc0dBtCz0YHIfmZPkzt/30hRzieW9D3fCLKr3vbC07TNrhHxAqnQGOJdzoYFk8KubTjuG8wwMkbhbGvDy+SfyM/L/vGsFSzmht9a/SPAfzsnkd4Cs35kgP7UI1wpubxNxnh2ZgFyg0KNDJWo1upCs6i90wpR9B6Ny9YXYTYrdKhN1/ajg5JosU9Ry9pYjq4FP7q/c7jgo4LagWIx/T3i5qPuSfcMzGAe5/ApQ5sztx3f0fTLfg6v/lWYNNCfzhbuG84jYLFTUBE7Gbn9Q0NyPmDxWN/29kA/Qiki48LCPRaA/GHL2k211aJdWLxrvlu8FuSvcqj4DRyg3VMKHDXL0EVZC/ZqMyLnDcDbUpH1iFcLOgcBN/ks9dL43ZrwyJezGnGF9p6Y12SlYhIcylhiidEtUIFeMOmQzKHVNh5CUC1FQkNzsj3qiuCmYlWRYvj4UK/Nxmmm6XO3XgrNe4GkfWk1uafHPT6sLO/SzC5dZIlHLXKtZjn9p63O9qyehDNqqov8tibDcZAISA2L5UEIeMtUXkm+MSUtVjen/fwEkwjcAzpnVzhedz7v0ziM7PJ2KxdfMcLkMGkdFWNRBuDzuEsjWxdOuXU+VS2C4AyNaeSMZOEWNTVXQNGnxZvI+gs7sns7fXUuU+9cwbjOQpxrho2wivY4hgH0R5/XxZ249LTV9WfY6eiC2zV/Lazms7klcmkM7bj60V6ieHEaoo8n/H2ZNrahMCRbe6UDcm80nu85Jj4EQ6Zehb+6xGti24ccCHXFTn1xUDPz7AXziEba+yIXIyPihCHqubIKlJYSU47EspabhrpJ0lxu2EBZE7dNAzy1+uYD9aXgGkFMnlesWEUUOfOmhnsGMQwbPeJhN7qKtKiSPmkqJJkAdlDdxoBaFdRBr1Dna7U5qGw+/BQSkD/jHDuO53FxOmhD36GtoGvFJnyqaalVN/7B6pNvrVKRBSXv6toSys8jFyLhKrFh46esyXfgDSKN9TLOmeMrIn7ozzETzxtrzHlN0U7bsknW+S292GK9ypEbVhRgocRJs/ZunIxkpFF3GF/PUlyQFhLex/cmfayzb4zItxvlVuCHWcfG+z8ry6UEfxBe/0W6A4aAasDc5b9Tv3eeQvhMqjfFLk3JRjUmp/AIhABmPVqKB9s0WbhvW8vzxW+3V5Olo16ROLEBAG7tndiCR+o3vgltKtrH+1LRmL19G1RojNRrZSue5hucUypDwNscnH725eofFDrv7dEexkNBRTT3r+45Ocm5efRqvx4/YWlnrvwRELLiHasypDOsjTHLIjei8BRgxy75m52fTMjM32e9f/0ynSqVHibRBuXiz/yU7jyxjiEJSSwLGEzVoxpDymcZtsWM6RWhC4/eoMobxAxNH9Qg4xQMVx2ELqP6aCnMbsDxpvYnq5iA6vNp1D+q9FDjcI/60voQaPLKOyIwcPNMr33ycsDGCVq34+FX3crPgjHiNYDHojmqAGR4jfWvvpQZwiZiinijGPCuvy/egf//9u2AHkzfhR2pNet1dmZPiyrG3XIfPGpj+4mKmKkdNiUKapULwSr0pR7sE6ATJdcaYNAMoxtYZTMM1fcEUpt2h++NYPbd3LLj7n5NybuAZ7EWy0I05lJONMpXULpU/tJu4LelTGoHfaab9tvlkOwMlJmreO1ZGyTfnGhfnc0lRDPYrN+NC9DzI2cdWGfLtnsfjiaGn1vX+f6ppMeR6FQKk4mJaRdKUzz1KWByXKUfbuEQKTzmLIf+2o0f4aQfBHPGw3rKxhO+R9ThbyH6UlJaO66vJdOTnz1ka5fC2G+DbX6vs8YPZSqH7TFki7O5/zqZsSetfuVDtPkGGclE6G8oXyEMcPbbWgF/HnjAeDqFvlVLAZvwj0iCO+E0ka3WkEtJ+LPRCuRkPTgQpkQydKOTP6ckq2ahMIIGbw9E2qjsZOwMQxTFSt4sayINMMuHXsy2gUHNgjuzQSDQTIVOAXVC+sGQHHtMm+7SB9HVx5gOBnY7LDM7ryfeBfMdhPD/WQEBQzTCJXsWRu31jXvq1s4sHn5+j7iR8+H/Yb5n5oxQnHkDpNrka2/I6hBewyKxetNIM8NgSp7gcZFcviFRi4akeqWxHWdGBxTPDWOjaeLsJQv9pzdBjNGoSqEWc7EDEuFBJ/rs68uzZMw6oiCiXJBq9/SMesGhNoW7WGGKyRUB7EX77M2C00auZFE/JIkejseq3ejd+4AxNI9x3Pw3tofCURGyA6bBIXAL/SHfB7maoUEFSmgCUcoEbcgA/XWeGByVUdy826PQKFbpksweJLwpAZJANBlbwoVc8zvvg4aWcTNDtU89hVwfF3SKEICr+Rcb8ZuSluK5Xe7OPhycxlcfgR10V+CP1mbqwrhuxB95AAHcLKogcEdrvof7BH2AvmU7/s3SiubKCTTQQN5wdg9ntgRJ6+Nd6MSHceC56T2m5ne+UhX2ppTNRi+YE6TPCvSCGVK8FNyANtuhnjqEEVZv62Lik/PDVHh8l5GzQCvuh/BA39mFhygAhZDy/eLawehm/P+ym3HeI9JlX6PjZ1xxw3WQ3SvO9a2l/BSduDcG8fMTuCkmCDPj+4oW32RrV3192iiddeOyGYzTEIhFVy77V0D0lAJ07a4v0G8SkJqV3vkRRWyFXjtuRWaGosCHQXr5wPDCHNol/VUrBqXVA1NQVYMRUn25wlFsEjQPssJkEmsDYajY14kmZ5royWrAxVwKsAjc/yvaajw90LywTNfQKYyAIek/YYYgN37ag0eAH4iOs6pw+aKue1udkIDL8gmBtsv7PnxUFzyWAGaK0IoNy+RDuIqmJErVyCrAGa7tApWFGvlHBG3diF22aNx4+ZIc44KKyU5kmzciQ+X/HmW7/hMaUnrpf5TgYTUQSKWNQQhGek6bN+LRgMqoOuBtwEzo0SuR5cNafS5Yrzn9szRzR+dWGYqiGKMR87vp2Q6fQEpKkoiX/wwfWxkPbSIhSjgP9gmmHLxYwlJ/tn5llqP71P6Z1gu6ed18yGsUF7hfGI+7IRoQ0O+z7GRlR4p2Ga44YW0QP/zgAlES6Y0+mv6ZPF0TtujqDZKKpr/ttYGvouX3rHAxWtIgqyWt95kIOY5fsGbG4zjrZ+bcfBWwhCk/iEvYax02Zujp29BF9Ma6Zj5zkn+WoWbjuW4gbQZ7sF/oe+tgS6uzlZyYkHYqB/g9I7c4IoUBCQIy6k/7SAJmvHavny0qxbuL2vQKJs6Vai/eEIEpb2S/sb4VkTMX0Z0zzKI9NW6XbMO8zmmo4HWEzNB1tQwcvpw+x8dDHDnBe40xSkWJskxONXaqkTEPkBsMQbfelDIIG6P296fGeR3t+a+7akpKpWuWkXMUmyjVe71qmqkXSoDEftyFpl7F0rs/nfHOsC9EO6fMXI2VGVhYcFmBMfGzzEXrXNgXwLZxa7KRAaGAPxyo/kyKbGOh04W1Cpj1gcl/679POrVSMVgN6TUY4s3xyEsrKolXVXwgRirAO59duWcf8Fqf/i/cdXhem/8+kjlL6EDApNwbQ1HXqdshNl5cZL+/FTBJfSy6ZWk7osVVPo+rW1wLcDZfo7sP9MKAVn6kwHnXoCeRFRHei3mAkbdd0kK+fj5/7MuJHSgelTaivbPdaJXsi4on+vuFBTG5EW2+qAnxRtletTl6wsmcLjRAMkMUBcBdOE1Xqbf1LdMq5lEZbiHnietz8Bx+HdbfX/Bxy0WqMfivCKUxxMnIImKyhFSuRksO6ccYqey6yP3T1i0cMUHwIm5mJHlhzjpWBeUzCUZXXjUyijwQEhFJntYD6xkzfh08bTc7zl7UgY6OOT2tEtTNCDXuNi0SX2E8mFK6w8tmbOdMbaMiq65/9pF3cR84thrOQj3eXr9hC5LueLatP40wD7skJQdd9gMcjikZVx5Gn7/AhRc4Aq+Y74aELED2ZpIBZD+tX4SgbreAuJdU5K25cl953RDVbVSaUkvhdqY6OZlnk0Tf3v4+8zO2OeRk4597LEs+Cj2BiYimJ095CCxRbkXL4bhzHYijP+cBZQJo1dO+QEtuiuP9Po5KCyvjZy22WTnVPUoEI/dssvjC2ZnREUziIJsTJMEjymUfgRFh2Y9lCr/8sCz7Yh31mvTA9IzGILxLEbzLpmRRw764VyvRfn2GrUTLlsVysxXp3O7cflKm+9nFd6ZqiWqhDJR9w68DbDlGlWyzeKU+3AnlWqMpYG2bWMyLHk4X2oDddaYRSPw0k39LyFVlZF1UAVVWQoEVZ+w91zkHCY37NXJybWlkxqUoUEyhDXXxCTWLBVu3NstdpDCFGPS73PFMnXLrNG/lgCMITV5FLxZBCJqQQWVlYnTL/CegDvzkUrOrG63Dy4AeZDRUZ8ZgLhXMvJDv5FgANSV+0vsVCbfgto6o421D8RVIHWtEWsDLiLZm0FY0CQZPJigmetCEVl6dXynuwcFYahz8plID5GCEXG7cU+7YPznV0zIt7P2WnQUHe+qD0fy/zbBIViCIsxZFVEPFyjBLLvjjiMxopmNArpLGR/jwNK7aH0/fW2G5oGtS7xHmKrDGRXmGl9TSTuSswG/OobWf4uFNjzmY+Tiq4mVAE16m6uUK3+pzJdyEV4xmF09Q0ggvRHpHHMEDBvlJ61Pm+YUYjfOO4Om+paTCuaJkoZTFzwzlZeUnFvTeIqOcT2Xlf85q7IxWpNf6s+TiAT8InHbTESel0NAMUW6UvmEuLeSl5RyrWrve+0oCKWKOZbQisrUE7KoeU8Mp+J3Hk5rJ+MRv+Qytk9pus7xPKBzyEERIGoDhraHx1BCGeUFAOBkNu1q7+7xqOabdkqcHXi72Ndt/SrygZyzA8FYcD6YkMsVMd8hZGqLCoKP4G4tsj/okOsqw9e0Oro+Yu0BChfF7MpDO6I+Jb5sUGLocn2vjZO1ouE/n2/dw+f/IHhc+bsdV989S2RjSr/6MT+iGmSTciHN7ZRcYnQ23N5UzXA6gi2p0HKUEMmZE7kbq8y4lC9K/5Sn5USHdQJRGo3ze6KBo9oTdoAOZDcIPrSUjiY/lm3RkS8D7vssxEtEUAQQOwVBNKEruETQtDbBcE2JiHe+WvHapH/KeZB3rgqS6vOtqJurSImwutgFBtFSB4ESAYeNvNhDXuqbsCO5KBn/e526+q0E5EBVdxmQnI0Nd45+/mhtNNqebOvpOh+Zb7y0AFH/VGGGYGBkDjkc9BQ2k2h0v5J/yCnY2iZVbt7XJ0n9NPq3NrVzHYZqq9nYZMgHuvFTSb+xzSLlfQlPwgDf5olGXbbDXdot8fomtX+thBTGOddcQ9S6gjjJX9bqrQgjWUss3km3+E9o16kSa8x0q681kqrzEOkeIbhpJwxD/Jm1hCsTpPqc7K56NdfRKuPJd7eYnfeFGQ5cvnB8XJcxL+qwTAYGgQQXGkba0+cjbGRcR5n5Q9qsos8NQjrjv35ynvf3TKv37xPAAkp/S6xt85mS7tO3TtkERa1b8FD0AB9xaE/B5COYsgUoqirC7lyfgZzb/n7onZE2Z7HqYlWtRZhH0r8G8IuV+zNVP578eo2eoNtwISqXmrwI0Lt0/cD3sYNq1HQVfahgmuVPjsqLxvHITM2OSCYIU6ZscWDOdDncmGqlKM1Owr19nRbHFFuRu0BOFFV5bkutK4cpWHMrsji1n7T5rtIq2VPHApuFid1GtFdbpQQ/RpWR2svl8M24GJFuI7bbgVv377pg1srbsMWV861ukACrQMmA+PAJ6MRrnnp1MOPMnWfGyu6Q/NFE1b1O/5/b780tkL5kMmruOFBF+7Es94AGZEn8YhLL2GCuICRLeF3JYszAYA6RS66A63MMtyhI2EOev/p2/dgCsUiQB9W++QB3ic4MPlVN/ZpFvvLJrIgy8kK0YfRVA7HK/V+GcNSbVb/JbOqUa5NArYDhE9acsii7bse2xjKzj2e10K6sFr915qzh3E/hHNHWxnCWveaXZ12rwUCGQBIGwRc1xe//CrC0NzpsnK4cNa/YdVjGmKko+Wl7Z8SwvPBFXlGkV28IafFto6IZ56r15Jl7qYtIyZs5S9BJ/diXLEnU5/rRZr9ge94EK01ze3PEbs3fwJrdOMN0iNR16U5fjLYtUxNvx27te5bxzTRulooVo4tmu7xw3ifn7/A1wDaYJ1JaR/o3ZiGcIo2p4xzP8qEwLOg/b9Qkde5DwppEMVd///rSBXNVYOQxWDI5J/xbImbvGpwkaETtxqRoaCycyZ5dU5uJMyTiRdP4oa3AgXWd2hANZ8zdoiDkW7sqp87u/r93dTX3mZvZsjXxla8+djaH1qUH+7ftA98S3jmiC4lPxjvEhhtImBQAlYOD1QFd7eDQ6ZUjO46Cf/ODt83oyUeZW9eiiOxbc9OEfzZD9PkOIe1C2n9OOq+Gk6NfNctlItyfAx2Ttlqo892PiJGfGF3wo/+qz6RXBK4nq4BYHzGMCNDbi89WL/McbzcCXxRGzah+AGdVO4fIcaGTbUGO1fB9KlAGrV4aLBpgT6QPtqcfCuu7vENys4NId+tRJHJIpOG5hi/pPoZ8w3V5nAWTgwRaNkJml+9fXljr9pCKvrQBU6po82aFp7pohPb+990b1By6SQJtbXcqfZQXuhspWIKGcUyIuJKUvO3XTcBDbT+64uQ2kVXTc/cBf/9yJnneio3ngoGNuF9ddO1j6vvtpfIUqh7X3l/v8/RqCUdfqYaC6dtH+TD3QsB7mYVkIvevLQz3SS+uDCZy6ZKaELzZ8KbR8IxSZ5msOOe6o+UPEjQFUw5flCz+6/BBqtXxMcIkPJEfda5/ukYAK/EsK5PxD/yGj+XQ04tKdZQ/y6nH4gbJxfj7gq6nFWiKvRSvdyOuTQRh+AsAknJjZQarWx+CTKAOS6RCTn2qV+5DeunwlhhULqzKVIDXz2764bv4WCDzvkBo/n/mEGbiInIb61tcYHGpYwA/DHesbW/Ye4swCOfr3IQD2Ugh6Sg+QXG3IwHco2TJjtlUmfxZngyJgZ7RkKSp81FdmRsQRK0ZOXeFTpkJDo/7wjzv/sm0c4lMgaO8yyPjnxoVmdzIZqTKjXsRHfqTn/cqXe7vgsLicaVNw5Io6mLaE7Jwn+daylfB+tKw5veaKlZ04Digy4rOi6HlRqTgk/s5NlO/71DibeDOuNLE/Y9fWfxMcnaNfgtdDuzG/Q9N3kt3QrzRUrHGqC09m0ZMxnbmYt//M43RzKobE7JRrc4m9N3uqjuv0idbgnU+glo5tk4mTZdzdNl3x0INstD7vHPBm1QS9SsHJKB3eESNcgdejEpsqhr0vUXfR/eNJyovccLhEVsrdd6W/m16Kj+rw3NICZVHKdtG1dtl6umlEjzBtRT7tGWh5SuQ0l6TtLhVI4T2eG8re+dEOh0GwnaOezL+Drm36aWzTdaZ/jRHorSGHXszgVQ+qTVqBoxajvbLsZeSdtyZqjCqpx2AaaI+fLqlm1bhuV99uKG0uGKcPvk9T7s8kgy3GfUmfa3es4bkUSrWYyIgv7wYulwapGp6nFjd4bfU1j971JQ1j4Mv25eEdWNTzrYDoef2T7KIOM7+3LwYT5m3iLl1vhxS4glDXuXLZusykeKLzlC/V7iO0p3g+Dyof9YZKIzwm46nxrQHVER6UA+bNJa/RrDvtMJJuA3MQFd8of/3oZARGRvWfuLqgaN1CGU8D8oD7MRialmUJLqnn9j5V30EIF8E3VG8sPVQd+pyuatrEtPLm2C62uqFFU35HuOqSaR1sqGZn773h8Se/JxHSiBonFI96IVJa9bKvBnsUdN94syOo5CXrREz/wBUn+cGHxfZqPONEATgAvTLG+LTEVOOZKTFR6cJRBc8VZksT9I3RUR969Ox4RQvnsdDSbrJAVkEDtYg+MY74UWXU3zgyB3IKJxeaF1G2F38xDu3Q8EtJOy8Hn4MDzJR3GQs2QTQYwgxjNaymYZ1pjvf0avmTabeU5/FIlcqCwNwiAGN/TP0o30US5mK6ZAKcCn/EXC5+Jhl7pAuAt6UnaMvxYHpokRkDF4kx76ljws7Mov2mGtSBnoNxB3HBBP+tkfaDkFCrLnWgH2NKIU44l7W/rSTAw10521yOsuVJ+MagwAtbYyx9qBpcq8+wkEZMPmpGuYeHqTYGHeVGQa/yEq68n7z/18Tl5dagBm8nk+foEC8PiKAo2I0d8B5TRYI+wPZKEGIJtdX6FN3keST5whtTmukGHjFyp1Yernyx4zyT4IVMEQQfKmOOCxS/zBnFFqqdjlVlZeiZduypDkdcWzWaADTn2GiuXZZoq+wbnwN9Toj0HYaAFSAM16ddnOyDS8qKrMgW5w+IDolJSsQtJwCMpLxlbqAr57wDEcSEb0bpjCoPI4dRL3A18apZG5x19+5A/Z0f2ZKsHy0M9ncEkU/xa1oD/1Hk17lK1HRCxhJ2FuDsZN+cKGz0icse2jTrVptJifRVIe55qIUWDykJ4jrUAnMxuWCzrsr/AaVVFtDtR06uwkAysFtebavao7f6TrQvenoiERyfetZ6g4Qn9KJj/c0rqpbXXA8yEqzCBO9ZYxPWYQFbNQ+4YrpsTxgofvAsTAc0KlGSlGoSFvbi98Xr8StQHVS/hj8hse7ILNtI1EDNrOAMhsEKtGXMyb2VKGy+XIId1+t5djjWa1O6OJo4JuSws2qdqQn+b54QH+1tUNLQMeKpBCg6qvs4U5eHxx59mDCINJ2jxxcPrZDa0k5hBDN6XipWzyaCuptS960enoSkyucqlQXJ0RjHrplvjrrfJNmeAUTFDUiwgnSFaTpPGylpAoGJaL+Bw43hqoePaMCshCdP+nY9FvCoEKQir7bWC4RBfyQJvoUUFPS0P47rt7IRIykBgJ3dAHo6T4xXe0GWwF+Yg/iLoJcxbmtrt3w0z0Xo7LsHty890tki6fu3qVYRmydiTbaGsAUmOuTSIyDpNgO85YhKJJNiJXHWfPw+ApCISXKONjFzr+aCr6Oi7rohqOqLi2J8LSXkt+9xADHm7i3CbPaDmdIMvYHkhDvFNOtsm5VMTUqZxXLF2XyKIcR5rN9PYoJU61aWpWO7u3OzDze7V4jIrUwm1UO844vPOhxwLtEHD2y3dKocmS/Z1N3N+TvuyXKdll0X4k/FGVRgb5lf4+Vikn9c3yo5qFEPbg/wtBBdjMZmMisCjrusqZZ3oqfV9VeZEv6Rqn/BkWBsEGvxrGrWf0Z364A9e7Q4P2rbDxT8FOLtIPU107Q6Silb7ndXbdLF7rfeUvs1Ty55U0ZoPYDziZXxIDuLYwG/n2rgDBq5BQbw3MawbiGfoF/tKPEYIVycFgJFZ/sbQRj1Kh4aqWuKqGmpdc2zdD+GKlNVAveFB/TiBOS+kil872KmzPnVvQa3r+rEI+EZ2A7gFtyT/oXFmcfy6wnQGGprLHQZWk7Om26Aw/nUyiUvL92gH3wlbBQgtTiWfUgIp/5hRxExV+WAX8DplejmGxCe1nxu0mN3iJuQOtLlz/+n00blPCpEUZs92WK2zo6ErHtmJWaKgwHIA7PGd+hSGSOHpADR73RFuxI2lEdYTNRHxIjDcrq4c3AVZEIifPXSwVyD7oUE+Sf4cPSVwRdnUK6Kb/1DPEcoB0vZWURE7U5MaRwcmfSUwQnhAMJk2qmy7LsnRnfUZTezcNqzDuhBzRClLhBWoT7PHEsKClpny1niN3RACSe6qnsNBRk7fxa2XOWUHuj/SsfmihyS+9eAQCupBshObq/oUACM8QGpaPN7yv+/vDh2T9ehLKA4e6QxvXFKuT7y7+LEknKrNjG+rpW7pxp8U2meaqIKbWfe6pxKOp+IdzTxZ1VwEkNgVSqOPbAXCpte/FCIeqg/taGYEVkO9/jQALQ4GYDm5Y8J1rgviM/dfW6H5t2EncfqxIhYFvYuxBrzX6Tpg+2l5Y2KTEKLdLVIG//Nzpb+UvgEwt6N8j/DKza9FsR25Df3KgV/Uw0XTlNFUkvxDNJdJta61PN/y7WyDyX4pmiB/lqhs2sGhwddyvIQJFRhYUF1zVWVjfUufWaG9zkFtxCJVKVLpeVfQv4cIrx1lsZ7XzeTCcRgy2V5u8D6gE4DkBM/sgR+C7bpW4kT3DThFXXpjiPe4x+yIrKoWHNJMh6eCsM4J/ieavEALrZaiENVoDcF6/QkcHlSuKyAmFwoF0i4bAwfzcwR/Fx9bLSkXGWhVkr/NX7XLTJOJFAj9fQUKjg3mCiYY3PEt7kcT7GERd2Keq8SKBH6+dE3olJKcYb3EaBWAu6xhTiwhcZtniN+y1il1ZMHjiYfjjKwWTeHCeugO/FfFXLeieYiata3XZDEqaZFUBcuS7MhZY/XXKzjpC6JrZ+ZyWYehdACgqCTy5w+A+8sGnbxDtvtCByeCd8+zcNY/uHYBCHcZ4xBzl5bEnYA8qEbGFHym9ctYW2k1Ovo4+wDsBz0p3dNVjZQDY9XocjlBSJ7GYP/HUXYC+ymAYlkLoyDe78nQTJUq3pKOU3lj3XiPpSWdHuxGsIJwqLb0s2brGxtoKjaWWGYUzY/r2Urd0KQFbjocry3oHK9YWEpRVMc6KJ3h8i2hsMjnlr1wfr/+HLv4PWt1Cs0XQAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==)` });
			});
			delegated("click", button_1, openCurrent);
			append($$anchor, div_1);
		};
		if_block(node, ($$render) => {
			if (get(phase) === "revealing") $$render(consequent);
			else $$render(alternate_7, -1);
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
	var root$31 = from_html(`<span class="rl-n"> </span>`);
	var root_1$30 = from_html(`<button><span class="rl-dot"></span> <span class="rl-name rl-full"> </span><span class="rl-code" aria-hidden="true"> </span><!></button>`);
	var root_2$24 = from_html(`<span class="rl-sep" aria-hidden="true"></span><!>`, 1);
	var root_3$19 = from_html(`<div><button><span class="rl-name">Toutes</span><!></button> <!> <!></div>`);
	function RarityChips($$anchor, $$props) {
		push($$props, true);
		let value = prop($$props, "value", 3, ""), counts = prop($$props, "counts", 3, null), total = prop($$props, "total", 3, null), scroll = prop($$props, "scroll", 3, false), cls = prop($$props, "class", 3, "");
		const row = (node, on) => on ? scrollRow(node) : void 0;
		var div = root_3$19();
		var button = child(div);
		let classes;
		var node_1 = sibling(child(button));
		var consequent = ($$anchor) => {
			var span = root$31();
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
				var button_1 = root_1$30();
				let classes_1;
				var span_1 = child(button_1);
				var span_2 = sibling(span_1, 2);
				var text_1 = only_child(span_2, true);
				var span_3 = sibling(span_2);
				var text_2 = only_child(span_3, true);
				var node_4 = sibling(span_3);
				var consequent_1 = ($$anchor) => {
					var span_4 = root$31();
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
			var fragment_1 = root_2$24();
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
	var root$30 = from_html(`<span><span class="pick-check"><!></span></span>`);
	function PickMark($$anchor, $$props) {
		let on = prop($$props, "on", 3, false);
		var span = root$30();
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
	var root$29 = from_html(`<span class="spin search-ico" role="status" aria-label="Recherche en cours"></span>`);
	var root_1$29 = from_html(`<button class="search-clear" aria-label="Effacer la recherche"><!></button>`);
	var root_2$23 = from_html(`<div class="search-wrap"><!> <input class="search" type="search"/> <!></div>`);
	function SearchBox($$anchor, $$props) {
		push($$props, true);
		let value = prop($$props, "value", 15, ""), loading = prop($$props, "loading", 3, false);
		var div = root_2$23();
		var node = child(div);
		var consequent = ($$anchor) => {
			append($$anchor, root$29());
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
			var button = root_1$29();
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
			clear() {
				for (const p of pending.splice(0)) seen.delete(p.key);
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
			queue.push(card.id, () => marketValueFor(card).then((v) => onvalue(card.id, v, card)));
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
			destroy: () => {
				io?.disconnect();
				queue.clear();
			}
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
			watch: lazy.watch,
			destroy: lazy.destroy
		};
	}
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
		async refresh(merge = (old, fresh) => fresh) {
			const token = this.#token;
			try {
				const d = await this.fetchPage(this.loaded);
				if (token === this.#token) this.data = merge(this.data, d);
			} catch {}
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
	var PageStream = class {
		#items = state([]);
		get items() {
			return get(this.#items);
		}
		set items(value) {
			set(this.#items, value);
		}
		#meta = state(null);
		get meta() {
			return get(this.#meta);
		}
		set meta(value) {
			set(this.#meta, value);
		}
		#hasMore = state(false);
		get hasMore() {
			return get(this.#hasMore);
		}
		set hasMore(value) {
			set(this.#hasMore, value, true);
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
		#started = state(false);
		get started() {
			return get(this.#started);
		}
		set started(value) {
			set(this.#started, value, true);
		}
		#first = state(false);
		get first() {
			return get(this.#first);
		}
		set first(value) {
			set(this.#first, value, true);
		}
		#page = -1;
		#token = 0;
		#ids = new Set();
		constructor(fetchPage) {
			this.fetchPage = fetchPage;
		}
		show({ items, hasMore, ...meta }) {
			this.items = items;
			this.#ids = new Set(items.map((r) => r.id));
			this.meta = meta;
			this.hasMore = !!hasMore;
			this.started = true;
		}
		reset() {
			this.#token++;
			this.#page = -1;
			this.hasMore = false;
			return this.#load(0);
		}
		more() {
			if (this.loading || !this.hasMore) return;
			return this.#load(this.#page + 1);
		}
		async #load(page) {
			const token = this.#token;
			this.loading = true;
			this.first = !page;
			this.error = false;
			try {
				const { items, hasMore, ...meta } = await this.fetchPage(page);
				if (token !== this.#token) return;
				if (!page) this.#ids = new Set();
				const fresh = items.filter((r) => !this.#ids.has(r.id));
				for (const r of fresh) this.#ids.add(r.id);
				this.items = page ? [...this.items, ...fresh] : fresh;
				if (!page) this.meta = meta;
				this.#page = page;
				this.hasMore = !!hasMore;
				this.started = true;
			} catch {
				if (token === this.#token) this.error = true;
			} finally {
				if (token === this.#token) this.loading = false;
			}
		}
		update(row) {
			this.items = this.items.map((r) => r.id === row.id ? row : r);
		}
		drop(ids) {
			const gone = new Set(ids);
			this.items = this.items.filter((r) => !gone.has(r.id));
		}
	};
	var root$28 = from_html(`<div class="empty"><b>Impossible de charger la collection.</b><div>Vérifiez que vous êtes connecté, puis réessayez.</div><button class="btn">Réessayer</button></div>`);
	var root_1$28 = from_html(`<span class="sync"><span class="spin"></span>Chargement de votre collection</span>`);
	var root_2$22 = from_html(`<option> </option>`);
	var root_3$18 = from_html(`<div class="isel" title="Étiquette"><!> <select aria-label="Étiquette"><option>Étiquettes</option><option>Sans étiquette</option><!></select></div>`);
	var root_4$18 = from_html(`<button class="iconbtn"> </button>`);
	var root_5$18 = from_html(`<div class="sort-hint"> </div>`);
	var root_6$17 = from_html(`<button title="Cartes favorites"><!><span class="rl-name">Favoris</span></button>`);
	var root_7$16 = from_html(`<button></button>`);
	var root_8$15 = from_html(`<div class="rarity-panel"><div class="rarity-meter" role="img" aria-label="Répartition par rareté"></div> <!></div>`);
	var root_9$14 = from_html(`<div class="wc skeleton"></div>`);
	var root_10$12 = from_html(`<div class="grid"></div>`);
	var root_11$12 = from_html(`<b>Aucune carte ne correspond</b><div>Essayez un autre filtre ou une autre recherche.</div>`, 1);
	var root_12$12 = from_html(`<b>Rien ici pour l'instant</b><div>Ouvrez un paquet pour commencer votre collection.</div>`, 1);
	var root_13$12 = from_html(`<div class="empty"><!></div>`);
	var root_14$10 = from_html(`<button><!> <!></button>`);
	var root_15$10 = from_html(`<div class="grid-more" aria-hidden="true"></div>`);
	var root_16$10 = from_html(`<div class="empty"><span class="modal-msg">Impossible de charger la suite.</span><button class="btn">Réessayer</button></div>`);
	var root_17$10 = from_html(`<div></div> <!>`, 1);
	var root_18$9 = from_html(`<div class="coll-head"><div><h1>Ma collection</h1> <div class="meta"><!></div></div> <div class="coll-tools"><!> <div class="tool-actions"><div class="isel" title="Trier les cartes"><!> <select aria-label="Trier"></select></div> <!> <!> <button><!><span> </span></button></div></div></div> <!> <!> <!>`, 1);
	var root_19$7 = from_html(`<span class="bulk-text"> <b> </b> ?</span> <button class="btn">Annuler</button> <button class="btn danger"> </button>`, 1);
	var root_20$6 = from_html(`<span class="bulk-text"> </span> <button class="btn danger"> </button>`, 1);
	var root_21$6 = from_html(`<div class="bulk-bar"><!></div>`);
	var root_22$4 = from_html(`<!> <!> <!>`, 1);
	function Collection($$anchor, $$props) {
		push($$props, true);
		const SORTS = [
			["rarity", "Rareté"],
			["recent", "Récentes"],
			["name", "Nom"]
		];
		const prefs = settings.collection;
		let filter = state(proxy(prefs.filter));
		let search = state("");
		let sort = state(proxy(SORTS.some(([id]) => id === prefs.sort) ? prefs.sort : "rarity"));
		let favOnly = state(!!prefs.favOnly);
		let tagFilter = state("");
		user_effect(() => Object.assign(prefs, {
			filter: get(filter),
			sort: get(sort),
			favOnly: get(favOnly)
		}));
		tags.load();
		let selected = state(null);
		let query = state("");
		debouncedSearch(() => get(search), (q) => set(query, q, true));
		const serverSort = user_derived(() => get(favOnly) ? "starred" : get(sort));
		const stream = new PageStream(async (page) => {
			const d = await myCardsPage({
				page,
				q: get(query) || void 0,
				rarity: get(filter) === "ALL" ? void 0 : get(filter),
				sort: get(serverSort),
				tag: get(tagFilter) || void 0
			});
			if (get(serverSort) !== "starred") return d;
			const items = d.items.filter((it) => it.starred);
			return {
				...d,
				items,
				hasMore: d.hasMore && items.length === d.items.length
			};
		});
		const first = savedFirstPage();
		if (first && get(filter) === "ALL" && get(sort) === "rarity" && !get(favOnly) && !get(tagFilter)) stream.show(first);
		user_effect(() => {
			get(query), get(filter), get(serverSort), get(tagFilter);
			untrack(() => stream.reset());
		});
		const counts = user_derived(() => stream.meta?.counts ?? {});
		const total = user_derived(() => Object.values(get(counts)).reduce((a, b) => a + b, 0));
		let values = proxy({});
		const lazy = lazyValues((id, v) => values[id] = v);
		user_effect(() => () => lazy.destroy());
		function changed(gone = null) {
			if (gone) {
				collectionRemove(gone);
				stream.drop(gone);
			} else {
				forgetCollection();
				stream.reset();
			}
		}
		function rowChanged(row) {
			(!get(favOnly) || row.starred) && (!get(tagFilter) || (get(tagFilter) === "none" ? !row.tags.length : row.tags.some((t) => t.id === get(tagFilter)))) ? stream.update(row) : stream.drop([row.id]);
			collectionRemove();
		}
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
			if (get(bulkBusy)) return;
			set(bulkBusy, true);
			try {
				const r = await data.bulkDiscard([...get(picked)]);
				const kept = new Set(r.failed || []);
				changed([...get(picked)].filter((id) => !kept.has(id)));
				if (kept.size) changed([...kept]);
				set(bulkMsg, `${r.discarded_count} carte${r.discarded_count > 1 ? "s" : ""} défaussée${r.discarded_count > 1 ? "s" : ""}` + (kept.size ? `, ${kept.size} déjà partie${kept.size > 1 ? "s" : ""} ailleurs` : ""));
			} catch (e) {
				set(bulkMsg, e.message || "La défausse a échoué.", true);
				changed();
			}
			set(bulkBusy, false);
			toggleSelecting();
			$$props.onwallet?.();
		}
		const rows = user_derived(() => stream.items);
		const allPicked = user_derived(() => get(rows).length > 0 && get(rows).every((it) => get(picked).has(it.id)));
		const plural = (n, word) => `${n.toLocaleString("fr")} ${word}${n > 1 ? "s" : ""}`;
		var fragment = root_22$4();
		var node = first_child(fragment);
		var consequent = ($$anchor) => {
			var div = root$28();
			var button = sibling(child(div), 2);
			reset(div);
			delegated("click", button, () => stream.reset());
			append($$anchor, div);
		};
		var alternate_3 = ($$anchor) => {
			var fragment_1 = root_18$9();
			var div_1 = first_child(fragment_1);
			var div_2 = child(div_1);
			var div_3 = sibling(child(div_2), 2);
			var node_1 = child(div_3);
			var consequent_1 = ($$anchor) => {
				append($$anchor, root_1$28());
			};
			var alternate = ($$anchor) => {
				var text$5 = text();
				template_effect(($0) => set_text(text$5, $0), [() => plural(get(total), "carte") + (get(query) ? ` pour « ${get(query)} »` : "")]);
				append($$anchor, text$5);
			};
			if_block(node_1, ($$render) => {
				if (!stream.started) $$render(consequent_1);
				else $$render(alternate, -1);
			});
			reset(div_3);
			reset(div_2);
			var div_4 = sibling(div_2, 2);
			var node_2 = child(div_4);
			{
				let $0 = user_derived(() => get(search).trim() !== get(query) || stream.loading && !stream.items.length);
				SearchBox(node_2, {
					get loading() {
						return get($0);
					},
					placeholder: "Rechercher une carte...",
					get value() {
						return get(search);
					},
					set value($$value) {
						set(search, $$value, true);
					}
				});
			}
			var div_5 = sibling(node_2, 2);
			var div_6 = child(div_5);
			var node_3 = child(div_6);
			Icon(node_3, { name: "sort" });
			var select = sibling(node_3, 2);
			each(select, 21, () => SORTS, ([id, label]) => id, ($$anchor, $$item) => {
				var $$array = user_derived(() => to_array(get($$item), 2));
				let id = () => get($$array)[0];
				let label = () => get($$array)[1];
				var option = root_2$22();
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
			reset(div_6);
			var node_4 = sibling(div_6, 2);
			var consequent_2 = ($$anchor) => {
				var div_7 = root_3$18();
				var node_5 = child(div_7);
				Icon(node_5, { name: "tag" });
				var select_1 = sibling(node_5, 2);
				var option_1 = child(select_1);
				option_1.value = option_1.__value = "";
				var option_2 = sibling(option_1);
				option_2.value = option_2.__value = "none";
				each(sibling(option_2), 17, () => tags.list, (t) => t.id, ($$anchor, t) => {
					var option_3 = root_2$22();
					var text_2 = only_child(option_3, true);
					var option_3_value = {};
					template_effect(() => {
						set_text(text_2, get(t).name);
						if (option_3_value !== (option_3_value = get(t).id)) option_3.value = (option_3.__value = option_3_value) ?? "";
					});
					append($$anchor, option_3);
				});
				reset(select_1);
				init_select(select_1);
				reset(div_7);
				bind_select_value(select_1, () => get(tagFilter), ($$value) => set(tagFilter, $$value));
				append($$anchor, div_7);
			};
			if_block(node_4, ($$render) => {
				if (tags.list?.length) $$render(consequent_2);
			});
			var node_7 = sibling(node_4, 2);
			var consequent_3 = ($$anchor) => {
				var button_1 = root_4$18();
				var text_3 = only_child(button_1, true);
				template_effect(() => set_text(text_3, get(allPicked) ? "Tout désélectionner" : "Tout sélectionner"));
				delegated("click", button_1, () => {
					pickSound(get(allPicked));
					set(picked, get(allPicked) ? new Set() : new Set(get(rows).map((it) => it.id)), true);
				});
				append($$anchor, button_1);
			};
			if_block(node_7, ($$render) => {
				if (get(selecting)) $$render(consequent_3);
			});
			var button_2 = sibling(node_7, 2);
			let classes;
			var node_8 = child(button_2);
			Icon(node_8, { name: "select" });
			var text_4 = only_child(sibling(node_8), true);
			reset(button_2);
			reset(div_5);
			reset(div_4);
			reset(div_1);
			var node_9 = sibling(div_1, 2);
			var consequent_4 = ($$anchor) => {
				var div_8 = root_5$18();
				var text_5 = only_child(div_8, true);
				template_effect(() => set_text(text_5, get(bulkMsg)));
				append($$anchor, div_8);
			};
			if_block(node_9, ($$render) => {
				if (get(bulkMsg)) $$render(consequent_4);
			});
			var node_10 = sibling(node_9, 2);
			var consequent_6 = ($$anchor) => {
				var div_9 = root_8$15();
				{
					const extras = ($$anchor) => {
						var button_3 = root_6$17();
						let classes_1;
						Icon(child(button_3), {
							name: "star",
							width: 1.7,
							class: "rl-ico"
						});
						next();
						reset(button_3);
						template_effect(() => classes_1 = set_class(button_3, 1, "rl special fav", null, classes_1, { on: get(favOnly) }));
						delegated("click", button_3, () => set(favOnly, !get(favOnly)));
						append($$anchor, button_3);
					};
					var div_10 = child(div_9);
					each(div_10, 21, () => RARITIES_DESC, index, ($$anchor, r) => {
						var fragment_3 = comment();
						var node_12 = first_child(fragment_3);
						var consequent_5 = ($$anchor) => {
							var button_4 = root_7$16();
							let classes_2;
							template_effect(($0) => {
								classes_2 = set_class(button_4, 1, "rm-seg", null, classes_2, {
									sel: get(filter) === get(r),
									dim: get(filter) !== "ALL" && get(filter) !== get(r)
								});
								set_style(button_4, `--rc:var(--r-${$0 ?? ""}); flex-grow:${get(counts)[get(r)] ?? ""}`);
								set_attribute(button_4, "title", `${RNAME[get(r)] ?? ""} : ${get(counts)[get(r)] ?? ""}`);
								set_attribute(button_4, "aria-label", `${RNAME[get(r)] ?? ""} : ${get(counts)[get(r)] ?? ""}`);
							}, [() => get(r).toLowerCase()]);
							delegated("click", button_4, () => set(filter, get(filter) === get(r) ? "ALL" : get(r), true));
							append($$anchor, button_4);
						};
						if_block(node_12, ($$render) => {
							if (get(counts)[get(r)]) $$render(consequent_5);
						});
						append($$anchor, fragment_3);
					});
					reset(div_10);
					var node_13 = sibling(div_10, 2);
					{
						let $0 = user_derived(() => get(filter) === "ALL" ? "" : get(filter));
						RarityChips(node_13, {
							get value() {
								return get($0);
							},
							get counts() {
								return get(counts);
							},
							get total() {
								return get(total);
							},
							onchange: (r) => set(filter, r || "ALL", true),
							get children() {
								return extras;
							}
						});
					}
					reset(div_9);
				}
				append($$anchor, div_9);
			};
			if_block(node_10, ($$render) => {
				if (get(total) > 0) $$render(consequent_6);
			});
			var node_14 = sibling(node_10, 2);
			var consequent_7 = ($$anchor) => {
				var div_11 = root_10$12();
				each(div_11, 20, () => Array(10), index, ($$anchor, _) => {
					append($$anchor, root_9$14());
				});
				reset(div_11);
				append($$anchor, div_11);
			};
			var consequent_9 = ($$anchor) => {
				var div_13 = root_13$12();
				var node_15 = child(div_13);
				var consequent_8 = ($$anchor) => {
					var fragment_4 = root_11$12();
					next();
					append($$anchor, fragment_4);
				};
				var alternate_1 = ($$anchor) => {
					var fragment_5 = root_12$12();
					next();
					append($$anchor, fragment_5);
				};
				if_block(node_15, ($$render) => {
					if (get(query) || get(filter) !== "ALL" || get(favOnly) || get(tagFilter)) $$render(consequent_8);
					else $$render(alternate_1, -1);
				});
				reset(div_13);
				append($$anchor, div_13);
			};
			var alternate_2 = ($$anchor) => {
				var fragment_6 = root_17$10();
				var div_14 = first_child(fragment_6);
				let classes_3;
				each(div_14, 21, () => get(rows), (it) => it.id, ($$anchor, it) => {
					var button_5 = root_14$10();
					let classes_4;
					var node_16 = child(button_5);
					Card(node_16, {
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
					var node_17 = sibling(node_16, 2);
					var consequent_10 = ($$anchor) => {
						{
							let $0 = user_derived(() => get(picked).has(get(it).id));
							PickMark($$anchor, { get on() {
								return get($0);
							} });
						}
					};
					if_block(node_17, ($$render) => {
						if (get(selecting)) $$render(consequent_10);
					});
					reset(button_5);
					action(button_5, ($$node, $$action_arg) => lazy.watch?.($$node, $$action_arg), () => get(it).card);
					template_effect(($0) => {
						classes_4 = set_class(button_5, 1, "card-btn", null, classes_4, {
							picking: get(selecting),
							picked: $0
						});
						set_attribute(button_5, "aria-label", get(it).card.title);
					}, [() => get(selecting) && get(picked).has(get(it).id)]);
					delegated("click", button_5, () => onCardClick(get(it)));
					append($$anchor, button_5);
				});
				reset(div_14);
				var node_18 = sibling(div_14, 2);
				var consequent_11 = ($$anchor) => {
					var div_15 = root_15$10();
					action(div_15, ($$node, $$action_arg) => inView?.($$node, $$action_arg), () => ({
						onEnter: () => stream.more(),
						key: `${get(rows).length}:${stream.loading}`
					}));
					append($$anchor, div_15);
				};
				var consequent_12 = ($$anchor) => {
					var div_16 = root_16$10();
					var button_6 = sibling(child(div_16));
					reset(div_16);
					delegated("click", button_6, () => stream.more());
					append($$anchor, div_16);
				};
				if_block(node_18, ($$render) => {
					if (stream.hasMore && !stream.error) $$render(consequent_11);
					else if (stream.error) $$render(consequent_12, 1);
				});
				template_effect(() => classes_3 = set_class(div_14, 1, "grid", null, classes_3, { dim: stream.loading && stream.first }));
				append($$anchor, fragment_6);
			};
			if_block(node_14, ($$render) => {
				if (!stream.started) $$render(consequent_7);
				else if (!get(rows).length && !stream.loading) $$render(consequent_9, 1);
				else $$render(alternate_2, -1);
			});
			template_effect(() => {
				classes = set_class(button_2, 1, "iconbtn", null, classes, { on: get(selecting) });
				set_text(text_4, get(selecting) ? "Annuler" : "Sélectionner");
			});
			bind_select_value(select, () => get(sort), ($$value) => set(sort, $$value));
			delegated("click", button_2, toggleSelecting);
			append($$anchor, fragment_1);
		};
		if_block(node, ($$render) => {
			if (stream.error && !stream.started) $$render(consequent);
			else $$render(alternate_3, -1);
		});
		var node_19 = sibling(node, 2);
		var consequent_14 = ($$anchor) => {
			var div_17 = root_21$6();
			var node_20 = child(div_17);
			var consequent_13 = ($$anchor) => {
				var fragment_8 = root_19$7();
				var span_2 = first_child(fragment_8);
				var text_6 = child(span_2);
				var text_7 = only_child(sibling(text_6), true);
				next();
				reset(span_2);
				var button_7 = sibling(span_2, 2);
				var button_8 = sibling(button_7, 2);
				var text_8 = only_child(button_8, true);
				template_effect(($0, $1) => {
					set_text(text_6, `Défausser ${$0 ?? ""} contre `);
					set_text(text_7, $1);
					button_7.disabled = get(bulkBusy);
					button_8.disabled = get(bulkBusy);
					set_text(text_8, get(bulkBusy) ? "Défausse..." : "Confirmer");
				}, [() => plural(get(picked).size, "carte"), () => plural(get(picked).size, "point")]);
				delegated("click", button_7, () => set(bulkConfirm, false));
				delegated("click", button_8, bulkDiscard);
				append($$anchor, fragment_8);
			};
			var alternate_4 = ($$anchor) => {
				var fragment_9 = root_20$6();
				var span_3 = first_child(fragment_9);
				var text_9 = only_child(span_3);
				var button_9 = sibling(span_3, 2);
				var text_10 = only_child(button_9);
				template_effect(() => {
					set_text(text_9, `${get(picked).size ?? ""} sélectionnée${get(picked).size > 1 ? "s" : ""}`);
					set_text(text_10, `Défausser · +${get(picked).size ?? ""} pts`);
				});
				delegated("click", button_9, () => set(bulkConfirm, true));
				append($$anchor, fragment_9);
			};
			if_block(node_20, ($$render) => {
				if (get(bulkConfirm)) $$render(consequent_13);
				else $$render(alternate_4, -1);
			});
			reset(div_17);
			append($$anchor, div_17);
		};
		if_block(node_19, ($$render) => {
			if (get(selecting) && get(picked).size > 0) $$render(consequent_14);
		});
		var node_21 = sibling(node_19, 2);
		var consequent_15 = ($$anchor) => {
			CardModal($$anchor, {
				get item() {
					return get(selected);
				},
				onclose: () => set(selected, null),
				onaction: (kind) => {
					changed(kind === "unsure" ? null : [get(selected).id]);
					$$props.onwallet?.();
				},
				onchange: rowChanged
			});
		};
		if_block(node_21, ($$render) => {
			if (get(selected)) $$render(consequent_15);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate(["click"]);
	var root$27 = from_html(`<span class="spin"></span>`);
	var root_1$27 = from_html(`<div class="pager"><button class="btn pager-btn"><!>Précédent</button> <span class="pager-info"> </span> <button class="btn pager-btn">Suivant<!></button></div>`);
	function Pager($$anchor, $$props) {
		push($$props, true);
		let loading = prop($$props, "loading", 3, false);
		let dir = state(0);
		const go = (d) => {
			set(dir, d, true);
			$$props.ongo($$props.page + d);
		};
		var div = root_1$27();
		var button = child(div);
		var node = child(button);
		var consequent = ($$anchor) => {
			append($$anchor, root$27());
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
			append($$anchor, root$27());
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
	var root$26 = from_html(`<option> </option>`);
	var root_1$26 = from_html(`<button></button>`);
	var root_2$21 = from_html(`<div class="rarity-panel"><div class="rarity-meter" role="group" aria-label="Filtrer par rareté"></div> <!></div>`);
	var root_3$17 = from_html(`<div class="empty"><b>Impossible de charger les cartes.</b><button class="btn">Réessayer</button></div>`);
	var root_4$17 = from_html(`<div class="wc skeleton"></div>`);
	var root_5$17 = from_html(`<div class="grid"></div>`);
	var root_6$16 = from_html(`<div class="empty"><b>Aucune carte ne correspond</b><div>Essayez un autre terme de recherche.</div></div>`);
	var root_7$15 = from_html(`<button class="card-btn"><!></button>`);
	var root_8$14 = from_html(`<div></div> <!>`, 1);
	var root_9$13 = from_html(`<div class="coll-head"><div><h1>Toutes les cartes</h1> <div class="meta"><!> <!></div></div> <div class="coll-tools"><!> <div class="tool-actions"><div class="isel" title="Trier"><!> <select aria-label="Trier"></select></div> <button title="N'afficher que ma liste de souhaits"><!><span>Souhaits</span></button> <button title="Afficher ou flouter les images sensibles"><!><span>Sensible</span></button></div></div></div> <!> <!> <!>`, 1);
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
		var fragment = root_9$13();
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
			var option = root$26();
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
			let $0 = user_derived(() => settings.hideSensitive ? "eyeOff" : "eye");
			Icon(node_5, { get name() {
				return get($0);
			} });
		}
		next();
		reset(button_1);
		reset(div_4);
		reset(div_3);
		reset(div);
		var node_6 = sibling(div, 2);
		var consequent_3 = ($$anchor) => {
			var div_6 = root_2$21();
			var div_7 = child(div_6);
			each(div_7, 21, () => RARITIES_DESC, index, ($$anchor, r) => {
				var fragment_3 = comment();
				var node_7 = first_child(fragment_3);
				var consequent_2 = ($$anchor) => {
					var button_2 = root_1$26();
					let classes_2;
					template_effect(($0, $1, $2) => {
						classes_2 = set_class(button_2, 1, "rm-seg", null, classes_2, {
							sel: get(rarity) === get(r),
							dim: get(rarity) && get(rarity) !== get(r)
						});
						set_style(button_2, `--rc:var(--r-${$0 ?? ""}); flex-grow:${get(rarityCounts)[get(r)] ?? ""}`);
						set_attribute(button_2, "title", `${RNAME[get(r)] ?? ""} : ${$1 ?? ""}`);
						set_attribute(button_2, "aria-label", `${RNAME[get(r)] ?? ""} : ${$2 ?? ""}`);
					}, [
						() => get(r).toLowerCase(),
						() => nf(get(rarityCounts)[get(r)]),
						() => nf(get(rarityCounts)[get(r)])
					]);
					delegated("click", button_2, () => refilter(() => set(rarity, get(rarity) === get(r) ? "" : get(r), true)));
					append($$anchor, button_2);
				};
				if_block(node_7, ($$render) => {
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
		if_block(node_6, ($$render) => {
			if (get(rarityCounts)) $$render(consequent_3);
		});
		var node_9 = sibling(node_6, 2);
		var consequent_4 = ($$anchor) => {
			var div_8 = root_3$17();
			var button_3 = sibling(child(div_8));
			reset(div_8);
			delegated("click", button_3, () => list.go());
			append($$anchor, div_8);
		};
		var consequent_5 = ($$anchor) => {
			var div_9 = root_5$17();
			each(div_9, 20, () => Array(12), index, ($$anchor, _) => {
				append($$anchor, root_4$17());
			});
			reset(div_9);
			append($$anchor, div_9);
		};
		var consequent_6 = ($$anchor) => {
			append($$anchor, root_6$16());
		};
		var alternate = ($$anchor) => {
			var fragment_4 = root_8$14();
			var div_12 = first_child(fragment_4);
			let classes_3;
			each(div_12, 21, () => get(cards), (c) => c.id, ($$anchor, c) => {
				var button_4 = root_7$15();
				Card(child(button_4), {
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
				reset(button_4);
				action(button_4, ($$node, $$action_arg) => lazy.watch?.($$node, $$action_arg), () => get(c));
				template_effect(() => set_attribute(button_4, "aria-label", get(c).title));
				delegated("click", button_4, () => set(selected, get(c), true));
				append($$anchor, button_4);
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
			template_effect(() => classes_3 = set_class(div_12, 1, "grid", null, classes_3, { dim: list.loading }));
			append($$anchor, fragment_4);
		};
		if_block(node_9, ($$render) => {
			if (list.error) $$render(consequent_4);
			else if (!get(cards)) $$render(consequent_5, 1);
			else if (get(cards).length === 0) $$render(consequent_6, 2);
			else $$render(alternate, -1);
		});
		var node_12 = sibling(node_9, 2);
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
		if_block(node_12, ($$render) => {
			if (get(selected)) $$render(consequent_7);
		});
		template_effect(() => {
			if (select_value !== (select_value = get(sort))) select.value = (select.__value = select_value) ?? "", select_option(select, select_value);
			classes = set_class(button, 1, "iconbtn", null, classes, { on: get(wishOnly) });
			classes_1 = set_class(button_1, 1, "iconbtn", null, classes_1, { on: !settings.hideSensitive });
		});
		delegated("change", select, (e) => refilter(() => set(sort, e.currentTarget.value, true)));
		delegated("click", button, () => refilter(() => set(wishOnly, !get(wishOnly))));
		delegated("click", button_1, function(...$$args) {
			toggleHideSensitive?.apply(this, $$args);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate(["change", "click"]);
	var root$25 = from_html(`<img alt="" loading="lazy"/>`);
	var root_1$25 = from_html(`<span class="avatar"><!></span>`);
	function Avatar($$anchor, $$props) {
		push($$props, true);
		let size = prop($$props, "size", 3, 32);
		const hue = user_derived(() => [...$$props.user?.username || "?"].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7));
		var span = root_1$25();
		var node = child(span);
		var consequent = ($$anchor) => {
			var img = root$25();
			let styles;
			template_effect(() => {
				set_attribute(img, "src", $$props.user.avatar);
				styles = set_style(img, "", styles, { "object-position": `${$$props.user.ax ?? 50 ?? ""}% ${$$props.user.ay ?? 50 ?? ""}%` });
			});
			append($$anchor, img);
		};
		var alternate = ($$anchor) => {
			var text$3 = text();
			template_effect(($0) => set_text(text$3, $0), [() => ($$props.user?.username || "?")[0].toUpperCase()]);
			append($$anchor, text$3);
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
	var ZONES = [
		{
			id: "good",
			until: .85,
			label: "bonne affaire"
		},
		{
			id: "fair",
			until: 1.15,
			label: "prix du marché"
		},
		{
			id: "warm",
			until: 2,
			label: "cher"
		},
		{
			id: "bad",
			until: Infinity,
			label: "hors de prix"
		}
	];
	function dealOf(price, market) {
		if (price == null || !market) return null;
		const r = price / market;
		const zone = ZONES.find((z) => r < z.until || z.id === "fair" && r <= z.until) ?? ZONES.at(-1);
		const pct = Math.round(Math.abs(r - 1) * 100);
		const gap = r >= 2 ? `${(Math.round(r * 10) / 10).toLocaleString("fr")} fois le prix du marché` : pct === 0 ? "au prix du marché" : `${pct} % ${r > 1 ? "au-dessus du" : "sous le"} marché`;
		return {
			zone: zone.id,
			word: zone.label,
			gap,
			ratio: r
		};
	}
	function gapTag(price, market) {
		const deal = dealOf(price, market);
		if (!deal) return null;
		const pct = Math.round((deal.ratio - 1) * 100);
		return {
			zone: deal.zone,
			text: Math.abs(pct) < 5 ? "≈ marché" : `${pct > 0 ? "+" : "-"}${Math.abs(pct)} %`
		};
	}
	var DEALS = [
		{
			id: "good",
			cap: ZONES[0].until,
			label: "Sous le marché"
		},
		{
			id: "quarter",
			cap: .75,
			label: "-25 % ou mieux"
		},
		{
			id: "half",
			cap: .5,
			label: "-50 % ou mieux"
		}
	];
	function bargains(sales, worthOf, { cap, max = null, rarity = "", now = Date.now() }) {
		const out = [];
		for (const a of sales) {
			if (a.status !== "active" || !(Date.parse(a.endAt) > now) || a.price == null) continue;
			if (rarity && a.card.rarity !== rarity || max != null && a.price > max) continue;
			const w = worthOf(a);
			if (w > 0 && a.price / w <= cap) out.push({
				a,
				ratio: a.price / w
			});
		}
		return out.sort((x, y) => x.ratio - y.ratio || Date.parse(x.a.endAt) - Date.parse(y.a.endAt)).map((x) => x.a);
	}
	function gaugeOf(price, market, mine = null) {
		if (price == null || !market) return null;
		const max = Math.max(2.5 * market, price * 1.1, (mine ?? 0) * 1.1);
		const x = (v) => Math.min(100, Math.max(0, v / max * 100));
		let from = 0;
		return {
			zones: ZONES.map((z) => {
				const to = Math.min(100, x(z.until * market));
				const zone = {
					id: z.id,
					label: z.label,
					from,
					to
				};
				from = to;
				return zone;
			}),
			price: x(price),
			market: x(market),
			mine: mine == null ? null : x(mine)
		};
	}
	function paceOf(bids, start, end, now = Date.now(), slices = 48) {
		const counts = Array(slices).fill(0);
		const span = Math.max(1, end - start);
		for (const b of bids) {
			const t = Date.parse(b.at);
			if (Number.isFinite(t)) counts[Math.min(slices - 1, Math.max(0, Math.floor((t - start) / span * slices)))]++;
		}
		return {
			counts,
			top: Math.max(1, ...counts),
			now: Math.min(100, Math.max(0, (now - start) / span * 100))
		};
	}
	function biddersOf(bids, start, end, me = null, top = 5) {
		const span = Math.max(1, end - start);
		const by = new Map();
		for (const b of bids) {
			const id = b.bidderId ?? b.bidder ?? "?";
			const e = by.get(id) ?? {
				id,
				name: b.bidder || "Anonyme",
				mine: !!me && id === me,
				count: 0,
				best: 0,
				at: []
			};
			e.count++;
			e.best = Math.max(e.best, b.amount);
			const t = Date.parse(b.at);
			if (Number.isFinite(t)) e.at.push(Math.min(100, Math.max(0, (t - start) / span * 100)));
			by.set(id, e);
		}
		const all = [...by.values()].sort((a, b) => b.best - a.best);
		const shown = all.slice(0, top);
		const myLane = all.find((e) => e.mine);
		if (myLane && !shown.includes(myLane)) shown[shown.length - 1] = myLane;
		return {
			shown,
			others: all.length - shown.length,
			total: all.length
		};
	}
	var root$24 = from_html(`<span class="ap-chip"> </span>`);
	var root_1$24 = from_html(`<b> </b>`);
	var root_2$20 = from_html(`<p class="ap-verdict"><!> </p>`);
	var root_3$16 = from_html(`<em> </em>`);
	var root_4$16 = from_html(`<span><!></span>`);
	var root_5$16 = from_html(`<span class="ap-mark mine"></span>`);
	var root_6$15 = from_html(`<div class="ap-gauge" role="img"><div class="ap-zones"></div> <span class="ap-mark market"><b> </b></span> <!> <span><b> </b></span></div>`);
	var root_7$14 = from_html(`<span class="ap-dot">·</span><span> </span>`, 1);
	var root_8$13 = from_html(`<span></span>`);
	var root_9$12 = from_html(`<i class="ap-now"></i>`);
	var root_10$11 = from_html(`<span class="ap-axis-now">maintenant</span>`);
	var root_11$11 = from_html(`<span> </span>`);
	var root_12$11 = from_html(`<i></i>`);
	var root_13$11 = from_html(`<i class="ap-track-now"></i>`);
	var root_14$9 = from_html(`<div role="listitem" tabindex="0"><!> <span class="ap-name"> </span> <span class="ap-track"><!><!></span> <b class="ap-best"> </b></div>`);
	var root_15$9 = from_html(`<p class="ap-more"> </p>`);
	var root_16$9 = from_html(`<div class="ap-sub"><span class="mk-h">Rythme</span> <span class="ap-facts"><b> </b> <!></span></div> <div class="ap-pace" aria-hidden="true"><!> <!></div> <div class="ap-axis"><span> </span><!></div> <div class="ap-sub"><span class="mk-h">Enchérisseurs</span> <span class="ap-facts"><b> </b></span></div> <div class="ap-lanes"><!> <!></div>`, 1);
	var root_17$9 = from_html(`<section class="auc-panel ap" aria-label="Le prix"><div class="ap-head"><h3>Le prix</h3> <!></div> <!> <!> <!></section>`);
	function AuctionPrice($$anchor, $$props) {
		push($$props, true);
		let market = prop($$props, "market", 3, null), me = prop($$props, "me", 3, null), seller = prop($$props, "seller", 3, false), now = prop($$props, "now", 19, () => Date.now()), focus = prop($$props, "focus", 15, null);
		const start = user_derived(() => Date.parse($$props.a.createdAt) || Date.parse($$props.bids.at(-1)?.at) || now());
		const end = user_derived(() => Date.parse($$props.a.endAt) || now());
		const price = user_derived(() => $$props.a.bid ?? $$props.a.base);
		const deal = user_derived(() => dealOf(get(price), market()));
		const myBest = user_derived(() => me() ? Math.max(0, ...$$props.bids.filter((b) => b.bidderId === me()).map((b) => b.amount)) || null : null);
		const gauge = user_derived(() => gaugeOf(get(price), market(), get(myBest) && get(myBest) !== get(price) ? get(myBest) : null));
		const pace = user_derived(() => paceOf($$props.bids, get(start), get(end), now()));
		const lastHour = user_derived(() => $$props.bids.filter((b) => now() - Date.parse(b.at) < 36e5).length);
		const racers = user_derived(() => biddersOf($$props.bids, get(start), get(end), me(), 4));
		const leaderId = user_derived(() => $$props.a.currentBidderId ?? null);
		const live = user_derived(() => $$props.phase === "live");
		const where = user_derived(() => {
			if ($$props.phase === "sold") return `Vendue ${nf(get(price))} pts.`;
			if ($$props.phase === "unsold" || $$props.phase === "cancelled") return $$props.phase === "unsold" ? "Personne n'a enchéri." : "Vente annulée.";
			if (seller()) return $$props.bids.length ? `${$$props.bids.length} enchère${$$props.bids.length > 1 ? "s" : ""} sur votre carte.` : "Pas encore d'enchère sur votre carte.";
			if (get(leaderId) && get(leaderId) === me()) return "Vous menez.";
			if (get(myBest)) return `Vous étiez à ${nf(get(myBest))} : il faut ${nf(get(price) + 1)} pour reprendre la tête.`;
			return $$props.bids.length ? "" : "Personne n'a encore enchéri.";
		});
		const capital = (s) => s.charAt(0).toUpperCase() + s.slice(1);
		const when = (t) => new Date(t).toLocaleString("fr", {
			day: "numeric",
			month: "short",
			hour: "2-digit",
			minute: "2-digit"
		});
		var section = root_17$9();
		var div = child(section);
		var node = sibling(child(div), 2);
		var consequent = ($$anchor) => {
			var span = root$24();
			var text = only_child(span, true);
			template_effect(() => {
				set_attribute(span, "data-z", get(deal).zone);
				set_text(text, get(deal).gap);
			});
			append($$anchor, span);
		};
		if_block(node, ($$render) => {
			if (get(deal)) $$render(consequent);
		});
		reset(div);
		var node_1 = sibling(div, 2);
		var consequent_2 = ($$anchor) => {
			var p = root_2$20();
			var node_2 = child(p);
			var consequent_1 = ($$anchor) => {
				var b_1 = root_1$24();
				var text_1 = only_child(b_1);
				template_effect(($0) => set_text(text_1, `${$0 ?? ""}.`), [() => capital(get(deal).word)]);
				append($$anchor, b_1);
			};
			if_block(node_2, ($$render) => {
				if (get(deal)) $$render(consequent_1);
			});
			var text_2 = sibling(node_2);
			reset(p);
			template_effect(() => set_text(text_2, ` ${get(where) ?? ""}`));
			append($$anchor, p);
		};
		if_block(node_1, ($$render) => {
			if (get(deal) || get(where)) $$render(consequent_2);
		});
		var node_3 = sibling(node_1, 2);
		var consequent_5 = ($$anchor) => {
			var div_1 = root_6$15();
			var div_2 = child(div_1);
			each(div_2, 21, () => get(gauge).zones, (z) => z.id, ($$anchor, z) => {
				var span_1 = root_4$16();
				let styles;
				var node_4 = child(span_1);
				var consequent_3 = ($$anchor) => {
					var em = root_3$16();
					var text_3 = only_child(em, true);
					template_effect(() => set_text(text_3, get(z).label));
					append($$anchor, em);
				};
				if_block(node_4, ($$render) => {
					if (get(z).to - get(z).from >= 20) $$render(consequent_3);
				});
				reset(span_1);
				template_effect(() => {
					set_attribute(span_1, "data-z", get(z).id);
					styles = set_style(span_1, "", styles, {
						left: `${get(z).from ?? ""}%`,
						width: `${get(z).to - get(z).from}%`
					});
				});
				append($$anchor, span_1);
			});
			reset(div_2);
			var span_2 = sibling(div_2, 2);
			let styles_1;
			var text_4 = only_child(child(span_2));
			reset(span_2);
			var node_5 = sibling(span_2, 2);
			var consequent_4 = ($$anchor) => {
				var span_3 = root_5$16();
				let styles_2;
				template_effect(($0) => {
					set_attribute(span_3, "title", `Votre meilleure enchère : ${$0 ?? ""}`);
					styles_2 = set_style(span_3, "", styles_2, { left: `${get(gauge).mine ?? ""}%` });
				}, [() => nf(get(myBest))]);
				append($$anchor, span_3);
			};
			if_block(node_5, ($$render) => {
				if (get(gauge).mine != null) $$render(consequent_4);
			});
			var span_4 = sibling(node_5, 2);
			let classes;
			let styles_3;
			var text_5 = only_child(child(span_4), true);
			reset(span_4);
			reset(div_1);
			template_effect(($0, $1, $2, $3) => {
				set_attribute(div_1, "aria-label", `${$0 ?? ""} points, ${get(deal).gap ?? ""} (${$1 ?? ""})`);
				styles_1 = set_style(span_2, "", styles_1, { left: `${get(gauge).market ?? ""}%` });
				set_text(text_4, `marché ${$2 ?? ""}`);
				classes = set_class(span_4, 1, "ap-mark price", null, classes, { flip: get(gauge).price > 85 });
				styles_3 = set_style(span_4, "", styles_3, { left: `${get(gauge).price ?? ""}%` });
				set_text(text_5, $3);
			}, [
				() => nf(get(price)),
				() => nf(market()),
				() => nf(market()),
				() => nf(get(price))
			]);
			append($$anchor, div_1);
		};
		if_block(node_3, ($$render) => {
			if (get(gauge)) $$render(consequent_5);
		});
		var node_6 = sibling(node_3, 2);
		var consequent_11 = ($$anchor) => {
			var fragment = root_16$9();
			var div_3 = first_child(fragment);
			var span_5 = sibling(child(div_3), 2);
			var b_4 = child(span_5);
			var text_6 = only_child(b_4, true);
			var text_7 = sibling(b_4);
			var node_7 = sibling(text_7);
			var consequent_6 = ($$anchor) => {
				var fragment_1 = root_7$14();
				var span_6 = sibling(first_child(fragment_1));
				let classes_1;
				var text_8 = only_child(span_6);
				template_effect(() => {
					classes_1 = set_class(span_6, 1, "", null, classes_1, { hot: get(lastHour) >= 5 });
					set_text(text_8, `${get(lastHour) ?? ""} dans l'heure`);
				});
				append($$anchor, fragment_1);
			};
			if_block(node_7, ($$render) => {
				if (get(live)) $$render(consequent_6);
			});
			reset(span_5);
			reset(div_3);
			var div_4 = sibling(div_3, 2);
			var node_8 = child(div_4);
			each(node_8, 17, () => get(pace).counts, index, ($$anchor, c) => {
				var span_7 = root_8$13();
				let classes_2;
				let styles_4;
				template_effect(($0) => {
					classes_2 = set_class(span_7, 1, "", null, classes_2, { hot: get(c) / get(pace).top > .6 });
					styles_4 = set_style(span_7, "", styles_4, { height: $0 });
				}, [() => `${get(c) ? Math.max(10, get(c) / get(pace).top * 100) : 0}%`]);
				append($$anchor, span_7);
			});
			var node_9 = sibling(node_8, 2);
			var consequent_7 = ($$anchor) => {
				var i_1 = root_9$12();
				let styles_5;
				template_effect(() => styles_5 = set_style(i_1, "", styles_5, { left: `${get(pace).now ?? ""}%` }));
				append($$anchor, i_1);
			};
			if_block(node_9, ($$render) => {
				if (get(live)) $$render(consequent_7);
			});
			reset(div_4);
			var div_5 = sibling(div_4, 2);
			var span_8 = child(div_5);
			var text_9 = only_child(span_8, true);
			var node_10 = sibling(span_8);
			var consequent_8 = ($$anchor) => {
				var span_9 = root_10$11();
				let styles_6;
				template_effect(() => styles_6 = set_style(span_9, "", styles_6, { left: `${get(pace).now ?? ""}%` }));
				append($$anchor, span_9);
			};
			var alternate = ($$anchor) => {
				var span_10 = root_11$11();
				var text_10 = only_child(span_10);
				template_effect(($0) => set_text(text_10, `terminée ${$0 ?? ""}`), [() => when(get(end))]);
				append($$anchor, span_10);
			};
			if_block(node_10, ($$render) => {
				if (get(live)) $$render(consequent_8);
				else $$render(alternate, -1);
			});
			reset(div_5);
			var div_6 = sibling(div_5, 2);
			var span_11 = sibling(child(div_6), 2);
			var text_11 = only_child(child(span_11), true);
			reset(span_11);
			reset(div_6);
			var div_7 = sibling(div_6, 2);
			var node_11 = child(div_7);
			each(node_11, 17, () => get(racers).shown, (e) => e.id, ($$anchor, e) => {
				var div_8 = root_14$9();
				let classes_3;
				var node_12 = child(div_8);
				{
					let $0 = user_derived(() => ({ username: get(e).name }));
					Avatar(node_12, {
						get user() {
							return get($0);
						},
						size: 20
					});
				}
				var span_12 = sibling(node_12, 2);
				var text_12 = only_child(span_12, true);
				var span_13 = sibling(span_12, 2);
				var node_13 = child(span_13);
				each(node_13, 17, () => get(e).at, index, ($$anchor, x) => {
					var i_2 = root_12$11();
					let styles_7;
					template_effect(() => styles_7 = set_style(i_2, "", styles_7, { left: `${get(x) ?? ""}%` }));
					append($$anchor, i_2);
				});
				var node_14 = sibling(node_13);
				var consequent_9 = ($$anchor) => {
					var i_3 = root_13$11();
					let styles_8;
					template_effect(() => styles_8 = set_style(i_3, "", styles_8, { left: `${get(pace).now ?? ""}%` }));
					append($$anchor, i_3);
				};
				if_block(node_14, ($$render) => {
					if (get(live)) $$render(consequent_9);
				});
				reset(span_13);
				var text_13 = only_child(sibling(span_13, 2), true);
				reset(div_8);
				template_effect(($0, $1) => {
					classes_3 = set_class(div_8, 1, "ap-lane", null, classes_3, {
						lead: get(e).id === get(leaderId),
						mine: get(e).mine
					});
					set_attribute(div_8, "aria-label", `${(get(e).mine ? "Vous" : get(e).name) ?? ""} : ${get(e).count ?? ""} enchère${get(e).count > 1 ? "s" : ""}, meilleure ${$0 ?? ""}`);
					set_text(text_12, get(e).mine ? "Vous" : get(e).name);
					set_text(text_13, $1);
				}, [() => nf(get(e).best), () => nf(get(e).best)]);
				event("pointerenter", div_8, () => focus(get(e).id));
				event("pointerleave", div_8, () => focus() === get(e).id && focus(null));
				event("focus", div_8, () => focus(get(e).id));
				event("blur", div_8, () => focus(null));
				append($$anchor, div_8);
			});
			var node_15 = sibling(node_11, 2);
			var consequent_10 = ($$anchor) => {
				var p_1 = root_15$9();
				var text_14 = only_child(p_1);
				template_effect(() => set_text(text_14, `+ ${get(racers).others ?? ""} autre${get(racers).others > 1 ? "s" : ""} enchérisseur${get(racers).others > 1 ? "s" : ""}`));
				append($$anchor, p_1);
			};
			if_block(node_15, ($$render) => {
				if (get(racers).others) $$render(consequent_10);
			});
			reset(div_7);
			template_effect(($0) => {
				set_text(text_6, $$props.bids.length);
				set_text(text_7, ` enchère${$$props.bids.length > 1 ? "s" : ""}`);
				set_text(text_9, $0);
				set_text(text_11, get(racers).total);
			}, [() => when(get(start))]);
			append($$anchor, fragment);
		};
		if_block(node_6, ($$render) => {
			if ($$props.bids.length) $$render(consequent_11);
		});
		reset(section);
		append($$anchor, section);
		pop();
	}
	var root$23 = from_html(`<div class="auc-cat"> </div>`);
	var root_1$23 = from_html(`<div class="auc-k"> </div> <div class="auc-price"><span class="auc-coin"></span> </div> <div class="auc-sub"> </div>`, 1);
	var root_2$19 = from_html(`<div class="auc-k"> </div> <div class="auc-price muted"><span class="auc-coin"></span> </div> <div class="auc-sub"> </div>`, 1);
	var root_3$15 = from_html(`<span class="auc-live"><span class="auc-dot"></span>en direct</span>`);
	var root_4$15 = from_html(`<div class="auc-row"><div><div class="auc-k"> </div> <div class="auc-price"><span class="auc-coin"></span> </div></div> <div class="auc-clock"><div class="auc-k"> </div> <div class="auc-time"> </div></div></div> <div class="auc-sub"> <!></div>`, 1);
	var root_5$15 = from_html(`<div class="auc-flag lead">Vous êtes en tête</div>`);
	var root_6$14 = from_html(`<div class="auc-flag out">Enchère dépassée</div>`);
	var root_7$13 = from_html(`<button class="btn primary auc-cta">Finaliser l'enchère</button>`);
	var root_8$12 = from_html(`<div class="auc-note">En attente de finalisation.</div>`);
	var root_9$11 = from_html(`<div class="auc-inline"><div class="af-input-row"><input class="af-input" type="number" min="1" step="1" placeholder="Nouvelle mise de départ"/> <span class="af-unit">pts</span></div> <button class="btn">Baisser</button></div>`);
	var root_10$10 = from_html(`<div class="auc-note"> </div>`);
	var root_11$10 = from_html(`<div class="af-actions"><button class="btn">Garder</button> <button class="btn danger">Confirmer l'annulation</button></div>`);
	var root_12$10 = from_html(`<button class="btn danger auc-cta">Annuler la vente</button>`);
	var root_13$10 = from_html(`<!> <!>`, 1);
	var root_14$8 = from_html(`<button> </button>`);
	var root_15$8 = from_html(`<div> </div>`);
	var root_16$8 = from_html(`<div class="auc-inline"><div class="af-input-row"><input class="af-input" type="number" step="1" aria-label="Montant de l'enchère"/> <span class="af-unit">pts</span></div> <button class="btn primary"> </button></div> <div class="auc-quick"><button> </button> <!></div> <!>`, 1);
	var root_17$8 = from_html(`<div class="auc-empty">Aucune enchère.</div>`);
	var root_18$8 = from_html(`<span class="tag"> </span>`);
	var root_19$6 = from_html(`<li><span class="who"> </span> <!> <span class="amt"> </span> <span class="when"> </span></li>`);
	var root_20$5 = from_html(`<li class="auc-more"></li>`);
	var root_21$5 = from_html(`<ol class="auc-feed"><!> <!></ol>`);
	var root_22$3 = from_html(`<div class="modal-backdrop" role="presentation"><div class="auc" role="dialog" aria-modal="true" aria-labelledby="wm-auc-title" tabindex="-1"><button class="modal-close" aria-label="Fermer"><!></button> <div class="auc-top"><div class="auc-card"><!></div> <div class="auc-body"><div class="auc-id"><span class="modal-rar"> </span> <h2 class="auc-name" id="wm-auc-title"> </h2> <!> <div class="auc-by"> </div></div> <div class="auc-state"><!></div> <!> <div class="auc-act"><!> <!></div></div></div> <!> <div class="auc-bottom"><!> <section class="auc-panel"><h3>Activité</h3> <!></section></div></div></div>`);
	function AuctionModal($$anchor, $$props) {
		push($$props, true);
		let balance = prop($$props, "balance", 3, null);
		let a = user_derived(() => $$props.auction);
		let bids = user_derived(() => $$props.auction.bids || []);
		let iBid = state(false);
		let bal = user_derived(balance);
		let busy = state(false);
		let msg = state("");
		let msgOk = state(false);
		let confirmCancel = state(false);
		async function refresh() {
			try {
				const fresh = await data.auction($$props.auction.id);
				set(a, fresh);
				set(bids, fresh.bids);
				if (Number(get(amount)) < get(minBid)) set(amount, String(get(minBid)));
			} catch {}
		}
		refresh();
		user_effect(() => {
			if (get(phase) !== "live") return;
			const t = setInterval(() => document.visibilityState === "visible" && refresh(), 4e3);
			return () => clearInterval(t);
		});
		let others = state(null);
		let soldAvg = state(null);
		user_effect(() => {
			const card = $$props.auction.card;
			let live = true;
			data.sameCard(card).then((l) => live && set(others, l, true), () => live && set(others, [], true));
			data.marketStats(card).then((m) => live && set(soldAvg, rarityMarket(m, card.rarity).avg, true), () => marketValueFor(card).then((v) => live && set(soldAvg, v, true)));
			return () => live = false;
		});
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
		const FEED_STEP = 60;
		let feedShown = state(FEED_STEP);
		let focus = state(null);
		const bidderOf = (b) => b.bidderId ?? b.bidder ?? "?";
		let amount = user_derived(() => String($$props.auction.bid != null ? $$props.auction.bid + 1 : $$props.auction.base ?? 1));
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
				if (e.min) set(amount, String(e.min));
			}
			set(busy, false);
			set(confirmCancel, false);
		}
		const bid = () => run(() => sounded(() => data.placeBid(get(a).id, Number(get(amount)))), (d) => {
			set(iBid, true);
			set(bal, d.bidder_balance ?? get(bal));
			return `Enchère placée à ${nf(d.current_bid)} pts.`;
		});
		const reprice = () => run(() => data.reprice(get(a).id, Number(get(newBase))), () => `Mise de départ baissée à ${nf(Number(get(newBase)))} pts.`);
		const cancel = () => run(() => data.cancelAuction(get(a).id), () => "Vente annulée, la carte revient dans votre collection.");
		const settle = () => run(() => data.settle(get(a).id), () => "Enchère finalisée.");
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
		var div = root_22$3();
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
		var span = child(div_5);
		var text = only_child(span);
		var h2 = sibling(span, 2);
		var text_1 = only_child(h2, true);
		var node_2 = sibling(h2, 2);
		var consequent = ($$anchor) => {
			var div_6 = root$23();
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
			var fragment = root_1$23();
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
			var fragment_1 = root_2$19();
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
			var fragment_2 = root_4$15();
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
				append($$anchor, root_3$15());
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
			append($$anchor, root_5$15());
		};
		var consequent_5 = ($$anchor) => {
			append($$anchor, root_6$14());
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
				var button_1 = root_7$13();
				template_effect(() => button_1.disabled = get(busy));
				delegated("click", button_1, settle);
				append($$anchor, button_1);
			};
			var alternate_1 = ($$anchor) => {
				append($$anchor, root_8$12());
			};
			if_block(node_7, ($$render) => {
				if (get(mine) || get(leading)) $$render(consequent_6);
				else $$render(alternate_1, -1);
			});
			append($$anchor, fragment_3);
		};
		var consequent_11 = ($$anchor) => {
			var fragment_4 = root_13$10();
			var node_8 = first_child(fragment_4);
			var consequent_8 = ($$anchor) => {
				var div_27 = root_9$11();
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
				var div_29 = root_10$10();
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
				var div_30 = root_11$10();
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
				var button_5 = root_12$10();
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
			var fragment_5 = root_16$8();
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
				var button_8 = root_14$8();
				var text_18 = only_child(button_8);
				template_effect(() => set_text(text_18, `+${step ?? ""}`));
				delegated("click", button_8, () => set(amount, String(Math.max(get(minBid), Number(get(amount)) + step))));
				append($$anchor, button_8);
			});
			reset(div_33);
			var node_11 = sibling(div_33, 2);
			var consequent_12 = ($$anchor) => {
				var div_34 = root_15$8();
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
			delegated("click", button_7, () => set(amount, String(get(minBid))));
			append($$anchor, fragment_5);
		};
		if_block(node_6, ($$render) => {
			if (get(phase) === "closing") $$render(consequent_7);
			else if (get(phase) === "live" && get(mine)) $$render(consequent_11, 1);
			else if (get(phase) === "live") $$render(consequent_13, 2);
		});
		var node_12 = sibling(node_6, 2);
		var consequent_14 = ($$anchor) => {
			var div_35 = root_15$8();
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
		var node_13 = sibling(div_2, 2);
		ListingCompare(node_13, {
			get listings() {
				return get(others);
			},
			get current() {
				return get(a);
			},
			get soldAvg() {
				return get(soldAvg);
			},
			get now() {
				return get(now);
			},
			onpick: (r) => $$props.onswitch?.(r)
		});
		var div_36 = sibling(node_13, 2);
		var node_14 = child(div_36);
		AuctionPrice(node_14, {
			get a() {
				return get(a);
			},
			get bids() {
				return get(bids);
			},
			get phase() {
				return get(phase);
			},
			get market() {
				return get(soldAvg);
			},
			get me() {
				return data.userId;
			},
			get seller() {
				return get(mine);
			},
			get now() {
				return get(now);
			},
			get focus() {
				return get(focus);
			},
			set focus($$value) {
				set(focus, $$value, true);
			}
		});
		var section = sibling(node_14, 2);
		var node_15 = sibling(child(section), 2);
		var consequent_15 = ($$anchor) => {
			append($$anchor, root_17$8());
		};
		var alternate_3 = ($$anchor) => {
			var ol = root_21$5();
			var node_16 = child(ol);
			each(node_16, 19, () => get(bids).slice(0, get(feedShown)), (b) => b.id, ($$anchor, b, i) => {
				var li = root_19$6();
				let classes_2;
				var span_2 = child(li);
				var text_21 = only_child(span_2, true);
				var node_17 = sibling(span_2, 2);
				var consequent_16 = ($$anchor) => {
					var span_3 = root_18$8();
					var text_22 = only_child(span_3, true);
					template_effect(() => set_text(text_22, get(phase) === "sold" ? "Gagnant" : "En tête"));
					append($$anchor, span_3);
				};
				if_block(node_17, ($$render) => {
					if (get(i) === 0) $$render(consequent_16);
				});
				var span_4 = sibling(node_17, 2);
				var text_23 = only_child(span_4, true);
				var text_24 = only_child(sibling(span_4, 2), true);
				reset(li);
				template_effect(($0, $1, $2, $3) => {
					classes_2 = set_class(li, 1, "", null, classes_2, {
						top: get(i) === 0,
						me: get(b).bidderId && get(b).bidderId === data.userId,
						hot: $0,
						dim: $1
					});
					set_text(text_21, get(b).bidder || "Anonyme");
					set_text(text_23, $2);
					set_text(text_24, $3);
				}, [
					() => get(focus) && bidderOf(get(b)) === get(focus),
					() => get(focus) && bidderOf(get(b)) !== get(focus),
					() => nf(get(b).amount),
					() => ago(get(b).at, get(now))
				]);
				append($$anchor, li);
			});
			var node_18 = sibling(node_16, 2);
			var consequent_17 = ($$anchor) => {
				var li_1 = root_20$5();
				action(li_1, ($$node, $$action_arg) => inView?.($$node, $$action_arg), () => ({
					onEnter: () => set(feedShown, get(feedShown) + FEED_STEP),
					key: get(feedShown)
				}));
				append($$anchor, li_1);
			};
			if_block(node_18, ($$render) => {
				if (get(bids).length > get(feedShown)) $$render(consequent_17);
			});
			reset(ol);
			append($$anchor, ol);
		};
		if_block(node_15, ($$render) => {
			if (get(bids).length === 0) $$render(consequent_15);
			else $$render(alternate_3, -1);
		});
		reset(section);
		reset(div_36);
		reset(div_1);
		action(div_1, ($$node) => anchorCentered?.($$node));
		reset(div);
		template_effect(() => {
			set_attribute(span, "data-r", get(a).card.rarity);
			set_text(text, `${(RNAME[get(a).card.rarity] || get(a).card.rarity) ?? ""}${get(a).is_shiny ? " · brillante" : ""}`);
			set_text(text_1, get(a).card.title);
			set_text(text_3, get(mine) ? "Votre vente" : get(a).seller ? `Vendu par ${get(a).seller}` : "");
			set_attribute(div_8, "data-phase", get(phase));
		});
		delegated("click", div, (e) => e.target === e.currentTarget && $$props.onclose?.());
		delegated("click", button, () => $$props.onclose?.());
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var UNDER = DEALS[0].cap;
	function newWatch({ q = "", rarity = "", max = null, under = false }, id = String(Date.now())) {
		const words = q.trim().replace(/\s+/g, " ");
		return words ? {
			id,
			q: words,
			rarity: rarity || "",
			max: max > 0 ? Math.round(max) : null,
			under: !!under
		} : null;
	}
	var watchLabel = (w) => [
		`« ${w.q} »`,
		w.rarity && RNAME[w.rarity],
		w.max && `${nf(w.max)} max`,
		w.under && "sous le marché"
	].filter(Boolean).join(" · ");
	function matchesWatch(w, sale, worth = null, now = Date.now()) {
		if (sale.status !== "active" || !(Date.parse(sale.endAt) > now) || sale.price == null) return false;
		if (sale.mine) return false;
		if (w.rarity && sale.card.rarity !== w.rarity) return false;
		if (w.max != null && sale.price > w.max) return false;
		return !w.under || worth > 0 && sale.price / worth <= UNDER;
	}
	var alertOf = (w, sale, now = Date.now()) => ({
		id: `watch:${w.id}:${sale.id}`,
		type: "watch",
		title: `Alerte ${watchLabel(w)}`,
		message: `${sale.card.title} à ${nf(sale.price)} WikiBidous`,
		read: false,
		at: new Date(now).toISOString(),
		href: `/marketplace/${encodeURIComponent(sale.id)}`
	});
	var KEY = "wm-watches";
	var EVERY_MS = 3e5;
	var SEEN_KEEP = 300;
	var ALERTS_KEEP = 50;
	function read() {
		try {
			return JSON.parse(localStorage.getItem(KEY)) || {};
		} catch {
			return {};
		}
	}
	var saved = read();
	var watches = proxy({
		list: saved.list ?? [],
		seen: saved.seen ?? {},
		alerts: saved.alerts ?? [],
		counts: {}
	});
	effect_root(() => {
		user_effect(() => {
			const json = JSON.stringify({
				list: watches.list,
				seen: watches.seen,
				alerts: watches.alerts
			});
			try {
				localStorage.setItem(KEY, json);
			} catch {}
		});
	});
	async function check(w) {
		const { auctions } = await data.marketplace({
			page: 0,
			sort: "recent",
			q: w.q,
			rarity: w.rarity || void 0,
			quiet: true
		});
		const hits = [];
		for (const a of auctions) {
			if (!matchesWatch({
				...w,
				under: false
			}, a)) continue;
			if (!w.under || matchesWatch(w, a, await marketValueFor(a.card))) hits.push(a);
		}
		watches.counts[w.id] = hits.length;
		const seen = new Set(watches.seen[w.id] ?? []);
		const fresh = hits.filter((a) => !seen.has(a.id));
		watches.seen[w.id] = [...fresh.map((a) => a.id), ...seen].slice(0, SEEN_KEEP);
		return fresh.map((a) => alertOf(w, a));
	}
	async function addWatch(input) {
		const w = newWatch(input);
		if (!w) return null;
		watches.list.push(w);
		await check(w).catch(() => {});
		return w;
	}
	function removeWatch(id) {
		watches.list = watches.list.filter((w) => w.id !== id);
		delete watches.seen[id];
		delete watches.counts[id];
	}
	function markAlertsRead(ids = null) {
		for (const a of watches.alerts) if (!ids || ids.includes(a.id)) a.read = true;
	}
	function startWatching(onalert) {
		let running = false;
		async function round() {
			if (running || document.visibilityState !== "visible" || !watches.list.length) return;
			running = true;
			for (const w of [...watches.list]) try {
				for (const alert of await check(w)) {
					watches.alerts = [alert, ...watches.alerts.filter((a) => a.id !== alert.id)].slice(0, ALERTS_KEEP);
					onalert(alert);
				}
			} catch {}
			running = false;
		}
		const first = setTimeout(round, 15e3);
		const t = setInterval(round, EVERY_MS);
		return () => {
			clearTimeout(first);
			clearInterval(t);
		};
	}
	var root$22 = from_html(`<option> </option>`);
	var root_1$22 = from_html(`<span class="spin"></span>`);
	var root_2$18 = from_html(`<p class="ach-note" role="status"> </p>`);
	var root_3$14 = from_html(`<li><button class="watch-what" title="Voir ces ventes"><b> </b> <small> </small></button> <button class="fr-act" title="Supprimer"><!></button></li>`);
	var root_4$14 = from_html(`<ul class="watch-list"></ul>`);
	var root_5$14 = from_html(`<p class="fr-hint">Aucune alerte pour l'instant.</p>`);
	var root_6$13 = from_html(`<div class="modal-backdrop" role="presentation"><div class="modal watch" role="dialog" aria-modal="true" aria-labelledby="wm-watch-title" tabindex="-1"><button class="modal-close" aria-label="Fermer"><!></button> <header><h2 id="wm-watch-title">Alertes du marché</h2> <p>Soyez prévenu quand une carte qui vous intéresse est mise en vente. Vérifié toutes les 5 minutes tant que le jeu est ouvert.</p></header> <form class="watch-form"><div class="watch-q"><!></div> <div class="watch-opts"><div class="isel"><select aria-label="Rareté"><option>Toutes raretés</option><!></select></div> <label class="deal-max"><span class="auc-coin"></span><input type="number" min="1" inputmode="numeric" placeholder="Prix max" aria-label="Prix maximum"/></label> <label class="watch-under"><input type="checkbox"/><span>Sous le prix du marché</span></label></div> <button class="btn primary" type="submit"><!> </button></form> <!> <!></div></div>`);
	function WatchPanel($$anchor, $$props) {
		push($$props, true);
		let prefill = prop($$props, "prefill", 3, null);
		let q = state(proxy(prefill()?.q ?? ""));
		let rarity = state(proxy(prefill()?.rarity ?? ""));
		let max = state(null);
		let under = state(false);
		let busy = state(false);
		let msg = state("");
		const taken = user_derived(() => watches.list.some((w) => w.q.toLowerCase() === get(q).trim().toLowerCase() && w.rarity === get(rarity) && (w.max ?? null) === (get(max) > 0 ? Math.round(get(max)) : null) && w.under === get(under)));
		async function add(e) {
			e.preventDefault();
			if (get(busy) || !get(q).trim() || get(taken)) return;
			set(busy, true);
			set(msg, "");
			try {
				const w = await sounded(() => addWatch({
					q: get(q),
					rarity: get(rarity),
					max: get(max),
					under: get(under)
				}));
				const n = watches.counts[w.id];
				set(msg, n ? `Alerte créée. ${n} vente${n > 1 ? "s" : ""} déjà en cours : les nouvelles vous seront signalées.` : "Alerte créée. Vous serez prévenu dès qu'une vente apparaît.", true);
				set(q, "");
				set(max, null);
				set(under, false);
			} catch (err) {
				set(msg, err.message, true);
			}
			set(busy, false);
		}
		const onKey = (e) => e.key === "Escape" && $$props.onclose?.();
		const focus = (node) => {
			if (!prefill()?.q) node.querySelector("input")?.focus();
		};
		var div = root_6$13();
		event("keydown", $window, onKey);
		var div_1 = child(div);
		var button = child(div_1);
		Icon(child(button), {
			name: "close",
			width: 2,
			class: "x-ico"
		});
		reset(button);
		var form = sibling(button, 4);
		var div_2 = child(form);
		SearchBox(child(div_2), {
			placeholder: "Mots de la carte, ex. singapour",
			get value() {
				return get(q);
			},
			set value($$value) {
				set(q, $$value, true);
			}
		});
		reset(div_2);
		action(div_2, ($$node) => focus?.($$node));
		var div_3 = sibling(div_2, 2);
		var div_4 = child(div_3);
		var select = child(div_4);
		var option = child(select);
		option.value = option.__value = "";
		each(sibling(option), 16, () => RARITIES_DESC, (r) => r, ($$anchor, r) => {
			var option_1 = root$22();
			var text = only_child(option_1, true);
			var option_1_value = {};
			template_effect(() => {
				set_text(text, RNAME[r]);
				if (option_1_value !== (option_1_value = r)) option_1.value = (option_1.__value = option_1_value) ?? "";
			});
			append($$anchor, option_1);
		});
		reset(select);
		init_select(select);
		reset(div_4);
		var label = sibling(div_4, 2);
		var input = sibling(child(label));
		remove_input_defaults(input);
		reset(label);
		var label_1 = sibling(label, 2);
		var input_1 = child(label_1);
		remove_input_defaults(input_1);
		next();
		reset(label_1);
		reset(div_3);
		var button_1 = sibling(div_3, 2);
		var node_4 = child(button_1);
		var consequent = ($$anchor) => {
			append($$anchor, root_1$22());
		};
		var alternate = ($$anchor) => {
			Icon($$anchor, { name: "bell" });
		};
		if_block(node_4, ($$render) => {
			if (get(busy)) $$render(consequent);
			else $$render(alternate, -1);
		});
		var text_1 = sibling(node_4, 1, true);
		reset(button_1);
		reset(form);
		var node_5 = sibling(form, 2);
		var consequent_1 = ($$anchor) => {
			var p = root_2$18();
			var text_2 = only_child(p, true);
			template_effect(() => set_text(text_2, get(msg)));
			append($$anchor, p);
		};
		if_block(node_5, ($$render) => {
			if (get(msg)) $$render(consequent_1);
		});
		var node_6 = sibling(node_5, 2);
		var consequent_2 = ($$anchor) => {
			var ul = root_4$14();
			each(ul, 21, () => watches.list, (w) => w.id, ($$anchor, w) => {
				var li = root_3$14();
				var button_2 = child(li);
				var b = child(button_2);
				var text_3 = only_child(b, true);
				var text_4 = only_child(sibling(b, 2), true);
				reset(button_2);
				var button_3 = sibling(button_2, 2);
				Icon(child(button_3), {
					name: "close",
					width: 2.2
				});
				reset(button_3);
				reset(li);
				template_effect(($0, $1) => {
					set_text(text_3, $0);
					set_text(text_4, watches.counts[get(w).id] == null ? "Vérification au prochain passage" : watches.counts[get(w).id] ? `${watches.counts[get(w).id]} en vente maintenant` : "Aucune vente pour l'instant");
					set_attribute(button_3, "aria-label", `Supprimer l'alerte ${$1 ?? ""}`);
				}, [() => watchLabel(get(w)), () => watchLabel(get(w))]);
				delegated("click", button_2, () => $$props.onsearch?.(get(w)));
				delegated("click", button_3, () => removeWatch(get(w).id));
				append($$anchor, li);
			});
			reset(ul);
			append($$anchor, ul);
		};
		var alternate_1 = ($$anchor) => {
			append($$anchor, root_5$14());
		};
		if_block(node_6, ($$render) => {
			if (watches.list.length) $$render(consequent_2);
			else $$render(alternate_1, -1);
		});
		reset(div_1);
		action(div_1, ($$node) => anchorCentered?.($$node));
		reset(div);
		template_effect(($0) => {
			button_1.disabled = $0;
			set_text(text_1, get(taken) ? "Déjà surveillé" : "Créer l'alerte");
		}, [() => get(busy) || !get(q).trim() || get(taken)]);
		delegated("click", div, (e) => e.target === e.currentTarget && $$props.onclose?.());
		delegated("click", button, function(...$$args) {
			$$props.onclose?.apply(this, $$args);
		});
		event("submit", form, add);
		bind_select_value(select, () => get(rarity), ($$value) => set(rarity, $$value));
		bind_value(input, () => get(max), ($$value) => set(max, $$value));
		bind_checked(input_1, () => get(under), ($$value) => set(under, $$value));
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	function reuse(old = [], fresh = []) {
		const before = new Map((old ?? []).map((r) => [r.id, r]));
		return fresh.map((r) => {
			const o = before.get(r.id);
			return o && JSON.stringify(o) === JSON.stringify(r) ? o : r;
		});
	}
	var root$21 = from_html(`<span class="tab-n"> </span>`);
	var root_1$21 = from_html(`<option> </option>`);
	var root_2$17 = from_html(`<div class="coll-tools"><!> <div class="tool-actions"><button><!> <!></button> <div class="isel" title="Trier"><!> <select aria-label="Trier"></select></div></div></div>`);
	var root_3$13 = from_html(`<button role="tab"><span class="lbl-long"> </span><span class="lbl-short"> </span></button>`);
	var root_4$13 = from_html(`<button role="radio"> <span class="deal-n"> </span></button>`);
	var root_5$13 = from_html(` <span class="deal-pricing"><span class="spin"></span> </span>`, 1);
	var root_6$12 = from_html(`<span class="modal-msg">Lecture du marché impossible.</span>`);
	var root_7$12 = from_html(`<span class="spin"></span>`);
	var root_8$11 = from_html(`<button class="btn deal-more"><!>Voir plus de ventes</button>`);
	var root_9$10 = from_html(`<div class="deal-bar"><div class="deal-caps" role="radiogroup" aria-label="Prix par rapport au marché"></div> <label class="deal-max"><span class="auc-coin"></span><input type="number" min="1" inputmode="numeric" placeholder="Prix max" aria-label="Prix maximum"/></label></div> <!> <div class="deal-status" role="status"><span><b> </b> <!></span> <!> <!></div>`, 1);
	var root_10$9 = from_html(`<div class="empty"><b>Marché indisponible pour le moment.</b><button class="btn">Réessayer</button></div>`);
	var root_11$9 = from_html(`<div class="wc skeleton"></div>`);
	var root_12$9 = from_html(`<div class="grid"></div>`);
	var root_13$9 = from_html(`<button class="btn"> </button>`);
	var root_14$7 = from_html(`<button class="btn">Voir plus de ventes</button>`);
	var root_15$7 = from_html(`<div class="empty"><b> </b> <!></div>`);
	var root_16$7 = from_html(`<span class="auc-gap"> </span>`);
	var root_17$7 = from_html(`<span class="auc-dup"> </span>`);
	var root_18$7 = from_html(`<div class="auc-item"><button class="card-btn"><!></button> <div class="auc-meta"><span class="auc-price-line"><span class="auc-bid"><span class="auc-coin"></span> </span> <!></span> <span> </span></div> <div class="auc-foot"><span> </span> <!></div></div>`);
	var root_19$5 = from_html(`<p class="mine-cap"></p>`);
	var root_20$4 = from_html(`<div></div> <!> <!>`, 1);
	var root_21$4 = from_html(`<div class="coll-head"><div><h1>Marché</h1> <div class="meta lead">Enchérissez sur des cartes ou vendez les vôtres contre des WikiBidous</div></div> <!></div> <div class="tabs" role="tablist"></div> <!> <!> <!> <!>`, 1);
	function Marketplace($$anchor, $$props) {
		push($$props, true);
		const worth = new SvelteMap();
		const worthKey = (c) => `${c.id}|${c.rarity}`;
		const worthOf = lazyValues((_, v, card) => worth.set(worthKey(card), v));
		user_effect(() => () => worthOf.destroy());
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
			rarity: get(rarity),
			deal: get(deal)
		}));
		let selected = state(null);
		let watching = state(null);
		function showWatch(w) {
			set(watching, null);
			set(tab, "browse");
			set(search, set(query, w.q, true), true);
			set(rarity, w.rarity, true);
			list.go(0);
		}
		let quiet = false;
		const list = new PagedList((page) => data.marketplace({
			page,
			sort: get(sort),
			q: get(query),
			rarity: get(rarity),
			quiet
		}));
		list.go(0);
		debouncedSearch(() => get(search), (q) => {
			if (q !== get(query)) {
				set(query, q, true);
				list.go(0);
			}
		});
		const pool = new SvelteMap();
		const addToPool = (sales) => {
			for (const a of sales ?? []) {
				pool.set(a.id, a);
				if (get(tab) === "deals") worthOf.load(a.card);
			}
		};
		user_effect(() => {
			const s = list.data?.auctions;
			if (s) untrack(() => addToPool(s));
		});
		user_effect(() => {
			if (get(tab) === "deals") untrack(() => {
				for (const a of pool.values()) worthOf.load(a.card);
			});
		});
		let deal = state(proxy(prefs.deal ?? "good"));
		let dealRarity = state("");
		let maxPrice = state(null);
		let scan = state(proxy({
			key: null,
			page: 0,
			more: true,
			loading: false,
			error: false
		}));
		async function scanMore() {
			if (get(scan).loading || !get(scan).more) return;
			get(scan).loading = true;
			get(scan).error = false;
			try {
				const d = await data.marketplace({
					page: get(scan).page,
					sort: "price_asc",
					rarity: get(dealRarity)
				});
				addToPool(d.auctions);
				get(scan).page++;
				get(scan).more = d.hasMore;
			} catch {
				get(scan).error = true;
			}
			get(scan).loading = false;
		}
		user_effect(() => {
			if (get(tab) === "deals" && get(scan).key !== get(dealRarity)) untrack(() => {
				set(scan, {
					key: get(dealRarity),
					page: 0,
					more: true,
					loading: false,
					error: false
				}, true);
				scanMore();
			});
		});
		const worthOfSale = (a) => worth.get(worthKey(a.card));
		const byDeal = user_derived(() => Object.fromEntries(DEALS.map((d) => [d.id, bargains([...pool.values()], worthOfSale, {
			cap: d.cap,
			max: get(maxPrice) > 0 ? get(maxPrice) : null,
			rarity: get(dealRarity),
			now: get(now)
		})])));
		const found = user_derived(() => get(byDeal)[get(deal)] ?? get(byDeal).good);
		const live = user_derived(() => [...pool.values()].filter((a) => a.status === "active" && Date.parse(a.endAt) > get(now) && (!get(dealRarity) || a.card.rarity === get(dealRarity))));
		const pricing = user_derived(() => get(live).filter((a) => !worth.has(worthKey(a.card))).length);
		let mine = state(null);
		let mineError = state(false);
		const loadMine = (quiet = false) => {
			set(mineError, false);
			return data.myMarket({ quiet }).then((m) => set(mine, {
				...m,
				selling: reuse(get(mine)?.selling, m.selling),
				bidding: reuse(get(mine)?.bidding, m.bidding),
				won: reuse(get(mine)?.won, m.won),
				history: reuse(get(mine)?.history, m.history)
			}, true), () => set(mineError, !get(mine)));
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
			loadMine(true);
			quiet = true;
			list.refresh((old, fresh) => ({
				...fresh,
				auctions: reuse(old?.auctions, fresh.auctions)
			})).finally(() => quiet = false);
			$$props.onwallet?.();
		}
		function statusLabel(a) {
			if (a.status === "active") return countdown(secondsUntil(a.endAt, get(now)));
			if (a.status === "sold") return a.finalPrice != null ? `Vendue ${nf(a.finalPrice)}` : "Vendue";
			return a.status === "cancelled" ? "Annulée" : "Invendue";
		}
		const MINE_CAP = 50;
		const count = (l) => !l?.length ? "" : l.length >= MINE_CAP ? `${MINE_CAP}+` : `${l.length}`;
		const capped = user_derived(() => (get(tab) === "won" || get(tab) === "history") && (get(mine)?.[get(tab)]?.length ?? 0) >= MINE_CAP);
		const tabs = user_derived(() => [
			[
				"browse",
				"Toutes les ventes",
				"Tout"
			],
			[
				"deals",
				"Affaires",
				"Affaires"
			],
			["selling", `Mes ventes ${get(mine) ? `${get(mine).selling.length}/${get(mine).max}` : ""}`],
			[
				"bidding",
				`Mes enchères ${get(mine)?.bidding.length || ""}`,
				`Enchères ${get(mine)?.bidding.length || ""}`
			],
			[
				"won",
				`Remportées ${count(get(mine)?.won)}`,
				`Gagnées ${count(get(mine)?.won)}`
			],
			["history", "Historique"]
		]);
		const shown = user_derived(() => get(tab) === "browse" ? list.data?.auctions : get(tab) === "deals" ? get(found) : get(mine)?.[get(tab)]);
		const dupes = user_derived(() => get(tab) === "browse" ? countByCard(get(shown)) : new Map());
		const EMPTY = {
			browse: "Aucune enchère ne correspond.",
			deals: "Aucune vente à ce prix parmi celles vues pour l'instant.",
			selling: "Aucune vente en cours. Ouvrez une carte dans Ma collection pour la vendre.",
			bidding: "Aucune enchère en cours.",
			won: "Aucune enchère remportée.",
			history: "Aucune vente terminée."
		};
		var fragment = root_21$4();
		var div = first_child(fragment);
		var node = sibling(child(div), 2);
		var consequent_1 = ($$anchor) => {
			var div_1 = root_2$17();
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
			var button = child(div_2);
			let classes;
			var node_2 = child(button);
			Icon(node_2, { name: "bell" });
			var text = sibling(node_2, 1, true);
			var node_3 = sibling(text);
			var consequent = ($$anchor) => {
				var span = root$21();
				var text_1 = only_child(span, true);
				template_effect(() => set_text(text_1, watches.list.length));
				append($$anchor, span);
			};
			if_block(node_3, ($$render) => {
				if (!get(query) && watches.list.length) $$render(consequent);
			});
			reset(button);
			var div_3 = sibling(button, 2);
			var node_4 = child(div_3);
			Icon(node_4, { name: "sort" });
			var select = sibling(node_4, 2);
			each(select, 21, () => SORTS, index, ($$anchor, $$item) => {
				var $$array = user_derived(() => to_array(get($$item), 2));
				let v = () => get($$array)[0];
				let label = () => get($$array)[1];
				var option = root_1$21();
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
			reset(div_3);
			reset(div_2);
			reset(div_1);
			template_effect(() => {
				classes = set_class(button, 1, "iconbtn watch-btn", null, classes, { on: get(query) });
				set_attribute(button, "title", get(query) ? `Être prévenu des nouvelles ventes de « ${get(query)} »` : "Mes alertes du marché");
				set_text(text, get(query) ? "Créer une alerte" : "Alertes");
				if (select_value !== (select_value = get(sort))) select.value = (select.__value = select_value) ?? "", select_option(select, select_value);
			});
			delegated("click", button, () => set(watching, { prefill: get(query) ? {
				q: get(query),
				rarity: get(rarity)
			} : null }, true));
			delegated("change", select, (e) => refilter(() => set(sort, e.currentTarget.value, true)));
			append($$anchor, div_1);
		};
		if_block(node, ($$render) => {
			if (get(tab) === "browse") $$render(consequent_1);
		});
		reset(div);
		var div_4 = sibling(div, 2);
		each(div_4, 21, () => get(tabs), index, ($$anchor, $$item) => {
			var $$array_1 = user_derived(() => to_array(get($$item), 3));
			let id = () => get($$array_1)[0];
			let label = () => get($$array_1)[1];
			let short = () => get($$array_1)[2];
			var button_1 = root_3$13();
			let classes_1;
			var span_1 = child(button_1);
			var text_3 = only_child(span_1, true);
			var text_4 = only_child(sibling(span_1), true);
			reset(button_1);
			template_effect(() => {
				set_attribute(button_1, "aria-selected", get(tab) === id());
				classes_1 = set_class(button_1, 1, "", null, classes_1, { on: get(tab) === id() });
				set_text(text_3, label());
				set_text(text_4, short() ?? label());
			});
			delegated("click", button_1, (e) => {
				set(tab, id(), true);
				e.currentTarget.scrollIntoView({
					block: "nearest",
					inline: "nearest",
					behavior: "smooth"
				});
			});
			append($$anchor, button_1);
		});
		reset(div_4);
		action(div_4, ($$node, $$action_arg) => scrollFade?.($$node, $$action_arg), () => ({ axis: "x" }));
		var node_5 = sibling(div_4, 2);
		var consequent_2 = ($$anchor) => {
			RarityChips($$anchor, {
				class: "mkt-filter",
				get value() {
					return get(rarity);
				},
				onchange: (r) => refilter(() => set(rarity, r, true))
			});
		};
		var consequent_7 = ($$anchor) => {
			var fragment_2 = root_9$10();
			var div_5 = first_child(fragment_2);
			var div_6 = child(div_5);
			each(div_6, 21, () => DEALS, (d) => d.id, ($$anchor, d) => {
				var button_2 = root_4$13();
				let classes_2;
				var text_5 = child(button_2, true);
				var text_6 = only_child(sibling(text_5), true);
				reset(button_2);
				template_effect(() => {
					set_attribute(button_2, "aria-checked", get(deal) === get(d).id);
					classes_2 = set_class(button_2, 1, "", null, classes_2, { on: get(deal) === get(d).id });
					set_text(text_5, get(d).label);
					set_text(text_6, get(byDeal)[get(d).id].length);
				});
				delegated("click", button_2, () => set(deal, get(d).id, true));
				append($$anchor, button_2);
			});
			reset(div_6);
			var label_1 = sibling(div_6, 2);
			var input = sibling(child(label_1));
			remove_input_defaults(input);
			reset(label_1);
			reset(div_5);
			var node_6 = sibling(div_5, 2);
			RarityChips(node_6, {
				class: "mkt-filter",
				get value() {
					return get(dealRarity);
				},
				onchange: (r) => set(dealRarity, r, true)
			});
			var div_7 = sibling(node_6, 2);
			var span_4 = child(div_7);
			var b = child(span_4);
			var text_7 = only_child(b, true);
			var text_8 = sibling(b);
			var node_7 = sibling(text_8);
			var consequent_3 = ($$anchor) => {
				var fragment_3 = root_5$13();
				var text_9 = first_child(fragment_3, true);
				text_9.nodeValue = " · ";
				var span_5 = sibling(text_9);
				var text_10 = sibling(child(span_5));
				reset(span_5);
				template_effect(() => set_text(text_10, `${get(pricing) ?? ""} prix en cours`));
				append($$anchor, fragment_3);
			};
			if_block(node_7, ($$render) => {
				if (get(pricing)) $$render(consequent_3);
			});
			reset(span_4);
			var node_8 = sibling(span_4, 2);
			var consequent_4 = ($$anchor) => {
				append($$anchor, root_6$12());
			};
			if_block(node_8, ($$render) => {
				if (get(scan).error) $$render(consequent_4);
			});
			var node_9 = sibling(node_8, 2);
			var consequent_6 = ($$anchor) => {
				var button_3 = root_8$11();
				var node_10 = child(button_3);
				var consequent_5 = ($$anchor) => {
					append($$anchor, root_7$12());
				};
				if_block(node_10, ($$render) => {
					if (get(scan).loading) $$render(consequent_5);
				});
				next();
				reset(button_3);
				template_effect(() => button_3.disabled = get(scan).loading);
				delegated("click", button_3, scanMore);
				append($$anchor, button_3);
			};
			if_block(node_9, ($$render) => {
				if (get(scan).more || get(scan).error) $$render(consequent_6);
			});
			reset(div_7);
			template_effect(() => {
				set_text(text_7, get(found).length);
				set_text(text_8, ` affaire${get(found).length > 1 ? "s" : ""} parmi ${get(live).length ?? ""} vente${get(live).length > 1 ? "s" : ""} vue${get(live).length > 1 ? "s" : ""}`);
			});
			bind_value(input, () => get(maxPrice), ($$value) => set(maxPrice, $$value));
			append($$anchor, fragment_2);
		};
		if_block(node_5, ($$render) => {
			if (get(tab) === "browse") $$render(consequent_2);
			else if (get(tab) === "deals") $$render(consequent_7, 1);
		});
		var node_11 = sibling(node_5, 2);
		var consequent_8 = ($$anchor) => {
			var div_8 = root_10$9();
			var button_4 = sibling(child(div_8));
			reset(div_8);
			delegated("click", button_4, () => get(tab) === "browse" ? list.go() : loadMine());
			append($$anchor, div_8);
		};
		var consequent_9 = ($$anchor) => {
			var div_9 = root_12$9();
			each(div_9, 20, () => Array(10), index, ($$anchor, _) => {
				append($$anchor, root_11$9());
			});
			reset(div_9);
			append($$anchor, div_9);
		};
		var consequent_13 = ($$anchor) => {
			var div_11 = root_15$7();
			var b_1 = child(div_11);
			var text_11 = only_child(b_1, true);
			var node_12 = sibling(b_1, 2);
			var consequent_12 = ($$anchor) => {
				const wider = user_derived(() => DEALS.find((d) => d.id !== get(deal) && get(byDeal)[d.id].length));
				var fragment_4 = comment();
				var node_13 = first_child(fragment_4);
				var consequent_10 = ($$anchor) => {
					var button_5 = root_13$9();
					var text_12 = only_child(button_5);
					template_effect(() => set_text(text_12, `Voir « ${get(wider).label ?? ""} » : ${get(byDeal)[get(wider).id].length ?? ""} vente${get(byDeal)[get(wider).id].length > 1 ? "s" : ""}`));
					delegated("click", button_5, () => set(deal, get(wider).id, true));
					append($$anchor, button_5);
				};
				var consequent_11 = ($$anchor) => {
					var button_6 = root_14$7();
					template_effect(() => button_6.disabled = get(scan).loading);
					delegated("click", button_6, scanMore);
					append($$anchor, button_6);
				};
				if_block(node_13, ($$render) => {
					if (get(wider)) $$render(consequent_10);
					else if (get(scan).more) $$render(consequent_11, 1);
				});
				append($$anchor, fragment_4);
			};
			if_block(node_12, ($$render) => {
				if (get(tab) === "deals") $$render(consequent_12);
			});
			reset(div_11);
			template_effect(() => set_text(text_11, EMPTY[get(tab)]));
			append($$anchor, div_11);
		};
		var alternate = ($$anchor) => {
			var fragment_5 = root_20$4();
			var div_12 = first_child(fragment_5);
			let classes_3;
			each(div_12, 21, () => get(shown), (a) => a.id, ($$anchor, a) => {
				const gap = user_derived(() => gapTag(get(a).price, worth.get(worthKey(get(a).card))));
				var div_13 = root_18$7();
				var button_7 = child(div_13);
				Card(child(button_7), {
					get card() {
						return get(a).card;
					},
					get shiny() {
						return get(a).is_shiny;
					}
				});
				reset(button_7);
				var div_14 = sibling(button_7, 2);
				var span_8 = child(div_14);
				var span_9 = child(span_8);
				var text_13 = sibling(child(span_9), 1, true);
				reset(span_9);
				var node_15 = sibling(span_9, 2);
				var consequent_14 = ($$anchor) => {
					var span_10 = root_16$7();
					var text_14 = only_child(span_10, true);
					template_effect(($0) => {
						set_attribute(span_10, "data-z", get(gap).zone);
						set_attribute(span_10, "title", `Prix du marché : ${$0 ?? ""} WikiBidous`);
						set_text(text_14, get(gap).text);
					}, [() => nf(worth.get(worthKey(get(a).card)))]);
					append($$anchor, span_10);
				};
				if_block(node_15, ($$render) => {
					if (get(gap)) $$render(consequent_14);
				});
				reset(span_8);
				var span_11 = sibling(span_8, 2);
				let classes_4;
				var text_15 = only_child(span_11, true);
				reset(div_14);
				var div_15 = sibling(div_14, 2);
				var span_12 = child(div_15);
				let classes_5;
				var text_16 = only_child(span_12, true);
				var node_16 = sibling(span_12, 2);
				var consequent_15 = ($$anchor) => {
					var span_13 = root_17$7();
					var text_17 = only_child(span_13);
					template_effect(($0, $1) => {
						set_attribute(span_13, "title", `Cette carte est en vente ${$0 ?? ""} fois sur cette page`);
						set_text(text_17, `x${$1 ?? ""}`);
					}, [() => get(dupes).get(get(a).card.id), () => get(dupes).get(get(a).card.id)]);
					append($$anchor, span_13);
				};
				var d_1 = user_derived(() => get(dupes).get(get(a).card.id) > 1);
				if_block(node_16, ($$render) => {
					if (get(d_1)) $$render(consequent_15);
				});
				reset(div_15);
				reset(div_13);
				action(div_13, ($$node, $$action_arg) => worthOf.watch?.($$node, $$action_arg), () => get(a).card);
				template_effect(($0, $1, $2) => {
					set_attribute(button_7, "aria-label", get(a).card.title);
					set_attribute(span_9, "title", get(a).bid != null ? "Enchère actuelle" : "Mise de départ");
					set_text(text_13, $0);
					classes_4 = set_class(span_11, 1, "auc-end", null, classes_4, { soon: $1 });
					set_text(text_15, $2);
					classes_5 = set_class(span_12, 1, "auc-seller", null, classes_5, { lead: get(a).currentBidderId === data.userId && get(a).status === "active" });
					set_text(text_16, get(a).mine ? "Votre vente" : get(a).currentBidderId === data.userId && get(a).status === "active" ? "Vous êtes en tête" : get(a).seller ? `Vendu par ${get(a).seller}` : "");
				}, [
					() => nf(get(a).price),
					() => get(a).status === "active" && secondsUntil(get(a).endAt, get(now)) < 3600,
					() => statusLabel(get(a))
				]);
				delegated("click", button_7, () => set(selected, get(a), true));
				append($$anchor, div_13);
			});
			reset(div_12);
			var node_17 = sibling(div_12, 2);
			var consequent_16 = ($$anchor) => {
				var p_1 = root_19$5();
				p_1.textContent = "Le jeu ne renvoie que les 50 plus récentes.";
				append($$anchor, p_1);
			};
			if_block(node_17, ($$render) => {
				if (get(capped)) $$render(consequent_16);
			});
			var node_18 = sibling(node_17, 2);
			var consequent_17 = ($$anchor) => {
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
			if_block(node_18, ($$render) => {
				if (get(tab) === "browse") $$render(consequent_17);
			});
			template_effect(() => classes_3 = set_class(div_12, 1, "grid", null, classes_3, { dim: get(tab) === "browse" && list.loading }));
			append($$anchor, fragment_5);
		};
		if_block(node_11, ($$render) => {
			if (get(tab) === "browse" && list.error || get(tab) !== "browse" && get(tab) !== "deals" && get(mineError)) $$render(consequent_8);
			else if (!get(shown) || get(tab) === "deals" && !get(live).length && get(scan).loading) $$render(consequent_9, 1);
			else if (get(shown).length === 0) $$render(consequent_13, 2);
			else $$render(alternate, -1);
		});
		var node_19 = sibling(node_11, 2);
		var consequent_18 = ($$anchor) => {
			WatchPanel($$anchor, {
				get prefill() {
					return get(watching).prefill;
				},
				onclose: () => set(watching, null),
				onsearch: showWatch
			});
		};
		if_block(node_19, ($$render) => {
			if (get(watching)) $$render(consequent_18);
		});
		var node_20 = sibling(node_19, 2);
		var consequent_19 = ($$anchor) => {
			var fragment_8 = comment();
			key(first_child(fragment_8), () => get(selected).id, ($$anchor) => {
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
			append($$anchor, fragment_8);
		};
		if_block(node_20, ($$render) => {
			if (get(selected)) $$render(consequent_19);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate(["click", "change"]);
	var root$20 = from_html(`<img alt="" loading="lazy" crossorigin="anonymous"/>`);
	var root_1$20 = from_html(`<img alt="" loading="lazy"/>`);
	var root_2$16 = from_html(`<span aria-hidden="true"><!> <span class="cthumb-r"> </span></span>`);
	function CardThumb($$anchor, $$props) {
		push($$props, true);
		let shiny = prop($$props, "shiny", 3, false);
		let failed = state(false);
		let paper = state(false);
		const photo = user_derived(() => $$props.card.image_url && !get(failed) && !(settings.hideSensitive && $$props.card.nsfw_image));
		var span = root_2$16();
		let classes;
		var node = child(span);
		var consequent = ($$anchor) => {
			var img = root$20();
			template_effect(() => set_attribute(img, "src", $$props.card.image_url));
			event("load", img, (e) => set(paper, seeThrough(e.currentTarget), true));
			event("error", img, () => set(failed, true));
			replay_events(img);
			append($$anchor, img);
		};
		var alternate = ($$anchor) => {
			var img_1 = root_1$20();
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
				paper: get(paper),
				art: !get(photo),
				shiny: shiny()
			});
			set_attribute(span, "data-r", $$props.card.rarity);
			set_text(text, $$props.card.rarity);
		});
		append($$anchor, span);
		pop();
	}
	var root$19 = from_html(`<span class="tside-total is-none">Non estimé</span>`);
	var root_1$19 = from_html(`<span class="tside-total"> </span>`);
	var root_2$15 = from_html(`<div class="tside-none"> </div>`);
	var root_3$12 = from_html(`<span> </span>`);
	var root_4$12 = from_html(`<button class="tmini"><!> <span class="tmini-t"> </span> <span class="tmini-v"> </span></button>`);
	var root_5$12 = from_html(`<span class="tmini-more"></span>`);
	var root_6$11 = from_html(`<button class="btn tmini-all"> </button>`);
	var root_7$11 = from_html(`<div class="tside-minis"><!> <!></div> <!>`, 1);
	var root_8$10 = from_html(`<div class="tside-sum"><b> </b><!> <span class="tside-rar"></span></div> <!>`, 1);
	var root_9$9 = from_html(`<button class="card-btn"><!></button>`);
	var root_10$8 = from_html(`<div class="tside-coins"><!><b> </b><span>WikiBidous</span></div>`);
	var root_11$8 = from_html(`<div class="tside-chip"><!><span>+ <b> </b> </span></div>`);
	var root_12$8 = from_html(`<div class="tside-cards"><!> <!></div> <!>`, 1);
	var root_13$8 = from_html(`<section class="tside"><header class="tside-head"><span> </span><!></header> <!></section>`);
	function TradeSide($$anchor, $$props) {
		push($$props, true);
		let coins = prop($$props, "coins", 3, 0), cols = prop($$props, "cols", 3, 1), narrow = prop($$props, "narrow", 3, false), empty = prop($$props, "empty", 3, "Rien"), compact = prop($$props, "compact", 3, false);
		const byRarity = user_derived(() => RARITIES_DESC.map((r) => [r, $$props.items.filter((it) => it.card.rarity === r).length]).filter(([, n]) => n));
		const STEP = 120;
		const PREVIEW = 8;
		let open = state(!(typeof matchMedia === "function" && matchMedia("(max-width:900px)").matches));
		let limit = state(STEP);
		const shown = user_derived(() => get(open) ? $$props.items.slice(0, get(limit)) : $$props.items.slice(0, PREVIEW));
		const value = user_derived(() => sideValue($$props.items, coins(), $$props.values));
		const none = user_derived(() => get(value).unknown > 0 && get(value).unknown === $$props.items.length && !coins());
		const missing = user_derived(() => get(value).unknown ? `${get(value).unknown} carte${get(value).unknown > 1 ? "s" : ""} sans valeur estimée` : null);
		var section = root_13$8();
		var header = child(section);
		var span = child(header);
		var text$2 = only_child(span, true);
		var node = sibling(span);
		var consequent = ($$anchor) => {
			var span_1 = root$19();
			template_effect(() => set_attribute(span_1, "title", get(missing)));
			append($$anchor, span_1);
		};
		var alternate = ($$anchor) => {
			var span_2 = root_1$19();
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
			var div = root_2$15();
			var text_2 = only_child(div, true);
			template_effect(() => set_text(text_2, empty()));
			append($$anchor, div);
		};
		var consequent_6 = ($$anchor) => {
			var fragment = root_8$10();
			var div_1 = first_child(fragment);
			var b = child(div_1);
			var text_3 = only_child(b);
			var node_2 = sibling(b);
			var consequent_2 = ($$anchor) => {
				var text_4 = text();
				template_effect(($0) => set_text(text_4, `+ ${$0 ?? ""} WikiBidous`), [() => nf(coins())]);
				append($$anchor, text_4);
			};
			if_block(node_2, ($$render) => {
				if (coins()) $$render(consequent_2);
			});
			var span_3 = sibling(node_2, 2);
			each(span_3, 21, () => get(byRarity), ([r, n]) => r, ($$anchor, $$item) => {
				var $$array = user_derived(() => to_array(get($$item), 2));
				let r = () => get($$array)[0];
				let n = () => get($$array)[1];
				var span_4 = root_3$12();
				var text_5 = only_child(span_4);
				template_effect(() => {
					set_attribute(span_4, "data-r", r());
					set_text(text_5, `${r() ?? ""} ${n() ?? ""}`);
				});
				append($$anchor, span_4);
			});
			reset(span_3);
			reset(div_1);
			var node_3 = sibling(div_1, 2);
			var consequent_5 = ($$anchor) => {
				var fragment_2 = root_7$11();
				var div_2 = first_child(fragment_2);
				var node_4 = child(div_2);
				each(node_4, 17, () => get(shown), (it) => it.itemId ?? it.userCardId, ($$anchor, it) => {
					const val = user_derived(() => $$props.values.get(get(it).card.id));
					var button = root_4$12();
					var node_5 = child(button);
					CardThumb(node_5, {
						get card() {
							return get(it).card;
						},
						get shiny() {
							return get(it).is_shiny;
						}
					});
					var span_5 = sibling(node_5, 2);
					var text_6 = only_child(span_5, true);
					var text_7 = only_child(sibling(span_5, 2), true);
					reset(button);
					template_effect(($0) => {
						set_attribute(button, "title", get(it).card.title);
						set_text(text_6, get(it).card.title);
						set_text(text_7, $0);
					}, [() => get(val) != null ? `${nf(get(val))} pts` : ""]);
					delegated("click", button, () => $$props.onopen?.(get(it)));
					append($$anchor, button);
				});
				var node_6 = sibling(node_4, 2);
				var consequent_3 = ($$anchor) => {
					var span_7 = root_5$12();
					action(span_7, ($$node, $$action_arg) => inView?.($$node, $$action_arg), () => ({
						onEnter: () => set(limit, get(limit) + STEP),
						key: get(limit)
					}));
					append($$anchor, span_7);
				};
				if_block(node_6, ($$render) => {
					if (get(open) && $$props.items.length > get(limit)) $$render(consequent_3);
				});
				reset(div_2);
				var node_7 = sibling(div_2, 2);
				var consequent_4 = ($$anchor) => {
					var button_1 = root_6$11();
					var text_8 = only_child(button_1);
					template_effect(() => set_text(text_8, `Voir les ${$$props.items.length ?? ""} cartes`));
					delegated("click", button_1, () => set(open, true));
					append($$anchor, button_1);
				};
				if_block(node_7, ($$render) => {
					if (!get(open) && $$props.items.length > PREVIEW) $$render(consequent_4);
				});
				append($$anchor, fragment_2);
			};
			if_block(node_3, ($$render) => {
				if ($$props.items.length) $$render(consequent_5);
			});
			template_effect(() => set_text(text_3, `${$$props.items.length ?? ""} carte${$$props.items.length > 1 ? "s" : ""}`));
			append($$anchor, fragment);
		};
		var alternate_1 = ($$anchor) => {
			var fragment_3 = root_12$8();
			var div_3 = first_child(fragment_3);
			let styles;
			var node_8 = child(div_3);
			each(node_8, 17, () => $$props.items, (it) => it.itemId ?? it.userCardId, ($$anchor, it) => {
				var button_2 = root_9$9();
				var node_9 = child(button_2);
				{
					let $0 = user_derived(() => $$props.values.get(get(it).card.id));
					Card(node_9, {
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
				reset(button_2);
				template_effect(() => set_attribute(button_2, "aria-label", get(it).card.title));
				delegated("click", button_2, () => $$props.onopen?.(get(it)));
				append($$anchor, button_2);
			});
			var node_10 = sibling(node_8, 2);
			var consequent_7 = ($$anchor) => {
				var div_4 = root_10$8();
				var node_11 = child(div_4);
				Icon(node_11, { name: "coin" });
				var text_9 = only_child(sibling(node_11), true);
				next();
				reset(div_4);
				template_effect(($0) => set_text(text_9, $0), [() => nf(coins())]);
				append($$anchor, div_4);
			};
			if_block(node_10, ($$render) => {
				if (coins() && !$$props.items.length) $$render(consequent_7);
			});
			reset(div_3);
			var node_12 = sibling(div_3, 2);
			var consequent_8 = ($$anchor) => {
				var div_5 = root_11$8();
				var node_13 = child(div_5);
				Icon(node_13, { name: "coin" });
				var span_8 = sibling(node_13);
				var b_2 = sibling(child(span_8));
				var text_10 = only_child(b_2, true);
				var text_11 = sibling(b_2);
				reset(span_8);
				reset(div_5);
				template_effect(($0) => {
					set_text(text_10, $0);
					set_text(text_11, ` ${narrow() ? "wb" : "WikiBidous"}`);
				}, [() => nf(coins())]);
				append($$anchor, div_5);
			};
			if_block(node_12, ($$render) => {
				if (coins() && $$props.items.length) $$render(consequent_8);
			});
			template_effect(() => styles = set_style(div_3, "", styles, { "--cols": cols() }));
			append($$anchor, fragment_3);
		};
		if_block(node_1, ($$render) => {
			if (!$$props.items.length && !coins()) $$render(consequent_1);
			else if (compact()) $$render(consequent_6, 1);
			else $$render(alternate_1, -1);
		});
		reset(section);
		template_effect(() => set_text(text$2, $$props.label));
		append($$anchor, section);
		pop();
	}
	delegate(["click"]);
	var root$18 = from_html(`<b> </b>`);
	var root_1$18 = from_html(`<span> </span>`);
	var root_2$14 = from_html(`<div class="tm-verdict"><!> <!> <!></div>`);
	function TradeVerdict($$anchor, $$props) {
		push($$props, true);
		var div = root_2$14();
		var node = child(div);
		Icon(node, { name: "trades" });
		var node_1 = sibling(node, 2);
		var consequent = ($$anchor) => {
			var b = root$18();
			var text = only_child(b, true);
			template_effect(($0) => set_text(text, $0), [() => verdictTitle($$props.v)]);
			append($$anchor, b);
		};
		if_block(node_1, ($$render) => {
			if ($$props.v.kind !== "unknown") $$render(consequent);
		});
		var node_2 = sibling(node_1, 2);
		var consequent_1 = ($$anchor) => {
			var span = root_1$18();
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
	var root$17 = from_html(`<div class="empty"><b> </b><button class="btn">Réessayer</button></div>`);
	var root_1$17 = from_html(`<div class="loading-more"><span class="spin"></span></div>`);
	var root_2$13 = from_html(`<div class="empty"><b>Aucun message.</b><span> </span></div>`);
	var root_3$11 = from_html(`<button class="link-btn chat-older"> </button>`);
	var root_4$11 = from_html(`<div><span> </span><time class="nowrap"> </time></div>`);
	var root_5$11 = from_html(`<button class="chat-trade"><!> </button>`);
	var root_6$10 = from_html(`<!> <!>`, 1);
	var root_7$10 = from_html(`<div class="modal-msg chat-msg"> </div>`);
	var root_8$9 = from_html(`<div class="chat"><div class="chat-feed" aria-live="polite"><!></div> <form class="chat-form"><input class="search chat-input" maxlength="500"/> <button class="btn primary">Envoyer</button></form> <!></div>`);
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
		const STEP = 80;
		let back = state(STEP);
		const drawn = user_derived(() => get(feed) ? get(feed).slice(-get(back)) : null);
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
		var div = root_8$9();
		var div_1 = child(div);
		var node = child(div_1);
		var consequent = ($$anchor) => {
			var div_2 = root$17();
			var b_1 = child(div_2);
			var text_1 = only_child(b_1, true);
			var button = sibling(b_1);
			reset(div_2);
			template_effect(() => set_text(text_1, get(loadErr)));
			delegated("click", button, load);
			append($$anchor, div_2);
		};
		var consequent_1 = ($$anchor) => {
			append($$anchor, root_1$17());
		};
		var consequent_2 = ($$anchor) => {
			var div_4 = root_2$13();
			var text_2 = only_child(sibling(child(div_4)));
			reset(div_4);
			template_effect(() => set_text(text_2, `Écrivez à ${$$props.friend.username ?? ""} pour négocier.`));
			append($$anchor, div_4);
		};
		var alternate_1 = ($$anchor) => {
			var fragment = root_6$10();
			var node_1 = first_child(fragment);
			var consequent_3 = ($$anchor) => {
				var button_1 = root_3$11();
				var text_3 = only_child(button_1);
				template_effect(() => set_text(text_3, `Messages précédents (${get(feed).length - get(back)})`));
				delegated("click", button_1, () => {
					stick = false;
					set(back, get(back) + STEP);
				});
				append($$anchor, button_1);
			};
			if_block(node_1, ($$render) => {
				if (get(feed).length > get(back)) $$render(consequent_3);
			});
			each(sibling(node_1, 2), 17, () => get(drawn), (f) => f.kind + (f.m?.id ?? f.t.id), ($$anchor, f) => {
				var fragment_1 = comment();
				var node_3 = first_child(fragment_1);
				var consequent_4 = ($$anchor) => {
					var div_5 = root_4$11();
					let classes;
					var span_1 = child(div_5);
					var text_4 = only_child(span_1, true);
					var text_5 = only_child(sibling(span_1), true);
					reset(div_5);
					template_effect(($0) => {
						classes = set_class(div_5, 1, "bubble", null, classes, { mine: get(f).m.mine });
						set_text(text_4, get(f).m.content);
						set_text(text_5, $0);
					}, [() => ago(get(f).m.at)]);
					append($$anchor, div_5);
				};
				var alternate = ($$anchor) => {
					var button_2 = root_5$11();
					var node_4 = child(button_2);
					Icon(node_4, { name: "trades" });
					var text_6 = sibling(node_4);
					reset(button_2);
					template_effect(($0) => set_text(text_6, ` Échange · ${$0 ?? ""} · ${get(f).t.give.length ?? ""} contre ${get(f).t.get.length ?? ""}`), [() => statusLabel(get(f).t.status)]);
					delegated("click", button_2, () => $$props.onopentrade?.(get(f).t));
					append($$anchor, button_2);
				};
				if_block(node_3, ($$render) => {
					if (get(f).kind === "msg") $$render(consequent_4);
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
		var button_3 = sibling(input, 2);
		reset(form);
		var node_5 = sibling(form, 2);
		var consequent_5 = ($$anchor) => {
			var div_6 = root_7$10();
			var text_7 = only_child(div_6, true);
			template_effect(() => set_text(text_7, get(msg)));
			append($$anchor, div_6);
		};
		if_block(node_5, ($$render) => {
			if (get(msg)) $$render(consequent_5);
		});
		reset(div);
		template_effect(($0) => {
			set_attribute(div, "aria-label", `Conversation avec ${$$props.friend.username ?? ""}`);
			set_attribute(input, "placeholder", `Écrire à ${$$props.friend.username ?? ""}...`);
			button_3.disabled = $0;
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
	var root_1$16 = from_html(`<button class="iconbtn tp-back" aria-label="Retour à la liste"><!></button>`);
	var root_2$12 = from_html(`<p class="tp-earlier"><span><b> </b> </span><button class="btn">Voir la dernière offre</button></p>`);
	var root_3$10 = from_html(`<li class="tp-fold"><button class="link-btn"> </button></li>`);
	var root_4$10 = from_html(`<button><span class="tp-chain-what"><b> </b> <span class="tp-step-deal"> </span></span> <span class="nowrap tp-chain-when"> </span></button>`);
	var root_5$10 = from_html(`<span class="nowrap tp-chain-when"> </span>`);
	var root_6$9 = from_html(`<span class="tp-chain-what"><b> </b> </span> <!>`, 1);
	var root_7$9 = from_html(`<li><!></li>`);
	var root_8$8 = from_html(`<section class="tp-chain"><h3>Négociation</h3> <ol></ol></section>`);
	var root_9$8 = from_html(`Accepter l'échange ? Vous donnez <b> </b> et recevez <b> </b>.`, 1);
	var root_10$7 = from_html(`<div class="tp-confirm" role="alertdialog" aria-label="Confirmation"><p class="confirm-text"><!></p> <div class="tp-actions"><button class="btn">Retour</button> <button> </button></div></div>`);
	var root_11$7 = from_html(`<div class="modal-msg tp-msg" role="alert"> </div>`);
	var root_12$7 = from_html(`<button class="btn">Contre-offre</button>`);
	var root_13$7 = from_html(`<div class="tp-actions"><button class="btn danger">Refuser</button> <!> <button class="btn primary">Accepter</button></div>`);
	var root_14$6 = from_html(`<div class="tp-actions"><button class="btn danger">Annuler l'offre</button></div>`);
	var root_15$6 = from_html(`<!> <!>`, 1);
	var root_16$6 = from_html(`<footer class="tp-foot"><!></footer>`);
	var root_17$6 = from_html(`<div class="tp-body"><!> <div><!> <!> <!></div> <!></div> <!>`, 1);
	var root_18$6 = from_html(`<section class="tp" aria-labelledby="wm-tp-title"><header class="tp-head"><!> <!> <div class="tp-title"><h2 id="wm-tp-title"> </h2> <span class="tp-sub"><span class="trade-status"> </span><span class="nowrap"> </span></span></div> <div class="modal-tabs tp-mode" role="tablist" aria-label="Affichage"><button role="tab"><!>Échange</button> <button role="tab"><!>Discussion</button></div></header> <!></section> <!>`, 1);
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
		const FOLD_FROM = 8;
		const KEEP_END = 4;
		let chainOpen = state(false);
		const folded = (i) => !get(chainOpen) && get(steps).length > FOLD_FROM && i >= 1 && i < get(steps).length - KEEP_END && get(steps)[i].offer?.id !== get(o).id;
		const foldedCount = user_derived(() => get(steps).filter((_, i) => folded(i)).length);
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
		const COMPACT_FROM = 16;
		const compact = user_derived(() => get(o).give.length + get(o).get.length > COMPACT_FROM);
		const lay = user_derived(() => {
			if (!get(box) || get(compact)) return null;
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
				const write = () => data.tradeAction($$props.trade.id, action);
				await (action === "accept" ? sounded(write) : write());
				if (action === "accept") forgetCollection();
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
		var fragment = root_18$6();
		event("keydown", $window, onKey);
		var section = first_child(fragment);
		var header = child(section);
		var node = child(header);
		var consequent = ($$anchor) => {
			var button = root_1$16();
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
		var alternate_4 = ($$anchor) => {
			var fragment_3 = root_17$6();
			var div_2 = first_child(fragment_3);
			var node_7 = child(div_2);
			var consequent_2 = ($$anchor) => {
				var p = root_2$12();
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
					get compact() {
						return get(compact);
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
					get compact() {
						return get(compact);
					},
					get values() {
						return $$props.values;
					},
					onopen: (it) => set(card, it, true)
				});
			}
			reset(div_3);
			var node_11 = sibling(div_3, 2);
			var consequent_7 = ($$anchor) => {
				var section_1 = root_8$8();
				var ol = sibling(child(section_1), 2);
				each(ol, 21, () => get(steps), index, ($$anchor, s, i) => {
					var fragment_4 = comment();
					var node_12 = first_child(fragment_4);
					var consequent_4 = ($$anchor) => {
						var fragment_5 = comment();
						var node_13 = first_child(fragment_5);
						var consequent_3 = ($$anchor) => {
							var li = root_3$10();
							var button_4 = child(li);
							var text_5 = only_child(button_4);
							reset(li);
							template_effect(() => set_text(text_5, `Voir les ${get(foldedCount) ?? ""} étapes intermédiaires`));
							delegated("click", button_4, () => set(chainOpen, true));
							append($$anchor, li);
						};
						if_block(node_13, ($$render) => {
							if (i === 1) $$render(consequent_3);
						});
						append($$anchor, fragment_5);
					};
					var d = user_derived(() => folded(i));
					var alternate_1 = ($$anchor) => {
						var li_1 = root_7$9();
						let classes_3;
						var node_14 = child(li_1);
						var consequent_5 = ($$anchor) => {
							var button_5 = root_4$10();
							let classes_4;
							var span_4 = child(button_5);
							var b_1 = child(span_4);
							var text_6 = only_child(b_1, true);
							var text_7 = sibling(b_1);
							var text_8 = only_child(sibling(text_7), true);
							reset(span_4);
							var text_9 = only_child(sibling(span_4, 2), true);
							reset(button_5);
							template_effect(($0, $1) => {
								classes_4 = set_class(button_5, 1, "tp-step", null, classes_4, { on: get(s).offer.id === get(o).id });
								set_attribute(button_5, "aria-pressed", get(s).offer.id === get(o).id);
								set_text(text_6, get(s).text);
								set_text(text_7, ` ${get(s).by ?? ""}`);
								set_text(text_8, $0);
								set_text(text_9, $1);
							}, [() => dealLine(get(s).offer.give.length, get(s).offer.giveCoins, get(s).offer.get.length, get(s).offer.getCoins), () => ago(get(s).at)]);
							delegated("click", button_5, () => set(viewing, get(s).offer.id, true));
							append($$anchor, button_5);
						};
						var alternate = ($$anchor) => {
							var fragment_6 = root_6$9();
							var span_7 = first_child(fragment_6);
							var b_2 = child(span_7);
							var text_10 = only_child(b_2, true);
							var text_11 = sibling(b_2);
							reset(span_7);
							var node_15 = sibling(span_7, 2);
							var consequent_6 = ($$anchor) => {
								var span_8 = root_5$10();
								var text_12 = only_child(span_8, true);
								template_effect(($0) => set_text(text_12, $0), [() => ago(get(s).at)]);
								append($$anchor, span_8);
							};
							if_block(node_15, ($$render) => {
								if (get(s).at) $$render(consequent_6);
							});
							template_effect(() => {
								set_text(text_10, get(s).text);
								set_text(text_11, ` ${get(s).by ?? ""}`);
							});
							append($$anchor, fragment_6);
						};
						if_block(node_14, ($$render) => {
							if (get(s).offer) $$render(consequent_5);
							else $$render(alternate, -1);
						});
						reset(li_1);
						template_effect(() => {
							set_attribute(li_1, "data-k", get(s).kind);
							classes_3 = set_class(li_1, 1, "", null, classes_3, { now: i === get(steps).length - 1 });
						});
						append($$anchor, li_1);
					};
					if_block(node_12, ($$render) => {
						if (get(d)) $$render(consequent_4);
						else $$render(alternate_1, -1);
					});
					append($$anchor, fragment_4);
				});
				reset(ol);
				reset(section_1);
				bind_element_size(section_1, "offsetHeight", ($$value) => set(chainH, $$value));
				append($$anchor, section_1);
			};
			if_block(node_11, ($$render) => {
				if (get(steps).length > 2 || $$props.trade.status !== "pending") $$render(consequent_7);
			});
			reset(div_2);
			var node_16 = sibling(div_2, 2);
			var consequent_15 = ($$anchor) => {
				var footer = root_16$6();
				var node_17 = child(footer);
				var consequent_10 = ($$anchor) => {
					var div_4 = root_10$7();
					var p_1 = child(div_4);
					var node_18 = child(p_1);
					var consequent_8 = ($$anchor) => {
						var fragment_7 = root_9$8();
						var b_3 = sibling(first_child(fragment_7));
						var text_13 = only_child(b_3, true);
						var text_14 = only_child(sibling(b_3, 2), true);
						next();
						template_effect(($0, $1) => {
							set_text(text_13, $0);
							set_text(text_14, $1);
						}, [() => moves($$props.trade.give, $$props.trade.giveCoins), () => moves($$props.trade.get, $$props.trade.getCoins)]);
						append($$anchor, fragment_7);
					};
					var consequent_9 = ($$anchor) => {
						var text_15 = text();
						template_effect(() => set_text(text_15, `Refuser l'offre de ${$$props.trade.other.username ?? ""} ? Aucune carte ni WikiBidou ne sera échangé.`));
						append($$anchor, text_15);
					};
					var alternate_2 = ($$anchor) => {
						var text_16 = text();
						template_effect(() => set_text(text_16, `Annuler votre offre à ${$$props.trade.other.username ?? ""} ? Aucune carte ni WikiBidou ne sera échangé.`));
						append($$anchor, text_16);
					};
					if_block(node_18, ($$render) => {
						if (get(ask) === "accept") $$render(consequent_8);
						else if (get(ask) === "decline") $$render(consequent_9, 1);
						else $$render(alternate_2, -1);
					});
					reset(p_1);
					var div_5 = sibling(p_1, 2);
					var button_6 = child(div_5);
					var button_7 = sibling(button_6, 2);
					var text_17 = only_child(button_7, true);
					reset(div_5);
					reset(div_4);
					template_effect(() => {
						button_6.disabled = get(busy);
						set_class(button_7, 1, `btn ${ACT[get(ask)][1] ?? ""}`);
						button_7.disabled = get(busy);
						set_text(text_17, get(busy) ? "Envoi..." : ACT[get(ask)][0]);
					});
					delegated("click", button_6, () => set(ask, null));
					delegated("click", button_7, () => act(get(ask)));
					append($$anchor, div_4);
				};
				var alternate_3 = ($$anchor) => {
					var fragment_10 = root_15$6();
					var node_19 = first_child(fragment_10);
					var consequent_11 = ($$anchor) => {
						var div_6 = root_11$7();
						var text_18 = only_child(div_6, true);
						template_effect(() => set_text(text_18, get(msg)));
						append($$anchor, div_6);
					};
					if_block(node_19, ($$render) => {
						if (get(msg)) $$render(consequent_11);
					});
					var node_20 = sibling(node_19, 2);
					var consequent_13 = ($$anchor) => {
						var div_7 = root_13$7();
						var button_8 = child(div_7);
						var node_21 = sibling(button_8, 2);
						var consequent_12 = ($$anchor) => {
							var button_9 = root_12$7();
							delegated("click", button_9, () => $$props.oncounter($$props.trade));
							append($$anchor, button_9);
						};
						if_block(node_21, ($$render) => {
							if ($$props.oncounter) $$render(consequent_12);
						});
						var button_10 = sibling(node_21, 2);
						reset(div_7);
						delegated("click", button_8, () => set(ask, "decline"));
						delegated("click", button_10, () => set(ask, "accept"));
						append($$anchor, div_7);
					};
					var consequent_14 = ($$anchor) => {
						var div_8 = root_14$6();
						delegated("click", only_child(div_8), () => set(ask, "cancel"));
						append($$anchor, div_8);
					};
					if_block(node_20, ($$render) => {
						if (get(canAnswer)) $$render(consequent_13);
						else if (get(canCancel)) $$render(consequent_14, 1);
					});
					append($$anchor, fragment_10);
				};
				if_block(node_17, ($$render) => {
					if (get(ask)) $$render(consequent_10);
					else $$render(alternate_3, -1);
				});
				reset(footer);
				append($$anchor, footer);
			};
			if_block(node_16, ($$render) => {
				if (!get(earlier) && (get(ask) || get(canAnswer) || get(canCancel) || get(msg))) $$render(consequent_15);
			});
			template_effect(() => {
				set_style(div_2, `${dealVars ?? ""};--card-w:${get(lay)?.w ?? DEAL.min ?? ""}px`);
				classes_2 = set_class(div_3, 1, "tp-sides", null, classes_2, {
					compact: get(compact),
					stacked: get(lay)?.stacked,
					scrolls: get(lay) && !get(lay).fits,
					measuring: !get(lay) && !get(compact)
				});
			});
			bind_resize_observer(div_2, "contentRect", ($$value) => set(box, $$value));
			append($$anchor, fragment_3);
		};
		if_block(node_5, ($$render) => {
			if (mode() === "chat") $$render(consequent_1);
			else $$render(alternate_4, -1);
		});
		reset(section);
		bind_this(section, ($$value) => set(root, $$value), () => get(root));
		var node_22 = sibling(section, 2);
		var consequent_16 = ($$anchor) => {
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
		if_block(node_22, ($$render) => {
			if (get(card)) $$render(consequent_16);
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
	var RANK = Object.fromEntries(RARITIES_DESC.map((r, i) => [r, i]));
	var added = (it) => Date.parse(it.obtained_at || "") || 0;
	var val = (values, it) => values.get(it.card.id) ?? -1;
	var byName = (a, b) => a.card.title.localeCompare(b.card.title, "fr", { sensitivity: "base" });
	var SORTS = {
		rarity: () => (a, b) => RANK[a.card.rarity] - RANK[b.card.rarity] || byName(a, b),
		value: (v) => (a, b) => val(v, b) - val(v, a) || RANK[a.card.rarity] - RANK[b.card.rarity] || byName(a, b),
		name: () => byName,
		recent: () => (a, b) => added(b) - added(a) || byName(a, b),
		starred: () => (a, b) => Number(!!b.starred) - Number(!!a.starred) || RANK[a.card.rarity] - RANK[b.card.rarity] || byName(a, b)
	};
	var PICK_SORTS = [
		["rarity", "Rareté"],
		["recent", "Récentes"],
		["starred", "Favoris d'abord"],
		["value", "Valeur estimée"],
		["name", "Nom"]
	];
	var allValued = (items, values) => items.every((it) => values.has(it.card.id));
	function pickList(items, { sort = "rarity", values, isLocked = () => false }) {
		const cmp = (SORTS[sort] ?? SORTS.rarity)(values);
		return items.map((it) => ({
			it,
			locked: !!isLocked(it)
		})).sort((a, b) => a.locked - b.locked || cmp(a.it, b.it)).map((x) => x.it);
	}
	var root$16 = from_html(`<option> </option>`);
	var root_1$15 = from_html(`<p class="sort-hint"> </p>`);
	var root_2$11 = from_html(`<span class="pick-lock"> </span>`);
	var root_3$9 = from_html(`<button><!> <!> <!></button>`);
	var root_4$9 = from_html(`<div class="empty"><b>Impossible de charger ces cartes.</b><button class="btn">Réessayer</button></div>`);
	var root_5$9 = from_html(`<div class="empty"><b> </b></div>`);
	var root_6$8 = from_html(`<span class="modal-msg">Impossible de charger la suite.</span><button class="btn">Réessayer</button>`, 1);
	var root_7$8 = from_html(`<span class="loading-more"><span class="spin"></span></span>`);
	var root_8$7 = from_html(`<div class="picker-more"><!></div>`);
	var root_9$7 = from_html(`<div class="picker"><div class="picker-bar"><!> <!> <!> <div class="isel" title="Trier les cartes"><!> <select aria-label="Trier"></select></div></div> <div class="picker-scroll"><!> <div></div> <!></div></div>`);
	function CardPicker($$anchor, $$props) {
		push($$props, true);
		let items = prop($$props, "items", 19, () => []), locked = prop($$props, "locked", 19, () => new Set()), loading = prop($$props, "loading", 3, false), error = prop($$props, "error", 3, false), more = prop($$props, "more", 3, null), loadingMore = prop($$props, "loadingMore", 3, false), moreError = prop($$props, "moreError", 3, false), lockReason = prop($$props, "lockReason", 3, () => "Échange en attente"), lockTitle = prop($$props, "lockTitle", 3, () => "Déjà dans un échange en attente");
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
		const shown = user_derived(() => pickList(items(), {
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
			$$props.onquery(next);
		};
		debouncedSearch(() => get(q), (text) => ask({ q: text }));
		user_effect(() => ask({
			rarity: get(rarity),
			sort: get(sort) === "value" ? "rarity" : get(sort),
			q: untrack(() => get(q)).trim()
		}));
		var div = root_9$7();
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
			var option = root$16();
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
		var node_4 = child(div_3);
		var consequent = ($$anchor) => {
			var p = root_1$15();
			var text_2 = only_child(p);
			template_effect(() => set_text(text_2, `Classées par valeur parmi les ${items().length ?? ""} cartes chargées.`));
			append($$anchor, p);
		};
		if_block(node_4, ($$render) => {
			if (get(sort) === "value" && more()) $$render(consequent);
		});
		var div_4 = sibling(node_4, 2);
		let classes;
		each(div_4, 21, () => get(shown), (it) => it.id, ($$anchor, it) => {
			const off = user_derived(() => isLocked(get(it)));
			const on = user_derived(() => $$props.picked.has(get(it).id));
			var button = root_3$9();
			let classes_1;
			var node_5 = child(button);
			{
				let $0 = user_derived(() => $$props.values.get(get(it).card.id));
				Card(node_5, {
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
			var node_6 = sibling(node_5, 2);
			PickMark(node_6, { get on() {
				return get(on);
			} });
			var node_7 = sibling(node_6, 2);
			var consequent_1 = ($$anchor) => {
				var span = root_2$11();
				var text_3 = only_child(span, true);
				template_effect(($0) => set_text(text_3, $0), [() => lockReason()(get(it))]);
				append($$anchor, span);
			};
			if_block(node_7, ($$render) => {
				if (get(off)) $$render(consequent_1);
			});
			reset(button);
			action(button, ($$node, $$action_arg) => $$props.watch?.($$node, $$action_arg), () => get(it).card);
			template_effect(($0) => {
				classes_1 = set_class(button, 1, "card-btn", null, classes_1, {
					picking: $$props.picked.size,
					picked: get(on)
				});
				button.disabled = get(off);
				set_attribute(button, "aria-pressed", get(on));
				set_attribute(button, "title", $0);
			}, [() => get(off) ? lockTitle()(get(it)) : get(it).card.title]);
			delegated("click", button, () => {
				pickSound(get(on));
				$$props.onpick(get(it));
			});
			append($$anchor, button);
		}, ($$anchor) => {
			var fragment = comment();
			var node_8 = first_child(fragment);
			var consequent_2 = ($$anchor) => {
				var div_5 = root_4$9();
				var button_1 = sibling(child(div_5));
				reset(div_5);
				delegated("click", button_1, function(...$$args) {
					$$props.onretry?.apply(this, $$args);
				});
				append($$anchor, div_5);
			};
			var alternate = ($$anchor) => {
				var div_6 = root_5$9();
				var text_4 = only_child(child(div_6), true);
				reset(div_6);
				template_effect(() => set_text(text_4, loading() ? "Chargement..." : items().length || get(q) || get(rarity) ? "Aucune carte ne correspond" : "Aucune carte"));
				append($$anchor, div_6);
			};
			if_block(node_8, ($$render) => {
				if (error() && !loading()) $$render(consequent_2);
				else $$render(alternate, -1);
			});
			append($$anchor, fragment);
		});
		reset(div_4);
		var node_9 = sibling(div_4, 2);
		var consequent_4 = ($$anchor) => {
			var div_7 = root_8$7();
			var node_10 = child(div_7);
			var consequent_3 = ($$anchor) => {
				var fragment_1 = root_6$8();
				delegated("click", sibling(first_child(fragment_1)), function(...$$args) {
					more()?.apply(this, $$args);
				});
				append($$anchor, fragment_1);
			};
			var alternate_1 = ($$anchor) => {
				append($$anchor, root_7$8());
			};
			if_block(node_10, ($$render) => {
				if (moreError() && !loadingMore()) $$render(consequent_3);
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
		if_block(node_9, ($$render) => {
			if (more()) $$render(consequent_4);
		});
		reset(div_3);
		reset(div);
		template_effect(() => classes = set_class(div_4, 1, "grid picker-grid", null, classes, { dim: loading() }));
		bind_select_value(select, () => get(sort), ($$value) => set(sort, $$value));
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var root$15 = from_html(`<span class="coins-field af-input-row"><!> <input class="af-input" type="number" min="0"/> <span class="af-unit">wb</span> <button class="coins-x" aria-label="Retirer les WikiBidous"><!></button></span>`);
	var root_1$14 = from_html(`<button class="iconbtn coins-add"><!> </button>`);
	function CoinsField($$anchor, $$props) {
		push($$props, true);
		let value = prop($$props, "value", 15, 0), max = prop($$props, "max", 3, void 0), label = prop($$props, "label", 3, "Ajouter des WB");
		let open = state(proxy(untrack(() => value() > 0)));
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
			var span = root$15();
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
			var button_1 = root_1$14();
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
	var root$14 = from_html(`<span class="tab-n"> </span>`);
	var root_1$13 = from_html(`<span class="oside-total"> </span>`);
	var root_2$10 = from_html(`<span> </span>`);
	var root_3$8 = from_html(`<span class="oside-cat"> </span>`);
	var root_4$8 = from_html(`<li class="oside-row"><!> <span class="oside-txt"><b> </b> <span class="oside-sub"><!><!></span></span> <button class="oside-x" title="Retirer"><!></button></li>`);
	var root_5$8 = from_html(`<ul class="oside-list"></ul>`);
	var root_6$7 = from_html(`<button class="oside-hint"> </button>`);
	var root_7$7 = from_html(`<section class="oside"><header class="oside-head"><span> <!></span> <!></header> <!> <!></section>`);
	function OfferSide($$anchor, $$props) {
		push($$props, true);
		let coins = prop($$props, "coins", 15, 0), max = prop($$props, "max", 3, void 0);
		const value = user_derived(() => sideValue($$props.items, Math.max(0, Math.floor(+coins() || 0)), $$props.values));
		var section = root_7$7();
		var header = child(section);
		var span = child(header);
		var text = child(span, true);
		var node = sibling(text);
		var consequent = ($$anchor) => {
			var span_1 = root$14();
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
			var span_2 = root_1$13();
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
			var ul = root_5$8();
			each(ul, 21, () => $$props.items, (it) => it.userCardId, ($$anchor, it) => {
				const v = user_derived(() => $$props.values.get(get(it).card.id));
				var li = root_4$8();
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
					var span_5 = root_2$10();
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
					var span_6 = root_3$8();
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
			var button_1 = root_6$7();
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
	var root$13 = from_html(`<button class="friend"><!><b> </b></button>`);
	var root_1$12 = from_html(`<div class="empty"><b> </b><button class="btn">Réessayer</button></div>`);
	var root_2$9 = from_html(`<div class="empty"><b>Aucun ami pour l'instant.</b></div>`);
	var root_3$7 = from_html(`<div class="empty"><b>Aucun ami ne s'appelle ainsi.</b></div>`);
	var root_4$7 = from_html(`<div class="loading-more"><span class="spin"></span></div>`);
	var root_5$7 = from_html(`<p class="composer-sub">Avec qui voulez-vous échanger ?</p> <!> <div class="friend-list"><!> <!></div>`, 1);
	var root_6$6 = from_html(`<span class="tab-n"> </span>`);
	var root_7$6 = from_html(`<div class="modal-tabs composer-tabs" role="tablist"><button role="tab">Mes cartes<!></button> <button role="tab"> <!></button></div>`);
	var root_8$6 = from_html(`<span class="modal-msg"> </span>`);
	var root_9$6 = from_html(`<span> </span>`);
	var root_10$6 = from_html(`<p class="offer-sum-empty">L'équilibre de l'échange s'affiche ici dès que vous choisissez des cartes.</p>`);
	var root_11$6 = from_html(`<div class="modal-msg"> </div>`);
	var root_12$6 = from_html(`<div class="composer-pick"><div class="composer-tab" role="tabpanel"><!></div> <div class="composer-tab" role="tabpanel"><!></div></div> <aside aria-label="Votre offre"><div class="offer-bar"><button class="offer-peek"><span class="offer-peek-txt"><b> </b><!></span> <!></button> <button class="btn primary"> </button></div> <div class="offer-panel"><h3 class="offer-title">Votre offre</h3> <div class="offer-sides"><!> <!></div> <div class="offer-sum"><!> <!></div> <div class="offer-actions"><button class="btn">Annuler</button> <button class="btn primary"> </button></div></div></aside>`, 1);
	var root_13$6 = from_html(`<div class="modal-backdrop" role="presentation"><div role="dialog" aria-modal="true" aria-labelledby="wm-compose-title" tabindex="-1"><button class="modal-close" aria-label="Fermer"><!></button> <header class="tm-head"><!> <h2 id="wm-compose-title"> </h2></header> <!></div></div>`);
	function TradeComposer($$anchor, $$props) {
		push($$props, true);
		let counter = prop($$props, "counter", 3, null), to = prop($$props, "to", 3, null), balance = prop($$props, "balance", 3, null);
		let friend = user_derived(() => counter()?.other ?? to() ?? null);
		let friends = state(null);
		let friendsError = state("");
		function loadFriends() {
			set(friends, null);
			set(friendsError, "");
			data.friends().then((f) => set(friends, f, true), (e) => set(friendsError, e.message || "Impossible de charger vos amis.", true));
		}
		user_effect(() => {
			if (!get(friend)) untrack(loadFriends);
		});
		const FRIEND_SEARCH_FROM = 8;
		let who = state("");
		const pickable = user_derived(() => (get(friends) ?? []).filter((f) => !get(who).trim() || normSearch(f.username).includes(normSearch(get(who)))).sort((a, b) => a.username.localeCompare(b.username, "fr", { sensitivity: "base" })));
		function side(fetchPage) {
			let query = {};
			const stream = new PageStream((page) => page ? pageLane.run(() => fetchPage(page, query)) : fetchPage(page, query));
			return {
				stream,
				ask: (q) => {
					query = q;
					stream.reset();
				}
			};
		}
		const mine = side((page, q) => myCardsPage({
			page,
			...q
		}));
		const theirs = side((page, q) => data.profileCollection(get(friend).username, {
			page,
			...q
		}));
		mine.stream.reset();
		user_effect(() => {
			if (get(friend)) untrack(() => theirs.stream.reset());
		});
		const asItem = (row) => ({
			userCardId: row.id,
			card: row.card,
			is_shiny: row.is_shiny
		});
		let give = user_derived(() => new Map((counter()?.give ?? []).map((it) => [it.userCardId, it])));
		let get$1 = user_derived(() => new Map((counter()?.get ?? []).map((it) => [it.userCardId, it])));
		let giveCoins = user_derived(() => counter()?.giveCoins ?? 0);
		let getCoins = user_derived(() => counter()?.getCoins ?? 0);
		let tab = state("mine");
		let sheet = state(false);
		let busy = state(false);
		let msg = state("");
		const countered = user_derived(() => new Set([...counter()?.give ?? [], ...counter()?.get ?? []].map((it) => it.userCardId)));
		const lockedBut = (ids) => new Set([...ids].filter((id) => !get(countered).has(id)));
		const myLocked = user_derived(() => lockedBut(mine.stream.meta?.pending ?? []));
		const theirLocked = user_derived(() => lockedBut(theirs.stream.meta?.pending ?? []));
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
		user_effect(() => () => cardValues.destroy());
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
				await sounded(() => data.proposeTrade({
					to: get(friend).id,
					give: get(giveItems),
					get: get(getItems),
					giveCoins: coins(get(giveCoins)),
					getCoins: coins(get(getCoins)),
					parentId: counter()?.id
				}));
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
		var div = root_13$6();
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
		var consequent_6 = ($$anchor) => {
			var fragment_1 = root_5$7();
			var node_3 = sibling(first_child(fragment_1), 2);
			var consequent_1 = ($$anchor) => {
				SearchBox($$anchor, {
					placeholder: "Chercher un ami...",
					get value() {
						return get(who);
					},
					set value($$value) {
						set(who, $$value, true);
					}
				});
			};
			if_block(node_3, ($$render) => {
				if ((get(friends)?.length ?? 0) > FRIEND_SEARCH_FROM) $$render(consequent_1);
			});
			var div_2 = sibling(node_3, 2);
			var node_4 = child(div_2);
			each(node_4, 17, () => get(pickable), (f) => f.id, ($$anchor, f) => {
				var button_1 = root$13();
				var node_5 = child(button_1);
				Avatar(node_5, {
					get user() {
						return get(f);
					},
					size: 52
				});
				var text_1 = only_child(sibling(node_5), true);
				reset(button_1);
				template_effect(() => set_text(text_1, get(f).username));
				delegated("click", button_1, () => set(friend, get(f)));
				append($$anchor, button_1);
			});
			var node_6 = sibling(node_4, 2);
			var consequent_2 = ($$anchor) => {
				var div_3 = root_1$12();
				var b_2 = child(div_3);
				var text_2 = only_child(b_2, true);
				var button_2 = sibling(b_2);
				reset(div_3);
				template_effect(() => set_text(text_2, get(friendsError)));
				delegated("click", button_2, loadFriends);
				append($$anchor, div_3);
			};
			var consequent_3 = ($$anchor) => {
				append($$anchor, root_2$9());
			};
			var consequent_4 = ($$anchor) => {
				append($$anchor, root_3$7());
			};
			var consequent_5 = ($$anchor) => {
				append($$anchor, root_4$7());
			};
			if_block(node_6, ($$render) => {
				if (get(friendsError)) $$render(consequent_2);
				else if (get(friends) && !get(friends).length) $$render(consequent_3, 1);
				else if (get(friends) && !get(pickable).length) $$render(consequent_4, 2);
				else if (!get(friends)) $$render(consequent_5, 3);
			});
			reset(div_2);
			append($$anchor, fragment_1);
		};
		var alternate_2 = ($$anchor) => {
			var fragment_3 = root_12$6();
			var div_7 = first_child(fragment_3);
			{
				const tabs = ($$anchor) => {
					var div_8 = root_7$6();
					var button_3 = child(div_8);
					let classes_1;
					var node_7 = sibling(child(button_3));
					var consequent_7 = ($$anchor) => {
						var span = root_6$6();
						var text_3 = only_child(span, true);
						template_effect(() => set_text(text_3, get(give).size));
						append($$anchor, span);
					};
					if_block(node_7, ($$render) => {
						if (get(give).size) $$render(consequent_7);
					});
					reset(button_3);
					var button_4 = sibling(button_3, 2);
					let classes_2;
					var text_4 = child(button_4);
					var node_8 = sibling(text_4);
					var consequent_8 = ($$anchor) => {
						var span_1 = root_6$6();
						var text_5 = only_child(span_1, true);
						template_effect(() => set_text(text_5, get(get$1).size));
						append($$anchor, span_1);
					};
					if_block(node_8, ($$render) => {
						if (get(get$1).size) $$render(consequent_8);
					});
					reset(button_4);
					reset(div_8);
					template_effect(() => {
						set_attribute(button_3, "aria-selected", get(tab) === "mine");
						classes_1 = set_class(button_3, 1, "", null, classes_1, { on: get(tab) === "mine" });
						set_attribute(button_4, "aria-selected", get(tab) === "theirs");
						classes_2 = set_class(button_4, 1, "", null, classes_2, { on: get(tab) === "theirs" });
						set_text(text_4, `Cartes de ${get(friend).username ?? ""}`);
					});
					delegated("click", button_3, () => showTab("mine"));
					delegated("click", button_4, () => showTab("theirs"));
					append($$anchor, div_8);
				};
				const picker = ($$anchor, $$arg0, picked = noop, locked = noop, onpick = noop) => {
					let stream = () => ($$arg0?.()).stream;
					let ask = () => ($$arg0?.()).ask;
					{
						let $0 = user_derived(() => stream().loading && stream().first);
						let $1 = user_derived(() => stream().error && !stream().started);
						let $2 = user_derived(() => stream().hasMore ? () => stream().more() : null);
						let $3 = user_derived(() => stream().loading && !stream().first);
						let $4 = user_derived(() => stream().error && stream().started);
						CardPicker($$anchor, {
							get lead() {
								return tabs;
							},
							get items() {
								return stream().items;
							},
							get picked() {
								return picked();
							},
							get locked() {
								return locked();
							},
							get onpick() {
								return onpick();
							},
							get loading() {
								return get($0);
							},
							get error() {
								return get($1);
							},
							onretry: () => stream().reset(),
							get values() {
								return values;
							},
							get watch() {
								return cardValues.watch;
							},
							get load() {
								return cardValues.load;
							},
							get onquery() {
								return ask();
							},
							get more() {
								return get($2);
							},
							get loadingMore() {
								return get($3);
							},
							get moreError() {
								return get($4);
							}
						});
					}
				};
				var div_9 = child(div_7);
				picker(child(div_9), () => mine, () => get(give), () => get(myLocked), () => (row) => set(give, toggle(get(give), row)));
				reset(div_9);
				var div_10 = sibling(div_9, 2);
				picker(child(div_10), () => theirs, () => get(get$1), () => get(theirLocked), () => (row) => set(get$1, toggle(get(get$1), row)));
				reset(div_10);
				reset(div_7);
				template_effect(() => {
					set_attribute(div_9, "hidden", get(tab) !== "mine");
					set_attribute(div_10, "hidden", get(tab) !== "theirs");
				});
			}
			var aside = sibling(div_7, 2);
			let classes_3;
			var div_11 = child(aside);
			var button_5 = child(div_11);
			var span_2 = child(button_5);
			var b_3 = child(span_2);
			var text_6 = only_child(b_3, true);
			var node_11 = sibling(b_3);
			var consequent_9 = ($$anchor) => {
				var span_3 = root_8$6();
				var text_7 = only_child(span_3, true);
				template_effect(() => set_text(text_7, get(alert)));
				append($$anchor, span_3);
			};
			var alternate = ($$anchor) => {
				var span_4 = root_9$6();
				var text_8 = only_child(span_4, true);
				template_effect(($0) => {
					set_attribute(span_4, "data-k", get(summary) ? get(v).kind : null);
					set_text(text_8, $0);
				}, [() => get(summary) ? balanceLabel(get(v)) : "Choisissez des cartes de chaque côté"]);
				append($$anchor, span_4);
			};
			if_block(node_11, ($$render) => {
				if (get(alert)) $$render(consequent_9);
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
			reset(div_11);
			var div_12 = sibling(div_11, 2);
			var div_13 = sibling(child(div_12), 2);
			var node_13 = child(div_13);
			{
				let $0 = user_derived(() => balance() ?? void 0);
				OfferSide(node_13, {
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
					onremove: (it) => set(give, without(get(give), it)),
					get coins() {
						return get(giveCoins);
					},
					set coins($$value) {
						set(giveCoins, $$value);
					}
				});
			}
			OfferSide(sibling(node_13, 2), {
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
				onremove: (it) => set(get$1, without(get(get$1), it)),
				get coins() {
					return get(getCoins);
				},
				set coins($$value) {
					set(getCoins, $$value);
				}
			});
			reset(div_13);
			action(div_13, ($$node, $$action_arg) => scrollFade?.($$node, $$action_arg), () => ({ axis: "y" }));
			var div_14 = sibling(div_13, 2);
			var node_15 = child(div_14);
			var consequent_10 = ($$anchor) => {
				TradeVerdict($$anchor, { get v() {
					return get(v);
				} });
			};
			var alternate_1 = ($$anchor) => {
				append($$anchor, root_10$6());
			};
			if_block(node_15, ($$render) => {
				if (get(summary)) $$render(consequent_10);
				else $$render(alternate_1, -1);
			});
			var node_16 = sibling(node_15, 2);
			var consequent_11 = ($$anchor) => {
				var div_15 = root_11$6();
				var text_10 = only_child(div_15, true);
				template_effect(() => set_text(text_10, get(alert)));
				append($$anchor, div_15);
			};
			if_block(node_16, ($$render) => {
				if (get(alert)) $$render(consequent_11);
			});
			reset(div_14);
			var div_16 = sibling(div_14, 2);
			var button_7 = child(div_16);
			var button_8 = sibling(button_7, 2);
			var text_11 = only_child(button_8, true);
			reset(div_16);
			reset(div_12);
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
			append($$anchor, fragment_3);
		};
		if_block(node_2, ($$render) => {
			if (!get(friend)) $$render(consequent_6);
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
		delegated("click", div, (e) => e.target === e.currentTarget && close());
		delegated("click", button, close);
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var root$12 = from_html(`<div class="tr-empty"><span class="tr-empty-ico"><!></span> <b> </b> <span> </span> <button class="btn primary">Proposer un échange</button></div>`);
	var root_1$11 = from_html(`<div class="empty"><b>Échanges indisponibles pour le moment.</b><button class="btn">Réessayer</button></div>`);
	var root_2$8 = from_html(`<span class="tab-n"> </span>`);
	var root_3$6 = from_html(`<button role="tab"> <!></button>`);
	var root_4$6 = from_html(`<option> </option>`);
	var root_5$6 = from_html(`<div class="tr-find"><!> <div class="tr-find-row"><div class="isel tr-who" title="Ami"><!> <select aria-label="Ami"><option>Tous les amis</option><!></select></div> <div class="isel" title="Ordre"><!> <select aria-label="Ordre"><option>Récents</option><option>Anciens</option></select></div></div></div>`);
	var root_6$5 = from_html(`<div class="tr-row sk"></div>`);
	var root_7$5 = from_html(`<div class="tr-rows"></div>`);
	var root_8$5 = from_html(`<div class="tr-col-empty"><p class="tr-col-none">Aucun échange ne correspond.</p><button class="btn">Tout afficher</button></div>`);
	var root_9$5 = from_html(`<div class="tr-col-empty"><p class="tr-col-none">Rien ici pour l'instant.</p><!></div>`);
	var root_10$5 = from_html(`<span class="tr-row-rounds"> </span>`);
	var root_11$5 = from_html(`<span class="trade-status"> </span>`);
	var root_12$5 = from_html(`<span class="tr-badge"> </span>`);
	var root_13$5 = from_html(`<button><!> <span class="tr-row-main"><span class="tr-row-top"><b> </b><span class="tr-row-when nowrap"> </span></span> <span class="tr-row-line"> <!></span></span> <!></button>`);
	var root_14$5 = from_html(`<div class="tr-more" aria-hidden="true"></div>`);
	var root_15$5 = from_html(`<div class="tr-rows"><!> <!></div>`);
	var root_16$5 = from_html(`<div class="tr-pane-sk"><div class="sk-line"></div><div class="sk-cards"><div class="wc skeleton"></div><div class="wc skeleton"></div></div></div>`);
	var root_17$5 = from_html(`<div><aside class="tr-col" aria-label="Vos échanges"><div class="tabs tr-tabs" role="tablist"></div> <!> <!></aside> <div class="tr-pane"><!></div></div>`);
	var root_18$5 = from_html(`<div class="coll-head tr-head"><div><h1>Échanges</h1><div class="meta">Vos offres avec vos amis</div></div> <button class="btn primary"><!> Proposer un échange</button></div> <!> <!>`, 1);
	function Trades($$anchor, $$props) {
		push($$props, true);
		const emptyState = ($$anchor) => {
			var div = root$12();
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
		user_effect(() => () => cardValues.destroy());
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
				set(trades, reuse(get(trades) ?? [], await data.trades({ quiet })), true);
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
		const tabs = user_derived(() => get(trades) ? tradeTabs(get(trades)) : null);
		const inTab = user_derived(() => get(tabs)?.[get(tab)] ?? null);
		const roundCount = user_derived(() => get(trades) ? roundsOf(get(trades)) : new Map());
		const FIND_FROM = 6;
		let search = state("");
		let friend = state("");
		let order = state("new");
		const finding = user_derived(() => (get(inTab)?.length ?? 0) > FIND_FROM);
		const friendsHere = user_derived(() => {
			const n = new Map();
			for (const t of get(inTab) ?? []) n.set(t.other.id, {
				f: t.other,
				n: (n.get(t.other.id)?.n ?? 0) + 1
			});
			return [...n.values()].sort((a, b) => b.n - a.n || a.f.username.localeCompare(b.f.username, "fr", { sensitivity: "base" }));
		});
		const searchKey = (t) => normSearch([t.other.username, ...[...t.give, ...t.get].map((it) => `${it.card.title} ${it.card.category}`)].join(" "));
		const shown = user_derived(() => {
			if (!get(inTab)) return null;
			const q = normSearch(get(search));
			const hits = get(inTab).filter((t) => (!get(friend) || t.other.id === get(friend)) && (!q || searchKey(t).includes(q)));
			return get(order) === "old" ? hits.reverse() : hits;
		});
		user_effect(() => {
			get(tab);
			set(search, "");
			set(friend, "");
		});
		const STEP = 60;
		let more = state(STEP);
		user_effect(() => {
			get(tab), get(search), get(friend), get(order);
			set(more, STEP);
		});
		const drawn = user_derived(() => Math.max(get(more), (get(shown)?.findIndex((t) => t.id === get(selected)?.id) ?? -1) + 1));
		const selected = user_derived(() => get(shown) && (get(trades).find((t) => t.id === picks[get(tab)]) ?? get(shown)[0] ?? null));
		const balance = (t) => verdict(sideValue(t.give, t.giveCoins, values), sideValue(t.get, t.getCoins, values));
		user_effect(() => {
			const open = get(selected) && get(trades) ? chainOf(get(selected), get(trades)) : [];
			cardValues.load([...(get(shown) ?? []).slice(0, get(drawn)), ...open].flatMap((t) => [...t.give, ...t.get]));
		});
		const rows = user_derived(() => (get(shown) ?? []).slice(0, get(drawn)).map((t) => ({
			t,
			b: balance(t),
			rounds: get(roundCount).get(t.id) ?? 1
		})));
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
		let wanted = new URLSearchParams(location.search).get("offre");
		let flash = state(null);
		user_effect(() => {
			if (!wanted || !get(trades)) return;
			const t = get(trades).find((x) => x.id === wanted);
			wanted = null;
			history.replaceState({}, "", "/trades");
			if (!t) return;
			untrack(() => {
				openTrade(t);
				set(reading, true);
				set(flash, t.id, true);
			});
			tick().then(() => get(rowsEl)?.querySelector(`[data-id="${CSS.escape(t.id)}"]`)?.scrollIntoView({
				block: "center",
				behavior: "smooth"
			}));
			setTimeout(() => set(flash, null), 2600);
		});
		async function onRowsKey(e) {
			if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
			e.preventDefault();
			const t = stepIn(get(shown), get(selected)?.id, e.key === "ArrowDown" ? 1 : -1);
			if (!t) return;
			select(t, false);
			await tick();
			get(rowsEl)?.querySelector(`[data-id="${CSS.escape(t.id)}"]`)?.focus();
		}
		var fragment = root_18$5();
		var div_1 = first_child(fragment);
		var button_1 = sibling(child(div_1), 2);
		Icon(child(button_1), { name: "trades" });
		next();
		reset(button_1);
		reset(div_1);
		var node_2 = sibling(div_1, 2);
		var consequent = ($$anchor) => {
			var div_2 = root_1$11();
			var button_2 = sibling(child(div_2));
			reset(div_2);
			delegated("click", button_2, () => load());
			append($$anchor, div_2);
		};
		var alternate_2 = ($$anchor) => {
			var div_3 = root_17$5();
			let classes;
			var aside = child(div_3);
			var div_4 = child(aside);
			each(div_4, 21, () => TABS, index, ($$anchor, $$item) => {
				var $$array = user_derived(() => to_array(get($$item), 2));
				let id = () => get($$array)[0];
				let label = () => get($$array)[1];
				var button_3 = root_3$6();
				let classes_1;
				var text_2 = child(button_3, true);
				var node_3 = sibling(text_2);
				var consequent_1 = ($$anchor) => {
					var span_2 = root_2$8();
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
				var div_5 = root_5$6();
				var node_5 = child(div_5);
				SearchBox(node_5, {
					placeholder: "Ami ou carte...",
					get value() {
						return get(search);
					},
					set value($$value) {
						set(search, $$value, true);
					}
				});
				var div_6 = sibling(node_5, 2);
				var div_7 = child(div_6);
				var node_6 = child(div_7);
				Icon(node_6, { name: "friends" });
				var select_1 = sibling(node_6, 2);
				var option = child(select_1);
				option.value = option.__value = "";
				each(sibling(option), 17, () => get(friendsHere), ({ f, n }) => f.id, ($$anchor, $$item) => {
					let f = () => get($$item).f;
					let n = () => get($$item).n;
					var option_1 = root_4$6();
					var text_4 = only_child(option_1);
					var option_1_value = {};
					template_effect(() => {
						set_text(text_4, `${f().username ?? ""} (${n() ?? ""})`);
						if (option_1_value !== (option_1_value = f().id)) option_1.value = (option_1.__value = option_1_value) ?? "";
					});
					append($$anchor, option_1);
				});
				reset(select_1);
				init_select(select_1);
				reset(div_7);
				var div_8 = sibling(div_7, 2);
				var node_8 = child(div_8);
				Icon(node_8, { name: "sort" });
				var select_2 = sibling(node_8, 2);
				var option_2 = child(select_2);
				option_2.value = option_2.__value = "new";
				var option_3 = sibling(option_2);
				option_3.value = option_3.__value = "old";
				reset(select_2);
				init_select(select_2);
				reset(div_8);
				reset(div_6);
				reset(div_5);
				bind_select_value(select_1, () => get(friend), ($$value) => set(friend, $$value));
				bind_select_value(select_2, () => get(order), ($$value) => set(order, $$value));
				append($$anchor, div_5);
			};
			if_block(node_4, ($$render) => {
				if (get(finding)) $$render(consequent_2);
			});
			var node_9 = sibling(node_4, 2);
			var consequent_3 = ($$anchor) => {
				var div_9 = root_7$5();
				each(div_9, 20, () => Array(4), index, ($$anchor, _) => {
					append($$anchor, root_6$5());
				});
				reset(div_9);
				append($$anchor, div_9);
			};
			var consequent_4 = ($$anchor) => {
				var div_11 = root_8$5();
				var button_4 = sibling(child(div_11));
				reset(div_11);
				delegated("click", button_4, () => {
					set(search, "");
					set(friend, "");
				});
				append($$anchor, div_11);
			};
			var consequent_5 = ($$anchor) => {
				var div_12 = root_9$5();
				var node_10 = sibling(child(div_12));
				emptyState(node_10);
				reset(div_12);
				append($$anchor, div_12);
			};
			var alternate = ($$anchor) => {
				var div_13 = root_15$5();
				var node_11 = child(div_13);
				each(node_11, 17, () => get(rows), ({ t, b, rounds }) => t.id, ($$anchor, $$item) => {
					let t = () => get($$item).t;
					let b = () => get($$item).b;
					let rounds = () => get($$item).rounds;
					var button_5 = root_13$5();
					let classes_2;
					var node_12 = child(button_5);
					Avatar(node_12, {
						get user() {
							return t().other;
						},
						size: 40
					});
					var span_3 = sibling(node_12, 2);
					var span_4 = child(span_3);
					var b_2 = child(span_4);
					var text_5 = only_child(b_2, true);
					var text_6 = only_child(sibling(b_2), true);
					reset(span_4);
					var span_6 = sibling(span_4, 2);
					var text_7 = child(span_6, true);
					var node_13 = sibling(text_7);
					var consequent_6 = ($$anchor) => {
						var span_7 = root_10$5();
						var text_8 = only_child(span_7);
						template_effect(() => set_text(text_8, `· ${rounds() ?? ""} offres`));
						append($$anchor, span_7);
					};
					if_block(node_13, ($$render) => {
						if (rounds() > 1) $$render(consequent_6);
					});
					reset(span_6);
					reset(span_3);
					var node_14 = sibling(span_3, 2);
					var consequent_7 = ($$anchor) => {
						var span_8 = root_11$5();
						var text_9 = only_child(span_8, true);
						template_effect(($0) => {
							set_attribute(span_8, "data-s", t().status);
							set_text(text_9, $0);
						}, [() => statusLabel(t().status)]);
						append($$anchor, span_8);
					};
					var consequent_8 = ($$anchor) => {
						var span_9 = root_12$5();
						var text_10 = only_child(span_9, true);
						template_effect(($0, $1) => {
							set_attribute(span_9, "data-k", b().kind);
							set_attribute(span_9, "title", $0);
							set_text(text_10, $1);
						}, [() => balanceLabel(b()), () => balanceBadge(b())]);
						append($$anchor, span_9);
					};
					if_block(node_14, ($$render) => {
						if (get(tab) === "history") $$render(consequent_7);
						else if (b().kind !== "unknown") $$render(consequent_8, 1);
					});
					reset(button_5);
					template_effect(($0, $1, $2, $3) => {
						classes_2 = set_class(button_5, 1, "tr-row", null, classes_2, {
							on: get(selected)?.id === t().id,
							flash: get(flash) === t().id
						});
						set_attribute(button_5, "data-id", t().id);
						set_attribute(button_5, "aria-current", get(selected)?.id === t().id ? "true" : void 0);
						set_attribute(button_5, "aria-label", `Échange avec ${t().other.username ?? ""}, ${$0 ?? ""}, ${$1 ?? ""}`);
						set_text(text_5, t().other.username);
						set_text(text_6, $2);
						set_text(text_7, $3);
					}, [
						() => dealLine(t().give.length, t().giveCoins, t().get.length, t().getCoins),
						() => balanceLabel(b()),
						() => ago(t().updatedAt),
						() => dealLine(t().give.length, t().giveCoins, t().get.length, t().getCoins)
					]);
					delegated("click", button_5, () => select(t()));
					delegated("keydown", button_5, onRowsKey);
					append($$anchor, button_5);
				});
				var node_15 = sibling(node_11, 2);
				var consequent_9 = ($$anchor) => {
					var div_14 = root_14$5();
					action(div_14, ($$node, $$action_arg) => inView?.($$node, $$action_arg), () => ({
						onEnter: () => set(more, get(more) + STEP),
						key: get(drawn)
					}));
					append($$anchor, div_14);
				};
				if_block(node_15, ($$render) => {
					if (get(shown).length > get(drawn)) $$render(consequent_9);
				});
				reset(div_13);
				bind_this(div_13, ($$value) => set(rowsEl, $$value), () => get(rowsEl));
				append($$anchor, div_13);
			};
			if_block(node_9, ($$render) => {
				if (!get(shown)) $$render(consequent_3);
				else if (!get(shown).length && get(inTab).length) $$render(consequent_4, 1);
				else if (!get(shown).length) $$render(consequent_5, 2);
				else $$render(alternate, -1);
			});
			reset(aside);
			var div_15 = sibling(aside, 2);
			var node_16 = child(div_15);
			var consequent_10 = ($$anchor) => {
				append($$anchor, root_16$5());
			};
			var consequent_11 = ($$anchor) => {
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
			var alternate_1 = ($$anchor) => {
				emptyState($$anchor);
			};
			if_block(node_16, ($$render) => {
				if (!get(shown)) $$render(consequent_10);
				else if (get(selected)) $$render(consequent_11, 1);
				else $$render(alternate_1, -1);
			});
			reset(div_15);
			reset(div_3);
			template_effect(() => classes = set_class(div_3, 1, "tr-split", null, classes, { reading: get(reading) && get(selected) }));
			append($$anchor, div_3);
		};
		if_block(node_2, ($$render) => {
			if (get(error)) $$render(consequent);
			else $$render(alternate_2, -1);
		});
		var node_18 = sibling(node_2, 2);
		var consequent_12 = ($$anchor) => {
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
		if_block(node_18, ($$render) => {
			if (get(compose)) $$render(consequent_12);
		});
		delegated("click", button_1, () => set(compose, { counter: null }));
		append($$anchor, fragment);
		pop();
	}
	delegate(["click", "keydown"]);
	var root$11 = from_html(`<div class="modal-backdrop" role="presentation"><div class="modal fr-chat" role="dialog" aria-modal="true" aria-labelledby="wm-chat-title" tabindex="-1"><button class="modal-close" aria-label="Fermer"><!></button> <header class="tm-head"><!><h2 id="wm-chat-title"> </h2></header> <!></div></div>`);
	function ChatModal($$anchor, $$props) {
		push($$props, true);
		const onKey = (e) => e.key === "Escape" && $$props.onclose?.();
		var div = root$11();
		event("keydown", $window, onKey);
		var div_1 = child(div);
		var button = child(div_1);
		Icon(child(button), {
			name: "close",
			width: 2,
			class: "x-ico"
		});
		reset(button);
		var header = sibling(button, 2);
		var node_1 = child(header);
		Avatar(node_1, {
			get user() {
				return $$props.friend;
			},
			size: 36
		});
		var text = only_child(sibling(node_1), true);
		reset(header);
		key(sibling(header, 2), () => $$props.friend.id, ($$anchor) => {
			TradeChat($$anchor, {
				get friend() {
					return $$props.friend;
				},
				get onopentrade() {
					return $$props.onopentrade;
				}
			});
		});
		reset(div_1);
		action(div_1, ($$node) => anchorCentered?.($$node));
		reset(div);
		template_effect(() => set_text(text, $$props.friend.username));
		delegated("click", div, (e) => e.target === e.currentTarget && $$props.onclose?.());
		delegated("click", button, function(...$$args) {
			$$props.onclose?.apply(this, $$args);
		});
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var root$10 = from_html(`<div class="empty"><b>Amis indisponibles pour le moment.</b><div> </div><button class="btn">Réessayer</button></div>`);
	var root_1$10 = from_html(`<span class="sync"><span class="spin"></span>Chargement de vos amis</span>`);
	var root_2$7 = from_html(` <b class="fr-meta-req"> </b>`, 1);
	var root_3$5 = from_html(` <!>`, 1);
	var root_4$5 = from_html(`<!>Lien copié`, 1);
	var root_5$5 = from_html(`<!>Inviter`, 1);
	var root_6$4 = from_html(`<p role="status"> </p>`);
	var root_7$4 = from_html(`<button class="link-btn">Tout accepter</button>`);
	var root_8$4 = from_html(`<div class="fr-req"><!><span class="fr-req-name"><b> </b><small>veut devenir votre ami</small></span> <button class="fr-act yes" title="Accepter"><!></button> <button class="fr-act" title="Refuser"><!></button></div>`);
	var root_9$4 = from_html(`<div class="fr-reqs"><div class="fr-side-h">Demandes reçues<span class="fr-count"> </span> <!></div> <!></div>`);
	var root_10$4 = from_html(`<div class="fr-side-h">Vos amis<span class="fr-count"> </span></div>`);
	var root_11$4 = from_html(`<span> </span>`);
	var root_12$4 = from_html(`<li><button><!> <span class="fr-item-txt"><b> </b><!></span></button></li>`);
	var root_13$4 = from_html(`<li class="fr-hint fr-pad"> </li>`);
	var root_14$4 = from_html(`<div class="fr-more"></div>`);
	var root_15$4 = from_html(`<span class="fr-count"> </span>`);
	var root_16$4 = from_html(`<p class="fr-hint fr-pad">Encore une lettre pour chercher parmi tous les joueurs.</p>`);
	var root_17$4 = from_html(`<p class="fr-hint fr-pad"><span class="spin"></span> Recherche...</p>`);
	var root_18$4 = from_html(`<p class="fr-hint fr-pad"> </p>`);
	var root_19$4 = from_html(`<small>Demande envoyée</small>`);
	var root_20$3 = from_html(`<small>Vous a envoyé une demande</small>`);
	var root_21$3 = from_html(`<button class="btn primary fr-btn">Accepter</button>`);
	var root_22$2 = from_html(`<button class="btn fr-btn">Annuler</button>`);
	var root_23$2 = from_html(`<span class="spin"></span>`);
	var root_24$2 = from_html(`<button class="btn primary fr-btn"><!></button>`);
	var root_25$2 = from_html(`<div class="fr-req"><!><span class="fr-req-name"><b> </b><!></span> <!></div>`);
	var root_26$2 = from_html(`<div class="fr-side-h">Autres joueurs<!></div> <!>`, 1);
	var root_27$2 = from_html(`<div class="fr-req"><!><span class="fr-req-name"><b> </b><small>en attente</small></span> <button class="btn fr-btn">Annuler</button></div>`);
	var root_28$1 = from_html(`<details class="fr-sent"><summary class="fr-side-h">Demandes envoyées<span class="fr-count"> </span></summary> <!></details>`);
	var root_29$1 = from_html(`<!> <ul class="fr-items"></ul> <!> <!>`, 1);
	var root_30 = from_html(`<p class="fr-hint fr-pad"><span class="spin"></span> Chargement...</p>`);
	var root_31 = from_html(`<p class="fr-hint"> </p>`);
	var root_32 = from_html(`<p class="fr-hint"><span class="spin"></span> Chargement...</p>`);
	var root_33 = from_html(`<i></i>`);
	var root_34 = from_html(`<button class="fr-offer" title="Ouvrir cette offre dans Échanges"><span class="fr-mini" aria-hidden="true"></span> <span class="fr-offer-txt"><b> </b><small> </small></span> <span> </span></button>`);
	var root_35 = from_html(`<button class="fr-box fr-msg"><h3>Dernier message</h3> <p><b> </b> </p> <small> </small></button>`);
	var root_36 = from_html(`<p class="fr-hint"> <button class="link-btn">Voir ses cartes pour un échange</button></p>`);
	var root_37 = from_html(`<div class="pf-place"><!></div>`);
	var root_38 = from_html(`<div class="fr-cards"></div>`);
	var root_39 = from_html(`<button class="fr-back"><!>Amis</button> <a class="fr-id"><!> <div class="fr-id-txt"><h2> </h2> <p><!><!></p></div></a> <div class="fr-id-acts"><button class="btn primary"><!>Proposer un échange</button> <button class="btn"><!>Écrire</button> <a class="btn"><!>Profil</a></div> <div class="fr-box"><h3>Offres en cours<!></h3> <!></div> <!> <div class="fr-box"><h3>Sa vitrine<!> <a class="link-btn fr-box-link">Voir son profil</a></h3> <!></div>`, 1);
	var root_40 = from_html(`<div class="empty fr-pick"><!><b>Choisissez un ami</b><div>Ses offres, ses plus belles cartes, et un échange en un clic.</div></div>`);
	var root_41 = from_html(`<div class="coll-head"><div><h1>Amis</h1> <div class="meta"><!></div></div> <div class="fr-head-acts"><button class="btn fr-head-btn" title="Partager le lien d'inscription au jeu"><!></button> <button class="btn primary fr-head-btn"><!>Ajouter un ami</button></div></div> <!> <div><aside class="fr-side" aria-label="Vos amis"><div class="fr-side-search"><!></div> <div class="fr-side-scroll"><!> <!></div></aside> <section class="fr-detail"><!></section></div>`, 1);
	var root_42 = from_html(`<div class="fr-page"><!></div> <!> <!>`, 1);
	function Friends($$anchor, $$props) {
		push($$props, true);
		let split = state(null);
		let error = state("");
		let note = state(null);
		let busy = state(proxy(new Set()));
		const load = () => data.friendships().then((s) => {
			set(split, s, true);
			set(error, "");
			$$props.onrequests?.(s.incoming.length);
		}, (e) => {
			if (!get(split)) set(error, e.message || "Amis indisponibles pour le moment.", true);
		});
		let waiting = state(null);
		const loadWaiting = () => data.waitingTrades().then((w) => set(waiting, w, true), () => {});
		load();
		loadWaiting();
		user_effect(() => {
			const onVisible = () => {
				if (document.visibilityState === "visible") {
					load();
					loadWaiting();
				}
			};
			document.addEventListener("visibilitychange", onVisible);
			return () => document.removeEventListener("visibilitychange", onVisible);
		});
		async function act(id, run) {
			if (get(busy).has(id)) return;
			set(busy, new Set(get(busy)).add(id), true);
			set(note, null);
			try {
				await sounded(run);
				await load();
			} catch (e) {
				set(note, {
					ok: false,
					text: e.message
				}, true);
			}
			const b = new Set(get(busy));
			b.delete(id);
			set(busy, b, true);
		}
		const accept = (r) => act(r.fid, () => data.answerFriend(r.fid, true));
		const decline = (r) => act(r.fid, () => data.answerFriend(r.fid, false));
		const cancel = (r) => act(r.fid, () => data.dropFriendship(r.fid));
		const add = (u) => act(u.id, () => data.requestFriend(u.id));
		const acceptAll = () => act("all", () => data.acceptAllFriends());
		let search = state("");
		const q = user_derived(() => get(search).trim());
		const tradeWeight = (r) => {
			const w = get(waiting)?.get(r.user.id);
			return w ? w.toAnswer * 1e3 + w.sent : 0;
		};
		const mine = user_derived(() => (get(split)?.friends ?? []).filter((r) => !get(q) || normSearch(r.user.username).includes(normSearch(get(q)))).sort((a, b) => tradeWeight(b) - tradeWeight(a)));
		const STEP = 60;
		let drawn = state(STEP);
		user_effect(() => {
			get(q);
			set(drawn, STEP);
		});
		let found = state(null);
		let looking = state(false);
		user_effect(() => {
			if (get(q).length < 2) {
				set(found, null);
				set(looking, false);
				return;
			}
			set(looking, true);
			let live = true;
			const t = setTimeout(() => data.searchPlayers(get(q)).then((u) => live && set(found, u, true), () => live && set(found, [], true)).finally(() => live && set(looking, false)), 350);
			return () => {
				live = false;
				clearTimeout(t);
			};
		});
		const others = user_derived(() => (get(found) ?? []).filter((u) => relationOf(u.id, get(split) ?? {
			friends: [],
			incoming: [],
			outgoing: []
		}) !== "friend").map((u) => ({
			user: u,
			sent: get(split)?.outgoing.find((r) => r.user.id === u.id),
			received: get(split)?.incoming.find((r) => r.user.id === u.id)
		})));
		const wide = matchMedia("(min-width: 1000px)");
		let picked = state(null);
		let reading = state(false);
		const sel = user_derived(() => get(split)?.friends.find((r) => r.user.id === get(picked)) ?? (wide.matches ? get(mine)[0] : null) ?? null);
		const open = (r) => {
			set(picked, r.user.id, true);
			set(reading, true);
		};
		let detail = state(null);
		user_effect(() => {
			const f = get(sel)?.user;
			if (!f || get(detail)?.id === f.id) return;
			set(detail, {
				id: f.id,
				chat: null,
				shelf: null,
				error: false
			}, true);
			const mineNow = () => get(detail)?.id === f.id;
			data.chat(f.id).then((c) => mineNow() && (get(detail).chat = c), () => mineNow() && (get(detail).error = true));
			data.playerShowcase(f.username).then((sh) => mineNow() && (get(detail).shelf = filledGalleries(sh).flatMap((g) => g.rows)), () => mineNow() && (get(detail).shelf = []));
		});
		const offers = user_derived(() => get(detail)?.chat ? (({ incoming, outgoing }) => [...incoming, ...outgoing])(tradeTabs(get(detail).chat.trades)) : null);
		const lastMessage = user_derived(() => get(detail)?.chat?.messages.at(-1) ?? null);
		const done = user_derived(() => get(detail)?.chat ? get(detail).chat.trades.filter((t) => t.status === "accepted").length : 0);
		let copied = state(false);
		async function invite() {
			const url = `${data.isReal ? location.origin : "https://www.wiki-masters.com"}/signup`;
			if (navigator.share) {
				try {
					await navigator.share({
						title: "WikiMasters",
						text: "Viens jouer à WikiMasters avec moi !",
						url
					});
				} catch {}
				return;
			}
			try {
				await navigator.clipboard.writeText(url);
				set(copied, true);
				setTimeout(() => set(copied, false), 2e3);
			} catch {
				set(note, {
					ok: true,
					text: `Lien d'invitation : ${url}`
				}, true);
			}
		}
		let trading = state(null);
		let talking = state(null);
		let searchEl = state(void 0);
		const goTrades = (id) => history.pushState({}, "", id ? `/trades?offre=${encodeURIComponent(id)}` : "/trades");
		const profileUrl = (u) => `/profile/${encodeURIComponent(u.username)}`;
		const openProfile = (e, u) => {
			e.preventDefault();
			history.pushState({}, "", profileUrl(u));
		};
		const since = (t) => t ? new Date(t).toLocaleDateString("fr", {
			month: "long",
			year: "numeric"
		}) : "";
		const plural = (n, one, many = one + "s") => `${n} ${n > 1 ? many : one}`;
		const waitLabel = (w) => w.toAnswer ? plural(w.toAnswer, "offre à répondre", "offres à répondre") : plural(w.sent, "offre envoyée", "offres envoyées");
		var fragment = root_42();
		var div = first_child(fragment);
		var node = child(div);
		var consequent = ($$anchor) => {
			var div_1 = root$10();
			var div_2 = sibling(child(div_1));
			var text = only_child(div_2, true);
			var button = sibling(div_2);
			reset(div_1);
			template_effect(() => set_text(text, get(error)));
			delegated("click", button, load);
			append($$anchor, div_1);
		};
		var alternate_8 = ($$anchor) => {
			var fragment_1 = root_41();
			var div_3 = first_child(fragment_1);
			var div_4 = child(div_3);
			var div_5 = sibling(child(div_4), 2);
			var node_1 = child(div_5);
			var consequent_1 = ($$anchor) => {
				append($$anchor, root_1$10());
			};
			var alternate = ($$anchor) => {
				var fragment_2 = root_3$5();
				var text_1 = first_child(fragment_2, true);
				var node_2 = sibling(text_1);
				var consequent_2 = ($$anchor) => {
					var fragment_3 = root_2$7();
					var text_2 = first_child(fragment_3, true);
					text_2.nodeValue = " · ";
					var text_3 = only_child(sibling(text_2), true);
					template_effect(($0) => set_text(text_3, $0), [() => plural(get(split).incoming.length, "demande reçue", "demandes reçues")]);
					append($$anchor, fragment_3);
				};
				if_block(node_2, ($$render) => {
					if (get(split).incoming.length) $$render(consequent_2);
				});
				template_effect(($0) => set_text(text_1, $0), [() => plural(get(split).friends.length, "ami")]);
				append($$anchor, fragment_2);
			};
			if_block(node_1, ($$render) => {
				if (!get(split)) $$render(consequent_1);
				else $$render(alternate, -1);
			});
			reset(div_5);
			reset(div_4);
			var div_6 = sibling(div_4, 2);
			var button_1 = child(div_6);
			var node_3 = child(button_1);
			var consequent_3 = ($$anchor) => {
				var fragment_4 = root_4$5();
				Icon(first_child(fragment_4), { name: "check" });
				next();
				append($$anchor, fragment_4);
			};
			var alternate_1 = ($$anchor) => {
				var fragment_5 = root_5$5();
				Icon(first_child(fragment_5), { name: "dms" });
				next();
				append($$anchor, fragment_5);
			};
			if_block(node_3, ($$render) => {
				if (get(copied)) $$render(consequent_3);
				else $$render(alternate_1, -1);
			});
			reset(button_1);
			var button_2 = sibling(button_1, 2);
			Icon(child(button_2), { name: "friends" });
			next();
			reset(button_2);
			reset(div_6);
			reset(div_3);
			var node_7 = sibling(div_3, 2);
			var consequent_4 = ($$anchor) => {
				var p = root_6$4();
				let classes;
				var text_4 = only_child(p, true);
				template_effect(() => {
					classes = set_class(p, 1, "ach-note", null, classes, { bad: !get(note).ok });
					set_text(text_4, get(note).text);
				});
				append($$anchor, p);
			};
			if_block(node_7, ($$render) => {
				if (get(note)) $$render(consequent_4);
			});
			var div_7 = sibling(node_7, 2);
			let classes_1;
			var aside = child(div_7);
			var div_8 = child(aside);
			SearchBox(child(div_8), {
				get loading() {
					return get(looking);
				},
				placeholder: "Ami ou joueur...",
				get value() {
					return get(search);
				},
				set value($$value) {
					set(search, $$value, true);
				}
			});
			reset(div_8);
			bind_this(div_8, ($$value) => set(searchEl, $$value), () => get(searchEl));
			var div_9 = sibling(div_8, 2);
			var node_9 = child(div_9);
			var consequent_6 = ($$anchor) => {
				var div_10 = root_9$4();
				var div_11 = child(div_10);
				var span_1 = sibling(child(div_11));
				var text_5 = only_child(span_1, true);
				var node_10 = sibling(span_1, 2);
				var consequent_5 = ($$anchor) => {
					var button_3 = root_7$4();
					template_effect(($0) => button_3.disabled = $0, [() => get(busy).has("all")]);
					delegated("click", button_3, acceptAll);
					append($$anchor, button_3);
				};
				if_block(node_10, ($$render) => {
					if (get(split).incoming.length > 1) $$render(consequent_5);
				});
				reset(div_11);
				each(sibling(div_11, 2), 17, () => get(split).incoming, (r) => r.fid, ($$anchor, r) => {
					var div_12 = root_8$4();
					var node_12 = child(div_12);
					Avatar(node_12, {
						get user() {
							return get(r).user;
						},
						size: 32
					});
					var span_2 = sibling(node_12);
					var text_6 = only_child(child(span_2), true);
					next();
					reset(span_2);
					var button_4 = sibling(span_2, 2);
					Icon(child(button_4), {
						name: "check",
						width: 2.4
					});
					reset(button_4);
					var button_5 = sibling(button_4, 2);
					Icon(child(button_5), {
						name: "close",
						width: 2.2
					});
					reset(button_5);
					reset(div_12);
					template_effect(($0, $1) => {
						set_text(text_6, get(r).user.username);
						button_4.disabled = $0;
						set_attribute(button_4, "aria-label", `Accepter ${get(r).user.username ?? ""}`);
						button_5.disabled = $1;
						set_attribute(button_5, "aria-label", `Refuser ${get(r).user.username ?? ""}`);
					}, [() => get(busy).has(get(r).fid), () => get(busy).has(get(r).fid)]);
					delegated("click", button_4, () => accept(get(r)));
					delegated("click", button_5, () => decline(get(r)));
					append($$anchor, div_12);
				});
				reset(div_10);
				template_effect(() => set_text(text_5, get(split).incoming.length));
				append($$anchor, div_10);
			};
			if_block(node_9, ($$render) => {
				if (get(split)?.incoming.length && !get(q)) $$render(consequent_6);
			});
			var node_15 = sibling(node_9, 2);
			var consequent_21 = ($$anchor) => {
				var fragment_6 = root_29$1();
				var node_16 = first_child(fragment_6);
				var consequent_7 = ($$anchor) => {
					var div_13 = root_10$4();
					var text_7 = only_child(sibling(child(div_13)), true);
					reset(div_13);
					template_effect(() => set_text(text_7, get(mine).length));
					append($$anchor, div_13);
				};
				if_block(node_16, ($$render) => {
					if (get(q)) $$render(consequent_7);
				});
				var ul = sibling(node_16, 2);
				each(ul, 21, () => get(mine).slice(0, get(drawn)), (r) => r.fid, ($$anchor, r) => {
					const w = user_derived(() => get(waiting)?.get(get(r).user.id));
					var li = root_12$4();
					var button_6 = child(li);
					let classes_2;
					var node_17 = child(button_6);
					Avatar(node_17, {
						get user() {
							return get(r).user;
						},
						size: 36
					});
					var span_4 = sibling(node_17, 2);
					var b_3 = child(span_4);
					var text_8 = only_child(b_3, true);
					var node_18 = sibling(b_3);
					var consequent_8 = ($$anchor) => {
						var span_5 = root_11$4();
						let classes_3;
						var text_9 = only_child(span_5, true);
						template_effect(($0) => {
							classes_3 = set_class(span_5, 1, "fr-waiting", null, classes_3, { answer: get(w).toAnswer });
							set_text(text_9, $0);
						}, [() => waitLabel(get(w))]);
						append($$anchor, span_5);
					};
					if_block(node_18, ($$render) => {
						if (get(w)) $$render(consequent_8);
					});
					reset(span_4);
					reset(button_6);
					reset(li);
					template_effect(() => {
						classes_2 = set_class(button_6, 1, "fr-item", null, classes_2, { on: get(sel)?.fid === get(r).fid });
						set_attribute(button_6, "aria-current", get(sel)?.fid === get(r).fid ? "true" : void 0);
						set_text(text_8, get(r).user.username);
					});
					delegated("click", button_6, () => open(get(r)));
					append($$anchor, li);
				}, ($$anchor) => {
					var li_1 = root_13$4();
					var text_10 = only_child(li_1, true);
					template_effect(() => set_text(text_10, get(q) ? `Aucun ami ne s'appelle « ${get(q)} ».` : "Pas encore d'amis : cherchez un joueur par son nom ci-dessus."));
					append($$anchor, li_1);
				});
				reset(ul);
				var node_19 = sibling(ul, 2);
				var consequent_9 = ($$anchor) => {
					var div_14 = root_14$4();
					action(div_14, ($$node, $$action_arg) => inView?.($$node, $$action_arg), () => ({
						key: get(drawn),
						onEnter: () => set(drawn, get(drawn) + STEP)
					}));
					append($$anchor, div_14);
				};
				if_block(node_19, ($$render) => {
					if (get(mine).length > get(drawn)) $$render(consequent_9);
				});
				var node_20 = sibling(node_19, 2);
				var consequent_19 = ($$anchor) => {
					var fragment_7 = root_26$2();
					var div_15 = first_child(fragment_7);
					var node_21 = sibling(child(div_15));
					var consequent_10 = ($$anchor) => {
						var span_6 = root_15$4();
						var text_11 = only_child(span_6, true);
						template_effect(() => set_text(text_11, get(others).length));
						append($$anchor, span_6);
					};
					if_block(node_21, ($$render) => {
						if (get(others).length) $$render(consequent_10);
					});
					reset(div_15);
					var node_22 = sibling(div_15, 2);
					var consequent_11 = ($$anchor) => {
						append($$anchor, root_16$4());
					};
					var consequent_12 = ($$anchor) => {
						append($$anchor, root_17$4());
					};
					var consequent_13 = ($$anchor) => {
						var p_3 = root_18$4();
						var text_12 = only_child(p_3);
						template_effect(() => set_text(text_12, `Aucun autre joueur ne s'appelle « ${get(q) ?? ""} ».`));
						append($$anchor, p_3);
					};
					var alternate_4 = ($$anchor) => {
						var fragment_8 = comment();
						each(first_child(fragment_8), 17, () => get(others), (o) => o.user.id, ($$anchor, o) => {
							var div_16 = root_25$2();
							var node_24 = child(div_16);
							Avatar(node_24, {
								get user() {
									return get(o).user;
								},
								size: 32
							});
							var span_7 = sibling(node_24);
							var b_4 = child(span_7);
							var text_13 = only_child(b_4, true);
							var node_25 = sibling(b_4);
							var consequent_14 = ($$anchor) => {
								append($$anchor, root_19$4());
							};
							var consequent_15 = ($$anchor) => {
								append($$anchor, root_20$3());
							};
							if_block(node_25, ($$render) => {
								if (get(o).sent) $$render(consequent_14);
								else if (get(o).received) $$render(consequent_15, 1);
							});
							reset(span_7);
							var node_26 = sibling(span_7, 2);
							var consequent_16 = ($$anchor) => {
								var button_7 = root_21$3();
								template_effect(($0) => button_7.disabled = $0, [() => get(busy).has(get(o).received.fid)]);
								delegated("click", button_7, () => accept(get(o).received));
								append($$anchor, button_7);
							};
							var consequent_17 = ($$anchor) => {
								var button_8 = root_22$2();
								template_effect(($0) => button_8.disabled = $0, [() => get(busy).has(get(o).sent.fid)]);
								delegated("click", button_8, () => cancel(get(o).sent));
								append($$anchor, button_8);
							};
							var alternate_3 = ($$anchor) => {
								var button_9 = root_24$2();
								var node_27 = child(button_9);
								var consequent_18 = ($$anchor) => {
									append($$anchor, root_23$2());
								};
								var d = user_derived(() => get(busy).has(get(o).user.id));
								var alternate_2 = ($$anchor) => {
									append($$anchor, text("Ajouter"));
								};
								if_block(node_27, ($$render) => {
									if (get(d)) $$render(consequent_18);
									else $$render(alternate_2, -1);
								});
								reset(button_9);
								template_effect(($0) => button_9.disabled = $0, [() => get(busy).has(get(o).user.id)]);
								delegated("click", button_9, () => add(get(o).user));
								append($$anchor, button_9);
							};
							if_block(node_26, ($$render) => {
								if (get(o).received) $$render(consequent_16);
								else if (get(o).sent) $$render(consequent_17, 1);
								else $$render(alternate_3, -1);
							});
							reset(div_16);
							template_effect(() => set_text(text_13, get(o).user.username));
							append($$anchor, div_16);
						});
						append($$anchor, fragment_8);
					};
					if_block(node_22, ($$render) => {
						if (get(q).length < 2) $$render(consequent_11);
						else if (!get(found)) $$render(consequent_12, 1);
						else if (!get(others).length) $$render(consequent_13, 2);
						else $$render(alternate_4, -1);
					});
					append($$anchor, fragment_7);
				};
				var consequent_20 = ($$anchor) => {
					var details = root_28$1();
					var summary = child(details);
					var text_15 = only_child(sibling(child(summary)), true);
					reset(summary);
					each(sibling(summary, 2), 17, () => get(split).outgoing, (r) => r.fid, ($$anchor, r) => {
						var div_17 = root_27$2();
						var node_29 = child(div_17);
						Avatar(node_29, {
							get user() {
								return get(r).user;
							},
							size: 32
						});
						var span_10 = sibling(node_29);
						var text_16 = only_child(child(span_10), true);
						next();
						reset(span_10);
						var button_10 = sibling(span_10, 2);
						reset(div_17);
						template_effect(($0) => {
							set_text(text_16, get(r).user.username);
							button_10.disabled = $0;
						}, [() => get(busy).has(get(r).fid)]);
						delegated("click", button_10, () => cancel(get(r)));
						append($$anchor, div_17);
					});
					reset(details);
					template_effect(() => set_text(text_15, get(split).outgoing.length));
					append($$anchor, details);
				};
				if_block(node_20, ($$render) => {
					if (get(q)) $$render(consequent_19);
					else if (get(split).outgoing.length) $$render(consequent_20, 1);
				});
				append($$anchor, fragment_6);
			};
			var alternate_5 = ($$anchor) => {
				append($$anchor, root_30());
			};
			if_block(node_15, ($$render) => {
				if (get(split)) $$render(consequent_21);
				else $$render(alternate_5, -1);
			});
			reset(div_9);
			reset(aside);
			var section = sibling(aside, 2);
			var node_30 = child(section);
			var consequent_32 = ($$anchor) => {
				const f = user_derived(() => get(sel).user);
				var fragment_9 = root_39();
				var button_11 = first_child(fragment_9);
				Icon(child(button_11), {
					name: "prev",
					width: 2.2
				});
				next();
				reset(button_11);
				var a_1 = sibling(button_11, 2);
				var node_32 = child(a_1);
				Avatar(node_32, {
					get user() {
						return get(f);
					},
					size: 76
				});
				var div_18 = sibling(node_32, 2);
				var h2 = child(div_18);
				var text_17 = only_child(h2, true);
				var p_5 = sibling(h2, 2);
				var node_33 = child(p_5);
				var consequent_22 = ($$anchor) => {
					var text_18 = text();
					template_effect(($0) => set_text(text_18, `Ami depuis ${$0 ?? ""}`), [() => since(get(sel).since)]);
					append($$anchor, text_18);
				};
				if_block(node_33, ($$render) => {
					if (get(sel).since) $$render(consequent_22);
				});
				var node_34 = sibling(node_33);
				var consequent_23 = ($$anchor) => {
					var text_19 = text();
					template_effect(($0) => set_text(text_19, ` · ${$0 ?? ""} ensemble`), [() => plural(get(done), "échange", "échanges")]);
					append($$anchor, text_19);
				};
				if_block(node_34, ($$render) => {
					if (get(done)) $$render(consequent_23);
				});
				reset(p_5);
				reset(div_18);
				reset(a_1);
				var div_19 = sibling(a_1, 2);
				var button_12 = child(div_19);
				Icon(child(button_12), { name: "trades" });
				next();
				reset(button_12);
				var button_13 = sibling(button_12, 2);
				Icon(child(button_13), { name: "dms" });
				next();
				reset(button_13);
				var a_2 = sibling(button_13, 2);
				Icon(child(a_2), { name: "profile" });
				next();
				reset(a_2);
				reset(div_19);
				var div_20 = sibling(div_19, 2);
				var h3 = child(div_20);
				var node_38 = sibling(child(h3));
				var consequent_24 = ($$anchor) => {
					var span_11 = root_15$4();
					var text_20 = only_child(span_11, true);
					template_effect(() => set_text(text_20, get(offers).length));
					append($$anchor, span_11);
				};
				if_block(node_38, ($$render) => {
					if (get(offers)?.length) $$render(consequent_24);
				});
				reset(h3);
				var node_39 = sibling(h3, 2);
				var consequent_25 = ($$anchor) => {
					var p_6 = root_31();
					var text_21 = only_child(p_6);
					template_effect(() => set_text(text_21, `Impossible de charger vos échanges avec ${get(f).username ?? ""}.`));
					append($$anchor, p_6);
				};
				var consequent_26 = ($$anchor) => {
					append($$anchor, root_32());
				};
				var consequent_27 = ($$anchor) => {
					var p_8 = root_31();
					var text_22 = only_child(p_8);
					template_effect(() => set_text(text_22, `Aucune offre en cours avec ${get(f).username ?? ""}.`));
					append($$anchor, p_8);
				};
				var alternate_6 = ($$anchor) => {
					var fragment_12 = comment();
					each(first_child(fragment_12), 17, () => get(offers), (t) => t.id, ($$anchor, t) => {
						var button_14 = root_34();
						var span_12 = child(button_14);
						each(span_12, 21, () => [...get(t).give, ...get(t).get].slice(0, 4), (it) => it.itemId, ($$anchor, it) => {
							var i = root_33();
							template_effect(() => set_attribute(i, "data-r", get(it).card.rarity));
							append($$anchor, i);
						});
						reset(span_12);
						var span_13 = sibling(span_12, 2);
						var b_6 = child(span_13);
						var text_23 = only_child(b_6, true);
						var text_24 = only_child(sibling(b_6));
						reset(span_13);
						var span_14 = sibling(span_13, 2);
						let classes_4;
						var text_25 = only_child(span_14, true);
						reset(button_14);
						template_effect(($0, $1) => {
							set_text(text_23, $0);
							set_text(text_24, `${get(t).incoming ? "Reçue" : "Envoyée"} ${$1 ?? ""}`);
							classes_4 = set_class(span_14, 1, "fr-waiting", null, classes_4, { answer: get(t).incoming });
							set_text(text_25, get(t).incoming ? "À répondre" : "En attente");
						}, [() => dealLine(get(t).give.length, get(t).giveCoins, get(t).get.length, get(t).getCoins), () => ago(get(t).createdAt)]);
						delegated("click", button_14, () => goTrades(get(t).id));
						append($$anchor, button_14);
					});
					append($$anchor, fragment_12);
				};
				if_block(node_39, ($$render) => {
					if (get(detail)?.error) $$render(consequent_25);
					else if (!get(offers)) $$render(consequent_26, 1);
					else if (!get(offers).length) $$render(consequent_27, 2);
					else $$render(alternate_6, -1);
				});
				reset(div_20);
				var node_41 = sibling(div_20, 2);
				var consequent_28 = ($$anchor) => {
					var button_15 = root_35();
					var p_9 = sibling(child(button_15), 2);
					var b_7 = child(p_9);
					var text_26 = only_child(b_7);
					var text_27 = sibling(b_7);
					reset(p_9);
					var text_28 = only_child(sibling(p_9, 2));
					reset(button_15);
					template_effect(($0) => {
						set_text(text_26, `${(get(lastMessage).mine ? "Vous" : get(f).username) ?? ""} :`);
						set_text(text_27, ` ${get(lastMessage).content ?? ""}`);
						set_text(text_28, `${$0 ?? ""} · Ouvrir la discussion`);
					}, [() => ago(get(lastMessage).at)]);
					delegated("click", button_15, () => set(talking, get(f), true));
					append($$anchor, button_15);
				};
				if_block(node_41, ($$render) => {
					if (get(lastMessage)) $$render(consequent_28);
				});
				var div_21 = sibling(node_41, 2);
				var h3_1 = child(div_21);
				var node_42 = sibling(child(h3_1));
				var consequent_29 = ($$anchor) => {
					var span_15 = root_15$4();
					var text_29 = only_child(span_15, true);
					template_effect(() => set_text(text_29, get(detail).shelf.length));
					append($$anchor, span_15);
				};
				if_block(node_42, ($$render) => {
					if (get(detail)?.shelf?.length) $$render(consequent_29);
				});
				var a_3 = sibling(node_42, 2);
				reset(h3_1);
				var node_43 = sibling(h3_1, 2);
				var consequent_30 = ($$anchor) => {
					append($$anchor, root_32());
				};
				var consequent_31 = ($$anchor) => {
					var p_11 = root_36();
					var text_30 = child(p_11);
					var button_16 = sibling(text_30);
					reset(p_11);
					template_effect(() => set_text(text_30, `${get(f).username ?? ""} n'a encore rien exposé. `));
					delegated("click", button_16, () => set(trading, get(f), true));
					append($$anchor, p_11);
				};
				var alternate_7 = ($$anchor) => {
					var div_22 = root_38();
					each(div_22, 21, () => get(detail).shelf, (c) => c.id, ($$anchor, c) => {
						var div_23 = root_37();
						Card(child(div_23), {
							get card() {
								return get(c).card;
							},
							get shiny() {
								return get(c).is_shiny;
							},
							stats: false
						});
						reset(div_23);
						append($$anchor, div_23);
					});
					reset(div_22);
					append($$anchor, div_22);
				};
				if_block(node_43, ($$render) => {
					if (!get(detail)?.shelf) $$render(consequent_30);
					else if (!get(detail).shelf.length) $$render(consequent_31, 1);
					else $$render(alternate_7, -1);
				});
				reset(div_21);
				template_effect(($0, $1, $2) => {
					set_attribute(a_1, "href", $0);
					set_attribute(a_1, "title", `Voir le profil de ${get(f).username ?? ""}`);
					set_text(text_17, get(f).username);
					set_attribute(a_2, "href", $1);
					set_attribute(a_3, "href", $2);
				}, [
					() => profileUrl(get(f)),
					() => profileUrl(get(f)),
					() => profileUrl(get(f))
				]);
				delegated("click", button_11, () => set(reading, false));
				delegated("click", a_1, (e) => openProfile(e, get(f)));
				delegated("click", button_12, () => set(trading, get(f), true));
				delegated("click", button_13, () => set(talking, get(f), true));
				delegated("click", a_2, (e) => openProfile(e, get(f)));
				delegated("click", a_3, (e) => openProfile(e, get(f)));
				append($$anchor, fragment_9);
			};
			var consequent_33 = ($$anchor) => {
				var div_24 = root_40();
				Icon(child(div_24), { name: "friends" });
				next(2);
				reset(div_24);
				append($$anchor, div_24);
			};
			if_block(node_30, ($$render) => {
				if (get(sel)) $$render(consequent_32);
				else if (get(split)) $$render(consequent_33, 1);
			});
			reset(section);
			reset(div_7);
			template_effect(() => {
				classes_1 = set_class(div_7, 1, "fr-split", null, classes_1, { reading: get(reading) && get(sel) });
				set_attribute(section, "aria-label", get(sel) ? get(sel).user.username : "Ami");
			});
			delegated("click", button_1, invite);
			delegated("click", button_2, () => {
				set(reading, false);
				get(searchEl)?.querySelector("input")?.focus();
			});
			append($$anchor, fragment_1);
		};
		if_block(node, ($$render) => {
			if (get(error)) $$render(consequent);
			else $$render(alternate_8, -1);
		});
		reset(div);
		var node_46 = sibling(div, 2);
		var consequent_34 = ($$anchor) => {
			{
				let $0 = user_derived(() => $$props.profile?.currency ?? null);
				TradeComposer($$anchor, {
					get to() {
						return get(trading);
					},
					get balance() {
						return get($0);
					},
					onclose: () => set(trading, null),
					onsent: (ok) => {
						if (ok) {
							set(note, {
								ok: true,
								text: `Offre envoyée à ${get(trading).username}.`
							}, true);
							$$props.onwallet?.();
							loadWaiting();
							set(detail, null);
						}
					}
				});
			}
		};
		if_block(node_46, ($$render) => {
			if (get(trading)) $$render(consequent_34);
		});
		var node_47 = sibling(node_46, 2);
		var consequent_35 = ($$anchor) => {
			ChatModal($$anchor, {
				get friend() {
					return get(talking);
				},
				onclose: () => set(talking, null),
				onopentrade: (t) => {
					set(talking, null);
					goTrades(t?.id);
				}
			});
		};
		if_block(node_47, ($$render) => {
			if (get(talking)) $$render(consequent_35);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate(["click"]);
	var root$9 = from_html(`<span class="ach-badge"><span aria-hidden="true"> </span></span>`);
	var root_1$9 = from_html(`<div class="empty"><b>Succès indisponibles pour le moment.</b><div> </div><button class="btn">Réessayer</button></div>`);
	var root_2$6 = from_html(`<span class="sync"><span class="spin"></span>Chargement de vos succès</span>`);
	var root_3$4 = from_html(` <!>`, 1);
	var root_4$4 = from_html(`<span class="ach-medal"><i aria-hidden="true"></i><b> <small> </small></b><span> </span></span>`);
	var root_5$4 = from_html(`<span class="spin"></span>Réclamation...`, 1);
	var root_6$3 = from_html(`Tout réclamer<b> </b>`, 1);
	var root_7$3 = from_html(`<button class="btn primary ach-all"><!></button>`);
	var root_8$3 = from_html(`<p role="status"> </p>`);
	var root_9$3 = from_html(`<div class="ach-goal"><!> <div class="ach-goal-txt"><b> </b><span> </span><span class="ach-reward"> </span></div></div>`);
	var root_10$3 = from_html(`<section class="ach-goals" aria-label="Prochains objectifs"><h2 class="ach-sec-h">Prochains objectifs</h2> <div class="ach-goal-row"></div></section>`);
	var root_11$3 = from_html(`<button role="tab"> <span> </span></button>`);
	var root_12$3 = from_html(`<span class="ach-gain" aria-hidden="true"> </span>`);
	var root_13$3 = from_html(`<span class="ach-new">Nouveau</span>`);
	var root_14$3 = from_html(`<span class="spin"></span>`);
	var root_15$3 = from_html(`Réclamer <b> </b>`, 1);
	var root_16$3 = from_html(`<button class="btn primary ach-claim"><!></button>`);
	var root_17$3 = from_html(`<span class="ach-reward got"> </span>`);
	var root_18$3 = from_html(`<span class="ach-when"><!> </span> <!>`, 1);
	var root_19$3 = from_html(`<span class="ach-count"> </span>`);
	var root_20$2 = from_html(`<span class="ach-reward"> </span>`);
	var root_21$2 = from_html(`<!> <!>`, 1);
	var root_22$1 = from_html(`<li><!> <!> <div class="ach-body"><h3> <!></h3> <p> </p></div> <div class="ach-side"><!></div></li>`);
	var root_23$1 = from_html(`<section class="ach-sec"><h2 class="ach-sec-h"> <span> </span></h2> <ul class="ach-list"></ul></section>`);
	var root_24$1 = from_html(`<div>Les récompenses apparaîtront ici dès qu'un succès sera débloqué.</div>`);
	var root_25$1 = from_html(`<div class="empty ach-empty"><b> </b><!></div>`);
	var root_26$1 = from_html(`<section class="ach-hero" aria-label="Progression"><div class="ach-ring" role="img"><b> <small>%</small></b></div> <div class="ach-medals" aria-label="Médailles par rang"></div> <!></section> <!> <!> <div class="tabs ach-tabs" role="tablist"></div> <!>`, 1);
	var root_27$1 = from_html(`<div class="ach-page"><div class="coll-head"><div><h1>Succès</h1> <div class="meta"><!></div></div></div> <!></div>`);
	function Achievements($$anchor, $$props) {
		push($$props, true);
		const badge = ($$anchor, a = noop, size = noop) => {
			var span = root$9();
			let styles;
			var text = only_child(child(span), true);
			reset(span);
			template_effect(($0, $1, $2) => {
				set_attribute(span, "data-tier", $0);
				set_attribute(span, "data-state", a().state);
				set_attribute(span, "title", `Rang ${$1 ?? ""}`);
				styles = set_style(span, "", styles, {
					"--s": `${size() ?? ""}px`,
					"--p": $2
				});
				set_text(text, a().icon);
			}, [
				() => tierOf(a().reward).id,
				() => tierOf(a().reward).label,
				() => fill(a())
			]);
			append($$anchor, span);
		};
		let list = state(null);
		let stats = state(null);
		let error = state("");
		let fresh = state(proxy(new Set()));
		let show = state("all");
		let busy = state(null);
		let note = state(null);
		let claimed = state(proxy(new Map()));
		async function load() {
			set(error, "");
			data.collectionStats().then((s) => set(stats, s, true), () => {});
			try {
				set(list, await data.achievements(), true);
			} catch (e) {
				if (!get(list)) set(error, e.message || "Succès indisponibles pour le moment.", true);
				return;
			}
			const before = new Set(get(list).filter((a) => a.state !== "locked").map((a) => a.id));
			try {
				await data.syncAchievements();
				set(list, await data.achievements(), true);
				set(fresh, new Set(get(list).filter((a) => a.state !== "locked" && !before.has(a.id)).map((a) => a.id)), true);
			} catch {}
		}
		load();
		const unlocked = user_derived(() => get(list)?.filter((a) => a.state !== "locked") ?? []);
		const waiting = user_derived(() => get(list)?.filter((a) => a.state === "claim") ?? []);
		const waitingSum = user_derived(() => get(waiting).reduce((s, a) => s + a.reward, 0));
		user_effect(() => {
			if (get(list)) $$props.onrewards?.(get(waiting).length);
		});
		const earned = user_derived(() => get(unlocked).filter((a) => a.claimedAt).reduce((s, a) => s + a.reward, 0));
		const pct = user_derived(() => get(list)?.length ? Math.round(get(unlocked).length / get(list).length * 100) : 0);
		const medals = user_derived(() => TIERS.map((t) => ({
			...t,
			got: get(unlocked).filter((a) => tierOf(a.reward).id === t.id).length,
			total: get(list)?.filter((a) => tierOf(a.reward).id === t.id).length ?? 0
		})).filter((t) => t.total));
		const progress = (a) => a.state === "locked" ? progressOf(a.description, get(stats), RNAME) : null;
		const goals = user_derived(() => get(list) && get(stats) ? nextUp(get(list), progress) : []);
		const fill = (a, p = progress(a)) => a.state !== "locked" ? 1 : p ? p.have / p.goal : 0;
		const SHOWS = [
			["all", "Tous"],
			["claim", "À réclamer"],
			["done", "Débloqués"],
			["locked", "À débloquer"]
		];
		const count = (id) => (id === "all" ? get(list)?.length : id === "done" ? get(unlocked).length : get(list)?.filter((a) => a.state === id).length) ?? 0;
		const keep = (a) => get(show) === "all" || (get(show) === "done" ? a.state !== "locked" : a.state === get(show));
		const sections = user_derived(() => get(list) ? FAMILIES.map((f) => {
			const all = get(list).filter((a) => a.family === f.id);
			return {
				...f,
				got: all.filter((a) => a.state !== "locked").length,
				total: all.length,
				items: all.filter(keep)
			};
		}).filter((s) => s.items.length) : []);
		const date = (t) => new Date(t).toLocaleDateString("fr", {
			day: "numeric",
			month: "short",
			year: new Date(t).getFullYear() === new Date().getFullYear() ? void 0 : "numeric"
		});
		async function claimOne(a) {
			const r = await data.claimAchievement(a.id);
			a.claimedAt = r.claimed_at ?? new Date().toISOString();
			a.state = "done";
			const got = r.already_claimed ? 0 : r.amount ?? a.reward;
			if (got) {
				set(claimed, new Map(get(claimed)).set(a.id, got), true);
				setTimeout(() => {
					const m = new Map(get(claimed));
					m.delete(a.id);
					set(claimed, m, true);
				}, 1800);
			}
			return got;
		}
		async function claim(a) {
			if (get(busy)) return;
			set(busy, a.id, true);
			set(note, null);
			try {
				const got = await sounded(() => claimOne(a));
				set(note, {
					ok: true,
					text: got ? `+${nf(got)} WikiBidous pour « ${a.title} ».` : "Récompense déjà réclamée."
				}, true);
				$$props.onwallet?.();
			} catch (e) {
				set(note, {
					ok: false,
					text: e.message
				}, true);
			}
			set(busy, null);
		}
		async function claimAll() {
			if (get(busy) || !get(waiting).length) return;
			set(busy, "all");
			set(note, null);
			let got = 0, n = 0;
			try {
				await sounded(async () => {
					for (const a of [...get(waiting)]) {
						got += await claimOne(a);
						n++;
					}
				});
				set(note, {
					ok: true,
					text: `+${nf(got)} WikiBidous reçus pour ${n} succès.`
				}, true);
			} catch (e) {
				set(note, {
					ok: false,
					text: n ? `${n} récompenses reçues (+${nf(got)}), puis : ${e.message}` : e.message
				}, true);
			}
			if (n) $$props.onwallet?.();
			set(busy, null);
		}
		var fragment = comment();
		var node = first_child(fragment);
		var consequent = ($$anchor) => {
			var div = root_1$9();
			var div_1 = sibling(child(div));
			var text_1 = only_child(div_1, true);
			var button = sibling(div_1);
			reset(div);
			template_effect(() => set_text(text_1, get(error)));
			delegated("click", button, load);
			append($$anchor, div);
		};
		var alternate_4 = ($$anchor) => {
			var div_2 = root_27$1();
			var div_3 = child(div_2);
			var div_4 = child(div_3);
			var div_5 = sibling(child(div_4), 2);
			var node_1 = child(div_5);
			var consequent_1 = ($$anchor) => {
				append($$anchor, root_2$6());
			};
			var alternate = ($$anchor) => {
				var fragment_1 = root_3$4();
				var text_2 = first_child(fragment_1);
				var node_2 = sibling(text_2);
				var consequent_2 = ($$anchor) => {
					var text_3 = text();
					template_effect(($0) => set_text(text_3, ` · ${$0 ?? ""} WikiBidous gagnés`), [() => nf(get(earned))]);
					append($$anchor, text_3);
				};
				if_block(node_2, ($$render) => {
					if (get(earned)) $$render(consequent_2);
				});
				template_effect(() => set_text(text_2, `${get(unlocked).length ?? ""} sur ${get(list).length ?? ""} débloqués`));
				append($$anchor, fragment_1);
			};
			if_block(node_1, ($$render) => {
				if (!get(list)) $$render(consequent_1);
				else $$render(alternate, -1);
			});
			reset(div_5);
			reset(div_4);
			reset(div_3);
			var node_3 = sibling(div_3, 2);
			var consequent_16 = ($$anchor) => {
				var fragment_3 = root_26$1();
				var section = first_child(fragment_3);
				var div_6 = child(section);
				let styles_1;
				var b = child(div_6);
				var text_4 = child(b, true);
				next();
				reset(b);
				reset(div_6);
				var div_7 = sibling(div_6, 2);
				each(div_7, 21, () => get(medals), (t) => t.id, ($$anchor, t) => {
					var span_3 = root_4$4();
					var b_1 = sibling(child(span_3));
					var text_5 = child(b_1, true);
					var text_6 = only_child(sibling(text_5));
					reset(b_1);
					var text_7 = only_child(sibling(b_1), true);
					reset(span_3);
					template_effect(() => {
						set_attribute(span_3, "data-tier", get(t).id);
						set_attribute(span_3, "title", `${get(t).label ?? ""} : ${get(t).got ?? ""} sur ${get(t).total ?? ""}`);
						set_text(text_5, get(t).got);
						set_text(text_6, `/${get(t).total ?? ""}`);
						set_text(text_7, get(t).label);
					});
					append($$anchor, span_3);
				});
				reset(div_7);
				var node_4 = sibling(div_7, 2);
				var consequent_4 = ($$anchor) => {
					var button_1 = root_7$3();
					var node_5 = child(button_1);
					var consequent_3 = ($$anchor) => {
						var fragment_4 = root_5$4();
						next();
						append($$anchor, fragment_4);
					};
					var alternate_1 = ($$anchor) => {
						var fragment_5 = root_6$3();
						var text_8 = only_child(sibling(first_child(fragment_5)));
						template_effect(($0) => set_text(text_8, `+${$0 ?? ""}`), [() => nf(get(waitingSum))]);
						append($$anchor, fragment_5);
					};
					if_block(node_5, ($$render) => {
						if (get(busy) === "all") $$render(consequent_3);
						else $$render(alternate_1, -1);
					});
					reset(button_1);
					template_effect(() => button_1.disabled = !!get(busy));
					delegated("click", button_1, claimAll);
					append($$anchor, button_1);
				};
				if_block(node_4, ($$render) => {
					if (get(waiting).length) $$render(consequent_4);
				});
				reset(section);
				var node_6 = sibling(section, 2);
				var consequent_5 = ($$anchor) => {
					var p_1 = root_8$3();
					let classes;
					var text_9 = only_child(p_1, true);
					template_effect(() => {
						classes = set_class(p_1, 1, "ach-note", null, classes, { bad: !get(note).ok });
						set_text(text_9, get(note).text);
					});
					append($$anchor, p_1);
				};
				if_block(node_6, ($$render) => {
					if (get(note)) $$render(consequent_5);
				});
				var node_7 = sibling(node_6, 2);
				var consequent_6 = ($$anchor) => {
					var section_1 = root_10$3();
					var div_8 = sibling(child(section_1), 2);
					each(div_8, 21, () => get(goals), ({ a, p }) => a.id, ($$anchor, $$item) => {
						let a = () => get($$item).a;
						let p = () => get($$item).p;
						var div_9 = root_9$3();
						var node_8 = child(div_9);
						badge(node_8, a, () => 52);
						var div_10 = sibling(node_8, 2);
						var b_3 = child(div_10);
						var text_10 = only_child(b_3, true);
						var span_5 = sibling(b_3);
						var text_11 = only_child(span_5);
						var text_12 = only_child(sibling(span_5));
						reset(div_10);
						reset(div_9);
						template_effect(($0, $1, $2) => {
							set_text(text_10, a().title);
							set_text(text_11, `${$0 ?? ""} / ${$1 ?? ""}`);
							set_text(text_12, `+${$2 ?? ""}`);
						}, [
							() => nf(p().have),
							() => nf(p().goal),
							() => nf(a().reward)
						]);
						append($$anchor, div_9);
					});
					reset(div_8);
					reset(section_1);
					append($$anchor, section_1);
				};
				if_block(node_7, ($$render) => {
					if (get(goals).length && get(show) !== "claim" && get(show) !== "done") $$render(consequent_6);
				});
				var div_11 = sibling(node_7, 2);
				each(div_11, 21, () => SHOWS, ([id, label]) => id, ($$anchor, $$item) => {
					var $$array = user_derived(() => to_array(get($$item), 2));
					let id = () => get($$array)[0];
					let label = () => get($$array)[1];
					var button_2 = root_11$3();
					let classes_1;
					var text_13 = child(button_2, true);
					var span_7 = sibling(text_13);
					let classes_2;
					var text_14 = only_child(span_7, true);
					reset(button_2);
					template_effect(($0, $1) => {
						set_attribute(button_2, "aria-selected", get(show) === id());
						classes_1 = set_class(button_2, 1, "", null, classes_1, { on: get(show) === id() });
						set_text(text_13, label());
						classes_2 = set_class(span_7, 1, "tab-n", null, classes_2, { hot: $0 });
						set_text(text_14, $1);
					}, [() => id() === "claim" && count(id()), () => count(id())]);
					delegated("click", button_2, () => set(show, id(), true));
					append($$anchor, button_2);
				});
				reset(div_11);
				each(sibling(div_11, 2), 17, () => get(sections), (s) => s.id, ($$anchor, s) => {
					var section_2 = root_23$1();
					var h2 = child(section_2);
					var text_15 = child(h2, true);
					var text_16 = only_child(sibling(text_15));
					reset(h2);
					var ul = sibling(h2, 2);
					each(ul, 21, () => get(s).items, (a) => a.id, ($$anchor, a) => {
						const p = user_derived(() => progress(get(a)));
						var li = root_22$1();
						let classes_3;
						var node_10 = child(li);
						var consequent_7 = ($$anchor) => {
							var span_9 = root_12$3();
							var text_17 = only_child(span_9);
							template_effect(($0) => set_text(text_17, `+${$0 ?? ""}`), [() => nf(get(claimed).get(get(a).id))]);
							append($$anchor, span_9);
						};
						var d = user_derived(() => get(claimed).has(get(a).id));
						if_block(node_10, ($$render) => {
							if (get(d)) $$render(consequent_7);
						});
						var node_11 = sibling(node_10, 2);
						badge(node_11, () => get(a), () => 56);
						var div_12 = sibling(node_11, 2);
						var h3 = child(div_12);
						var text_18 = child(h3, true);
						var node_12 = sibling(text_18);
						var consequent_8 = ($$anchor) => {
							append($$anchor, root_13$3());
						};
						var d_1 = user_derived(() => get(fresh).has(get(a).id));
						if_block(node_12, ($$render) => {
							if (get(d_1)) $$render(consequent_8);
						});
						reset(h3);
						var text_19 = only_child(sibling(h3, 2), true);
						reset(div_12);
						var div_13 = sibling(div_12, 2);
						var node_13 = child(div_13);
						var consequent_10 = ($$anchor) => {
							var button_3 = root_16$3();
							var node_14 = child(button_3);
							var consequent_9 = ($$anchor) => {
								append($$anchor, root_14$3());
							};
							var alternate_2 = ($$anchor) => {
								var fragment_6 = root_15$3();
								var text_20 = only_child(sibling(first_child(fragment_6)));
								template_effect(($0) => set_text(text_20, `+${$0 ?? ""}`), [() => nf(get(a).reward)]);
								append($$anchor, fragment_6);
							};
							if_block(node_14, ($$render) => {
								if (get(busy) === get(a).id) $$render(consequent_9);
								else $$render(alternate_2, -1);
							});
							reset(button_3);
							template_effect(($0) => {
								button_3.disabled = !!get(busy);
								set_attribute(button_3, "aria-label", `Réclamer ${$0 ?? ""} WikiBidous pour ${get(a).title ?? ""}`);
							}, [() => nf(get(a).reward)]);
							delegated("click", button_3, () => claim(get(a)));
							append($$anchor, button_3);
						};
						var consequent_12 = ($$anchor) => {
							var fragment_7 = root_18$3();
							var span_12 = first_child(fragment_7);
							var node_15 = child(span_12);
							Icon(node_15, {
								name: "check",
								width: 2.4
							});
							var text_21 = sibling(node_15, 1, true);
							reset(span_12);
							var node_16 = sibling(span_12, 2);
							var consequent_11 = ($$anchor) => {
								var span_13 = root_17$3();
								var text_22 = only_child(span_13);
								template_effect(($0) => set_text(text_22, `+${$0 ?? ""}`), [() => nf(get(a).reward)]);
								append($$anchor, span_13);
							};
							if_block(node_16, ($$render) => {
								if (get(a).reward) $$render(consequent_11);
							});
							template_effect(($0) => set_text(text_21, $0), [() => get(a).unlockedAt ? date(get(a).unlockedAt) : "Débloqué"]);
							append($$anchor, fragment_7);
						};
						var alternate_3 = ($$anchor) => {
							var fragment_8 = root_21$2();
							var node_17 = first_child(fragment_8);
							var consequent_13 = ($$anchor) => {
								var span_14 = root_19$3();
								var text_23 = only_child(span_14);
								template_effect(($0, $1) => set_text(text_23, `${$0 ?? ""} / ${$1 ?? ""}`), [() => nf(get(p).have), () => nf(get(p).goal)]);
								append($$anchor, span_14);
							};
							if_block(node_17, ($$render) => {
								if (get(p)) $$render(consequent_13);
							});
							var node_18 = sibling(node_17, 2);
							var consequent_14 = ($$anchor) => {
								var span_15 = root_20$2();
								var text_24 = only_child(span_15);
								template_effect(($0) => set_text(text_24, `+${$0 ?? ""}`), [() => nf(get(a).reward)]);
								append($$anchor, span_15);
							};
							if_block(node_18, ($$render) => {
								if (get(a).reward) $$render(consequent_14);
							});
							append($$anchor, fragment_8);
						};
						if_block(node_13, ($$render) => {
							if (get(a).state === "claim") $$render(consequent_10);
							else if (get(a).state === "done") $$render(consequent_12, 1);
							else $$render(alternate_3, -1);
						});
						reset(div_13);
						reset(li);
						template_effect(($0, $1) => {
							classes_3 = set_class(li, 1, "ach", null, classes_3, {
								fresh: $0,
								claimed: $1
							});
							set_attribute(li, "data-state", get(a).state);
							set_text(text_18, get(a).title);
							set_text(text_19, get(a).description);
						}, [() => get(fresh).has(get(a).id), () => get(claimed).has(get(a).id)]);
						append($$anchor, li);
					});
					reset(ul);
					reset(section_2);
					template_effect(() => {
						set_attribute(section_2, "aria-label", get(s).label);
						set_text(text_15, get(s).label);
						set_text(text_16, `${get(s).got ?? ""} sur ${get(s).total ?? ""}`);
					});
					append($$anchor, section_2);
				}, ($$anchor) => {
					var div_14 = root_25$1();
					var b_5 = child(div_14);
					var text_25 = only_child(b_5, true);
					var node_19 = sibling(b_5);
					var consequent_15 = ($$anchor) => {
						append($$anchor, root_24$1());
					};
					if_block(node_19, ($$render) => {
						if (get(show) === "claim") $$render(consequent_15);
					});
					reset(div_14);
					template_effect(() => set_text(text_25, get(show) === "claim" ? "Aucune récompense en attente." : "Aucun succès ici."));
					append($$anchor, div_14);
				});
				template_effect(() => {
					set_attribute(div_6, "aria-label", `${get(pct) ?? ""} % débloqués`);
					styles_1 = set_style(div_6, "", styles_1, { "--p": get(pct) / 100 });
					set_text(text_4, get(pct));
				});
				append($$anchor, fragment_3);
			};
			if_block(node_3, ($$render) => {
				if (get(list)) $$render(consequent_16);
			});
			reset(div_2);
			append($$anchor, div_2);
		};
		if_block(node, ($$render) => {
			if (get(error)) $$render(consequent);
			else $$render(alternate_4, -1);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate(["click"]);
	var root$8 = from_html(`<span> </span>`);
	var root_1$8 = from_html(`<div class="modal-backdrop" role="presentation"><div class="modal pf-pick" role="dialog" aria-modal="true" aria-labelledby="wm-pick-title" tabindex="-1"><button class="modal-close" aria-label="Fermer"><!></button> <header class="pf-pick-head"><h2 id="wm-pick-title"> </h2><!></header> <!></div></div>`);
	function CopyPicker($$anchor, $$props) {
		push($$props, true);
		let sub = prop($$props, "sub", 3, ""), blocked = prop($$props, "blocked", 3, () => null);
		let query = {};
		const stream = new PageStream((page) => page ? pageLane.run(() => myCardsPage({
			page,
			...query
		})) : myCardsPage({
			page,
			...query
		}));
		stream.reset();
		const ask = (q) => {
			query = q;
			stream.reset();
		};
		const cardValues = valueMap();
		user_effect(() => () => cardValues.destroy());
		const locked = user_derived(() => new Set(stream.items.filter((r) => blocked()(r)).map((r) => r.id)));
		const onKey = (e) => e.key === "Escape" && $$props.onclose?.();
		var div = root_1$8();
		event("keydown", $window, onKey);
		var div_1 = child(div);
		var button = child(div_1);
		Icon(child(button), {
			name: "close",
			width: 2,
			class: "x-ico"
		});
		reset(button);
		var header = sibling(button, 2);
		var h2 = child(header);
		var text = only_child(h2, true);
		var node_1 = sibling(h2);
		var consequent = ($$anchor) => {
			var span = root$8();
			var text_1 = only_child(span, true);
			template_effect(() => set_text(text_1, sub()));
			append($$anchor, span);
		};
		if_block(node_1, ($$render) => {
			if (sub()) $$render(consequent);
		});
		reset(header);
		var node_2 = sibling(header, 2);
		{
			let $0 = user_derived(() => stream.loading && stream.first);
			let $1 = user_derived(() => stream.error && !stream.started);
			let $2 = user_derived(() => stream.hasMore ? () => stream.more() : null);
			let $3 = user_derived(() => stream.loading && !stream.first);
			let $4 = user_derived(() => stream.error && stream.started);
			CardPicker(node_2, {
				get items() {
					return stream.items;
				},
				picked: new Set(),
				get locked() {
					return get(locked);
				},
				onpick: (row) => $$props.onpick(row),
				get loading() {
					return get($0);
				},
				get error() {
					return get($1);
				},
				onretry: () => stream.reset(),
				get values() {
					return cardValues.values;
				},
				get watch() {
					return cardValues.watch;
				},
				get load() {
					return cardValues.load;
				},
				onquery: ask,
				get more() {
					return get($2);
				},
				get loadingMore() {
					return get($3);
				},
				get moreError() {
					return get($4);
				},
				lockReason: (r) => blocked()(r),
				lockTitle: (r) => blocked()(r)
			});
		}
		reset(div_1);
		action(div_1, ($$node) => anchorCentered?.($$node));
		reset(div);
		template_effect(() => set_text(text, $$props.title));
		delegated("click", div, (e) => e.target === e.currentTarget && $$props.onclose?.());
		delegated("click", button, function(...$$args) {
			$$props.onclose?.apply(this, $$args);
		});
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var root$7 = from_html(`<span></span>`);
	var root_1$7 = from_html(`<span class="pf-count"><i></i> <b> </b></span>`);
	var root_2$5 = from_html(`<div class="pf-bar" aria-hidden="true"></div> <div class="pf-counts"></div>`, 1);
	function RarityBreakdown($$anchor, $$props) {
		push($$props, true);
		var fragment = root_2$5();
		var div = first_child(fragment);
		each(div, 20, () => RARITIES_DESC, (r) => r, ($$anchor, r) => {
			var fragment_1 = comment();
			var node = first_child(fragment_1);
			var consequent = ($$anchor) => {
				var span = root$7();
				let styles;
				template_effect(() => {
					set_attribute(span, "data-r", r);
					styles = set_style(span, "", styles, { "flex-grow": $$props.counts[r] });
				});
				append($$anchor, span);
			};
			if_block(node, ($$render) => {
				if ($$props.counts[r]) $$render(consequent);
			});
			append($$anchor, fragment_1);
		});
		reset(div);
		var div_1 = sibling(div, 2);
		each(div_1, 20, () => RARITIES_DESC, (r) => r, ($$anchor, r) => {
			var span_1 = root_1$7();
			var text = sibling(child(span_1), 1, true);
			var text_1 = only_child(sibling(text), true);
			reset(span_1);
			template_effect(($0) => {
				set_attribute(span_1, "data-r", r);
				set_text(text, RNAME[r]);
				set_text(text_1, $0);
			}, [() => nf($$props.counts[r] ?? 0)]);
			append($$anchor, span_1);
		});
		reset(div_1);
		append($$anchor, fragment);
		pop();
	}
	var root$6 = from_html(`<div class="empty"><b>Profil indisponible pour le moment.</b><div> </div><button class="btn">Réessayer</button></div>`);
	var root_1$6 = from_html(`<div class="coll-head"><div><h1>Profil</h1><div class="meta"><span class="sync"><span class="spin"></span>Chargement de votre profil</span></div></div></div>`);
	var root_2$4 = from_html(`<span class="badge pro">Pro</span>`);
	var root_3$3 = from_html(`<p role="status"> </p>`);
	var root_4$3 = from_html(`<small> </small>`);
	var root_5$3 = from_html(`<em> </em>`);
	var root_6$2 = from_html(`<section class="pf-coll" aria-label="Ma collection"><h2 class="ach-sec-h">Par rareté</h2> <!></section>`);
	var root_7$2 = from_html(`<p class="fr-hint">La vitrine n'a pas pu être chargée. <button class="link-btn">Réessayer</button></p>`);
	var root_8$2 = from_html(`<input class="pf-gname-in" maxlength="40" aria-label="Nom de la vitrine"/>`);
	var root_9$2 = from_html(`<button class="pf-gname" title="Renommer"> <!></button>`);
	var root_10$2 = from_html(`<div class="pf-place"><button class="card-btn"><!></button> <button class="pf-remove" title="Retirer"><!></button></div>`);
	var root_11$2 = from_html(`<button class="pf-empty" aria-label="Exposer une carte ici"><span class="pf-plus" aria-hidden="true"></span><span>Exposer</span></button>`);
	var root_12$2 = from_html(`<div class="pf-gallery"><!> <div class="pf-places"></div></div>`);
	var root_13$2 = from_html(`<button class="link-btn">Ouvrir une autre vitrine</button> `, 1);
	var root_14$2 = from_html(`<section class="pf-hero"><button class="pf-avatar" title="Changer la photo de profil" aria-label="Changer la photo de profil"><!><span class="pf-avatar-edit"><!></span></button> <div class="pf-id"><h1> <!></h1> <div class="meta"><!><!><a class="pf-public">Voir mon profil public</a></div></div> <div class="pf-vis"><div><b> </b><span> </span></div> <button class="snd-switch" role="switch" aria-label="Profil public"><span></span></button></div></section> <!> <nav class="pf-stats" aria-label="Mes pages"><button class="pf-stat"><span>Cartes</span><b> </b></button> <button class="pf-stat"><span>Amis</span><b> </b></button> <button class="pf-stat"><span>Succès</span><b> <!></b><!></button> <button class="pf-stat"><span>Vitrine</span><b> </b></button></nav> <!> <section class="pf-shelf" aria-label="Vitrine"><h2 class="ach-sec-h">Vitrine<span> </span></h2> <!> <!> <p class="fr-hint"><!> <!></p></section>`, 1);
	var root_15$2 = from_html(`<p class="ach-note bad" role="status"> </p>`);
	var root_16$2 = from_html(`<button class="btn danger">Retirer la photo</button>`);
	var root_17$2 = from_html(`<span class="spin"></span>`);
	var root_18$2 = from_html(`<div class="modal-backdrop" role="presentation"><div class="modal pf-frame" role="dialog" aria-modal="true" aria-labelledby="wm-frame-title" tabindex="-1"><button class="modal-close" aria-label="Fermer"><!></button> <h2 id="wm-frame-title">Photo de profil</h2> <p class="fr-hint">Faites glisser l'image pour la cadrer.</p> <div class="pf-crop" role="slider" tabindex="0" aria-label="Cadrage"><img alt="" draggable="false"/></div> <div class="pf-frame-small" aria-hidden="true"><!><!></div> <!> <div class="pf-frame-acts"><button class="btn">Autre carte</button> <!> <button class="btn primary"><!></button></div></div></div>`);
	var root_19$2 = from_html(`<div class="pf-page"><!></div> <!> <!>`, 1);
	function Profile($$anchor, $$props) {
		push($$props, true);
		let me = state(null);
		const publicUrl = user_derived(() => get(me) ? `/profile/${encodeURIComponent(get(me).username)}` : null);
		let stats = state(null);
		let shelf = state(null);
		let error = state("");
		let note = state(null);
		async function load() {
			set(error, "");
			const [m, s, sh] = await Promise.allSettled([
				data.me(),
				data.collectionStats(),
				data.showcase()
			]);
			if (m.status === "rejected") {
				set(error, m.reason?.message || "Profil indisponible pour le moment.", true);
				return;
			}
			set(me, m.value, true);
			set(stats, s.status === "fulfilled" ? s.value : null, true);
			set(shelf, sh.status === "fulfilled" ? sh.value : {
				places: Array(SHOWCASE.places).fill(null),
				names: {},
				failed: true
			}, true);
			data.friendships().then((f) => set(friends, f.friends.length, true), () => {});
			data.achievements().then((a) => set(ach, {
				got: a.filter((x) => x.state !== "locked").length,
				total: a.length,
				claim: a.filter((x) => x.state === "claim").length
			}, true), () => {});
		}
		let friends = state(null);
		let shelfEl = state(void 0);
		let ach = state(null);
		load();
		const fail = (e) => set(note, {
			ok: false,
			text: e.message
		}, true);
		const joined = user_derived(() => get(me)?.joinedAt ? new Date(get(me).joinedAt).toLocaleDateString("fr", {
			month: "long",
			year: "numeric"
		}) : "");
		async function setPublic(on) {
			const was = get(me).isPublic;
			get(me).isPublic = on;
			set(note, null);
			try {
				await data.updateProfile(get(me).username, { is_public: on });
			} catch (e) {
				get(me).isPublic = was;
				fail(e);
			}
		}
		const galleries = user_derived(() => get(shelf) ? Array.from({ length: galleryCount(get(stats)?.total ?? 0) }, (_, g) => ({
			g,
			places: get(shelf).places.slice(g * SHOWCASE.perGallery, (g + 1) * SHOWCASE.perGallery).map((row, i) => ({
				pos: g * SHOWCASE.perGallery + i,
				row
			}))
		})) : []);
		const filled = user_derived(() => get(shelf)?.places.filter(Boolean).length ?? 0);
		let opened = state(0);
		const lastUsed = user_derived(() => get(galleries).findLastIndex((gal) => gal.places.some((p) => p.row)));
		const visible = user_derived(() => get(galleries).slice(0, Math.max(get(lastUsed) + 2, get(opened), 1)));
		const placeOf = (row) => get(shelf).places.findIndex((r) => r?.id === row.id);
		let picking = state(null);
		async function put(pos, row) {
			set(picking, null);
			const before = [...get(shelf).places];
			get(shelf).places[pos] = row;
			set(note, null);
			try {
				await sounded(() => data.showcasePut(pos, row.id));
			} catch (e) {
				get(shelf).places = before;
				fail(e);
			}
		}
		async function clear(pos) {
			const was = get(shelf).places[pos];
			get(shelf).places[pos] = null;
			set(note, null);
			try {
				await data.showcaseClear(pos);
			} catch (e) {
				get(shelf).places[pos] = was;
				fail(e);
			}
		}
		let naming = state(null);
		async function rename() {
			const { g, text } = get(naming);
			set(naming, null);
			const name = text.trim().slice(0, 40);
			const value = name && name !== galleryName(g, {}) ? name : null;
			if ((value ?? null) === (get(shelf).names[g] ?? null)) return;
			const was = get(shelf).names[g];
			if (value) get(shelf).names[g] = value;
			else delete get(shelf).names[g];
			try {
				await data.showcaseName(g, value);
			} catch (e) {
				if (was) get(shelf).names[g] = was;
				else delete get(shelf).names[g];
				fail(e);
			}
		}
		const focusSelect = (node) => {
			node.focus();
			node.select();
		};
		let avatar = state(null);
		const startAvatar = () => set(avatar, get(me).avatar ? {
			step: "frame",
			url: get(me).avatar,
			x: get(me).ax,
			y: get(me).ay
		} : { step: "pick" }, true);
		let drag = null;
		function dragStart(e) {
			drag = {
				px: e.clientX,
				py: e.clientY,
				x: get(avatar).x,
				y: get(avatar).y,
				size: e.currentTarget.offsetWidth
			};
			e.currentTarget.setPointerCapture(e.pointerId);
		}
		function dragMove(e) {
			if (!drag) return;
			const clamp = (v) => Math.round(Math.min(100, Math.max(0, v)));
			get(avatar).x = clamp(drag.x - (e.clientX - drag.px) / drag.size * 100);
			get(avatar).y = clamp(drag.y - (e.clientY - drag.py) / drag.size * 100);
		}
		function nudge(e) {
			const step = {
				ArrowLeft: [5, 0],
				ArrowRight: [-5, 0],
				ArrowUp: [0, 5],
				ArrowDown: [0, -5]
			}[e.key];
			if (!step) return;
			e.preventDefault();
			get(avatar).x = Math.min(100, Math.max(0, get(avatar).x + step[0]));
			get(avatar).y = Math.min(100, Math.max(0, get(avatar).y + step[1]));
		}
		async function saveAvatar(patch) {
			get(avatar).busy = true;
			set(note, null);
			try {
				const p = await sounded(() => data.updateProfile(get(me).username, patch));
				if (p) set(me, {
					...get(me),
					...p
				}, true);
				set(avatar, null);
			} catch (e) {
				get(avatar).busy = false;
				get(avatar).error = e.message;
			}
		}
		const saveFrame = () => saveAvatar({
			...get(avatar).row && { avatar_user_card_id: get(avatar).row.id },
			avatar_pos_x: get(avatar).x,
			avatar_pos_y: get(avatar).y
		});
		const onKey = (e) => e.key === "Escape" && get(avatar)?.step === "frame" && !get(avatar).busy && set(avatar, null);
		var fragment = root_19$2();
		event("keydown", $window, onKey);
		var div = first_child(fragment);
		var node_1 = child(div);
		var consequent = ($$anchor) => {
			var div_1 = root$6();
			var div_2 = sibling(child(div_1));
			var text_1 = only_child(div_2, true);
			var button = sibling(div_2);
			reset(div_1);
			template_effect(() => set_text(text_1, get(error)));
			delegated("click", button, load);
			append($$anchor, div_1);
		};
		var consequent_1 = ($$anchor) => {
			append($$anchor, root_1$6());
		};
		var alternate_2 = ($$anchor) => {
			var fragment_1 = root_14$2();
			var section = first_child(fragment_1);
			var button_1 = child(section);
			var node_2 = child(button_1);
			Avatar(node_2, {
				get user() {
					return get(me);
				},
				size: 96
			});
			var span = sibling(node_2);
			Icon(child(span), { name: "sparkle" });
			reset(span);
			reset(button_1);
			var div_4 = sibling(button_1, 2);
			var h1 = child(div_4);
			var text_2 = child(h1, true);
			var node_4 = sibling(text_2);
			var consequent_2 = ($$anchor) => {
				append($$anchor, root_2$4());
			};
			if_block(node_4, ($$render) => {
				if (get(me).isPro) $$render(consequent_2);
			});
			reset(h1);
			var div_5 = sibling(h1, 2);
			var node_5 = child(div_5);
			var consequent_3 = ($$anchor) => {
				var text_3 = text();
				template_effect(() => set_text(text_3, `Joueur depuis ${get(joined) ?? ""}`));
				append($$anchor, text_3);
			};
			if_block(node_5, ($$render) => {
				if (get(joined)) $$render(consequent_3);
			});
			var node_6 = sibling(node_5);
			var consequent_4 = ($$anchor) => {
				var text_4 = text();
				text_4.nodeValue = " · ";
				append($$anchor, text_4);
			};
			if_block(node_6, ($$render) => {
				if (get(joined)) $$render(consequent_4);
			});
			var a_1 = sibling(node_6);
			reset(div_5);
			reset(div_4);
			var div_6 = sibling(div_4, 2);
			var div_7 = child(div_6);
			var b = child(div_7);
			var text_5 = only_child(b, true);
			var text_6 = only_child(sibling(b), true);
			reset(div_7);
			var button_2 = sibling(div_7, 2);
			reset(div_6);
			reset(section);
			var node_7 = sibling(section, 2);
			var consequent_5 = ($$anchor) => {
				var p_1 = root_3$3();
				let classes;
				var text_7 = only_child(p_1, true);
				template_effect(() => {
					classes = set_class(p_1, 1, "ach-note", null, classes, { bad: !get(note).ok });
					set_text(text_7, get(note).text);
				});
				append($$anchor, p_1);
			};
			if_block(node_7, ($$render) => {
				if (get(note)) $$render(consequent_5);
			});
			var nav = sibling(node_7, 2);
			var button_3 = child(nav);
			var text_8 = only_child(sibling(child(button_3)), true);
			reset(button_3);
			var button_4 = sibling(button_3, 2);
			var text_9 = only_child(sibling(child(button_4)), true);
			reset(button_4);
			var button_5 = sibling(button_4, 2);
			var b_3 = sibling(child(button_5));
			var text_10 = child(b_3, true);
			var node_8 = sibling(text_10);
			var consequent_6 = ($$anchor) => {
				var small = root_4$3();
				var text_11 = only_child(small);
				template_effect(() => set_text(text_11, `/${get(ach).total ?? ""}`));
				append($$anchor, small);
			};
			if_block(node_8, ($$render) => {
				if (get(ach)) $$render(consequent_6);
			});
			reset(b_3);
			var node_9 = sibling(b_3);
			var consequent_7 = ($$anchor) => {
				var em = root_5$3();
				var text_12 = only_child(em);
				template_effect(() => set_text(text_12, `${get(ach).claim ?? ""} à réclamer`));
				append($$anchor, em);
			};
			if_block(node_9, ($$render) => {
				if (get(ach)?.claim) $$render(consequent_7);
			});
			reset(button_5);
			var button_6 = sibling(button_5, 2);
			var text_13 = only_child(sibling(child(button_6)), true);
			reset(button_6);
			reset(nav);
			var node_10 = sibling(nav, 2);
			var consequent_8 = ($$anchor) => {
				var section_1 = root_6$2();
				RarityBreakdown(sibling(child(section_1), 2), { get counts() {
					return get(stats).rarityCounts;
				} });
				reset(section_1);
				append($$anchor, section_1);
			};
			if_block(node_10, ($$render) => {
				if (get(stats)?.total) $$render(consequent_8);
			});
			var section_2 = sibling(node_10, 2);
			var h2 = child(section_2);
			var text_14 = only_child(sibling(child(h2)));
			reset(h2);
			var node_12 = sibling(h2, 2);
			var consequent_9 = ($$anchor) => {
				var p_2 = root_7$2();
				var button_7 = sibling(child(p_2));
				reset(p_2);
				delegated("click", button_7, load);
				append($$anchor, p_2);
			};
			if_block(node_12, ($$render) => {
				if (get(shelf)?.failed) $$render(consequent_9);
			});
			var node_13 = sibling(node_12, 2);
			each(node_13, 17, () => get(visible), (gal) => gal.g, ($$anchor, gal) => {
				var div_8 = root_12$2();
				var node_14 = child(div_8);
				var consequent_11 = ($$anchor) => {
					var fragment_4 = comment();
					var node_15 = first_child(fragment_4);
					var consequent_10 = ($$anchor) => {
						var input = root_8$2();
						remove_input_defaults(input);
						effect(() => bind_value(input, () => get(naming).text, ($$value) => get(naming).text = $$value));
						action(input, ($$node) => focusSelect?.($$node));
						delegated("keydown", input, (e) => {
							if (e.key === "Enter") rename();
							if (e.key === "Escape") {
								e.stopPropagation();
								set(naming, null);
							}
						});
						event("blur", input, rename);
						append($$anchor, input);
					};
					var alternate = ($$anchor) => {
						var button_8 = root_9$2();
						var text_15 = child(button_8, true);
						Icon(sibling(text_15), { name: "tag" });
						reset(button_8);
						template_effect(($0) => set_text(text_15, $0), [() => galleryName(get(gal).g, get(shelf).names)]);
						delegated("click", button_8, () => set(naming, {
							g: get(gal).g,
							text: galleryName(get(gal).g, get(shelf).names)
						}, true));
						append($$anchor, button_8);
					};
					if_block(node_15, ($$render) => {
						if (get(naming)?.g === get(gal).g) $$render(consequent_10);
						else $$render(alternate, -1);
					});
					append($$anchor, fragment_4);
				};
				if_block(node_14, ($$render) => {
					if (get(galleries).length > 1) $$render(consequent_11);
				});
				var div_9 = sibling(node_14, 2);
				each(div_9, 21, () => get(gal).places, (p) => p.pos, ($$anchor, p) => {
					var fragment_5 = comment();
					var node_17 = first_child(fragment_5);
					var consequent_12 = ($$anchor) => {
						var div_10 = root_10$2();
						var button_9 = child(div_10);
						Card(child(button_9), {
							get card() {
								return get(p).row.card;
							},
							get shiny() {
								return get(p).row.is_shiny;
							}
						});
						reset(button_9);
						var button_10 = sibling(button_9, 2);
						Icon(child(button_10), {
							name: "close",
							width: 2.2
						});
						reset(button_10);
						reset(div_10);
						template_effect(() => {
							set_attribute(button_9, "title", `Remplacer ${get(p).row.card.title ?? ""}`);
							set_attribute(button_10, "aria-label", `Retirer ${get(p).row.card.title ?? ""} de la vitrine`);
						});
						delegated("click", button_9, () => set(picking, get(p).pos, true));
						delegated("click", button_10, () => clear(get(p).pos));
						append($$anchor, div_10);
					};
					var alternate_1 = ($$anchor) => {
						var button_11 = root_11$2();
						delegated("click", button_11, () => set(picking, get(p).pos, true));
						append($$anchor, button_11);
					};
					if_block(node_17, ($$render) => {
						if (get(p).row) $$render(consequent_12);
						else $$render(alternate_1, -1);
					});
					append($$anchor, fragment_5);
				});
				reset(div_9);
				reset(div_8);
				append($$anchor, div_8);
			});
			var p_3 = sibling(node_13, 2);
			var node_20 = child(p_3);
			var consequent_13 = ($$anchor) => {
				var fragment_6 = root_13$2();
				var button_12 = first_child(fragment_6);
				var text_16 = sibling(button_12);
				template_effect(() => set_text(text_16, ` (${get(galleries).length - get(visible).length} encore disponible${get(galleries).length - get(visible).length > 1 ? "s" : ""}). `));
				delegated("click", button_12, () => set(opened, get(visible).length + 1));
				append($$anchor, fragment_6);
			};
			if_block(node_20, ($$render) => {
				if (get(visible).length < get(galleries).length) $$render(consequent_13);
			});
			var node_21 = sibling(node_20, 2);
			var consequent_14 = ($$anchor) => {
				var text_17 = text();
				template_effect(($0) => set_text(text_17, `Une vitrine de plus tous les ${$0 ?? ""} cartes.`), [() => nf(SHOWCASE.cardsPerGallery)]);
				append($$anchor, text_17);
			};
			if_block(node_21, ($$render) => {
				if (get(galleries).length < SHOWCASE.maxGalleries) $$render(consequent_14);
			});
			reset(p_3);
			reset(section_2);
			bind_this(section_2, ($$value) => set(shelfEl, $$value), () => get(shelfEl));
			template_effect(($0) => {
				set_text(text_2, get(me).username);
				set_attribute(a_1, "href", get(publicUrl));
				set_text(text_5, get(me).isPublic ? "Visible de tous" : "Amis seulement");
				set_text(text_6, get(me).isPublic ? "Tout le monde peut voir votre profil" : "Seuls vos amis voient votre profil");
				set_attribute(button_2, "aria-checked", get(me).isPublic);
				set_text(text_8, $0);
				set_text(text_9, get(friends) ?? "-");
				set_text(text_10, get(ach) ? get(ach).got : "-");
				set_text(text_13, get(filled));
				set_text(text_14, `${get(filled) ?? ""} carte${get(filled) > 1 ? "s" : ""} exposée${get(filled) > 1 ? "s" : ""}`);
			}, [() => get(stats)?.total != null ? nf(get(stats).total) : "-"]);
			delegated("click", button_1, startAvatar);
			delegated("click", a_1, (e) => {
				e.preventDefault();
				history.pushState({}, "", get(publicUrl));
			});
			delegated("click", button_2, () => setPublic(!get(me).isPublic));
			delegated("click", button_3, () => $$props.onopen("/collection"));
			delegated("click", button_4, () => $$props.onopen("/friends"));
			delegated("click", button_5, () => $$props.onopen("/achievements"));
			delegated("click", button_6, () => get(shelfEl)?.scrollIntoView({
				behavior: "smooth",
				block: "start"
			}));
			append($$anchor, fragment_1);
		};
		if_block(node_1, ($$render) => {
			if (get(error)) $$render(consequent);
			else if (!get(me)) $$render(consequent_1, 1);
			else $$render(alternate_2, -1);
		});
		reset(div);
		var node_22 = sibling(div, 2);
		var consequent_15 = ($$anchor) => {
			{
				let $0 = user_derived(() => get(galleries).length > 1 ? galleryName(Math.floor(get(picking) / SHOWCASE.perGallery), get(shelf).names) : "");
				CopyPicker($$anchor, {
					title: "Exposer une carte",
					get sub() {
						return get($0);
					},
					blocked: (r) => placeOf(r) >= 0 ? "Déjà exposée" : null,
					onpick: (row) => put(get(picking), row),
					onclose: () => set(picking, null)
				});
			}
		};
		if_block(node_22, ($$render) => {
			if (get(picking) != null) $$render(consequent_15);
		});
		var node_23 = sibling(node_22, 2);
		var consequent_16 = ($$anchor) => {
			CopyPicker($$anchor, {
				title: "Photo de profil",
				sub: "Choisissez une carte avec une image",
				blocked: (r) => r.card.image_url ? null : "Sans image",
				onpick: (row) => set(avatar, {
					step: "frame",
					row,
					url: row.card.image_url,
					x: 50,
					y: 50
				}, true),
				onclose: () => set(avatar, null)
			});
		};
		var consequent_20 = ($$anchor) => {
			var div_11 = root_18$2();
			var div_12 = child(div_11);
			var button_13 = child(div_12);
			Icon(child(button_13), {
				name: "close",
				width: 2,
				class: "x-ico"
			});
			reset(button_13);
			var div_13 = sibling(button_13, 6);
			var img = child(div_13);
			let styles;
			reset(div_13);
			var div_14 = sibling(div_13, 2);
			var node_25 = child(div_14);
			{
				let $0 = user_derived(() => ({
					username: get(me).username,
					avatar: get(avatar).url,
					ax: get(avatar).x,
					ay: get(avatar).y
				}));
				Avatar(node_25, {
					get user() {
						return get($0);
					},
					size: 44
				});
			}
			var node_26 = sibling(node_25);
			{
				let $0 = user_derived(() => ({
					username: get(me).username,
					avatar: get(avatar).url,
					ax: get(avatar).x,
					ay: get(avatar).y
				}));
				Avatar(node_26, {
					get user() {
						return get($0);
					},
					size: 28
				});
			}
			reset(div_14);
			var node_27 = sibling(div_14, 2);
			var consequent_17 = ($$anchor) => {
				var p_4 = root_15$2();
				var text_18 = only_child(p_4, true);
				template_effect(() => set_text(text_18, get(avatar).error));
				append($$anchor, p_4);
			};
			if_block(node_27, ($$render) => {
				if (get(avatar).error) $$render(consequent_17);
			});
			var div_15 = sibling(node_27, 2);
			var button_14 = child(div_15);
			var node_28 = sibling(button_14, 2);
			var consequent_18 = ($$anchor) => {
				var button_15 = root_16$2();
				template_effect(() => button_15.disabled = get(avatar).busy);
				delegated("click", button_15, () => saveAvatar({ clear_avatar: true }));
				append($$anchor, button_15);
			};
			if_block(node_28, ($$render) => {
				if (get(me).avatar && !get(avatar).row) $$render(consequent_18);
			});
			var button_16 = sibling(node_28, 2);
			var node_29 = child(button_16);
			var consequent_19 = ($$anchor) => {
				append($$anchor, root_17$2());
			};
			var alternate_3 = ($$anchor) => {
				append($$anchor, text("Enregistrer"));
			};
			if_block(node_29, ($$render) => {
				if (get(avatar).busy) $$render(consequent_19);
				else $$render(alternate_3, -1);
			});
			reset(button_16);
			reset(div_15);
			reset(div_12);
			action(div_12, ($$node) => anchorCentered?.($$node));
			reset(div_11);
			template_effect(() => {
				button_13.disabled = get(avatar).busy;
				set_attribute(div_13, "aria-valuetext", `${get(avatar).x ?? ""} %, ${get(avatar).y ?? ""} %`);
				set_attribute(div_13, "aria-valuenow", get(avatar).x);
				set_attribute(img, "src", get(avatar).url);
				styles = set_style(img, "", styles, { "object-position": `${get(avatar).x ?? ""}% ${get(avatar).y ?? ""}%` });
				button_14.disabled = get(avatar).busy;
				button_16.disabled = get(avatar).busy;
			});
			delegated("click", div_11, (e) => e.target === e.currentTarget && !get(avatar).busy && set(avatar, null));
			delegated("click", button_13, () => set(avatar, null));
			delegated("pointerdown", div_13, dragStart);
			delegated("pointermove", div_13, dragMove);
			delegated("pointerup", div_13, () => drag = null);
			event("pointercancel", div_13, () => drag = null);
			delegated("keydown", div_13, nudge);
			delegated("click", button_14, () => set(avatar, { step: "pick" }, true));
			delegated("click", button_16, saveFrame);
			append($$anchor, div_11);
		};
		if_block(node_23, ($$render) => {
			if (get(avatar)?.step === "pick") $$render(consequent_16);
			else if (get(avatar)?.step === "frame") $$render(consequent_20, 1);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate([
		"click",
		"keydown",
		"pointerdown",
		"pointermove",
		"pointerup"
	]);
	var root$5 = from_html(`<div class="empty"><!><b> </b><button class="btn">Retour</button></div>`);
	var root_1$5 = from_html(`<div class="empty"><b>Profil indisponible pour le moment.</b><div> </div><button class="btn">Réessayer</button></div>`);
	var root_2$3 = from_html(`<div class="coll-head"><div><h1> </h1><div class="meta"><span class="sync"><span class="spin"></span>Chargement du profil</span></div></div></div>`);
	var root_3$2 = from_html(`<span><i></i> </span>`);
	var root_4$2 = from_html(`<button class="btn primary"><!>Proposer un échange</button> <button class="btn"><!>Écrire</button>`, 1);
	var root_5$2 = from_html(`<button class="btn primary"><!>Accepter sa demande</button>`);
	var root_6$1 = from_html(`<span class="pf-sent"><!>Demande envoyée</span> <button class="btn">Annuler</button>`, 1);
	var root_7$1 = from_html(`<button class="btn primary"><!>Ajouter en ami</button>`);
	var root_8$1 = from_html(`<p role="status"> </p>`);
	var root_9$1 = from_html(`<p class="pf-own">Votre profil, tel que les autres joueurs le voient.<button class="link-btn">Modifier mon profil</button></p>`);
	var root_10$1 = from_html(`<section class="pf-private"><span class="pf-lock"><!></span> <b>Profil privé</b> <p> <!></p></section>`);
	var root_11$1 = from_html(`<span> </span>`);
	var root_12$1 = from_html(`<p class="fr-hint"><span class="spin"></span> Chargement...</p>`);
	var root_13$1 = from_html(` <button class="link-btn">Voir ses cartes pour un échange</button>`, 1);
	var root_14$1 = from_html(`<p class="pf-none"> <!></p>`);
	var root_15$1 = from_html(`<h3 class="pf-gtitle"> </h3>`);
	var root_16$1 = from_html(`<div class="pf-place"><!></div>`);
	var root_17$1 = from_html(`<div class="pf-gallery"><!> <div class="pf-places"></div></div>`);
	var root_18$1 = from_html(`<section class="pf-coll" aria-label="Sa collection"><h2 class="ach-sec-h">Par rareté<span> </span></h2> <!></section>`);
	var root_19$1 = from_html(`<nav class="pf-stats pf-stats-3" aria-label="En bref"><div class="pf-stat"><span>Cartes</span><b> </b></div> <div class="pf-stat"><span>Légendaires</span><b> </b></div> <div class="pf-stat"><span>Exposées</span><b> </b></div></nav> <section class="pf-shelf" aria-label="Vitrine"><h2 class="ach-sec-h">Vitrine<!></h2> <!></section> <!>`, 1);
	var root_20$1 = from_html(`<section class="pf-hero"><span class="pf-avatar-static"><!></span> <div class="pf-id"><h1> </h1> <div class="meta"><!><!><!></div></div> <div class="pf-acts"><!></div></section> <!> <!> <!>`, 1);
	var root_21$1 = from_html(`<div class="pf-page"><!></div> <!> <!>`, 1);
	function PlayerProfile($$anchor, $$props) {
		push($$props, true);
		let who = state(null);
		let missing = state(false);
		let error = state("");
		let shelf = state(null);
		let coll = state(null);
		let split = state(null);
		let busy = state(false);
		let note = state(null);
		const hidden = (e) => e?.status === 403;
		async function load() {
			set(error, "");
			set(missing, false);
			try {
				set(who, await data.player($$props.username), true);
			} catch (e) {
				if (e.status === 404) set(missing, true);
				else set(error, e.message || "Profil indisponible pour le moment.", true);
				return;
			}
			data.playerShowcase($$props.username).then((s) => set(shelf, s, true), (e) => set(shelf, hidden(e) ? "hidden" : {
				places: [],
				names: {}
			}, true));
			data.playerCollection($$props.username).then((c) => set(coll, c, true), (e) => set(coll, hidden(e) ? "hidden" : null, true));
			if (!get(who).isFriend && !get(who).isOwn) data.friendships().then((s) => set(split, s, true), () => {});
		}
		load();
		const closed = user_derived(() => get(who) && !get(who).isFriend && !get(who).isOwn && (!get(who).isPublic || get(shelf) === "hidden" || get(coll) === "hidden"));
		const relation = user_derived(() => get(who) && get(split) ? relationOf(get(who).id, get(split)) : null);
		const request = user_derived(() => get(relation) === "sent" ? get(split).outgoing.find((r) => r.user.id === get(who).id) : get(relation) === "received" ? get(split).incoming.find((r) => r.user.id === get(who).id) : null);
		const galleries = user_derived(() => get(shelf) && get(shelf) !== "hidden" ? filledGalleries(get(shelf)) : []);
		const shown = user_derived(() => get(galleries).reduce((n, g) => n + g.rows.length, 0));
		const joined = user_derived(() => get(who)?.joinedAt ? new Date(get(who).joinedAt).toLocaleDateString("fr", {
			month: "long",
			year: "numeric"
		}) : "");
		const seen = user_derived(() => seenLabel(get(who)?.lastSeenAt));
		const recent = user_derived(() => get(seen) === "En ligne récemment");
		async function act(run, text) {
			if (get(busy)) return;
			set(busy, true);
			set(note, null);
			try {
				await sounded(run);
				set(note, text ? {
					ok: true,
					text
				} : null, true);
				set(split, await data.friendships(), true);
			} catch (e) {
				set(note, {
					ok: false,
					text: e.message
				}, true);
			}
			set(busy, false);
		}
		const askFriend = () => act(() => data.requestFriend(get(who).id), `Demande envoyée à ${get(who).username}.`);
		const cancel = () => act(() => data.dropFriendship(get(request).fid));
		const accept = () => act(() => data.answerFriend(get(request).fid, true), `${get(who).username} fait maintenant partie de vos amis.`).then(load);
		let trading = state(false);
		let talking = state(false);
		const goTrades = (id) => history.pushState({}, "", id ? `/trades?offre=${encodeURIComponent(id)}` : "/trades");
		var fragment = root_21$1();
		var div = first_child(fragment);
		var node = child(div);
		var consequent = ($$anchor) => {
			var div_1 = root$5();
			var node_1 = child(div_1);
			Icon(node_1, { name: "profile" });
			var b = sibling(node_1);
			var text_1 = only_child(b);
			var button = sibling(b);
			reset(div_1);
			template_effect(() => set_text(text_1, `Aucun joueur ne s'appelle « ${$$props.username ?? ""} ».`));
			delegated("click", button, () => history.back());
			append($$anchor, div_1);
		};
		var consequent_1 = ($$anchor) => {
			var div_2 = root_1$5();
			var div_3 = sibling(child(div_2));
			var text_2 = only_child(div_3, true);
			var button_1 = sibling(div_3);
			reset(div_2);
			template_effect(() => set_text(text_2, get(error)));
			delegated("click", button_1, load);
			append($$anchor, div_2);
		};
		var consequent_2 = ($$anchor) => {
			var div_4 = root_2$3();
			var div_5 = child(div_4);
			var text_3 = only_child(child(div_5), true);
			next();
			reset(div_5);
			reset(div_4);
			template_effect(() => set_text(text_3, $$props.username));
			append($$anchor, div_4);
		};
		var alternate_2 = ($$anchor) => {
			var fragment_1 = root_20$1();
			var section = first_child(fragment_1);
			var span = child(section);
			Avatar(child(span), {
				get user() {
					return get(who);
				},
				size: 96
			});
			reset(span);
			var div_6 = sibling(span, 2);
			var h1_1 = child(div_6);
			var text_4 = only_child(h1_1, true);
			var div_7 = sibling(h1_1, 2);
			var node_3 = child(div_7);
			var consequent_3 = ($$anchor) => {
				var span_1 = root_3$2();
				let classes;
				var text_5 = sibling(child(span_1), 1, true);
				reset(span_1);
				template_effect(() => {
					classes = set_class(span_1, 1, "pf-seen", null, classes, { on: get(recent) });
					set_text(text_5, get(seen));
				});
				append($$anchor, span_1);
			};
			if_block(node_3, ($$render) => {
				if (get(seen)) $$render(consequent_3);
			});
			var node_4 = sibling(node_3);
			var consequent_4 = ($$anchor) => {
				var text_6 = text();
				text_6.nodeValue = " · ";
				append($$anchor, text_6);
			};
			if_block(node_4, ($$render) => {
				if (get(seen) && get(joined)) $$render(consequent_4);
			});
			var node_5 = sibling(node_4);
			var consequent_5 = ($$anchor) => {
				var text_7 = text();
				template_effect(() => set_text(text_7, `Joueur depuis ${get(joined) ?? ""}`));
				append($$anchor, text_7);
			};
			if_block(node_5, ($$render) => {
				if (get(joined)) $$render(consequent_5);
			});
			reset(div_7);
			reset(div_6);
			var div_8 = sibling(div_6, 2);
			var node_6 = child(div_8);
			var consequent_6 = ($$anchor) => {
				var fragment_4 = root_4$2();
				var button_2 = first_child(fragment_4);
				Icon(child(button_2), { name: "trades" });
				next();
				reset(button_2);
				var button_3 = sibling(button_2, 2);
				Icon(child(button_3), { name: "dms" });
				next();
				reset(button_3);
				delegated("click", button_2, () => set(trading, true));
				delegated("click", button_3, () => set(talking, true));
				append($$anchor, fragment_4);
			};
			var consequent_7 = ($$anchor) => {
				var button_4 = root_5$2();
				Icon(child(button_4), { name: "check" });
				next();
				reset(button_4);
				template_effect(() => button_4.disabled = get(busy));
				delegated("click", button_4, accept);
				append($$anchor, button_4);
			};
			var consequent_8 = ($$anchor) => {
				var fragment_5 = root_6$1();
				var span_2 = first_child(fragment_5);
				Icon(child(span_2), { name: "check" });
				next();
				reset(span_2);
				var button_5 = sibling(span_2, 2);
				template_effect(() => button_5.disabled = get(busy));
				delegated("click", button_5, cancel);
				append($$anchor, fragment_5);
			};
			var consequent_9 = ($$anchor) => {
				var button_6 = root_7$1();
				Icon(child(button_6), { name: "friends" });
				next();
				reset(button_6);
				template_effect(() => button_6.disabled = get(busy));
				delegated("click", button_6, askFriend);
				append($$anchor, button_6);
			};
			if_block(node_6, ($$render) => {
				if (get(who).isFriend) $$render(consequent_6);
				else if (get(relation) === "received") $$render(consequent_7, 1);
				else if (get(relation) === "sent") $$render(consequent_8, 2);
				else if (get(split)) $$render(consequent_9, 3);
			});
			reset(div_8);
			reset(section);
			var node_12 = sibling(section, 2);
			var consequent_10 = ($$anchor) => {
				var p = root_8$1();
				let classes_1;
				var text_8 = only_child(p, true);
				template_effect(() => {
					classes_1 = set_class(p, 1, "ach-note", null, classes_1, { bad: !get(note).ok });
					set_text(text_8, get(note).text);
				});
				append($$anchor, p);
			};
			if_block(node_12, ($$render) => {
				if (get(note)) $$render(consequent_10);
			});
			var node_13 = sibling(node_12, 2);
			var consequent_11 = ($$anchor) => {
				var p_1 = root_9$1();
				var button_7 = sibling(child(p_1));
				reset(p_1);
				delegated("click", button_7, () => history.pushState({}, "", "/profile"));
				append($$anchor, p_1);
			};
			if_block(node_13, ($$render) => {
				if (get(who).isOwn) $$render(consequent_11);
			});
			var node_14 = sibling(node_13, 2);
			var consequent_14 = ($$anchor) => {
				var section_1 = root_10$1();
				var span_3 = child(section_1);
				Icon(child(span_3), { name: "lock" });
				reset(span_3);
				var p_2 = sibling(span_3, 4);
				var text_9 = child(p_2);
				var node_16 = sibling(text_9);
				var consequent_12 = ($$anchor) => {
					var text_10 = text();
					text_10.nodeValue = " Envoyez une demande d'ami pour les voir.";
					append($$anchor, text_10);
				};
				var consequent_13 = ($$anchor) => {
					var text_11 = text();
					text_11.nodeValue = " Elles s'afficheront dès que votre demande sera acceptée.";
					append($$anchor, text_11);
				};
				if_block(node_16, ($$render) => {
					if (!get(relation)) $$render(consequent_12);
					else if (get(relation) === "sent") $$render(consequent_13, 1);
				});
				reset(p_2);
				reset(section_1);
				template_effect(() => set_text(text_9, `${get(who).username ?? ""} ne montre sa vitrine et ses cartes qu'à ses amis.`));
				append($$anchor, section_1);
			};
			var alternate_1 = ($$anchor) => {
				var fragment_8 = root_19$1();
				var nav = first_child(fragment_8);
				var div_9 = child(nav);
				var text_12 = only_child(sibling(child(div_9)), true);
				reset(div_9);
				var div_10 = sibling(div_9, 2);
				var text_13 = only_child(sibling(child(div_10)), true);
				reset(div_10);
				var div_11 = sibling(div_10, 2);
				var text_14 = only_child(sibling(child(div_11)), true);
				reset(div_11);
				reset(nav);
				var section_2 = sibling(nav, 2);
				var h2 = child(section_2);
				var node_17 = sibling(child(h2));
				var consequent_15 = ($$anchor) => {
					var span_4 = root_11$1();
					var text_15 = only_child(span_4);
					template_effect(() => set_text(text_15, `${get(shown) ?? ""} carte${get(shown) > 1 ? "s" : ""}`));
					append($$anchor, span_4);
				};
				if_block(node_17, ($$render) => {
					if (get(shown)) $$render(consequent_15);
				});
				reset(h2);
				var node_18 = sibling(h2, 2);
				var consequent_16 = ($$anchor) => {
					append($$anchor, root_12$1());
				};
				var consequent_18 = ($$anchor) => {
					var p_4 = root_14$1();
					var text_16 = child(p_4);
					var node_19 = sibling(text_16);
					var consequent_17 = ($$anchor) => {
						var fragment_9 = root_13$1();
						var text_17 = first_child(fragment_9, true);
						text_17.nodeValue = " ";
						delegated("click", sibling(text_17), () => set(trading, true));
						append($$anchor, fragment_9);
					};
					if_block(node_19, ($$render) => {
						if (get(who).isFriend) $$render(consequent_17);
					});
					reset(p_4);
					template_effect(() => set_text(text_16, `${get(who).username ?? ""} n'a encore rien exposé.`));
					append($$anchor, p_4);
				};
				var alternate = ($$anchor) => {
					var fragment_10 = comment();
					each(first_child(fragment_10), 17, () => get(galleries), (gal) => gal.g, ($$anchor, gal) => {
						var div_12 = root_17$1();
						var node_21 = child(div_12);
						var consequent_19 = ($$anchor) => {
							var h3 = root_15$1();
							var text_18 = only_child(h3, true);
							template_effect(() => set_text(text_18, get(gal).name));
							append($$anchor, h3);
						};
						if_block(node_21, ($$render) => {
							if (get(galleries).length > 1 || get(shelf).names[get(gal).g]) $$render(consequent_19);
						});
						var div_13 = sibling(node_21, 2);
						each(div_13, 21, () => get(gal).rows, (row) => row.id, ($$anchor, row) => {
							var div_14 = root_16$1();
							Card(child(div_14), {
								get card() {
									return get(row).card;
								},
								get shiny() {
									return get(row).is_shiny;
								}
							});
							reset(div_14);
							append($$anchor, div_14);
						});
						reset(div_13);
						reset(div_12);
						append($$anchor, div_12);
					});
					append($$anchor, fragment_10);
				};
				if_block(node_18, ($$render) => {
					if (!get(shelf)) $$render(consequent_16);
					else if (!get(galleries).length) $$render(consequent_18, 1);
					else $$render(alternate, -1);
				});
				reset(section_2);
				var node_23 = sibling(section_2, 2);
				var consequent_20 = ($$anchor) => {
					var section_3 = root_18$1();
					var h2_1 = child(section_3);
					var text_19 = only_child(sibling(child(h2_1)));
					reset(h2_1);
					RarityBreakdown(sibling(h2_1, 2), { get counts() {
						return get(coll).rarityCounts;
					} });
					reset(section_3);
					template_effect(($0) => set_text(text_19, `${$0 ?? ""} cartes`), [() => nf(get(coll).total)]);
					append($$anchor, section_3);
				};
				if_block(node_23, ($$render) => {
					if (get(coll) && get(coll) !== "hidden" && get(coll).total) $$render(consequent_20);
				});
				template_effect(($0, $1) => {
					set_text(text_12, $0);
					set_text(text_13, $1);
					set_text(text_14, get(shelf) ? get(shown) : "-");
				}, [() => get(coll) && get(coll) !== "hidden" && get(coll).total != null ? nf(get(coll).total) : "-", () => get(coll) && get(coll) !== "hidden" ? nf(get(coll).rarityCounts.L ?? 0) : "-"]);
				append($$anchor, fragment_8);
			};
			if_block(node_14, ($$render) => {
				if (get(closed)) $$render(consequent_14);
				else $$render(alternate_1, -1);
			});
			template_effect(() => set_text(text_4, get(who).username));
			append($$anchor, fragment_1);
		};
		if_block(node, ($$render) => {
			if (get(missing)) $$render(consequent);
			else if (get(error)) $$render(consequent_1, 1);
			else if (!get(who)) $$render(consequent_2, 2);
			else $$render(alternate_2, -1);
		});
		reset(div);
		var node_25 = sibling(div, 2);
		var consequent_21 = ($$anchor) => {
			{
				let $0 = user_derived(() => $$props.profile?.currency ?? null);
				TradeComposer($$anchor, {
					get to() {
						return get(who);
					},
					get balance() {
						return get($0);
					},
					onclose: () => set(trading, false),
					onsent: (ok) => {
						if (ok) {
							set(note, {
								ok: true,
								text: `Offre envoyée à ${get(who).username}.`
							}, true);
							$$props.onwallet?.();
						}
					}
				});
			}
		};
		if_block(node_25, ($$render) => {
			if (get(trading) && get(who)) $$render(consequent_21);
		});
		var node_26 = sibling(node_25, 2);
		var consequent_22 = ($$anchor) => {
			ChatModal($$anchor, {
				get friend() {
					return get(who);
				},
				onclose: () => set(talking, false),
				onopentrade: (t) => {
					set(talking, false);
					goTrades(t?.id);
				}
			});
		};
		if_block(node_26, ($$render) => {
			if (get(talking) && get(who)) $$render(consequent_22);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate(["click"]);
	var root$4 = from_html(`<span class="loadcap-t"> </span>`);
	var root_1$4 = from_html(`<div aria-hidden="true"></div> <div role="status" aria-live="polite"><span class="spin"></span> <span class="loadcap-txt"> </span> <!></div>`, 1);
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
		var fragment = root_1$4();
		var div = first_child(fragment);
		let classes;
		var div_1 = sibling(div, 2);
		let classes_1;
		var span = sibling(child(div_1), 2);
		var text_1 = only_child(span, true);
		var node = sibling(span, 2);
		var consequent = ($$anchor) => {
			var span_1 = root$4();
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
	var root$3 = from_html(`<span aria-hidden="true"></span>`);
	var root_1$3 = from_html(`<span> </span>`);
	var root_2$2 = from_html(`<div class="snd-head"><b>Son</b> <button class="snd-switch" role="switch" aria-label="Activer le son"><span></span></button></div> <label><!> <input type="range" min="0" max="100" step="5" aria-label="Volume"/> <!> <output> </output></label> <div><div class="chime-head"><span>Carillon de rareté</span><b> </b></div> <div class="chime-track"><span class="chime-lit" aria-hidden="true"></span> <!> <input type="range" min="0" step="1" aria-label="Carillon à partir de"/></div> <div class="chime-codes" aria-hidden="true"></div></div> <p class="snd-note"> </p>`, 1);
	function SoundSettings($$anchor, $$props) {
		push($$props, true);
		let on = state(true);
		let vol = state(.7);
		user_effect(() => onSoundChange((v) => set(on, v, true)));
		user_effect(() => onVolumeChange((v) => set(vol, v, true)));
		const pct = user_derived(() => Math.round(get(vol) * 100));
		let from = state("C");
		user_effect(() => onChimeChange((r) => set(from, r, true)));
		const at = user_derived(() => CHIME_ORDER.indexOf(get(from)));
		function pickChime(e) {
			setChimeFrom(CHIME_ORDER[e.currentTarget.value]);
			if (!get(on)) setSoundOn(true);
		}
		function slide(e) {
			setVolume(e.currentTarget.value / 100);
			if (!get(on)) setSoundOn(true);
		}
		var fragment = root_2$2();
		var div = first_child(fragment);
		var button = sibling(child(div), 2);
		reset(div);
		var label = sibling(div, 2);
		let classes;
		var node = child(label);
		Icon(node, { name: "soundLow" });
		var input = sibling(node, 2);
		remove_input_defaults(input);
		let styles;
		var node_1 = sibling(input, 2);
		Icon(node_1, { name: "sound" });
		var text = only_child(sibling(node_1, 2));
		reset(label);
		var div_1 = sibling(label, 2);
		let classes_1;
		var div_2 = child(div_1);
		var text_1 = only_child(sibling(child(div_2)), true);
		reset(div_2);
		var div_3 = sibling(div_2, 2);
		let styles_1;
		var node_2 = sibling(child(div_3), 2);
		each(node_2, 18, () => CHIME_ORDER, (r) => r, ($$anchor, r, i) => {
			var span = root$3();
			let classes_2;
			let styles_2;
			template_effect(() => {
				classes_2 = set_class(span, 1, "chime-stop", null, classes_2, { lit: get(i) >= get(at) });
				set_attribute(span, "data-r", r);
				styles_2 = set_style(span, "", styles_2, { "--i": get(i) });
			});
			append($$anchor, span);
		});
		var input_1 = sibling(node_2, 2);
		remove_input_defaults(input_1);
		reset(div_3);
		var div_4 = sibling(div_3, 2);
		each(div_4, 22, () => CHIME_ORDER, (r) => r, ($$anchor, r, i) => {
			var span_1 = root_1$3();
			let classes_3;
			var text_2 = only_child(span_1, true);
			template_effect(() => {
				set_attribute(span_1, "data-r", r);
				classes_3 = set_class(span_1, 1, "", null, classes_3, { lit: get(i) >= get(at) });
				set_text(text_2, r);
			});
			append($$anchor, span_1);
		});
		reset(div_4);
		reset(div_1);
		var text_3 = only_child(sibling(div_1, 2), true);
		template_effect(() => {
			set_attribute(button, "aria-checked", get(on));
			classes = set_class(label, 1, "snd-vol", null, classes, { off: !get(on) });
			set_value(input, get(pct));
			set_attribute(input, "aria-valuetext", `${get(pct) ?? ""} %`);
			styles = set_style(input, "", styles, { "--pct": `${get(pct) ?? ""}%` });
			set_text(text, `${get(pct) ?? ""} %`);
			classes_1 = set_class(div_1, 1, "chime", null, classes_1, { off: !get(on) });
			set_text(text_1, get(at) ? `${RNAME[get(from)]} et plus` : "Toutes les raretés");
			styles_1 = set_style(div_3, "", styles_1, { "--at": get(at) });
			set_attribute(input_1, "max", CHIME_ORDER.length - 1);
			set_value(input_1, get(at));
			set_attribute(input_1, "aria-valuetext", RNAME[get(from)]);
			set_text(text_3, get(on) ? "Ouverture des paquets, révélations, sélection et confirmations." : "Tous les sons du remaster sont coupés, comme sur le site original.");
		});
		delegated("click", button, () => {
			setSoundOn(!get(on));
			if (!get(on)) play("tick");
		});
		delegated("input", input, slide);
		delegated("change", input, () => play("success"));
		delegated("input", input_1, pickChime);
		delegated("change", input_1, () => play(get(from)));
		append($$anchor, fragment);
		pop();
	}
	delegate([
		"click",
		"input",
		"change"
	]);
	var root$2 = from_html(`<div class="notif-scrim" role="presentation"></div> <div class="snd-panel" role="dialog" aria-label="Son"><!></div>`, 1);
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
			SoundSettings(child(div_2), {});
			reset(div_2);
			delegated("click", div_1, () => set(open, false));
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
	delegate(["click"]);
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
			delegated("click", div, (e) => e.target === e.currentTarget && resolveHuman(false));
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
	var CHECK_EVERY = 216e5;
	function isNewer(a, b) {
		const pa = String(a).split(".").map(Number), pb = String(b).split(".").map(Number);
		for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
			const d = (pa[i] || 0) - (pb[i] || 0);
			if (d) return d > 0;
		}
		return false;
	}
	var headerVersion = (text) => /^\/\/\s*@version\s+(\S+)/m.exec(text)?.[1] ?? null;
	var isUserscript = () => typeof GM_info !== "undefined" && !!GM_info?.script;
	async function availableUpdate(current, { metaUrl, fetch: get = fetch } = {}) {
		if (!metaUrl) return null;
		let latest = load$1("update.latest", CHECK_EVERY);
		if (!latest) {
			try {
				const r = await get(metaUrl, { cache: "no-store" });
				latest = r.ok ? headerVersion(await r.text()) : null;
			} catch {}
			if (latest) save("update.latest", latest);
		}
		return latest && isNewer(latest, current) ? latest : null;
	}
	var root = from_html(`<button type="button"><!><span class="nav-long"> </span><span class="nav-short"> </span></button>`);
	var root_1 = from_html(`<span class="nav-badge"> </span>`);
	var root_2 = from_html(`<button type="button"><span class="nav-ico"><!><!></span><span class="nav-lbl"> </span></button>`);
	var root_3 = from_html(`<a><!><span class="nav-lbl"> </span></a>`);
	var root_4 = from_html(`<button class="ghost">Réinitialiser</button>`);
	var root_5 = from_html(`<a class="app-update" target="_blank" rel="noopener noreferrer"><span class="upd-dot"></span>Mise à jour</a>`);
	var root_6 = from_html(`<a class="app-version" target="_blank" rel="noopener noreferrer"> </a>`);
	var root_7 = from_html(`<span class="health" role="status" title="Le serveur du jeu répond mal : nouvelle tentative automatique, vos données restent affichées."><span class="health-dot"></span><span class="health-txt">Serveur du jeu instable</span></span>`);
	var root_8 = from_html(`<span class="upd-dot on-icon"></span>`);
	var root_9 = from_html(`<span class="bell-badge"> </span>`);
	var root_10 = from_html(`<span class="notif-count"> </span> <button class="link-btn">Tout marquer comme lu</button>`, 1);
	var root_11 = from_html(`<span class="notif-dot"></span>`);
	var root_12 = from_html(`<div class="notif-msg"> </div>`);
	var root_13 = from_html(`<!> <div class="notif-body"><div class="notif-title"> </div> <!> <div class="notif-time"> </div></div>`, 1);
	var root_14 = from_html(`<div class="notif-empty">Aucune notification</div>`);
	var root_15 = from_html(`<div class="notif-scrim" role="presentation"></div> <div class="notif-panel" role="dialog" aria-label="Notifications"><div class="notif-head">Notifications<!></div> <!></div>`, 1);
	var root_16 = from_html(`<span class="badge pro">Pro</span>`);
	var root_17 = from_html(`<span> </span>`);
	var root_18 = from_html(`<span class="pk-pro">+1 PRO</span>`);
	var root_19 = from_html(`<button type="button"><span class="nav-ico"><!><!></span><span> </span></button>`);
	var root_20 = from_html(`<a><!><span> </span></a>`);
	var root_21 = from_html(`<a class="btn primary sheet-update" target="_blank" rel="noopener noreferrer"><span class="upd-dot"></span> </a>`);
	var root_22 = from_html(`<button class="btn sheet-reset">Réinitialiser (test)</button>`);
	var root_23 = from_html(`<div class="sheet-scrim" role="presentation"></div> <div class="sheet" role="dialog" aria-modal="true" aria-label="Menu"><div class="sheet-grab"></div> <section class="sheet-sec"><!></section> <section class="sheet-sec sheet-row"><div><b>ATK et DEF</b><span>Sur toutes les cartes</span></div> <button class="snd-switch" role="switch" aria-label="Afficher l'ATK et la DEF"><span></span></button></section> <section class="sheet-sec"><b class="sheet-title">Le reste du site</b> <div class="sheet-grid"></div></section> <!> <button class="btn sheet-reset">Revenir au site original</button> <!> <a class="app-version sheet-version" target="_blank" rel="noopener noreferrer"> </a></div>`, 1);
	var root_24 = from_html(`<!> <div><b> </b><!></div>`, 1);
	var root_25 = from_html(`<div class="toast-wrap" role="presentation"><!> <button class="toast-x" aria-label="Fermer la notification" title="Fermer"><!></button></div>`);
	var root_26 = from_html(`<div class="toasts" role="status" aria-live="polite"></div>`);
	var root_27 = from_html(`<div class="kbd-row"><span class="kbd"> </span> </div>`);
	var root_28 = from_html(`<div class="kbd-help-scrim" role="presentation"><div class="kbd-help" role="dialog" aria-label="Raccourcis clavier"><h3>Raccourcis clavier</h3> <!></div></div>`);
	var root_29 = from_html(`<div><!> <aside class="side"><div class="brand"><span class="mk"></span><b>Wiki Remaster</b> <button type="button" class="side-toggle"><!></button></div> <nav class="nav"><!> <div class="nav-sep">Le reste du site</div> <div class="nav-grid"></div></nav> <div class="side-foot"><!> <button class="foot-link" title="Raccourcis clavier"><span class="kbd">?</span><span class="foot-txt">Raccourcis clavier</span></button> <div class="hintline"> <!></div></div></aside> <main class="main"><header class="topbar"><div class="crumb"><span class="nav-long"> </span><span class="nav-short"> </span></div> <div class="wallet"><!> <button><span>ATK</span></button> <!> <button class="bell menu-btn"><!><!></button> <div class="notif"><button aria-label="Notifications"><!> <!></button> <!></div> <!> <button type="button"><span class="pk-ring"><!></span> <b> </b><span class="chip-cap"> </span> <!> <!></button> <span class="chip" title="WikiBidous"><!><b> </b></span></div></header> <section class="view"><!></section></main> <!> <!> <!> <!></div>`);
	function App($$anchor, $$props) {
		push($$props, true);
		const VERSION = "0.12.12";
		const REPO = "https://github.com/KazeTachinuu/wiki-remaster";
		let update$1 = state(null);
		if (isUserscript()) availableUpdate(VERSION, { metaUrl: "https://raw.githubusercontent.com/KazeTachinuu/wiki-remaster/main/dist/wikimasters-app.meta.js" }).then((v) => set(update$1, v, true));
		const VIEWS = [
			{
				id: "pulls",
				path: "/pulls",
				label: "Ouvrir des paquets",
				short: "Paquets",
				icon: "pulls"
			},
			{
				id: "collection",
				path: "/collection",
				label: "Ma collection",
				short: "Collection",
				icon: "collection"
			},
			{
				id: "catalog",
				path: "/global-collection",
				label: "Toutes les cartes",
				short: "Cartes",
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
			},
			{
				id: "friends",
				path: "/friends",
				label: "Amis",
				icon: "friends",
				more: true
			},
			{
				id: "achievements",
				path: "/achievements",
				label: "Succès",
				icon: "achievements",
				more: true
			},
			{
				id: "profile",
				path: "/profile",
				label: "Profil",
				icon: "profile",
				more: true
			}
		];
		const MAIN = VIEWS.filter((v) => !v.more);
		const view_ = (id) => VIEWS.find((v) => v.id === id);
		const MORE = [
			{
				path: "/battle",
				label: "Duels",
				icon: "battle"
			},
			{
				path: "/guild",
				label: "Guilde",
				icon: "guild"
			},
			view_("friends"),
			{
				path: "/dms",
				label: "Messages",
				icon: "dms"
			},
			{
				path: "/leaderboard",
				label: "Classement",
				icon: "leaderboard"
			},
			view_("achievements"),
			view_("profile"),
			{
				path: "/settings",
				label: "Paramètres",
				icon: "settings"
			}
		];
		const viewFromPath = () => ([...VIEWS].sort((a, b) => b.path.length - a.path.length).find((v) => v.path !== "/pulls" && location.pathname.startsWith(v.path)) || VIEWS[0]).id;
		let view = state(proxy(viewFromPath()));
		const auctionFromPath = () => location.pathname.match(/^\/marketplace\/([^/]+)/)?.[1] ?? null;
		let openAuction = state(proxy(auctionFromPath()));
		const playerFromPath = () => {
			const m = location.pathname.match(/^\/profile\/([^/]+)/);
			return m ? decodeURIComponent(m[1]) : null;
		};
		let player = state(proxy(playerFromPath()));
		const current = user_derived(() => VIEWS.find((v) => v.id === get(view)));
		let navEl = state(void 0);
		user_effect(() => {
			get(view);
			const b = get(navEl)?.querySelector("button.on");
			if (!b || get(navEl).scrollWidth <= get(navEl).clientWidth) return;
			const n = get(navEl).getBoundingClientRect(), r = b.getBoundingClientRect();
			get(navEl).scrollTo({ left: get(navEl).scrollLeft + r.left - n.left - (n.width - r.width) / 2 });
		});
		const native = (path) => data.isReal ? path : "https://www.wiki-masters.com" + path;
		function go(v) {
			set(view, v.id, true);
			if (location.pathname !== v.path) history.pushState({}, "", v.path);
		}
		user_effect(() => {
			const onRoute = () => {
				set(view, viewFromPath(), true);
				set(openAuction, auctionFromPath(), true);
				set(player, playerFromPath(), true);
			};
			window.addEventListener("wm:route", onRoute);
			return () => window.removeEventListener("wm:route", onRoute);
		});
		let profile = state(null);
		const profileLoads = new Map();
		const packsFull = user_derived(() => get(profile)?.packs_remaining != null && get(profile).packs_remaining >= (get(profile).pack_cap ?? 10));
		const packTime = packTimer(() => get(packsFull) ? null : get(profile)?.next_regen_seconds ?? null, () => loadProfile({ sync: true }));
		const packFill = user_derived(() => packTime.secs != null && get(profile)?.regen_seconds ? 1 - packTime.secs / get(profile).regen_seconds : 1);
		let proDaily = state(null);
		user_effect(() => {
			if (!get(profile)?.is_pro) {
				set(proDaily, null);
				return;
			}
			let live = true;
			const read = () => data.proDaily().then((d) => live && set(proDaily, d, true), () => live && set(proDaily, null));
			read();
			const midnight = new Date();
			midnight.setHours(24, 0, 5, 0);
			const t = setTimeout(read, midnight - Date.now());
			return () => {
				live = false;
				clearTimeout(t);
			};
		});
		const packTitle = user_derived(() => `Paquets : ${get(profile)?.packs_remaining ?? "?"} sur ${get(profile)?.pack_cap ?? 10}` + (packTime.secs == null ? "" : packTime.secs ? `. Prochain dans ${clock(packTime.secs)}` : ". Prochain paquet prêt") + (get(proDaily)?.eligible ? ". Pack PRO du jour disponible" : get(proDaily)?.claimedToday ? ". Pack PRO : le prochain à minuit" : ""));
		function loadProfile(opts = {}) {
			const key = JSON.stringify(opts);
			if (!profileLoads.has(key)) profileLoads.set(key, data.profile(opts).then((p) => set(profile, p, true), () => {}).finally(() => profileLoads.delete(key)));
			return profileLoads.get(key);
		}
		loadProfile();
		user_effect(() => {
			const onSync = () => loadProfile({ balance: false });
			window.addEventListener("wm:profile", onSync);
			return () => window.removeEventListener("wm:profile", onSync);
		});
		let collKey = state(0);
		function onchanged() {
			loadProfile();
			setTimeout(() => loadRewards(true), 6e4);
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
		const bell = user_derived(() => [...watches.alerts, ...get(notifs)].sort((a, b) => String(b.at).localeCompare(String(a.at))));
		const unread = user_derived(() => get(bell).filter((n) => !n.read));
		user_effect(() => startWatching(toast));
		let seen = null;
		let requests = state(0);
		const loadRequests = () => data.friendships().then((f) => set(requests, f.incoming.length, true), () => {});
		loadRequests();
		function onRequests(n) {
			set(requests, n, true);
			const ids = get(notifs).filter((x) => !x.read && x.type === "friend_request").map((x) => x.id);
			if (ids.length) markRead(ids);
		}
		let rewards = state(0);
		const REWARDS_KEY = "wm-rewards-at";
		const rewardsAt = () => {
			try {
				return Number(localStorage.getItem(REWARDS_KEY)) || 0;
			} catch {
				return 0;
			}
		};
		function loadRewards(force = false) {
			if (!force && Date.now() - rewardsAt() < 6e5) return;
			try {
				localStorage.setItem(REWARDS_KEY, String(Date.now()));
			} catch {}
			data.syncAchievements().catch(() => {}).then(() => data.achievements()).then((l) => set(rewards, l.filter((a) => a.state === "claim").length, true), () => {});
		}
		user_effect(() => {
			const t = setTimeout(loadRewards, 2e4);
			return () => clearTimeout(t);
		});
		const countOn = (id) => id === "friends" ? get(requests) : id === "achievements" ? get(rewards) : 0;
		const COUNT_SAYS = {
			friends: ["demande reçue", "demandes reçues"],
			achievements: ["récompense à réclamer", "récompenses à réclamer"]
		};
		const countLabel = (m, n) => n ? `${m.label}, ${n} ${COUNT_SAYS[m.id][n > 1 ? 1 : 0]}` : m.label;
		async function loadNotifs() {
			const list = await data.notifications().catch(() => null);
			if (!list) return;
			if (seen && list.some((n) => n.type === "friend_request" && !seen.has(n.id))) loadRequests();
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
		const isAlert = (id) => id.startsWith("watch:");
		function markRead(ids) {
			markAlertsRead(ids && ids.filter(isAlert));
			const theirs = ids && ids.filter((id) => !isAlert(id));
			if (theirs && !theirs.length) return;
			for (const n of get(notifs)) if (!theirs || theirs.includes(n.id)) n.read = true;
			data.markRead(theirs).catch(() => {});
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
		const asButton = (n) => n.href ? {} : {
			role: "button",
			tabindex: 0,
			onkeydown: (e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					openNotif(n, e);
				}
			}
		};
		let appEl;
		user_effect(() => tabTicks(appEl.getRootNode()));
		let help = state(false);
		let menuOpen = state(false);
		const SHORTCUTS = [
			["/", "Rechercher"],
			["1 à 5", "Changer d'écran"],
			["Espace", "Ouvrir un paquet"],
			["Flèches", "Parcourir les cartes révélées"],
			["Échap", "Fermer"],
			["[", "Replier ou déplier le menu"],
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
				if (get(help) || get(notifOpen) || get(menuOpen)) e.preventDefault();
				set(help, false);
				set(notifOpen, false);
				set(menuOpen, false);
				return;
			}
			if (appEl?.querySelector(".modal-backdrop")) return;
			if (e.key === "?") set(help, !get(help));
			if (e.key === "[") toggleSideRail();
			else if (e.key === "/") {
				e.preventDefault();
				appEl?.querySelector("input.search")?.focus();
			} else if (/^[1-5]$/.test(e.key)) go(MAIN[e.key - 1]);
		}
		var div = root_29();
		event("keydown", $window, onKey);
		let classes;
		var node = child(div);
		LoadBar(node, {});
		var aside = sibling(node, 2);
		var div_1 = child(aside);
		var button = sibling(child(div_1), 3);
		Icon(child(button), {
			name: "sidebar",
			width: 1.7
		});
		reset(button);
		reset(div_1);
		var nav = sibling(div_1, 2);
		var node_2 = child(nav);
		each(node_2, 17, () => MAIN, index, ($$anchor, v) => {
			var button_1 = root();
			let classes_1;
			var node_3 = child(button_1);
			Icon(node_3, {
				get name() {
					return get(v).icon;
				},
				width: 1.7
			});
			var span = sibling(node_3);
			var text = only_child(span, true);
			var text_1 = only_child(sibling(span), true);
			reset(button_1);
			template_effect(() => {
				set_attribute(button_1, "aria-current", get(view) === get(v).id ? "page" : void 0);
				set_attribute(button_1, "title", settings.sideRail ? get(v).label : void 0);
				classes_1 = set_class(button_1, 1, "", null, classes_1, { on: get(view) === get(v).id });
				set_text(text, get(v).label);
				set_text(text_1, get(v).short ?? get(v).label);
			});
			delegated("click", button_1, () => go(get(v)));
			append($$anchor, button_1);
		});
		var div_2 = sibling(node_2, 4);
		each(div_2, 21, () => MORE, (m) => m.path, ($$anchor, m) => {
			var fragment = comment();
			var node_4 = first_child(fragment);
			var consequent_1 = ($$anchor) => {
				const n = user_derived(() => countOn(get(m).id));
				var button_2 = root_2();
				let classes_2;
				var span_2 = child(button_2);
				var node_5 = child(span_2);
				Icon(node_5, {
					get name() {
						return get(m).icon;
					},
					width: 1.7
				});
				var node_6 = sibling(node_5);
				var consequent = ($$anchor) => {
					var span_3 = root_1();
					var text_2 = only_child(span_3, true);
					template_effect(() => set_text(text_2, get(n)));
					append($$anchor, span_3);
				};
				if_block(node_6, ($$render) => {
					if (get(n)) $$render(consequent);
				});
				reset(span_2);
				var text_3 = only_child(sibling(span_2), true);
				reset(button_2);
				template_effect(($0, $1) => {
					set_attribute(button_2, "aria-current", get(view) === get(m).id ? "page" : void 0);
					set_attribute(button_2, "title", $0);
					set_attribute(button_2, "aria-label", $1);
					classes_2 = set_class(button_2, 1, "", null, classes_2, { on: get(view) === get(m).id });
					set_text(text_3, get(m).label);
				}, [() => countLabel(get(m), get(n)), () => countLabel(get(m), get(n))]);
				delegated("click", button_2, () => go(get(m)));
				append($$anchor, button_2);
			};
			var alternate = ($$anchor) => {
				var a_1 = root_3();
				var node_7 = child(a_1);
				Icon(node_7, {
					get name() {
						return get(m).icon;
					},
					width: 1.7
				});
				var text_4 = only_child(sibling(node_7), true);
				reset(a_1);
				template_effect(($0) => {
					set_attribute(a_1, "href", $0);
					set_attribute(a_1, "title", get(m).label);
					set_attribute(a_1, "aria-label", get(m).label);
					set_text(text_4, get(m).label);
				}, [() => native(get(m).path)]);
				append($$anchor, a_1);
			};
			if_block(node_4, ($$render) => {
				if (get(m).id) $$render(consequent_1);
				else $$render(alternate, -1);
			});
			append($$anchor, fragment);
		});
		reset(div_2);
		reset(nav);
		bind_this(nav, ($$value) => set(navEl, $$value), () => get(navEl));
		action(nav, ($$node, $$action_arg) => scrollFade?.($$node, $$action_arg), () => ({ axis: "x" }));
		var div_3 = sibling(nav, 2);
		var node_8 = child(div_3);
		var consequent_2 = ($$anchor) => {
			var button_3 = root_4();
			delegated("click", button_3, reset$1);
			append($$anchor, button_3);
		};
		if_block(node_8, ($$render) => {
			if (data.canReset) $$render(consequent_2);
		});
		var button_4 = sibling(node_8, 2);
		var div_4 = sibling(button_4, 2);
		var text_5 = child(div_4);
		var node_9 = sibling(text_5);
		var consequent_3 = ($$anchor) => {
			var a_2 = root_5();
			set_attribute(a_2, "href", "https://raw.githubusercontent.com/KazeTachinuu/wiki-remaster/main/dist/wikimasters-app.user.js");
			template_effect(() => set_attribute(a_2, "title", `Wiki Remaster ${get(update$1) ?? ""} est disponible (vous avez la ${VERSION}) : Tampermonkey propose la mise à jour`));
			append($$anchor, a_2);
		};
		var alternate_1 = ($$anchor) => {
			var a_3 = root_6();
			set_attribute(a_3, "href", REPO);
			var text_6 = only_child(a_3);
			template_effect(() => {
				set_attribute(a_3, "title", `Wiki Remaster ${VERSION}, le code source`);
				set_text(text_6, `v${VERSION}`);
			});
			append($$anchor, a_3);
		};
		if_block(node_9, ($$render) => {
			if (get(update$1)) $$render(consequent_3);
			else $$render(alternate_1, -1);
		});
		reset(div_4);
		reset(div_3);
		reset(aside);
		var main = sibling(aside, 2);
		var header = child(main);
		var div_5 = child(header);
		var span_6 = child(div_5);
		var text_7 = only_child(span_6, true);
		var text_8 = only_child(sibling(span_6), true);
		reset(div_5);
		var div_6 = sibling(div_5, 2);
		var node_10 = child(div_6);
		var consequent_4 = ($$anchor) => {
			append($$anchor, root_7());
		};
		if_block(node_10, ($$render) => {
			if (get(unstable)) $$render(consequent_4);
		});
		var button_5 = sibling(node_10, 2);
		let classes_3;
		var node_11 = sibling(button_5, 2);
		SoundControl(node_11, {});
		var button_6 = sibling(node_11, 2);
		var node_12 = child(button_6);
		Icon(node_12, {
			name: "menu",
			width: 1.8
		});
		var node_13 = sibling(node_12);
		var consequent_5 = ($$anchor) => {
			append($$anchor, root_8());
		};
		if_block(node_13, ($$render) => {
			if (get(update$1) || get(requests) || get(rewards)) $$render(consequent_5);
		});
		reset(button_6);
		var div_7 = sibling(button_6, 2);
		var button_7 = child(div_7);
		let classes_4;
		var node_14 = child(button_7);
		Icon(node_14, {
			name: "bell",
			width: 1.7
		});
		var node_15 = sibling(node_14, 2);
		var consequent_6 = ($$anchor) => {
			var span_10 = root_9();
			var text_9 = only_child(span_10, true);
			template_effect(() => set_text(text_9, get(unread).length));
			append($$anchor, span_10);
		};
		if_block(node_15, ($$render) => {
			if (get(unread).length) $$render(consequent_6);
		});
		reset(button_7);
		var node_16 = sibling(button_7, 2);
		var consequent_10 = ($$anchor) => {
			var fragment_1 = root_15();
			var div_8 = first_child(fragment_1);
			var div_9 = sibling(div_8, 2);
			var div_10 = child(div_9);
			var node_17 = sibling(child(div_10));
			var consequent_7 = ($$anchor) => {
				var fragment_2 = root_10();
				var span_11 = first_child(fragment_2);
				var text_10 = only_child(span_11, true);
				var button_8 = sibling(span_11, 2);
				template_effect(() => set_text(text_10, get(unread).length));
				delegated("click", button_8, () => markRead());
				append($$anchor, fragment_2);
			};
			if_block(node_17, ($$render) => {
				if (get(unread).length) $$render(consequent_7);
			});
			reset(div_10);
			each(sibling(div_10, 2), 17, () => get(bell), (n) => n.id, ($$anchor, n) => {
				var fragment_3 = comment();
				element(first_child(fragment_3), () => get(n).href ? "a" : "div", false, ($$element, $$anchor) => {
					var event_handler = (e) => openNotif(get(n), e);
					attribute_effect($$element, ($0) => ({
						href: get(n).href,
						...$0,
						class: "notif-item",
						onclick: event_handler,
						[CLASS]: { unread: !get(n).read }
					}), [() => asButton(get(n))]);
					var fragment_4 = root_13();
					var node_20 = first_child(fragment_4);
					var consequent_8 = ($$anchor) => {
						append($$anchor, root_11());
					};
					if_block(node_20, ($$render) => {
						if (!get(n).read) $$render(consequent_8);
					});
					var div_11 = sibling(node_20, 2);
					var div_12 = child(div_11);
					var text_11 = only_child(div_12, true);
					var node_21 = sibling(div_12, 2);
					var consequent_9 = ($$anchor) => {
						var div_13 = root_12();
						var text_12 = only_child(div_13, true);
						template_effect(() => set_text(text_12, get(n).message));
						append($$anchor, div_13);
					};
					if_block(node_21, ($$render) => {
						if (get(n).message) $$render(consequent_9);
					});
					var text_13 = only_child(sibling(node_21, 2), true);
					reset(div_11);
					template_effect(($0) => {
						set_text(text_11, get(n).title);
						set_text(text_13, $0);
					}, [() => ago(get(n).at)]);
					append($$anchor, fragment_4);
				});
				append($$anchor, fragment_3);
			}, ($$anchor) => {
				append($$anchor, root_14());
			});
			reset(div_9);
			delegated("click", div_8, () => set(notifOpen, false));
			append($$anchor, fragment_1);
		};
		if_block(node_16, ($$render) => {
			if (get(notifOpen)) $$render(consequent_10);
		});
		reset(div_7);
		var node_22 = sibling(div_7, 2);
		var consequent_11 = ($$anchor) => {
			append($$anchor, root_16());
		};
		if_block(node_22, ($$render) => {
			if (get(profile)?.is_pro) $$render(consequent_11);
		});
		var button_9 = sibling(node_22, 2);
		let classes_5;
		var span_14 = child(button_9);
		let styles;
		Icon(child(span_14), {
			name: "pulls",
			class: "cico pk"
		});
		reset(span_14);
		var b_1 = sibling(span_14, 2);
		var text_14 = only_child(b_1, true);
		var span_15 = sibling(b_1);
		var text_15 = only_child(span_15);
		var node_24 = sibling(span_15, 2);
		var consequent_12 = ($$anchor) => {
			var span_16 = root_17();
			let classes_6;
			var text_16 = only_child(span_16, true);
			template_effect(($0) => {
				classes_6 = set_class(span_16, 1, "pk-next", null, classes_6, { ready: !packTime.secs });
				set_text(text_16, $0);
			}, [() => packTime.secs ? clock(packTime.secs) : "prêt"]);
			append($$anchor, span_16);
		};
		if_block(node_24, ($$render) => {
			if (packTime.secs != null) $$render(consequent_12);
		});
		var node_25 = sibling(node_24, 2);
		var consequent_13 = ($$anchor) => {
			append($$anchor, root_18());
		};
		if_block(node_25, ($$render) => {
			if (get(proDaily)?.eligible) $$render(consequent_13);
		});
		reset(button_9);
		var span_18 = sibling(button_9, 2);
		var node_26 = child(span_18);
		Icon(node_26, {
			name: "coin",
			class: "cico coin"
		});
		var text_17 = only_child(sibling(node_26), true);
		reset(span_18);
		reset(div_6);
		reset(header);
		var section = sibling(header, 2);
		var node_27 = child(section);
		var consequent_14 = ($$anchor) => {
			Pulls($$anchor, {
				get profile() {
					return get(profile);
				},
				onchanged,
				onprofile: () => loadProfile({ sync: true })
			});
		};
		var consequent_15 = ($$anchor) => {
			var fragment_6 = comment();
			key(first_child(fragment_6), () => get(collKey), ($$anchor) => {
				Collection($$anchor, { onwallet: () => loadProfile() });
			});
			append($$anchor, fragment_6);
		};
		var consequent_16 = ($$anchor) => {
			Catalog($$anchor, {});
		};
		var consequent_17 = ($$anchor) => {
			Trades($$anchor, {
				get profile() {
					return get(profile);
				},
				onwallet: () => loadProfile()
			});
		};
		var consequent_18 = ($$anchor) => {
			Friends($$anchor, {
				get profile() {
					return get(profile);
				},
				onwallet: () => loadProfile(),
				onrequests: onRequests
			});
		};
		var consequent_19 = ($$anchor) => {
			Achievements($$anchor, {
				onwallet: () => loadProfile(),
				onrewards: (n) => set(rewards, n, true)
			});
		};
		var consequent_21 = ($$anchor) => {
			var fragment_12 = comment();
			var node_29 = first_child(fragment_12);
			var consequent_20 = ($$anchor) => {
				var fragment_13 = comment();
				key(first_child(fragment_13), () => get(player), ($$anchor) => {
					PlayerProfile($$anchor, {
						get username() {
							return get(player);
						},
						get profile() {
							return get(profile);
						},
						onwallet: () => loadProfile()
					});
				});
				append($$anchor, fragment_13);
			};
			var alternate_2 = ($$anchor) => {
				Profile($$anchor, { onopen: (path) => history.pushState({}, "", path) });
			};
			if_block(node_29, ($$render) => {
				if (get(player)) $$render(consequent_20);
				else $$render(alternate_2, -1);
			});
			append($$anchor, fragment_12);
		};
		var alternate_3 = ($$anchor) => {
			Marketplace($$anchor, {
				get profile() {
					return get(profile);
				},
				onwallet: () => loadProfile(),
				get openId() {
					return get(openAuction);
				}
			});
		};
		if_block(node_27, ($$render) => {
			if (get(view) === "pulls") $$render(consequent_14);
			else if (get(view) === "collection") $$render(consequent_15, 1);
			else if (get(view) === "catalog") $$render(consequent_16, 2);
			else if (get(view) === "trades") $$render(consequent_17, 3);
			else if (get(view) === "friends") $$render(consequent_18, 4);
			else if (get(view) === "achievements") $$render(consequent_19, 5);
			else if (get(view) === "profile") $$render(consequent_21, 6);
			else $$render(alternate_3, -1);
		});
		reset(section);
		reset(main);
		var node_31 = sibling(main, 2);
		var consequent_26 = ($$anchor) => {
			var fragment_17 = root_23();
			var div_16 = first_child(fragment_17);
			var div_17 = sibling(div_16, 2);
			var section_1 = sibling(child(div_17), 2);
			SoundSettings(child(section_1), {});
			reset(section_1);
			var section_2 = sibling(section_1, 2);
			var button_10 = sibling(child(section_2), 2);
			reset(section_2);
			var section_3 = sibling(section_2, 2);
			var div_18 = sibling(child(section_3), 2);
			each(div_18, 21, () => MORE, (m) => m.path, ($$anchor, m) => {
				var fragment_18 = comment();
				var node_33 = first_child(fragment_18);
				var consequent_23 = ($$anchor) => {
					const n = user_derived(() => countOn(get(m).id));
					var button_11 = root_19();
					let classes_7;
					var span_19 = child(button_11);
					var node_34 = child(span_19);
					Icon(node_34, {
						get name() {
							return get(m).icon;
						},
						width: 1.7
					});
					var node_35 = sibling(node_34);
					var consequent_22 = ($$anchor) => {
						var span_20 = root_1();
						var text_18 = only_child(span_20, true);
						template_effect(() => set_text(text_18, get(n)));
						append($$anchor, span_20);
					};
					if_block(node_35, ($$render) => {
						if (get(n)) $$render(consequent_22);
					});
					reset(span_19);
					var text_19 = only_child(sibling(span_19), true);
					reset(button_11);
					template_effect(() => {
						classes_7 = set_class(button_11, 1, "", null, classes_7, { on: get(view) === get(m).id });
						set_text(text_19, get(m).label);
					});
					delegated("click", button_11, () => {
						set(menuOpen, false);
						go(get(m));
					});
					append($$anchor, button_11);
				};
				var alternate_4 = ($$anchor) => {
					var a_4 = root_20();
					var node_36 = child(a_4);
					Icon(node_36, {
						get name() {
							return get(m).icon;
						},
						width: 1.7
					});
					var text_20 = only_child(sibling(node_36), true);
					reset(a_4);
					template_effect(($0) => {
						set_attribute(a_4, "href", $0);
						set_text(text_20, get(m).label);
					}, [() => native(get(m).path)]);
					append($$anchor, a_4);
				};
				if_block(node_33, ($$render) => {
					if (get(m).id) $$render(consequent_23);
					else $$render(alternate_4, -1);
				});
				append($$anchor, fragment_18);
			});
			reset(div_18);
			reset(section_3);
			var node_37 = sibling(section_3, 2);
			var consequent_24 = ($$anchor) => {
				var a_5 = root_21();
				set_attribute(a_5, "href", "https://raw.githubusercontent.com/KazeTachinuu/wiki-remaster/main/dist/wikimasters-app.user.js");
				var text_21 = sibling(child(a_5));
				reset(a_5);
				template_effect(() => set_text(text_21, `Mettre à jour vers la ${get(update$1) ?? ""}`));
				append($$anchor, a_5);
			};
			if_block(node_37, ($$render) => {
				if (get(update$1)) $$render(consequent_24);
			});
			var button_12 = sibling(node_37, 2);
			var node_38 = sibling(button_12, 2);
			var consequent_25 = ($$anchor) => {
				var button_13 = root_22();
				delegated("click", button_13, () => {
					set(menuOpen, false);
					reset$1();
				});
				append($$anchor, button_13);
			};
			if_block(node_38, ($$render) => {
				if (data.canReset) $$render(consequent_25);
			});
			var a_6 = sibling(node_38, 2);
			set_attribute(a_6, "href", REPO);
			var text_22 = only_child(a_6);
			reset(div_17);
			template_effect(() => {
				set_attribute(button_10, "aria-checked", !settings.hideStats);
				set_text(text_22, `Wiki Remaster v${VERSION}`);
			});
			delegated("click", div_16, () => set(menuOpen, false));
			delegated("click", button_10, function(...$$args) {
				toggleHideStats?.apply(this, $$args);
			});
			delegated("click", button_12, () => useOriginalSite());
			append($$anchor, fragment_17);
		};
		if_block(node_31, ($$render) => {
			if (get(menuOpen)) $$render(consequent_26);
		});
		var node_39 = sibling(node_31, 2);
		var consequent_28 = ($$anchor) => {
			var div_19 = root_26();
			each(div_19, 21, () => get(toasts), (n) => n.id, ($$anchor, n) => {
				var div_20 = root_25();
				var node_40 = child(div_20);
				element(node_40, () => get(n).href ? "a" : "div", false, ($$element_1, $$anchor) => {
					var event_handler_1 = (e) => openNotif(get(n), e);
					attribute_effect($$element_1, ($0) => ({
						href: get(n).href,
						...$0,
						class: "toast",
						onclick: event_handler_1
					}), [() => asButton(get(n))]);
					var fragment_19 = root_24();
					var node_41 = first_child(fragment_19);
					Icon(node_41, {
						name: "bell",
						width: 1.8
					});
					var div_21 = sibling(node_41, 2);
					var b_3 = child(div_21);
					var text_23 = only_child(b_3, true);
					var node_42 = sibling(b_3);
					var consequent_27 = ($$anchor) => {
						var span_23 = root_17();
						var text_24 = only_child(span_23, true);
						template_effect(() => set_text(text_24, get(n).message));
						append($$anchor, span_23);
					};
					if_block(node_42, ($$render) => {
						if (get(n).message) $$render(consequent_27);
					});
					reset(div_21);
					template_effect(() => set_text(text_23, get(n).title));
					append($$anchor, fragment_19);
				});
				var button_14 = sibling(node_40, 2);
				Icon(child(button_14), {
					name: "close",
					width: 2
				});
				reset(button_14);
				reset(div_20);
				event("mouseenter", div_20, () => clearTimeout(toastTimers.get(get(n).id)));
				event("mouseleave", div_20, () => hideLater(get(n), 3e3));
				delegated("click", button_14, () => dismiss(get(n)));
				append($$anchor, div_20);
			});
			reset(div_19);
			append($$anchor, div_19);
		};
		if_block(node_39, ($$render) => {
			if (get(toasts).length) $$render(consequent_28);
		});
		var node_44 = sibling(node_39, 2);
		var consequent_29 = ($$anchor) => {
			var div_22 = root_28();
			var div_23 = child(div_22);
			each(sibling(child(div_23), 2), 17, () => SHORTCUTS, index, ($$anchor, $$item) => {
				var $$array = user_derived(() => to_array(get($$item), 2));
				let k = () => get($$array)[0];
				let what = () => get($$array)[1];
				var div_24 = root_27();
				var span_24 = child(div_24);
				var text_25 = only_child(span_24, true);
				var text_26 = sibling(span_24, 1, true);
				reset(div_24);
				template_effect(() => {
					set_text(text_25, k());
					set_text(text_26, what());
				});
				append($$anchor, div_24);
			});
			reset(div_23);
			reset(div_22);
			delegated("click", div_22, () => set(help, false));
			append($$anchor, div_22);
		};
		if_block(node_44, ($$render) => {
			if (get(help)) $$render(consequent_29);
		});
		HumanCheck(sibling(node_44, 2), {});
		reset(div);
		bind_this(div, ($$value) => appEl = $$value, () => appEl);
		template_effect(() => {
			classes = set_class(div, 1, "app", null, classes, { rail: settings.sideRail });
			set_attribute(button, "aria-expanded", !settings.sideRail);
			set_attribute(button, "aria-label", settings.sideRail ? "Déplier le menu" : "Replier le menu");
			set_attribute(button, "title", (settings.sideRail ? "Déplier le menu" : "Replier le menu") + " ( [ )");
			set_text(text_5, `${data.isReal ? "Connecté à WikiMasters" : "Serveur de test local"} `);
			set_text(text_7, get(current).label);
			set_text(text_8, get(current).short ?? get(current).label);
			classes_3 = set_class(button_5, 1, "bell stats-toggle", null, classes_3, { off: settings.hideStats });
			set_attribute(button_5, "aria-pressed", !settings.hideStats);
			set_attribute(button_5, "aria-label", settings.hideStats ? "Afficher l'ATK et la DEF" : "Masquer l'ATK et la DEF");
			set_attribute(button_5, "title", settings.hideStats ? "Afficher l'ATK et la DEF" : "Masquer l'ATK et la DEF");
			set_attribute(button_6, "aria-label", get(update$1) ? "Menu, mise à jour disponible" : get(requests) || get(rewards) ? "Menu, du nouveau à voir" : "Menu");
			set_attribute(button_6, "aria-expanded", get(menuOpen));
			classes_4 = set_class(button_7, 1, "bell", null, classes_4, { has: get(unread).length > 0 });
			classes_5 = set_class(button_9, 1, "chip pk-chip", null, classes_5, { regen: packTime.secs != null });
			set_attribute(button_9, "title", get(packTitle));
			set_attribute(button_9, "aria-label", `${get(packTitle) ?? ""}. Ouvrir des paquets`);
			styles = set_style(span_14, "", styles, { "--p": get(packFill) });
			set_text(text_14, get(profile)?.packs_remaining ?? "-");
			set_text(text_15, `/${get(profile)?.pack_cap ?? 10 ?? ""}`);
			set_text(text_17, get(profile)?.currency ?? "-");
		});
		delegated("click", button, function(...$$args) {
			toggleSideRail?.apply(this, $$args);
		});
		delegated("click", button_4, () => set(help, true));
		delegated("click", button_5, function(...$$args) {
			toggleHideStats?.apply(this, $$args);
		});
		delegated("click", button_6, () => set(menuOpen, true));
		delegated("click", button_7, () => {
			set(notifOpen, !get(notifOpen));
			if (get(notifOpen)) loadNotifs();
		});
		delegated("click", button_9, () => go(VIEWS[0]));
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var styles_default = ":host,:root{--bg:#0c0d0c;--surface:#141613;--elev:#191c18;--elev2:#20241f;--line:#262a26;--line2:#333833;--fg:#eceee9;--fg-soft:#98a29a;--fg-faint:#7d857c;--accent:#3ccb8e;--accent-ink:#07130e;--bad:#f6867a;--r-c:#7fd8b4;--r-pc:#7fb0e6;--r-r:#b18fe0;--r-sr:#e46f9f;--r-ur:#f0912f;--r-l:#e8c93a;--card-bg:#0f110e;--coin:radial-gradient(circle at 35% 30%,#ffe680,var(--r-l));--display:\"Outfit\",system-ui,sans-serif;--body:\"Inter\",system-ui,sans-serif;--s1:4px;--s2:8px;--s3:12px;--s4:16px;--s5:24px;--s6:32px;--s7:48px;--s8:64px;--radius:14px;--radius-lg:18px;--sidebar:268px}:where(#wm-app-root,#wm-app-root *){box-sizing:border-box;margin:0;padding:0}[data-r=C]{--rc:var(--r-c)}[data-r=PC]{--rc:var(--r-pc)}[data-r=R]{--rc:var(--r-r)}[data-r=SR]{--rc:var(--r-sr)}[data-r=UR]{--rc:var(--r-ur)}[data-r=L]{--rc:var(--r-l)}#wm-app-root{--lightningcss-light: ;--lightningcss-dark:initial;color-scheme:dark;scrollbar-color:var(--line2) transparent;caret-color:var(--accent);font-family:var(--body);color:var(--fg);-webkit-font-smoothing:antialiased;line-height:1.5}#wm-app-root button{cursor:pointer;font-family:inherit}#wm-app-root ::selection{background:color-mix(in oklab,var(--accent) 32%,transparent);color:var(--fg)}#wm-app-root img{display:block}#wm-app-root a{color:inherit;text-decoration:none}#wm-app-root :is(a,button,input,select,textarea,[tabindex]:not([tabindex=\"-1\"])):focus-visible{outline:2px solid var(--accent);outline-offset:2px}#wm-app-root .modal:focus,#wm-app-root .modal:focus-visible{outline:none}.card-btn:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:var(--radius)}.app{grid-template-columns:var(--sidebar) 1fr;background:var(--bg);min-height:100vh;display:grid}.side{background:var(--surface);border-right:1px solid var(--line);padding:var(--s5) var(--s4);gap:var(--s5);flex-direction:column;height:100vh;display:flex;position:sticky;top:0;overflow:hidden}.brand{padding:0 var(--s3);align-items:center;gap:10px;display:flex}.brand .mk{background:var(--accent);border-radius:3px;width:9px;height:9px}.brand b{font-family:var(--display);letter-spacing:-.01em;font-size:19px;font-weight:700}.nav{scrollbar-width:none;flex-direction:column;flex:1;gap:2px;min-height:0;display:flex;overflow-y:auto}.nav::-webkit-scrollbar{display:none}.nav>button{align-items:center;gap:var(--s3);color:var(--fg-soft);cursor:pointer;text-align:left;background:0 0;border:0;border-radius:11px;width:100%;padding:10px 12px;font-family:inherit;font-size:14px;font-weight:500;transition:background .15s,color .15s;display:flex}.nav>button svg{opacity:.85;flex:none;width:19px;height:19px}.nav>button:hover{background:var(--elev);color:var(--fg)}.nav>button.on{background:color-mix(in oklab,var(--accent) 12%,transparent);color:var(--accent);font-weight:600}.nav>button.on svg{opacity:1}.nav-sep{letter-spacing:.12em;text-transform:uppercase;color:var(--fg-faint);padding:var(--s4) 12px var(--s2);font-size:10px}.nav-grid{grid-template-columns:repeat(3,1fr);gap:2px;display:grid}.nav-grid :is(a,button){color:var(--fg-soft);text-align:center;background:0 0;border:0;border-radius:10px;flex-direction:column;align-items:center;gap:6px;padding:10px 2px 9px;font-family:inherit;font-size:11px;line-height:1.1;transition:background .15s,color .15s;display:flex}.nav-grid :is(a,button) svg{opacity:.55;width:17px;height:17px}.nav-grid :is(a,button):hover{background:var(--elev);color:var(--fg)}.nav-grid :is(a,button):hover svg{opacity:.9}.nav-ico{display:inline-flex;position:relative}.nav-badge{color:#fff;min-width:16px;height:16px;font:700 10px/1 var(--display);font-variant-numeric:tabular-nums;box-shadow:0 0 0 2px var(--surface);background:#f26d6d;border-radius:999px;place-items:center;padding:0 4px;display:grid;position:absolute;top:-6px;left:calc(100% - 6px)}.nav-grid button.on{background:color-mix(in oklab,var(--accent) 12%,transparent);color:var(--accent);font-weight:600}.nav-grid button.on svg{opacity:1}.side-foot{gap:var(--s2);padding:var(--s3) 12px 0;border-top:1px solid var(--line);flex-direction:column;display:flex}.ghost{border:1px solid var(--line2);color:var(--fg-soft);background:0 0;border-radius:10px;padding:9px;font-size:13px;font-weight:500;transition:all .15s}.ghost:hover{border-color:var(--fg-soft);color:var(--fg)}.foot-link{color:var(--fg-soft);font:inherit;cursor:pointer;text-align:left;background:0 0;border:0;align-items:center;gap:8px;padding:0;font-size:12.5px;display:flex}.foot-link svg{width:14px;height:14px}.foot-link:hover{color:var(--fg)}.hintline{color:var(--fg-faint);align-items:center;gap:8px;font-size:11.5px;display:flex}.hintline:before{content:\"\";background:var(--accent);border-radius:50%;width:6px;height:6px}@media (height<=760px) and (width>=901px){.side{padding:var(--s4) var(--s3);gap:var(--s3)}.nav>button{padding:8px 12px}.nav-sep{padding:var(--s3) 12px 6px}.nav-grid :is(a,button){gap:4px;padding:7px 2px 6px}}.main{flex-direction:column;min-width:0;display:flex}.topbar{justify-content:space-between;align-items:center;gap:var(--s4);padding:var(--s5) clamp(var(--s5),4vw,var(--s7));border-bottom:1px solid var(--line);z-index:5;background:color-mix(in oklab,var(--bg) 96%,transparent);display:flex;position:sticky;top:0}.crumb{font-family:var(--display);letter-spacing:-.01em;font-size:16px;font-weight:600}.wallet{align-items:center;gap:var(--s2);display:flex}.wallet .menu-btn,.nav-short{display:none}.stats-toggle span{font:800 10.5px/1 var(--display);letter-spacing:.06em}.stats-toggle.off{color:var(--fg-faint)}.stats-toggle.off span{text-decoration:line-through;text-decoration-thickness:1.5px}.chip{color:var(--fg-soft);background:var(--elev);border:1px solid var(--line);border-radius:999px;align-items:center;gap:8px;padding:9px 15px;font-size:13.5px;display:flex}.chip b{color:var(--fg);font-weight:600}.chip .cico{flex:none;width:14px;height:14px}.chip .cico.pk{color:var(--accent)}.chip .cico.coin{color:var(--r-l)}.pk-ring{place-items:center;width:22px;height:22px;margin:-4px -3px -4px -4px;display:grid;position:relative}.pk-chip.regen .pk-ring:before{content:\"\";background:conic-gradient(var(--accent) calc(var(--p) * 1turn),var(--line2) 0);border-radius:50%;position:absolute;inset:0;-webkit-mask:radial-gradient(farthest-side,#0000 calc(100% - 2px),#000 calc(100% - 1.5px));mask:radial-gradient(farthest-side,#0000 calc(100% - 2px),#000 calc(100% - 1.5px))}.pk-chip.regen .pk-ring .cico{width:12px;height:12px}.pk-next{border-left:1px solid var(--line2);color:var(--fg-soft);font-variant-numeric:tabular-nums;white-space:nowrap;margin-left:1px;padding-left:8px;font-size:12px;font-weight:500}.pk-next.ready{color:var(--accent);font-weight:600}.pk-pro{font:700 10.5px/1 var(--display);letter-spacing:.03em;color:var(--accent-ink);background:var(--r-l);white-space:nowrap;border-radius:999px;padding:3px 7px}button.pk-chip{font:inherit;cursor:pointer;transition:border-color .15s}button.pk-chip:hover{border-color:var(--line2)}.pk-chip{position:relative}@media (width<=560px){.pk-pro{width:9px;height:9px;box-shadow:0 0 0 2px var(--elev);padding:0;font-size:0;position:absolute;top:4px;left:26px}}.badge{font-family:var(--display);letter-spacing:.04em;border-radius:999px;align-items:center;padding:6px 11px;font-size:11px;font-weight:700;display:inline-flex}.badge.pro{background:var(--accent);color:var(--accent-ink)}.loadbar{z-index:2147483603;pointer-events:none;opacity:0;height:3px;transition:opacity .35s;position:fixed;top:0;left:0;right:0;overflow:hidden}.loadbar.on{opacity:1}.loadbar:before{content:\"\";background:linear-gradient(90deg,transparent,var(--accent) 30%,#b6f5d8 60%,var(--accent) 85%,transparent);width:45%;box-shadow:0 0 12px color-mix(in oklab,var(--accent) 70%,transparent),0 0 3px var(--accent);border-radius:0 3px 3px 0;position:absolute;inset:0 auto 0 0}.loadbar.on:before{animation:1.25s cubic-bezier(.45,.05,.4,.95) infinite loadbar}@keyframes loadbar{0%{transform:translate(-110%)}to{transform:translate(330%)}}.loadcap{z-index:2147483602;background:color-mix(in oklab,var(--elev2) 92%,transparent);border:1px solid var(--line2);width:max-content;max-width:calc(100vw - 32px);color:var(--fg);opacity:0;pointer-events:none;border-radius:999px;align-items:center;gap:10px;margin-inline:auto;padding:10px 16px 10px 14px;font-size:13px;font-weight:500;transition:opacity .25s,transform .25s;display:flex;position:fixed;bottom:24px;left:0;right:0;transform:translateY(10px);box-shadow:0 18px 40px -18px #000}.loadcap.on{opacity:1;transform:none}.loadcap .spin{color:var(--accent);width:14px;height:14px}.loadcap:not(.on) .spin{animation:none}.loadcap.slow .spin{color:var(--r-ur)}.loadcap-txt{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.loadcap-t{color:var(--fg-faint);font-variant-numeric:tabular-nums;flex:none}@media (width<=560px){.loadcap{bottom:calc(var(--tabbar,0px) + 12px);border-radius:16px}.loadcap-txt{white-space:normal;line-height:1.35}}@media (prefers-reduced-motion:reduce){.loadbar:before{opacity:.8;width:100%;animation:none}.loadcap{transition:none}}.health{color:var(--r-ur);background:color-mix(in oklab,var(--r-ur) 12%,transparent);border:1px solid color-mix(in oklab,var(--r-ur) 30%,transparent);white-space:nowrap;border-radius:999px;align-self:center;align-items:center;gap:8px;padding:6px 12px;font-size:12.5px;font-weight:500;animation:.3s fade;display:inline-flex}.health-dot{background:var(--r-ur);border-radius:50%;width:7px;height:7px;animation:1.4s ease-in-out infinite auc-pulse}@media (width<=560px){.health{padding:9px}.health-txt{display:none}}@media (prefers-reduced-motion:reduce){.health-dot{animation:none}}.notif{display:flex;position:relative}.bell{border:1px solid var(--line);background:var(--elev);width:38px;height:38px;color:var(--fg-soft);cursor:pointer;border-radius:999px;justify-content:center;align-items:center;transition:all .15s;display:flex;position:relative}.bell:hover{color:var(--fg);border-color:var(--line2)}.bell.has{color:var(--fg)}.bell svg{width:18px;height:18px}.bell-badge{color:#fff;min-width:18px;height:18px;font-family:var(--display);text-align:center;box-shadow:0 0 0 2px var(--bg);background:#f26d6d;border-radius:999px;padding:0 5px;font-size:10.5px;font-weight:700;line-height:18px;position:absolute;top:-3px;right:-3px}.notif-scrim{z-index:30;position:fixed;inset:0}.sheet-scrim{z-index:60;background:#0000008c;animation:.18s fade-in;position:fixed;inset:0}.sheet{z-index:61;overscroll-behavior:contain;max-height:86dvh;padding:var(--s2) var(--s4) calc(var(--s4) + env(safe-area-inset-bottom));background:var(--surface);border-top:1px solid var(--line2);border-radius:var(--radius-lg) var(--radius-lg) 0 0;animation:.2s toast-in;position:fixed;bottom:0;left:0;right:0;overflow:auto;box-shadow:0 -24px 60px -20px #000}.sheet-grab{background:var(--line2);width:40px;height:4px;margin:4px auto var(--s3);border-radius:2px}.sheet-sec{padding:var(--s3) 0}.sheet-sec+.sheet-sec{border-top:1px solid var(--line)}.sheet-row{justify-content:space-between;align-items:center;gap:var(--s3);display:flex}.sheet-row b{font-size:15px;display:block}.sheet-row span{color:var(--fg-faint);font-size:12.5px}.sheet-title{letter-spacing:.08em;text-transform:uppercase;color:var(--fg-faint);margin-bottom:var(--s2);font-size:12px;display:block}.sheet-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;display:grid}.sheet-grid :is(a,button){min-height:64px;color:var(--fg-soft);text-align:center;background:0 0;border:0;border-radius:12px;flex-direction:column;justify-content:center;align-items:center;gap:6px;padding:8px 2px;font-family:inherit;font-size:12px;display:flex}.sheet-grid :is(a,button):active,.sheet-grid :is(a,button):hover{background:var(--elev);color:var(--fg)}.sheet-grid button.on{color:var(--accent)}.sheet-grid :is(a,button) svg{width:20px;height:20px}.sheet-reset{width:100%;margin-top:var(--s2)}.snd{display:flex;position:relative}.snd-panel{width:min(300px,calc(100vw - 2 * var(--s4)));z-index:31;gap:var(--s3);padding:var(--s4);background:var(--surface);border:1px solid var(--line2);border-radius:var(--radius-lg);flex-direction:column;display:flex;position:absolute;top:46px;right:0;box-shadow:0 24px 60px -24px #000}.snd-head{justify-content:space-between;align-items:center;display:flex}.snd-head b{font:700 14px var(--display)}.snd-switch{border:1px solid var(--line2);background:var(--elev2);cursor:pointer;border-radius:999px;width:40px;height:24px;transition:background .15s,border-color .15s;position:relative}.snd-switch span{background:var(--fg-soft);border-radius:50%;width:16px;height:16px;transition:transform .18s cubic-bezier(.3,.7,.3,1),background .15s;position:absolute;top:3px;left:3px}.snd-switch[aria-checked=true]{background:color-mix(in oklab,var(--accent) 30%,var(--elev2));border-color:var(--accent)}.snd-switch[aria-checked=true] span{background:var(--accent);transform:translate(16px)}.snd-vol{color:var(--fg-soft);grid-template-columns:auto 1fr auto auto;align-items:center;gap:10px;transition:opacity .15s;display:grid}.snd-vol.off{opacity:.5}.snd-vol svg{width:16px;height:16px}.snd-vol input{cursor:pointer;appearance:none;background:0 0;width:100%;height:20px;margin:0}.snd-vol input::-webkit-slider-runnable-track{background:linear-gradient(var(--accent),var(--accent)) 0/var(--pct) 100% no-repeat,var(--line2);border-radius:2px;height:4px}.snd-vol input::-moz-range-track{background:var(--line2);border-radius:2px;height:4px}.snd-vol input::-moz-range-progress{background:var(--accent);border-radius:2px;height:4px}.snd-vol input::-webkit-slider-thumb{-webkit-appearance:none;background:var(--fg);border:none;border-radius:50%;width:14px;height:14px;margin-top:-5px;transition:transform .12s;box-shadow:0 1px 4px #0008}.snd-vol input::-moz-range-thumb{background:var(--fg);border:none;border-radius:50%;width:14px;height:14px;transition:transform .12s;box-shadow:0 1px 4px #0008}.snd-vol input:hover::-webkit-slider-thumb{transform:scale(1.15)}.snd-vol input:active::-webkit-slider-thumb{transform:scale(1.15)}.snd-vol input:hover::-moz-range-thumb{transform:scale(1.15)}.snd-vol input:active::-moz-range-thumb{transform:scale(1.15)}.snd-vol output{text-align:right;font-variant-numeric:tabular-nums;min-width:4ch;color:var(--fg);font-size:13px}.chime{flex-direction:column;gap:6px;transition:opacity .15s;display:flex}.chime.off{opacity:.5}.chime-head{color:var(--fg-soft);justify-content:space-between;align-items:baseline;gap:8px;font-size:13px;display:flex}.chime-head b{color:var(--fg);font-size:13px;font-weight:600}.chime-track{--at:0;--pad:9px;height:26px;position:relative}.chime-track:before,.chime-lit{content:\"\";top:50%;left:var(--pad);right:var(--pad);border-radius:2px;height:4px;margin-top:-2px;position:absolute}.chime-track:before{background:var(--line2)}.chime-lit{background:linear-gradient(90deg,var(--r-c),var(--r-pc),var(--r-r),var(--r-sr),var(--r-ur),var(--r-l));clip-path:inset(0 0 0 calc(var(--at) / 5 * 100%));transition:clip-path .18s}.chime-stop{top:50%;left:calc(var(--pad) + var(--i) / 5 * (100% - 2 * var(--pad)));background:var(--elev2);width:10px;height:10px;box-shadow:0 0 0 2px var(--surface);border-radius:50%;margin:-5px 0 0 -5px;transition:background .15s,transform .15s;position:absolute}.chime-stop.lit{background:var(--rc)}.chime-track input{cursor:pointer;appearance:none;background:0 0;width:100%;height:100%;margin:0;position:absolute;inset:0}.chime-track input::-webkit-slider-runnable-track{background:0 0;height:100%}.chime-track input::-moz-range-track{background:0 0}.chime-track input::-webkit-slider-thumb{-webkit-appearance:none;background:var(--fg);border-radius:50%;width:18px;height:18px;margin-top:4px;transition:transform .12s;box-shadow:0 1px 5px #000a}.chime-track input::-moz-range-thumb{background:var(--fg);border:none;border-radius:50%;width:18px;height:18px;transition:transform .12s;box-shadow:0 1px 5px #000a}.chime-track input:hover::-webkit-slider-thumb{transform:scale(1.12)}.chime-track input:active::-webkit-slider-thumb{transform:scale(1.12)}.chime-track input:focus-visible{outline:none}.chime-track:has(input:focus-visible){outline:2px solid var(--accent);outline-offset:3px;border-radius:999px}.chime-codes{font:600 10.5px var(--body);color:var(--fg-faint);justify-content:space-between;padding:0 2px;display:flex}.chime-codes span{text-align:center;width:18px}.chime-codes span.lit{color:var(--rc)}.snd-note{color:var(--fg-faint);font-size:12px;line-height:1.4}.notif-panel{background:var(--surface);border:1px solid var(--line2);border-radius:var(--radius-lg);z-index:31;width:min(340px,86vw);max-height:66vh;padding:var(--s2);overscroll-behavior:contain;position:absolute;top:46px;right:0;overflow:auto;box-shadow:0 24px 60px -24px #000}.notif-head{font-family:var(--display);align-items:center;gap:8px;padding:8px 10px 10px;font-size:14px;font-weight:700;display:flex}.notif-count{background:color-mix(in oklab,var(--accent) 16%,transparent);color:var(--accent);border-radius:999px;padding:2px 8px;font-size:11px;font-weight:700}.notif-empty{text-align:center;color:var(--fg-faint);padding:24px;font-size:13px}.notif-item{border-radius:12px;gap:10px;padding:11px 10px;transition:background .15s;display:flex}.notif-item:hover{background:var(--elev)}.notif-item.unread{background:color-mix(in oklab,var(--accent) 7%,transparent)}.notif-dot{background:var(--accent);border-radius:50%;flex:none;width:7px;height:7px;margin-top:6px}.notif-item:not(.unread) .notif-body{margin-left:17px}.notif-body{min-width:0}.notif-title{font-size:13.5px;font-weight:600;line-height:1.3}.notif-msg{color:var(--fg-soft);margin-top:2px;font-size:12.5px;line-height:1.4}.notif-time{color:var(--fg-faint);margin-top:4px;font-size:11px}.view{padding:clamp(var(--s5),3.5vw,var(--s7));padding-bottom:max(clamp(var(--s5),3.5vw,var(--s7)),72px);width:100%;max-width:1600px;margin:0 auto}.view:has(>.pulls>.reveal-all){max-width:none}.side-toggle{width:30px;height:30px;color:var(--fg-faint);cursor:pointer;background:0 0;border:0;border-radius:8px;place-items:center;margin-left:auto;transition:color .15s,background .15s;display:grid}.side-toggle:hover{color:var(--fg);background:var(--elev)}.side-toggle svg{width:18px;height:18px}@media (width>=901px){.app{transition:grid-template-columns .22s}.app.rail{--sidebar:72px}.app.rail .side{padding-inline:var(--s2)}.app.rail .brand{justify-content:center;padding:0}.app.rail .brand .mk,.app.rail .brand b,.app.rail .side .nav-long,.app.rail .nav-lbl,.app.rail .foot-txt,.app.rail .hintline,.app.rail .side-foot .ghost{display:none}.app.rail .side-toggle{margin:0}.app.rail .nav>button{justify-content:center;padding-inline:0}.app.rail .nav-sep{margin:var(--s3) 10px;border-top:1px solid var(--line);padding:0;font-size:0}.app.rail .nav-grid{grid-template-columns:1fr}.app.rail .side-foot{align-items:center;padding-inline:0}}@media (prefers-reduced-motion:reduce){.app{transition:none}}.app-version{color:var(--fg-faint);font-variant-numeric:tabular-nums;margin-left:auto;font-size:11px;text-decoration:none}.app-version:hover{color:var(--fg-soft);text-decoration:underline}.sheet-version{margin:var(--s3) auto 0;text-align:center;width:max-content;display:block}@media (width>=901px){.app.rail .app-version{display:none}}.app-update{color:var(--accent);background:color-mix(in oklab,var(--accent) 12%,transparent);border:1px solid color-mix(in oklab,var(--accent) 35%,transparent);white-space:nowrap;border-radius:999px;align-items:center;gap:6px;margin-left:auto;padding:3px 9px 3px 7px;font-size:11px;font-weight:600;text-decoration:none;display:inline-flex}.app-update:hover{background:color-mix(in oklab,var(--accent) 20%,transparent)}.upd-dot{background:var(--accent);width:7px;height:7px;box-shadow:0 0 0 0 color-mix(in oklab,var(--accent) 60%,transparent);border-radius:50%;flex:none;animation:2.4s ease-out infinite upd-pulse}@keyframes upd-pulse{70%{box-shadow:0 0 0 6px #0000}to{box-shadow:0 0 #0000}}@media (prefers-reduced-motion:reduce){.upd-dot{animation:none}}.upd-dot.on-icon{border:2px solid var(--surface);position:absolute;top:7px;right:7px}.menu-btn{position:relative}.sheet-update{justify-content:center;align-items:center;gap:8px;text-decoration:none;display:flex}.sheet-update .upd-dot{background:currentColor}@media (width>=901px){.app.rail .app-update{background:0 0;border:none;gap:0;padding:0;font-size:0}}.pulls{position:relative}.pull-ready{justify-content:center;align-items:center;gap:var(--s5);text-align:center;flex-direction:column;min-height:64vh;display:flex}.pull-ready h1{font-family:var(--display);letter-spacing:-.02em;font-size:clamp(26px,3vw,36px);font-weight:700}.special-note{background:color-mix(in oklab,var(--r-l) 12%,var(--elev));border:1px solid color-mix(in oklab,var(--r-l) 32%,var(--line));color:var(--fg);border-radius:12px;flex-wrap:wrap;justify-content:center;align-items:center;gap:10px;padding:10px 16px;font-size:13px;display:flex}.link-btn{color:var(--accent);font:inherit;cursor:pointer;text-underline-offset:3px;background:0 0;border:none;font-weight:600;text-decoration:underline}.pull-ready .sub{color:var(--fg-soft);margin-top:calc(-1 * var(--s3));font-size:15px}.booster-stage{width:100%;padding:var(--s3) 0;justify-content:center;align-items:center;display:flex;position:relative;overflow-x:clip}.booster{width:clamp(200px,min(calc((100dvh - 540px - var(--tabs-h,0px)) * .773),62vw),480px);aspect-ratio:2550/3300;cursor:pointer;filter:drop-shadow(0 34px 54px #0009);background:0 0;border:none;padding:0;transition:transform .3s cubic-bezier(.2,.7,.3,1);position:relative}.booster:hover:not(:disabled):not(.opening){transform:translateY(-8px)}.booster:disabled{cursor:default}.booster-main{transform-origin:50% 60%;animation:5.5s ease-in-out infinite booster-float;position:absolute;inset:0}.booster-img{background:var(--pack) center/contain no-repeat;position:absolute;inset:0}.booster-shine{pointer-events:none;mix-blend-mode:screen;opacity:0;-webkit-mask:var(--pack) center/contain no-repeat;-webkit-mask:var(--pack) center/contain no-repeat;mask:var(--pack) center/contain no-repeat;background:linear-gradient(115deg,#0000 40%,#ffffffd9 47%,#96d2ffb3 50%,#ffecb4b3 53%,#0000 60%) 0 0/260% 260% no-repeat;animation:5s ease-in-out infinite booster-sheen;position:absolute;inset:0}@keyframes booster-sheen{0%{opacity:0;background-position:130% 0}30%{opacity:.95}52%{opacity:.95;background-position:-30% 100%}72%,to{opacity:0;background-position:-30% 100%}}@keyframes booster-float{0%,to{transform:translateY(0)rotate(-1.2deg)}50%{transform:translateY(-12px)rotate(1.2deg)}}.booster-back{background:var(--pack) center/contain no-repeat;filter:brightness(.62)grayscale(.25);position:absolute;inset:0}.booster-back.b1{opacity:.7;transform:translate(11px,9px)rotate(4deg)scale(.985)}.booster-back.b2{opacity:.4;transform:translate(22px,18px)rotate(8deg)scale(.97)}.booster.is-empty .booster-main{filter:grayscale(.7)brightness(.55);opacity:.8;animation-play-state:paused}.booster.is-empty .booster-shine{display:none}.booster.opening{cursor:default}.booster.opening .booster-main{animation:.9s cubic-bezier(.3,.6,.2,1) forwards booster-open}@keyframes booster-open{0%{transform:translateY(0)rotate(0)}14%{transform:rotate(-5deg)}28%{transform:rotate(5deg)}42%{transform:rotate(-4deg)}56%{transform:rotate(3deg)scale(1.03)}68%{transform:rotate(0)scale(1.06)}to{opacity:0;filter:brightness(2.2);transform:scale(1.5)}}.booster.opening:after{content:\"\";pointer-events:none;opacity:0;background:radial-gradient(circle,#fff6e0f2,#fff6e040 45%,#0000 66%);border-radius:50%;animation:.9s ease-out forwards booster-burst;position:absolute;inset:-25%}@keyframes booster-burst{0%,52%{opacity:0;transform:scale(.5)}74%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(1.5)}}.pack-count{flex-direction:column;align-items:center;gap:2px;display:flex}.pc-num{font-family:var(--display);color:var(--accent);font-variant-numeric:tabular-nums;font-size:clamp(36px,5vw,54px);font-weight:800;line-height:1}.pack-wait{flex-direction:column;align-items:center;gap:4px;display:flex}.pw-time{font-family:var(--display);color:var(--fg);font-variant-numeric:tabular-nums;font-size:clamp(34px,4.4vw,50px);font-weight:800;line-height:1}.pw-lbl{color:var(--fg-soft);font-size:15px}.pw-sub{color:var(--fg-faint);margin-top:var(--s2);font-size:12.5px}.pc-lbl{color:var(--fg-soft);font-size:14px}.regen-line{color:var(--fg-soft);font-size:13.5px}.regen-line b{color:var(--fg);font-weight:600}.regen-line.err{color:#f0a3a3}.btn.big{padding:14px 34px;font-size:16px}.btn{font-family:var(--display);white-space:nowrap;border:1px solid var(--line2);color:var(--fg);background:0 0;border-radius:12px;padding:13px 28px;font-size:15px;font-weight:600;transition:all .15s}.btn:hover{border-color:var(--fg-soft)}.btn.primary{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}.btn.primary:hover{filter:brightness(1.06)}.btn:disabled,.iconbtn:disabled,.modal-close:disabled{opacity:.45;cursor:not-allowed}.btn svg{vertical-align:-3px;flex:none;width:17px;height:17px}.pull-actions{gap:var(--s3);flex-wrap:wrap;justify-content:center;display:flex}.pull-ready.has-tabs{--tabs-h:56px}.pull-tabs{justify-content:center;width:min(100%,520px);margin-bottom:0}.tab-ready{background:var(--accent);vertical-align:2px;border-radius:50%;width:7px;height:7px;margin-left:7px;display:inline-block}.pull-ready[data-kind=pro]{--kind:var(--r-r)}.pull-ready[data-kind=special]{--kind:var(--r-l)}.pull-ready[data-kind=pro] .tab-ready,.pull-ready[data-kind=pro] .tabs button.on,.pull-ready[data-kind=special] .tabs button.on{border-bottom-color:var(--kind)}.pull-ready:not([data-kind=normal]) .booster-img{filter:drop-shadow(0 0 28px color-mix(in oklab,var(--kind) 55%,transparent)) drop-shadow(0 0 70px color-mix(in oklab,var(--kind) 30%,transparent))}.pull-ready:not([data-kind=normal]) .btn.primary{background:var(--kind);border-color:var(--kind);color:#15121c}.pull-ready:not([data-kind=normal]) .pw-time{color:var(--kind)}.booster-mark{font:800 13px/1 var(--display);letter-spacing:.12em;color:#15121c;background:var(--kind);box-shadow:0 4px 18px color-mix(in oklab,var(--kind) 50%,transparent);border-radius:999px;padding:5px 14px;position:absolute;bottom:9%;left:50%;transform:translate(-50%)}.pill-picks{flex-wrap:wrap;justify-content:center;gap:8px;display:flex}.pill-picks button{font:600 13.5px var(--body);color:var(--fg-soft);background:var(--elev);border:1px solid var(--line);cursor:pointer;border-radius:999px;padding:7px 16px;transition:color .15s,border-color .15s}.pill-picks button:hover{color:var(--fg);border-color:var(--line2)}.pill-picks button.on{color:var(--fg);border-color:var(--kind,var(--accent));background:color-mix(in oklab,var(--kind,var(--accent)) 12%,var(--elev))}.market-recent ol{border:1px solid var(--line);border-radius:var(--radius);margin:0;padding:0;list-style:none;overflow:hidden}.market-recent li{justify-content:space-between;align-items:center;gap:var(--s3);color:var(--fg-soft);font-variant-numeric:tabular-nums;padding:8px 14px;font-size:13px;display:flex}.market-recent li+li{border-top:1px solid var(--line)}.market-recent b{color:var(--r-l);align-items:center;gap:6px;display:inline-flex}.session-recap{color:var(--fg-faint);margin-top:var(--s2);font-size:12.5px}.reveal{justify-content:center;align-items:center;gap:var(--s6);flex-direction:column;min-height:64vh;display:flex}.reveal .count{color:var(--fg-soft);font-size:14px}.reveal .count b{color:var(--accent);font-family:var(--display);margin:0 3px;font-size:18px}.stage{width:clamp(250px,min(71.4dvh - 342.72px,40vw),520px);max-width:100%;position:relative}.stage-aura{z-index:0;pointer-events:none;background:radial-gradient(closest-side, color-mix(in oklab,var(--rc) 60%, transparent), transparent 72%);filter:blur(34px);opacity:.35;border-radius:50%;animation:.55s cubic-bezier(.3,.8,.3,1) aurapop;position:absolute;inset:-14% -10%}.stage-aura[data-r=C]{opacity:.26}.stage-aura[data-r=PC]{opacity:.34}.stage-aura[data-r=R]{opacity:.46}.stage-aura[data-r=SR]{opacity:.58}.stage-aura[data-r=UR]{opacity:.72;inset:-18% -12%}.stage-aura[data-r=L]{opacity:.85;inset:-20% -14%}@keyframes aurapop{0%{transform:scale(.7)}to{transform:scale(1)}}.stage .flip-in{z-index:1;position:relative}.reveal-rarity{font-family:var(--display);letter-spacing:.06em;color:var(--rc);font-size:16px;font-weight:700;animation:.45s rarityin}.reveal-rarity[data-r=UR],.reveal-rarity[data-r=L]{letter-spacing:.1em;font-size:19px}@keyframes rarityin{0%{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}.dots{gap:var(--s2);align-items:center;display:flex}.dots .d{background:var(--line2);border-radius:50%;width:8px;height:8px;transition:all .2s}.dots .d.on{background:var(--accent);transform:scale(1.15)}.dots .d.seen{background:var(--fg-faint)}.navrow{align-items:center;gap:var(--s5);display:flex}.arrow{border:1px solid var(--line2);background:var(--elev);width:46px;height:46px;color:var(--fg);border-radius:50%;justify-content:center;align-items:center;transition:all .15s;display:flex}.arrow svg{width:20px;height:20px}.arrow:hover{border-color:var(--fg-soft)}.arrow:disabled{opacity:.3;cursor:not-allowed}.flip-in{animation:.5s cubic-bezier(.3,.8,.3,1) flipin}@keyframes flipin{0%{opacity:0;transform:rotateY(-14deg)translateY(14px)}to{opacity:1;transform:none}}.reveal-skip{color:var(--fg-faint);cursor:pointer;text-underline-offset:3px;background:0 0;border:none;padding:4px;font-size:13px;text-decoration:underline}.reveal-skip:hover{color:var(--fg-soft)}.reveal-all{gap:var(--s5)}.reveal-all-head{text-align:center;flex-direction:column;gap:4px;display:flex}.reveal-all-head h2{font-family:var(--display);letter-spacing:-.02em;font-size:clamp(22px,2.4vw,28px);font-weight:700}.reveal-all-head .sub{color:var(--fg-soft);font-size:14px}.reveal-grid{--rg-w:clamp(170px,min(calc((100% - (var(--cols) - 1) * var(--s5)) / var(--cols)),calc((100dvh - 380px - (var(--rows) - 1) * var(--s5)) / var(--rows) * .714)),440px);grid-template-columns:repeat(auto-fit,var(--rg-w));gap:var(--s5);width:100%;max-width:calc(var(--cols) * var(--rg-w) + (var(--cols) - 1) * var(--s5));justify-content:center;margin-inline:auto;display:grid}@media (width<=560px){.reveal-grid{--rg-w:calc((100% - var(--s3)) / 2);gap:var(--s3)}}.rg-card{perspective:900px;position:relative}.rg-card.dealt .card-btn{animation:rgflip .5s var(--d) both cubic-bezier(.2,.8,.3,1)}.rg-card.dealt .rg-aura{animation:rgbloom .9s var(--d) both ease-out}.rg-aura{z-index:0;pointer-events:none;background:radial-gradient(closest-side,color-mix(in oklab,var(--rc) 55%,transparent),transparent 72%);filter:blur(26px);opacity:.3;border-radius:50%;position:absolute;inset:-10% -8%}.rg-aura[data-r=C]{opacity:.16}.rg-aura[data-r=PC]{opacity:.22}.rg-aura[data-r=R]{opacity:.34}.rg-aura[data-r=SR]{opacity:.46}.rg-aura[data-r=UR]{opacity:.6}.rg-aura[data-r=L]{opacity:.72}.rg-card .card-btn{z-index:1;position:relative}@keyframes rgflip{0%{opacity:0;transform:translateY(18px)rotateY(-70deg)scale(.92)}60%{opacity:1}to{opacity:1;transform:none}}@keyframes rgbloom{0%{opacity:0;scale:.6}45%{opacity:var(--bloom,.9);scale:1.08}}@media (prefers-reduced-motion:reduce){.rg-card.dealt .card-btn,.rg-card.dealt .rg-aura{animation:none}}.wc{aspect-ratio:5/7;border-radius:var(--radius-lg);background:var(--card-bg);border:3.5px solid color-mix(in oklab,var(--rc) 65%,var(--line));cursor:pointer;transition:transform .2s cubic-bezier(.2,.7,.3,1),border-color .2s,box-shadow .2s;position:relative;overflow:hidden;container-type:inline-size}.wc[data-r=C]{box-shadow:0 6px 18px -12px color-mix(in oklab,var(--r-c) 45%,transparent)}.wc[data-r=PC]{box-shadow:0 6px 20px -12px color-mix(in oklab,var(--r-pc) 55%,transparent)}.wc[data-r=R]{box-shadow:0 8px 24px -12px color-mix(in oklab,var(--r-r) 62%,transparent)}.wc[data-r=SR]{box-shadow:0 8px 26px -11px color-mix(in oklab,var(--r-sr) 70%,transparent)}.wc[data-r=UR]{box-shadow:0 10px 30px -11px color-mix(in oklab,var(--r-ur) 78%,transparent)}.wc[data-r=L]{box-shadow:0 12px 36px -10px color-mix(in oklab,var(--r-l) 85%,transparent)}.wc[data-r=SR],.wc[data-r=UR],.wc[data-r=L]{border-color:color-mix(in oklab,var(--rc) 88%,var(--line))}.wc:hover{border-color:var(--rc);box-shadow:0 18px 42px -20px color-mix(in oklab,var(--rc) 42%,#000);transform:translateY(-5px)}.wc-face{background:linear-gradient(#181c16,#0d0f0c);position:absolute;inset:0}.wc:before{content:\"\";z-index:5;pointer-events:none;border-radius:inherit;position:absolute;inset:0;box-shadow:inset 0 1px #ffffff29,inset 0 0 0 1px #ffffff08,inset 0 -44px 52px -44px #0000008c}.wc:not(.is-noimg) .wc-face:after{content:\"\";pointer-events:none;background:linear-gradient(180deg, color-mix(in oklab,var(--rc) 26%, transparent), transparent 28%);position:absolute;inset:0}.wc-blur{object-fit:cover;filter:blur(22px)saturate(1.1)brightness(.5);z-index:0;width:100%;height:100%;position:absolute;inset:0;transform:scale(1.2)}.wc.is-noimg .wc-blur{display:none}.wc-photo{object-fit:contain;z-index:1;width:100%;height:100%;position:absolute;inset:0}.wc-bg{object-fit:cover;z-index:0;width:100%;height:100%;position:absolute;inset:0;transform:scale(1.8)}.wc-bg.onyx{transform:none}.wc[data-r=C] .wc-bg,.wc[data-r=PC] .wc-bg{filter:brightness(.6)saturate(1.2)}.wc-sky{z-index:1;width:100%;height:100%;position:absolute;inset:0}.wc-sky .ray{fill:var(--rc)}.wc-sky .core{fill:#fff;fill-opacity:.92}.wc-sky .glow-mid{stop-color:var(--rc);stop-opacity:.4}.wc-sky .glow-out{stop-color:var(--rc);stop-opacity:0}.wc-sky .spark{fill:#fff;fill-opacity:.85}.wc.is-shiny .wc-sky .core{fill-opacity:1}.wc-meteor{z-index:1;height:var(--w);border-radius:var(--w);transform-origin:0;transform:rotate(var(--a));will-change:transform;background:linear-gradient(90deg,#0000,#ffffff80 60%,#fff);animation:2.6s cubic-bezier(.35,.1,.45,1) infinite meteor;position:absolute;box-shadow:0 0 3px #ffffff59}@keyframes meteor{0%{transform:rotate(var(--a)) translateX(-140%);opacity:0}15%,70%{opacity:1}to{transform:rotate(var(--a)) translateX(90%);opacity:0}}@media (prefers-reduced-motion:reduce){.wc-meteor{animation:none}}.wc.is-noimg .wc-holo{display:none}.wc.is-noimg .wc-cap{background:linear-gradient(#0000,#050605b3 38%,#050605f0)}.wc-photo.onyx-photo{object-fit:cover;z-index:1}.wc.paper .wc-blur{display:none}.wc.paper .wc-photo{background:#e4e2db;padding:12% 10% 34%}.wc.is-noimg .wc-face{background:radial-gradient(110% 80% at 50% 30%,color-mix(in oklab,var(--rc) 14%,#05070d),#020306 80%)}.wc.is-shiny{box-shadow:inset 0 0 0 1px #e9c15a8c,0 0 16px #e9c15a4d,0 0 30px #00000080}.wc.is-shiny:hover{box-shadow:inset 0 0 0 1px #e9c15acc,0 0 22px #e9c15a80,0 18px 42px -20px #000}.wc-holo{z-index:2;pointer-events:none;mix-blend-mode:screen;opacity:.7;background:radial-gradient(circle at 50% 45%,#fff8e0 0%,#fff8e033 20%,#0000 46%) 0 0/175% 175% no-repeat;animation:6.5s ease-in-out infinite alternate paused shiny-drift;position:absolute;inset:0}.wc-holo.onyx{mix-blend-mode:soft-light;opacity:.9}@keyframes shiny-drift{0%{background-position:16% 12%}to{background-position:84% 82%}}@media (prefers-reduced-motion:reduce){.wc-holo{opacity:.5;background-position:50% 42%;animation:none}}.ox{z-index:1;pointer-events:none;position:absolute;inset:0}.ox-shade{mix-blend-mode:multiply;background:#2e2b36}.ox-tint{mix-blend-mode:color;background:#3b3b42}.ox-wash{background:radial-gradient(120% 80% at 50% 30%,#0000 40%,#05040866 78%,#050408cc 100%),linear-gradient(#0b0a12ec 0%,#0d0c15dd 55%,#0b0a1255 78%,#0b0a12bb 100%)}.ox-lines{opacity:.62;mix-blend-mode:screen;background:linear-gradient(160deg,#fff0b3 0%,#e9c15a 35%,#fff6d0 55%,#d7a93c 80%,#ffe9a6 100%);-webkit-mask:url(https://www.wiki-masters.com/shiny/onyx-lines.png) 50%/cover no-repeat;mask:url(https://www.wiki-masters.com/shiny/onyx-lines.png) 50%/cover no-repeat}.ox-shine{mix-blend-mode:screen;opacity:.95;background:radial-gradient(circle at 50% 45%,#fffbe8 0%,#f6d98aa6 16%,#e9c15a26 34%,#0000 52%) 0 0/210% 210% no-repeat;animation:5.5s ease-in-out infinite alternate paused onyx-shimmer;-webkit-mask:url(https://www.wiki-masters.com/shiny/onyx-lines.png) 50%/cover no-repeat;mask:url(https://www.wiki-masters.com/shiny/onyx-lines.png) 50%/cover no-repeat}@keyframes onyx-shimmer{0%{background-position:12% 8%}to{background-position:88% 86%}}@media (prefers-reduced-motion:reduce){.ox-shine{opacity:.7;background-position:42% 30%;animation:none}}.card-btn:hover :is(.wc-holo,.ox-shine),.card-btn:focus-visible :is(.wc-holo,.ox-shine),.wc-big :is(.wc-holo,.ox-shine){animation-play-state:running}.wc-scrim{pointer-events:none;background:linear-gradient(#0000 20%,#05060533 32%,#050605b3 50%,#050605fb 68%,#050605 100%);position:absolute;inset:0}.wc.bare .wc-cap,.wc.bare .wc-scrim{display:none}.wc-top{z-index:3;justify-content:space-between;align-items:flex-start;gap:6px;display:flex;position:absolute;top:11px;left:11px;right:11px}.wc-rtag{font-family:var(--display);color:var(--accent-ink);background:var(--rc);border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700;box-shadow:0 1px 5px #0006}.wc-flags{align-items:center;gap:5px;display:flex}.wc-count{color:#fff;background:#000000b8;border:1px solid #ffffff2e;border-radius:6px;padding:2px 7px;font-size:10.5px;font-weight:600}.wc-new{background:var(--accent);color:var(--accent-ink);border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700}.wc-shiny{color:#f3d27a;background:#111014;border-radius:6px;justify-content:center;align-items:center;width:22px;height:20px;font-size:12px;font-weight:700;display:inline-flex;box-shadow:inset 0 0 0 1px #d7a93c,0 0 10px #e9c15a73}.wc-star{border:1px solid color-mix(in oklab,var(--r-l) 55%,#ffffff4d);color:var(--r-l);background:#000000b8;border-radius:6px;justify-content:center;align-items:center;width:22px;height:20px;font-size:12px;font-weight:700;display:inline-flex}.wc-cap{z-index:3;gap:var(--s1);background:linear-gradient(#0000,#0506058c 28%,#050605eb);flex-direction:column;padding:14px 14px 16px;display:flex;position:absolute;bottom:0;left:0;right:0}.wc.bare .wc-cap{background:0 0}.wc-name{font-family:var(--display);color:#fff;text-shadow:0 1px 10px #000000a6;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:15px;font-weight:700;line-height:1.18;display:-webkit-box;overflow:hidden}.wc-cat{color:#ffffffd1;white-space:nowrap;text-overflow:ellipsis;text-shadow:0 1px 6px #000000b3;font-size:10.5px;line-height:1.3;overflow:hidden}.wc-meta{border-top:1px solid #ffffff38;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:4px 8px;margin-top:9px;padding-top:9px;display:flex}.wc-stats{white-space:nowrap;color:#ffffffd9;letter-spacing:.02em;text-shadow:0 1px 6px #000000b3;gap:.9em;font-size:11px;display:flex}.wc-stats b{color:#fff;font-variant-numeric:tabular-nums;font-weight:700}.wc-val{color:var(--r-l);font-variant-numeric:tabular-nums;text-shadow:0 1px 6px #000000b3;white-space:nowrap;align-items:center;gap:4px;font-size:11px;font-weight:700;display:inline-flex}.wc-val:before{content:\"\";background:var(--coin);width:9px;height:9px;box-shadow:0 0 6px color-mix(in oklab,var(--r-l) 55%,transparent);border-radius:50%}.wc-name{font-size:clamp(15px,7cqw,30px)}.wc-cat{font-size:clamp(10.5px,4.6cqw,16px)}.wc-stats,.wc-val{font-size:clamp(11px,4.8cqw,17px)}.wc-cap{padding:clamp(14px,6.5cqw,24px) clamp(14px,6.5cqw,24px) clamp(16px,7.5cqw,28px)}.wc-top{top:clamp(11px,5cqw,18px);left:clamp(11px,5cqw,18px);right:clamp(11px,5cqw,18px)}.wc-rtag,.wc-new{padding:.3em .8em;font-size:clamp(10px,4.2cqw,14px)}.wc-big .wc-cat{white-space:normal}.coll-head{justify-content:space-between;align-items:flex-start;gap:var(--s4);margin-bottom:var(--s5);flex-wrap:wrap;display:flex}.coll-head h1{font-family:var(--display);letter-spacing:-.02em;font-size:clamp(24px,2.6vw,32px);font-weight:700}.coll-head .meta{color:var(--fg-soft);margin-top:6px;font-size:14px}.avatar{width:var(--s);height:var(--s);background:hsl(var(--h) 35% 26%);color:hsl(var(--h) 70% 85%);font:700 calc(var(--s) * .42)/1 var(--display);border-radius:50%;flex:none;justify-content:center;align-items:center;display:inline-flex;overflow:hidden}.avatar img{object-fit:cover;width:100%;height:100%}.coll-tools{gap:var(--s3);flex-wrap:wrap;flex:460px;justify-content:flex-end;align-items:center;display:flex}.search-wrap{flex:300px;align-items:center;min-width:220px;display:flex;position:relative}.search-ico{width:17px;height:17px;color:var(--fg-faint);pointer-events:none;position:absolute;left:14px}.search{background:var(--elev);border:1px solid var(--line);width:100%;color:var(--fg);font-family:var(--body);border-radius:11px;padding:11px 38px 11px 40px;font-size:14px}.search::placeholder,.af-input::placeholder{color:var(--fg-faint)}.search:focus{border-color:var(--fg-soft);background:var(--elev2)}.search::-webkit-search-cancel-button{display:none}.search-clear{width:24px;height:24px;color:var(--fg-faint);background:0 0;border:none;border-radius:7px;justify-content:center;align-items:center;font-size:18px;line-height:1;display:flex;position:absolute;right:8px}.search-clear:hover{background:var(--elev2);color:var(--fg)}.tool-actions{gap:var(--s2);flex-wrap:wrap;align-items:center;display:flex}.isel{background:var(--elev);border:1px solid var(--line);border-radius:11px;align-items:center;gap:8px;height:42px;padding:0 12px;transition:all .15s;display:inline-flex;position:relative}.isel:hover,.isel:focus-within{border-color:var(--line2)}.isel svg{width:16px;height:16px;color:var(--fg-soft);flex:none}.isel select{appearance:none;color:var(--fg);font-family:var(--body);cursor:pointer;background:0 0;border:none;outline:none;height:100%;padding:0 18px 0 0;font-size:14px;font-weight:500}#wm-app-root option{background:var(--elev);color:var(--fg)}@supports (appearance:base-select){#wm-app-root select{appearance:base-select}#wm-app-root ::picker(select){appearance:base-select}#wm-app-root select{align-items:center;display:inline-flex}#wm-app-root select::picker-icon{display:none}#wm-app-root ::picker(select){background:var(--elev);border:1px solid var(--line2);min-width:anchor-size(width);opacity:0;transition:opacity .15s ease,translate .15s ease,overlay .15s allow-discrete,display .15s allow-discrete;border-radius:12px;margin-block:6px;padding:4px;translate:0 -4px;box-shadow:0 18px 40px -16px #000}#wm-app-root select:open::picker(select){opacity:1;translate:0}@starting-style{#wm-app-root select:open::picker(select){opacity:0;translate:0 -4px}}#wm-app-root option{color:var(--fg-soft);font:500 14px/1.2 var(--body);cursor:pointer;background:0 0;border-radius:8px;padding:9px 12px;transition:background .12s,color .12s}#wm-app-root option::checkmark{display:none}#wm-app-root option:hover,#wm-app-root option:focus-visible{background:var(--elev2);color:var(--fg);outline:none}#wm-app-root option:checked{color:var(--accent);background:color-mix(in oklab,var(--accent) 10%,transparent)}}.isel:after{content:\"\";border-right:2px solid var(--fg-soft);border-bottom:2px solid var(--fg-soft);pointer-events:none;width:8px;height:8px;position:absolute;right:12px;transform:rotate(45deg)translateY(-2px)}.iconbtn{background:var(--elev);border:1px solid var(--line);color:var(--fg-soft);height:42px;font-family:var(--body);white-space:nowrap;border-radius:11px;align-items:center;gap:8px;padding:0 14px;font-size:14px;font-weight:500;transition:all .15s;display:inline-flex}.iconbtn svg{flex:none;width:17px;height:17px}.iconbtn:hover{color:var(--fg);border-color:var(--line2)}.iconbtn.on{color:var(--fg);border-color:var(--fg-soft);background:var(--elev2)}.sort-hint{margin:-8px 0 var(--s4);color:var(--fg-soft);font-size:12.5px}.rarity-panel{gap:var(--s3);margin-bottom:var(--s6);flex-direction:column;display:flex}.rarity-meter{gap:5px;height:9px;display:flex}.rm-seg{background:var(--rc);cursor:pointer;border:none;border-radius:999px;min-width:14px;height:100%;padding:0;transition:flex-grow .45s cubic-bezier(.2,.7,.3,1),opacity .2s,filter .2s,transform .15s}.rm-seg:hover{filter:brightness(1.18)}.rm-seg.sel{filter:brightness(1.2);transform:scaleY(1.5)}.rm-seg.dim{opacity:.28}.rarity-legend{gap:var(--s2);flex-wrap:wrap;align-items:center;display:flex}.rl{background:var(--elev);border:1px solid var(--line);color:var(--fg-soft);border-radius:999px;align-items:center;gap:8px;padding:7px 13px;font-size:13px;font-weight:500;transition:all .15s;display:inline-flex}.rl:hover{color:var(--fg);border-color:var(--line2)}.rl.on{color:var(--fg);border-color:var(--fg-soft);background:var(--elev2)}.rl-dot{border-radius:3px;flex:none;width:9px;height:9px}.rl-n{color:var(--fg);font-variant-numeric:tabular-nums;font-weight:700}.rl-sep{background:var(--line2);width:1px;height:22px;margin:0 4px}.rl-ico{flex:none;width:14px;height:14px}.rl.fav.on{color:var(--r-l);border-color:color-mix(in oklab,var(--r-l) 55%,var(--line2));background:color-mix(in oklab,var(--r-l) 10%,var(--elev))}.rl.fav.on .rl-ico{fill:var(--r-l);stroke:var(--r-l)}.rl.shiny.on{color:var(--r-l);border-color:color-mix(in oklab,var(--r-l) 55%,var(--line2));background:color-mix(in oklab,var(--r-l) 10%,var(--elev))}.card-btn{text-align:left;cursor:pointer;content-visibility:auto;contain-intrinsic-size:auto 300px;overflow-clip-margin:40px;background:0 0;border:none;width:100%;margin:0;padding:0;display:block;position:relative}.card-btn.picking .wc{opacity:.55;transition:opacity .15s}.card-btn.picked .wc{opacity:1}.pick-overlay{z-index:10;border-radius:var(--radius-lg);pointer-events:none;border:3px solid #0000;justify-content:flex-end;align-items:flex-start;padding:9px;transition:all .15s;display:flex;position:absolute;inset:0}.pick-overlay .pick-check{color:#fff;background:#0000008c;border:2px solid #ffffffe6;border-radius:50%;justify-content:center;align-items:center;width:28px;height:28px;font-size:15px;font-weight:800;display:flex}.pick-overlay.on{border-color:var(--accent);background:color-mix(in oklab,var(--accent) 22%,transparent);box-shadow:0 0 0 2px var(--accent) inset}.pick-check svg{width:16px;height:16px}.pick-overlay.on .pick-check{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}.loading-more{color:var(--fg-faint);padding:var(--s3) 0;text-align:center;font-size:13px}.bulk-bar{z-index:40;max-width:calc(100vw - 2 * var(--s4));background:var(--elev2);border:1px solid var(--line2);border-radius:999px;align-items:center;gap:12px;padding:8px 10px 8px 18px;display:flex;position:fixed;bottom:20px;left:50%;transform:translate(-50%);box-shadow:0 18px 44px -18px #000}.bulk-text{color:var(--fg);white-space:nowrap;font-size:13.5px}.bulk-text b{color:var(--r-l)}.bulk-bar .btn{padding:9px 18px}.grid{gap:var(--s5);grid-template-columns:repeat(auto-fill,minmax(200px,1fr));display:grid}.empty{justify-content:center;align-items:center;gap:var(--s3);min-height:44vh;color:var(--fg-soft);text-align:center;flex-direction:column;display:flex}.empty b{font-family:var(--display);color:var(--fg);font-size:19px}.loading{color:var(--fg-faint);padding:var(--s7);text-align:center}.wc.skeleton{border:1px solid var(--line);background:linear-gradient(100deg,#141613 30%,#1c201c 50%,#141613 70%) 0 0/200% 100%;animation:1.2s ease-in-out infinite sk}@keyframes sk{to{background-position:-200% 0}}.grid-more{height:1px}.modal-backdrop{z-index:2147483600;padding:var(--s4) var(--s5);background:#060806d6;justify-content:center;align-items:flex-start;animation:.18s fade;display:flex;position:fixed;inset:0}@keyframes fade{0%{opacity:0}to{opacity:1}}.modal{background:var(--surface);border:1px solid var(--line2);border-radius:var(--radius-lg);width:100%;max-width:clamp(740px,46vw,960px);max-height:calc(100dvh - 2 * var(--s4));gap:var(--s6);padding:var(--s6);grid-template-columns:minmax(0,1fr) minmax(0,1.618fr);align-items:start;display:grid;position:relative;overflow:auto}.modal-card{width:100%}.modal-close{color:var(--fg-soft);cursor:pointer;z-index:2;background:0 0;border:none;font-size:28px;line-height:1;position:absolute;top:12px;right:16px}.modal-close:hover{color:var(--fg)}.modal-info{gap:var(--s4);flex-direction:column;justify-content:flex-start;min-width:0;display:flex}.modal-rar{color:var(--rc);font-family:var(--display);letter-spacing:.04em;font-size:12px;font-weight:700}.modal-name{font-family:var(--display);letter-spacing:-.01em;font-size:26px;font-weight:700;line-height:1.15}.modal-cat{color:var(--fg-soft);font-size:14px;line-height:1.45}.modal-sum{color:var(--fg-soft);-webkit-line-clamp:4;-webkit-box-orient:vertical;font-size:13.5px;line-height:1.55;display:-webkit-box;overflow:hidden}.modal-sum.muted{color:var(--fg-faint)}.modal .btn{text-align:center;text-decoration:none}.modal-panel{align-items:stretch;gap:var(--s4);flex-direction:column;display:flex}.modal-card{align-self:start;position:sticky;top:0}.mk-h,.modal .cmp-head h3{font:600 11.5px/1.3 var(--body);letter-spacing:.05em;text-transform:uppercase;color:var(--fg-faint);margin:0 0 var(--s2)}.mk-price{background:var(--elev);border:1px solid var(--line);border-radius:var(--radius);padding:var(--s4)}.mk-kpis{gap:var(--s2);grid-template-columns:repeat(auto-fit,minmax(130px,1fr));display:grid}.mk-kpi{min-width:0;padding:var(--s3) var(--s3) 10px;background:var(--elev);border:1px solid var(--line);text-align:left;color:var(--fg);font:inherit;border-radius:12px;flex-direction:column;align-items:flex-start;gap:2px;display:flex}.mk-kpi .mk-h{margin:0}.mk-kpi b{font:700 24px/1.15 var(--display);font-variant-numeric:tabular-nums}.mk-kpi b.gold{color:var(--r-l)}.mk-kpi small{color:var(--fg-faint);align-items:center;gap:4px;font-size:12px;line-height:1.3;display:inline-flex}.mk-kpi small svg{flex:none;width:12px;height:12px}.mk-kpi.buy{cursor:pointer;transition:border-color .15s,background .15s}.mk-kpi.buy:hover{border-color:var(--line2);background:var(--elev2)}.mk-kpi.buy.good{border-color:color-mix(in oklab,var(--accent) 40%,var(--line));background:color-mix(in oklab,var(--accent) 7%,var(--elev))}.mk-kpi.buy.good small{color:var(--accent);font-weight:600}.mk-sell{justify-content:space-between;align-items:center;gap:var(--s3);padding:10px 10px 10px var(--s4);border:1px dashed var(--line2);color:var(--fg-soft);border-radius:12px;flex-wrap:wrap;font-size:13px;display:flex}.mk-sell b{color:var(--fg)}.mk-sell span{flex:200px}.mk-sell .btn{margin-left:auto;padding-block:8px}.modal .cmp{background:0 0;border:none;padding:0}.modal .cmp-head{margin-bottom:var(--s2);flex-direction:column;align-items:flex-start;gap:2px}.modal .cmp-head h3{margin:0}.modal .cmp-list{max-height:none;overflow:visible}.modal .cmp-row{grid-template-columns:minmax(72px,auto) minmax(0,1fr) auto minmax(0,auto);row-gap:0}.modal .cmp-gap{text-align:left}.modal .cmp-time{flex-wrap:nowrap}.modal .cmp-tag{display:none}.modal .cmp .auc-empty{padding-top:0}.modal-wiki{color:var(--accent);align-self:flex-start;font-size:13.5px;font-weight:600;text-decoration:none}.modal-wiki:hover{text-decoration:underline}.actions{border-top:1px solid var(--line);padding-top:var(--s4)}.modal-credit{color:var(--fg-faint);font-size:11px}.mk-price-head{justify-content:space-between;align-items:baseline;gap:var(--s3);display:flex}.mk-price-head .mk-h{margin:0}.mk-price-head .link-btn,.mk-all-go{color:var(--accent);align-items:center;gap:4px;font-size:12.5px;font-weight:600;display:inline-flex}.mk-price-head .link-btn svg,.mk-all-go svg{width:12px;height:12px}.mk-all{justify-content:space-between;align-items:center;gap:var(--s3);width:100%;padding:12px var(--s4);border:1px solid var(--line);background:var(--elev);color:var(--fg-soft);font:500 13px var(--body);cursor:pointer;border-radius:12px;transition:border-color .15s,background .15s;display:flex}.mk-all:hover{border-color:var(--line2);background:var(--elev2)}.mk-all b{color:var(--fg);font-variant-numeric:tabular-nums}.modal-star{z-index:3;border:1px solid color-mix(in oklab,var(--fg) 18%,transparent);background:color-mix(in oklab,var(--bg) 55%,transparent);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);width:38px;height:38px;color:var(--fg-soft);cursor:pointer;border-radius:12px;place-items:center;transition:color .15s,transform .15s,background .15s;display:grid;position:absolute;bottom:10px;right:10px}.modal-star svg{width:20px;height:20px}.modal-star:hover{color:var(--fg);transform:scale(1.06)}.modal-star.on{color:var(--r-l);border-color:color-mix(in oklab,var(--r-l) 50%,transparent)}.modal-tags{flex-direction:column;gap:6px;display:flex}.modal-tags .mk-h{margin:0}.tag-row{flex-wrap:wrap;align-items:center;gap:6px;display:flex}.tag-chip{--tc:var(--accent);font:600 12.5px var(--body);color:color-mix(in oklab,var(--tc) 70%,var(--fg));background:color-mix(in oklab,var(--tc) 16%,transparent);border:1px solid color-mix(in oklab,var(--tc) 40%,transparent);border-radius:999px;align-items:center;gap:4px;padding:3px 4px 3px 10px;display:inline-flex}.tag-chip button{width:18px;height:18px;color:inherit;cursor:pointer;opacity:.7;background:0 0;border:none;border-radius:50%;place-items:center;padding:0;display:grid}.tag-chip button:hover{opacity:1;background:color-mix(in oklab,var(--tc) 25%,transparent)}.tag-chip svg{width:10px;height:10px}.tag-add{flex:140px;min-width:120px}.tag-add input{border:1px dashed var(--line2);width:100%;color:var(--fg);font:500 12.5px var(--body);background:0 0;border-radius:999px;padding:6px 10px}.tag-add input:focus{border-style:solid;border-color:var(--accent);outline:none}.pc-plot{height:150px;margin:var(--s4) 0 0 42px;position:relative}.pc.full .pc-plot{height:clamp(220px,38vh,380px)}.pc-grid{border-top:1px dashed color-mix(in oklab,var(--line2) 70%,transparent);pointer-events:none;position:absolute;left:0;right:0}.pc-grid span{color:var(--fg-faint);font-variant-numeric:tabular-nums;white-space:nowrap;font-size:10.5px;position:absolute;top:-.65em;right:calc(100% + 8px)}.pc-plot svg{width:100%;height:100%;display:block;position:absolute;inset:0}.pc-avg{border-top:1px dashed color-mix(in oklab,var(--r-l) 55%,transparent);pointer-events:none;position:absolute;left:0;right:0}.pc-avg span{background:var(--elev);color:color-mix(in oklab,var(--r-l) 80%,transparent);border-radius:4px;padding:0 4px;font-size:10px;font-weight:600;position:absolute;bottom:3px;right:0}.pc-slice{cursor:crosshair;background:0 0;border:none;padding:0;position:absolute;top:0;bottom:0}.pc-slice:before{content:\"\";left:var(--x);border-left:1px solid var(--line2);opacity:0;transition:opacity .12s;position:absolute;top:0;bottom:0}.pc-slice:after{content:\"\";left:var(--x);top:var(--y);background:var(--surface);border:2px solid var(--accent);border-radius:50%;width:7px;height:7px;transition:scale .12s;position:absolute;translate:-50% -50%}.pc-slice.on:before{opacity:1}.pc-slice.on:after{background:var(--accent);scale:1.4}.pc-slice.dense:after{opacity:0;width:6px;height:6px}.pc-slice.dense.on:after{opacity:1}#wm-app-root .pc-slice:focus-visible{outline:none}#wm-app-root .pc-slice:focus-visible:after{box-shadow:0 0 0 3px color-mix(in oklab,var(--accent) 40%,transparent)}.pc-tip{background:var(--elev2);border:1px solid var(--line2);color:var(--fg-soft);white-space:nowrap;pointer-events:none;z-index:1;border-radius:9px;flex-direction:column;align-items:center;gap:1px;padding:6px 10px;font-size:11px;display:flex;position:absolute;translate:-50% calc(-100% - 12px);box-shadow:0 10px 24px -12px #000}.pc-tip b{font:700 14px/1.2 var(--display);color:var(--r-l);font-variant-numeric:tabular-nums;align-items:center;gap:5px;display:inline-flex}.pc-tip.flip{translate:calc(16px - 100%) calc(-100% - 12px)}.pc-tip.flop{translate:-16px calc(-100% - 12px)}.pc-x{height:1.4em;margin:var(--s2) 0 0 42px;color:var(--fg-faint);font-size:11px;position:relative}.pc-x span{white-space:nowrap;position:absolute;top:0;translate:-50%}.pc-x span:first-child{translate:0}.pc-x span:last-child:not(:first-child){translate:-100%}.pc-dot{background:color-mix(in oklab,var(--accent) 45%,transparent);pointer-events:none;border-radius:50%;width:5px;height:5px;position:absolute;translate:-50% -50%}.pc-dot.out{border:1.5px solid var(--r-ur);background:0 0;width:7px;height:7px}.pc-vol{height:38px;margin:var(--s2) 0 0 42px;border-bottom:1px solid var(--line);position:relative}.pc-vol span{background:color-mix(in oklab,var(--fg-faint) 45%,transparent);border-radius:2px 2px 0 0;min-height:2px;transition:background .12s;position:absolute;bottom:0;translate:-50%}.pc-vol span.on{background:var(--accent)}.ma{z-index:2147483601;background:var(--bg);outline:none;flex-direction:column;animation:.18s ease-out ma-in;display:flex;position:fixed;inset:0}@keyframes ma-in{0%{opacity:0;transform:translateY(8px)}}.ma-head{padding-top:max(var(--s4),env(safe-area-inset-top))}.ma-rar{color:var(--rc);font-weight:700}.ma-body{overscroll-behavior:contain;gap:var(--s5);min-height:0;padding:var(--s5) max(var(--s5),calc((100% - 1180px) / 2)) max(var(--s6),env(safe-area-inset-bottom));flex-direction:column;flex:1;display:flex;overflow-y:auto}.ma-periods{justify-content:flex-start}.ma-figs{gap:var(--s2);grid-template-columns:repeat(6,minmax(0,1fr));display:grid}.ma-fig{min-width:0;padding:var(--s3);background:var(--elev);border:1px solid var(--line);border-radius:12px;flex-direction:column;gap:2px;display:flex}.ma-fig .mk-h{margin:0}.ma-fig b{font:700 22px/1.15 var(--display);font-variant-numeric:tabular-nums;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.ma-chart{background:var(--elev);border:1px solid var(--line);border-radius:var(--radius);padding:var(--s4) var(--s5) var(--s3)}.ma-chart .pc-plot{margin-top:var(--s2)}.ma-legend{gap:6px var(--s4);margin:var(--s3) 0 0;color:var(--fg-faint);flex-wrap:wrap;font-size:12px;display:flex}.ma-legend span{align-items:center;gap:6px;display:inline-flex}.ma-legend i{flex:none;display:inline-block}.lg-line{background:var(--accent);border-radius:2px;width:14px;height:2px}.lg-band{background:color-mix(in oklab,var(--accent) 20%,transparent);border-radius:3px;width:12px;height:10px}.lg-dot{background:color-mix(in oklab,var(--accent) 45%,transparent);border-radius:50%;width:6px;height:6px}.lg-avg{border-top:1px dashed var(--r-l);width:14px}.ma-main{gap:var(--s4);grid-template-columns:minmax(0,1.75fr) minmax(300px,1fr);align-items:stretch;display:grid}.ma-sales{contain:size;background:var(--elev);border:1px solid var(--line);border-radius:var(--radius);flex-direction:column;min-height:0;display:flex;overflow:hidden}.ma-sales-head{justify-content:space-between;align-items:center;gap:var(--s2);padding:var(--s3) var(--s4) var(--s2);display:flex}.ma-sales-head .mk-h{margin:0}.ma-sales-head .mk-h span{letter-spacing:0;color:var(--fg-soft);margin-left:4px}.ma-hint{color:var(--fg-faint);text-align:right;font-size:11.5px}.ma-day{border:1px solid color-mix(in oklab,var(--accent) 45%,var(--line));background:color-mix(in oklab,var(--accent) 12%,var(--elev));color:var(--fg);font:600 12px var(--body);cursor:pointer;border-radius:999px;align-items:center;gap:6px;padding:4px 8px 4px 10px;display:inline-flex}.ma-day svg{width:11px;height:11px}.ma-sort{margin:0 var(--s4) var(--s2);background:var(--surface);border:1px solid var(--line);border-radius:9px;gap:2px;padding:2px;display:flex}.ma-sort button{color:var(--fg-faint);font:600 12px var(--body);cursor:pointer;white-space:nowrap;background:0 0;border:none;border-radius:7px;flex:1;padding:5px 6px}.ma-sort button.on{background:var(--elev2);color:var(--fg)}.ma-list{overscroll-behavior:contain;min-height:0;padding:0 0 var(--s2);border-top:1px solid var(--line);flex:1;margin:0;list-style:none;overflow-y:auto}.ma-list li{align-items:center;gap:var(--s3);padding:6px var(--s4);font-variant-numeric:tabular-nums;grid-template-columns:1fr auto 64px;font-size:12.5px;display:grid}.ma-list li:nth-child(2n){background:color-mix(in oklab,var(--surface) 55%,transparent)}.ma-when{color:var(--fg-soft)}.ma-gap{color:var(--fg-faint);text-align:right;font-size:11.5px}.ma-gap.up{color:var(--r-ur)}.ma-gap.down{color:var(--accent)}.ma-list b{justify-content:flex-end;align-items:center;gap:5px;font-weight:700;display:inline-flex}.ma-note{padding:var(--s2) var(--s4);border-top:1px solid var(--line);text-align:center;color:var(--fg-faint);flex:none;margin:0;font-size:11.5px}@media (width<=900px){.ma-main{grid-template-columns:minmax(0,1fr)}.ma-sales{contain:none;max-height:min(460px,62dvh)}}@media (width<=560px){.ma-body{padding-inline:var(--s4);gap:var(--s4)}.ma-figs{grid-template-columns:repeat(3,minmax(0,1fr))}.ma-fig b{font-size:18px}.ma-chart{padding:var(--s3) var(--s3) var(--s2)}.ma-chart .pc-plot,.ma-chart .pc-vol,.ma-chart .pc-x{margin-left:34px}}.pc-tip b small{font:600 10px var(--body);color:var(--fg-faint);letter-spacing:.03em;margin-left:2px}.ma-back{flex:none;justify-content:center;width:42px;padding:0}.lg-out{border:1.5px solid var(--r-ur);border-radius:50%;width:7px;height:7px}.pc-slice.pickable{cursor:pointer}@media (prefers-reduced-motion:reduce){.flip-in,.stage-aura,.reveal-rarity,.rg-card,.booster-main,.booster-shine{animation:none}.booster,.wc{transition:none}}@media (width<=900px){:host,:root{--sidebar:100%;--tabbar:calc(64px + env(safe-area-inset-bottom))}.app{grid-template-columns:1fr}.side{z-index:20;height:auto;padding:6px max(6px,env(safe-area-inset-left)) calc(6px + env(safe-area-inset-bottom)) max(6px,env(safe-area-inset-right));border-right:0;border-top:1px solid var(--line);background:color-mix(in oklab,var(--surface) 97%,transparent);flex-direction:row;gap:0;position:fixed;inset:auto 0 0}.side .brand,.nav-sep,.nav-grid,.side-foot{display:none}.nav{flex:1;grid-template-columns:repeat(5,minmax(0,1fr));gap:2px;display:grid;overflow:visible}.nav>button{white-space:nowrap;border-radius:12px;flex-direction:column;justify-content:center;gap:4px;min-height:52px;padding:6px 2px;font-size:11px;font-weight:600;overflow:hidden}.nav>button svg{width:22px;height:22px}.nav>button.on{background:0 0}.nav-long{display:none}.nav-short{text-overflow:ellipsis;max-width:100%;display:block;overflow:hidden}.main{padding-bottom:var(--tabbar)}.topbar{padding:calc(var(--s2) + env(safe-area-inset-top)) var(--s4) var(--s2);gap:var(--s3)}.crumb{text-overflow:ellipsis;white-space:nowrap;min-width:0;font-size:18px;font-weight:700;overflow:hidden}.wallet .stats-toggle,.wallet .snd{display:none}.wallet .menu-btn{display:grid}.wallet{position:relative}.notif{position:static}.notif-panel{width:min(340px,calc(100vw - 2 * var(--s4)))}.coll-head h1,.page-head h1{display:none}.coll-head .meta{margin-top:0}.coll-tools,.coll-tools .search-wrap{flex:100%;min-width:0}.tool-actions{scrollbar-width:none;flex-wrap:nowrap;width:100%;min-width:0;overflow-x:auto}.pager{gap:var(--s2)}.pager-btn{min-width:0;padding-inline:var(--s3);flex:1 1 0;justify-content:center}.pager-info{flex:none}.tool-actions>*{flex:1 0 auto;justify-content:center;padding-inline:10px}.rarity-legend:not(.picker-chips){scrollbar-width:none;margin-inline:calc(-1 * var(--s4));padding-inline:var(--s4);flex-wrap:nowrap;overflow-x:auto}.rarity-legend:not(.picker-chips)>*{flex:none}.toasts,.bulk-bar{bottom:calc(var(--tabbar) + 12px)}}@media (width<=560px){.chip{padding:8px 12px}.badge.pro{display:none}.wallet{gap:6px}.wallet .bell{width:34px;height:34px}.chip-cap{display:none}}@media (width<=400px){.wallet{gap:4px}.chip{gap:6px;padding:7px 10px}}@media (width<=340px){.bulk-bar{left:var(--s4);right:var(--s4);justify-content:flex-end;gap:var(--s2) var(--s3);border-radius:var(--radius-lg);max-width:none;padding:var(--s3);flex-wrap:wrap;transform:none}.bulk-text{white-space:normal;flex:auto;min-width:0;padding-left:6px;line-height:1.35}.bulk-bar:has(.btn+.btn) .bulk-text{flex-basis:100%}.bulk-bar .btn{padding-inline:var(--s3);flex:1 1 0}}@media (width<=560px){.modal{justify-items:center;gap:var(--s4);padding:var(--s5);grid-template-columns:1fr}.modal-card{width:190px;position:static}.fact{flex-basis:40%}.grid{gap:var(--s3);grid-template-columns:repeat(2,minmax(0,1fr))}}.actions{gap:var(--s2);margin-top:var(--s2);display:flex}.actions .btn{padding-inline:var(--s3);flex:1}.btn.danger{color:#f0a0a0;border-color:#5a2b2b}.btn.danger:hover{color:#f8caca;border-color:#f26d6d}.af-input-row{align-items:center;display:flex;position:relative}.af-input{background:var(--surface);border:1px solid var(--line2);color:var(--fg);font-family:var(--body);border-radius:9px;flex:1;width:100%;padding:9px 40px 9px 12px;font-size:14px}.af-unit{color:var(--fg-faint);pointer-events:none;font-size:13px;position:absolute;right:12px}.af-input:focus{border-color:var(--accent)}.af-actions{gap:8px;margin-top:4px;display:flex}.af-actions .btn{padding-inline:var(--s3);flex:1}.modal-msg{color:#f0a0a0;font-size:12.5px}.modal-msg.ok{color:var(--accent)}.confirm{margin-top:var(--s2);background:var(--elev);border:1px solid var(--line);border-radius:12px;flex-direction:column;gap:10px;padding:14px;display:flex}.confirm-text{color:var(--fg);font-size:14px;line-height:1.4}.confirm-text b{color:var(--r-l);font-weight:700}.sell2{margin-top:var(--s2);background:var(--elev);border:1px solid var(--line);border-radius:14px;flex-direction:column;gap:14px;padding:16px;display:flex}.sell2-head{font-family:var(--display);color:var(--fg);font-size:15px;font-weight:700}.sell2-block{flex-direction:column;gap:8px;display:flex}.sell2-lab{letter-spacing:.02em;color:var(--fg-soft);text-transform:uppercase;justify-content:space-between;align-items:center;font-size:12px;font-weight:600;display:flex}.sell2-suggest{background:color-mix(in oklab,var(--r-l) 15%,transparent);border:1px solid color-mix(in oklab,var(--r-l) 30%,transparent);color:var(--r-l);cursor:pointer;text-transform:none;letter-spacing:0;border-radius:999px;padding:3px 10px;font-size:11.5px;font-weight:600;transition:all .12s}.sell2-suggest:hover{background:color-mix(in oklab,var(--r-l) 24%,transparent)}.sell2 .af-input{font-variant-numeric:tabular-nums;font-size:16px;font-weight:600}.sell2-durs{grid-template-columns:repeat(7,1fr);gap:6px;display:grid}.sell2-dur{white-space:nowrap;background:var(--elev2);border:1px solid var(--line);color:var(--fg-soft);cursor:pointer;font-variant-numeric:tabular-nums;border-radius:9px;padding:9px 2px;font-size:12px;font-weight:600;transition:all .12s}.sell2-dur:hover{color:var(--fg);border-color:var(--line2)}.sell2-dur.on{background:color-mix(in oklab,var(--accent) 16%,transparent);border-color:var(--accent);color:var(--accent)}.modal-tabs{background:var(--elev);border:1px solid var(--line);border-radius:10px;align-self:flex-start;gap:4px;margin-top:2px;padding:3px;display:inline-flex}.modal-tabs button{color:var(--fg-soft);font-family:var(--display);cursor:pointer;background:0 0;border:none;border-radius:8px;padding:6px 14px;font-size:13px;font-weight:600;transition:all .15s}.modal-tabs button.on{background:var(--accent);color:var(--accent-ink)}.mc-plot{align-items:stretch;gap:8px;display:flex}.mc-plot svg{background:var(--elev);border:1px solid var(--line);border-radius:10px;flex:1;height:56px;display:block}.mc-x{color:var(--fg-faint);justify-content:space-between;margin-top:4px;margin-left:38px;font-size:10px;display:flex}.facts{gap:var(--s2);flex-wrap:wrap;display:flex}.fact{background:var(--elev);border:1px solid var(--line);border-radius:11px;flex:112px;padding:10px 13px}.fk{color:var(--fg-faint);font-size:11px}.fv{font-family:var(--display);font-variant-numeric:tabular-nums;margin-top:3px;font-size:18px;font-weight:700;line-height:1.15}.fv.atk{color:#f26d6d}.fv.def{color:#5aa2ff}.fv.val{color:var(--r-l)}.modal-obtained{color:var(--fg-faint);margin-top:calc(-1 * var(--s2));font-size:12px}.modal-backdrop,.modal{overscroll-behavior:contain}.wc.is-unowned{filter:saturate(.72)brightness(.9)}.card-btn:hover .wc.is-unowned{filter:saturate()brightness()}.wc-wish{border:1px solid color-mix(in oklab,var(--r-sr) 60%,#ffffff4d);color:var(--r-sr);background:#000000b8;border-radius:6px;justify-content:center;align-items:center;width:22px;height:20px;font-size:12px;font-weight:700;display:inline-flex}.wc.is-nsfw .wc-photo,.wc.is-nsfw .wc-blur{filter:blur(18px)saturate(.7);transform:scale(1.2)}.wc-nsfw{z-index:3;font:600 11px/1 var(--display);color:var(--fg);border:1px solid var(--line2);white-space:nowrap;background:#0009;border-radius:999px;padding:6px 12px;position:absolute;top:44%;left:50%;transform:translate(-50%,-50%)}.grid{position:relative}.grid>*{transition:opacity .2s}.grid.dim{pointer-events:none}.grid.dim>*{opacity:.45}.grid.dim:before{content:\"\";left:0;right:0;top:calc(-1 * var(--s4));z-index:2;background:linear-gradient(90deg,transparent,var(--accent) 40%,var(--accent) 60%,transparent) no-repeat,color-mix(in oklab,var(--accent) 14%,transparent);background-size:40% 100%,100% 100%;border-radius:3px;height:3px;animation:1.1s ease-in-out infinite load-bar;position:absolute}.grid.dim:after{content:\"\";z-index:2;pointer-events:none;background:linear-gradient(100deg,#0000 30%,#ffffff0d 50%,#0000 70%) 0 0/220% 100%;animation:1.4s ease-in-out infinite reverse sk;position:absolute;inset:0}@keyframes load-bar{0%{background-position:-40% 0,0 0}to{background-position:140% 0,0 0}}.spin{border:2px solid color-mix(in oklab,currentColor 22%,transparent);border-top-color:currentColor;border-radius:50%;flex:none;width:15px;height:15px;animation:.7s linear infinite spin;display:inline-block}.search-wrap .spin.search-ico{width:16px;height:16px;color:var(--accent)}@keyframes spin{to{transform:rotate(360deg)}}.sync{color:var(--accent);background:color-mix(in oklab,var(--accent) 10%,transparent);font-variant-numeric:tabular-nums;vertical-align:1px;border-radius:999px;align-items:center;gap:7px;margin-left:10px;padding:2px 10px 2px 8px;font-size:12px;display:inline-flex}.sync .spin{width:11px;height:11px}.cmp-row.sk{cursor:default;background:linear-gradient(100deg,var(--elev2) 30%,color-mix(in oklab,var(--elev2) 70%,#fff 6%) 50%,var(--elev2) 70%);background-size:200% 100%;animation:1.2s ease-in-out infinite sk}.wc-photo,.wc-blur,.wc-bg{opacity:0;transition:opacity .35s}.wc.is-ready .wc-photo,.wc.is-ready .wc-blur,.wc.is-ready .wc-bg{opacity:1}.wc:not(.is-ready):not(.skeleton) .wc-face:before{content:\"\";z-index:0;background:linear-gradient(100deg,#0000 30%,#ffffff0f 50%,#0000 70%) 0 0/200% 100%;animation:1.2s ease-in-out infinite sk;position:absolute;inset:0}@media (prefers-reduced-motion:reduce){.grid.dim:before{background-size:100% 100%,100% 100%;animation:none}.grid.dim:after,.wc-face:before,.cmp-row.sk{animation:none}.spin{animation-duration:2s}.wc-photo,.wc-blur,.wc-bg{transition:none}}.pager{justify-content:center;align-items:center;gap:var(--s4);margin:var(--s6) 0 var(--s5);display:flex}.mine-cap{margin:var(--s6) 0 var(--s5);text-align:center;color:var(--fg-faint);font-size:13px}.pager-info{color:var(--fg-soft);font-variant-numeric:tabular-nums;font-size:13.5px}.auc-item{flex-direction:column;gap:6px;display:flex}.auc-item .card-btn{width:100%}.auc-meta{justify-content:space-between;align-items:center;gap:8px;padding:0 2px;display:flex}.auc-price-line{align-items:center;gap:7px;min-width:0;display:inline-flex}.auc-gap{font:600 11.5px/1 var(--body);font-variant-numeric:tabular-nums;white-space:nowrap;color:var(--fg-soft);background:color-mix(in oklab,var(--fg-soft) 12%,transparent);border-radius:6px;padding:3px 6px}.auc-gap[data-z=good]{color:var(--accent);background:color-mix(in oklab,var(--accent) 14%,transparent)}.auc-gap[data-z=warm]{color:var(--r-ur);background:color-mix(in oklab,var(--r-ur) 14%,transparent)}.auc-gap[data-z=bad]{color:var(--bad);background:color-mix(in oklab,var(--bad) 14%,transparent)}.auc-bid{font-family:var(--display);color:var(--r-l);font-variant-numeric:tabular-nums;align-items:center;gap:5px;font-size:14px;font-weight:700;display:inline-flex}.auc-coin{background:var(--coin);width:11px;height:11px;box-shadow:0 0 6px color-mix(in oklab,var(--r-l) 55%,transparent);border-radius:50%;flex:none}.auc-end{color:var(--fg-soft);font-variant-numeric:tabular-nums;font-size:12.5px}.auc-seller{color:var(--fg-faint);white-space:nowrap;text-overflow:ellipsis;padding:0 2px;font-size:11.5px;overflow:hidden}.auc-seller.lead{color:var(--accent);font-weight:600}.auc-foot{justify-content:space-between;align-items:center;gap:8px;min-width:0;display:flex}.auc-foot .auc-seller{min-width:0}.auc-dup{font:700 11px/1 var(--display);color:var(--fg);background:var(--elev2);border:1px solid var(--line2);font-variant-numeric:tabular-nums;border-radius:999px;flex:none;padding:4px 8px}.cmp-head{justify-content:space-between;align-items:baseline;gap:var(--s3);margin-bottom:var(--s2);flex-wrap:wrap;display:flex}.cmp-head h3,.auc-panel .cmp-head h3{margin:0}.cmp-sum{color:var(--fg-soft);font-size:12.5px}.cmp-sum b{color:var(--fg);font-variant-numeric:tabular-nums}.cmp-list{scrollbar-width:thin;scrollbar-color:var(--line2) transparent;flex-direction:column;gap:4px;max-height:220px;margin:0;padding:0;list-style:none;display:flex;overflow:auto}.cmp-row{align-items:center;gap:var(--s3);background:var(--elev2);width:100%;min-height:40px;color:var(--fg);font:inherit;text-align:left;cursor:pointer;border:1px solid #0000;border-radius:10px;grid-template-columns:minmax(80px,1fr) minmax(96px,1fr) minmax(120px,1.4fr) minmax(0,1.2fr);padding:8px 12px;font-size:13px;transition:border-color .15s,background .15s;display:grid}.cmp-row:hover:not(:disabled){border-color:var(--line2)}.cmp-row.here{cursor:default;border-color:color-mix(in oklab,var(--accent) 45%,var(--line));background:color-mix(in oklab,var(--accent) 8%,var(--elev2))}.cmp-price{font-family:var(--display);color:var(--r-l);font-variant-numeric:tabular-nums;align-items:center;gap:6px;font-size:15px;font-weight:700;display:inline-flex}.cmp-shiny{color:#f3d27a;display:inline-flex}.cmp-shiny svg{width:12px;height:12px}.cmp-gap{font-variant-numeric:tabular-nums;color:var(--fg-soft)}.cmp-gap.best{color:var(--accent);font-weight:600}.cmp-time{font-variant-numeric:tabular-nums;flex-wrap:wrap;align-items:center;gap:8px;display:inline-flex}.cmp-time.soon{color:var(--bad)}.cmp-tag{color:var(--fg-soft);background:var(--elev);border:1px solid var(--line2);white-space:nowrap;border-radius:999px;padding:2px 7px;font-size:10.5px;font-weight:700}.cmp-who{color:var(--fg-faint);white-space:nowrap;text-overflow:ellipsis;text-align:right;overflow:hidden}.cmp{container-type:inline-size}@container (width<=520px){.cmp-row{grid-template-columns:auto 1fr;row-gap:6px}.cmp-gap{text-align:right}.cmp-time{justify-content:flex-start}}@media (width<=560px){.cmp-list{max-height:none;overflow:visible}}.auc-end.soon{color:var(--bad)}.mkt-filter{margin-bottom:var(--s5)}.tabs{gap:var(--s5);border-bottom:1px solid var(--line);margin-bottom:var(--s5);scrollbar-width:none;display:flex;overflow-x:auto}.tabs button{color:var(--fg-soft);font:inherit;white-space:nowrap;cursor:pointer;background:0 0;border:0;border-bottom:2px solid #0000;margin-bottom:-1px;padding:0 0 12px;font-size:14px;font-weight:500;transition:color .15s,border-color .15s}.tabs button:hover{color:var(--fg)}.tabs button.on{color:var(--fg);border-bottom-color:var(--accent);font-weight:600}.deal-bar{align-items:center;gap:var(--s2);margin-bottom:var(--s3);flex-wrap:wrap;display:flex}.deal-caps{background:var(--elev);border:1px solid var(--line);border-radius:12px;padding:3px;display:inline-flex}.deal-caps button{color:var(--fg-soft);font:600 13.5px var(--body);background:0 0;border:0;border-radius:9px;padding:8px 14px;transition:all .15s}.deal-caps button:hover{color:var(--fg)}.deal-caps button.on{background:var(--accent);color:var(--accent-ink)}.deal-n{background:var(--elev2);min-width:20px;height:20px;color:var(--fg-soft);font:600 11.5px var(--body);font-variant-numeric:tabular-nums;border-radius:999px;place-items:center;margin-left:7px;padding:0 6px;display:inline-grid}.deal-caps button.on .deal-n{background:color-mix(in oklab,var(--accent-ink) 18%,transparent);color:var(--accent-ink)}.deal-max{background:var(--elev);border:1px solid var(--line);border-radius:11px;align-items:center;gap:8px;height:42px;padding:0 12px;display:inline-flex}.deal-max:focus-within{border-color:var(--line2)}.deal-max input{width:92px;color:var(--fg);font:500 14px var(--body);font-variant-numeric:tabular-nums;background:0 0;border:0;outline:none}.deal-max input::-webkit-inner-spin-button{opacity:.4}.deal-status{justify-content:space-between;align-items:center;gap:var(--s3);margin:var(--s3) 0 var(--s4);color:var(--fg-soft);flex-wrap:wrap;font-size:14px;display:flex}.deal-status b{color:var(--fg);font-variant-numeric:tabular-nums}.deal-pricing{color:var(--fg-faint);align-items:center;gap:6px;display:inline-flex}.deal-pricing .spin{width:11px;height:11px}.deal-more{align-items:center;gap:8px;padding:10px 18px;font-size:14px;display:inline-flex}.deal-more .spin{width:13px;height:13px}.watch-btn{white-space:nowrap}.watch-btn.on{color:var(--accent);border-color:color-mix(in oklab,var(--accent) 40%,var(--line2))}.modal.watch{align-items:stretch;gap:var(--s4);max-width:560px;padding:var(--s6) var(--s5) var(--s5);flex-direction:column;display:flex}.watch header{padding-right:var(--s6);flex-direction:column;gap:6px;display:flex}.watch h2{font:700 20px var(--display)}.watch header p{color:var(--fg-soft);font-size:13.5px}.watch-form{gap:var(--s3);flex-direction:column;display:flex}.watch-q .search-wrap{max-width:none}.watch-opts{align-items:center;gap:var(--s2);flex-wrap:wrap;display:flex}.watch-opts .isel select{font-size:14px}.watch-under{color:var(--fg-soft);cursor:pointer;align-items:center;gap:8px;font-size:13.5px;display:inline-flex}.watch-under input{accent-color:var(--accent);width:16px;height:16px}.watch-form .btn{justify-content:center;align-items:center;gap:8px;display:inline-flex}.watch-form .btn .spin{width:14px;height:14px}.watch-list{border:1px solid var(--line);border-radius:var(--radius);flex-direction:column;list-style:none;display:flex;overflow:hidden}.watch-list li{align-items:center;gap:var(--s2);padding:8px 10px 8px 4px;display:flex}.watch-list li+li{border-top:1px solid var(--line)}.watch-what{text-align:left;min-width:0;color:var(--fg);background:0 0;border:0;border-radius:10px;flex-direction:column;flex:1;gap:2px;padding:4px 10px;display:flex}.watch-what:hover{background:var(--elev)}.watch-what b{text-overflow:ellipsis;white-space:nowrap;font-size:14px;font-weight:600;overflow:hidden}.watch-what small{color:var(--fg-faint);font-size:12px}.auc{width:min(900px,94vw);max-height:calc(100dvh - 2 * var(--s4));background:var(--surface);border:1px solid var(--line2);border-radius:var(--radius-lg);padding:var(--s6);gap:var(--s5);flex-direction:column;display:flex;position:relative;overflow:auto;box-shadow:0 40px 90px -30px #000}.auc-top{gap:var(--s6);grid-template-columns:minmax(0,1fr) minmax(0,1.618fr);align-items:start;display:grid}.auc-card .wc{border-radius:14px}.auc-body{gap:var(--s4);flex-direction:column;min-width:0;display:flex}.auc-name{font-family:var(--display);letter-spacing:-.02em;margin-top:6px;font-size:clamp(22px,2.6vw,30px);font-weight:700;line-height:1.1}.auc-cat{color:var(--fg-soft);margin-top:4px;font-size:14px}.auc-by{color:var(--fg-faint);margin-top:6px;font-size:12.5px}.auc-state{background:var(--elev);border:1px solid var(--line);border-radius:14px;flex-direction:column;gap:6px;padding:16px 18px;display:flex}.auc-state[data-phase=sold]{border-color:color-mix(in oklab,var(--accent) 40%,var(--line));background:color-mix(in oklab,var(--accent) 6%,var(--elev))}.auc-row{justify-content:space-between;gap:var(--s4);flex-wrap:wrap;display:flex}.auc-k{color:var(--fg-soft);letter-spacing:.02em;font-size:12px}.auc-price{font-family:var(--display);color:var(--r-l);font-variant-numeric:tabular-nums;align-items:center;gap:9px;font-size:34px;font-weight:800;line-height:1.1;display:inline-flex}.auc-price.muted{color:var(--fg-soft)}.auc-price .auc-coin{width:17px;height:17px}.auc-clock{text-align:right}.auc-time{font-family:var(--display);font-variant-numeric:tabular-nums;font-size:26px;font-weight:800;line-height:1.2}.auc-clock[data-u=warn] .auc-time{color:var(--r-ur)}.auc-clock[data-u=crit] .auc-time{color:var(--bad);animation:1s ease-in-out infinite auc-pulse}.auc-clock[data-u=end] .auc-time{color:var(--fg-faint)}.auc-sub{color:var(--fg-faint);flex-wrap:wrap;align-items:center;gap:10px;font-size:12.5px;display:flex}.auc-live{color:var(--accent);align-items:center;gap:6px;display:inline-flex}.auc-dot{background:var(--accent);border-radius:50%;width:7px;height:7px;animation:1.8s ease-out infinite auc-live}.auc-flag{border-radius:10px;padding:8px 12px;font-size:13px;font-weight:600}.auc-flag.lead{background:color-mix(in oklab,var(--accent) 14%,transparent);color:var(--accent)}.auc-flag.out{background:color-mix(in oklab,var(--bad) 14%,transparent);color:var(--bad)}.auc-act{flex-direction:column;gap:10px;display:flex}.auc-inline{gap:8px;display:flex}.auc-inline .af-input-row{flex:1}.auc-inline .btn{padding:10px 22px}.auc-cta{width:100%;padding:12px}.auc-quick{flex-wrap:wrap;gap:6px;display:flex}.auc-quick button{background:var(--elev);border:1px solid var(--line);color:var(--fg-soft);cursor:pointer;border-radius:999px;padding:6px 12px;font-size:12.5px;font-weight:600;transition:all .12s}.auc-quick button:hover{color:var(--fg);border-color:var(--line2)}.auc-bal{color:var(--fg-faint);font-size:12px}.auc-bal.low{color:var(--bad)}.auc-note{color:var(--fg-soft);font-size:13px}.auc-bottom{gap:var(--s4);grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);align-items:start;display:grid}.auc-panel{background:var(--elev);border:1px solid var(--line);border-radius:14px;min-width:0;padding:14px 16px}.auc-panel h3{font:600 11.5px/1.3 var(--body);letter-spacing:.05em;text-transform:uppercase;color:var(--fg-faint);margin-bottom:var(--s2)}.auc-empty{color:var(--fg-faint);padding:2px 0 4px;font-size:13px}.auc-feed{max-height:300px;margin:0;padding:0 6px;list-style:none;overflow:hidden auto}.auc-feed li{border-top:1px solid var(--line);border-radius:8px;align-items:center;gap:8px;margin:0 -6px;padding:7px 6px;font-size:13px;transition:background .12s;display:flex}.auc-feed li.hot{background:color-mix(in oklab,var(--accent) 12%,transparent)}.auc-feed li.dim{opacity:.38}.auc-feed li:first-child{border-top:0}.auc-feed .who{white-space:nowrap;text-overflow:ellipsis;flex:1;min-width:0;font-weight:500;overflow:hidden}.auc-feed .me .who{color:var(--accent)}.auc-feed .tag{letter-spacing:.03em;color:var(--accent-ink);background:var(--accent);border-radius:999px;padding:2px 7px;font-size:10.5px;font-weight:700}.auc-feed .amt{color:var(--r-l);font-variant-numeric:tabular-nums;font-weight:700}.auc-feed li:not(.top) .amt{color:color-mix(in oklab,var(--r-l) 70%,var(--fg-soft))}.auc-feed .when{color:var(--fg-faint);text-align:right;min-width:74px;font-size:11.5px}.auc-feed .auc-more{border:0;height:1px;padding:0}.ap{flex-direction:column;gap:8px;display:flex}.ap-head{justify-content:space-between;align-items:center;gap:var(--s2);flex-wrap:wrap;display:flex}.ap-head h3{margin:0}.ap-chip{font:600 12px var(--body);white-space:nowrap;color:var(--fg);background:var(--elev2);border-radius:999px;padding:3px 10px}.ap-chip[data-z=good]{color:var(--accent);background:color-mix(in oklab,var(--accent) 14%,transparent)}.ap-chip[data-z=warm]{color:var(--r-ur);background:color-mix(in oklab,var(--r-ur) 14%,transparent)}.ap-chip[data-z=bad]{color:var(--bad);background:color-mix(in oklab,var(--bad) 14%,transparent)}.ap-verdict{color:var(--fg-soft);margin:0;font-size:13.5px;line-height:1.4}.ap-verdict b{color:var(--fg);font-weight:600}.ap-gauge{height:44px;margin:24px 6px 0;position:relative}.ap-zones span{background:var(--zc);opacity:.4;border-radius:4px;height:8px;position:absolute;top:0}.ap-zones span+span{margin-left:2px}.ap-zones span[data-z=good]{--zc:var(--accent)}.ap-zones span[data-z=fair]{--zc:var(--fg-faint)}.ap-zones span[data-z=warm]{--zc:var(--r-ur)}.ap-zones span[data-z=bad]{--zc:var(--bad)}.ap-zones em{font:normal 500 11px var(--body);color:var(--fg-faint);white-space:nowrap;position:absolute;top:12px;left:50%;translate:-50%}.ap-mark{position:absolute;top:4px;translate:-50% -50%}.ap-mark.market{background:var(--fg);opacity:.7;border-radius:1px;width:2px;height:20px;top:4px;translate:-50% -50%}.ap-mark.market b{font:600 11px var(--body);color:var(--fg-soft);white-space:nowrap;position:absolute;top:34px;left:50%;translate:-50%}.ap-mark.mine{background:var(--elev);border:2px solid var(--r-l);border-radius:50%;width:12px;height:12px}.ap-mark.price{background:var(--r-l);width:18px;height:18px;box-shadow:0 0 0 3px var(--elev),0 0 14px color-mix(in oklab,var(--r-l) 60%,transparent);border-radius:50%}.ap-mark.price b{font:700 13px var(--display);color:var(--r-l);font-variant-numeric:tabular-nums;white-space:nowrap;position:absolute;bottom:calc(100% + 4px);left:50%;translate:-50%}.ap-mark.price.flip b{left:auto;right:-4px;translate:0}.ap-sub{align-items:baseline;gap:var(--s2);margin-top:4px;display:flex}.ap-sub .mk-h{margin:0}.ap-facts{color:var(--fg-soft);font-variant-numeric:tabular-nums;font-size:12.5px}.ap-facts b{color:var(--fg)}.ap-facts .hot{color:var(--r-ur);font-weight:600}.ap-dot{color:var(--fg-faint);margin:0 6px}.ap-pace{border-bottom:1px solid var(--line2);align-items:flex-end;gap:2px;height:30px;display:flex;position:relative}.ap-pace span{background:color-mix(in oklab,var(--fg-faint) 55%,transparent);border-radius:2px 2px 0 0;flex:1;min-height:0}.ap-pace span.hot{background:color-mix(in oklab,var(--r-ur) 85%,transparent)}.ap-now,.ap-track-now{border-left:1px dashed color-mix(in oklab,var(--fg) 45%,transparent);position:absolute;top:0;bottom:0}.ap-axis{color:var(--fg-faint);font-variant-numeric:tabular-nums;justify-content:space-between;font-size:10.5px;display:flex;position:relative}.ap-axis-now{color:var(--fg-soft);background:var(--elev);padding-right:4px;position:absolute;top:0;translate:-100%}.ap-lanes{flex-direction:column;gap:2px;display:flex}.ap-lane{border-radius:10px;grid-template-columns:20px minmax(0,92px) minmax(0,1fr) auto;align-items:center;gap:10px;margin:0 -8px;padding:3px 8px;transition:background .12s;display:grid}.ap-lane:hover,.ap-lane:focus-visible{background:var(--elev2)}.ap-lane.lead{background:color-mix(in oklab,var(--accent) 10%,transparent)}.ap-name{text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:600;overflow:hidden}.ap-lane.mine .ap-name{color:var(--r-l)}.ap-track{background:linear-gradient(var(--line2),var(--line2)) center/100% 1px no-repeat;border-radius:4px;height:14px;position:relative}.ap-track i{background:var(--fg-soft);border-radius:2px;width:3px;margin-left:-1.5px;position:absolute;top:2px;bottom:2px}.ap-lane.lead .ap-track i{background:var(--accent)}.ap-lane.mine .ap-track i{background:var(--r-l)}.ap-track .ap-track-now{background:0 0;width:0;margin:0;top:0;bottom:0}.ap-best{font:700 13px var(--display);color:var(--r-l);font-variant-numeric:tabular-nums;text-align:right;min-width:40px}.ap-more{color:var(--fg-faint);margin:4px 0 0;font-size:12px}.auc,.auc-feed,.modal,.notif-panel{scrollbar-width:thin;scrollbar-color:var(--line2) transparent}@keyframes auc-pulse{50%{opacity:.55}}@keyframes auc-live{0%{box-shadow:0 0 0 0 color-mix(in oklab,var(--accent) 55%,transparent)}70%{box-shadow:0 0 0 7px #0000}to{box-shadow:0 0 #0000}}@media (width<=760px){.auc-top,.auc-bottom{grid-template-columns:1fr}.auc-card{width:180px;margin:0 auto}}@media (prefers-reduced-motion:reduce){.auc-clock[data-u=crit] .auc-time,.auc-dot{animation:none}}.wc-wish svg,.wc-star svg,.wc-shiny svg{width:12px;height:12px;display:block}.pager-btn{align-items:center;gap:7px;display:inline-flex}.pager-btn svg{width:15px;height:15px}.modal-close .x-ico{width:16px;height:16px}.search-clear .x-ico{width:13px;height:13px}.toasts{z-index:2147483601;flex-direction:column;gap:10px;width:min(360px,100vw - 40px);display:flex;position:fixed;bottom:68px;right:16px}.toast{background:var(--elev2);border:1px solid var(--line2);color:var(--fg);cursor:pointer;border-radius:14px;align-items:flex-start;gap:12px;padding:14px 16px;animation:.25s toast-in;display:flex;box-shadow:0 20px 50px -20px #000}.toast svg{width:18px;height:18px;color:var(--accent);flex:none;margin-top:1px}.toast-wrap{animation:.25s toast-in;position:relative}.toast-wrap .toast{padding-right:40px;animation:none}.toast-x{width:26px;height:26px;color:var(--fg-faint);cursor:pointer;background:0 0;border:0;border-radius:8px;justify-content:center;align-items:center;transition:background .15s,color .15s;display:flex;position:absolute;top:8px;right:8px}.toast-x:hover{background:var(--elev);color:var(--fg)}.toast-x svg{width:13px;height:13px}.toast b{font-size:13.5px;font-weight:600;display:block}.toast span{color:var(--fg-soft);margin-top:2px;font-size:12.5px;line-height:1.4;display:block}@keyframes toast-in{0%{opacity:0;transform:translateY(8px)}}.kbd{border:1px solid var(--line2);background:var(--elev);min-width:22px;height:22px;font:600 11.5px/1 var(--body);color:var(--fg);border-bottom-width:2px;border-radius:6px;justify-content:center;align-items:center;padding:0 6px;display:inline-flex}.kbd-help-scrim{z-index:2147483601;background:#06080699;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}.kbd-help{background:var(--surface);border:1px solid var(--line2);border-radius:var(--radius-lg);flex-direction:column;gap:10px;min-width:300px;padding:22px 26px;display:flex}.kbd-help h3{font-family:var(--display);margin-bottom:4px;font-size:16px}.kbd-row{color:var(--fg-soft);align-items:center;gap:12px;font-size:13.5px;display:flex}.kbd-row .kbd{min-width:58px}@media (prefers-reduced-motion:reduce){.toast,.toast-wrap{animation:none}}.hc-backdrop{z-index:2147483602}.modal.hc{gap:var(--s3);text-align:center;grid-template-columns:1fr;justify-items:center;max-width:420px}.hc-title{font-family:var(--display);font-size:20px}.hc-sub{color:var(--fg-soft);align-items:center;gap:8px;font-size:13.5px;display:inline-flex}.hc-box{justify-content:center;min-height:70px;display:flex}.hc-cancel{color:var(--fg-faint);font-weight:500}.tab-n{min-width:18px;height:18px;font:700 11px/1 var(--display);background:color-mix(in oklab,var(--accent) 18%,transparent);color:var(--accent);border-radius:999px;justify-content:center;align-items:center;margin-left:6px;padding:0 6px;display:inline-flex}.nowrap{white-space:nowrap}.trade-status{background:var(--elev2);color:var(--fg-soft);white-space:nowrap;border-radius:999px;align-items:center;padding:4px 9px;font-size:11.5px;font-weight:700;line-height:1;display:inline-flex}.trade-status[data-s=pending]{background:color-mix(in oklab,var(--r-l) 14%,transparent);color:var(--r-l)}.trade-status[data-s=accepted]{background:color-mix(in oklab,var(--accent) 14%,transparent);color:var(--accent)}.trade-status[data-s=declined]{background:color-mix(in oklab,var(--bad) 15%,transparent);color:var(--bad)}.trade-status[data-s=cancelled]{color:var(--fg-faint)}.tr-head{margin-bottom:var(--s4);align-items:center}.tr-split{gap:var(--s4);grid-template-columns:minmax(0,1fr);display:grid}.tr-col,.tr-pane{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-lg);min-width:0}.tr-col{flex-direction:column;display:flex;overflow:hidden}.tr-tabs{padding:0 var(--s2);flex:none;gap:0;margin:0}.tr-tabs button{padding:var(--s4) var(--s2) 14px;flex:1;justify-content:center;align-items:center;display:inline-flex}.tr-rows{padding:var(--s2);overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--line2) transparent;flex-direction:column;gap:2px;display:flex;overflow:auto}.tr-row{align-items:center;gap:var(--s3);width:100%;min-height:68px;padding:10px var(--s3);color:var(--fg);font:inherit;text-align:left;cursor:pointer;background:0 0;border:1px solid #0000;border-radius:12px;grid-template-columns:40px minmax(0,1fr) auto;transition:background .15s,border-color .15s;display:grid;position:relative}.tr-row:hover{background:var(--elev)}.tr-row.on{background:var(--elev2);border-color:var(--line2)}.tr-row.flash{animation:1.3s ease-out 2 tr-flash}@keyframes tr-flash{0%{box-shadow:0 0 0 2px var(--accent),0 0 24px -4px var(--accent)}to{box-shadow:0 0 0 2px #0000,0 0 24px -4px #0000}}@media (prefers-reduced-motion:reduce){.tr-row.flash{box-shadow:0 0 0 2px var(--accent);animation:none}}.tr-row.on:before{content:\"\";background:var(--accent);border-radius:0 3px 3px 0;width:3px;position:absolute;top:14px;bottom:14px;left:-1px}.tr-row.sk{cursor:default;background:linear-gradient(100deg,var(--surface) 30%,var(--elev) 50%,var(--surface) 70%);background-size:200% 100%;height:68px;animation:1.2s ease-in-out infinite sk}.tr-row-main{flex-direction:column;gap:5px;min-width:0;display:flex}.tr-row-top{align-items:baseline;gap:var(--s2);min-width:0;display:flex}.tr-row-top b{text-overflow:ellipsis;white-space:nowrap;flex:0 auto;min-width:0;font-size:14.5px;font-weight:600;overflow:hidden}.tr-row-when{text-overflow:ellipsis;min-width:0;color:var(--fg-faint);flex:0 1000 auto;margin-left:auto;font-size:12px;overflow:hidden}.tr-row-line{min-width:0;color:var(--fg-soft);-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:13px;line-height:1.35;display:-webkit-box;overflow:hidden}.tr-col-none{padding:var(--s5) var(--s4);text-align:center;color:var(--fg-faint);font-size:13.5px;display:none}.tr-badge{text-align:center;min-width:46px;font:700 13px/1 var(--display);font-variant-numeric:tabular-nums;white-space:nowrap;background:var(--elev2);color:var(--fg-soft);border-radius:9px;padding:6px 9px}.tr-row.on .tr-badge[data-k=balanced],.tr-row.on .tr-badge[data-k=unknown]{background:var(--line)}.tr-badge[data-k=advantage]{background:color-mix(in oklab,var(--accent) 15%,transparent);color:var(--accent)}.tr-badge[data-k=disadvantage]{background:color-mix(in oklab,var(--bad) 15%,transparent);color:var(--bad)}.tr-badge[data-k=unknown]{color:var(--fg-faint)}.tr-row>.trade-status{padding:6px 9px}.tr-empty{justify-content:center;align-items:center;gap:var(--s2);min-height:340px;padding:var(--s6) var(--s5);text-align:center;color:var(--fg-soft);flex-direction:column;flex:1;font-size:14px;display:flex}.tr-empty b{font:700 19px/1.3 var(--display);color:var(--fg)}.tr-empty .btn{margin-top:var(--s3)}.tr-empty-ico{width:64px;height:64px;margin-bottom:var(--s2);color:var(--accent);background:color-mix(in oklab,var(--accent) 10%,var(--elev));border:1px solid color-mix(in oklab,var(--accent) 28%,var(--line));border-radius:50%;justify-content:center;align-items:center;display:flex}.tr-empty-ico svg{width:28px;height:28px}.tr-pane{flex-direction:column;display:flex;overflow:hidden;container:tpane/inline-size}.tr-pane-sk{padding:var(--s5);gap:var(--s5);flex-direction:column;display:flex}.tr-pane-sk .sk-line{background:var(--elev);border-radius:12px;width:min(320px,70%);height:44px;animation:1.2s ease-in-out infinite sk}.tr-pane-sk .sk-cards{justify-content:center;gap:var(--s7);grid-template-columns:repeat(2,minmax(0,220px));display:grid}.tr-pane-sk .wc{aspect-ratio:5/7}.tp{flex-direction:column;flex:1;min-height:0;display:flex}.tp-head{align-items:center;gap:var(--s3);padding:var(--s4) var(--s5);border-bottom:1px solid var(--line);flex:none;display:flex}.tp-back{flex:none;justify-content:center;width:42px;padding:0}.tp-title{flex-direction:column;flex:1;gap:5px;min-width:0;display:flex}.tp-title h2{font:700 20px/1.2 var(--display);letter-spacing:-.01em;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tp-sub{align-items:center;gap:4px var(--s2);color:var(--fg-faint);flex-wrap:wrap;font-size:12.5px;display:flex}.tp-mode{flex:none;align-self:center;margin:0}.tp-mode button{align-items:center;gap:7px;display:inline-flex}.tp-mode svg{width:15px;height:15px}.tp-body{overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--line2) transparent;min-height:0;padding:clamp(var(--s3),2.5cqi,var(--s5));gap:var(--deal-bodyGap);flex-direction:column;flex:1;display:flex;overflow:auto}.tp-body>:first-child{margin-top:auto}.tp-body>:last-child{margin-bottom:auto}.tp-sides{justify-content:center;align-items:stretch;gap:var(--deal-gap);display:flex}.tp-sides.measuring{visibility:hidden}.tp-sides.stacked{flex-direction:column}.tside{gap:var(--s3);min-width:0;padding:calc(var(--deal-pad) - 1px);border-radius:var(--radius);background:var(--elev);border:1px solid var(--line);flex-direction:column;flex:none;display:flex}.tside-head{justify-content:space-between;align-items:baseline;gap:4px var(--s2);white-space:nowrap;letter-spacing:.05em;text-transform:uppercase;color:var(--fg-soft);flex-wrap:wrap;font-size:11.5px;font-weight:700;display:flex}.tside-total{text-transform:none;letter-spacing:0;color:var(--fg);font:700 16px/1 var(--display);font-variant-numeric:tabular-nums;white-space:nowrap}.tside-total.is-none{font:500 13px var(--body);color:var(--fg-faint)}.tside-none{color:var(--fg-faint);padding:var(--s3) 0;width:var(--card-w);font-size:13px}.tside-cards{align-content:flex-start;gap:var(--deal-gap);width:calc(var(--cols,1) * var(--card-w) + (var(--cols,1) - 1) * var(--deal-gap));flex-wrap:wrap;margin-inline:auto;display:flex}.tside-cards>*{width:var(--card-w);flex:none}.tside>:nth-child(2){margin-top:auto}.tside>:last-child{margin-bottom:auto}.stacked .tside-none{width:auto}.tp-sides:not(.stacked) .tside{width:min-content}.tp-sides.scrolls:not(.stacked){align-items:flex-start}.tp-sides.scrolls .tside>*{margin-block:0}.tp-sides.scrolls:not(.stacked) .tm-verdict{top:var(--s4);margin-top:calc(var(--card-w) * .5);align-self:flex-start;position:sticky}.tside-coins{aspect-ratio:5/7;border-radius:var(--radius-lg);border:1px dashed color-mix(in oklab,var(--r-l) 45%,var(--line2));background:color-mix(in oklab,var(--r-l) 8%,var(--surface));color:var(--r-l);flex-direction:column;justify-content:center;align-items:center;gap:6px;display:flex}.tside-coins svg{flex:none;width:26px;height:26px}.tside-chip{height:calc(var(--deal-chip) - var(--s3));justify-content:center;align-items:center;gap:var(--s2);padding:0 var(--s3);border:1px dashed color-mix(in oklab,var(--r-l) 45%,var(--line2));background:color-mix(in oklab,var(--r-l) 8%,var(--surface));color:var(--fg-soft);white-space:nowrap;border-radius:999px;flex:none;font-size:13px;display:flex}.tside-chip svg{width:16px;height:16px;color:var(--r-l);flex:none}.tside-chip b{font:700 15px/1 var(--display);color:var(--r-l);font-variant-numeric:tabular-nums}.tside-coins b{font:800 26px/1 var(--display);font-variant-numeric:tabular-nums}.tside-coins span{color:var(--fg-soft);font-size:12px}.tm-verdict{text-align:center;color:var(--fg-soft);flex-direction:column;align-self:center;align-items:center;gap:6px;min-width:120px;display:flex}.tm-verdict svg{width:22px;height:22px}.tm-verdict b{font:700 14px/1.2 var(--display);color:var(--fg)}.tm-verdict span{font-variant-numeric:tabular-nums;overflow-wrap:anywhere}.tm-verdict[data-k=advantage] b,.tm-verdict[data-k=advantage] span{color:var(--accent)}.tm-verdict[data-k=disadvantage] b,.tm-verdict[data-k=disadvantage] span{color:var(--bad)}.tp .tm-verdict{width:var(--deal-verdictW);flex:none;min-width:0}.tp .tm-verdict svg{box-sizing:content-box;background:var(--elev2);border:1px solid var(--line2);border-radius:50%;padding:12px}.tp .tm-verdict[data-k=advantage] svg{background:color-mix(in oklab,var(--accent) 14%,var(--elev));border-color:color-mix(in oklab,var(--accent) 40%,var(--line))}.tp .tm-verdict[data-k=disadvantage] svg{background:color-mix(in oklab,var(--bad) 13%,var(--elev));border-color:color-mix(in oklab,var(--bad) 38%,var(--line))}.tp .tm-verdict b{font-size:13px}.tp .tm-verdict span{font:700 15px/1.2 var(--display)}.tp .stacked .tm-verdict{width:auto;min-height:var(--deal-verdictH);justify-content:center;gap:var(--s2) var(--s3);flex-flow:wrap}.tp .stacked .tm-verdict svg{padding:8px;transform:rotate(90deg)}.tp-chain{width:100%;max-width:720px;margin-inline:auto}.tp-chain h3{letter-spacing:.05em;text-transform:uppercase;color:var(--fg-soft);margin-bottom:var(--s2);font-size:11.5px;font-weight:700}.tp-chain ol{--dot:9px;flex-direction:column;margin:0;padding:0;list-style:none;display:flex}.tp-chain li{align-items:center;gap:var(--s3);min-height:34px;padding-left:calc(var(--dot) + var(--s3));color:var(--fg-soft);font-size:13.5px;display:flex;position:relative}.tp-chain li:before{content:\"\";width:var(--dot);height:var(--dot);margin-top:calc(var(--dot) / -2);background:var(--line2);z-index:1;border-radius:50%;position:absolute;top:50%;left:0}.tp-chain li:after{content:\"\";left:calc(var(--dot) / 2 - 1px);background:var(--line);width:2px;position:absolute;top:0;bottom:0}.tp-chain li:first-child:after{top:50%}.tp-chain li:last-child:after{bottom:50%}.tp-chain li:only-child:after{display:none}.tp-chain li.now{color:var(--fg)}.tp-chain li.now:before{background:var(--fg-soft)}.tp-chain li[data-k=accepted]:before{background:var(--accent)}.tp-chain li[data-k=accepted] b{color:var(--accent)}.tp-chain li[data-k=declined]:before{background:var(--bad)}.tp-chain li[data-k=declined] b{color:var(--bad)}.tp-chain li[data-k=pending]:before{background:var(--r-l)}.tp-step{align-items:center;gap:var(--s3);min-width:0;padding:6px var(--s2);border-radius:calc(var(--radius) / 1.618);color:inherit;font:inherit;text-align:left;cursor:pointer;background:0 0;border:0;flex:1;margin-inline-start:calc(-1 * var(--s2));display:flex}.tp-step:hover{background:var(--elev)}.tp-step.on{background:var(--elev);color:var(--fg)}.tp-step-deal{color:var(--fg-faint);font-size:12.5px;display:block}.tp-earlier{justify-content:space-between;align-items:center;gap:var(--s2) var(--s3);width:100%;max-width:720px;padding:6px 6px 6px var(--s4);border-radius:var(--radius);background:color-mix(in oklab,var(--r-l) 10%,var(--surface));border:1px solid color-mix(in oklab,var(--r-l) 30%,var(--line));color:var(--fg-soft);flex-wrap:wrap;margin-inline:auto;font-size:13.5px;display:flex}.tp-earlier b{color:var(--fg)}.tp-earlier .btn{padding:5px 12px;font-size:12.5px}.tr-row-rounds{color:var(--fg-faint);white-space:nowrap;margin-left:.35em}.tp-chain-what{flex:1;min-width:0}.tp-chain li>.tp-chain-when{padding-right:var(--s2)}.tp-chain-when{color:var(--fg-faint);font-variant-numeric:tabular-nums;font-size:12.5px}.tp-foot{justify-content:flex-end;align-items:center;gap:var(--s3);padding:var(--s3) var(--s5);border-top:1px solid var(--line);background:var(--elev);flex-wrap:wrap;flex:none;display:flex}.tp-actions{gap:var(--s2);margin-left:auto;display:flex}.tp-actions .btn{padding:11px 22px}.tp-msg{flex:220px}.tp-confirm{align-items:center;gap:var(--s3);flex-wrap:wrap;flex:1;display:flex}.tp-confirm .confirm-text{flex:300px;margin:0}.chat{flex-direction:column;flex:1;min-height:0;display:flex}.chat-feed{overscroll-behavior:contain;min-height:0;padding:var(--s4) var(--s5);gap:var(--s2);scrollbar-width:thin;scrollbar-color:var(--line2) transparent;flex-direction:column;flex:1;display:flex;overflow:auto}.chat-feed .empty{flex:1;min-height:0}.chat-feed .empty span{font-size:13.5px}.chat-feed .loading-more{margin:auto}.bubble{background:var(--elev2);overflow-wrap:anywhere;border-radius:14px 14px 14px 4px;flex-direction:column;align-self:flex-start;gap:2px;max-width:min(80%,520px);padding:9px 12px;font-size:13.5px;line-height:1.4;display:flex}.bubble.mine{background:color-mix(in oklab,var(--accent) 18%,var(--elev2));border-radius:14px 14px 4px;align-self:flex-end}.bubble time{color:var(--fg-faint);align-self:flex-end;font-size:10.5px}.chat-trade{border:1px solid var(--line2);background:var(--elev);color:var(--fg-soft);font:inherit;cursor:pointer;border-radius:999px;align-self:center;align-items:center;gap:8px;padding:7px 12px;font-size:12.5px;display:inline-flex}.chat-trade:hover{color:var(--fg);border-color:var(--fg-soft)}.chat-trade svg{width:14px;height:14px}.chat-form{gap:var(--s2);padding:var(--s3) var(--s5);border-top:1px solid var(--line);background:var(--elev);flex:none;display:flex}.chat-input{padding-left:14px}.chat-form .btn{padding:10px 20px}.chat-msg{padding:0 var(--s5) var(--s3);background:var(--elev)}.tm-head{align-items:center;gap:var(--s3);padding-right:var(--s6);display:flex}.tm-head h2{font:700 20px/1.2 var(--display)}.tp-sides.compact{flex:none;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:start;display:grid}.tp-sides.compact .tside{flex:initial;width:auto}.tp-sides.compact .tside>*{margin-block:0}.tp-sides.compact .tm-verdict{align-self:center}.tside-sum{align-items:baseline;gap:4px var(--s2);color:var(--fg-soft);flex-wrap:wrap;font-size:13px;display:flex}.tside-sum b{color:var(--fg)}.tside-rar{flex-wrap:wrap;gap:4px;margin-left:auto;display:flex}.tside-rar span{font:700 11px/1.6 var(--body);color:var(--rc);background:color-mix(in oklab,var(--rc) 14%,transparent);font-variant-numeric:tabular-nums;border-radius:999px;padding:1px 7px}.tside-minis{gap:var(--s3) var(--s2);overscroll-behavior:contain;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));max-height:min(62dvh,640px);padding:2px 4px 2px 0;display:grid;overflow-y:auto}.tmini{min-width:0;color:inherit;font:inherit;text-align:left;cursor:pointer;background:0 0;border:none;flex-direction:column;gap:3px;padding:0;display:flex}.tmini .cthumb{aspect-ratio:5/6;border-radius:10px;width:100%;height:auto;transition:transform .15s,box-shadow .15s}.tmini:hover .cthumb{transform:translateY(-2px);box-shadow:0 8px 18px -10px #000}.tmini-t{text-overflow:ellipsis;white-space:nowrap;font-size:12px;font-weight:600;line-height:1.25;overflow:hidden}.tmini-v{min-height:1.2em;color:var(--r-l);font-variant-numeric:tabular-nums;font-size:11px}.tmini-more{grid-column:1/-1;height:1px}@media (width<=900px){.tp-sides.compact{grid-template-columns:minmax(0,1fr)}.tside-minis{grid-template-columns:repeat(4,minmax(0,1fr));max-height:none;overflow:visible}.tmini-t{font-size:11px}}.tmini-all{justify-content:center;width:100%}.tr-more{height:1px}.tp-fold{padding:4px 0 4px 22px}.tp-fold .link-btn{color:var(--accent);font-size:12.5px;font-weight:600}.tr-find{gap:var(--s2);padding:var(--s3) var(--s3) var(--s2);border-bottom:1px solid var(--line);flex-direction:column;display:flex}.tr-find>.search-wrap{flex:none}.tr-find-row{gap:var(--s2);min-width:0;display:flex}.tr-find-row .tr-who{flex:1;min-width:0}.tr-who select{white-space:nowrap;text-overflow:ellipsis;width:100%;min-width:0;overflow:hidden}@media (width>=1000px){.main:has(>.view>.pulls>.pull-ready){height:100dvh}.view:has(>.pulls>.pull-ready){min-height:0;padding-block:var(--s4) var(--s5);flex-direction:column;flex:1;display:flex}.pulls:has(>.pull-ready){flex-direction:column;flex:1;min-height:0;display:flex}.pull-ready{gap:var(--s4);flex:1;min-height:0}.pull-ready .booster-stage{flex:1;min-height:0}.pull-ready .booster{width:auto;height:100%;min-height:180px;max-height:620px}.main:has(>.view>.pulls>.reveal){height:100dvh}.view:has(>.pulls>.reveal){min-height:0;padding-block:var(--s4) var(--s5);flex-direction:column;flex:1;display:flex}.pulls:has(>.reveal){flex-direction:column;flex:1;min-height:0;display:flex}.reveal:not(.reveal-all){gap:var(--s4);flex:1;min-height:0}.reveal:not(.reveal-all) .stage{aspect-ratio:5/7;flex:1 1 0;width:auto;max-width:520px;min-height:200px;max-height:728px}.main:has(.tr-split){height:100dvh}.view:has(>.tr-split){min-height:0;padding-top:var(--s4);flex-direction:column;flex:1;max-width:2200px;padding-bottom:72px;display:flex}.tr-head{margin-bottom:var(--s3);flex-wrap:nowrap}.tr-head>div{align-items:baseline;gap:4px var(--s3);flex-wrap:wrap;min-width:0;display:flex}.tr-head h1{font-size:clamp(22px,2vw,28px)}.tr-head .meta{margin:0}.tr-head .btn{padding:10px 20px}.tr-split{grid-template-columns:var(--tr-list) minmax(0,1fr);--tr-list:300px;flex:1;min-height:0}.tr-col{min-height:0}.tr-rows{flex:1;min-height:0}.tr-col-empty .tr-empty{display:none}.tr-col-none{display:block}.tp-back{display:none}}@media (width>=1280px){.tr-split{--tr-list:clamp(340px,24vw,380px)}}@media (width<=999.98px){.tr-pane{display:none}.tr-split.reading .tr-pane{z-index:2147483600;border:0;border-radius:0;animation:.15s fade;display:flex;position:fixed;inset:0}.tr-col-empty{display:flex}.tr-split:not(.reading) .tr-row.on{background:0 0;border-color:#0000}.tr-split:not(.reading) .tr-row.on:before{display:none}.tp-foot,.chat-form{padding-bottom:calc(var(--s3) + env(safe-area-inset-bottom))}}@media (width<=560px){.tr-head .btn{justify-content:center;width:100%}}@container tpane (width<=560px){.tp-head{padding:var(--s3) var(--s4);flex-wrap:wrap}.tp-mode{flex:100%;order:4;display:flex}.tp-mode button{flex:1;justify-content:center}.tp-foot{padding-inline:var(--s4)}.chat-feed{padding:var(--s4)}.chat-form{padding-inline:var(--s4)}}@container tpane (width<=520px){.tp-title h2{font-size:17px}.tp-actions{flex:1}.tp-actions .btn{padding-inline:var(--s2);flex:1}.tp-confirm .af-actions,.tp-confirm .tp-actions{flex:100%}}@media (prefers-reduced-motion:reduce){.tr-split.reading .tr-pane{animation:none}}.modal.composer{text-align:left;grid-template:\"pick head\"\"pick offer\"minmax(0,1fr)/minmax(0,1fr) clamp(340px,26vw,440px);place-items:stretch stretch;gap:0;max-width:min(2000px,96vw);height:94dvh;max-height:none;padding:0;overflow:hidden}.modal.composer.pick-friend{max-width:560px;height:auto;max-height:calc(100dvh - 2 * var(--s4));padding:var(--s6);gap:var(--s4);flex-direction:column;align-items:stretch;display:flex;overflow:auto}.composer:not(.pick-friend)>.tm-head{padding:var(--s4) var(--s7) var(--s3) var(--s4);border-left:1px solid var(--line);background:var(--elev);grid-area:head}.composer:not(.pick-friend)>.tm-head h2{text-overflow:ellipsis;white-space:nowrap;min-width:0;font-size:17px;overflow:hidden}.composer-sub{color:var(--fg-soft);margin-top:calc(-1 * var(--s2));font-size:14px}.composer-pick{min-width:0;min-height:0;padding:var(--s4) var(--s4) 0 var(--s5);flex-direction:column;grid-area:pick;display:flex}.composer-tab{flex-direction:column;flex:1;min-height:0;display:flex}.composer-tab[hidden]{display:none}.composer-tabs{flex:none;align-self:center;margin:0}.composer-tabs button{white-space:nowrap;align-items:center;padding:8px 14px;display:inline-flex}.composer-tabs button.on .tab-n{background:color-mix(in oklab,var(--accent-ink) 22%,transparent);color:var(--accent-ink)}.picker{gap:var(--s3);flex-direction:column;flex:1;min-height:0;display:flex;container-type:inline-size}.picker>*{flex:none}.picker-bar{align-items:center;gap:var(--s2);min-width:0;display:flex}.picker-bar .search-wrap{flex:160px;min-width:140px;max-width:420px}.picker-bar .isel{flex:none;margin-left:auto}[data-fade-axis]{--fade-to:to right;--fade:40px}[data-fade-axis=y]{--fade-to:to bottom;--fade:48px}[data-fade=end]{-webkit-mask-image:linear-gradient(var(--fade-to),#000 calc(100% - var(--fade)),transparent);mask-image:linear-gradient(var(--fade-to),#000 calc(100% - var(--fade)),transparent)}[data-fade=start]{-webkit-mask-image:linear-gradient(var(--fade-to),transparent,#000 var(--fade));mask-image:linear-gradient(var(--fade-to),transparent,#000 var(--fade))}[data-fade=both]{-webkit-mask-image:linear-gradient(var(--fade-to),transparent,#000 var(--fade),#000 calc(100% - var(--fade)),transparent);mask-image:linear-gradient(var(--fade-to),transparent,#000 var(--fade),#000 calc(100% - var(--fade)),transparent)}.picker-chips{scrollbar-width:none;min-width:0;scroll-padding-inline:var(--s5);flex-wrap:nowrap;flex:0 auto;gap:6px;overflow-x:auto}.picker-chips::-webkit-scrollbar{display:none}.picker-chips .rl{white-space:nowrap;flex:none;padding:8px 11px}.rl-code,.picker-chips.compact .rl-full{display:none}.picker-chips.compact .rl-code{display:inline}.picker-bar:has(>.picker-chips.wrap){row-gap:var(--s2);flex-wrap:wrap}.picker-chips.wrap{flex:100%;order:3}.picker-chips.wrap.compact{gap:4px}.picker-chips.wrap.compact .rl{flex:1 0 auto;justify-content:center;gap:5px;padding:8px 6px}@container (width<=720px){.picker-chips.wrap{flex:55%}.picker-bar .isel{order:4}}.picker-scroll{scrollbar-width:thin;scrollbar-color:var(--line2) transparent;min-height:0;padding:6px 8px var(--s5) 4px;gap:var(--s4);flex-direction:column;flex:1;margin-left:-4px;display:flex;overflow:auto}.picker-grid{gap:var(--s4);grid-template-columns:repeat(auto-fill,minmax(168px,1fr))}.picker-grid .empty{grid-column:1/-1;min-height:260px}.picker-more{align-items:center;gap:var(--s2);flex-direction:column;display:flex}.picker .card-btn.picking .wc{opacity:1}.picker .pick-overlay.on{box-shadow:none;background:color-mix(in oklab,var(--accent) 10%,transparent);border-color:#0000}.picker .card-btn.picked .wc{border-color:var(--rc);box-shadow:0 0 0 2px var(--rc),0 0 34px -4px color-mix(in oklab,var(--rc) 80%,transparent)}.card-btn:disabled{opacity:.35;cursor:not-allowed}.pick-lock{z-index:11;white-space:nowrap;max-width:90%;color:var(--fg);text-align:center;background:#060806d9;border-radius:999px;padding:5px 10px;font-size:11.5px;font-weight:600;line-height:1.25;position:absolute;top:42%;left:50%;transform:translate(-50%,-50%)}.offer{background:var(--elev);border-left:1px solid var(--line);flex-direction:column;grid-area:offer;min-width:0;min-height:0;display:flex}.offer-bar{display:none}.offer-panel{gap:var(--s3);min-height:0;padding:0 var(--s4) var(--s4);flex-direction:column;flex:1;display:flex}.offer-title{display:none}.offer-sides{overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--line2) transparent;gap:var(--s3);min-height:0;margin-right:calc(-1 * var(--s2));padding-right:var(--s2);scroll-padding-block:var(--fade,48px);flex-direction:column;flex:0 auto;display:flex;overflow:auto}.oside{gap:var(--s2);padding:var(--s3);border-radius:var(--radius);background:var(--surface);border:1px solid var(--line);flex-direction:column;display:flex}.oside-head{justify-content:space-between;align-items:center;gap:var(--s2);letter-spacing:.05em;text-transform:uppercase;min-width:0;color:var(--fg-soft);white-space:nowrap;font-size:11.5px;font-weight:700;display:flex}.oside-head>span:first-child{align-items:center;display:inline-flex}.oside-total{text-transform:none;letter-spacing:0;color:var(--fg);font:700 15px/1 var(--display);font-variant-numeric:tabular-nums}.oside-list{margin:0 calc(-1 * var(--s1));flex-direction:column;gap:2px;padding:0;list-style:none;display:flex}.oside-row{padding:5px var(--s1);border-radius:10px;grid-template-columns:44px minmax(0,1fr) 28px;align-items:center;gap:10px;transition:background .15s;display:grid}.oside-row:hover{background:var(--elev2)}.oside-txt{flex-direction:column;gap:3px;min-width:0;line-height:1.25;display:flex}.oside-txt b{-webkit-line-clamp:2;overflow-wrap:anywhere;-webkit-box-orient:vertical;font-size:13.5px;font-weight:600;display:-webkit-box;overflow:hidden}.oside-sub{align-items:center;gap:var(--s2);min-width:0;display:flex}.oside-cat{min-width:0;color:var(--fg-faint);text-overflow:ellipsis;white-space:nowrap;font-size:11.5px;overflow:hidden}.oside-val{color:var(--r-l);font-variant-numeric:tabular-nums;white-space:nowrap;flex:none;align-items:center;gap:5px;font-size:12.5px;font-weight:700;display:inline-flex}.oside-val:before{content:\"\";background:var(--coin);border-radius:50%;width:8px;height:8px}.oside-val.none{color:var(--fg-faint);font-weight:500}.oside-val.none:before{display:none}.oside-x{width:28px;height:28px;color:var(--fg-faint);cursor:pointer;opacity:.7;background:0 0;border:0;border-radius:8px;justify-content:center;align-items:center;transition:all .15s;display:flex}.oside-row:hover .oside-x,.oside-x:focus-visible{opacity:1}.oside-x:hover{background:var(--line);color:var(--fg)}.oside-x svg{width:13px;height:13px}.oside-hint{min-height:40px;padding:0 var(--s3);border:1px dashed var(--line2);color:var(--fg-faint);font:inherit;text-align:left;cursor:pointer;text-overflow:ellipsis;white-space:nowrap;background:0 0;border-radius:10px;align-items:center;font-size:13px;transition:all .15s;display:flex;overflow:hidden}.oside-hint:hover{color:var(--accent);border-color:color-mix(in oklab,var(--accent) 50%,var(--line2))}.oside .coins-add{align-self:flex-start;height:36px;font-size:13px}.oside .coins-field{flex:none;align-self:stretch}.cthumb{background:var(--card-bg);border:2px solid var(--rc);width:44px;height:44px;box-shadow:0 0 12px -4px color-mix(in oklab,var(--rc) 70%,transparent);border-radius:10px;flex:none;display:block;position:relative;overflow:hidden}.cthumb img{object-fit:cover;object-position:50% 22%;width:100%;height:100%;display:block}.cthumb.paper img{object-fit:contain;background:#e4e2db;padding:4px}.cthumb.art img{transform:scale(1.8)}.cthumb.art[data-r=C] img,.cthumb.art[data-r=PC] img{filter:brightness(.6)saturate(1.2)}.cthumb.shiny{box-shadow:inset 0 0 0 1px #e9c15a8c,0 0 10px #e9c15a66}.cthumb.shiny:after{content:\"\";mix-blend-mode:screen;background:linear-gradient(135deg,#0000 30%,#fff8e055 50%,#0000 70%);position:absolute;inset:0}.cthumb-r{z-index:1;background:var(--rc);color:var(--accent-ink);font:800 9px/1 var(--display);letter-spacing:.02em;border-top-right-radius:6px;padding:2px 4px 1px 3px;position:absolute;bottom:0;left:0}.offer-sum{gap:var(--s2);flex-direction:column;flex:none;display:flex}.offer .tm-verdict{min-width:0;padding:14px var(--s3);border-radius:var(--radius);background:var(--surface);border:1px solid var(--line);flex-flow:wrap;justify-content:center;align-self:stretch;gap:4px 10px}.offer .tm-verdict svg{width:18px;height:18px}.offer .tm-verdict b{font-size:15px}.offer .tm-verdict span{font:700 15px/1.2 var(--display);font-variant-numeric:tabular-nums}.offer .tm-verdict[data-k=advantage]{background:color-mix(in oklab,var(--accent) 9%,var(--surface));border-color:color-mix(in oklab,var(--accent) 35%,var(--line))}.offer .tm-verdict[data-k=disadvantage]{background:color-mix(in oklab,var(--bad) 8%,var(--surface));border-color:color-mix(in oklab,var(--bad) 32%,var(--line))}.offer-sum-empty{padding:var(--s3);border-radius:var(--radius);border:1px dashed var(--line2);color:var(--fg-faint);text-align:center;margin:0;font-size:12.5px;line-height:1.45}.offer-sum .modal-msg{text-align:center}.offer-actions{gap:var(--s2);padding-top:var(--s3);border-top:1px solid var(--line);flex:none;margin-top:auto;display:flex}.offer-actions .btn{padding:12px 14px;font-size:14px}.offer-actions .btn.primary{text-overflow:ellipsis;flex:1;min-width:0;overflow:hidden}.coins-add{flex:none}.coins-add svg,.coins-ico{width:16px;height:16px;color:var(--r-l);flex:none}.coins-field{flex:0 0 200px}.coins-field .coins-ico{pointer-events:none;position:absolute;left:12px}.coins-field .af-input{font-variant-numeric:tabular-nums;border-color:color-mix(in oklab,var(--r-l) 40%,var(--line2));height:42px;padding:0 64px 0 36px;font-weight:600}.coins-field .af-unit{right:40px}.af-input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.af-input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.af-input[type=number]{appearance:textfield}.coins-x{width:26px;height:26px;color:var(--fg-faint);cursor:pointer;background:0 0;border:0;border-radius:7px;justify-content:center;align-items:center;display:flex;position:absolute;right:8px}.coins-x:hover{background:var(--elev2);color:var(--fg)}.coins-x svg{width:13px;height:13px}@media (height<=800px) and (width>=901px){.composer:not(.pick-friend)>.tm-head{padding-top:var(--s3);padding-bottom:var(--s2)}.offer-panel{gap:var(--s2);padding-bottom:var(--s3)}.offer-sides{gap:var(--s2)}.oside{padding:10px var(--s3);gap:6px}.oside-list{gap:0}.oside-row{padding:3px var(--s1);grid-template-columns:36px minmax(0,1fr) 28px}.oside .cthumb{border-radius:8px;width:36px;height:36px}.oside-txt{gap:1px}.oside-txt b{-webkit-line-clamp:1}.oside .coins-add{height:32px}.oside .coins-field .af-input{height:36px}.oside-hint{min-height:34px}.offer .tm-verdict{padding:9px var(--s3)}.offer-actions{padding-top:var(--s2)}.offer-actions .btn{padding:10px 14px}}.friend-list{gap:var(--s3);overscroll-behavior:contain;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));max-height:min(60dvh,560px);padding:2px;display:grid;overflow-y:auto}.modal.composer.pick-friend{justify-content:flex-start}.pick-friend>*{flex:none}.pick-friend .friend-list{flex:0 auto;min-height:0}.friend-list .empty,.friend-list .loading-more{grid-column:1/-1;min-height:120px}.friend{align-items:center;gap:var(--s2);padding:var(--s4) var(--s2);border-radius:var(--radius);border:1px solid var(--line);background:var(--elev);color:var(--fg);font:inherit;cursor:pointer;flex-direction:column;transition:border-color .15s,background .15s;display:flex}.friend b{text-overflow:ellipsis;white-space:nowrap;max-width:100%;font-size:13.5px;font-weight:600;overflow:hidden}.friend:hover{border-color:var(--accent);background:var(--elev2)}@media (width<=900px){.modal.composer:not(.pick-friend){border:0;border-radius:0;grid-template:\"head\"\"pick\"minmax(0,1fr)\"offer\"/minmax(0,1fr);width:auto;max-width:none;height:auto;position:fixed;inset:0}.composer:not(.pick-friend)>.tm-head{padding:var(--s3) var(--s7) var(--s2) var(--s4);background:0 0;border-left:0}.composer:not(.pick-friend)>.modal-close{top:10px;right:10px}.composer-pick{padding:0 var(--s3)}.picker-bar{row-gap:var(--s2);flex-wrap:wrap}.composer-tabs{flex:100%;display:flex}.composer-tabs button{text-overflow:ellipsis;flex:1;justify-content:center;min-width:0;overflow:hidden}.picker-bar .search-wrap{flex:1 1 0;min-width:0}.picker-chips{flex:100%;order:3}.picker-bar .isel{order:0}.picker-chips .rl-full{display:inline}.picker-chips .rl-code{display:none}.picker-grid{gap:var(--s3);grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}.picker-scroll{padding-bottom:var(--s4)}.offer{border-left:0;border-top:1px solid var(--line2);background:var(--surface);position:relative}.offer-bar{align-items:center;gap:var(--s2);padding:var(--s2) var(--s3) calc(var(--s2) + env(safe-area-inset-bottom));display:flex}.offer-bar .btn{padding:11px 18px;font-size:14px}.offer-peek{align-items:center;gap:var(--s2);min-width:0;color:var(--fg);font:inherit;text-align:left;background:0 0;border:0;flex:1;padding:6px 4px;display:flex}.offer-peek-txt{flex-direction:column;flex:1;min-width:0;line-height:1.3;display:flex}.offer-peek-txt b{font:700 15px/1.25 var(--display);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.offer-peek-txt span{color:var(--fg-soft);text-overflow:ellipsis;white-space:nowrap;font-size:12.5px;overflow:hidden}.offer-peek-txt span[data-k=advantage]{color:var(--accent)}.offer-peek-txt span[data-k=disadvantage]{color:var(--bad)}.offer-chev{width:18px;height:18px;color:var(--fg-soft);flex:none;transition:transform .2s;transform:rotate(-90deg)}.offer.open .offer-chev{transform:rotate(90deg)}.offer-panel{max-height:calc(100dvh - 120px);padding:var(--s4);background:var(--surface);border-top:1px solid var(--line2);border-radius:var(--radius-lg) var(--radius-lg) 0 0;animation:.18s toast-in;display:none;position:absolute;bottom:100%;left:0;right:0;box-shadow:0 -24px 48px -16px #000}.offer.open .offer-panel{display:flex}.offer-title{font:700 16px/1.2 var(--display);display:block}.offer-sides{flex:0 auto}.offer-panel .offer-actions{display:none}}@media (prefers-reduced-motion:reduce){.offer-panel{animation:none}.offer-chev{transition:none}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}@media (width<=560px){.modal-backdrop{align-items:stretch;padding:0!important}.modal:not(.composer),.auc{width:100%;max-width:none;height:100dvh;max-height:none;padding-top:calc(var(--s5) + env(safe-area-inset-top));padding-bottom:calc(var(--s6) + env(safe-area-inset-bottom));border:0;border-radius:0}.modal:not(.composer)>.modal-close,.auc>.modal-close{top:calc(var(--s3) + env(safe-area-inset-top));right:var(--s3);background:color-mix(in oklab,var(--surface) 94%,transparent);border:1px solid var(--line2);border-radius:50%;place-items:center;width:40px;height:40px;display:grid;position:fixed}.modal-info,.modal-panel{justify-self:stretch;width:100%}.fact{flex:28%}.meta.lead{display:none}.coll-head>div:has(>.meta.lead){display:none}.lbl-long{display:none}}.lbl-short{display:none}@media (width<=560px){.lbl-short{display:inline}.pick-friend .friend-list{flex:auto;max-height:none}}.ach-sec-h{font:700 17px/1.2 var(--display);margin:0 0 var(--s3);align-items:baseline;gap:10px;display:flex}.ach-sec-h>span{font:500 13px var(--body);color:var(--fg-faint);font-variant-numeric:tabular-nums}.ach-sec-h .link-btn{margin-left:auto;font-size:13px}.ach-note{margin:0 0 var(--s4);color:var(--accent);background:color-mix(in oklab,var(--accent) 9%,transparent);border:1px solid color-mix(in oklab,var(--accent) 28%,transparent);border-radius:12px;padding:10px 14px;font-size:14px}.ach-note.bad{color:var(--bad);background:color-mix(in oklab,var(--bad) 8%,transparent);border-color:color-mix(in oklab,var(--bad) 30%,transparent)}.ach-note .link-btn{font-size:inherit}.fr-btn svg{width:15px;height:15px}[data-tier=bronze]{--tier:#c98a5a}[data-tier=silver]{--tier:#b9c3cc}[data-tier=gold]{--tier:#e8c93a}[data-tier=platinum]{--tier:#9fe3ff}.ach-page{max-width:1400px;margin-inline:auto}.pf-page{max-width:955px;margin-inline:auto}.ach-badge{--s:56px;--p:0;width:var(--s);height:var(--s);background:radial-gradient(closest-side,var(--elev2) 84%,transparent 86%),conic-gradient(var(--tier) calc(var(--p) * 1turn),var(--line) 0);border-radius:50%;flex:none;place-items:center;display:grid;position:relative}.ach-badge>span{font-size:calc(var(--s) * .46);line-height:1}.ach-badge[data-state=done]{box-shadow:0 0 22px -8px var(--tier)}.ach-badge[data-state=locked]>span{filter:grayscale();opacity:.4}.ach-badge[data-state=claim]{--tier:var(--r-l);box-shadow:0 0 0 4px color-mix(in oklab,var(--r-l) 18%,transparent),0 0 26px -6px var(--r-l)}.ach-hero{align-items:center;gap:var(--s5);padding:var(--s4) var(--s5);margin-bottom:var(--s4);border:1px solid var(--line);border-radius:var(--radius-lg);background:linear-gradient(180deg,var(--elev),var(--surface));grid-template-columns:auto minmax(0,1fr) auto;display:grid}.ach-ring{--p:0;background:radial-gradient(closest-side,var(--elev) 80%,transparent 81%),conic-gradient(var(--accent) calc(var(--p) * 1turn),var(--line) 0);border-radius:50%;place-items:center;width:88px;height:88px;display:grid}.ach-ring b{font:700 25px var(--display);font-variant-numeric:tabular-nums}.ach-ring small{color:var(--fg-soft);margin-left:1px;font-size:13px}.ach-medals{gap:var(--s3) var(--s5);flex-wrap:wrap;display:flex}.ach-medal{grid-template-rows:auto auto;grid-template-columns:auto auto;align-items:center;column-gap:10px;display:grid}.ach-medal i{background:radial-gradient(circle at 35% 30%,#fff9,var(--tier) 55%,color-mix(in oklab,var(--tier) 55%,#000));width:30px;height:30px;box-shadow:0 0 14px -4px var(--tier);border-radius:50%;grid-row:1/3}.ach-medal b{font:700 19px/1 var(--display);font-variant-numeric:tabular-nums}.ach-medal b small{color:var(--fg-faint);font-size:13px;font-weight:600}.ach-medal>span{color:var(--fg-soft);font-size:13px}.ach-all{align-items:center;gap:10px;display:inline-flex}.ach-all b{background:color-mix(in oklab,var(--accent-ink) 16%,transparent);font-variant-numeric:tabular-nums;border-radius:999px;padding:3px 9px}.ach-goals{margin-bottom:var(--s5)}.ach-goal-row{gap:var(--s3);grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));display:grid}.ach-goal{align-items:center;gap:var(--s3);border:1px solid var(--line);border-radius:var(--radius);background:var(--surface);padding:12px 14px;display:flex}.ach-goal-txt{min-width:0;color:var(--fg-soft);font-variant-numeric:tabular-nums;flex-direction:column;gap:2px;font-size:13.5px;display:flex}.ach-goal-txt b{font:600 15.5px var(--display);color:var(--fg)}.ach-tabs{align-items:center}.ach-tabs .tab-n{background:var(--elev2);color:var(--fg-soft)}.ach-tabs .tab-n.hot{background:var(--accent);color:var(--accent-ink)}.ach-sec{margin-bottom:var(--s6)}.ach-list{border:1px solid var(--line);border-radius:var(--radius-lg);background:var(--surface);list-style:none;overflow:hidden}.ach{align-items:center;gap:var(--s4);padding:14px var(--s4);grid-template-columns:auto minmax(0,1fr) auto;display:grid;position:relative}.ach+.ach{border-top:1px solid var(--line)}@media (width>=1280px){.ach-list{grid-template-columns:repeat(2,minmax(0,1fr));display:grid}.ach-list>.ach{border-top:1px solid var(--line)}.ach-list>.ach:nth-child(-n+2){border-top:0}.ach-list>.ach:nth-child(2n){border-left:1px solid var(--line)}}.ach-body{min-width:0}.ach h3{font:600 16.5px/1.3 var(--display);flex-wrap:wrap;align-items:center;gap:8px;display:flex}.ach p{color:var(--fg-soft);margin-top:2px;font-size:14.5px}.ach[data-state=locked] h3{color:var(--fg-soft)}.ach[data-state=locked] p{color:var(--fg-faint)}.ach-side{color:var(--fg-soft);font-variant-numeric:tabular-nums;white-space:nowrap;flex-direction:column;align-items:flex-end;gap:4px;font-size:13.5px;display:flex}.ach-count{color:var(--fg);font-weight:600}.ach-reward{color:var(--r-l);align-items:center;gap:6px;font-weight:600;display:inline-flex}.ach-reward:before{content:\"\";background:var(--coin);border-radius:50%;width:8px;height:8px}.ach-reward.got{color:var(--fg-faint);font-weight:500}.ach-reward.got:before{opacity:.5}.ach-when{align-items:center;gap:5px;display:inline-flex}.ach-when svg{width:13px;height:13px;color:var(--accent)}.ach-claim{border-radius:11px;align-items:center;gap:8px;padding:9px 16px;font-size:14px;display:inline-flex}.ach-claim b{font-variant-numeric:tabular-nums}.ach-claim .spin{width:13px;height:13px}@keyframes ach-shine{0%{background-position:-160% 0}to{background-position:260% 0}}.ach[data-state=claim]{background:linear-gradient(105deg,transparent 40%,color-mix(in oklab,var(--r-l) 10%,transparent) 50%,transparent 60%) 0 0/200% 100%, linear-gradient(90deg,color-mix(in oklab,var(--r-l) 8%,var(--surface)),var(--surface));animation:3.6s ease-in-out infinite ach-shine}.ach-new{font:700 10.5px var(--body);letter-spacing:.06em;text-transform:uppercase;color:var(--accent-ink);background:var(--accent);border-radius:999px;padding:3px 8px}.ach.fresh{animation:1.6s ease-out 2 ach-glow}@keyframes ach-glow{0%{box-shadow:inset 0 0 0 2px color-mix(in oklab,var(--accent) 60%,transparent)}to{box-shadow:inset 0 0 0 2px #0000}}@media (prefers-reduced-motion:reduce){.ach.fresh,.ach[data-state=claim]{animation:none}}.ach-empty{min-height:24vh}@keyframes ach-pop{0%{transform:scale(1)}35%{transform:scale(1.18)}to{transform:scale(1)}}@keyframes ach-sweep{0%{background:radial-gradient(closest-side,var(--elev2) 84%,transparent 86%),conic-gradient(var(--r-l) 1turn,var(--line) 0)}}@keyframes ach-rise{0%{opacity:0;transform:translateY(6px)}20%{opacity:1}to{opacity:0;transform:translateY(-26px)}}.ach.claimed .ach-badge{animation:.6s cubic-bezier(.3,1.6,.5,1) ach-pop,.9s ease-out ach-sweep}.ach-gain{right:var(--s4);font:700 18px var(--display);color:var(--r-l);text-shadow:0 0 14px color-mix(in oklab,var(--r-l) 60%,transparent);pointer-events:none;animation:1.6s ease-out forwards ach-rise;position:absolute;top:8px}@media (prefers-reduced-motion:reduce){.ach.claimed .ach-badge,.ach-gain{animation:none}.ach-gain{display:none}}.fr-head-acts{gap:var(--s2);flex-wrap:wrap;display:flex}.fr-head-btn{align-items:center;gap:8px;padding:11px 18px;font-size:14.5px;display:inline-flex}.fr-meta-req{color:var(--bad);font-weight:600}.fr-page{width:100%}.fr-split{gap:var(--s4);grid-template-columns:minmax(0,1fr);display:grid}.fr-side,.fr-detail{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-lg);min-width:0}.fr-side{flex-direction:column;display:flex;overflow:hidden}.fr-side-search{padding:var(--s3)}.fr-side-search .search-wrap{max-width:none}.fr-side-scroll{overscroll-behavior:contain;min-height:0;padding:0 var(--s2) var(--s3);scrollbar-width:thin;flex:1;overflow:auto}.fr-side-h{font:600 12px var(--body);letter-spacing:.06em;text-transform:uppercase;color:var(--fg-faint);cursor:default;align-items:center;gap:8px;padding:12px 8px 6px;list-style:none;display:flex}.fr-side-h .link-btn{text-transform:none;letter-spacing:0;margin-left:auto;font-size:12.5px}.fr-count{background:var(--elev2);min-width:20px;height:20px;color:var(--fg-soft);font:600 11.5px var(--body);letter-spacing:0;border-radius:999px;place-items:center;padding:0 6px;display:inline-grid}.fr-reqs{margin:0 0 var(--s2);background:color-mix(in oklab,var(--accent) 7%,transparent);border:1px solid color-mix(in oklab,var(--accent) 30%,var(--line));border-radius:14px;padding:2px 6px 6px}.fr-reqs .fr-side-h{color:var(--accent)}.fr-req{align-items:center;gap:10px;padding:8px;display:flex}.fr-req-name{flex-direction:column;flex:1;min-width:0;display:flex}.fr-req-name b{text-overflow:ellipsis;white-space:nowrap;font-size:15px;overflow:hidden}.fr-req-name small{color:var(--fg-soft);font-size:13px}.fr-items{flex-direction:column;gap:2px;list-style:none;display:flex}.fr-item{width:100%;color:var(--fg);text-align:left;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;padding:9px 10px;transition:background .12s;display:flex}.fr-item:hover{background:var(--elev)}.fr-item.on{background:var(--elev2)}.fr-item-txt{flex-direction:column;align-items:flex-start;gap:3px;min-width:0;display:flex}.fr-item-txt b{text-overflow:ellipsis;white-space:nowrap;max-width:100%;font-size:15.5px;font-weight:600;overflow:hidden}.fr-waiting{font:600 12.5px var(--body);color:var(--fg-soft);background:var(--elev2);white-space:nowrap;border-radius:999px;padding:2px 9px;display:inline-block}.fr-waiting.answer{color:var(--accent-ink);background:var(--accent)}.fr-hint{color:var(--fg-soft);margin:var(--s2) 0;font-size:14px}.fr-hint .spin{vertical-align:-2px;width:12px;height:12px}.fr-pad{padding:4px 8px;list-style:none}.fr-more{height:1px}.fr-sent summary{cursor:pointer}.fr-sent summary::-webkit-details-marker{display:none}.fr-sent summary:after{content:\"\";border-bottom:1.5px solid;border-right:1.5px solid;width:7px;height:7px;margin-left:auto;transition:transform .15s;transform:rotate(45deg)translateY(-2px)}.fr-sent[open] summary:after{transform:rotate(225deg)}.fr-btn{border-radius:10px;align-items:center;gap:7px;padding:8px 14px;font-size:13.5px;display:inline-flex}.fr-btn .spin{width:13px;height:13px}.fr-act{background:var(--elev2);width:34px;height:34px;color:var(--fg-soft);border:0;border-radius:50%;flex:none;place-items:center;transition:all .12s;display:grid}.fr-act svg{width:15px;height:15px}.fr-act:hover{color:var(--fg);background:var(--line2)}.fr-act.yes{background:var(--accent);color:var(--accent-ink)}.fr-act.yes:hover{filter:brightness(1.08);background:var(--accent);color:var(--accent-ink)}.fr-detail{gap:var(--s4);padding:var(--s5);overscroll-behavior:contain;background:linear-gradient(180deg,var(--elev),var(--surface) 220px);flex-direction:column;display:flex;overflow:auto}.fr-back{color:var(--fg-soft);font:600 14px var(--body);background:0 0;border:0;align-self:flex-start;align-items:center;gap:6px;padding:4px 0;display:none}.fr-back svg{width:16px;height:16px}.fr-id{align-items:center;gap:var(--s4);color:inherit;border-radius:14px;align-self:flex-start;display:flex}.fr-id:hover h2{text-underline-offset:5px;text-decoration:underline;text-decoration-thickness:2px}.fr-id-txt{min-width:0}.fr-id h2{font:700 clamp(24px,2.4vw,30px)/1.15 var(--display);letter-spacing:-.02em;overflow-wrap:anywhere}.fr-id p{color:var(--fg-soft);margin-top:4px;font-size:14.5px}.fr-id-acts{gap:var(--s2);flex-wrap:wrap;display:flex}.fr-id-acts .btn{align-items:center;gap:8px;padding:11px 20px;font-size:15px;display:inline-flex}.fr-box{padding:var(--s4);border:1px solid var(--line);border-radius:var(--radius);background:var(--bg);text-align:left;color:var(--fg);flex-direction:column;gap:6px;display:flex}.fr-box h3{font:600 15px var(--display);align-items:center;gap:8px;margin-bottom:4px;display:flex}.fr-offer{border:0;border-top:1px solid var(--line);color:var(--fg);text-align:left;background:0 0;border-radius:0;align-items:center;gap:12px;padding:10px 6px;transition:background .12s;display:flex}.fr-offer:first-of-type{border-top:0}.fr-offer:hover{background:var(--elev)}.fr-mini{flex:none;padding-right:6px;display:flex}.fr-mini i{border:2px solid var(--rc);background:linear-gradient(160deg,color-mix(in oklab,var(--rc) 30%,var(--elev)),var(--surface));border-radius:5px;width:22px;height:30px;margin-right:-8px}.fr-offer-txt{flex-direction:column;flex:1;min-width:0;display:flex}.fr-offer-txt b{font-size:15px;font-weight:600}.fr-offer-txt small{color:var(--fg-soft);font-size:13px}.fr-msg{cursor:pointer;transition:border-color .15s}.fr-msg:hover{border-color:var(--line2)}.fr-msg p{color:var(--fg);-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:15px;display:-webkit-box;overflow:hidden}.fr-msg small{color:var(--fg-soft);font-size:13px}.fr-cards{gap:var(--s3);grid-template-columns:repeat(4,minmax(0,1fr));margin-top:4px;display:grid}.fr-box-link{font:600 13.5px var(--body);margin-left:auto}.fr-box .link-btn{align-self:flex-start;font-size:14px}.fr-pick{min-height:40vh}.fr-pick svg{width:36px;height:36px;color:var(--fg-faint)}.modal.fr-chat{max-width:600px;height:min(720px,calc(100dvh - 2 * var(--s4)));flex-direction:column;align-items:stretch;gap:0;padding:0;display:flex;overflow:hidden}.fr-chat>.tm-head{padding:var(--s3) var(--s7) var(--s3) var(--s5);border-bottom:1px solid var(--line);background:var(--elev)}@media (width>=1000px){.main:has(.fr-page){height:100dvh}.view:has(>.fr-page){flex-direction:column;flex:1;max-width:2200px;min-height:0;padding-bottom:72px;display:flex}.fr-page{flex-direction:column;flex:1;min-height:0;display:flex}.fr-split{flex:1;grid-template-columns:minmax(300px,1fr) minmax(0,1.618fr);min-height:0}.fr-side{min-height:0}}@media (width<=999.98px){.fr-detail{display:none}.fr-split.reading .fr-detail{z-index:2147483600;padding:var(--s4);padding-top:calc(var(--s4) + env(safe-area-inset-top));border:0;border-radius:0;animation:.15s fade;display:flex;position:fixed;inset:0}.fr-back{display:inline-flex}.fr-id-acts .btn{white-space:nowrap;flex:1 1 0;justify-content:center;padding:11px 12px}.fr-id-acts .btn.primary{flex-basis:100%}.fr-cards{grid-template-columns:repeat(2,minmax(0,1fr))}.fr-split:not(.reading) .fr-item.on{background:0 0}}@media (prefers-reduced-motion:reduce){.fr-split.reading .fr-detail{animation:none}}.pf-hero{align-items:center;gap:var(--s5);padding:var(--s5);margin-bottom:var(--s3);border:1px solid var(--line);border-radius:var(--radius-lg);background:linear-gradient(180deg,var(--elev),var(--surface));flex-wrap:wrap;display:flex}.pf-avatar{background:0 0;border:0;border-radius:50%;flex:none;padding:0;position:relative}.pf-avatar .avatar{box-shadow:0 0 0 3px var(--surface),0 0 0 4px var(--line2);font-size:36px}.pf-avatar-edit{background:var(--accent);width:30px;height:30px;color:var(--accent-ink);box-shadow:0 0 0 3px var(--surface);border-radius:50%;place-items:center;transition:transform .15s;display:grid;position:absolute;bottom:-2px;right:-2px}.pf-avatar-edit svg{width:15px;height:15px}.pf-avatar:hover .pf-avatar-edit{transform:scale(1.08)}.pf-id{flex:220px;min-width:0}.pf-id h1{align-items:center;gap:var(--s3);font:700 clamp(24px,2.6vw,32px)/1.15 var(--display);letter-spacing:-.02em;overflow-wrap:anywhere;display:flex}.pf-id .meta{color:var(--fg-soft);margin-top:6px;font-size:14px}.pf-vis{align-items:center;gap:var(--s3);background:var(--bg);border:1px solid var(--line);border-radius:14px;padding:12px 14px;display:flex}.pf-vis>div{flex-direction:column;display:flex}.pf-vis b{font-size:14px}.pf-vis span{color:var(--fg-faint);font-size:12px}.pf-vis .snd-switch{flex:none}.pf-stats{gap:var(--s2);margin-bottom:var(--s6);grid-template-columns:repeat(4,minmax(0,1fr));display:grid}.pf-stat{border-radius:var(--radius);border:1px solid var(--line);background:var(--surface);color:var(--fg-soft);text-align:left;flex-direction:column;align-items:flex-start;gap:4px;padding:14px 16px;font-size:12.5px;transition:all .15s;display:flex}.pf-stat:hover{border-color:var(--line2);background:var(--elev);color:var(--fg)}.pf-stat b{font:700 22px var(--display);color:var(--fg);font-variant-numeric:tabular-nums}.pf-stat b small{color:var(--fg-faint);font-size:14px;font-weight:600}.pf-stat em{color:var(--r-l);font-size:11.5px;font-style:normal;font-weight:600}.pf-public{color:var(--accent);font-weight:500}.pf-public:hover{text-underline-offset:3px;text-decoration:underline}.pf-coll{gap:var(--s3);margin-bottom:var(--s6);flex-direction:column;display:flex}.pf-coll .ach-sec-h{margin:0}.pf-bar{gap:3px;height:8px;display:flex}.pf-bar span{background:var(--rc);border-radius:999px;flex:1 1 0;min-width:4px}.pf-counts{gap:var(--s2) var(--s4);flex-wrap:wrap;display:flex}.pf-count{color:var(--fg-soft);align-items:center;gap:7px;font-size:13px;display:inline-flex}.pf-count i{background:var(--rc);border-radius:3px;width:9px;height:9px}.pf-count b{color:var(--fg);font-variant-numeric:tabular-nums}.pf-shelf{margin-bottom:var(--s6)}.pf-gallery{margin-bottom:var(--s5)}.pf-gname{margin-bottom:var(--s2);color:var(--fg-soft);font:600 14px var(--display);background:0 0;border:0;align-items:center;gap:8px;padding:4px 0;display:inline-flex}.pf-gname svg{opacity:0;width:13px;height:13px;transition:opacity .15s}.pf-gname:hover{color:var(--fg)}.pf-gname:hover svg,.pf-gname:focus-visible svg{opacity:.8}.pf-gname-in{margin-bottom:var(--s2);background:var(--elev);border:1px solid var(--accent);color:var(--fg);font:600 14px var(--display);border-radius:8px;width:min(320px,100%);padding:5px 10px}.pf-places,.pf-best-grid{gap:var(--s4);grid-template-columns:repeat(4,minmax(0,1fr));display:grid}.pf-gtitle{font:600 14px var(--display);color:var(--fg-soft);margin-bottom:var(--s2)}.pf-none{padding:var(--s5);border:1px dashed var(--line2);border-radius:var(--radius);color:var(--fg-soft);text-align:center;font-size:14.5px}.pf-best{margin-bottom:var(--s6)}.pf-sec-link{margin-left:auto;font-size:13.5px}.pf-stats-3{grid-template-columns:repeat(3,minmax(0,1fr))}.pf-stats-3 .pf-stat{cursor:default}.pf-stats-3 .pf-stat:hover{background:var(--surface);border-color:var(--line);color:var(--fg-soft)}.pf-avatar-static{border-radius:50%;flex:none}.pf-avatar-static .avatar{box-shadow:0 0 0 3px var(--surface),0 0 0 4px var(--line2);font-size:36px}.pf-seen{align-items:center;gap:6px;display:inline-flex}.pf-seen i{background:var(--fg-faint);border-radius:50%;width:8px;height:8px}.pf-seen.on{color:var(--accent)}.pf-seen.on i{background:var(--accent);box-shadow:0 0 0 3px color-mix(in oklab,var(--accent) 22%,transparent)}.pf-acts{align-items:center;gap:var(--s2);flex-wrap:wrap;display:flex}.pf-acts .btn{align-items:center;gap:8px;padding:11px 18px;font-size:14.5px;display:inline-flex}.pf-sent{color:var(--accent);padding-right:var(--s2);align-items:center;gap:6px;font-size:14px;font-weight:600;display:inline-flex}.pf-sent svg{width:15px;height:15px}.pf-own{margin:0 0 var(--s4);border:1px solid var(--line);background:var(--surface);color:var(--fg-soft);border-radius:12px;flex-wrap:wrap;align-items:center;gap:6px 12px;padding:10px 14px;font-size:14px;display:flex}.pf-own .link-btn{font-size:14px}.pf-private{text-align:center;padding:var(--s7) var(--s5);margin-bottom:var(--s6);border:1px solid var(--line);border-radius:var(--radius-lg);background:radial-gradient(ellipse at 50% 0,var(--elev),var(--surface) 70%);flex-direction:column;align-items:center;gap:10px;display:flex}.pf-lock{background:var(--elev2);width:56px;height:56px;color:var(--fg-soft);box-shadow:inset 0 0 0 1px var(--line2);border-radius:50%;place-items:center;display:grid}.pf-lock svg{width:24px;height:24px}.pf-private b{font:700 19px var(--display)}.pf-private p{max-width:46ch;color:var(--fg-soft);font-size:14.5px}.pf-place{position:relative}.pf-remove{z-index:12;border:1px solid var(--line2);background:var(--elev2);width:28px;height:28px;color:var(--fg-soft);opacity:0;border-radius:50%;place-items:center;transition:opacity .15s,color .15s;display:grid;position:absolute;top:-8px;right:-8px}.pf-remove svg{width:13px;height:13px}.pf-remove:hover{color:var(--bad);border-color:var(--bad)}.pf-place:hover .pf-remove,.pf-remove:focus-visible{opacity:1}@media (hover:none){.pf-remove{opacity:1}}.pf-empty{aspect-ratio:63/88;border:1px dashed var(--line2);border-radius:var(--radius);background:color-mix(in oklab,var(--surface) 60%,transparent);color:var(--fg-faint);flex-direction:column;justify-content:center;align-items:center;gap:10px;font-size:12.5px;transition:all .15s;display:flex}.pf-plus{border:1px solid var(--line2);border-radius:50%;place-items:center;width:34px;height:34px;transition:all .15s;display:grid}.pf-plus:before{content:\"+\";font:300 22px/1 var(--body)}.pf-empty:hover{border-color:var(--accent);color:var(--accent);background:color-mix(in oklab,var(--accent) 5%,transparent)}.pf-empty:hover .pf-plus{border-color:var(--accent)}.modal.pf-pick{max-width:min(1200px,96vw);height:min(900px,calc(100dvh - 2 * var(--s4)));padding:var(--s5);align-items:stretch;gap:var(--s4);flex-direction:column;display:flex;overflow:hidden}.pf-pick-head{align-items:baseline;gap:var(--s3);padding-right:var(--s6);display:flex}.pf-pick-head h2{font:700 20px var(--display)}.pf-pick-head span{color:var(--fg-faint);font-size:13.5px}.modal.pf-frame{max-width:420px;padding:var(--s6) var(--s5) var(--s5);align-items:center;gap:var(--s3);text-align:center;flex-direction:column;display:flex}.pf-frame h2{font:700 20px var(--display)}.pf-crop{aspect-ratio:1;cursor:grab;touch-action:none;width:min(240px,70vw);box-shadow:0 0 0 4px var(--elev2),0 0 0 5px var(--line2);border-radius:50%;overflow:hidden}.pf-crop:active{cursor:grabbing}.pf-crop img{object-fit:cover;pointer-events:none;-webkit-user-select:none;user-select:none;width:100%;height:100%}.pf-frame-small{align-items:center;gap:var(--s3);display:flex}.pf-frame-acts{justify-content:center;gap:var(--s2);margin-top:var(--s2);flex-wrap:wrap;display:flex}.pf-frame-acts .btn{padding:11px 20px;font-size:14px}@media (width<=700px){.ach-hero{padding:var(--s4);gap:var(--s3) var(--s4);grid-template-columns:auto minmax(0,1fr)}.ach-ring{width:72px;height:72px}.ach-ring b{font-size:21px}.ach-medals{gap:var(--s3) var(--s4)}.ach-all{grid-column:1/-1;justify-content:center}.ach{gap:var(--s3);grid-template-columns:auto minmax(0,1fr);padding:12px}.ach-side{align-items:center;gap:var(--s3);flex-direction:row;grid-column:2}.pf-hero{padding:var(--s4);gap:var(--s4)}.pf-vis{justify-content:space-between;width:100%}.pf-places,.pf-best-grid{gap:var(--s3);grid-template-columns:repeat(2,minmax(0,1fr))}.pf-stats.pf-stats-3{grid-template-columns:repeat(3,minmax(0,1fr))}.pf-acts{width:100%}.pf-acts .btn{flex:1 1 0;justify-content:center;padding:11px 12px}.pf-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.modal.pf-pick{padding:var(--s4)}}";
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
			style.textContent = styles_default;
			shadow.appendChild(style);
			const root = document.createElement("div");
			root.id = "wm-app-root";
			shadow.appendChild(root);
			hideStyle = document.createElement("style");
			hideStyle.id = "wm-hide-real";
			hideStyle.textContent = "html,body{margin:0;background:#0C0D0C}body>*:not(#wm-host):not(#wm-switch){display:none !important}@media(max-width:900px){html body #wm-switch{display:none}}";
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
		function swapIcon() {
			const NS = "http://www.w3.org/2000/svg";
			const svg = document.createElementNS(NS, "svg"), path = document.createElementNS(NS, "path");
			for (const [k, v] of Object.entries({
				viewBox: "0 0 24 24",
				width: 15,
				height: 15,
				fill: "none",
				stroke: "currentColor",
				"stroke-width": 2,
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"aria-hidden": "true"
			})) svg.setAttribute(k, v);
			path.setAttribute("d", "M7 4L3 8l4 4M3 8h13M17 20l4-4-4-4M21 16H8");
			svg.append(path);
			return svg;
		}
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
			const label = document.createElement("span");
			label.textContent = remastered ? "Site original" : "Remaster";
			switchBtn.replaceChildren(swapIcon(), label);
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
