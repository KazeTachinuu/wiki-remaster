// ==UserScript==
// @name         wiki-remaster
// @namespace    hugo.wikimasters
// @version      0.1.0
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
	var isReal = /(^|\.)wiki-masters\.com$/.test(location.hostname);
	var RNAME = {
		C: "Commun",
		PC: "Peu Commun",
		R: "Rare",
		SR: "Super Rare",
		UR: "Ultra Rare",
		L: "Légendaire"
	};
	var NTYPE = {
		marketplace_wishlist_listed: "Liste de souhaits",
		marketplace_auction_sold: "Carte vendue",
		marketplace_auction_unsold: "Enchère non vendue",
		marketplace_outbid: "Enchère dépassée",
		auction_midpoint_nudge: "Enchère sans mise",
		battle_invite: "Nouveau défi",
		friend_request: "Demande d'ami",
		guild_invite: "Invitation de guilde",
		custom: "Message"
	};
	function notifHref(n) {
		const d = n.data || {};
		if (/^marketplace_/.test(n.type) && (d.auction_id || n.auction_id)) return `/marketplace/${d.auction_id || n.auction_id}`;
		if (n.type === "battle_invite" && d.battle_id) return `/battle`;
		if (n.type === "friend_request") return `/friends`;
		if (n.type === "guild_invite") return `/guild`;
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
	function nAuction(a) {
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
			status: a.status || "active",
			endAt: a.end_at || null,
			createdAt: a.created_at || null,
			seller: a.seller?.username || null,
			currentBidderId: a.current_bidder_id ?? null,
			owned: !!a.owned
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
	var json = (p, opts) => fetch(p, {
		credentials: "include",
		...opts
	}).then((r) => {
		if (!r.ok) throw new Error(p + " -> " + r.status);
		return r.json();
	});
	var postJson = (p, body) => json(p, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(body)
	});
	var capturedProfile = null;
	var localEpoch = 0;
	var origFetch = null;
	var syncReq = null;
	var sbBase = null;
	var sbHeaders = null;
	var sbUserId = null;
	function headerVal(init, name) {
		const h = init && init.headers;
		if (!h) return null;
		if (typeof h.get === "function") return h.get(name);
		if (Array.isArray(h)) {
			const f = h.find(([k]) => String(k).toLowerCase() === name);
			return f ? f[1] : null;
		}
		for (const k in h) if (String(k).toLowerCase() === name) return h[k];
		return null;
	}
	async function refreshProfile() {
		if (!origFetch) return null;
		try {
			let res;
			if (sbBase && sbHeaders && sbUserId) res = await origFetch.call(window, `${sbBase}/rest/v1/rpc/sync_profile_packs`, {
				method: "POST",
				headers: {
					...sbHeaders,
					"content-type": "application/json"
				},
				body: JSON.stringify({ user_id: sbUserId })
			});
			else if (syncReq) res = await origFetch.call(window, syncReq.url, syncReq.init);
			else return null;
			const j = await res.json();
			if (j && typeof j === "object") {
				capturedProfile = {
					...capturedProfile || {},
					...j
				};
				window.dispatchEvent(new Event("wm:profile"));
				return j;
			}
		} catch {}
		return null;
	}
	function initCapture() {
		if (!isReal || typeof window === "undefined") return;
		const orig = window.fetch;
		origFetch = orig;
		window.fetch = function(...args) {
			const ret = orig.apply(window, args);
			try {
				const url = typeof args[0] === "string" ? args[0] : args[0] && args[0].url;
				if (url && url.includes(".supabase.co/rest/v1/") && args[1]) try {
					if (!sbBase) sbBase = new URL(url).origin;
					const apikey = headerVal(args[1], "apikey");
					const auth = headerVal(args[1], "authorization");
					if (apikey && auth) sbHeaders = {
						apikey,
						authorization: auth
					};
					const m = url.match(/(?:^|[?&])(?:id|user_id)=eq\.([0-9a-f-]{36})/i);
					if (m) sbUserId = m[1];
				} catch {}
				if (url && url.includes("/rpc/sync_profile_packs")) {
					if (typeof args[0] === "string" && args[1]) syncReq = {
						url: args[0],
						init: args[1]
					};
					const issuedEpoch = localEpoch;
					ret.then((res) => res.clone().json().then((j) => {
						if (localEpoch !== issuedEpoch) return;
						capturedProfile = {
							...capturedProfile || {},
							...j
						};
						window.dispatchEvent(new Event("wm:profile"));
					}).catch(() => {})).catch(() => {});
				}
				if (url && url.includes("/rest/v1/profiles")) ret.then((res) => res.clone().json().then((j) => {
					const row = Array.isArray(j) ? j[0] : j;
					if (row && typeof row.is_pro !== "undefined") {
						capturedProfile = {
							...capturedProfile || {},
							is_pro: row.is_pro
						};
						window.dispatchEvent(new Event("wm:profile"));
					}
				}).catch(() => {})).catch(() => {});
			} catch {}
			return ret;
		};
	}
	var MockData = {
		isReal: false,
		canReset: true,
		async profile() {
			const p = await json("/api/profile");
			return {
				username: p.username,
				packs_remaining: p.packs_remaining,
				pack_cap: p.pack_cap,
				currency: p.currency_balance,
				next_regen_seconds: p.next_regen_seconds,
				is_pro: !!p.is_pro
			};
		},
		async openPack() {
			const d = await json("/api/packs/open", { method: "POST" });
			if (d.error) throw new Error(d.error);
			return {
				cards: d.cards.map((c) => ({
					...nCard(c),
					is_new: c.is_new,
					is_shiny: c.is_shiny
				})),
				packs_remaining: d.packs_remaining,
				currency: d.currency_balance
			};
		},
		async collection(opts = {}) {
			const d = await json("/api/my-collection");
			const items = d.collection.map((it) => {
				const card = nCard(it.card);
				return {
					id: it.id,
					card,
					count: it.count,
					is_shiny: it.is_shiny,
					starred: it.starred,
					obtained_at: it.obtained_at || null,
					_s: normSearch(card.title + " " + (card.category || ""))
				};
			});
			const stats = {
				...d.stats,
				loading: false
			};
			opts.onPartial?.({
				items: items.slice(),
				stats
			});
			return {
				items,
				stats
			};
		},
		async cards() {
			return { cards: (await json("/api/cards")).cards.map(nCard) };
		},
		async catalog(opts = {}) {
			const rarity = opts.rarity ? `&rarity=${opts.rarity}` : "";
			const wishlist = opts.wishlist ? "&wishlist=1" : "";
			const d = await json(`/api/cards?page=${opts.page ?? 0}&sort=${opts.sort || "rarity"}&q=${encodeURIComponent(opts.q || "")}${rarity}${wishlist}`);
			const owned = new Set(d.ownedCardIds || []);
			const wish = new Set(d.wishlistCardIds || []);
			return {
				cards: (d.cards || []).map((c) => ({
					...nCard(c),
					owned: owned.has(c.id),
					wishlisted: wish.has(c.id)
				})),
				total: d.total ?? null,
				hasMore: !!d.searchHasMore,
				rarityCounts: d.rarityCounts || null
			};
		},
		async marketplace(opts = {}) {
			const rarity = opts.rarity ? `&rarity=${opts.rarity}` : "";
			const d = await json(`/api/marketplace?page=${opts.page ?? 0}&q=${encodeURIComponent(opts.q || "")}${rarity}`);
			return {
				auctions: (d.auctions || []).map(nAuction),
				page: d.page ?? 0,
				hasMore: !!d.hasMore
			};
		},
		async marketplaceMine() {
			try {
				return await json("/api/marketplace/mine");
			} catch {
				return {
					sellingCount: 0,
					maxConcurrentAuctions: 5
				};
			}
		},
		async placeBid(auctionId, amount) {
			const r = await fetch(`/api/marketplace/${auctionId}/bid`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ amount })
			});
			const d = await r.json().catch(() => ({}));
			if (!r.ok) {
				const e = new Error(d.error || "Enchère refusée.");
				e.code = d.code;
				e.min = d.min;
				throw e;
			}
			return d;
		},
		async auction(id) {
			const d = await json(`/api/marketplace/${id}`);
			return {
				...nAuction(d.auction || {}),
				bids: (d.bids || []).map(nBid)
			};
		},
		userId: "me",
		wishlistAdd: (cardId) => postJson("/api/wishlist", { card_id: cardId }),
		wishlistRemove: (cardId) => postJson("/api/unwishlist", { card_id: cardId }),
		async notifications() {
			try {
				return ((await json("/api/notifications")).notifications || []).map((n) => ({
					id: n.id,
					title: n.data?.title || NTYPE[n.type] || "Notification",
					message: n.data?.message || "",
					read: !!n.read,
					at: n.created_at || null,
					href: notifHref(n)
				}));
			} catch {
				return [];
			}
		},
		reset: () => json("/api/reset", { method: "POST" }),
		canAct: true,
		discard: (ucId) => postJson("/api/discard", { user_card_id: ucId }),
		async marketStats(card) {
			const base = {
				C: 8,
				PC: 20,
				R: 45,
				SR: 110,
				UR: 260,
				L: 600
			}[card.rarity] || 20;
			let s = [...String(card.id)].reduce((a, c) => a * 31 + c.charCodeAt(0) >>> 0, 7);
			const next = () => {
				s = s * 1103515245 + 12345 >>> 0;
				return s / 4294967296;
			};
			const count = 3 + Math.floor(next() * 6);
			const sold = Array.from({ length: count }, () => Math.round(base * (.7 + next() * .8)));
			const mean = (a) => Math.round(a.reduce((x, y) => x + y, 0) / a.length);
			const now = Date.now();
			const soldSeries = sold.map((price, i) => ({
				price,
				t: now - (count - i) * 864e5
			}));
			return {
				soldCount: sold.length,
				soldAvg: mean(sold),
				soldMin: Math.min(...sold),
				soldMax: Math.max(...sold),
				soldSeries,
				activeCount: 1 + Math.floor(next() * 3),
				lowestAsk: Math.round(base * .9)
			};
		},
		async specialAvailable() {
			return false;
		}
	};
	function countsFrom(items) {
		const counts = {
			C: 0,
			PC: 0,
			R: 0,
			SR: 0,
			UR: 0,
			L: 0
		};
		for (const it of items) if (counts[it.card.rarity] != null) counts[it.card.rarity] += 1;
		return counts;
	}
	var ownedIds = new Set();
	var ownedLoaded = false;
	var data = isReal ? {
		isReal: true,
		canReset: false,
		async profile() {
			let balance = null;
			try {
				balance = (await json("/api/wikibidous")).balance;
			} catch {}
			const cap = capturedProfile || {};
			const packs = cap.packs_remaining ?? null;
			let nextRegen = null;
			if (packs != null && packs < 10 && cap.packs_last_regen_at) {
				const last = Date.parse(cap.packs_last_regen_at);
				if (!isNaN(last)) nextRegen = Math.max(0, Math.round((last + 6e5 - Date.now()) / 1e3));
			}
			return {
				username: cap.username || null,
				packs_remaining: packs,
				pack_cap: 10,
				currency: balance ?? cap.wikibidous_balance ?? null,
				next_regen_seconds: nextRegen,
				is_pro: !!cap.is_pro
			};
		},
		async openPack() {
			if (!ownedLoaded) try {
				await this.collection();
			} catch {}
			const r = await fetch("/api/packs/open", {
				method: "POST",
				credentials: "include"
			});
			let d = {};
			try {
				d = await r.json();
			} catch {}
			if (!r.ok || d.error) {
				if (d.packs_remaining != null) {
					capturedProfile = {
						...capturedProfile || {},
						packs_remaining: d.packs_remaining
					};
					localEpoch++;
					window.dispatchEvent(new Event("wm:profile"));
				}
				if (d.human_verification_required) {
					const e = new Error("Vérification humaine requise");
					e.code = "human_verification";
					throw e;
				}
				throw new Error(d.error || "Ouverture du paquet impossible.");
			}
			const cards = (d.cards || []).map((c) => {
				const isNew = ownedLoaded ? !ownedIds.has(c.id) : false;
				ownedIds.add(c.id);
				return {
					...nCard(c),
					is_new: isNew,
					is_shiny: !!c.is_shiny
				};
			});
			if (d.packs_remaining != null) {
				capturedProfile = {
					...capturedProfile || {},
					packs_remaining: d.packs_remaining
				};
				localEpoch++;
			}
			let currency = null;
			try {
				currency = (await json("/api/wikibidous")).balance;
			} catch {}
			return {
				cards,
				packs_remaining: d.packs_remaining,
				currency: currency ?? capturedProfile?.wikibidous_balance ?? null
			};
		},
		async collection(opts = {}) {
			const map = (arr) => arr.map((it) => {
				const card = nCard(it.card);
				return {
					id: it.id,
					card,
					count: it.count ?? 1,
					is_shiny: !!it.is_shiny,
					starred: !!it.starred,
					obtained_at: it.obtained_at || null,
					_s: normSearch(card.title + " " + (card.category || ""))
				};
			});
			const first = await json("/api/my-collection?sort=rarity&page=0&stats=1");
			const total = first.total ?? null;
			const realCounts = first.rarityCounts || null;
			let items = map(first.collection || []);
			const statsOf = (loading) => ({
				unique: total ?? items.length,
				total: items.reduce((n, it) => n + it.count, 0),
				catalog: null,
				counts: realCounts || countsFrom(items),
				loading
			});
			if (total && total > items.length) {
				opts.onPartial?.({
					items: items.slice(),
					stats: statsOf(true)
				});
				const pages = Math.ceil(total / 50);
				await Promise.all(Array.from({ length: pages - 1 }, (_, i) => json(`/api/my-collection?sort=rarity&page=${i + 1}&stats=0`).then((d) => {
					items = items.concat(map(d.collection || []));
					opts.onPartial?.({
						items: items.slice(),
						stats: statsOf(true)
					});
				}).catch(() => {})));
			}
			ownedIds = new Set(items.map((it) => it.card.id));
			ownedLoaded = true;
			return {
				items,
				stats: {
					unique: total ?? items.length,
					total: items.reduce((n, it) => n + it.count, 0),
					catalog: null,
					counts: realCounts || countsFrom(items),
					loading: false
				}
			};
		},
		async cards() {
			const d = await json("/api/cards?page=0&sort=rarity");
			return { cards: (d.cards || d.items || []).map(nCard) };
		},
		async catalog(opts = {}) {
			const d = await json(`/api/cards?page=${opts.page ?? 0}&sort=${opts.sort || "rarity"}${opts.q ? `&q=${encodeURIComponent(opts.q)}` : ""}${opts.rarity ? `&rarity=${opts.rarity}` : ""}${opts.wishlist ? "&wishlist=1" : ""}`);
			const owned = new Set(d.ownedCardIds || []);
			const wish = new Set(d.wishlistCardIds || []);
			const friends = d.friendOwners || {};
			return {
				cards: (d.cards || []).map((c) => ({
					...nCard(c),
					owned: owned.has(c.id),
					wishlisted: wish.has(c.id),
					friendCount: Array.isArray(friends[c.id]) ? friends[c.id].length : 0
				})),
				total: d.total ?? null,
				hasMore: !!d.searchHasMore,
				rarityCounts: d.rarityCounts || null
			};
		},
		async marketplace(opts = {}) {
			const page = opts.page ?? 0;
			const d = await json(`/api/marketplace?page=${page}${opts.q ? `&q=${encodeURIComponent(opts.q)}` : ""}${opts.rarity ? `&rarity=${opts.rarity}` : ""}`);
			return {
				auctions: (d.auctions || []).map(nAuction),
				page: d.page ?? page,
				hasMore: !!d.hasMore
			};
		},
		async marketplaceMine() {
			try {
				return await json("/api/marketplace/mine");
			} catch {
				return {
					sellingCount: 0,
					maxConcurrentAuctions: 5
				};
			}
		},
		async placeBid(auctionId, amount) {
			const r = await fetch(`/api/marketplace/${auctionId}/bid`, {
				method: "POST",
				credentials: "include",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ amount })
			});
			const d = await r.json().catch(() => ({}));
			if (!r.ok) {
				const e = new Error(d.error || "Enchère refusée.");
				e.code = d.code;
				e.min = d.min;
				throw e;
			}
			return d;
		},
		async auction(id) {
			const d = await json(`/api/marketplace/${id}`);
			return {
				...nAuction(d.auction || {}),
				bids: (d.bids || []).map(nBid)
			};
		},
		get userId() {
			return sbUserId;
		},
		wishlistAdd: (cardId) => postJson(`/api/cards/${cardId}/wishlist`, {}),
		wishlistRemove: (cardId) => json(`/api/cards/${cardId}/wishlist`, { method: "DELETE" }),
		async notifications() {
			try {
				return ((await json("/api/notifications")).notifications || []).map((n) => ({
					id: n.id,
					title: n.data?.title || NTYPE[n.type] || "Notification",
					message: n.data?.message || "",
					read: !!n.read,
					at: n.created_at || null,
					href: notifHref(n)
				}));
			} catch {
				return [];
			}
		},
		canAct: true,
		discard: (ucId) => postJson(`/api/user-cards/${ucId}/discard`, {}),
		async marketStats(card) {
			let d;
			try {
				const r = await fetch(`/api/marketplace/cards/${card.id}/sales`, { credentials: "include" });
				d = await r.json();
				if (!r.ok) return null;
			} catch {
				return null;
			}
			const sales = Array.isArray(d.sales) ? d.sales : null;
			if (!sales) return null;
			const priced = sales.filter((s) => s.final_price != null);
			const prices = priced.map((s) => s.final_price);
			const soldSeries = priced.map((s) => ({
				price: s.final_price,
				t: Date.parse(s.settled_at || "") || 0
			})).sort((a, b) => a.t - b.t);
			const mean = (a) => a.length ? Math.round(a.reduce((s, x) => s + x, 0) / a.length) : null;
			return {
				soldCount: prices.length,
				soldAvg: mean(prices),
				soldMin: prices.length ? Math.min(...prices) : null,
				soldMax: prices.length ? Math.max(...prices) : null,
				soldSeries,
				activeCount: 0,
				lowestAsk: null
			};
		},
		async specialAvailable() {
			try {
				const d = await json("/api/packs/special");
				return !!(d && (d.available || (d.packs || []).length));
			} catch {
				return false;
			}
		}
	} : MockData;
	var marketCache = new Map();
	async function marketValueFor(card) {
		if (marketCache.has(card.id)) return marketCache.get(card.id);
		try {
			const s = await data.marketStats(card);
			const v = s ? s.soldAvg ?? s.lowestAsk ?? null : null;
			marketCache.set(card.id, v);
			return v;
		} catch {
			return null;
		}
	}
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
	var KEY = "wm-settings";
	function load() {
		try {
			return JSON.parse(localStorage.getItem(KEY) || "{}");
		} catch {
			return {};
		}
	}
	var settings = proxy({
		hideStats: false,
		hideSensitive: true,
		...load()
	});
	function persist() {
		try {
			localStorage.setItem(KEY, JSON.stringify({
				hideStats: settings.hideStats,
				hideSensitive: settings.hideSensitive
			}));
		} catch {}
	}
	function toggleHideStats() {
		settings.hideStats = !settings.hideStats;
		persist();
	}
	function toggleHideSensitive() {
		settings.hideSensitive = !settings.hideSensitive;
		persist();
	}
	var root$8 = from_html(`<img class="wc-photo onyx-photo" loading="lazy" crossorigin="anonymous"/>`);
	var root_1$8 = from_html(`<img class="wc-bg onyx" alt="" aria-hidden="true" loading="lazy"/> <span class="ox ox-shade" aria-hidden="true"></span> <span class="ox ox-tint" aria-hidden="true"></span> <span class="ox ox-wash" aria-hidden="true"></span> <!> <span class="ox ox-lines" aria-hidden="true"></span> <span class="ox ox-shine" aria-hidden="true"></span>`, 1);
	var root_2$8 = from_html(`<img class="wc-blur" alt="" aria-hidden="true" loading="lazy" crossorigin="anonymous"/> <img class="wc-photo" loading="lazy" crossorigin="anonymous"/>`, 1);
	var root_3$8 = from_html(`<img class="wc-bg" alt="" aria-hidden="true" loading="lazy"/>`);
	var root_4$8 = from_html(`<span aria-hidden="true"></span>`);
	var root_5$8 = from_html(`<span class="wc-nsfw" aria-hidden="true">Contenu sensible</span>`);
	var root_6$8 = from_html(`<span class="wc-wish" title="Liste de souhaits" aria-label="Liste de souhaits"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.5S3.5 14.7 3.5 9.2A4.2 4.2 0 0 1 12 6.5a4.2 4.2 0 0 1 8.5 2.7c0 5.5-8.5 11.3-8.5 11.3z"></path></svg></span>`);
	var root_7$7 = from_html(`<span class="wc-star" title="Favori" aria-label="Favori"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"></path></svg></span>`);
	var root_8$6 = from_html(`<span class="wc-shiny" title="Brillante" aria-label="Brillante"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 6.4L20 10l-6.1 1.6L12 18l-1.9-6.4L4 10l6.1-1.6z"></path></svg></span>`);
	var root_9$6 = from_html(`<span class="wc-count"> </span>`);
	var root_10$5 = from_html(`<span class="wc-new">Nouvelle</span>`);
	var root_11$5 = from_html(`<span class="wc-stats"><span>ATK <b> </b></span> <span>DEF <b> </b></span></span>`);
	var root_12$4 = from_html(`<span class="wc-val" title="Valeur estimée d'après le marché"> </span>`);
	var root_13$3 = from_html(`<div class="wc-meta"><!> <!></div>`);
	var root_14$2 = from_html(`<article><div class="wc-face"><!> <!> <!></div> <div class="wc-scrim"></div> <div class="wc-top"><span class="wc-rtag"> </span> <span class="wc-flags"><!> <!> <!> <!> <!></span></div> <div class="wc-cap"><h3 class="wc-name"> </h3> <div class="wc-cat"> </div> <!></div></article>`);
	function Card($$anchor, $$props) {
		push($$props, true);
		let count = prop($$props, "count", 3, 1), isNew = prop($$props, "isNew", 3, false), shiny = prop($$props, "shiny", 3, false), starred = prop($$props, "starred", 3, false), value = prop($$props, "value", 3, void 0), owned = prop($$props, "owned", 3, true), wishlisted = prop($$props, "wishlisted", 3, false), big = prop($$props, "big", 3, false), caption = prop($$props, "caption", 3, true);
		const nf = (n) => Number(n).toLocaleString("fr");
		let hasValue = user_derived(() => typeof value() === "number");
		let blurred = user_derived(() => settings.hideSensitive && $$props.card.nsfw_image);
		const ASSET_BASE = "https://www.wiki-masters.com";
		const RBG = {
			C: "/commun.png",
			PC: "/peu_commun.png",
			R: "/rare.png",
			SR: "/super_rare.png",
			UR: "/ultra_rare.png",
			L: "/legendaire.png"
		};
		const isOnyx = user_derived(() => shiny() && $$props.card.rarity === "L");
		const rarityArt = user_derived(() => ASSET_BASE + (get(isOnyx) ? "/shiny/onyx-art.webp" : RBG[$$props.card.rarity] || "/commun.png"));
		let imgFailed = state(false);
		let artFailed = state(false);
		let showPhoto = user_derived(() => !!$$props.card.image_url && !get(imgFailed));
		var article = root_14$2();
		let classes;
		var div = child(article);
		var node = child(div);
		var consequent_1 = ($$anchor) => {
			var fragment = root_1$8();
			var img = first_child(fragment);
			var node_1 = sibling(img, 8);
			var consequent = ($$anchor) => {
				var img_1 = root$8();
				template_effect(() => {
					set_attribute(img_1, "src", $$props.card.image_url);
					set_attribute(img_1, "alt", $$props.card.title);
				});
				event("error", img_1, () => set(imgFailed, true));
				replay_events(img_1);
				append($$anchor, img_1);
			};
			if_block(node_1, ($$render) => {
				if (get(showPhoto)) $$render(consequent);
			});
			next(4);
			template_effect(() => set_attribute(img, "src", get(rarityArt)));
			append($$anchor, fragment);
		};
		var consequent_2 = ($$anchor) => {
			var fragment_1 = root_2$8();
			var img_2 = first_child(fragment_1);
			var img_3 = sibling(img_2, 2);
			template_effect(() => {
				set_attribute(img_2, "src", $$props.card.image_url);
				set_attribute(img_3, "src", $$props.card.image_url);
				set_attribute(img_3, "alt", $$props.card.title);
			});
			event("error", img_3, () => set(imgFailed, true));
			replay_events(img_3);
			append($$anchor, fragment_1);
		};
		var consequent_3 = ($$anchor) => {
			var img_4 = root_3$8();
			template_effect(() => set_attribute(img_4, "src", get(rarityArt)));
			event("error", img_4, () => set(artFailed, true));
			replay_events(img_4);
			append($$anchor, img_4);
		};
		if_block(node, ($$render) => {
			if (get(isOnyx)) $$render(consequent_1);
			else if (get(showPhoto)) $$render(consequent_2, 1);
			else if (!get(artFailed)) $$render(consequent_3, 2);
		});
		var node_2 = sibling(node, 2);
		var consequent_4 = ($$anchor) => {
			var span = root_4$8();
			let classes_1;
			template_effect(() => classes_1 = set_class(span, 1, "wc-holo", null, classes_1, { onyx: get(isOnyx) }));
			append($$anchor, span);
		};
		if_block(node_2, ($$render) => {
			if (shiny()) $$render(consequent_4);
		});
		var node_3 = sibling(node_2, 2);
		var consequent_5 = ($$anchor) => {
			append($$anchor, root_5$8());
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
			append($$anchor, root_6$8());
		};
		if_block(node_4, ($$render) => {
			if (wishlisted()) $$render(consequent_6);
		});
		var node_5 = sibling(node_4, 2);
		var consequent_7 = ($$anchor) => {
			append($$anchor, root_7$7());
		};
		if_block(node_5, ($$render) => {
			if (starred()) $$render(consequent_7);
		});
		var node_6 = sibling(node_5, 2);
		var consequent_8 = ($$anchor) => {
			append($$anchor, root_8$6());
		};
		if_block(node_6, ($$render) => {
			if (shiny()) $$render(consequent_8);
		});
		var node_7 = sibling(node_6, 2);
		var consequent_9 = ($$anchor) => {
			var span_7 = root_9$6();
			var text_1 = only_child(span_7);
			template_effect(() => set_text(text_1, `x${count() ?? ""}`));
			append($$anchor, span_7);
		};
		if_block(node_7, ($$render) => {
			if (count() > 1) $$render(consequent_9);
		});
		var node_8 = sibling(node_7, 2);
		var consequent_10 = ($$anchor) => {
			append($$anchor, root_10$5());
		};
		if_block(node_8, ($$render) => {
			if (isNew()) $$render(consequent_10);
		});
		reset(span_3);
		reset(div_1);
		var div_2 = sibling(div_1, 2);
		var h3 = child(div_2);
		var text_2 = only_child(h3, true);
		var div_3 = sibling(h3, 2);
		var text_3 = only_child(div_3, true);
		var node_9 = sibling(div_3, 2);
		var consequent_13 = ($$anchor) => {
			var div_4 = root_13$3();
			var node_10 = child(div_4);
			var consequent_11 = ($$anchor) => {
				var span_9 = root_11$5();
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
			if_block(node_10, ($$render) => {
				if (!settings.hideStats) $$render(consequent_11);
			});
			var node_11 = sibling(node_10, 2);
			var consequent_12 = ($$anchor) => {
				var span_12 = root_12$4();
				var text_6 = only_child(span_12, true);
				template_effect(($0) => set_text(text_6, $0), [() => nf(value())]);
				append($$anchor, span_12);
			};
			if_block(node_11, ($$render) => {
				if (get(hasValue)) $$render(consequent_12);
			});
			reset(div_4);
			append($$anchor, div_4);
		};
		if_block(node_9, ($$render) => {
			if (!settings.hideStats || get(hasValue)) $$render(consequent_13);
		});
		reset(div_2);
		reset(article);
		template_effect(() => {
			classes = set_class(article, 1, "wc", null, classes, {
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
	var root$7 = from_html(`<div class="modal-cat"> </div>`);
	var root_1$7 = from_html(`<p class="modal-sum muted">Chargement du résumé...</p>`);
	var root_2$7 = from_html(`<p class="modal-sum"> </p>`);
	var root_3$7 = from_html(`<div class="fact"><div class="fk">Valeur estimée</div><div class="fv val"> </div></div>`);
	var root_4$7 = from_html(`<div class="fact"><div class="fk">Exemplaires</div><div class="fv"> <!></div></div>`);
	var root_5$7 = from_html(`<div class="fact"><div class="fk" title="Vues de l'article Wikipédia sur 30 jours">Popularité (30 j)</div><div class="fv"> </div></div>`);
	var root_6$7 = from_html(`<div class="fact"><div class="fk">Attaque</div><div class="fv atk"> </div></div> <div class="fact"><div class="fk">Défense</div><div class="fv def"> </div></div>`, 1);
	var root_7$6 = from_html(`<div class="modal-obtained"> </div>`);
	var root_8$5 = from_html(`<a class="modal-wiki" target="_blank" rel="noopener noreferrer">Voir l'article Wikipédia</a>`);
	var root_9$5 = from_html(`<button><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 20.5S3.5 14.7 3.5 9.2A4.2 4.2 0 0 1 12 6.5a4.2 4.2 0 0 1 8.5 2.7c0 5.5-8.5 11.3-8.5 11.3z"></path></svg> </button>`);
	var root_10$4 = from_html(`<div class="confirm"><div class="confirm-text">Défausser cette carte contre <b>1 point</b> ?</div> <div class="af-actions"><button class="btn">Annuler</button> <button class="btn danger">Défausser</button></div></div>`);
	var root_11$4 = from_html(`<div class="actions"><button class="btn primary">Mettre en vente sur le site</button> <button class="btn danger">Défausser, +1 pt</button></div>`);
	var root_12$3 = from_html(`<div id="wm-panel-details" role="tabpanel" aria-labelledby="wm-tab-details" class="modal-panel"><!> <div class="facts"><!> <!> <!> <!></div> <!> <!> <!> <!> <!> <div class="modal-credit">Texte de l'article sous licence CC BY-SA 4.0</div></div>`);
	var root_13$2 = from_html(`<p class="modal-sum muted">Analyse du marché...</p>`);
	var root_14$1 = from_html(`<p class="modal-sum muted">Marché indisponible pour le moment.</p>`);
	var root_15$1 = from_html(`<div class="market-chart"><div class="mc-head">Prix de vente dans le temps</div> <div class="mc-plot"><div class="mc-y"><span> </span><span> </span></div> <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-label="Prix de vente dans le temps"><path fill="var(--accent)" fill-opacity="0.12"></path><path fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"></path></svg></div> <div class="mc-x"><span> </span><span> </span></div></div>`);
	var root_16$1 = from_html(`<div class="market-grid"><div class="mstat"><div class="l">Prix moyen</div><div class="v"> </div></div> <div class="mstat"><div class="l">Min</div><div class="v"> </div></div> <div class="mstat"><div class="l">Max</div><div class="v"> </div></div> <div class="mstat"><div class="l">Ventes</div><div class="v"> </div></div></div>`);
	var root_17$1 = from_html(`<p class="modal-sum muted">Aucune vente enregistrée pour cette carte.</p>`);
	var root_18$1 = from_html(`<div class="market-active"> <b> </b></div>`);
	var root_19$1 = from_html(`<div class="rarity-note">Estimation d'après les annonces publiques du marché.</div>`);
	var root_20$1 = from_html(`<!> <!> <!> <!>`, 1);
	var root_21$1 = from_html(`<div id="wm-panel-market" role="tabpanel" aria-labelledby="wm-tab-market" class="modal-panel"><!></div>`);
	var root_22$1 = from_html(`<div> </div>`);
	var root_23$1 = from_html(`<div class="modal-backdrop" role="presentation"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="wm-modal-title" tabindex="-1"><button class="modal-close" aria-label="Fermer"><svg class="x-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"></path></svg></button> <div class="modal-card"><!></div> <div class="modal-info"><span class="modal-rar"> </span> <h2 class="modal-name" id="wm-modal-title"> </h2> <!> <div class="modal-tabs" role="tablist" aria-label="Détails de la carte"><button role="tab" id="wm-tab-details" aria-controls="wm-panel-details">Détails</button> <button role="tab" id="wm-tab-market" aria-controls="wm-panel-market">Marché</button></div> <!> <!></div></div></div>`);
	function CardModal($$anchor, $$props) {
		push($$props, true);
		let readonly = prop($$props, "readonly", 3, false), wishlisted = prop($$props, "wishlisted", 3, false), onwishlist = prop($$props, "onwishlist", 3, null), extra = prop($$props, "extra", 3, null);
		const c = user_derived(() => $$props.item.card);
		let tab = state("details");
		let summary = state(proxy($$props.item.card.summary || ""));
		let sumState = state(proxy($$props.item.card.summary ? "done" : "loading"));
		let market = state(null);
		let marketState = state("idle");
		let mval = state(null);
		let confirmDiscard = state(false);
		let busy = state(false);
		let done = state(false);
		let msg = state("");
		let msgOk = state(false);
		let modalEl;
		async function loadSummary() {
			if (get(c).summary) return;
			try {
				const r = await fetch("https://fr.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(get(c).title), { headers: { Accept: "application/json" } });
				if (r.ok) set(summary, (await r.json()).extract || "", true);
			} catch {}
			set(sumState, get(summary) ? "done" : "none", true);
		}
		loadSummary();
		marketValueFor(get(c)).then((v) => set(mval, v, true)).catch(() => {});
		async function loadMarket() {
			if (get(marketState) !== "idle") return;
			set(marketState, "loading");
			try {
				set(market, await data.marketStats(get(c)), true);
				set(marketState, get(market) ? "done" : "error", true);
			} catch {
				set(marketState, "error");
			}
		}
		user_effect(() => {
			if (get(tab) === "market") loadMarket();
		});
		function sellNative() {
			try {
				localStorage.setItem("wm-off", "1");
			} catch {}
			location.assign("/collection");
		}
		async function discard() {
			set(busy, true);
			set(msg, "");
			try {
				await data.discard($$props.item.id);
				$$props.onaction?.();
				set(done, true);
				set(msgOk, true);
				set(msg, "Carte défaussée. +1 point.");
			} catch {
				flash("La défausse a échoué.");
				set(busy, false);
			}
		}
		function flash(m) {
			set(msg, m, true);
			set(msgOk, false);
		}
		function onKey(e) {
			if (e.key === "Escape") {
				$$props.onclose?.();
				return;
			}
			if (e.key === "Tab" && modalEl) {
				const f = [...modalEl.querySelectorAll("a[href],button:not([disabled]),input,[tabindex]:not([tabindex=\"-1\"])")].filter((el) => el.offsetParent !== null);
				if (!f.length) return;
				const first = f[0], last = f[f.length - 1];
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		}
		const nf = (n) => n == null ? "-" : n.toLocaleString("fr");
		const fmtDate = (s) => {
			const d = new Date(s);
			return isNaN(d.getTime()) ? "" : d.toLocaleDateString("fr", {
				day: "numeric",
				month: "long",
				year: "numeric"
			});
		};
		const obtainedLabel = user_derived(() => $$props.item.obtained_at ? fmtDate($$props.item.obtained_at) : "");
		const dshort = (t) => {
			if (!t) return "";
			try {
				return new Date(t).toLocaleDateString("fr", {
					day: "numeric",
					month: "short"
				});
			} catch {
				return "";
			}
		};
		let chart = user_derived(() => {
			const s = get(market)?.soldSeries;
			if (!s || s.length < 2) return null;
			const prices = s.map((p) => p.price);
			const min = Math.min(...prices), max = Math.max(...prices), span = max - min || 1, H = 40, pad = 3;
			const pts = s.map((p, i) => [pad + i / (s.length - 1) * 94, pad + (1 - (p.price - min) / span) * 34]);
			const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
			return {
				d,
				area: d + ` L${pts[pts.length - 1][0].toFixed(1)} ${H} L${pts[0][0].toFixed(1)} ${H} Z`,
				min,
				max,
				first: dshort(s[0].t),
				last: dshort(s[s.length - 1].t)
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
		var div = root_23$1();
		event("keydown", $window, onKey);
		var div_1 = child(div);
		var button = child(div_1);
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
		var text$2 = only_child(span_1, true);
		var h2 = sibling(span_1, 2);
		var text_1 = only_child(h2, true);
		var node_1 = sibling(h2, 2);
		var consequent = ($$anchor) => {
			var div_4 = root$7();
			var text_2 = only_child(div_4, true);
			template_effect(() => set_text(text_2, get(c).category));
			append($$anchor, div_4);
		};
		if_block(node_1, ($$render) => {
			if (get(c).category) $$render(consequent);
		});
		var div_5 = sibling(node_1, 2);
		var button_1 = child(div_5);
		let classes;
		var button_2 = sibling(button_1, 2);
		let classes_1;
		reset(div_5);
		var node_2 = sibling(div_5, 2);
		var consequent_14 = ($$anchor) => {
			var div_6 = root_12$3();
			var node_3 = child(div_6);
			var consequent_1 = ($$anchor) => {
				append($$anchor, root_1$7());
			};
			var consequent_2 = ($$anchor) => {
				var p_2 = root_2$7();
				var text_3 = only_child(p_2, true);
				template_effect(() => set_text(text_3, get(summary)));
				append($$anchor, p_2);
			};
			if_block(node_3, ($$render) => {
				if (get(sumState) === "loading") $$render(consequent_1);
				else if (get(summary)) $$render(consequent_2, 1);
			});
			var div_7 = sibling(node_3, 2);
			var node_4 = child(div_7);
			var consequent_3 = ($$anchor) => {
				var div_8 = root_3$7();
				var text_4 = only_child(sibling(child(div_8)));
				reset(div_8);
				template_effect(($0) => set_text(text_4, `${$0 ?? ""} pts`), [() => nf(get(mval))]);
				append($$anchor, div_8);
			};
			if_block(node_4, ($$render) => {
				if (get(mval) != null) $$render(consequent_3);
			});
			var node_5 = sibling(node_4, 2);
			var consequent_5 = ($$anchor) => {
				var div_10 = root_4$7();
				var div_11 = sibling(child(div_10));
				var text_5 = child(div_11, true);
				var node_6 = sibling(text_5);
				var consequent_4 = ($$anchor) => {
					append($$anchor, text("· brillante"));
				};
				if_block(node_6, ($$render) => {
					if ($$props.item.is_shiny) $$render(consequent_4);
				});
				reset(div_11);
				reset(div_10);
				template_effect(() => set_text(text_5, $$props.item.count));
				append($$anchor, div_10);
			};
			if_block(node_5, ($$render) => {
				if (!readonly()) $$render(consequent_5);
			});
			var node_7 = sibling(node_5, 2);
			var consequent_6 = ($$anchor) => {
				var div_12 = root_5$7();
				var text_7 = only_child(sibling(child(div_12)), true);
				reset(div_12);
				template_effect(($0) => set_text(text_7, $0), [() => nf(get(c).pageviews)]);
				append($$anchor, div_12);
			};
			if_block(node_7, ($$render) => {
				if (get(c).pageviews != null) $$render(consequent_6);
			});
			var node_8 = sibling(node_7, 2);
			var consequent_7 = ($$anchor) => {
				var fragment = root_6$7();
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
			if_block(node_8, ($$render) => {
				if (!settings.hideStats) $$render(consequent_7);
			});
			reset(div_7);
			var node_9 = sibling(div_7, 2);
			var consequent_8 = ($$anchor) => {
				var div_18 = root_7$6();
				var text_10 = only_child(div_18);
				template_effect(() => set_text(text_10, `Obtenue le ${get(obtainedLabel) ?? ""}`));
				append($$anchor, div_18);
			};
			if_block(node_9, ($$render) => {
				if (get(obtainedLabel)) $$render(consequent_8);
			});
			var node_10 = sibling(node_9, 2);
			var consequent_9 = ($$anchor) => {
				var a = root_8$5();
				template_effect(() => set_attribute(a, "href", get(c).wikipedia_url));
				append($$anchor, a);
			};
			if_block(node_10, ($$render) => {
				if (get(c).wikipedia_url) $$render(consequent_9);
			});
			var node_11 = sibling(node_10, 2);
			var consequent_10 = ($$anchor) => {
				var button_3 = root_9$5();
				let classes_2;
				var svg = child(button_3);
				var text_11 = sibling(svg);
				reset(button_3);
				template_effect(() => {
					classes_2 = set_class(button_3, 1, "btn wish-btn", null, classes_2, { on: wishlisted() });
					set_attribute(svg, "fill", wishlisted() ? "currentColor" : "none");
					set_text(text_11, ` ${wishlisted() ? "Dans la liste de souhaits" : "Ajouter à la liste de souhaits"}`);
				});
				delegated("click", button_3, function(...$$args) {
					onwishlist()?.apply(this, $$args);
				});
				append($$anchor, button_3);
			};
			if_block(node_11, ($$render) => {
				if (onwishlist()) $$render(consequent_10);
			});
			var node_12 = sibling(node_11, 2);
			var consequent_11 = ($$anchor) => {
				var fragment_1 = comment();
				snippet(first_child(fragment_1), extra);
				append($$anchor, fragment_1);
			};
			if_block(node_12, ($$render) => {
				if (extra()) $$render(consequent_11);
			});
			var node_14 = sibling(node_12, 2);
			var consequent_13 = ($$anchor) => {
				var fragment_2 = comment();
				var node_15 = first_child(fragment_2);
				var consequent_12 = ($$anchor) => {
					var div_19 = root_10$4();
					var div_20 = sibling(child(div_19), 2);
					var button_4 = child(div_20);
					var button_5 = sibling(button_4, 2);
					reset(div_20);
					reset(div_19);
					template_effect(() => {
						button_4.disabled = get(busy);
						button_5.disabled = get(busy);
					});
					delegated("click", button_4, () => set(confirmDiscard, false));
					delegated("click", button_5, discard);
					append($$anchor, div_19);
				};
				var alternate = ($$anchor) => {
					var div_21 = root_11$4();
					var button_6 = child(div_21);
					var button_7 = sibling(button_6, 2);
					reset(div_21);
					delegated("click", button_6, sellNative);
					delegated("click", button_7, () => set(confirmDiscard, true));
					append($$anchor, div_21);
				};
				if_block(node_15, ($$render) => {
					if (get(confirmDiscard)) $$render(consequent_12);
					else $$render(alternate, -1);
				});
				append($$anchor, fragment_2);
			};
			if_block(node_14, ($$render) => {
				if (data.canAct && !readonly() && !get(done)) $$render(consequent_13);
			});
			next(2);
			reset(div_6);
			append($$anchor, div_6);
		};
		var alternate_2 = ($$anchor) => {
			var div_22 = root_21$1();
			var node_16 = child(div_22);
			var consequent_15 = ($$anchor) => {
				append($$anchor, root_13$2());
			};
			var consequent_16 = ($$anchor) => {
				append($$anchor, root_14$1());
			};
			var consequent_21 = ($$anchor) => {
				var fragment_3 = root_20$1();
				var node_17 = first_child(fragment_3);
				var consequent_17 = ($$anchor) => {
					var div_23 = root_15$1();
					var div_24 = sibling(child(div_23), 2);
					var div_25 = child(div_24);
					var span_2 = child(div_25);
					var text_12 = only_child(span_2, true);
					var text_13 = only_child(sibling(span_2), true);
					reset(div_25);
					var svg_1 = sibling(div_25, 2);
					var path = child(svg_1);
					var path_1 = sibling(path);
					reset(svg_1);
					reset(div_24);
					var div_26 = sibling(div_24, 2);
					var span_4 = child(div_26);
					var text_14 = only_child(span_4, true);
					var text_15 = only_child(sibling(span_4), true);
					reset(div_26);
					reset(div_23);
					template_effect(($0, $1) => {
						set_text(text_12, $0);
						set_text(text_13, $1);
						set_attribute(path, "d", get(chart).area);
						set_attribute(path_1, "d", get(chart).d);
						set_text(text_14, get(chart).first);
						set_text(text_15, get(chart).last);
					}, [() => nf(get(chart).max), () => nf(get(chart).min)]);
					append($$anchor, div_23);
				};
				if_block(node_17, ($$render) => {
					if (get(chart)) $$render(consequent_17);
				});
				var node_18 = sibling(node_17, 2);
				var consequent_18 = ($$anchor) => {
					var div_27 = root_16$1();
					var div_28 = child(div_27);
					var text_16 = only_child(sibling(child(div_28)), true);
					reset(div_28);
					var div_30 = sibling(div_28, 2);
					var text_17 = only_child(sibling(child(div_30)), true);
					reset(div_30);
					var div_32 = sibling(div_30, 2);
					var text_18 = only_child(sibling(child(div_32)), true);
					reset(div_32);
					var div_34 = sibling(div_32, 2);
					var text_19 = only_child(sibling(child(div_34)), true);
					reset(div_34);
					reset(div_27);
					template_effect(($0, $1, $2) => {
						set_text(text_16, $0);
						set_text(text_17, $1);
						set_text(text_18, $2);
						set_text(text_19, get(market).soldCount);
					}, [
						() => nf(get(market).soldAvg),
						() => nf(get(market).soldMin),
						() => nf(get(market).soldMax)
					]);
					append($$anchor, div_27);
				};
				var alternate_1 = ($$anchor) => {
					append($$anchor, root_17$1());
				};
				if_block(node_18, ($$render) => {
					if (get(market).soldCount) $$render(consequent_18);
					else $$render(alternate_1, -1);
				});
				var node_19 = sibling(node_18, 2);
				var consequent_19 = ($$anchor) => {
					var div_36 = root_18$1();
					var text_20 = child(div_36);
					var text_21 = only_child(sibling(text_20), true);
					reset(div_36);
					template_effect(($0) => {
						set_text(text_20, `${get(market).activeCount ?? ""} en vente, dès `);
						set_text(text_21, $0);
					}, [() => nf(get(market).lowestAsk)]);
					append($$anchor, div_36);
				};
				if_block(node_19, ($$render) => {
					if (get(market).activeCount) $$render(consequent_19);
				});
				var node_20 = sibling(node_19, 2);
				var consequent_20 = ($$anchor) => {
					append($$anchor, root_19$1());
				};
				if_block(node_20, ($$render) => {
					if (get(market).soldCount || get(market).activeCount) $$render(consequent_20);
				});
				append($$anchor, fragment_3);
			};
			if_block(node_16, ($$render) => {
				if (get(marketState) === "loading") $$render(consequent_15);
				else if (get(marketState) === "error") $$render(consequent_16, 1);
				else if (get(market)) $$render(consequent_21, 2);
			});
			reset(div_22);
			append($$anchor, div_22);
		};
		if_block(node_2, ($$render) => {
			if (get(tab) === "details") $$render(consequent_14);
			else $$render(alternate_2, -1);
		});
		var node_21 = sibling(node_2, 2);
		var consequent_22 = ($$anchor) => {
			var div_38 = root_22$1();
			let classes_3;
			var text_22 = only_child(div_38, true);
			template_effect(() => {
				classes_3 = set_class(div_38, 1, "modal-msg", null, classes_3, { ok: get(msgOk) });
				set_text(text_22, get(msg));
			});
			append($$anchor, div_38);
		};
		if_block(node_21, ($$render) => {
			if (get(msg)) $$render(consequent_22);
		});
		reset(div_3);
		reset(div_1);
		bind_this(div_1, ($$value) => modalEl = $$value, () => modalEl);
		reset(div);
		template_effect(() => {
			set_attribute(span_1, "data-r", get(c).rarity);
			set_text(text$2, RNAME[get(c).rarity] || get(c).rarity);
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
	var root$6 = from_html(`<div class="rg-card"><div class="rg-aura"></div> <button class="card-btn"><!></button></div>`);
	var root_1$6 = from_html(`<div class="reveal reveal-all"><div class="reveal-all-head"><h2>Votre paquet</h2> <div class="sub"> </div></div> <div class="reveal-grid"></div> <button class="btn primary">Terminé</button></div>`);
	var root_2$6 = from_html(`<div class="stage-aura"></div> <div class="flip-in"><button class="card-btn"><!></button></div>`, 1);
	var root_3$6 = from_html(`<div class="reveal-rarity"> </div>`);
	var root_4$6 = from_html(`<span></span>`);
	var root_5$6 = from_html(`<div class="reveal"><div class="count">Carte <b> </b> </div> <div class="stage" role="group" aria-label="Carte, glissez ou utilisez les flèches" style="touch-action:pan-y"><!></div> <!> <div class="dots"></div> <div class="navrow"><button class="arrow" aria-label="Précédent"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"></path></svg></button> <button class="btn primary"> </button> <button class="arrow" aria-label="Suivant"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg></button></div> <button class="reveal-skip">Tout révéler</button></div>`);
	var root_6$6 = from_html(`<!> <!>`, 1);
	function Reveal($$anchor, $$props) {
		push($$props, true);
		let i = state(0);
		let showAll = state(false);
		let selected = state(null);
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
		var fragment = root_6$6();
		event("keydown", $window, onKey);
		var node = first_child(fragment);
		var consequent = ($$anchor) => {
			var div = root_1$6();
			var div_1 = child(div);
			var text = only_child(sibling(child(div_1), 2));
			reset(div_1);
			var div_3 = sibling(div_1, 2);
			each(div_3, 21, () => $$props.cards, index, ($$anchor, c, k) => {
				var div_4 = root$6();
				set_style(div_4, `animation-delay:${k * 70}ms`);
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
				template_effect(() => {
					set_attribute(div_5, "data-r", get(c).rarity);
					set_attribute(button, "aria-label", get(c).title);
				});
				delegated("click", button, () => openCard(get(c)));
				append($$anchor, div_4);
			});
			reset(div_3);
			var button_1 = sibling(div_3, 2);
			reset(div);
			template_effect(() => set_text(text, `${$$props.cards.length ?? ""} cartes${get(newCount) ? `, ${get(newCount)} nouvelle${get(newCount) > 1 ? "s" : ""}` : ""}`));
			delegated("click", button_1, () => $$props.ondone?.());
			append($$anchor, div);
		};
		var alternate = ($$anchor) => {
			var div_6 = root_5$6();
			var div_7 = child(div_6);
			var b = sibling(child(div_7));
			var text_1 = only_child(b, true);
			var text_2 = sibling(b);
			reset(div_7);
			var div_8 = sibling(div_7, 2);
			key(child(div_8), () => get(i), ($$anchor) => {
				var fragment_1 = root_2$6();
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
				var div_11 = root_3$6();
				var text_3 = only_child(div_11, true);
				template_effect(() => {
					set_attribute(div_11, "data-r", $$props.cards[get(i)].rarity);
					set_text(text_3, RNAME[$$props.cards[get(i)].rarity] || $$props.cards[get(i)].rarity);
				});
				append($$anchor, div_11);
			});
			var div_12 = sibling(node_4, 2);
			each(div_12, 21, () => $$props.cards, index, ($$anchor, _, k) => {
				var span = root_4$6();
				let classes;
				template_effect(() => classes = set_class(span, 1, "d", null, classes, {
					on: k === get(i),
					seen: k < get(i)
				}));
				append($$anchor, span);
			});
			reset(div_12);
			var div_13 = sibling(div_12, 2);
			var button_3 = child(div_13);
			var button_4 = sibling(button_3, 2);
			var text_4 = only_child(button_4, true);
			var button_5 = sibling(button_4, 2);
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
			delegated("click", button_6, () => set(showAll, true));
			append($$anchor, div_6);
		};
		if_block(node, ($$render) => {
			if (get(showAll)) $$render(consequent);
			else $$render(alternate, -1);
		});
		var node_5 = sibling(node, 2);
		var consequent_1 = ($$anchor) => {
			CardModal($$anchor, {
				get item() {
					return get(selected);
				},
				readonly: true,
				onclose: () => set(selected, null)
			});
		};
		if_block(node_5, ($$render) => {
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
	var root$5 = from_html(`<div class="special-note">Un paquet spécial est disponible sur le site. <button class="link-btn">Ouvrir la version originale</button></div>`);
	var root_1$5 = from_html(`<span class="booster-back b2"></span>`);
	var root_2$5 = from_html(`<span class="booster-back b1"></span>`);
	var root_3$5 = from_html(`<div class="regen-line">Prochain paquet dans <b> </b></div>`);
	var root_4$5 = from_html(`<div class="special-note">Vérification humaine requise par le jeu. <button class="link-btn">Ouvrir la version originale pour valider</button></div>`);
	var root_5$5 = from_html(`<div class="regen-line err"> </div>`);
	var root_6$5 = from_html(`<div class="session-recap"> </div>`);
	var root_7$5 = from_html(`<div class="pull-ready"><!> <h1>Ouvrir un paquet</h1> <div class="sub">Découvrez 5 nouvelles cartes Wikipédia</div> <div class="booster-stage"><button aria-label="Ouvrir le paquet"><!> <!> <span class="booster-main"><img alt="Paquet WikiMasters" draggable="false"/> <span class="booster-shine"></span></span></button></div> <div><span class="pc-num"> </span> <span class="pc-lbl"> </span></div> <button class="btn primary big"> </button> <!> <!> <!> <!></div>`);
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
		data.specialAvailable?.().then((v) => set(special, v, true)).catch(() => {});
		function toOriginal() {
			try {
				localStorage.setItem("wm-off", "1");
			} catch {}
			location.reload();
		}
		let packs = user_derived(() => $$props.profile?.packs_remaining ?? null);
		let empty = user_derived(() => !$$props.profile || get(packs) == null || get(packs) === 0);
		let stackDepth = user_derived(() => Math.min(3, Math.max(1, get(packs) || 1)));
		async function open() {
			if (get(busy) || get(empty)) return;
			set(busy, true);
			set(opening, true);
			set(error, "");
			set(needVerify, false);
			const minAnim = new Promise((r) => setTimeout(r, 900));
			try {
				const [d] = await Promise.all([data.openPack(), minAnim]);
				if (!d?.cards?.length) {
					set(error, "Aucune carte reçue. Réessayez dans un instant.");
					set(opening, false);
					set(busy, false);
					return;
				}
				set(cards, d.cards, true);
				recordPull(d.cards);
				set(phase, "revealing");
				$$props.onchanged?.();
			} catch (e) {
				if (e && e.code === "human_verification") set(needVerify, true);
				else set(error, e?.message || "Ouverture du paquet impossible.", true);
				set(opening, false);
			}
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
		var fragment = comment();
		var node = first_child(fragment);
		var consequent = ($$anchor) => {
			Reveal($$anchor, {
				get cards() {
					return get(cards);
				},
				ondone: done
			});
		};
		var alternate = ($$anchor) => {
			var div = root_7$5();
			var node_1 = child(div);
			var consequent_1 = ($$anchor) => {
				var div_1 = root$5();
				var button = sibling(child(div_1));
				reset(div_1);
				delegated("click", button, toOriginal);
				append($$anchor, div_1);
			};
			if_block(node_1, ($$render) => {
				if (get(special)) $$render(consequent_1);
			});
			var div_2 = sibling(node_1, 6);
			var button_1 = child(div_2);
			let classes;
			var node_2 = child(button_1);
			var consequent_2 = ($$anchor) => {
				var span = root_1$5();
				set_style(span, "background-image:url(/card_pack.png)");
				append($$anchor, span);
			};
			if_block(node_2, ($$render) => {
				if (!get(opening) && get(stackDepth) > 2) $$render(consequent_2);
			});
			var node_3 = sibling(node_2, 2);
			var consequent_3 = ($$anchor) => {
				var span_1 = root_2$5();
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
			reset(div_2);
			var div_3 = sibling(div_2, 2);
			let classes_1;
			var span_3 = child(div_3);
			var text = only_child(span_3, true);
			var text_1 = only_child(sibling(span_3, 2));
			reset(div_3);
			var button_2 = sibling(div_3, 2);
			var text_2 = only_child(button_2, true);
			var node_4 = sibling(button_2, 2);
			var consequent_4 = ($$anchor) => {
				var div_4 = root_3$5();
				var text_3 = only_child(sibling(child(div_4)), true);
				reset(div_4);
				template_effect(($0) => set_text(text_3, $0), [() => fmt(get(secs))]);
				append($$anchor, div_4);
			};
			if_block(node_4, ($$render) => {
				if (get(secs) != null) $$render(consequent_4);
			});
			var node_5 = sibling(node_4, 2);
			var consequent_5 = ($$anchor) => {
				var div_5 = root_4$5();
				var button_3 = sibling(child(div_5));
				reset(div_5);
				delegated("click", button_3, toOriginal);
				append($$anchor, div_5);
			};
			if_block(node_5, ($$render) => {
				if (get(needVerify)) $$render(consequent_5);
			});
			var node_6 = sibling(node_5, 2);
			var consequent_6 = ($$anchor) => {
				var div_6 = root_5$5();
				var text_4 = only_child(div_6, true);
				template_effect(() => set_text(text_4, get(error)));
				append($$anchor, div_6);
			};
			if_block(node_6, ($$render) => {
				if (get(error)) $$render(consequent_6);
			});
			var node_7 = sibling(node_6, 2);
			var consequent_7 = ($$anchor) => {
				var div_7 = root_6$5();
				var text_5 = only_child(div_7);
				template_effect(() => set_text(text_5, `Cette session : ${session.packs ?? ""} paquet${session.packs > 1 ? "s" : ""} ouvert${session.packs > 1 ? "s" : ""}, ${session.newCards ?? ""} nouvelle${session.newCards > 1 ? "s" : ""}`));
				append($$anchor, div_7);
			};
			if_block(node_7, ($$render) => {
				if (session.packs > 0) $$render(consequent_7);
			});
			reset(div);
			template_effect(() => {
				classes = set_class(button_1, 1, "booster", null, classes, {
					opening: get(opening),
					empty: get(empty)
				});
				button_1.disabled = get(busy) || get(empty);
				classes_1 = set_class(div_3, 1, "pack-count", null, classes_1, { empty: get(empty) });
				set_text(text, get(packs) ?? "-");
				set_text(text_1, `paquet${get(packs) > 1 ? "s" : ""} disponible${get(packs) > 1 ? "s" : ""}${$$props.profile?.pack_cap ? ` sur ${$$props.profile.pack_cap}` : ""}`);
				button_2.disabled = get(busy) || get(empty);
				set_text(text_2, get(busy) ? "Ouverture..." : get(empty) ? "Aucun paquet" : "Ouvrir le paquet");
			});
			delegated("click", button_1, open);
			delegated("click", button_2, open);
			append($$anchor, div);
		};
		if_block(node, ($$render) => {
			if (get(phase) === "revealing") $$render(consequent);
			else $$render(alternate, -1);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate(["click"]);
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
	var root$4 = from_html(`<div class="empty"><b> </b><div>Vérifiez que vous êtes connecté, puis réessayez.</div><button class="btn">Réessayer</button></div>`);
	var root_1$4 = from_html(`<div class="wc skeleton"></div>`);
	var root_2$4 = from_html(`<div class="grid"></div>`);
	var root_3$4 = from_html(`<button class="search-clear" aria-label="Effacer la recherche"><svg class="x-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>`);
	var root_4$4 = from_html(`<option>Attaque</option> <option>Défense</option>`, 1);
	var root_5$4 = from_svg(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"></path><path d="M10.6 10.7a3 3 0 0 0 3.9 3.9"></path><path d="M9.8 4.7A10.4 10.4 0 0 1 12 4.5c6 0 9.5 7 9.5 7a17.6 17.6 0 0 1-2.9 3.8M6 6.2A17.3 17.3 0 0 0 2.5 11.5s3.5 7 9.5 7c1 0 1.9-.1 2.8-.4"></path></svg>`);
	var root_6$4 = from_svg(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 11.5S6 4.5 12 4.5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"></path><circle cx="12" cy="11.5" r="3"></circle></svg>`);
	var root_7$4 = from_html(`<button class="iconbtn"> </button>`);
	var root_8$4 = from_html(`<!> <button><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="4"></rect><path d="M8 12l2.8 2.8L16.5 9"></path></svg> <span> </span></button>`, 1);
	var root_9$4 = from_html(`<div class="sort-hint"> </div>`);
	var root_10$3 = from_html(`<button></button>`);
	var root_11$3 = from_html(`<button><span class="rl-dot"></span> <span class="rl-name"> </span> <span class="rl-n"> </span></button>`);
	var root_12$2 = from_html(`<span class="rl-sep" aria-hidden="true"></span>`);
	var root_13$1 = from_html(`<button title="Cartes favorites"><svg class="rl-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"></path></svg> <span class="rl-name">Favoris</span><span class="rl-n"> </span></button>`);
	var root_14 = from_html(`<button title="Cartes brillantes"><svg class="rl-ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l1.9 6.4L20 10l-6.1 1.6L12 18l-1.9-6.4L4 10l6.1-1.6z"></path></svg> <span class="rl-name">Brillantes</span><span class="rl-n"> </span></button>`);
	var root_15 = from_html(`<div class="rarity-panel"><div class="rarity-meter" role="img" aria-label="Répartition par rareté"></div> <div class="rarity-legend"><button><span class="rl-name">Toutes</span><span class="rl-n"> </span></button> <!> <!> <!> <!></div></div>`);
	var root_16 = from_html(`<div class="loading-more"> </div>`);
	var root_17 = from_html(`<div class="empty"><b> </b> <div> </div></div>`);
	var root_18 = from_html(`<span><span class="pick-check"> </span></span>`);
	var root_19 = from_html(`<button><!> <!></button>`);
	var root_20 = from_html(`<div class="coll-head"><div><h1>Ma collection</h1> <div class="meta"> </div></div> <div class="coll-tools"><div class="search-wrap"><svg class="search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.4-3.4"></path></svg> <input class="search" type="search" placeholder="Rechercher une carte..."/> <!></div> <div class="tool-actions"><div class="isel" title="Trier les cartes"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 5v14M7 19l-3-3M7 5l3 3M17 19V5M17 5l3 3M17 19l-3-3"></path></svg> <select aria-label="Trier"><option>Rareté</option><option>Valeur estimée</option><!><option>Nom</option></select></div> <button title="Afficher ou masquer l'ATK et la DEF sur les cartes"><!> <span>ATK/DEF</span></button> <!></div></div></div> <!> <!> <!> <!>`, 1);
	var root_21 = from_html(`<span class="bulk-text"> <b> </b> ?</span> <button class="btn">Annuler</button> <button class="btn danger"> </button>`, 1);
	var root_22 = from_html(`<span class="bulk-text"> </span> <button class="btn danger"> </button>`, 1);
	var root_23 = from_html(`<div class="bulk-bar"><!></div>`);
	var root_24 = from_html(`<!> <!> <!>`, 1);
	function Collection($$anchor, $$props) {
		push($$props, true);
		function onToggleStats() {
			toggleHideStats();
			if (settings.hideStats && (get(sort) === "atk" || get(sort) === "def")) set(sort, "rarity");
		}
		let items = state(null);
		let stats = state(null);
		let error = state("");
		let filter = state("ALL");
		let search = state("");
		let sort = state("rarity");
		let favOnly = state(false);
		let shinyOnly = state(false);
		let selected = state(null);
		let values = proxy({});
		let valuesLoaded = state(0);
		const sortVals = new Map();
		let valuesTick = state(0);
		const vq = createQueue({ concurrency: 5 });
		const cardById = new Map();
		let io = null;
		let tickTimer = null;
		function scheduleTick() {
			if (tickTimer) return;
			tickTimer = setTimeout(() => {
				tickTimer = null;
				update(valuesTick);
			}, 200);
		}
		function enqueueValue(id, front = false) {
			if (values[id] !== void 0 || !cardById.has(id)) return;
			vq.push(id, async () => {
				const v = await marketValueFor(cardById.get(id)).catch(() => null);
				values[id] = v ?? null;
				sortVals.set(id, typeof v === "number" ? v : -1);
				update(valuesLoaded);
				scheduleTick();
			});
			if (front) vq.prioritize(id);
		}
		function watchValue(node, it) {
			if (typeof IntersectionObserver !== "undefined" && !io) io = new IntersectionObserver((entries) => {
				for (const e of entries) {
					if (!e.isIntersecting) continue;
					const id = e.target.__cardId;
					if (id != null) {
						enqueueValue(id, true);
						io.unobserve(e.target);
					}
				}
			}, { rootMargin: "300px" });
			node.__cardId = it.card.id;
			io?.observe(node);
			return {
				update(next) {
					node.__cardId = next.card.id;
					if (values[next.card.id] === void 0) io?.observe(node);
				},
				destroy() {
					io?.unobserve(node);
				}
			};
		}
		let selecting = state(false);
		let picked = state(proxy(new Set()));
		let bulkConfirm = state(false);
		let bulkBusy = state(false);
		function onCardClick(it) {
			if (!get(selecting)) {
				set(selected, it, true);
				return;
			}
			const n = new Set(get(picked));
			n.has(it.id) ? n.delete(it.id) : n.add(it.id);
			set(picked, n, true);
		}
		function toggleSelecting() {
			set(selecting, !get(selecting));
			if (!get(selecting)) {
				set(picked, new Set(), true);
				set(bulkConfirm, false);
			}
		}
		function toggleSelectAll() {
			set(picked, get(allShownPicked) ? new Set() : new Set(get(shown).map((it) => it.id)), true);
		}
		async function bulkDiscard() {
			set(bulkBusy, true);
			const ids = [...get(picked)];
			try {
				await Promise.all(ids.map((id) => data.discard(id).catch(() => {})));
			} finally {
				set(bulkBusy, false);
				set(bulkConfirm, false);
				set(selecting, false);
				set(picked, new Set(), true);
				await load();
				$$props.onwallet?.();
			}
		}
		const RARITIES = [
			"L",
			"UR",
			"SR",
			"R",
			"PC",
			"C"
		];
		const RANK = {
			L: 5,
			UR: 4,
			SR: 3,
			R: 2,
			PC: 1,
			C: 0
		};
		async function load() {
			set(error, "");
			set(items, null);
			try {
				const d = await data.collection({ onPartial: (p) => {
					set(items, p.items, true);
					set(stats, p.stats, true);
				} });
				set(items, d.items, true);
				set(stats, d.stats, true);
				cardById.clear();
				for (const it of get(items)) cardById.set(it.card.id, it.card);
			} catch (e) {
				set(error, "Impossible de charger la collection.");
				set(items, [], true);
				set(stats, {
					unique: 0,
					total: 0,
					catalog: null,
					counts: {}
				}, true);
			}
		}
		load();
		user_effect(() => {
			if (get(sort) === "value" && get(items)) for (const it of get(items)) enqueueValue(it.card.id);
		});
		user_effect(() => () => {
			io?.disconnect();
			io = null;
			if (tickTimer) clearTimeout(tickTimer);
		});
		let shown = user_derived(() => {
			if (!get(items)) return [];
			get(valuesTick);
			const q = normSearch(get(search));
			let list = get(items).filter((it) => {
				if (get(filter) !== "ALL" && it.card.rarity !== get(filter)) return false;
				if (get(favOnly) && !it.starred) return false;
				if (get(shinyOnly) && !it.is_shiny) return false;
				if (q && !(it._s || "").includes(q)) return false;
				return true;
			});
			const val = (it) => sortVals.get(it.card.id) ?? -1;
			const cmp = {
				rarity: (a, b) => RANK[b.card.rarity] - RANK[a.card.rarity] || b.count - a.count,
				value: (a, b) => val(b) - val(a) || RANK[b.card.rarity] - RANK[a.card.rarity],
				atk: (a, b) => b.card.atk - a.card.atk,
				def: (a, b) => b.card.def - a.card.def,
				name: (a, b) => a.card.title.localeCompare(b.card.title, "fr")
			}[get(sort)];
			return cmp ? [...list].sort(cmp) : list;
		});
		let starredCount = user_derived(() => get(items) ? get(items).filter((it) => it.starred).length : 0);
		let hasStarred = user_derived(() => get(starredCount) > 0);
		let shinyCount = user_derived(() => get(items) ? get(items).filter((it) => it.is_shiny).length : 0);
		let allShownPicked = user_derived(() => get(shown).length > 0 && get(shown).every((it) => get(picked).has(it.id)));
		var fragment = root_24();
		var node_1 = first_child(fragment);
		var consequent = ($$anchor) => {
			var div = root$4();
			var b_1 = child(div);
			var text = only_child(b_1, true);
			var button = sibling(b_1, 2);
			reset(div);
			template_effect(() => set_text(text, get(error)));
			delegated("click", button, load);
			append($$anchor, div);
		};
		var consequent_1 = ($$anchor) => {
			var div_1 = root_2$4();
			each(div_1, 20, () => Array(10), index, ($$anchor, _) => {
				append($$anchor, root_1$4());
			});
			reset(div_1);
			append($$anchor, div_1);
		};
		var alternate_2 = ($$anchor) => {
			var fragment_1 = root_20();
			var div_3 = first_child(fragment_1);
			var div_4 = child(div_3);
			var text_1 = only_child(sibling(child(div_4), 2));
			reset(div_4);
			var div_6 = sibling(div_4, 2);
			var div_7 = child(div_6);
			var input = sibling(child(div_7), 2);
			remove_input_defaults(input);
			var node_2 = sibling(input, 2);
			var consequent_2 = ($$anchor) => {
				var button_1 = root_3$4();
				delegated("click", button_1, () => set(search, ""));
				append($$anchor, button_1);
			};
			if_block(node_2, ($$render) => {
				if (get(search)) $$render(consequent_2);
			});
			reset(div_7);
			var div_8 = sibling(div_7, 2);
			var div_9 = child(div_8);
			var select = sibling(child(div_9), 2);
			var option = child(select);
			option.value = option.__value = "rarity";
			var option_1 = sibling(option);
			option_1.value = option_1.__value = "value";
			var node_3 = sibling(option_1);
			var consequent_3 = ($$anchor) => {
				var fragment_2 = root_4$4();
				var option_2 = first_child(fragment_2);
				option_2.value = option_2.__value = "atk";
				var option_3 = sibling(option_2, 2);
				option_3.value = option_3.__value = "def";
				append($$anchor, fragment_2);
			};
			if_block(node_3, ($$render) => {
				if (!settings.hideStats) $$render(consequent_3);
			});
			var option_4 = sibling(node_3);
			option_4.value = option_4.__value = "name";
			reset(select);
			init_select(select);
			reset(div_9);
			var button_2 = sibling(div_9, 2);
			let classes;
			var node_4 = child(button_2);
			var consequent_4 = ($$anchor) => {
				append($$anchor, root_5$4());
			};
			var alternate = ($$anchor) => {
				append($$anchor, root_6$4());
			};
			if_block(node_4, ($$render) => {
				if (settings.hideStats) $$render(consequent_4);
				else $$render(alternate, -1);
			});
			next(2);
			reset(button_2);
			var node_5 = sibling(button_2, 2);
			var consequent_6 = ($$anchor) => {
				var fragment_3 = root_8$4();
				var node_6 = first_child(fragment_3);
				var consequent_5 = ($$anchor) => {
					var button_3 = root_7$4();
					var text_2 = only_child(button_3, true);
					template_effect(() => set_text(text_2, get(allShownPicked) ? "Tout désélectionner" : "Tout sélectionner"));
					delegated("click", button_3, toggleSelectAll);
					append($$anchor, button_3);
				};
				if_block(node_6, ($$render) => {
					if (get(selecting)) $$render(consequent_5);
				});
				var button_4 = sibling(node_6, 2);
				let classes_1;
				var text_3 = only_child(sibling(child(button_4), 2), true);
				reset(button_4);
				template_effect(() => {
					classes_1 = set_class(button_4, 1, "iconbtn", null, classes_1, { on: get(selecting) });
					set_text(text_3, get(selecting) ? "Annuler" : "Sélectionner");
				});
				delegated("click", button_4, toggleSelecting);
				append($$anchor, fragment_3);
			};
			if_block(node_5, ($$render) => {
				if (data.canAct) $$render(consequent_6);
			});
			reset(div_8);
			reset(div_6);
			reset(div_3);
			var node_7 = sibling(div_3, 2);
			var consequent_7 = ($$anchor) => {
				var div_10 = root_9$4();
				var text_4 = only_child(div_10);
				template_effect(() => set_text(text_4, `Estimation des valeurs... ${get(valuesLoaded) ?? ""} / ${get(items).length ?? ""}. Le tri s'affine au fur et à mesure.`));
				append($$anchor, div_10);
			};
			if_block(node_7, ($$render) => {
				if (get(sort) === "value" && get(items) && get(valuesLoaded) < get(items).length) $$render(consequent_7);
			});
			var node_8 = sibling(node_7, 2);
			var consequent_13 = ($$anchor) => {
				var div_11 = root_15();
				var div_12 = child(div_11);
				each(div_12, 21, () => RARITIES, index, ($$anchor, r) => {
					var fragment_4 = comment();
					var node_9 = first_child(fragment_4);
					var consequent_8 = ($$anchor) => {
						var button_5 = root_10$3();
						let classes_2;
						template_effect(($0) => {
							classes_2 = set_class(button_5, 1, "rm-seg", null, classes_2, {
								sel: get(filter) === get(r),
								dim: get(filter) !== "ALL" && get(filter) !== get(r)
							});
							set_style(button_5, `--rc:var(--r-${$0 ?? ""}); flex-grow:${get(stats).counts[get(r)] ?? ""}`);
							set_attribute(button_5, "title", `${RNAME[get(r)] ?? ""} : ${get(stats).counts[get(r)] ?? ""}`);
							set_attribute(button_5, "aria-label", `${RNAME[get(r)] ?? ""} : ${get(stats).counts[get(r)] ?? ""}`);
						}, [() => get(r).toLowerCase()]);
						delegated("click", button_5, () => set(filter, get(filter) === get(r) ? "ALL" : get(r), true));
						append($$anchor, button_5);
					};
					if_block(node_9, ($$render) => {
						if ((get(stats).counts[get(r)] || 0) > 0) $$render(consequent_8);
					});
					append($$anchor, fragment_4);
				});
				reset(div_12);
				var div_13 = sibling(div_12, 2);
				var button_6 = child(div_13);
				let classes_3;
				var text_5 = only_child(sibling(child(button_6)), true);
				reset(button_6);
				var node_10 = sibling(button_6, 2);
				each(node_10, 17, () => RARITIES, index, ($$anchor, r) => {
					var fragment_5 = comment();
					var node_11 = first_child(fragment_5);
					var consequent_9 = ($$anchor) => {
						var button_7 = root_11$3();
						let classes_4;
						var span_2 = child(button_7);
						var span_3 = sibling(span_2, 2);
						var text_6 = only_child(span_3, true);
						var text_7 = only_child(sibling(span_3, 2), true);
						reset(button_7);
						template_effect(($0) => {
							classes_4 = set_class(button_7, 1, "rl", null, classes_4, { on: get(filter) === get(r) });
							set_style(span_2, `background:var(--r-${$0 ?? ""})`);
							set_text(text_6, RNAME[get(r)]);
							set_text(text_7, get(stats).counts[get(r)]);
						}, [() => get(r).toLowerCase()]);
						delegated("click", button_7, () => set(filter, get(filter) === get(r) ? "ALL" : get(r), true));
						append($$anchor, button_7);
					};
					if_block(node_11, ($$render) => {
						if ((get(stats).counts[get(r)] || 0) > 0) $$render(consequent_9);
					});
					append($$anchor, fragment_5);
				});
				var node_12 = sibling(node_10, 2);
				var consequent_10 = ($$anchor) => {
					append($$anchor, root_12$2());
				};
				if_block(node_12, ($$render) => {
					if (get(hasStarred) || get(favOnly) || get(shinyCount) > 0 || get(shinyOnly)) $$render(consequent_10);
				});
				var node_13 = sibling(node_12, 2);
				var consequent_11 = ($$anchor) => {
					var button_8 = root_13$1();
					let classes_5;
					var text_8 = only_child(sibling(child(button_8), 3), true);
					reset(button_8);
					template_effect(() => {
						classes_5 = set_class(button_8, 1, "rl special fav", null, classes_5, { on: get(favOnly) });
						set_text(text_8, get(starredCount));
					});
					delegated("click", button_8, () => set(favOnly, !get(favOnly)));
					append($$anchor, button_8);
				};
				if_block(node_13, ($$render) => {
					if (get(hasStarred) || get(favOnly)) $$render(consequent_11);
				});
				var node_14 = sibling(node_13, 2);
				var consequent_12 = ($$anchor) => {
					var button_9 = root_14();
					let classes_6;
					var text_9 = only_child(sibling(child(button_9), 3), true);
					reset(button_9);
					template_effect(() => {
						classes_6 = set_class(button_9, 1, "rl special shiny", null, classes_6, { on: get(shinyOnly) });
						set_text(text_9, get(shinyCount));
					});
					delegated("click", button_9, () => set(shinyOnly, !get(shinyOnly)));
					append($$anchor, button_9);
				};
				if_block(node_14, ($$render) => {
					if (get(shinyCount) > 0 || get(shinyOnly)) $$render(consequent_12);
				});
				reset(div_13);
				reset(div_11);
				template_effect(() => {
					classes_3 = set_class(button_6, 1, "rl", null, classes_3, { on: get(filter) === "ALL" });
					set_text(text_5, get(stats).unique);
				});
				delegated("click", button_6, () => set(filter, "ALL"));
				append($$anchor, div_11);
			};
			if_block(node_8, ($$render) => {
				if (get(stats).unique > 0) $$render(consequent_13);
			});
			var node_15 = sibling(node_8, 2);
			var consequent_14 = ($$anchor) => {
				var div_14 = root_16();
				var text_10 = only_child(div_14);
				template_effect(() => set_text(text_10, `Chargement des cartes... ${get(items)?.length ?? 0 ?? ""} / ${get(stats).unique ?? ""}`));
				append($$anchor, div_14);
			};
			if_block(node_15, ($$render) => {
				if (get(stats)?.loading) $$render(consequent_14);
			});
			var node_16 = sibling(node_15, 2);
			var consequent_15 = ($$anchor) => {
				var div_15 = root_17();
				var b_2 = child(div_15);
				var text_11 = only_child(b_2, true);
				var text_12 = only_child(sibling(b_2, 2), true);
				reset(div_15);
				template_effect(() => {
					set_text(text_11, get(search) || get(filter) !== "ALL" ? "Aucune carte ne correspond" : "Rien ici pour l'instant");
					set_text(text_12, get(search) || get(filter) !== "ALL" ? "Essayez un autre filtre ou une autre recherche." : "Ouvrez un paquet pour commencer votre collection.");
				});
				append($$anchor, div_15);
			};
			var alternate_1 = ($$anchor) => {
				var div_17 = root_2$4();
				each(div_17, 21, () => get(shown), (it) => it.card.id, ($$anchor, it) => {
					var button_10 = root_19();
					let classes_7;
					var node_17 = child(button_10);
					Card(node_17, {
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
					var node_18 = sibling(node_17, 2);
					var consequent_16 = ($$anchor) => {
						var span_8 = root_18();
						let classes_8;
						var text_13 = only_child(child(span_8), true);
						reset(span_8);
						template_effect(($0, $1) => {
							classes_8 = set_class(span_8, 1, "pick-overlay", null, classes_8, { on: $0 });
							set_text(text_13, $1);
						}, [() => get(picked).has(get(it).id), () => get(picked).has(get(it).id) ? "✓" : ""]);
						append($$anchor, span_8);
					};
					if_block(node_18, ($$render) => {
						if (get(selecting)) $$render(consequent_16);
					});
					reset(button_10);
					action(button_10, ($$node, $$action_arg) => watchValue?.($$node, $$action_arg), () => get(it));
					template_effect(($0) => {
						classes_7 = set_class(button_10, 1, "card-btn", null, classes_7, {
							picking: get(selecting),
							picked: $0
						});
						set_attribute(button_10, "aria-label", get(it).card.title);
					}, [() => get(selecting) && get(picked).has(get(it).id)]);
					delegated("click", button_10, () => onCardClick(get(it)));
					append($$anchor, button_10);
				});
				reset(div_17);
				append($$anchor, div_17);
			};
			if_block(node_16, ($$render) => {
				if (get(shown).length === 0) $$render(consequent_15);
				else $$render(alternate_1, -1);
			});
			template_effect(() => {
				set_text(text_1, `${get(stats).unique ?? ""} carte${get(stats).unique > 1 ? "s" : ""} unique${get(stats).unique > 1 ? "s" : ""}${get(stats).catalog ? ` sur ${get(stats).catalog}` : ""} · ${get(stats).total ?? ""} au total`);
				classes = set_class(button_2, 1, "iconbtn", null, classes, { on: settings.hideStats });
			});
			bind_value(input, () => get(search), ($$value) => set(search, $$value));
			bind_select_value(select, () => get(sort), ($$value) => set(sort, $$value));
			delegated("click", button_2, onToggleStats);
			append($$anchor, fragment_1);
		};
		if_block(node_1, ($$render) => {
			if (get(error)) $$render(consequent);
			else if (!get(items)) $$render(consequent_1, 1);
			else $$render(alternate_2, -1);
		});
		var node_19 = sibling(node_1, 2);
		var consequent_18 = ($$anchor) => {
			var div_18 = root_23();
			var node_20 = child(div_18);
			var consequent_17 = ($$anchor) => {
				var fragment_6 = root_21();
				var span_10 = first_child(fragment_6);
				var text_14 = child(span_10);
				var text_15 = only_child(sibling(text_14));
				next();
				reset(span_10);
				var button_11 = sibling(span_10, 2);
				var button_12 = sibling(button_11, 2);
				var text_16 = only_child(button_12, true);
				template_effect(() => {
					set_text(text_14, `Défausser ${get(picked).size ?? ""} carte${get(picked).size > 1 ? "s" : ""} contre `);
					set_text(text_15, `${get(picked).size ?? ""} point${get(picked).size > 1 ? "s" : ""}`);
					button_11.disabled = get(bulkBusy);
					button_12.disabled = get(bulkBusy);
					set_text(text_16, get(bulkBusy) ? "Défausse..." : "Confirmer");
				});
				delegated("click", button_11, () => set(bulkConfirm, false));
				delegated("click", button_12, bulkDiscard);
				append($$anchor, fragment_6);
			};
			var alternate_3 = ($$anchor) => {
				var fragment_7 = root_22();
				var span_11 = first_child(fragment_7);
				var text_17 = only_child(span_11);
				var button_13 = sibling(span_11, 2);
				var text_18 = only_child(button_13);
				template_effect(() => {
					set_text(text_17, `${get(picked).size ?? ""} sélectionnée${get(picked).size > 1 ? "s" : ""}`);
					set_text(text_18, `Défausser · +${get(picked).size ?? ""} pts`);
				});
				delegated("click", button_13, () => set(bulkConfirm, true));
				append($$anchor, fragment_7);
			};
			if_block(node_20, ($$render) => {
				if (get(bulkConfirm)) $$render(consequent_17);
				else $$render(alternate_3, -1);
			});
			reset(div_18);
			append($$anchor, div_18);
		};
		if_block(node_19, ($$render) => {
			if (get(selecting) && get(picked).size > 0) $$render(consequent_18);
		});
		var node_21 = sibling(node_19, 2);
		var consequent_19 = ($$anchor) => {
			CardModal($$anchor, {
				get item() {
					return get(selected);
				},
				onclose: () => set(selected, null),
				onaction: () => {
					load();
					$$props.onwallet?.();
				}
			});
		};
		if_block(node_21, ($$render) => {
			if (get(selected)) $$render(consequent_19);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate(["click"]);
	var root$3 = from_html(`<button class="search-clear" aria-label="Effacer la recherche"><svg class="x-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>`);
	var root_1$3 = from_html(`<option> </option>`);
	var root_2$3 = from_svg(`<path d="M3 3l18 18"></path><path d="M10.6 10.7a3 3 0 0 0 3.9 3.9"></path><path d="M9.8 4.7A10.4 10.4 0 0 1 12 4.5c6 0 9.5 7 9.5 7a17.6 17.6 0 0 1-2.9 3.8M6 6.2A17.3 17.3 0 0 0 2.5 11.5s3.5 7 9.5 7c1 0 1.9-.1 2.8-.4"></path>`, 1);
	var root_3$3 = from_svg(`<path d="M2.5 11.5S6 4.5 12 4.5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"></path><circle cx="12" cy="11.5" r="3"></circle>`, 1);
	var root_4$3 = from_html(`<button></button>`);
	var root_5$3 = from_html(`<button><span class="rl-dot"></span> <span class="rl-name"> </span><span class="rl-n"> </span></button>`);
	var root_6$3 = from_html(`<div class="rarity-panel"><div class="rarity-meter" role="group" aria-label="Filtrer par rareté"></div> <div class="rarity-legend"><button><span class="rl-name">Toutes</span></button> <!></div></div>`);
	var root_7$3 = from_html(`<div class="empty"><b> </b><button class="btn">Réessayer</button></div>`);
	var root_8$3 = from_html(`<div class="wc skeleton"></div>`);
	var root_9$3 = from_html(`<div class="grid"></div>`);
	var root_10$2 = from_html(`<div class="empty"><b>Aucune carte ne correspond</b><div>Essayez un autre terme de recherche.</div></div>`);
	var root_11$2 = from_html(`<button class="card-btn"><!></button>`);
	var root_12$1 = from_html(`<div></div> <div class="pager"><button class="btn pager-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg> Précédent</button> <span class="pager-info"> </span> <button class="btn pager-btn">Suivant <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg></button></div>`, 1);
	var root_13 = from_html(`<div class="coll-head"><div><h1>Toutes les cartes</h1> <div class="meta"><!> <!></div></div> <div class="coll-tools"><div class="search-wrap"><svg class="search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.4-3.4"></path></svg> <input class="search" type="search" placeholder="Rechercher dans 2,7 M de cartes..."/> <!></div> <div class="tool-actions"><div class="isel" title="Trier"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 5v14M7 19l-3-3M7 5l3 3M17 19V5M17 5l3 3M17 19l-3-3"></path></svg> <select aria-label="Trier"></select></div> <button title="N'afficher que ma liste de souhaits"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 20.5S3.5 14.7 3.5 9.2A4.2 4.2 0 0 1 12 6.5a4.2 4.2 0 0 1 8.5 2.7c0 5.5-8.5 11.3-8.5 11.3z"></path></svg> <span>Souhaits</span></button> <button title="Afficher ou masquer l'ATK et la DEF"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 11.5S6 4.5 12 4.5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"></path><circle cx="12" cy="11.5" r="3"></circle></svg> <span>ATK/DEF</span></button> <button title="Afficher ou flouter les images sensibles"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><!></svg> <span>Sensible</span></button></div></div></div> <!> <!> <!>`, 1);
	function Catalog($$anchor, $$props) {
		push($$props, true);
		const RARITIES = [
			"L",
			"UR",
			"SR",
			"R",
			"PC",
			"C"
		];
		const nf = (n) => Number(n).toLocaleString("fr");
		const SORTS = [
			["rarity", "Rareté"],
			["name", "Nom"],
			["atk", "Attaque"],
			["def", "Défense"]
		];
		let cards = state(null);
		let rarityCounts = state(null);
		let total = state(null);
		let hasMore = state(false);
		let page = state(0);
		let search = state("");
		let qActive = state("");
		let sort = state("rarity");
		let rarity = state("");
		let wishOnly = state(false);
		let loading = state(false);
		let error = state("");
		let selected = state(null);
		let values = proxy({});
		const vq = createQueue({ concurrency: 4 });
		const cardById = new Map();
		let io = null;
		function enqueueValue(id) {
			if (values[id] !== void 0 || !cardById.has(id)) return;
			vq.push(id, async () => {
				const v = await marketValueFor(cardById.get(id)).catch(() => null);
				values[id] = v ?? null;
			});
		}
		function watchValue(node, card) {
			if (typeof IntersectionObserver !== "undefined" && !io) io = new IntersectionObserver((es) => {
				for (const e of es) if (e.isIntersecting) {
					const id = e.target.__id;
					if (id) {
						enqueueValue(id);
						io.unobserve(e.target);
					}
				}
			}, { rootMargin: "300px" });
			node.__id = card.id;
			io?.observe(node);
			return {
				update(c) {
					node.__id = c.id;
				},
				destroy() {
					io?.unobserve(node);
				}
			};
		}
		let reqToken = 0;
		async function load() {
			const my = ++reqToken;
			set(loading, true);
			set(error, "");
			try {
				const d = await data.catalog({
					page: get(page),
					sort: get(sort),
					q: get(qActive),
					rarity: get(rarity),
					wishlist: get(wishOnly)
				});
				if (my !== reqToken) return;
				set(cards, d.cards, true);
				set(total, d.total, true);
				set(hasMore, d.hasMore, true);
				if (d.rarityCounts) set(rarityCounts, d.rarityCounts, true);
				cardById.clear();
				for (const c of d.cards) cardById.set(c.id, c);
			} catch (e) {
				if (my !== reqToken) return;
				set(error, "Impossible de charger les cartes.");
				set(cards, [], true);
			} finally {
				if (my === reqToken) set(loading, false);
			}
		}
		load();
		let deb;
		user_effect(() => {
			const s = get(search).trim();
			clearTimeout(deb);
			deb = setTimeout(() => {
				if (s !== get(qActive)) {
					set(qActive, s, true);
					set(page, 0);
					load();
				}
			}, 350);
			return () => clearTimeout(deb);
		});
		user_effect(() => () => {
			io?.disconnect();
			io = null;
			clearTimeout(deb);
		});
		let hasNext = user_derived(() => get(qActive) ? get(hasMore) : get(total) != null ? (get(page) + 1) * 50 < get(total) : get(hasMore));
		let catalogTotal = user_derived(() => get(rarityCounts) ? RARITIES.reduce((n, r) => n + (get(rarityCounts)[r] || 0), 0) : get(total));
		function go(delta) {
			set(page, Math.max(0, get(page) + delta), true);
			load();
		}
		function setRarity(r) {
			set(rarity, get(rarity) === r ? "" : r, true);
			set(page, 0);
			load();
		}
		function setSort(s) {
			set(sort, s, true);
			set(page, 0);
			load();
		}
		function toggleWishOnly() {
			set(wishOnly, !get(wishOnly));
			set(page, 0);
			load();
		}
		async function toggleWishlist(card) {
			const next = !card.wishlisted;
			card.wishlisted = next;
			try {
				next ? await data.wishlistAdd(card.id) : await data.wishlistRemove(card.id);
			} catch {
				card.wishlisted = !next;
			}
		}
		var fragment = root_13();
		var div = first_child(fragment);
		var div_1 = child(div);
		var div_2 = sibling(child(div_1), 2);
		var node_1 = child(div_2);
		var consequent = ($$anchor) => {
			var text$1 = text();
			template_effect(($0) => set_text(text$1, `${$0 ?? ""} cartes dans le jeu`), [() => nf(get(catalogTotal))]);
			append($$anchor, text$1);
		};
		if_block(node_1, ($$render) => {
			if (get(catalogTotal) != null) $$render(consequent);
		});
		var node_2 = sibling(node_1, 2);
		var consequent_1 = ($$anchor) => {
			var text_1 = text();
			template_effect(() => set_text(text_1, `· résultats pour « ${get(qActive) ?? ""} »`));
			append($$anchor, text_1);
		};
		if_block(node_2, ($$render) => {
			if (get(qActive)) $$render(consequent_1);
		});
		reset(div_2);
		reset(div_1);
		var div_3 = sibling(div_1, 2);
		var div_4 = child(div_3);
		var input = sibling(child(div_4), 2);
		remove_input_defaults(input);
		var node_3 = sibling(input, 2);
		var consequent_2 = ($$anchor) => {
			var button = root$3();
			delegated("click", button, () => set(search, ""));
			append($$anchor, button);
		};
		if_block(node_3, ($$render) => {
			if (get(search)) $$render(consequent_2);
		});
		reset(div_4);
		var div_5 = sibling(div_4, 2);
		var div_6 = child(div_5);
		var select = sibling(child(div_6), 2);
		each(select, 21, () => SORTS, index, ($$anchor, $$item) => {
			var $$array = user_derived(() => to_array(get($$item), 2));
			let v = () => get($$array)[0];
			let lbl = () => get($$array)[1];
			var option = root_1$3();
			var text_2 = only_child(option, true);
			var option_value = {};
			template_effect(() => {
				set_text(text_2, lbl());
				if (option_value !== (option_value = v())) option.value = (option.__value = option_value) ?? "";
			});
			append($$anchor, option);
		});
		reset(select);
		var select_value;
		init_select(select);
		reset(div_6);
		var button_1 = sibling(div_6, 2);
		let classes;
		var svg = child(button_1);
		next(2);
		reset(button_1);
		var button_2 = sibling(button_1, 2);
		let classes_1;
		var button_3 = sibling(button_2, 2);
		let classes_2;
		var svg_1 = child(button_3);
		var node_4 = child(svg_1);
		var consequent_3 = ($$anchor) => {
			var fragment_3 = root_2$3();
			next(2);
			append($$anchor, fragment_3);
		};
		var alternate = ($$anchor) => {
			var fragment_4 = root_3$3();
			next();
			append($$anchor, fragment_4);
		};
		if_block(node_4, ($$render) => {
			if (settings.hideSensitive) $$render(consequent_3);
			else $$render(alternate, -1);
		});
		reset(svg_1);
		next(2);
		reset(button_3);
		reset(div_5);
		reset(div_3);
		reset(div);
		var node_5 = sibling(div, 2);
		var consequent_6 = ($$anchor) => {
			var div_7 = root_6$3();
			var div_8 = child(div_7);
			each(div_8, 21, () => RARITIES, index, ($$anchor, r) => {
				var fragment_5 = comment();
				var node_6 = first_child(fragment_5);
				var consequent_4 = ($$anchor) => {
					var button_4 = root_4$3();
					let classes_3;
					template_effect(($0, $1, $2) => {
						classes_3 = set_class(button_4, 1, "rm-seg", null, classes_3, {
							sel: get(rarity) === get(r),
							dim: get(rarity) !== "" && get(rarity) !== get(r)
						});
						set_style(button_4, `--rc:var(--r-${$0 ?? ""}); flex-grow:${get(rarityCounts)[get(r)] ?? ""}`);
						set_attribute(button_4, "title", `${RNAME[get(r)] ?? ""} : ${$1 ?? ""}`);
						set_attribute(button_4, "aria-label", `${RNAME[get(r)] ?? ""} : ${$2 ?? ""}`);
					}, [
						() => get(r).toLowerCase(),
						() => nf(get(rarityCounts)[get(r)]),
						() => nf(get(rarityCounts)[get(r)])
					]);
					delegated("click", button_4, () => setRarity(get(r)));
					append($$anchor, button_4);
				};
				if_block(node_6, ($$render) => {
					if ((get(rarityCounts)[get(r)] || 0) > 0) $$render(consequent_4);
				});
				append($$anchor, fragment_5);
			});
			reset(div_8);
			var div_9 = sibling(div_8, 2);
			var button_5 = child(div_9);
			let classes_4;
			each(sibling(button_5, 2), 17, () => RARITIES, index, ($$anchor, r) => {
				var fragment_6 = comment();
				var node_8 = first_child(fragment_6);
				var consequent_5 = ($$anchor) => {
					var button_6 = root_5$3();
					let classes_5;
					var span = child(button_6);
					var span_1 = sibling(span, 2);
					var text_3 = only_child(span_1, true);
					var text_4 = only_child(sibling(span_1), true);
					reset(button_6);
					template_effect(($0, $1) => {
						classes_5 = set_class(button_6, 1, "rl", null, classes_5, { on: get(rarity) === get(r) });
						set_style(span, `background:var(--r-${$0 ?? ""})`);
						set_text(text_3, RNAME[get(r)]);
						set_text(text_4, $1);
					}, [() => get(r).toLowerCase(), () => nf(get(rarityCounts)[get(r)])]);
					delegated("click", button_6, () => setRarity(get(r)));
					append($$anchor, button_6);
				};
				if_block(node_8, ($$render) => {
					if ((get(rarityCounts)[get(r)] || 0) > 0) $$render(consequent_5);
				});
				append($$anchor, fragment_6);
			});
			reset(div_9);
			reset(div_7);
			template_effect(() => classes_4 = set_class(button_5, 1, "rl", null, classes_4, { on: get(rarity) === "" }));
			delegated("click", button_5, () => setRarity(""));
			append($$anchor, div_7);
		};
		if_block(node_5, ($$render) => {
			if (get(rarityCounts)) $$render(consequent_6);
		});
		var node_9 = sibling(node_5, 2);
		var consequent_7 = ($$anchor) => {
			var div_10 = root_7$3();
			var b = child(div_10);
			var text_5 = only_child(b, true);
			var button_7 = sibling(b);
			reset(div_10);
			template_effect(() => set_text(text_5, get(error)));
			delegated("click", button_7, load);
			append($$anchor, div_10);
		};
		var consequent_8 = ($$anchor) => {
			var div_11 = root_9$3();
			each(div_11, 20, () => Array(12), index, ($$anchor, _) => {
				append($$anchor, root_8$3());
			});
			reset(div_11);
			append($$anchor, div_11);
		};
		var consequent_9 = ($$anchor) => {
			append($$anchor, root_10$2());
		};
		var alternate_1 = ($$anchor) => {
			var fragment_7 = root_12$1();
			var div_14 = first_child(fragment_7);
			let classes_6;
			each(div_14, 21, () => get(cards), (c) => c.id, ($$anchor, c) => {
				var button_8 = root_11$2();
				Card(child(button_8), {
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
				reset(button_8);
				action(button_8, ($$node, $$action_arg) => watchValue?.($$node, $$action_arg), () => get(c));
				template_effect(() => set_attribute(button_8, "aria-label", get(c).title));
				delegated("click", button_8, () => set(selected, get(c), true));
				append($$anchor, button_8);
			});
			reset(div_14);
			var div_15 = sibling(div_14, 2);
			var button_9 = child(div_15);
			var span_3 = sibling(button_9, 2);
			var text_6 = only_child(span_3);
			var button_10 = sibling(span_3, 2);
			reset(div_15);
			template_effect(() => {
				classes_6 = set_class(div_14, 1, "grid", null, classes_6, { dim: get(loading) });
				button_9.disabled = get(page) === 0 || get(loading);
				set_text(text_6, `Page ${get(page) + 1}`);
				button_10.disabled = !get(hasNext) || get(loading);
			});
			delegated("click", button_9, () => go(-1));
			delegated("click", button_10, () => go(1));
			append($$anchor, fragment_7);
		};
		if_block(node_9, ($$render) => {
			if (get(error)) $$render(consequent_7);
			else if (!get(cards)) $$render(consequent_8, 1);
			else if (get(cards).length === 0) $$render(consequent_9, 2);
			else $$render(alternate_1, -1);
		});
		var node_11 = sibling(node_9, 2);
		var consequent_10 = ($$anchor) => {
			{
				let $0 = user_derived(() => ({ card: get(selected) }));
				CardModal($$anchor, {
					get item() {
						return get($0);
					},
					readonly: true,
					get wishlisted() {
						return get(selected).wishlisted;
					},
					onwishlist: () => toggleWishlist(get(selected)),
					onclose: () => set(selected, null)
				});
			}
		};
		if_block(node_11, ($$render) => {
			if (get(selected)) $$render(consequent_10);
		});
		template_effect(() => {
			if (select_value !== (select_value = get(sort))) select.value = (select.__value = select_value) ?? "", select_option(select, select_value);
			classes = set_class(button_1, 1, "iconbtn", null, classes, { on: get(wishOnly) });
			set_attribute(svg, "fill", get(wishOnly) ? "currentColor" : "none");
			classes_1 = set_class(button_2, 1, "iconbtn", null, classes_1, { on: settings.hideStats });
			classes_2 = set_class(button_3, 1, "iconbtn", null, classes_2, { on: !settings.hideSensitive });
		});
		bind_value(input, () => get(search), ($$value) => set(search, $$value));
		delegated("change", select, (e) => setSort(e.currentTarget.value));
		delegated("click", button_1, toggleWishOnly);
		delegated("click", button_2, function(...$$args) {
			toggleHideStats?.apply(this, $$args);
		});
		delegated("click", button_3, function(...$$args) {
			toggleHideSensitive?.apply(this, $$args);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate(["click", "change"]);
	var root$2 = from_html(`<div class="auc2-cat"> </div>`);
	var root_1$2 = from_html(`<div class="auc2-seller"> </div>`);
	var root_2$2 = from_html(`<div class="auc2-chart"><div class="mc-y"><span> </span><span> </span></div> <svg viewBox="0 0 100 44" preserveAspectRatio="none" aria-label="Historique des enchères"><path fill="var(--accent)" fill-opacity="0.12"></path><path fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"></path></svg></div>`);
	var root_3$2 = from_html(`<div class="auc2-feed-empty">Aucune enchère pour l'instant. Soyez le premier.</div>`);
	var root_4$2 = from_html(`<div><span class="auc2-feed-who"> </span> <span class="auc2-feed-amt"> </span> <span class="auc2-feed-time"> </span></div>`);
	var root_5$2 = from_html(`<div class="auc2-status lead">Vous êtes en tête</div>`);
	var root_6$2 = from_html(`<div class="auc2-status out">Enchère dépassée</div>`);
	var root_7$2 = from_html(`<div class="auc2-ended">Enchère terminée.</div>`);
	var root_8$2 = from_html(`<div class="auc2-note">C'est votre annonce.</div>`);
	var root_9$2 = from_html(`<div> </div>`);
	var root_10$1 = from_html(`<div class="auc2-box"><div class="auc2-box-lbl">Votre enchère <span> </span></div> <div class="af-input-row"><input class="af-input" type="number" step="1"/> <span class="af-unit">pts</span></div> <div class="auc2-quick"><button>Min</button> <button>+5</button> <button>+25</button> <button>+100</button></div> <button class="btn primary auc2-cta"> </button> <!></div>`);
	var root_11$1 = from_html(`<div class="modal-backdrop" role="presentation"><div class="auc2" role="dialog" aria-modal="true" tabindex="-1"><button class="modal-close" aria-label="Fermer"><svg class="x-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"></path></svg></button> <div class="auc2-grid"><div class="auc2-main"><div class="auc2-head"><div class="auc2-thumb"><!></div> <div class="auc2-id"><span class="modal-rar"> </span> <h2 class="auc2-name"> </h2> <!> <!></div></div> <div class="auc2-stats"><div class="auc2-price"><div class="auc2-price-lbl"> </div> <div class="auc2-price-val"><span class="auc2-coin"></span> </div></div> <div class="auc2-clock"><div class="auc2-clock-lbl"> </div> <div class="auc2-clock-val"> </div></div></div> <!> <div class="auc2-feed"><div class="auc2-feed-head">Activité</div> <!></div></div> <div class="auc2-side"><!> <!> <!> <div class="auc2-live"><span class="auc2-dot"></span>Mise à jour en direct</div></div></div></div></div>`);
	function AuctionModal($$anchor, $$props) {
		push($$props, true);
		let balance = prop($$props, "balance", 3, null);
		const nf = (n) => n == null ? "-" : Number(n).toLocaleString("fr");
		let a = state(proxy($$props.auction));
		let bids = state(proxy($$props.auction.bids || []));
		let iBid = state(false);
		async function refresh() {
			try {
				const fresh = await data.auction($$props.auction.id);
				set(a, fresh, true);
				set(bids, fresh.bids || [], true);
				const min = (fresh.price ?? fresh.base ?? 0) + 1;
				if (Number(get(amount)) < min) set(amount, String(min), true);
			} catch {}
		}
		refresh();
		user_effect(() => {
			const t = setInterval(refresh, 4e3);
			return () => clearInterval(t);
		});
		let now = state(proxy(Date.now()));
		user_effect(() => {
			const t = setInterval(() => set(now, Date.now(), true), 1e3);
			return () => clearInterval(t);
		});
		let secsLeft = user_derived(() => Math.max(0, Math.round((Date.parse(get(a).endAt || "") - get(now)) / 1e3)));
		let ended = user_derived(() => !get(a).endAt ? false : get(secsLeft) <= 0);
		let urgency = user_derived(() => get(ended) ? "end" : get(secsLeft) < 60 ? "crit" : get(secsLeft) < 300 ? "warn" : "ok");
		function fmtLeft(s) {
			if (s <= 0) return "Terminée";
			const d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), ss = s % 60;
			if (d) return `${d} j ${h} h`;
			if (h) return `${h} h ${String(m).padStart(2, "0")} m`;
			if (m) return `${m} m ${String(ss).padStart(2, "0")} s`;
			return `${ss} s`;
		}
		const relTime = (t) => {
			const d = Date.parse(t || "");
			if (isNaN(d)) return "";
			const m = Math.round((get(now) - d) / 6e4);
			if (m < 1) return "à l'instant";
			if (m < 60) return `${m} min`;
			const h = Math.round(m / 60);
			if (h < 24) return `${h} h`;
			return `${Math.round(h / 24)} j`;
		};
		let price = user_derived(() => get(a).price ?? get(a).bid ?? get(a).base ?? 0);
		let minBid = user_derived(() => get(price) + 1);
		let leading = user_derived(() => !!(get(a).currentBidderId && data.userId && get(a).currentBidderId === data.userId));
		let outbid = user_derived(() => get(iBid) && !get(leading));
		let amount = state(proxy(String(($$props.auction.price ?? $$props.auction.base ?? 0) + 1)));
		let busy = state(false);
		let msg = state("");
		let msgOk = state(false);
		let bal = state(proxy(balance()));
		user_effect(() => {
			set(bal, balance());
		});
		let tooPoor = user_derived(() => get(bal) != null && Number(get(amount)) > get(bal));
		function setAmount(v) {
			set(amount, String(Math.max(1, Math.round(v))), true);
		}
		async function bid() {
			const v = Number(get(amount));
			if (!(v >= 1)) {
				set(msg, "Montant invalide.");
				set(msgOk, false);
				return;
			}
			set(busy, true);
			set(msg, "");
			try {
				const d = await data.placeBid(get(a).id, v);
				set(iBid, true);
				set(msgOk, true);
				set(msg, `Enchère placée à ${nf(d.current_bid)} pts.`);
				if (d.bidder_balance != null) set(bal, d.bidder_balance, true);
				$$props.onwallet?.();
				await refresh();
			} catch (e) {
				set(msgOk, false);
				set(msg, e?.message || "Enchère refusée.", true);
				if (e?.min) set(amount, String(e.min), true);
			} finally {
				set(busy, false);
			}
		}
		let chart = user_derived(() => {
			const rows = [...get(bids)].filter((b) => b.at).sort((x, y) => Date.parse(x.at) - Date.parse(y.at));
			const series = [];
			const startT = Date.parse(get(a).createdAt || rows[0]?.at || "") || (rows[0] ? Date.parse(rows[0].at) : 0);
			if (get(a).base != null && startT) series.push({
				t: startT,
				v: get(a).base
			});
			for (const b of rows) series.push({
				t: Date.parse(b.at),
				v: b.amount
			});
			if (series.length < 2) return null;
			const vs = series.map((p) => p.v), min = Math.min(...vs), max = Math.max(...vs), span = max - min || 1;
			const ts = series.map((p) => p.t), t0 = ts[0], tspan = (ts[ts.length - 1] || t0 + 1) - t0 || 1, H = 44, pad = 3;
			const P = series.map((p) => [pad + (p.t - t0) / tspan * 94, pad + (1 - (p.v - min) / span) * 38]);
			const d = P.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
			return {
				d,
				area: d + ` L${P[P.length - 1][0].toFixed(1)} ${H} L${P[0][0].toFixed(1)} ${H} Z`,
				min,
				max
			};
		});
		let modalEl;
		function onKey(e) {
			if (e.key === "Escape") $$props.onclose?.();
		}
		user_effect(() => {
			const html = document.documentElement;
			const prev = html.style.overflow;
			html.style.overflow = "hidden";
			return () => {
				html.style.overflow = prev;
			};
		});
		var div = root_11$1();
		event("keydown", $window, onKey);
		var div_1 = child(div);
		var button = child(div_1);
		var div_2 = sibling(button, 2);
		var div_3 = child(div_2);
		var div_4 = child(div_3);
		var div_5 = child(div_4);
		Card(child(div_5), {
			get card() {
				return get(a).card;
			},
			get shiny() {
				return get(a).is_shiny;
			},
			caption: false
		});
		reset(div_5);
		var div_6 = sibling(div_5, 2);
		var span_1 = child(div_6);
		var text = only_child(span_1, true);
		var h2 = sibling(span_1, 2);
		var text_1 = only_child(h2, true);
		var node_1 = sibling(h2, 2);
		var consequent = ($$anchor) => {
			var div_7 = root$2();
			var text_2 = only_child(div_7, true);
			template_effect(() => set_text(text_2, get(a).card.category));
			append($$anchor, div_7);
		};
		if_block(node_1, ($$render) => {
			if (get(a).card.category) $$render(consequent);
		});
		var node_2 = sibling(node_1, 2);
		var consequent_1 = ($$anchor) => {
			var div_8 = root_1$2();
			var text_3 = only_child(div_8);
			template_effect(() => set_text(text_3, `Vendu par ${get(a).seller ?? ""}`));
			append($$anchor, div_8);
		};
		if_block(node_2, ($$render) => {
			if (get(a).seller) $$render(consequent_1);
		});
		reset(div_6);
		reset(div_4);
		var div_9 = sibling(div_4, 2);
		var div_10 = child(div_9);
		var div_11 = child(div_10);
		var text_4 = only_child(div_11, true);
		var div_12 = sibling(div_11, 2);
		var text_5 = sibling(child(div_12), 1, true);
		reset(div_12);
		reset(div_10);
		var div_13 = sibling(div_10, 2);
		var div_14 = child(div_13);
		var text_6 = only_child(div_14, true);
		var text_7 = only_child(sibling(div_14, 2), true);
		reset(div_13);
		reset(div_9);
		var node_3 = sibling(div_9, 2);
		var consequent_2 = ($$anchor) => {
			var div_16 = root_2$2();
			var div_17 = child(div_16);
			var span_2 = child(div_17);
			var text_8 = only_child(span_2, true);
			var text_9 = only_child(sibling(span_2), true);
			reset(div_17);
			var svg = sibling(div_17, 2);
			var path = child(svg);
			var path_1 = sibling(path);
			reset(svg);
			reset(div_16);
			template_effect(($0, $1) => {
				set_text(text_8, $0);
				set_text(text_9, $1);
				set_attribute(path, "d", get(chart).area);
				set_attribute(path_1, "d", get(chart).d);
			}, [() => nf(get(chart).max), () => nf(get(chart).min)]);
			append($$anchor, div_16);
		};
		if_block(node_3, ($$render) => {
			if (get(chart)) $$render(consequent_2);
		});
		var div_18 = sibling(node_3, 2);
		var node_4 = sibling(child(div_18), 2);
		var consequent_3 = ($$anchor) => {
			append($$anchor, root_3$2());
		};
		var alternate = ($$anchor) => {
			var fragment = comment();
			each(first_child(fragment), 17, () => get(bids).slice(0, 6), (b) => b.id, ($$anchor, b) => {
				var div_20 = root_4$2();
				let classes;
				var span_4 = child(div_20);
				var text_10 = only_child(span_4, true);
				var span_5 = sibling(span_4, 2);
				var text_11 = only_child(span_5);
				var text_12 = only_child(sibling(span_5, 2), true);
				reset(div_20);
				template_effect(($0, $1) => {
					classes = set_class(div_20, 1, "auc2-feed-row", null, classes, { me: get(b).bidder === "Toi" || get(b).bidderId && get(b).bidderId === data.userId });
					set_text(text_10, get(b).bidder || "Anonyme");
					set_text(text_11, `${$0 ?? ""} pts`);
					set_text(text_12, $1);
				}, [() => nf(get(b).amount), () => relTime(get(b).at)]);
				append($$anchor, div_20);
			});
			append($$anchor, fragment);
		};
		if_block(node_4, ($$render) => {
			if (get(bids).length === 0) $$render(consequent_3);
			else $$render(alternate, -1);
		});
		reset(div_18);
		reset(div_3);
		var div_21 = sibling(div_3, 2);
		var node_6 = child(div_21);
		var consequent_4 = ($$anchor) => {
			append($$anchor, root_5$2());
		};
		var consequent_5 = ($$anchor) => {
			append($$anchor, root_6$2());
		};
		if_block(node_6, ($$render) => {
			if (get(leading)) $$render(consequent_4);
			else if (get(outbid)) $$render(consequent_5, 1);
		});
		var node_7 = sibling(node_6, 2);
		var consequent_6 = ($$anchor) => {
			append($$anchor, root_7$2());
		};
		var consequent_7 = ($$anchor) => {
			append($$anchor, root_8$2());
		};
		var alternate_1 = ($$anchor) => {
			var div_26 = root_10$1();
			var div_27 = child(div_26);
			var text_13 = only_child(sibling(child(div_27)));
			reset(div_27);
			var div_28 = sibling(div_27, 2);
			var input = child(div_28);
			remove_input_defaults(input);
			next(2);
			reset(div_28);
			var div_29 = sibling(div_28, 2);
			var button_1 = child(div_29);
			var button_2 = sibling(button_1, 2);
			var button_3 = sibling(button_2, 2);
			var button_4 = sibling(button_3, 2);
			reset(div_29);
			var button_5 = sibling(div_29, 2);
			var text_14 = only_child(button_5, true);
			var node_8 = sibling(button_5, 2);
			var consequent_8 = ($$anchor) => {
				var div_30 = root_9$2();
				let classes_1;
				var text_15 = only_child(div_30);
				template_effect(($0) => {
					classes_1 = set_class(div_30, 1, "auc2-bal", null, classes_1, { low: get(tooPoor) });
					set_text(text_15, `Solde : ${$0 ?? ""} WikiBidous`);
				}, [() => nf(get(bal))]);
				append($$anchor, div_30);
			};
			if_block(node_8, ($$render) => {
				if (get(bal) != null) $$render(consequent_8);
			});
			reset(div_26);
			template_effect(($0, $1) => {
				set_text(text_13, `min ${$0 ?? ""} pts`);
				set_attribute(input, "min", get(minBid));
				button_5.disabled = get(busy) || get(tooPoor);
				set_text(text_14, $1);
			}, [() => nf(get(minBid)), () => get(busy) ? "Enchère..." : `Miser ${nf(Number(get(amount)) || 0)} pts`]);
			bind_value(input, () => get(amount), ($$value) => set(amount, $$value));
			delegated("click", button_1, () => setAmount(get(minBid)));
			delegated("click", button_2, () => setAmount(Number(get(amount)) + 5));
			delegated("click", button_3, () => setAmount(Number(get(amount)) + 25));
			delegated("click", button_4, () => setAmount(Number(get(amount)) + 100));
			delegated("click", button_5, bid);
			append($$anchor, div_26);
		};
		if_block(node_7, ($$render) => {
			if (get(ended)) $$render(consequent_6);
			else if (get(a).owned) $$render(consequent_7, 1);
			else $$render(alternate_1, -1);
		});
		var node_9 = sibling(node_7, 2);
		var consequent_9 = ($$anchor) => {
			var div_31 = root_9$2();
			let classes_2;
			var text_16 = only_child(div_31, true);
			template_effect(() => {
				classes_2 = set_class(div_31, 1, "modal-msg", null, classes_2, { ok: get(msgOk) });
				set_text(text_16, get(msg));
			});
			append($$anchor, div_31);
		};
		if_block(node_9, ($$render) => {
			if (get(msg)) $$render(consequent_9);
		});
		next(2);
		reset(div_21);
		reset(div_2);
		reset(div_1);
		bind_this(div_1, ($$value) => modalEl = $$value, () => modalEl);
		reset(div);
		template_effect(($0, $1) => {
			set_attribute(span_1, "data-r", get(a).card.rarity);
			set_text(text, RNAME[get(a).card.rarity] || get(a).card.rarity);
			set_text(text_1, get(a).card.title);
			set_text(text_4, get(a).bid != null ? "Enchère actuelle" : "Mise de départ");
			set_text(text_5, $0);
			set_attribute(div_13, "data-u", get(urgency));
			set_text(text_6, get(ended) ? "Vente" : "Temps restant");
			set_text(text_7, $1);
		}, [() => nf(get(price)), () => fmtLeft(get(secsLeft))]);
		delegated("click", div, () => $$props.onclose?.());
		delegated("click", div_1, (e) => e.stopPropagation());
		delegated("click", button, () => $$props.onclose?.());
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var root$1 = from_html(`<button class="search-clear" aria-label="Effacer la recherche"><svg class="x-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>`);
	var root_1$1 = from_html(`<button><span class="rl-dot"></span> <span class="rl-name"> </span></button>`);
	var root_2$1 = from_html(`<div class="empty"><b> </b><button class="btn">Réessayer</button></div>`);
	var root_3$1 = from_html(`<div class="wc skeleton"></div>`);
	var root_4$1 = from_html(`<div class="grid"></div>`);
	var root_5$1 = from_html(`<div class="empty"><b>Aucune enchère en cours</b><div> </div></div>`);
	var root_6$1 = from_html(`<div class="auc-seller"> </div>`);
	var root_7$1 = from_html(`<div class="auc-item"><button class="card-btn"><!></button> <div class="auc-meta"><span class="auc-bid"><span class="auc-coin"></span> </span> <span class="auc-end"> </span></div> <!></div>`);
	var root_8$1 = from_html(`<div></div> <div class="pager"><button class="btn pager-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg> Précédent</button> <span class="pager-info"> </span> <button class="btn pager-btn">Suivant <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg></button></div>`, 1);
	var root_9$1 = from_html(`<div class="coll-head"><div><h1>Marché</h1> <div class="meta">Enchérissez sur des cartes ou vendez les vôtres contre des WikiBidous</div></div> <div class="coll-tools"><div class="search-wrap"><svg class="search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.4-3.4"></path></svg> <input class="search" type="search" placeholder="Rechercher une carte au marché..."/> <!></div> <div class="tool-actions"><span class="chip" title="Vos ventes en cours"><svg class="cico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 9 6 5h12l1.5 4M5.5 9v10h13V9"></path></svg> Ventes <b> </b> </span> <button class="iconbtn" title="Vendre ou enchérir se fait sur le site officiel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path></svg> <span>Vendre / enchérir</span></button></div></div></div> <div class="rarity-legend mkt-filter"><button><span class="rl-name">Toutes</span></button> <!></div> <!> <!>`, 1);
	function Marketplace($$anchor, $$props) {
		push($$props, true);
		const nf = (n) => n == null ? "-" : Number(n).toLocaleString("fr");
		const RARITIES = [
			"L",
			"UR",
			"SR",
			"R",
			"PC",
			"C"
		];
		let auctions = state(null);
		let page = state(0);
		let hasMore = state(false);
		let search = state("");
		let qActive = state("");
		let rarity = state("");
		let loading = state(false);
		let error = state("");
		let selected = state(null);
		let mine = state(proxy({
			sellingCount: 0,
			maxConcurrentAuctions: 5
		}));
		data.marketplaceMine?.().then((m) => set(mine, m, true)).catch(() => {});
		function openBid(a) {
			set(selected, a, true);
		}
		let reqToken = 0;
		async function load() {
			const my = ++reqToken;
			set(loading, true);
			set(error, "");
			try {
				const d = await data.marketplace({
					page: get(page),
					q: get(qActive),
					rarity: get(rarity)
				});
				if (my !== reqToken) return;
				set(auctions, d.auctions, true);
				set(hasMore, d.hasMore, true);
			} catch (e) {
				if (my !== reqToken) return;
				set(error, "Marché indisponible pour le moment.");
				set(auctions, [], true);
			} finally {
				if (my === reqToken) set(loading, false);
			}
		}
		load();
		let deb;
		user_effect(() => {
			const s = get(search).trim();
			clearTimeout(deb);
			deb = setTimeout(() => {
				if (s !== get(qActive)) {
					set(qActive, s, true);
					set(page, 0);
					load();
				}
			}, 350);
			return () => clearTimeout(deb);
		});
		let now = state(proxy(Date.now()));
		user_effect(() => {
			const t = setInterval(() => set(now, Date.now(), true), 3e4);
			return () => clearInterval(t);
		});
		function timeLeft(endAt) {
			const end = Date.parse(endAt || "");
			if (isNaN(end)) return "";
			let s = Math.max(0, Math.round((end - get(now)) / 1e3));
			if (s <= 0) return "Terminée";
			const d = Math.floor(s / 86400);
			s %= 86400;
			const h = Math.floor(s / 3600);
			s %= 3600;
			const m = Math.floor(s / 60);
			if (d) return `${d} j ${h} h`;
			if (h) return `${h} h ${String(m).padStart(2, "0")}`;
			return `${m} min`;
		}
		function go(delta) {
			set(page, Math.max(0, get(page) + delta), true);
			load();
		}
		function setRarity(r) {
			set(rarity, get(rarity) === r ? "" : r, true);
			set(page, 0);
			load();
		}
		function toNative() {
			try {
				localStorage.setItem("wm-off", "1");
			} catch {}
			location.assign("/marketplace");
		}
		var fragment = root_9$1();
		var div = first_child(fragment);
		var div_1 = sibling(child(div), 2);
		var div_2 = child(div_1);
		var input = sibling(child(div_2), 2);
		remove_input_defaults(input);
		var node = sibling(input, 2);
		var consequent = ($$anchor) => {
			var button = root$1();
			delegated("click", button, () => set(search, ""));
			append($$anchor, button);
		};
		if_block(node, ($$render) => {
			if (get(search)) $$render(consequent);
		});
		reset(div_2);
		var div_3 = sibling(div_2, 2);
		var span = child(div_3);
		var b = sibling(child(span), 2);
		var text = only_child(b, true);
		var text_1 = sibling(b);
		reset(span);
		var button_1 = sibling(span, 2);
		reset(div_3);
		reset(div_1);
		reset(div);
		var div_4 = sibling(div, 2);
		var button_2 = child(div_4);
		let classes;
		each(sibling(button_2, 2), 17, () => RARITIES, index, ($$anchor, r) => {
			var button_3 = root_1$1();
			let classes_1;
			var span_1 = child(button_3);
			var text_2 = only_child(sibling(span_1, 2), true);
			reset(button_3);
			template_effect(($0) => {
				classes_1 = set_class(button_3, 1, "rl", null, classes_1, { on: get(rarity) === get(r) });
				set_style(span_1, `background:var(--r-${$0 ?? ""})`);
				set_text(text_2, RNAME[get(r)]);
			}, [() => get(r).toLowerCase()]);
			delegated("click", button_3, () => setRarity(get(r)));
			append($$anchor, button_3);
		});
		reset(div_4);
		var node_2 = sibling(div_4, 2);
		var consequent_1 = ($$anchor) => {
			var div_5 = root_2$1();
			var b_1 = child(div_5);
			var text_3 = only_child(b_1, true);
			var button_4 = sibling(b_1);
			reset(div_5);
			template_effect(() => set_text(text_3, get(error)));
			delegated("click", button_4, load);
			append($$anchor, div_5);
		};
		var consequent_2 = ($$anchor) => {
			var div_6 = root_4$1();
			each(div_6, 20, () => Array(10), index, ($$anchor, _) => {
				append($$anchor, root_3$1());
			});
			reset(div_6);
			append($$anchor, div_6);
		};
		var consequent_3 = ($$anchor) => {
			var div_8 = root_5$1();
			var text_4 = only_child(sibling(child(div_8)), true);
			reset(div_8);
			template_effect(() => set_text(text_4, get(qActive) ? "Essayez un autre terme." : "Revenez plus tard."));
			append($$anchor, div_8);
		};
		var alternate = ($$anchor) => {
			var fragment_1 = root_8$1();
			var div_10 = first_child(fragment_1);
			let classes_2;
			each(div_10, 21, () => get(auctions), (a) => a.id, ($$anchor, a) => {
				var div_11 = root_7$1();
				var button_5 = child(div_11);
				Card(child(button_5), {
					get card() {
						return get(a).card;
					},
					get shiny() {
						return get(a).is_shiny;
					}
				});
				reset(button_5);
				var div_12 = sibling(button_5, 2);
				var span_3 = child(div_12);
				var text_5 = sibling(child(span_3), 1, true);
				reset(span_3);
				var text_6 = only_child(sibling(span_3, 2), true);
				reset(div_12);
				var node_4 = sibling(div_12, 2);
				var consequent_4 = ($$anchor) => {
					var div_13 = root_6$1();
					var text_7 = only_child(div_13);
					template_effect(() => set_text(text_7, `Vendu par ${get(a).seller ?? ""}`));
					append($$anchor, div_13);
				};
				if_block(node_4, ($$render) => {
					if (get(a).seller) $$render(consequent_4);
				});
				reset(div_11);
				template_effect(($0, $1) => {
					set_attribute(button_5, "aria-label", get(a).card.title);
					set_attribute(span_3, "title", get(a).bid != null ? "Enchère actuelle" : "Mise de départ");
					set_text(text_5, $0);
					set_text(text_6, $1);
				}, [() => nf(get(a).price), () => timeLeft(get(a).endAt)]);
				delegated("click", button_5, () => openBid(get(a)));
				append($$anchor, div_11);
			});
			reset(div_10);
			var div_14 = sibling(div_10, 2);
			var button_6 = child(div_14);
			var span_5 = sibling(button_6, 2);
			var text_8 = only_child(span_5);
			var button_7 = sibling(span_5, 2);
			reset(div_14);
			template_effect(() => {
				classes_2 = set_class(div_10, 1, "grid", null, classes_2, { dim: get(loading) });
				button_6.disabled = get(page) === 0 || get(loading);
				set_text(text_8, `Page ${get(page) + 1}`);
				button_7.disabled = !get(hasMore) || get(loading);
			});
			delegated("click", button_6, () => go(-1));
			delegated("click", button_7, () => go(1));
			append($$anchor, fragment_1);
		};
		if_block(node_2, ($$render) => {
			if (get(error)) $$render(consequent_1);
			else if (!get(auctions)) $$render(consequent_2, 1);
			else if (get(auctions).length === 0) $$render(consequent_3, 2);
			else $$render(alternate, -1);
		});
		var node_5 = sibling(node_2, 2);
		var consequent_5 = ($$anchor) => {
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
					onclose: () => set(selected, null)
				});
			}
		};
		if_block(node_5, ($$render) => {
			if (get(selected)) $$render(consequent_5);
		});
		template_effect(() => {
			set_text(text, get(mine).sellingCount);
			set_text(text_1, `/${get(mine).maxConcurrentAuctions ?? ""}`);
			classes = set_class(button_2, 1, "rl", null, classes, { on: get(rarity) === "" });
		});
		bind_value(input, () => get(search), ($$value) => set(search, $$value));
		delegated("click", button_1, toNative);
		delegated("click", button_2, () => setRarity(""));
		append($$anchor, fragment);
		pop();
	}
	delegate(["click"]);
	var root = from_html(`<a class="nav-ext"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></svg> </a>`);
	var root_1 = from_html(`<div class="nav-sep">Le reste du site</div> <!>`, 1);
	var root_2 = from_html(`<button class="ghost">Réinitialiser</button>`);
	var root_3 = from_html(`<button class="ghost" title="Revenir au site d'origine (aucune fonctionnalité perdue)">Version originale du site</button>`);
	var root_4 = from_html(`<span class="bell-badge"> </span>`);
	var root_5 = from_html(`<span class="notif-count"> </span>`);
	var root_6 = from_html(`<div class="notif-empty">Aucune notification</div>`);
	var root_7 = from_html(`<span class="notif-dot"></span>`);
	var root_8 = from_html(`<div class="notif-msg"> </div>`);
	var root_9 = from_html(`<!> <div class="notif-body"><div class="notif-title"> </div> <!> <div class="notif-time"> </div></div>`, 1);
	var root_10 = from_html(`<div class="notif-scrim"></div> <div class="notif-panel" role="dialog" aria-label="Notifications"><div class="notif-head">Notifications<!></div> <!></div>`, 1);
	var root_11 = from_html(`<span class="badge pro">Pro</span>`);
	var root_12 = from_html(`<div class="app"><aside class="side"><div class="brand"><span class="mk"></span><b>WikiMasters</b></div> <nav class="nav"><button type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></svg> Ouvrir des paquets</button> <button type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></svg> Ma collection</button> <button type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></svg> Toutes les cartes</button> <button type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></svg> Marché</button> <!></nav> <div class="side-foot"><!> <!> <div class="hintline"> </div></div></aside> <main class="main"><header class="topbar"><div class="crumb"> </div> <div class="wallet"><div class="notif"><button aria-label="Notifications"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.5 21a2 2 0 0 1-3 0"></path></svg> <!></button> <!></div> <!> <span class="chip" title="Paquets"><svg class="cico pk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 10h18"></path></svg> <b> </b> </span> <span class="chip" title="WikiBidous"><svg class="cico coin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="3.4"></circle></svg> <b> </b></span></div></header> <section class="view"><!></section></main></div>`);
	function App($$anchor, $$props) {
		push($$props, true);
		const viewFromPath = () => {
			const p = location.pathname;
			if (p.includes("global-collection")) return "catalog";
			if (p.includes("marketplace")) return "market";
			if (p.includes("collection")) return "collection";
			return "pulls";
		};
		let view = state(proxy(viewFromPath()));
		let profile = state(null);
		let collKey = state(0);
		async function loadProfile() {
			try {
				set(profile, await data.profile(), true);
			} catch {
				set(profile, null);
			}
		}
		loadProfile();
		let notifs = state(proxy([]));
		let notifOpen = state(false);
		let unread = user_derived(() => get(notifs).filter((n) => !n.read).length);
		async function loadNotifs() {
			try {
				set(notifs, await data.notifications(), true);
			} catch {
				set(notifs, [], true);
			}
		}
		loadNotifs();
		const relTime = (s) => {
			const d = Date.parse(s || "");
			if (isNaN(d)) return "";
			const m = Math.round(Math.max(0, Date.now() - d) / 6e4);
			if (m < 1) return "à l'instant";
			if (m < 60) return `il y a ${m} min`;
			const h = Math.round(m / 60);
			if (h < 24) return `il y a ${h} h`;
			return `il y a ${Math.round(h / 24)} j`;
		};
		user_effect(() => {
			const onRoute = () => set(view, viewFromPath(), true);
			window.addEventListener("wm:route", onRoute);
			return () => window.removeEventListener("wm:route", onRoute);
		});
		user_effect(() => {
			if (!data.isReal) return;
			window.addEventListener("wm:profile", loadProfile);
			const t = setTimeout(async () => {
				if (!get(profile) || get(profile).packs_remaining == null) await refreshProfile();
				loadProfile();
			}, 1500);
			return () => {
				window.removeEventListener("wm:profile", loadProfile);
				clearTimeout(t);
			};
		});
		const VIEW_PATH = {
			pulls: "/pulls",
			collection: "/collection",
			catalog: "/global-collection",
			market: "/marketplace"
		};
		function goCore(v) {
			set(view, v, true);
			const p = VIEW_PATH[v] || "/pulls";
			if (location.pathname !== p) history.pushState({}, "", p);
		}
		async function onchanged() {
			if (data.isReal) await refreshProfile();
			loadProfile();
			set(collKey, get(collKey) + 1);
		}
		async function reset$1() {
			if (!data.canReset) return;
			await data.reset();
			onchanged();
			goCore("pulls");
		}
		const ICONS = {
			pulls: "<rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M3 9h18\"/>",
			collection: "<rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"2\"/><path d=\"M8 7h8M8 11h8M8 15h5\"/>",
			trades: "<path d=\"M4 9h13l-3-3M20 15H7l3 3\"/>",
			marketplace: "<path d=\"M4.5 9 6 5h12l1.5 4M5.5 9v10h13V9M9.5 19v-6h5v6\"/>",
			battle: "<path d=\"M4.5 19.5l1-3 9-9 2 2-9 9zM19.5 19.5l-1-3-9-9-2 2 9 9z\"/>",
			catalog: "<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"/>",
			guild: "<path d=\"M12 3l7 2.5v5.5c0 4.2-2.9 7.4-7 9-4.1-1.6-7-4.8-7-9V5.5z\"/>",
			friends: "<circle cx=\"9\" cy=\"8\" r=\"3.2\"/><path d=\"M3.5 20a5.5 5.5 0 0 1 11 0\"/><path d=\"M16 5.2a3.2 3.2 0 0 1 0 5.6M20.5 20a5.5 5.5 0 0 0-3.5-5.1\"/>",
			dms: "<path d=\"M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 19.5l1.3-4A7.5 7.5 0 1 1 20 11.5z\"/>",
			leaderboard: "<path d=\"M4 20h16M6 20v-6M12 20V5M18 20v-9\"/>",
			achievements: "<path d=\"M7 4h10v5a5 5 0 0 1-10 0zM7 6H4.5v1.5A3 3 0 0 0 7.5 10.5M17 6h2.5v1.5a3 3 0 0 1-3 3M12 14v3M8.5 20h7l-.6-3H9.1z\"/>",
			profile: "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4.5 20a7.5 7.5 0 0 1 15 0\"/>",
			settings: "<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6\"/>"
		};
		const others = [
			[
				"/trades",
				"Échanges",
				"trades"
			],
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
		var div = root_12();
		var aside = child(div);
		var nav = sibling(child(aside), 2);
		var button = child(nav);
		let classes;
		var svg = child(button);
		html(svg, () => ICONS.pulls, true);
		reset(svg);
		next();
		reset(button);
		var button_1 = sibling(button, 2);
		let classes_1;
		var svg_1 = child(button_1);
		html(svg_1, () => ICONS.collection, true);
		reset(svg_1);
		next();
		reset(button_1);
		var button_2 = sibling(button_1, 2);
		let classes_2;
		var svg_2 = child(button_2);
		html(svg_2, () => ICONS.catalog, true);
		reset(svg_2);
		next();
		reset(button_2);
		var button_3 = sibling(button_2, 2);
		let classes_3;
		var svg_3 = child(button_3);
		html(svg_3, () => ICONS.marketplace, true);
		reset(svg_3);
		next();
		reset(button_3);
		var node = sibling(button_3, 2);
		var consequent = ($$anchor) => {
			var fragment = root_1();
			each(sibling(first_child(fragment), 2), 17, () => others, index, ($$anchor, $$item) => {
				var $$array = user_derived(() => to_array(get($$item), 3));
				let href = () => get($$array)[0];
				let label = () => get($$array)[1];
				let icon = () => get($$array)[2];
				var a = root();
				var svg_4 = child(a);
				html(svg_4, () => ICONS[icon()], true);
				reset(svg_4);
				var text = sibling(svg_4);
				reset(a);
				template_effect(() => {
					set_attribute(a, "href", href());
					set_text(text, ` ${label() ?? ""}`);
				});
				append($$anchor, a);
			});
			append($$anchor, fragment);
		};
		if_block(node, ($$render) => {
			if (data.isReal) $$render(consequent);
		});
		reset(nav);
		var div_1 = sibling(nav, 2);
		var node_2 = child(div_1);
		var consequent_1 = ($$anchor) => {
			var button_4 = root_2();
			delegated("click", button_4, reset$1);
			append($$anchor, button_4);
		};
		if_block(node_2, ($$render) => {
			if (data.canReset) $$render(consequent_1);
		});
		var node_3 = sibling(node_2, 2);
		var consequent_2 = ($$anchor) => {
			var button_5 = root_3();
			delegated("click", button_5, () => {
				try {
					localStorage.setItem("wm-off", "1");
				} catch {}
				location.reload();
			});
			append($$anchor, button_5);
		};
		if_block(node_3, ($$render) => {
			if (data.isReal) $$render(consequent_2);
		});
		var text_1 = only_child(sibling(node_3, 2), true);
		reset(div_1);
		reset(aside);
		var main = sibling(aside, 2);
		var header = child(main);
		var div_3 = child(header);
		var text_2 = only_child(div_3, true);
		var div_4 = sibling(div_3, 2);
		var div_5 = child(div_4);
		var button_6 = child(div_5);
		let classes_4;
		var node_4 = sibling(child(button_6), 2);
		var consequent_3 = ($$anchor) => {
			var span = root_4();
			var text_3 = only_child(span, true);
			template_effect(() => set_text(text_3, get(unread)));
			append($$anchor, span);
		};
		if_block(node_4, ($$render) => {
			if (get(unread)) $$render(consequent_3);
		});
		reset(button_6);
		var node_5 = sibling(button_6, 2);
		var consequent_8 = ($$anchor) => {
			var fragment_1 = root_10();
			var div_6 = first_child(fragment_1);
			var div_7 = sibling(div_6, 2);
			var div_8 = child(div_7);
			var node_6 = sibling(child(div_8));
			var consequent_4 = ($$anchor) => {
				var span_1 = root_5();
				var text_4 = only_child(span_1, true);
				template_effect(() => set_text(text_4, get(unread)));
				append($$anchor, span_1);
			};
			if_block(node_6, ($$render) => {
				if (get(unread)) $$render(consequent_4);
			});
			reset(div_8);
			var node_7 = sibling(div_8, 2);
			var consequent_5 = ($$anchor) => {
				append($$anchor, root_6());
			};
			var alternate = ($$anchor) => {
				var fragment_2 = comment();
				each(first_child(fragment_2), 17, () => get(notifs), (n) => n.id, ($$anchor, n) => {
					var fragment_3 = comment();
					element(first_child(fragment_3), () => get(n).href ? "a" : "div", false, ($$element, $$anchor) => {
						var event_handler = () => set(notifOpen, false);
						attribute_effect($$element, () => ({
							href: get(n).href,
							class: "notif-item",
							onclick: event_handler,
							[CLASS]: {
								unread: !get(n).read,
								link: !!get(n).href
							}
						}));
						var fragment_4 = root_9();
						var node_10 = first_child(fragment_4);
						var consequent_6 = ($$anchor) => {
							append($$anchor, root_7());
						};
						if_block(node_10, ($$render) => {
							if (!get(n).read) $$render(consequent_6);
						});
						var div_10 = sibling(node_10, 2);
						var div_11 = child(div_10);
						var text_5 = only_child(div_11, true);
						var node_11 = sibling(div_11, 2);
						var consequent_7 = ($$anchor) => {
							var div_12 = root_8();
							var text_6 = only_child(div_12, true);
							template_effect(() => set_text(text_6, get(n).message));
							append($$anchor, div_12);
						};
						if_block(node_11, ($$render) => {
							if (get(n).message) $$render(consequent_7);
						});
						var text_7 = only_child(sibling(node_11, 2), true);
						reset(div_10);
						template_effect(($0) => {
							set_text(text_5, get(n).title);
							set_text(text_7, $0);
						}, [() => relTime(get(n).at)]);
						append($$anchor, fragment_4);
					});
					append($$anchor, fragment_3);
				});
				append($$anchor, fragment_2);
			};
			if_block(node_7, ($$render) => {
				if (get(notifs).length === 0) $$render(consequent_5);
				else $$render(alternate, -1);
			});
			reset(div_7);
			delegated("click", div_6, () => set(notifOpen, false));
			append($$anchor, fragment_1);
		};
		if_block(node_5, ($$render) => {
			if (get(notifOpen)) $$render(consequent_8);
		});
		reset(div_5);
		var node_12 = sibling(div_5, 2);
		var consequent_9 = ($$anchor) => {
			append($$anchor, root_11());
		};
		if_block(node_12, ($$render) => {
			if (get(profile)?.is_pro) $$render(consequent_9);
		});
		var span_4 = sibling(node_12, 2);
		var b = sibling(child(span_4), 2);
		var text_8 = only_child(b, true);
		var text_9 = sibling(b);
		reset(span_4);
		var span_5 = sibling(span_4, 2);
		var text_10 = only_child(sibling(child(span_5), 2), true);
		reset(span_5);
		reset(div_4);
		reset(header);
		var section = sibling(header, 2);
		var node_13 = child(section);
		var consequent_10 = ($$anchor) => {
			Pulls($$anchor, {
				get profile() {
					return get(profile);
				},
				onchanged
			});
		};
		var consequent_11 = ($$anchor) => {
			var fragment_6 = comment();
			key(first_child(fragment_6), () => get(collKey), ($$anchor) => {
				Collection($$anchor, { onwallet: loadProfile });
			});
			append($$anchor, fragment_6);
		};
		var consequent_12 = ($$anchor) => {
			Catalog($$anchor, {});
		};
		var alternate_1 = ($$anchor) => {
			Marketplace($$anchor, {
				get profile() {
					return get(profile);
				},
				onwallet: loadProfile
			});
		};
		if_block(node_13, ($$render) => {
			if (get(view) === "pulls") $$render(consequent_10);
			else if (get(view) === "collection") $$render(consequent_11, 1);
			else if (get(view) === "catalog") $$render(consequent_12, 2);
			else $$render(alternate_1, -1);
		});
		reset(section);
		reset(main);
		reset(div);
		template_effect(() => {
			classes = set_class(button, 1, "", null, classes, { on: get(view) === "pulls" });
			classes_1 = set_class(button_1, 1, "", null, classes_1, { on: get(view) === "collection" });
			classes_2 = set_class(button_2, 1, "", null, classes_2, { on: get(view) === "catalog" });
			classes_3 = set_class(button_3, 1, "", null, classes_3, { on: get(view) === "market" });
			set_text(text_1, data.isReal ? "Connecté à WikiMasters" : "Serveur de test local");
			set_text(text_2, {
				pulls: "Ouvrir des paquets",
				collection: "Ma collection",
				catalog: "Toutes les cartes",
				market: "Marché"
			}[get(view)]);
			classes_4 = set_class(button_6, 1, "bell", null, classes_4, { has: get(unread) > 0 });
			set_text(text_8, get(profile)?.packs_remaining ?? "-");
			set_text(text_9, `/${get(profile)?.pack_cap ?? 10 ?? ""}`);
			set_text(text_10, get(profile)?.currency ?? "-");
		});
		delegated("click", button, () => goCore("pulls"));
		delegated("click", button_1, () => goCore("collection"));
		delegated("click", button_2, () => goCore("catalog"));
		delegated("click", button_3, () => goCore("market"));
		delegated("click", button_6, () => {
			set(notifOpen, !get(notifOpen));
			if (get(notifOpen)) loadNotifs();
		});
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var app_default = ":host,:root{--bg:#0c0d0c;--surface:#141613;--elev:#191c18;--elev2:#20241f;--line:#262a26;--line2:#333833;--fg:#eceee9;--fg-soft:#98a29a;--fg-faint:#7d857c;--accent:#3ccb8e;--accent-ink:#07130e;--r-c:#7fd8b4;--r-pc:#7fb0e6;--r-r:#b18fe0;--r-sr:#e46f9f;--r-ur:#f0912f;--r-l:#e8c93a;--display:\"Outfit\",system-ui,sans-serif;--body:\"Inter\",system-ui,sans-serif;--s1:4px;--s2:8px;--s3:12px;--s4:16px;--s5:24px;--s6:32px;--s7:48px;--s8:64px;--radius:14px;--radius-lg:18px;--sidebar:268px}:where(#wm-app-root,#wm-app-root *){box-sizing:border-box;margin:0;padding:0}#wm-app-root{font-family:var(--body);color:var(--fg);-webkit-font-smoothing:antialiased;line-height:1.5}#wm-app-root button{cursor:pointer;font-family:inherit}#wm-app-root img{display:block}#wm-app-root a{color:inherit;text-decoration:none}#wm-app-root :is(a,button,input,select,textarea,[tabindex]:not([tabindex=\"-1\"])):focus-visible{outline:2px solid var(--accent);outline-offset:2px}#wm-app-root .modal:focus,#wm-app-root .modal:focus-visible{outline:none}.card-btn:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:var(--radius)}.app{grid-template-columns:var(--sidebar) 1fr;background:var(--bg);min-height:100vh;display:grid}.side{background:var(--surface);border-right:1px solid var(--line);padding:var(--s6) var(--s5);gap:var(--s6);flex-direction:column;height:100vh;display:flex;position:sticky;top:0}.brand{padding:0 var(--s3);align-items:center;gap:10px;display:flex}.brand .mk{background:var(--accent);border-radius:3px;width:9px;height:9px}.brand b{font-family:var(--display);letter-spacing:-.01em;font-size:19px;font-weight:700}.nav{gap:var(--s1);flex-direction:column;flex:1;min-height:0;display:flex;overflow-y:auto}.nav-sep{letter-spacing:.12em;text-transform:uppercase;color:var(--fg-faint);padding:16px 14px 6px;font-size:10px}.nav a.nav-ext svg{opacity:.45;width:16px;height:16px}.nav a.nav-ext{font-weight:400}.nav a,.nav button{align-items:center;gap:var(--s3);color:var(--fg-soft);cursor:pointer;text-align:left;background:0 0;border:0;border-radius:12px;width:100%;padding:12px 14px;font-family:inherit;font-size:14px;font-weight:500;transition:background .15s,color .15s;display:flex}.nav a svg,.nav button svg{opacity:.85;flex:none;width:19px;height:19px}.nav a:hover,.nav button:hover{background:var(--elev);color:var(--fg)}.nav a.on,.nav button.on{background:color-mix(in oklab,var(--accent) 12%,transparent);color:var(--accent);font-weight:600}.nav a.on svg,.nav button.on svg{opacity:1}.side-foot{gap:var(--s3);flex-direction:column;margin-top:auto;display:flex}.ghost{border:1px solid var(--line2);color:var(--fg-soft);background:0 0;border-radius:11px;padding:11px;font-size:13px;font-weight:500;transition:all .15s}.ghost:hover{border-color:var(--fg-soft);color:var(--fg)}.hintline{color:var(--fg-faint);text-align:center;font-size:11.5px}.main{flex-direction:column;min-width:0;display:flex}.topbar{justify-content:space-between;align-items:center;gap:var(--s4);padding:var(--s5) clamp(var(--s5),4vw,var(--s7));border-bottom:1px solid var(--line);z-index:5;background:color-mix(in oklab,var(--bg) 86%,transparent);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);display:flex;position:sticky;top:0}.crumb{font-family:var(--display);letter-spacing:-.01em;font-size:16px;font-weight:600}.wallet{gap:var(--s2);display:flex}.chip{color:var(--fg-soft);background:var(--elev);border:1px solid var(--line);border-radius:999px;align-items:center;gap:8px;padding:9px 15px;font-size:13.5px;display:flex}.chip b{color:var(--fg);font-weight:600}.chip .cico{flex:none;width:14px;height:14px}.chip .cico.pk{color:var(--accent)}.chip .cico.coin{color:var(--r-l)}.badge{font-family:var(--display);letter-spacing:.04em;border-radius:999px;align-items:center;padding:6px 11px;font-size:11px;font-weight:700;display:inline-flex}.badge.pro{background:var(--accent);color:var(--accent-ink)}.notif{display:flex;position:relative}.bell{border:1px solid var(--line);background:var(--elev);width:38px;height:38px;color:var(--fg-soft);cursor:pointer;border-radius:999px;justify-content:center;align-items:center;transition:all .15s;display:flex;position:relative}.bell:hover{color:var(--fg);border-color:var(--line2)}.bell.has{color:var(--fg)}.bell svg{width:18px;height:18px}.bell-badge{color:#fff;min-width:18px;height:18px;font-family:var(--display);text-align:center;box-shadow:0 0 0 2px var(--bg);background:#f26d6d;border-radius:999px;padding:0 5px;font-size:10.5px;font-weight:700;line-height:18px;position:absolute;top:-3px;right:-3px}.notif-scrim{z-index:30;position:fixed;inset:0}.notif-panel{background:var(--surface);border:1px solid var(--line2);border-radius:var(--radius-lg);z-index:31;width:min(340px,86vw);max-height:66vh;padding:var(--s2);overscroll-behavior:contain;position:absolute;top:46px;right:0;overflow:auto;box-shadow:0 24px 60px -24px #000}.notif-head{font-family:var(--display);align-items:center;gap:8px;padding:8px 10px 10px;font-size:14px;font-weight:700;display:flex}.notif-count{background:color-mix(in oklab,var(--accent) 16%,transparent);color:var(--accent);border-radius:999px;padding:2px 8px;font-size:11px;font-weight:700}.notif-empty{text-align:center;color:var(--fg-faint);padding:24px;font-size:13px}.notif-item{border-radius:12px;gap:10px;padding:11px 10px;transition:background .15s;display:flex}.notif-item:hover{background:var(--elev)}.notif-item.unread{background:color-mix(in oklab,var(--accent) 7%,transparent)}.notif-dot{background:var(--accent);border-radius:50%;flex:none;width:7px;height:7px;margin-top:6px}.notif-item:not(.unread) .notif-body{margin-left:17px}.notif-body{min-width:0}.notif-title{font-size:13.5px;font-weight:600;line-height:1.3}.notif-msg{color:var(--fg-soft);margin-top:2px;font-size:12.5px;line-height:1.4}.notif-time{color:var(--fg-faint);margin-top:4px;font-size:11px}.view{padding:clamp(var(--s5),3.5vw,var(--s7));width:100%;max-width:1600px;margin:0 auto}.pull-ready{justify-content:center;align-items:center;gap:var(--s5);text-align:center;flex-direction:column;min-height:64vh;display:flex}.pull-ready h1{font-family:var(--display);letter-spacing:-.02em;font-size:clamp(26px,3vw,36px);font-weight:700}.special-note{background:color-mix(in oklab,var(--r-l) 12%,var(--elev));border:1px solid color-mix(in oklab,var(--r-l) 32%,var(--line));color:var(--fg);border-radius:12px;flex-wrap:wrap;justify-content:center;align-items:center;gap:10px;padding:10px 16px;font-size:13px;display:flex}.link-btn{color:var(--accent);font:inherit;cursor:pointer;text-underline-offset:3px;background:0 0;border:none;font-weight:600;text-decoration:underline}.pull-ready .sub{color:var(--fg-soft);margin-top:calc(-1 * var(--s3));font-size:15px}.booster-stage{justify-content:center;align-items:center;width:100%;min-height:clamp(300px,44vh,440px);display:flex;position:relative}.booster{aspect-ratio:2550/3300;cursor:pointer;filter:drop-shadow(0 34px 54px #0009);background:0 0;border:none;width:clamp(210px,23vw,272px);padding:0;transition:transform .3s cubic-bezier(.2,.7,.3,1);position:relative}.booster:hover:not(:disabled):not(.opening){transform:translateY(-8px)}.booster:disabled{cursor:default}.booster-main{transform-origin:50% 60%;animation:5.5s ease-in-out infinite booster-float;position:absolute;inset:0}.booster-main img{object-fit:contain;-webkit-user-drag:none;-webkit-user-select:none;user-select:none;width:100%;height:100%;display:block}.booster-shine{pointer-events:none;mix-blend-mode:screen;opacity:0;background:linear-gradient(115deg,#0000 40%,#ffffffd9 47%,#96d2ffb3 50%,#ffecb4b3 53%,#0000 60%) 0 0/260% 260% no-repeat;animation:5s ease-in-out infinite booster-sheen;position:absolute;inset:0;-webkit-mask:url(/card_pack.png) 50%/contain no-repeat;mask:url(/card_pack.png) 50%/contain no-repeat}@keyframes booster-sheen{0%{opacity:0;background-position:130% 0}30%{opacity:.95}52%{opacity:.95;background-position:-30% 100%}72%,to{opacity:0;background-position:-30% 100%}}@keyframes booster-float{0%,to{transform:translateY(0)rotate(-1.2deg)}50%{transform:translateY(-12px)rotate(1.2deg)}}.booster-back{filter:brightness(.62)grayscale(.25);background-position:50%;background-repeat:no-repeat;background-size:contain;position:absolute;inset:0}.booster-back.b1{opacity:.7;transform:translate(11px,9px)rotate(4deg)scale(.985)}.booster-back.b2{opacity:.4;transform:translate(22px,18px)rotate(8deg)scale(.97)}.booster.empty .booster-main{filter:grayscale(.9)brightness(.45);animation-play-state:paused}.booster.empty .booster-shine{display:none}.booster.opening{cursor:default}.booster.opening .booster-main{animation:.9s cubic-bezier(.3,.6,.2,1) forwards booster-open}@keyframes booster-open{0%{transform:translateY(0)rotate(0)}14%{transform:rotate(-5deg)}28%{transform:rotate(5deg)}42%{transform:rotate(-4deg)}56%{transform:rotate(3deg)scale(1.03)}68%{transform:rotate(0)scale(1.06)}to{opacity:0;filter:brightness(2.2);transform:scale(1.5)}}.booster.opening:after{content:\"\";pointer-events:none;opacity:0;background:radial-gradient(circle,#fff6e0f2,#fff6e040 45%,#0000 66%);border-radius:50%;animation:.9s ease-out forwards booster-burst;position:absolute;inset:-25%}@keyframes booster-burst{0%,52%{opacity:0;transform:scale(.5)}74%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(1.5)}}.pack-count{flex-direction:column;align-items:center;gap:2px;display:flex}.pc-num{font-family:var(--display);color:var(--accent);font-variant-numeric:tabular-nums;font-size:clamp(36px,5vw,54px);font-weight:800;line-height:1}.pack-count.empty .pc-num{color:var(--fg-faint)}.pc-lbl{color:var(--fg-soft);font-size:14px}.regen-line{color:var(--fg-soft);font-size:13.5px}.regen-line b{color:var(--fg);font-weight:600}.regen-line.err{color:#f0a3a3}.btn.big{padding:14px 34px;font-size:16px}.btn{font-family:var(--display);border:1px solid var(--line2);color:var(--fg);background:0 0;border-radius:12px;padding:13px 28px;font-size:15px;font-weight:600;transition:all .15s}.btn:hover{border-color:var(--fg-soft)}.btn.primary{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}.btn.primary:hover{filter:brightness(1.06)}.btn:disabled{opacity:.45;cursor:not-allowed}.session-recap{color:var(--fg-faint);margin-top:var(--s2);font-size:12.5px}.reveal{justify-content:center;align-items:center;gap:var(--s6);flex-direction:column;min-height:64vh;display:flex}.reveal .count{color:var(--fg-soft);font-size:14px}.reveal .count b{color:var(--accent);font-family:var(--display);margin:0 3px;font-size:18px}.stage{width:clamp(280px,32vw,340px);max-width:100%;position:relative}.stage-aura{z-index:0;pointer-events:none;background:radial-gradient(closest-side, color-mix(in oklab,var(--rc) 60%, transparent), transparent 72%);filter:blur(34px);opacity:.35;border-radius:50%;animation:.55s cubic-bezier(.3,.8,.3,1) aurapop;position:absolute;inset:-14% -10%}.stage-aura[data-r=C]{--rc:var(--r-c);opacity:.26}.stage-aura[data-r=PC]{--rc:var(--r-pc);opacity:.34}.stage-aura[data-r=R]{--rc:var(--r-r);opacity:.46}.stage-aura[data-r=SR]{--rc:var(--r-sr);opacity:.58}.stage-aura[data-r=UR]{--rc:var(--r-ur);opacity:.72;inset:-18% -12%}.stage-aura[data-r=L]{--rc:var(--r-l);opacity:.85;inset:-20% -14%}@keyframes aurapop{0%{transform:scale(.7)}to{transform:scale(1)}}.stage .flip-in{z-index:1;position:relative}.reveal-rarity{font-family:var(--display);letter-spacing:.06em;color:var(--rc);font-size:16px;font-weight:700;animation:.45s rarityin}.reveal-rarity[data-r=C]{--rc:var(--r-c)}.reveal-rarity[data-r=PC]{--rc:var(--r-pc)}.reveal-rarity[data-r=R]{--rc:var(--r-r)}.reveal-rarity[data-r=SR]{--rc:var(--r-sr)}.reveal-rarity[data-r=UR]{--rc:var(--r-ur)}.reveal-rarity[data-r=L]{--rc:var(--r-l)}.reveal-rarity[data-r=UR],.reveal-rarity[data-r=L]{letter-spacing:.1em;font-size:19px}@keyframes rarityin{0%{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}.dots{gap:var(--s2);align-items:center;display:flex}.dots .d{background:var(--line2);border-radius:50%;width:8px;height:8px;transition:all .2s}.dots .d.on{background:var(--accent);transform:scale(1.15)}.dots .d.seen{background:var(--fg-faint)}.navrow{align-items:center;gap:var(--s5);display:flex}.arrow{border:1px solid var(--line2);background:var(--elev);width:46px;height:46px;color:var(--fg);border-radius:50%;justify-content:center;align-items:center;transition:all .15s;display:flex}.arrow svg{width:20px;height:20px}.arrow:hover{border-color:var(--fg-soft)}.arrow:disabled{opacity:.3;cursor:not-allowed}.flip-in{animation:.5s cubic-bezier(.3,.8,.3,1) flipin}@keyframes flipin{0%{opacity:0;transform:rotateY(-14deg)translateY(14px)}to{opacity:1;transform:none}}.reveal-skip{color:var(--fg-faint);cursor:pointer;text-underline-offset:3px;background:0 0;border:none;padding:4px;font-size:13px;text-decoration:underline}.reveal-skip:hover{color:var(--fg-soft)}.reveal-all{gap:var(--s5)}.reveal-all-head{text-align:center;flex-direction:column;gap:4px;display:flex}.reveal-all-head h2{font-family:var(--display);letter-spacing:-.02em;font-size:clamp(22px,2.4vw,28px);font-weight:700}.reveal-all-head .sub{color:var(--fg-soft);font-size:14px}.reveal-grid{gap:var(--s5);grid-template-columns:repeat(auto-fit,minmax(150px,180px));justify-content:center;width:100%;max-width:1000px;display:grid}.rg-card{animation:.5s cubic-bezier(.2,.7,.3,1) both rgin;position:relative}.rg-aura{z-index:0;pointer-events:none;background:radial-gradient(closest-side,color-mix(in oklab,var(--rc) 55%,transparent),transparent 72%);filter:blur(26px);opacity:.3;border-radius:50%;position:absolute;inset:-10% -8%}.rg-aura[data-r=C]{--rc:var(--r-c);opacity:.16}.rg-aura[data-r=PC]{--rc:var(--r-pc);opacity:.22}.rg-aura[data-r=R]{--rc:var(--r-r);opacity:.34}.rg-aura[data-r=SR]{--rc:var(--r-sr);opacity:.46}.rg-aura[data-r=UR]{--rc:var(--r-ur);opacity:.6}.rg-aura[data-r=L]{--rc:var(--r-l);opacity:.72}.rg-card .card-btn{z-index:1;position:relative}@keyframes rgin{0%{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}.wc{aspect-ratio:5/7;border-radius:var(--radius-lg);border:3.5px solid color-mix(in oklab,var(--rc) 65%,var(--line));cursor:pointer;background:#0f110e;transition:transform .2s cubic-bezier(.2,.7,.3,1),border-color .2s,box-shadow .2s;position:relative;overflow:hidden}.wc[data-r=C]{--rc:var(--r-c);box-shadow:0 6px 18px -12px color-mix(in oklab,var(--r-c) 45%,transparent)}.wc[data-r=PC]{--rc:var(--r-pc);box-shadow:0 6px 20px -12px color-mix(in oklab,var(--r-pc) 55%,transparent)}.wc[data-r=R]{--rc:var(--r-r);box-shadow:0 8px 24px -12px color-mix(in oklab,var(--r-r) 62%,transparent)}.wc[data-r=SR]{--rc:var(--r-sr);box-shadow:0 8px 26px -11px color-mix(in oklab,var(--r-sr) 70%,transparent)}.wc[data-r=UR]{--rc:var(--r-ur);box-shadow:0 10px 30px -11px color-mix(in oklab,var(--r-ur) 78%,transparent)}.wc[data-r=L]{--rc:var(--r-l);box-shadow:0 12px 36px -10px color-mix(in oklab,var(--r-l) 85%,transparent)}.wc[data-r=SR],.wc[data-r=UR],.wc[data-r=L]{border-color:color-mix(in oklab,var(--rc) 88%,var(--line))}.wc:hover{border-color:var(--rc);box-shadow:0 18px 42px -20px color-mix(in oklab,var(--rc) 42%,#000);transform:translateY(-5px)}.wc-face{background:linear-gradient(#181c16,#0d0f0c);position:absolute;inset:0}.wc:before{content:\"\";z-index:5;pointer-events:none;border-radius:inherit;position:absolute;inset:0;box-shadow:inset 0 1px #ffffff29,inset 0 0 0 1px #ffffff08,inset 0 -44px 52px -44px #0000008c}.wc:not(.is-noimg) .wc-face:after{content:\"\";pointer-events:none;background:linear-gradient(180deg, color-mix(in oklab,var(--rc) 26%, transparent), transparent 28%);position:absolute;inset:0}.wc-blur{object-fit:cover;filter:blur(22px)saturate(1.1)brightness(.5);z-index:0;width:100%;height:100%;position:absolute;inset:0;transform:scale(1.2)}.wc.is-noimg .wc-blur{display:none}.wc-photo{object-fit:contain;z-index:1;width:100%;height:100%;position:absolute;inset:0}.wc-bg{object-fit:cover;z-index:0;width:100%;height:100%;position:absolute;inset:0;transform:scale(1.8)}.wc-bg.onyx{transform:none}.wc-photo.onyx-photo{object-fit:cover;z-index:1}.wc.is-noimg .wc-face{background:radial-gradient(130% 90% at 50% 14%, color-mix(in oklab,var(--rc) 45%, transparent), transparent 64%), linear-gradient(180deg, color-mix(in oklab,var(--rc) 22%, #171b15), #0c0e0b)}.wc.is-shiny{box-shadow:inset 0 0 0 1px #e9c15a8c,0 0 16px #e9c15a4d,0 0 30px #00000080}.wc.is-shiny:hover{box-shadow:inset 0 0 0 1px #e9c15acc,0 0 22px #e9c15a80,0 18px 42px -20px #000}.wc-holo{z-index:2;pointer-events:none;mix-blend-mode:screen;opacity:.7;background:radial-gradient(circle at 50% 45%,#fff8e0 0%,#fff8e033 20%,#0000 46%) 0 0/175% 175% no-repeat;animation:6.5s ease-in-out infinite alternate shiny-drift;position:absolute;inset:0}.wc-holo.onyx{mix-blend-mode:soft-light;opacity:.9}@keyframes shiny-drift{0%{background-position:16% 12%}to{background-position:84% 82%}}@media (prefers-reduced-motion:reduce){.wc-holo{opacity:.5;background-position:50% 42%;animation:none}}.ox{z-index:1;pointer-events:none;position:absolute;inset:0}.ox-shade{mix-blend-mode:multiply;background:#2e2b36}.ox-tint{mix-blend-mode:color;background:#3b3b42}.ox-wash{background:radial-gradient(120% 80% at 50% 30%,#0000 40%,#05040866 78%,#050408cc 100%),linear-gradient(#0b0a12ec 0%,#0d0c15dd 55%,#0b0a1255 78%,#0b0a12bb 100%)}.ox-lines{opacity:.62;mix-blend-mode:screen;background:linear-gradient(160deg,#fff0b3 0%,#e9c15a 35%,#fff6d0 55%,#d7a93c 80%,#ffe9a6 100%);-webkit-mask:url(https://www.wiki-masters.com/shiny/onyx-lines.png) 50%/cover no-repeat;mask:url(https://www.wiki-masters.com/shiny/onyx-lines.png) 50%/cover no-repeat}.ox-shine{mix-blend-mode:screen;opacity:.95;background:radial-gradient(circle at 50% 45%,#fffbe8 0%,#f6d98aa6 16%,#e9c15a26 34%,#0000 52%) 0 0/210% 210% no-repeat;animation:5.5s ease-in-out infinite alternate onyx-shimmer;-webkit-mask:url(https://www.wiki-masters.com/shiny/onyx-lines.png) 50%/cover no-repeat;mask:url(https://www.wiki-masters.com/shiny/onyx-lines.png) 50%/cover no-repeat}@keyframes onyx-shimmer{0%{background-position:12% 8%}to{background-position:88% 86%}}@media (prefers-reduced-motion:reduce){.ox-shine{opacity:.7;background-position:42% 30%;animation:none}}.wc-scrim{pointer-events:none;background:linear-gradient(#0000 20%,#05060533 32%,#050605b3 50%,#050605fb 68%,#050605 100%);position:absolute;inset:0}.wc.bare .wc-cap,.wc.bare .wc-scrim{display:none}.wc-top{z-index:3;justify-content:space-between;align-items:flex-start;gap:6px;display:flex;position:absolute;top:11px;left:11px;right:11px}.wc-rtag{font-family:var(--display);color:#08130e;background:var(--rc);border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700;box-shadow:0 1px 5px #0006}.wc-flags{align-items:center;gap:5px;display:flex}.wc-count{color:#fff;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);background:#0000008c;border:1px solid #ffffff2e;border-radius:6px;padding:2px 7px;font-size:10.5px;font-weight:600}.wc-new{background:var(--accent);color:var(--accent-ink);border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700}.wc-shiny{color:#f3d27a;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);background:#111014;border-radius:6px;justify-content:center;align-items:center;width:22px;height:20px;font-size:12px;font-weight:700;display:inline-flex;box-shadow:inset 0 0 0 1px #d7a93c,0 0 10px #e9c15a73}.wc-star{border:1px solid color-mix(in oklab,var(--r-l) 55%,#ffffff4d);color:var(--r-l);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);background:#0000008c;border-radius:6px;justify-content:center;align-items:center;width:22px;height:20px;font-size:12px;font-weight:700;display:inline-flex}.wc-cap{z-index:3;gap:var(--s1);background:linear-gradient(#0000,#0506058c 28%,#050605eb);flex-direction:column;padding:14px 14px 16px;display:flex;position:absolute;bottom:0;left:0;right:0}.wc.bare .wc-cap{background:0 0}.wc-name{font-family:var(--display);color:#fff;text-shadow:0 1px 10px #000000a6;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:15px;font-weight:700;line-height:1.18;display:-webkit-box;overflow:hidden}.wc-cat{color:#ffffffd1;white-space:nowrap;text-overflow:ellipsis;text-shadow:0 1px 6px #000000b3;font-size:10.5px;line-height:1.3;overflow:hidden}.wc-meta{border-top:1px solid #ffffff38;justify-content:space-between;align-items:center;gap:8px;margin-top:9px;padding-top:9px;display:flex}.wc-stats{color:#ffffffd9;letter-spacing:.02em;text-shadow:0 1px 6px #000000b3;gap:12px;font-size:11px;display:flex}.wc-stats b{color:#fff;font-variant-numeric:tabular-nums;font-weight:700}.wc-val{color:var(--r-l);font-variant-numeric:tabular-nums;text-shadow:0 1px 6px #000000b3;white-space:nowrap;align-items:center;gap:4px;font-size:11px;font-weight:700;display:inline-flex}.wc-val:before{content:\"\";background:radial-gradient(circle at 35% 30%,#ffe680,var(--r-l));width:9px;height:9px;box-shadow:0 0 6px color-mix(in oklab,var(--r-l) 55%,transparent);border-radius:50%}.wc-big .wc-name{font-size:22px}.wc-big .wc-cat{white-space:normal;font-size:13px}.wc-big .wc-stats{margin-top:12px;padding-top:12px;font-size:14px}.wc-big .wc-cap{padding:18px 20px 20px}.wc-big .wc-rtag{padding:4px 10px;font-size:12px}.wc-big .wc-top{top:14px;left:14px;right:14px}.coll-head{justify-content:space-between;align-items:flex-start;gap:var(--s4);margin-bottom:var(--s5);flex-wrap:wrap;display:flex}.coll-head h1{font-family:var(--display);letter-spacing:-.02em;font-size:clamp(24px,2.6vw,32px);font-weight:700}.coll-head .meta{color:var(--fg-soft);margin-top:6px;font-size:14px}.coll-tools{gap:var(--s3);flex-wrap:wrap;flex:460px;justify-content:flex-end;align-items:center;display:flex}.search-wrap{flex:300px;align-items:center;min-width:220px;display:flex;position:relative}.search-ico{width:17px;height:17px;color:var(--fg-faint);pointer-events:none;position:absolute;left:14px}.search{background:var(--elev);border:1px solid var(--line);width:100%;color:var(--fg);font-family:var(--body);border-radius:11px;padding:11px 38px 11px 40px;font-size:14px}.search::placeholder{color:var(--fg-faint)}.search:focus{border-color:var(--fg-soft);background:var(--elev2)}.search::-webkit-search-cancel-button{display:none}.search-clear{width:24px;height:24px;color:var(--fg-faint);background:0 0;border:none;border-radius:7px;justify-content:center;align-items:center;font-size:18px;line-height:1;display:flex;position:absolute;right:8px}.search-clear:hover{background:var(--elev2);color:var(--fg)}.tool-actions{gap:var(--s2);flex-wrap:wrap;align-items:center;display:flex}.isel{background:var(--elev);border:1px solid var(--line);border-radius:11px;align-items:center;gap:8px;height:42px;padding:0 12px;transition:all .15s;display:inline-flex;position:relative}.isel:hover,.isel:focus-within{border-color:var(--line2)}.isel svg{width:16px;height:16px;color:var(--fg-soft);flex:none}.isel select{appearance:none;color:var(--fg);font-family:var(--body);cursor:pointer;background:0 0;border:none;outline:none;height:100%;padding:0 18px 0 0;font-size:14px;font-weight:500}.isel:after{content:\"\";border-right:2px solid var(--fg-soft);border-bottom:2px solid var(--fg-soft);pointer-events:none;width:8px;height:8px;position:absolute;right:12px;transform:rotate(45deg)translateY(-2px)}.iconbtn{background:var(--elev);border:1px solid var(--line);color:var(--fg-soft);height:42px;font-family:var(--body);white-space:nowrap;border-radius:11px;align-items:center;gap:8px;padding:0 14px;font-size:14px;font-weight:500;transition:all .15s;display:inline-flex}.iconbtn svg{flex:none;width:17px;height:17px}.iconbtn:hover{color:var(--fg);border-color:var(--line2)}.iconbtn.on{color:var(--fg);border-color:var(--fg-soft);background:var(--elev2)}.sort-hint{margin:-8px 0 var(--s4);color:var(--fg-soft);font-size:12.5px}.rarity-panel{gap:var(--s3);margin-bottom:var(--s6);flex-direction:column;display:flex}.rarity-meter{gap:5px;height:9px;display:flex}.rm-seg{background:var(--rc);cursor:pointer;border:none;border-radius:999px;min-width:14px;height:100%;padding:0;transition:flex-grow .45s cubic-bezier(.2,.7,.3,1),opacity .2s,filter .2s,transform .15s}.rm-seg:hover{filter:brightness(1.18)}.rm-seg.sel{filter:brightness(1.2);transform:scaleY(1.5)}.rm-seg.dim{opacity:.28}.rarity-legend{gap:var(--s2);flex-wrap:wrap;align-items:center;display:flex}.rl{background:var(--elev);border:1px solid var(--line);color:var(--fg-soft);border-radius:999px;align-items:center;gap:8px;padding:7px 13px;font-size:13px;font-weight:500;transition:all .15s;display:inline-flex}.rl:hover{color:var(--fg);border-color:var(--line2)}.rl.on{color:var(--fg);border-color:var(--fg-soft);background:var(--elev2)}.rl-dot{border-radius:3px;flex:none;width:9px;height:9px}.rl-n{color:var(--fg);font-variant-numeric:tabular-nums;font-weight:700}.rl-sep{background:var(--line2);width:1px;height:22px;margin:0 4px}.rl-ico{flex:none;width:14px;height:14px}.rl.fav.on{color:var(--r-l);border-color:color-mix(in oklab,var(--r-l) 55%,var(--line2));background:color-mix(in oklab,var(--r-l) 10%,var(--elev))}.rl.fav.on .rl-ico{fill:var(--r-l);stroke:var(--r-l)}.rl.shiny.on{color:var(--r-l);border-color:color-mix(in oklab,var(--r-l) 55%,var(--line2));background:color-mix(in oklab,var(--r-l) 10%,var(--elev))}.card-btn{text-align:left;cursor:pointer;content-visibility:auto;contain-intrinsic-size:auto 300px;background:0 0;border:none;width:100%;margin:0;padding:0;display:block;position:relative}.card-btn.picking .wc{opacity:.55;transition:opacity .15s}.card-btn.picked .wc{opacity:1}.pick-overlay{z-index:10;border-radius:var(--radius-lg);pointer-events:none;border:3px solid #0000;justify-content:flex-end;align-items:flex-start;padding:9px;transition:all .15s;display:flex;position:absolute;inset:0}.pick-overlay .pick-check{color:#fff;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);background:#0000008c;border:2px solid #ffffffe6;border-radius:50%;justify-content:center;align-items:center;width:28px;height:28px;font-size:15px;font-weight:800;display:flex}.pick-overlay.on{border-color:var(--accent);background:color-mix(in oklab,var(--accent) 22%,transparent);box-shadow:0 0 0 2px var(--accent) inset}.pick-overlay.on .pick-check{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}.loading-more{color:var(--fg-faint);padding:var(--s3) 0;text-align:center;font-size:13px}.bulk-bar{z-index:40;background:var(--elev2);border:1px solid var(--line2);border-radius:999px;align-items:center;gap:12px;padding:8px 10px 8px 18px;display:flex;position:fixed;bottom:20px;left:50%;transform:translate(-50%);box-shadow:0 18px 44px -18px #000}.bulk-text{color:var(--fg);white-space:nowrap;font-size:13.5px}.bulk-text b{color:var(--r-l)}.bulk-bar .btn{padding:9px 18px}.grid{gap:var(--s5);grid-template-columns:repeat(auto-fill,minmax(200px,1fr));display:grid}.empty{justify-content:center;align-items:center;gap:var(--s3);min-height:44vh;color:var(--fg-soft);text-align:center;flex-direction:column;display:flex}.empty b{font-family:var(--display);color:var(--fg);font-size:19px}.loading{color:var(--fg-faint);padding:var(--s7);text-align:center}.wc.skeleton{border:1px solid var(--line);background:linear-gradient(100deg,#141613 30%,#1c201c 50%,#141613 70%) 0 0/200% 100%;animation:1.2s ease-in-out infinite sk}@keyframes sk{to{background-position:-200% 0}}.modal-backdrop{-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:2147483600;padding:var(--s5);background:#060806b8;justify-content:center;align-items:center;animation:.18s fade;display:flex;position:fixed;inset:0}@keyframes fade{0%{opacity:0}to{opacity:1}}.modal{background:var(--surface);border:1px solid var(--line2);border-radius:var(--radius-lg);gap:var(--s6);width:100%;max-width:740px;max-height:90vh;padding:var(--s6);grid-template-columns:240px 1fr;display:grid;position:relative;overflow:auto}.modal-card{width:240px}.modal-close{color:var(--fg-soft);cursor:pointer;z-index:2;background:0 0;border:none;font-size:28px;line-height:1;position:absolute;top:12px;right:16px}.modal-close:hover{color:var(--fg)}.modal-info{gap:var(--s4);flex-direction:column;justify-content:flex-start;min-width:0;display:flex}.modal-rar{font-family:var(--display);letter-spacing:.04em;font-size:12px;font-weight:700}.modal-rar[data-r=C]{color:var(--r-c)}.modal-rar[data-r=PC]{color:var(--r-pc)}.modal-rar[data-r=R]{color:var(--r-r)}.modal-rar[data-r=SR]{color:var(--r-sr)}.modal-rar[data-r=UR]{color:var(--r-ur)}.modal-rar[data-r=L]{color:var(--r-l)}.modal-name{font-family:var(--display);letter-spacing:-.01em;font-size:26px;font-weight:700;line-height:1.15}.modal-cat{color:var(--fg-soft);font-size:14px;line-height:1.45}.modal-sum{color:var(--fg-soft);-webkit-line-clamp:4;-webkit-box-orient:vertical;font-size:13.5px;line-height:1.55;display:-webkit-box;overflow:hidden}.modal-sum.muted{color:var(--fg-faint)}.modal .btn{text-align:center;text-decoration:none}.modal-panel{gap:var(--s4);flex-direction:column;display:flex}.modal-wiki{color:var(--accent);align-self:flex-start;font-size:13.5px;font-weight:600;text-decoration:none}.modal-wiki:hover{text-decoration:underline}.actions{border-top:1px solid var(--line);padding-top:var(--s4)}.modal-credit{color:var(--fg-faint);font-size:11px}@media (prefers-reduced-motion:reduce){.flip-in,.stage-aura,.reveal-rarity,.rg-card,.booster-main,.booster-shine{animation:none}.booster,.wc{transition:none}}@media (width<=900px){:host,:root{--sidebar:100%}.app{grid-template-columns:1fr}.side{align-items:center;gap:var(--s4);height:auto;padding:var(--s3) var(--s4);flex-flow:wrap;position:static}.side .brand{margin-right:auto}.side-foot{flex-direction:row;align-items:center;margin-top:0}.nav{-webkit-overflow-scrolling:touch;gap:var(--s2);flex-flow:row;overflow:auto visible}.nav a,.nav button{white-space:nowrap;flex:none;width:auto;padding:9px 12px}.nav-sep{display:none}}@media (width<=560px){.modal{text-align:center;justify-items:center;gap:var(--s4);padding:var(--s5);grid-template-columns:1fr}.modal-card{width:190px}.facts{grid-template-columns:repeat(2,1fr)}.grid{gap:var(--s4);grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}}.actions{gap:var(--s2);margin-top:var(--s2);display:flex}.actions .btn{flex:1}.btn.danger{color:#f0a0a0;border-color:#5a2b2b}.btn.danger:hover{color:#f8caca;border-color:#f26d6d}.af-input-row{align-items:center;display:flex;position:relative}.af-input{background:var(--surface);border:1px solid var(--line2);color:var(--fg);font-family:var(--body);border-radius:9px;flex:1;width:100%;padding:9px 40px 9px 12px;font-size:14px}.af-unit{color:var(--fg-faint);pointer-events:none;font-size:13px;position:absolute;right:12px}.af-input:focus{border-color:var(--accent)}.af-actions{gap:8px;margin-top:4px;display:flex}.af-actions .btn{flex:1}.modal-msg{color:#f0a0a0;font-size:12.5px}.modal-msg.ok{color:var(--accent)}.confirm{margin-top:var(--s2);background:var(--elev);border:1px solid var(--line);border-radius:12px;flex-direction:column;gap:10px;padding:14px;display:flex}.confirm-text{color:var(--fg);font-size:14px;line-height:1.4}.confirm-text b{color:var(--r-l);font-weight:700}.modal-tabs{background:var(--elev);border:1px solid var(--line);border-radius:10px;align-self:flex-start;gap:4px;margin-top:2px;padding:3px;display:inline-flex}.modal-tabs button{color:var(--fg-soft);font-family:var(--display);cursor:pointer;background:0 0;border:none;border-radius:8px;padding:6px 14px;font-size:13px;font-weight:600;transition:all .15s}.modal-tabs button.on{background:var(--accent);color:var(--accent-ink)}.market-chart{margin-top:var(--s1)}.mc-head{color:var(--fg-soft);margin-bottom:6px;font-size:11.5px}.mc-plot{align-items:stretch;gap:8px;display:flex}.mc-y{text-align:right;min-width:30px;color:var(--fg-faint);font-variant-numeric:tabular-nums;flex-direction:column;justify-content:space-between;padding:2px 0;font-size:10px;display:flex}.mc-plot svg{background:var(--elev);border:1px solid var(--line);border-radius:10px;flex:1;height:56px;display:block}.mc-x{color:var(--fg-faint);justify-content:space-between;margin-top:4px;margin-left:38px;font-size:10px;display:flex}.market-grid{gap:var(--s3);margin-top:var(--s3);grid-template-columns:repeat(4,1fr);display:grid}.mstat{background:var(--elev);border:1px solid var(--line);text-align:center;border-radius:12px;padding:12px 10px}.mstat .l{color:var(--fg-faint);font-size:10.5px}.mstat .v{font-family:var(--display);font-variant-numeric:tabular-nums;margin-top:2px;font-size:20px;font-weight:700}.market-active{color:var(--fg-soft);margin-top:var(--s2);padding-top:var(--s3);border-top:1px solid var(--line);font-size:13px}.market-active b{color:var(--fg);font-variant-numeric:tabular-nums;font-weight:700}@media (width<=560px){.market-grid{grid-template-columns:repeat(2,1fr)}}.facts{gap:var(--s2);grid-template-columns:repeat(auto-fit,minmax(112px,1fr));display:grid}.fact{background:var(--elev);border:1px solid var(--line);border-radius:11px;padding:10px 13px}.fk{color:var(--fg-faint);font-size:11px}.fv{font-family:var(--display);font-variant-numeric:tabular-nums;margin-top:3px;font-size:18px;font-weight:700;line-height:1.15}.fv.atk{color:#f26d6d}.fv.def{color:#5aa2ff}.fv.val{color:var(--r-l)}.modal-obtained{color:var(--fg-faint);margin-top:calc(-1 * var(--s2));font-size:12px}.modal-backdrop,.modal{overscroll-behavior:contain}.wc.is-unowned{filter:saturate(.72)brightness(.9)}.card-btn:hover .wc.is-unowned{filter:saturate()brightness()}.wc-wish{border:1px solid color-mix(in oklab,var(--r-sr) 60%,#ffffff4d);color:var(--r-sr);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);background:#0000008c;border-radius:6px;justify-content:center;align-items:center;width:22px;height:20px;font-size:12px;font-weight:700;display:inline-flex}.wc.is-nsfw .wc-photo,.wc.is-nsfw .wc-blur{filter:blur(18px)saturate(.7);transform:scale(1.2)}.wc-nsfw{z-index:3;font:600 11px/1 var(--display);color:var(--fg);border:1px solid var(--line2);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);white-space:nowrap;background:#0009;border-radius:999px;padding:6px 12px;position:absolute;top:44%;left:50%;transform:translate(-50%,-50%)}.rl.static{cursor:default}.rl.static:hover{color:var(--fg-soft);border-color:var(--line)}.grid.dim{opacity:.5;pointer-events:none;transition:opacity .2s}.pager{justify-content:center;align-items:center;gap:var(--s4);margin:var(--s6) 0 var(--s5);display:flex}.pager-info{color:var(--fg-soft);font-variant-numeric:tabular-nums;font-size:13.5px}.wish-btn{width:100%;margin-top:var(--s3)}.wish-btn.on{border-color:color-mix(in oklab,var(--r-sr) 55%,var(--line2));color:var(--r-sr)}.auc-item{flex-direction:column;gap:6px;display:flex}.auc-item .card-btn{width:100%}.auc-meta{justify-content:space-between;align-items:center;gap:8px;padding:0 2px;display:flex}.auc-bid{font-family:var(--display);color:var(--r-l);font-variant-numeric:tabular-nums;align-items:center;gap:5px;font-size:14px;font-weight:700;display:inline-flex}.auc-coin{background:radial-gradient(circle at 35% 30%,#ffe680,var(--r-l));width:11px;height:11px;box-shadow:0 0 6px color-mix(in oklab,var(--r-l) 55%,transparent);border-radius:50%;flex:none}.auc-end{color:var(--fg-soft);font-variant-numeric:tabular-nums;font-size:12.5px}.auc-seller{color:var(--fg-faint);white-space:nowrap;text-overflow:ellipsis;padding:0 2px;font-size:11.5px;overflow:hidden}.auc-detail{margin-top:var(--s3);padding-top:var(--s3);border-top:1px solid var(--line);flex-direction:column;gap:8px;display:flex}.auc-row{color:var(--fg-soft);justify-content:space-between;font-size:13.5px;display:flex}.auc-row b{color:var(--fg)}.mkt-filter{margin-bottom:var(--s5)}.auc-note{color:var(--fg-soft);padding:8px 0;font-size:13px}.auc2{background:var(--surface);border:1px solid var(--line2);border-radius:var(--radius-lg);width:min(920px,94vw);max-height:92vh;padding:var(--s6);position:relative;overflow:auto;box-shadow:0 40px 90px -30px #000}.auc2-grid{gap:var(--s6);grid-template-columns:1fr 300px;display:grid}.auc2-main{gap:var(--s5);flex-direction:column;min-width:0;display:flex}.auc2-head{gap:var(--s4);align-items:flex-start;display:flex}.auc2-thumb{flex:none;width:120px}.auc2-thumb .wc{border-radius:12px}.auc2-id{min-width:0}.auc2-name{font-family:var(--display);letter-spacing:-.02em;margin-top:8px;font-size:clamp(20px,2.4vw,28px);font-weight:700;line-height:1.1}.auc2-cat{color:var(--fg-soft);margin-top:4px;font-size:14px}.auc2-seller{color:var(--fg-faint);margin-top:6px;font-size:12.5px}.auc2-stats{gap:var(--s4);display:flex}.auc2-price,.auc2-clock{background:var(--elev);border:1px solid var(--line);border-radius:14px;flex:1;padding:14px 16px}.auc2-price-lbl,.auc2-clock-lbl{color:var(--fg-soft);letter-spacing:.02em;font-size:12px}.auc2-price-val{font-family:var(--display);color:var(--r-l);font-variant-numeric:tabular-nums;align-items:center;gap:8px;margin-top:4px;font-size:30px;font-weight:800;display:inline-flex}.auc2-coin{background:radial-gradient(circle at 35% 30%,#ffe680,var(--r-l));width:16px;height:16px;box-shadow:0 0 8px color-mix(in oklab,var(--r-l) 55%,transparent);border-radius:50%;flex:none}.auc2-clock-val{font-family:var(--display);font-variant-numeric:tabular-nums;margin-top:4px;font-size:26px;font-weight:800}.auc2-clock[data-u=warn]{border-color:color-mix(in oklab,var(--r-ur) 45%,var(--line))}.auc2-clock[data-u=warn] .auc2-clock-val{color:var(--r-ur)}.auc2-clock[data-u=crit]{border-color:color-mix(in oklab,#f0715f 55%,var(--line));background:color-mix(in oklab,#f0715f 8%,var(--elev))}.auc2-clock[data-u=crit] .auc2-clock-val{color:#f6867a;animation:1s ease-in-out infinite auc2-pulse}@keyframes auc2-pulse{50%{opacity:.55}}.auc2-clock[data-u=end] .auc2-clock-val{color:var(--fg-faint)}.auc2-chart{background:var(--elev);border:1px solid var(--line);border-radius:14px;height:120px;padding:12px 12px 12px 44px;position:relative}.auc2-chart svg{width:100%;height:100%;display:block}.auc2-chart .mc-y{color:var(--fg-faint);font-variant-numeric:tabular-nums;flex-direction:column;justify-content:space-between;font-size:10.5px;display:flex;position:absolute;top:12px;bottom:12px;left:10px}.auc2-feed{background:var(--elev);border:1px solid var(--line);border-radius:14px;padding:12px 14px}.auc2-feed-head{font-family:var(--display);color:var(--fg-soft);margin-bottom:8px;font-size:13px;font-weight:700}.auc2-feed-empty{color:var(--fg-faint);padding:6px 0;font-size:13px}.auc2-feed-row{border-top:1px solid var(--line);align-items:center;gap:10px;padding:7px 0;font-size:13px;display:flex}.auc2-feed-row:first-of-type{border-top:none}.auc2-feed-who{color:var(--fg);white-space:nowrap;text-overflow:ellipsis;flex:1;font-weight:500;overflow:hidden}.auc2-feed-row.me .auc2-feed-who{color:var(--accent)}.auc2-feed-amt{color:var(--r-l);font-variant-numeric:tabular-nums;font-weight:700}.auc2-feed-time{color:var(--fg-faint);text-align:right;min-width:56px;font-size:11.5px}.auc2-side{gap:var(--s3);flex-direction:column;align-self:start;display:flex;position:sticky;top:0}.auc2-status{text-align:center;border-radius:10px;padding:9px 12px;font-size:13px;font-weight:600}.auc2-status.lead{background:color-mix(in oklab,var(--accent) 16%,transparent);color:var(--accent)}.auc2-status.out{color:#f6867a;background:oklab(69.6076% .138906 .0799126/.16)}.auc2-box{background:var(--elev);border:1px solid var(--line);border-radius:14px;flex-direction:column;gap:10px;padding:14px;display:flex}.auc2-box-lbl{color:var(--fg);justify-content:space-between;align-items:baseline;font-size:13px;display:flex}.auc2-box-lbl span{color:var(--fg-faint);font-size:11.5px}.auc2-quick{grid-template-columns:repeat(4,1fr);gap:6px;display:grid}.auc2-quick button{background:var(--elev2);border:1px solid var(--line);color:var(--fg-soft);cursor:pointer;border-radius:9px;padding:8px 0;font-size:12.5px;font-weight:600;transition:all .12s}.auc2-quick button:hover{color:var(--fg);border-color:var(--line2)}.auc2-cta{width:100%;padding:13px;font-size:15px}.auc2-bal{color:var(--fg-soft);text-align:center;font-size:12px}.auc2-bal.low{color:#f6867a}.auc2-note,.auc2-ended{background:var(--elev);border:1px solid var(--line);color:var(--fg-soft);text-align:center;border-radius:12px;padding:14px;font-size:13.5px}.auc2-live{color:var(--fg-faint);justify-content:center;align-items:center;gap:7px;margin-top:2px;font-size:11.5px;display:flex}.auc2-dot{background:var(--accent);width:7px;height:7px;box-shadow:0 0 0 0 color-mix(in oklab,var(--accent) 60%,transparent);border-radius:50%;animation:1.8s ease-out infinite auc2-live}@keyframes auc2-live{0%{box-shadow:0 0 0 0 color-mix(in oklab,var(--accent) 55%,transparent)}70%{box-shadow:0 0 0 7px #0000}to{box-shadow:0 0 #0000}}@media (width<=760px){.auc2-grid{grid-template-columns:1fr}.auc2-side{position:static}}@media (prefers-reduced-motion:reduce){.auc2-clock[data-u=crit] .auc2-clock-val,.auc2-dot{animation:none}}.wc-wish svg,.wc-star svg,.wc-shiny svg{width:12px;height:12px;display:block}.pager-btn{align-items:center;gap:7px;display:inline-flex}.pager-btn svg{width:15px;height:15px}.wish-btn{justify-content:center;align-items:center;gap:8px;display:inline-flex}.wish-btn svg,.modal-close .x-ico{width:16px;height:16px}.search-clear .x-ico{width:13px;height:13px}";
	initCapture();
	var CORE = /^\/(pulls|collection|global-collection|marketplace)?\/?$/;
	var isCore = () => CORE.test(location.pathname);
	var instance = null;
	var host = null;
	var hideStyle = null;
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
		hideStyle.textContent = "html,body{margin:0;background:#0C0D0C}body>*:not(#wm-host){display:none !important}";
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
	var OFF_KEY = "wm-off";
	var overlayOff = () => {
		try {
			return localStorage.getItem(OFF_KEY) === "1";
		} catch {
			return false;
		}
	};
	var reBtn = null;
	function showReenable() {
		if (reBtn) return;
		reBtn = document.createElement("button");
		reBtn.textContent = "WikiMasters +";
		reBtn.style.cssText = "position:fixed;z-index:2147483600;right:16px;bottom:16px;padding:10px 15px;border-radius:999px;border:1px solid #333833;background:#141613;color:#3CCB8E;font:600 13px/1 system-ui,sans-serif;cursor:pointer;box-shadow:0 10px 28px -14px #000";
		reBtn.onclick = () => {
			try {
				localStorage.removeItem(OFF_KEY);
			} catch {}
			location.reload();
		};
		document.body.appendChild(reBtn);
	}
	function removeReenable() {
		if (reBtn) {
			reBtn.remove();
			reBtn = null;
		}
	}
	function sync() {
		if (overlayOff()) {
			hideOverlay();
			showReenable();
			return;
		}
		removeReenable();
		if (isCore()) showOverlay();
		else hideOverlay();
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
})();
