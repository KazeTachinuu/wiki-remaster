// ==UserScript==
// @name         WikiMasters App
// @namespace    hugo.wikimasters
// @version      0.1.0
// @author       Hugo
// @description  Personal redesigned client for wiki-masters.com. Uses the real API and session.
// @match        https://www.wiki-masters.com/*
// @match        https://wiki-masters.com/*
// @grant        none
// ==/UserScript==

(function() {
	"use strict";
	var s = new Set();
	var _css = async (t) => {
		if (s.has(t)) return;
		s.add(t);
		((c) => {
			if (typeof GM_addStyle === "function") GM_addStyle(c);
			else (document.head || document.documentElement).appendChild(document.createElement("style")).append(c);
		})(t);
	};
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
	var PASSIVE_EVENTS = ["touchstart", "touchmove"];
	function is_passive_event(name) {
		return PASSIVE_EVENTS.includes(name);
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
	var IS_CUSTOM_ELEMENT = Symbol("is custom element");
	var IS_HTML = Symbol("is html");
	var LINK_TAG = IS_XHTML ? "link" : "LINK";
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
	function nCard(c) {
		return {
			id: c.id,
			title: c.wikipedia_title || c.title || "",
			category: c.category || "",
			image_url: c.image_url || null,
			rarity: c.rarity,
			atk: c.atk ?? 0,
			def: c.def ?? 0,
			q_score: c.q_score != null ? Number(c.q_score) : null,
			pageviews: c.pageviews ?? null,
			summary: c.summary || null,
			wikipedia_url: c.wikipedia_url || null
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
	function initCapture() {
		if (!isReal || typeof window === "undefined") return;
		const orig = window.fetch;
		window.fetch = function(...args) {
			const ret = orig.apply(window, args);
			try {
				const url = typeof args[0] === "string" ? args[0] : args[0] && args[0].url;
				if (url && url.includes("/rpc/sync_profile_packs")) ret.then((res) => res.clone().json().then((j) => capturedProfile = j).catch(() => {})).catch(() => {});
			} catch {}
			return ret;
		};
	}
	var MockData = {
		isReal: false,
		canBuy: true,
		canReset: true,
		async profile() {
			const p = await json("/api/profile");
			return {
				username: p.username,
				packs_remaining: p.packs_remaining,
				pack_cap: p.pack_cap,
				currency: p.currency_balance,
				next_regen_seconds: p.next_regen_seconds
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
		async collection() {
			const d = await json("/api/my-collection");
			return {
				items: d.collection.map((it) => ({
					id: it.id,
					card: nCard(it.card),
					count: it.count,
					is_shiny: it.is_shiny,
					starred: it.starred,
					tags: it.tags || []
				})),
				stats: d.stats
			};
		},
		async cards() {
			return { cards: (await json("/api/cards")).cards.map(nCard) };
		},
		buyPack: () => json("/api/buy-pack", { method: "POST" }),
		reset: () => json("/api/reset", { method: "POST" }),
		canAct: true,
		discard: (ucId) => postJson("/api/discard", { user_card_id: ucId }),
		createAuction: (ucId, price, durationMin) => postJson("/api/marketplace", {
			user_card_id: ucId,
			starting_price: price,
			duration_min: durationMin
		}),
		addTag: (ucId, name) => postJson("/api/tags", {
			user_card_id: ucId,
			name
		}),
		removeTag: (ucId, name) => postJson("/api/untag", {
			user_card_id: ucId,
			name
		}),
		async marketStats(card) {
			const base = {
				C: 8,
				PC: 20,
				R: 45,
				SR: 110,
				UR: 260,
				L: 600
			}[card.rarity] || 20;
			const rnd = () => Math.round(base * (.7 + Math.random() * .8));
			const sold = Array.from({ length: 3 + Math.floor(Math.random() * 6) }, rnd);
			const mean = (a) => Math.round(a.reduce((s, x) => s + x, 0) / a.length);
			return {
				soldCount: sold.length,
				soldAvg: mean(sold),
				soldMin: Math.min(...sold),
				soldMax: Math.max(...sold),
				activeCount: 1 + Math.floor(Math.random() * 3),
				lowestAsk: Math.round(base * .9)
			};
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
	var data = isReal ? {
		isReal: true,
		canBuy: false,
		canReset: false,
		async profile() {
			let balance = null;
			try {
				balance = (await json("/api/wikibidous")).balance;
			} catch {}
			const cap = capturedProfile || {};
			return {
				username: cap.username || null,
				packs_remaining: cap.packs_remaining ?? null,
				pack_cap: 10,
				currency: balance ?? cap.wikibidous_balance ?? null,
				next_regen_seconds: null
			};
		},
		async openPack() {
			const d = await json("/api/packs/open", { method: "POST" });
			if (d.error) throw new Error(d.error);
			const cards = d.cards.map((c) => {
				const isNew = !ownedIds.has(c.id);
				ownedIds.add(c.id);
				return {
					...nCard(c),
					is_new: isNew,
					is_shiny: false
				};
			});
			let currency = null;
			try {
				currency = (await json("/api/wikibidous")).balance;
			} catch {}
			return {
				cards,
				packs_remaining: d.packs_remaining,
				currency
			};
		},
		async collection() {
			const items = ((await json("/api/my-collection?sort=rarity&page=0&stats=0")).collection || []).map((it) => ({
				id: it.id,
				card: nCard(it.card),
				count: it.count ?? 1,
				is_shiny: !!it.is_shiny,
				starred: !!it.starred,
				tags: (it.tags || []).map((t) => typeof t === "string" ? t : t.name || t.tag && t.tag.name || "").filter(Boolean)
			}));
			ownedIds = new Set(items.map((it) => it.card.id));
			return {
				items,
				stats: {
					unique: items.length,
					total: items.reduce((n, it) => n + it.count, 0),
					catalog: null,
					counts: countsFrom(items)
				}
			};
		},
		async cards() {
			const d = await json("/api/cards?page=0&sort=rarity");
			return { cards: (d.cards || d.items || []).map(nCard) };
		},
		canAct: true,
		discard: (ucId) => postJson("/api/discard", { user_card_id: ucId }),
		createAuction: (ucId, price, durationMin) => postJson("/api/marketplace", {
			user_card_id: ucId,
			starting_price: price,
			duration_min: durationMin
		}),
		addTag: (ucId, name) => postJson("/api/tags", {
			user_card_id: ucId,
			name
		}),
		removeTag: (ucId, name) => postJson("/api/untag", {
			user_card_id: ucId,
			name
		}),
		async marketStats(card) {
			let auctions = [];
			for (let page = 1; page <= 3; page++) {
				const d = await json(`/api/marketplace?page=${page}&limit=50&q=${encodeURIComponent(card.title)}`);
				const arr = (d.auctions || []).filter((a) => a.card_id === card.id);
				auctions = auctions.concat(arr);
				if (!d.hasMore) break;
			}
			const sold = auctions.filter((a) => a.final_price != null).map((a) => a.final_price);
			const active = auctions.filter((a) => a.status === "active").map((a) => a.effective_bid ?? a.base_amount).filter((x) => x != null);
			const mean = (a) => a.length ? Math.round(a.reduce((s, x) => s + x, 0) / a.length) : null;
			return {
				soldCount: sold.length,
				soldAvg: mean(sold),
				soldMin: sold.length ? Math.min(...sold) : null,
				soldMax: sold.length ? Math.max(...sold) : null,
				activeCount: active.length,
				lowestAsk: active.length ? Math.min(...active) : null
			};
		}
	} : MockData;
	var root_1$5 = from_html(`<img class="wc-blur" alt="" aria-hidden="true" loading="lazy" crossorigin="anonymous"/> <img class="wc-photo" loading="lazy" crossorigin="anonymous"/>`, 1);
	var root_2$5 = from_html(`<span class="wc-shiny" title="Brillante">✦</span>`);
	var root_3$3 = from_html(`<span class="wc-count"> </span>`);
	var root_4$2 = from_html(`<span class="wc-new">Nouveau</span>`);
	var root_5$2 = from_html(`<article><div class="wc-face"><span class="wc-mono" aria-hidden="true"> </span> <!></div> <div class="wc-scrim"></div> <div class="wc-edge"></div> <div class="wc-top"><span class="wc-rtag"> </span> <span class="wc-flags"><!> <!> <!></span></div> <div class="wc-cap"><h3 class="wc-name"> </h3> <div class="wc-cat"> </div> <div class="wc-stats"><span>ATK <b> </b></span> <span>DEF <b> </b></span></div></div></article>`);
	function Card($$anchor, $$props) {
		push($$props, true);
		let count = prop($$props, "count", 3, 1), isNew = prop($$props, "isNew", 3, false), shiny = prop($$props, "shiny", 3, false), big = prop($$props, "big", 3, false), caption = prop($$props, "caption", 3, true);
		const initial = ($$props.card.title || "?").trim().charAt(0).toUpperCase();
		function onImgError(e) {
			const el = e.currentTarget;
			const root = el.closest(".wc");
			if (root) root.classList.add("is-noimg");
			el.remove();
		}
		var article = root_5$2();
		let classes;
		var div = child(article);
		var span = child(div);
		var text = only_child(span, true);
		var node = sibling(span, 2);
		var consequent = ($$anchor) => {
			var fragment = root_1$5();
			var img = first_child(fragment);
			var img_1 = sibling(img, 2);
			template_effect(() => {
				set_attribute(img, "src", $$props.card.image_url);
				set_attribute(img_1, "src", $$props.card.image_url);
				set_attribute(img_1, "alt", $$props.card.title);
			});
			event("error", img_1, onImgError);
			replay_events(img_1);
			append($$anchor, fragment);
		};
		if_block(node, ($$render) => {
			if ($$props.card.image_url) $$render(consequent);
		});
		reset(div);
		var div_1 = sibling(div, 6);
		var span_1 = child(div_1);
		var text_1 = only_child(span_1, true);
		var span_2 = sibling(span_1, 2);
		var node_1 = child(span_2);
		var consequent_1 = ($$anchor) => {
			append($$anchor, root_2$5());
		};
		if_block(node_1, ($$render) => {
			if (shiny()) $$render(consequent_1);
		});
		var node_2 = sibling(node_1, 2);
		var consequent_2 = ($$anchor) => {
			var span_4 = root_3$3();
			var text_2 = only_child(span_4);
			template_effect(() => set_text(text_2, `×${count() ?? ""}`));
			append($$anchor, span_4);
		};
		if_block(node_2, ($$render) => {
			if (count() > 1) $$render(consequent_2);
		});
		var node_3 = sibling(node_2, 2);
		var consequent_3 = ($$anchor) => {
			append($$anchor, root_4$2());
		};
		if_block(node_3, ($$render) => {
			if (isNew()) $$render(consequent_3);
		});
		reset(span_2);
		reset(div_1);
		var div_2 = sibling(div_1, 2);
		var h3 = child(div_2);
		var text_3 = only_child(h3, true);
		var div_3 = sibling(h3, 2);
		var text_4 = only_child(div_3, true);
		var div_4 = sibling(div_3, 2);
		var span_6 = child(div_4);
		var text_5 = only_child(sibling(child(span_6)), true);
		reset(span_6);
		var span_7 = sibling(span_6, 2);
		var text_6 = only_child(sibling(child(span_7)), true);
		reset(span_7);
		reset(div_4);
		reset(div_2);
		reset(article);
		template_effect(($0, $1) => {
			classes = set_class(article, 1, "wc", null, classes, {
				"wc-big": big(),
				bare: !caption(),
				"is-noimg": !$$props.card.image_url
			});
			set_attribute(article, "data-r", $$props.card.rarity);
			set_text(text, initial);
			set_attribute(span_1, "data-r", $$props.card.rarity);
			set_text(text_1, $$props.card.rarity);
			set_text(text_3, $$props.card.title);
			set_text(text_4, $$props.card.category);
			set_text(text_5, $0);
			set_text(text_6, $1);
		}, [() => $$props.card.atk.toLocaleString("fr"), () => $$props.card.def.toLocaleString("fr")]);
		append($$anchor, article);
		pop();
	}
	var root$4 = from_html(`<div class="flip-in"><!></div>`);
	var root_1$4 = from_html(`<span></span>`);
	var root_2$4 = from_html(`<div class="reveal"><div class="count">Carte <b> </b> </div> <div class="stage"><!></div> <div class="dots"></div> <div class="navrow"><button class="arrow" aria-label="Précédent">‹</button> <button class="btn primary"> </button> <button class="arrow" aria-label="Suivant">›</button></div></div>`);
	function Reveal($$anchor, $$props) {
		push($$props, true);
		let i = state(0);
		let last = user_derived(() => get(i) === $$props.cards.length - 1);
		function onKey(e) {
			if (e.key === "ArrowLeft" && get(i) > 0) set(i, get(i) - 1);
			else if (e.key === "ArrowRight" && !get(last)) set(i, get(i) + 1);
			else if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				if (get(last)) $$props.ondone?.();
				else set(i, get(i) + 1);
			}
		}
		var div = root_2$4();
		event("keydown", $window, onKey);
		var div_1 = child(div);
		var b = sibling(child(div_1));
		var text = only_child(b, true);
		var text_1 = sibling(b);
		reset(div_1);
		var div_2 = sibling(div_1, 2);
		key(child(div_2), () => get(i), ($$anchor) => {
			var div_3 = root$4();
			Card(child(div_3), {
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
			reset(div_3);
			append($$anchor, div_3);
		});
		reset(div_2);
		var div_4 = sibling(div_2, 2);
		each(div_4, 21, () => $$props.cards, index, ($$anchor, _, k) => {
			var span = root_1$4();
			let classes;
			template_effect(() => classes = set_class(span, 1, "d", null, classes, {
				on: k === get(i),
				seen: k < get(i)
			}));
			append($$anchor, span);
		});
		reset(div_4);
		var div_5 = sibling(div_4, 2);
		var button = child(div_5);
		var button_1 = sibling(button, 2);
		var text_2 = only_child(button_1, true);
		var button_2 = sibling(button_1, 2);
		reset(div_5);
		reset(div);
		template_effect(() => {
			set_text(text, get(i) + 1);
			set_text(text_1, ` / ${$$props.cards.length ?? ""}`);
			button.disabled = get(i) === 0;
			set_text(text_2, get(last) ? "Terminé" : "Suivant");
			button_2.disabled = get(last);
		});
		delegated("click", button, () => get(i) > 0 && set(i, get(i) - 1));
		delegated("click", button_1, () => get(last) ? $$props.ondone?.() : set(i, get(i) + 1));
		delegated("click", button_2, () => !get(last) && set(i, get(i) + 1));
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	var root$3 = from_html(`<button class="btn">Acheter un paquet (20)</button>`);
	var root_1$3 = from_html(`<div class="timer"> </div>`);
	var root_2$3 = from_html(`<div class="pull-ready"><h1>Paquet du jour</h1> <div class="sub">5 cartes Wikipédia</div> <button aria-label="Ouvrir le paquet"><div class="plate"><div class="mono">W</div><div class="cap">Wiki Masters</div></div></button> <div class="row"><button class="btn primary">Ouvrir le paquet</button> <!></div> <!></div>`);
	function Pulls($$anchor, $$props) {
		push($$props, true);
		let phase = state("ready");
		let cards = state(proxy([]));
		let busy = state(false);
		let error = state("");
		async function open() {
			if (get(busy)) return;
			set(busy, true);
			set(error, "");
			try {
				const d = await data.openPack();
				set(cards, d.cards, true);
				set(phase, "revealing");
				$$props.onchanged?.();
			} catch (e) {
				set(error, "Plus de paquets disponibles pour le moment.");
			}
			set(busy, false);
		}
		async function buy() {
			if (!data.canBuy) return;
			await data.buyPack();
			$$props.onchanged?.();
		}
		function done() {
			set(phase, "ready");
			$$props.onchanged?.();
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
			var div = root_2$3();
			var button = sibling(child(div), 4);
			let classes;
			var div_1 = sibling(button, 2);
			var button_1 = child(div_1);
			var node_1 = sibling(button_1, 2);
			var consequent_1 = ($$anchor) => {
				var button_2 = root$3();
				delegated("click", button_2, buy);
				append($$anchor, button_2);
			};
			if_block(node_1, ($$render) => {
				if (data.canBuy) $$render(consequent_1);
			});
			reset(div_1);
			var node_2 = sibling(div_1, 2);
			var consequent_2 = ($$anchor) => {
				var div_2 = root_1$3();
				var text = only_child(div_2, true);
				template_effect(() => set_text(text, get(error)));
				append($$anchor, div_2);
			};
			var consequent_3 = ($$anchor) => {
				var div_3 = root_1$3();
				var text_1 = only_child(div_3);
				template_effect(() => set_text(text_1, `${$$props.profile.packs_remaining ?? "—" ?? ""} / ${$$props.profile.pack_cap ?? ""} paquets`));
				append($$anchor, div_3);
			};
			if_block(node_2, ($$render) => {
				if (get(error)) $$render(consequent_2);
				else if ($$props.profile) $$render(consequent_3, 1);
			});
			reset(div);
			template_effect(() => {
				classes = set_class(button, 1, "pack", null, classes, { gone: get(busy) });
				button_1.disabled = get(busy) || $$props.profile?.packs_remaining === 0;
			});
			delegated("click", button, open);
			delegated("click", button_1, open);
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
	var root$2 = from_html(`<div class="modal-cat"> </div>`);
	var root_1$2 = from_html(`<p class="modal-sum muted">Chargement du résumé…</p>`);
	var root_2$2 = from_html(`<p class="modal-sum"> </p>`);
	var root_3$2 = from_html(`<div class="cs"><span class="v"> </span><span class="l">Q-Score</span></div>`);
	var root_4$1 = from_html(`<div class="cs"><span class="v"> </span><span class="l">Vues 30j</span></div>`);
	var root_5$1 = from_html(`<span class="tag"> <button aria-label="Retirer">×</button></span>`);
	var root_6$1 = from_html(`<div class="tags"><div class="tags-label">Étiquettes</div> <div class="tags-row"><!> <input class="tag-input" placeholder="Ajouter une étiquette…"/></div></div>`);
	var root_7$1 = from_html(`<a class="modal-wiki" target="_blank" rel="noopener noreferrer">Voir l'article Wikipédia</a>`);
	var root_8$1 = from_html(`<button> </button>`);
	var root_9 = from_html(`<div class="auction"><label class="af-label" for="wm-bid">Mise de départ</label> <input id="wm-bid" class="af-input" type="number" min="1" placeholder="Ex. 50"/> <div class="af-label">Durée</div> <div class="af-durations"></div> <div class="af-actions"><button class="btn">Annuler</button> <button class="btn primary">Lancer l'enchère</button></div></div>`);
	var root_10 = from_html(`<div class="actions"><button class="btn primary">Mettre aux enchères</button> <button class="btn danger">Défausser</button></div>`);
	var root_11 = from_html(`<!> <div class="cstats"><div class="cs" data-k="atk"><span class="v"> </span><span class="l">ATK</span></div> <div class="cs" data-k="def"><span class="v"> </span><span class="l">DEF</span></div> <!> <!> <div class="cs"><span class="v"> <!></span><span class="l">Copies</span></div></div> <!> <!> <!> <div class="modal-credit">Texte de l'article sous licence CC BY-SA 4.0</div>`, 1);
	var root_12 = from_html(`<p class="modal-sum muted">Analyse du marché…</p>`);
	var root_13 = from_html(`<p class="modal-sum muted">Marché indisponible pour le moment.</p>`);
	var root_14 = from_html(`<div class="market-grid"><div class="mstat"><div class="l">Prix moyen</div><div class="v"> </div></div> <div class="mstat"><div class="l">Min</div><div class="v"> </div></div> <div class="mstat"><div class="l">Max</div><div class="v"> </div></div> <div class="mstat"><div class="l">Ventes</div><div class="v"> </div></div></div>`);
	var root_15 = from_html(`<p class="modal-sum muted">Aucune vente enregistrée pour cette carte.</p>`);
	var root_16 = from_html(`<div class="market-active"> <b> </b></div>`);
	var root_17 = from_html(`<!> <!>`, 1);
	var root_18 = from_html(`<div class="modal-msg"> </div>`);
	var root_19 = from_html(`<div class="modal-backdrop" role="presentation"><div class="modal" role="dialog" aria-modal="true"><button class="modal-close" aria-label="Fermer">×</button> <div class="modal-card"><!></div> <div class="modal-info"><span class="modal-rar"> </span> <h2 class="modal-name"> </h2> <!> <div class="modal-tabs"><button>Détails</button> <button>Marché</button></div> <!> <!></div></div></div>`);
	function CardModal($$anchor, $$props) {
		push($$props, true);
		const c = $$props.item.card;
		const RNAME = {
			C: "Commun",
			PC: "Peu commun",
			R: "Rare",
			SR: "Super rare",
			UR: "Ultra rare",
			L: "Légendaire"
		};
		const DURATIONS = [
			[10, "10 min"],
			[30, "30 min"],
			[60, "1 h"],
			[180, "3 h"],
			[360, "6 h"],
			[720, "12 h"]
		];
		let tab = state("details");
		let summary = state(proxy(c.summary || ""));
		let sumState = state(proxy(c.summary ? "done" : "loading"));
		let market = state(null);
		let marketState = state("idle");
		let tags = state(proxy([...$$props.item.tags || []]));
		let newTag = state("");
		let showAuction = state(false);
		let bid = state("");
		let duration = state(60);
		let busy = state(false);
		let msg = state("");
		async function loadSummary() {
			if (c.summary) return;
			try {
				const r = await fetch("https://fr.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(c.title), { headers: { Accept: "application/json" } });
				if (r.ok) set(summary, (await r.json()).extract || "", true);
			} catch {}
			set(sumState, get(summary) ? "done" : "none", true);
		}
		loadSummary();
		async function loadMarket() {
			if (get(marketState) !== "idle") return;
			set(marketState, "loading");
			try {
				set(market, await data.marketStats(c), true);
				set(marketState, "done");
			} catch {
				set(marketState, "error");
			}
		}
		user_effect(() => {
			if (get(tab) === "market") loadMarket();
		});
		async function addTag() {
			const name = get(newTag).trim();
			if (!name || get(tags).includes(name)) {
				set(newTag, "");
				return;
			}
			set(tags, [...get(tags), name], true);
			set(newTag, "");
			try {
				await data.addTag($$props.item.id, name);
			} catch {
				set(msg, "Étiquette non enregistrée.");
			}
		}
		async function removeTag(name) {
			set(tags, get(tags).filter((t) => t !== name), true);
			try {
				await data.removeTag($$props.item.id, name);
			} catch {}
		}
		async function launchAuction() {
			const price = Number(get(bid));
			if (!(price > 0)) {
				set(msg, "Entrez une mise de départ valide.");
				return;
			}
			set(busy, true);
			set(msg, "");
			try {
				await data.createAuction($$props.item.id, price, get(duration));
				$$props.onaction?.();
				$$props.onclose?.();
			} catch {
				set(msg, "L'enchère a échoué.");
				set(busy, false);
			}
		}
		async function discard() {
			set(busy, true);
			set(msg, "");
			try {
				await data.discard($$props.item.id);
				$$props.onaction?.();
				$$props.onclose?.();
			} catch {
				set(msg, "La défausse a échoué.");
				set(busy, false);
			}
		}
		function onKey(e) {
			if (e.key === "Escape") $$props.onclose?.();
		}
		const nf = (n) => n == null ? "—" : n.toLocaleString("fr");
		user_effect(() => {
			const html = document.documentElement;
			const prev = html.style.overflow;
			html.style.overflow = "hidden";
			return () => {
				html.style.overflow = prev;
			};
		});
		var div = root_19();
		event("keydown", $window, onKey);
		var div_1 = child(div);
		var button = child(div_1);
		var div_2 = sibling(button, 2);
		Card(child(div_2), {
			get card() {
				return c;
			},
			big: true,
			caption: false,
			get count() {
				return $$props.item.count;
			},
			get shiny() {
				return $$props.item.is_shiny;
			}
		});
		reset(div_2);
		var div_3 = sibling(div_2, 2);
		var span = child(div_3);
		var text$1 = only_child(span, true);
		var h2 = sibling(span, 2);
		var text_1 = only_child(h2, true);
		var node_1 = sibling(h2, 2);
		var consequent = ($$anchor) => {
			var div_4 = root$2();
			var text_2 = only_child(div_4, true);
			template_effect(() => set_text(text_2, c.category));
			append($$anchor, div_4);
		};
		if_block(node_1, ($$render) => {
			if (c.category) $$render(consequent);
		});
		var div_5 = sibling(node_1, 2);
		var button_1 = child(div_5);
		let classes;
		var button_2 = sibling(button_1, 2);
		let classes_1;
		reset(div_5);
		var node_2 = sibling(div_5, 2);
		var consequent_10 = ($$anchor) => {
			var fragment = root_11();
			var node_3 = first_child(fragment);
			var consequent_1 = ($$anchor) => {
				append($$anchor, root_1$2());
			};
			var consequent_2 = ($$anchor) => {
				var p_1 = root_2$2();
				var text_3 = only_child(p_1, true);
				template_effect(() => set_text(text_3, get(summary)));
				append($$anchor, p_1);
			};
			if_block(node_3, ($$render) => {
				if (get(sumState) === "loading") $$render(consequent_1);
				else if (get(summary)) $$render(consequent_2, 1);
			});
			var div_6 = sibling(node_3, 2);
			var div_7 = child(div_6);
			var text_4 = only_child(child(div_7), true);
			next();
			reset(div_7);
			var div_8 = sibling(div_7, 2);
			var text_5 = only_child(child(div_8), true);
			next();
			reset(div_8);
			var node_4 = sibling(div_8, 2);
			var consequent_3 = ($$anchor) => {
				var div_9 = root_3$2();
				var text_6 = only_child(child(div_9), true);
				next();
				reset(div_9);
				template_effect(() => set_text(text_6, c.q_score));
				append($$anchor, div_9);
			};
			if_block(node_4, ($$render) => {
				if (c.q_score != null) $$render(consequent_3);
			});
			var node_5 = sibling(node_4, 2);
			var consequent_4 = ($$anchor) => {
				var div_10 = root_4$1();
				var text_7 = only_child(child(div_10), true);
				next();
				reset(div_10);
				template_effect(($0) => set_text(text_7, $0), [() => nf(c.pageviews)]);
				append($$anchor, div_10);
			};
			if_block(node_5, ($$render) => {
				if (c.pageviews != null) $$render(consequent_4);
			});
			var div_11 = sibling(node_5, 2);
			var span_5 = child(div_11);
			var text_8 = child(span_5, true);
			var node_6 = sibling(text_8);
			var consequent_5 = ($$anchor) => {
				append($$anchor, text("✦"));
			};
			if_block(node_6, ($$render) => {
				if ($$props.item.is_shiny) $$render(consequent_5);
			});
			reset(span_5);
			next();
			reset(div_11);
			reset(div_6);
			var node_7 = sibling(div_6, 2);
			var consequent_6 = ($$anchor) => {
				var div_12 = root_6$1();
				var div_13 = sibling(child(div_12), 2);
				var node_8 = child(div_13);
				each(node_8, 17, () => get(tags), index, ($$anchor, t) => {
					var span_6 = root_5$1();
					var text_10 = child(span_6, true);
					var button_3 = sibling(text_10);
					reset(span_6);
					template_effect(() => set_text(text_10, get(t)));
					delegated("click", button_3, () => removeTag(get(t)));
					append($$anchor, span_6);
				});
				var input = sibling(node_8, 2);
				remove_input_defaults(input);
				reset(div_13);
				reset(div_12);
				delegated("keydown", input, (e) => e.key === "Enter" && addTag());
				bind_value(input, () => get(newTag), ($$value) => set(newTag, $$value));
				append($$anchor, div_12);
			};
			if_block(node_7, ($$render) => {
				if (data.canAct) $$render(consequent_6);
			});
			var node_9 = sibling(node_7, 2);
			var consequent_7 = ($$anchor) => {
				var a = root_7$1();
				template_effect(() => set_attribute(a, "href", c.wikipedia_url));
				append($$anchor, a);
			};
			if_block(node_9, ($$render) => {
				if (c.wikipedia_url) $$render(consequent_7);
			});
			var node_10 = sibling(node_9, 2);
			var consequent_9 = ($$anchor) => {
				var fragment_1 = comment();
				var node_11 = first_child(fragment_1);
				var consequent_8 = ($$anchor) => {
					var div_14 = root_9();
					var input_1 = sibling(child(div_14), 2);
					remove_input_defaults(input_1);
					var div_15 = sibling(input_1, 4);
					each(div_15, 21, () => DURATIONS, index, ($$anchor, $$item) => {
						var $$array = user_derived(() => to_array(get($$item), 2));
						let m = () => get($$array)[0];
						let lbl = () => get($$array)[1];
						var button_4 = root_8$1();
						let classes_2;
						var text_11 = only_child(button_4, true);
						template_effect(() => {
							classes_2 = set_class(button_4, 1, "", null, classes_2, { on: get(duration) === m() });
							set_text(text_11, lbl());
						});
						delegated("click", button_4, () => set(duration, m(), true));
						append($$anchor, button_4);
					});
					reset(div_15);
					var div_16 = sibling(div_15, 2);
					var button_5 = child(div_16);
					var button_6 = sibling(button_5, 2);
					reset(div_16);
					reset(div_14);
					template_effect(() => button_6.disabled = get(busy));
					bind_value(input_1, () => get(bid), ($$value) => set(bid, $$value));
					delegated("click", button_5, () => set(showAuction, false));
					delegated("click", button_6, launchAuction);
					append($$anchor, div_14);
				};
				var alternate = ($$anchor) => {
					var div_17 = root_10();
					var button_7 = child(div_17);
					var button_8 = sibling(button_7, 2);
					reset(div_17);
					template_effect(() => button_8.disabled = get(busy));
					delegated("click", button_7, () => set(showAuction, true));
					delegated("click", button_8, discard);
					append($$anchor, div_17);
				};
				if_block(node_11, ($$render) => {
					if (get(showAuction)) $$render(consequent_8);
					else $$render(alternate, -1);
				});
				append($$anchor, fragment_1);
			};
			if_block(node_10, ($$render) => {
				if (data.canAct) $$render(consequent_9);
			});
			next(2);
			template_effect(($0, $1) => {
				set_text(text_4, $0);
				set_text(text_5, $1);
				set_text(text_8, $$props.item.count);
			}, [() => nf(c.atk), () => nf(c.def)]);
			append($$anchor, fragment);
		};
		var alternate_2 = ($$anchor) => {
			var fragment_2 = comment();
			var node_12 = first_child(fragment_2);
			var consequent_11 = ($$anchor) => {
				append($$anchor, root_12());
			};
			var consequent_12 = ($$anchor) => {
				append($$anchor, root_13());
			};
			var consequent_15 = ($$anchor) => {
				var fragment_3 = root_17();
				var node_13 = first_child(fragment_3);
				var consequent_13 = ($$anchor) => {
					var div_18 = root_14();
					var div_19 = child(div_18);
					var text_12 = only_child(sibling(child(div_19)), true);
					reset(div_19);
					var div_21 = sibling(div_19, 2);
					var text_13 = only_child(sibling(child(div_21)), true);
					reset(div_21);
					var div_23 = sibling(div_21, 2);
					var text_14 = only_child(sibling(child(div_23)), true);
					reset(div_23);
					var div_25 = sibling(div_23, 2);
					var text_15 = only_child(sibling(child(div_25)), true);
					reset(div_25);
					reset(div_18);
					template_effect(($0, $1, $2) => {
						set_text(text_12, $0);
						set_text(text_13, $1);
						set_text(text_14, $2);
						set_text(text_15, get(market).soldCount);
					}, [
						() => nf(get(market).soldAvg),
						() => nf(get(market).soldMin),
						() => nf(get(market).soldMax)
					]);
					append($$anchor, div_18);
				};
				var alternate_1 = ($$anchor) => {
					append($$anchor, root_15());
				};
				if_block(node_13, ($$render) => {
					if (get(market).soldCount) $$render(consequent_13);
					else $$render(alternate_1, -1);
				});
				var node_14 = sibling(node_13, 2);
				var consequent_14 = ($$anchor) => {
					var div_27 = root_16();
					var text_16 = child(div_27);
					var text_17 = only_child(sibling(text_16), true);
					reset(div_27);
					template_effect(($0) => {
						set_text(text_16, `${get(market).activeCount ?? ""} en vente · dès `);
						set_text(text_17, $0);
					}, [() => nf(get(market).lowestAsk)]);
					append($$anchor, div_27);
				};
				if_block(node_14, ($$render) => {
					if (get(market).activeCount) $$render(consequent_14);
				});
				append($$anchor, fragment_3);
			};
			if_block(node_12, ($$render) => {
				if (get(marketState) === "loading") $$render(consequent_11);
				else if (get(marketState) === "error") $$render(consequent_12, 1);
				else if (get(market)) $$render(consequent_15, 2);
			});
			append($$anchor, fragment_2);
		};
		if_block(node_2, ($$render) => {
			if (get(tab) === "details") $$render(consequent_10);
			else $$render(alternate_2, -1);
		});
		var node_15 = sibling(node_2, 2);
		var consequent_16 = ($$anchor) => {
			var div_28 = root_18();
			var text_18 = only_child(div_28, true);
			template_effect(() => set_text(text_18, get(msg)));
			append($$anchor, div_28);
		};
		if_block(node_15, ($$render) => {
			if (get(msg)) $$render(consequent_16);
		});
		reset(div_3);
		reset(div_1);
		reset(div);
		template_effect(() => {
			set_attribute(span, "data-r", c.rarity);
			set_text(text$1, RNAME[c.rarity] || c.rarity);
			set_text(text_1, c.title);
			classes = set_class(button_1, 1, "", null, classes, { on: get(tab) === "details" });
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
	delegate(["click", "keydown"]);
	var root$1 = from_html(`<div class="empty"><b> </b><div>Vérifiez que vous êtes connecté, puis réessayez.</div><button class="btn">Réessayer</button></div>`);
	var root_1$1 = from_html(`<div class="wc skeleton"></div>`);
	var root_2$1 = from_html(`<div class="grid"></div>`);
	var root_3$1 = from_html(`<span class="sw"></span>`);
	var root_4 = from_html(`<button><!> </button>`);
	var root_5 = from_html(`<div class="empty"><b> </b> <div> </div></div>`);
	var root_6 = from_html(`<button class="card-btn"><!></button>`);
	var root_7 = from_html(`<div class="coll-head"><div><h1>Ma collection</h1> <div class="meta"> </div></div> <div class="coll-tools"><input class="search" type="search" placeholder="Rechercher une carte…"/> <select class="select" aria-label="Trier"><option>Rareté</option><option>Attaque</option><option>Défense</option><option>Nom</option></select></div></div> <div class="filters"></div> <!>`, 1);
	var root_8 = from_html(`<!> <!>`, 1);
	function Collection($$anchor, $$props) {
		push($$props, true);
		let items = state(null);
		let stats = state(null);
		let error = state("");
		let filter = state("ALL");
		let search = state("");
		let sort = state("rarity");
		let selected = state(null);
		const order = [
			"ALL",
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
				const d = await data.collection();
				set(items, d.items, true);
				set(stats, d.stats, true);
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
		let shown = user_derived(() => {
			if (!get(items)) return [];
			const q = get(search).trim().toLowerCase();
			let list = get(items).filter((it) => {
				if (get(filter) !== "ALL" && it.card.rarity !== get(filter)) return false;
				if (q && !`${it.card.title} ${it.card.category}`.toLowerCase().includes(q)) return false;
				return true;
			});
			const cmp = {
				rarity: (a, b) => RANK[b.card.rarity] - RANK[a.card.rarity] || b.count - a.count,
				atk: (a, b) => b.card.atk - a.card.atk,
				def: (a, b) => b.card.def - a.card.def,
				name: (a, b) => a.card.title.localeCompare(b.card.title, "fr")
			}[get(sort)];
			return cmp ? [...list].sort(cmp) : list;
		});
		var fragment = root_8();
		var node = first_child(fragment);
		var consequent = ($$anchor) => {
			var div = root$1();
			var b_1 = child(div);
			var text = only_child(b_1, true);
			var button = sibling(b_1, 2);
			reset(div);
			template_effect(() => set_text(text, get(error)));
			delegated("click", button, load);
			append($$anchor, div);
		};
		var consequent_1 = ($$anchor) => {
			var div_1 = root_2$1();
			each(div_1, 20, () => Array(10), index, ($$anchor, _) => {
				append($$anchor, root_1$1());
			});
			reset(div_1);
			append($$anchor, div_1);
		};
		var alternate_1 = ($$anchor) => {
			var fragment_1 = root_7();
			var div_3 = first_child(fragment_1);
			var div_4 = child(div_3);
			var text_1 = only_child(sibling(child(div_4), 2));
			reset(div_4);
			var div_6 = sibling(div_4, 2);
			var input = child(div_6);
			remove_input_defaults(input);
			var select = sibling(input, 2);
			var option = child(select);
			option.value = option.__value = "rarity";
			var option_1 = sibling(option);
			option_1.value = option_1.__value = "atk";
			var option_2 = sibling(option_1);
			option_2.value = option_2.__value = "def";
			var option_3 = sibling(option_2);
			option_3.value = option_3.__value = "name";
			reset(select);
			init_select(select);
			reset(div_6);
			reset(div_3);
			var div_7 = sibling(div_3, 2);
			each(div_7, 21, () => order, index, ($$anchor, r) => {
				var button_1 = root_4();
				let classes;
				var node_1 = child(button_1);
				var consequent_2 = ($$anchor) => {
					var span = root_3$1();
					template_effect(($0) => set_style(span, `background:var(--r-${$0 ?? ""})`), [() => get(r).toLowerCase()]);
					append($$anchor, span);
				};
				if_block(node_1, ($$render) => {
					if (get(r) !== "ALL") $$render(consequent_2);
				});
				var text_2 = sibling(node_1);
				reset(button_1);
				template_effect(() => {
					classes = set_class(button_1, 1, "", null, classes, { on: get(filter) === get(r) });
					set_text(text_2, ` ${(get(r) === "ALL" ? "Tous" : get(r)) ?? ""} (${(get(r) === "ALL" ? get(stats).unique : get(stats).counts[get(r)] || 0) ?? ""})`);
				});
				delegated("click", button_1, () => set(filter, get(r), true));
				append($$anchor, button_1);
			});
			reset(div_7);
			var node_2 = sibling(div_7, 2);
			var consequent_3 = ($$anchor) => {
				var div_8 = root_5();
				var b_2 = child(div_8);
				var text_3 = only_child(b_2, true);
				var text_4 = only_child(sibling(b_2, 2), true);
				reset(div_8);
				template_effect(() => {
					set_text(text_3, get(search) || get(filter) !== "ALL" ? "Aucune carte ne correspond" : "Rien ici pour l'instant");
					set_text(text_4, get(search) || get(filter) !== "ALL" ? "Essayez un autre filtre ou une autre recherche." : "Ouvrez un paquet pour commencer votre collection.");
				});
				append($$anchor, div_8);
			};
			var alternate = ($$anchor) => {
				var div_10 = root_2$1();
				each(div_10, 21, () => get(shown), (it) => it.card.id, ($$anchor, it) => {
					var button_2 = root_6();
					Card(child(button_2), {
						get card() {
							return get(it).card;
						},
						get count() {
							return get(it).count;
						},
						get shiny() {
							return get(it).is_shiny;
						}
					});
					reset(button_2);
					template_effect(() => set_attribute(button_2, "aria-label", get(it).card.title));
					delegated("click", button_2, () => set(selected, get(it), true));
					append($$anchor, button_2);
				});
				reset(div_10);
				append($$anchor, div_10);
			};
			if_block(node_2, ($$render) => {
				if (get(shown).length === 0) $$render(consequent_3);
				else $$render(alternate, -1);
			});
			template_effect(() => set_text(text_1, `${get(stats).unique ?? ""} cartes uniques${get(stats).catalog ? ` sur ${get(stats).catalog}` : ""} · ${get(stats).total ?? ""} au total`));
			bind_value(input, () => get(search), ($$value) => set(search, $$value));
			bind_select_value(select, () => get(sort), ($$value) => set(sort, $$value));
			append($$anchor, fragment_1);
		};
		if_block(node, ($$render) => {
			if (get(error)) $$render(consequent);
			else if (!get(items)) $$render(consequent_1, 1);
			else $$render(alternate_1, -1);
		});
		var node_4 = sibling(node, 2);
		var consequent_4 = ($$anchor) => {
			CardModal($$anchor, {
				get item() {
					return get(selected);
				},
				onclose: () => set(selected, null),
				onaction: () => {
					set(selected, null);
					load();
					$$props.onwallet?.();
				}
			});
		};
		if_block(node_4, ($$render) => {
			if (get(selected)) $$render(consequent_4);
		});
		append($$anchor, fragment);
		pop();
	}
	delegate(["click"]);
	var root = from_html(`<a class="nav-ext"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8"></circle></svg> </a>`);
	var root_1 = from_html(`<div class="nav-sep">Le reste du site</div> <!>`, 1);
	var root_2 = from_html(`<button class="ghost">Réinitialiser</button>`);
	var root_3 = from_html(`<div class="app"><aside class="side"><div class="brand"><span class="mk"></span><b>WikiMasters</b></div> <nav class="nav"><a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M3 9h18"></path></svg> Ouvrir des paquets</a> <a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M8 7h8M8 11h8M8 15h5"></path></svg> Ma collection</a> <!></nav> <div class="side-foot"><!> <div class="hintline"> </div></div></aside> <main class="main"><header class="topbar"><div class="crumb"> </div> <div class="wallet"><span class="chip"><i class="pk"></i><b> </b> </span> <span class="chip"><i class="coin"></i><b> </b></span></div></header> <section class="view"><!></section></main></div>`);
	function App($$anchor, $$props) {
		push($$props, true);
		const viewFromPath = () => location.pathname.includes("collection") ? "collection" : "pulls";
		let view = state(proxy(viewFromPath()));
		let profile = state(null);
		let collKey = state(0);
		if (typeof window !== "undefined") window.addEventListener("wm:route", () => set(view, viewFromPath(), true));
		async function loadProfile() {
			try {
				set(profile, await data.profile(), true);
			} catch {
				set(profile, null);
			}
		}
		loadProfile();
		if (data.isReal) setTimeout(loadProfile, 1500);
		function goCore(v) {
			set(view, v, true);
			const p = v === "collection" ? "/collection" : "/pulls";
			if (location.pathname !== p) history.pushState({}, "", p);
		}
		function onchanged() {
			loadProfile();
			set(collKey, get(collKey) + 1);
		}
		async function reset$1() {
			if (!data.canReset) return;
			await data.reset();
			onchanged();
			goCore("pulls");
		}
		const others = [
			["/trades", "Échanges"],
			["/marketplace", "Marché"],
			["/battle", "Duels"],
			["/global-collection", "Toutes les cartes"],
			["/guild", "Guilde"],
			["/friends", "Amis"],
			["/dms", "Messages"],
			["/leaderboard", "Classement"],
			["/achievements", "Succès"],
			["/profile", "Profil"],
			["/settings", "Paramètres"]
		];
		var div = root_3();
		var aside = child(div);
		var nav = sibling(child(aside), 2);
		var a = child(nav);
		let classes;
		var a_1 = sibling(a, 2);
		let classes_1;
		var node = sibling(a_1, 2);
		var consequent = ($$anchor) => {
			var fragment = root_1();
			each(sibling(first_child(fragment), 2), 17, () => others, index, ($$anchor, $$item) => {
				var $$array = user_derived(() => to_array(get($$item), 2));
				let href = () => get($$array)[0];
				let label = () => get($$array)[1];
				var a_2 = root();
				var text = sibling(child(a_2));
				reset(a_2);
				template_effect(() => {
					set_attribute(a_2, "href", href());
					set_text(text, ` ${label() ?? ""}`);
				});
				append($$anchor, a_2);
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
			var button = root_2();
			delegated("click", button, reset$1);
			append($$anchor, button);
		};
		if_block(node_2, ($$render) => {
			if (data.canReset) $$render(consequent_1);
		});
		var text_1 = only_child(sibling(node_2, 2), true);
		reset(div_1);
		reset(aside);
		var main = sibling(aside, 2);
		var header = child(main);
		var div_3 = child(header);
		var text_2 = only_child(div_3, true);
		var div_4 = sibling(div_3, 2);
		var span = child(div_4);
		var b = sibling(child(span));
		var text_3 = only_child(b, true);
		var text_4 = sibling(b);
		reset(span);
		var span_1 = sibling(span, 2);
		var text_5 = only_child(sibling(child(span_1)), true);
		reset(span_1);
		reset(div_4);
		reset(header);
		var section = sibling(header, 2);
		var node_3 = child(section);
		var consequent_2 = ($$anchor) => {
			Pulls($$anchor, {
				get profile() {
					return get(profile);
				},
				onchanged
			});
		};
		var alternate = ($$anchor) => {
			var fragment_2 = comment();
			key(first_child(fragment_2), () => get(collKey), ($$anchor) => {
				Collection($$anchor, { onwallet: loadProfile });
			});
			append($$anchor, fragment_2);
		};
		if_block(node_3, ($$render) => {
			if (get(view) === "pulls") $$render(consequent_2);
			else $$render(alternate, -1);
		});
		reset(section);
		reset(main);
		reset(div);
		template_effect(() => {
			classes = set_class(a, 1, "", null, classes, { on: get(view) === "pulls" });
			classes_1 = set_class(a_1, 1, "", null, classes_1, { on: get(view) === "collection" });
			set_text(text_1, data.isReal ? "Connecté à WikiMasters" : "Serveur de test local");
			set_text(text_2, get(view) === "pulls" ? "Ouvrir des paquets" : "Ma collection");
			set_text(text_3, get(profile)?.packs_remaining ?? "—");
			set_text(text_4, `/${get(profile)?.pack_cap ?? 10 ?? ""}`);
			set_text(text_5, get(profile)?.currency ?? "—");
		});
		delegated("click", a, () => goCore("pulls"));
		delegated("click", a_1, () => goCore("collection"));
		append($$anchor, div);
		pop();
	}
	delegate(["click"]);
	_css(":root{--bg:#0c0d0c;--surface:#141613;--elev:#191c18;--elev2:#20241f;--line:#262a26;--line2:#333833;--fg:#eceee9;--fg-soft:#98a29a;--fg-faint:#636a61;--accent:#3ccb8e;--accent-ink:#07130e;--r-c:#7fd8b4;--r-pc:#7fb0e6;--r-r:#b18fe0;--r-sr:#e46f9f;--r-ur:#f0912f;--r-l:#e8c93a;--display:\"Outfit\",system-ui,sans-serif;--body:\"Inter\",system-ui,sans-serif;--s1:4px;--s2:8px;--s3:12px;--s4:16px;--s5:24px;--s6:32px;--s7:48px;--s8:64px;--radius:14px;--radius-lg:18px;--sidebar:268px}:where(#wm-app-root,#wm-app-root *){box-sizing:border-box;margin:0;padding:0}#wm-app-root{font-family:var(--body);color:var(--fg);-webkit-font-smoothing:antialiased;line-height:1.5}#wm-app-root button{cursor:pointer;font-family:inherit}#wm-app-root img{display:block}#wm-app-root a{color:inherit;text-decoration:none}.app{grid-template-columns:var(--sidebar) 1fr;background:var(--bg);min-height:100vh;display:grid}.side{background:var(--surface);border-right:1px solid var(--line);padding:var(--s6) var(--s5);gap:var(--s6);flex-direction:column;height:100vh;display:flex;position:sticky;top:0}.brand{padding:0 var(--s3);align-items:center;gap:10px;display:flex}.brand .mk{background:var(--accent);border-radius:3px;width:9px;height:9px}.brand b{font-family:var(--display);letter-spacing:-.01em;font-size:19px;font-weight:700}.nav{gap:var(--s1);flex-direction:column;flex:1;min-height:0;display:flex;overflow-y:auto}.nav-sep{letter-spacing:.12em;text-transform:uppercase;color:var(--fg-faint);padding:16px 14px 6px;font-size:10px}.nav a.nav-ext svg{opacity:.45;width:16px;height:16px}.nav a.nav-ext{font-weight:400}.nav a{align-items:center;gap:var(--s3);color:var(--fg-soft);cursor:pointer;border-radius:12px;padding:12px 14px;font-size:14px;font-weight:500;transition:background .15s,color .15s;display:flex}.nav a svg{opacity:.85;flex:none;width:19px;height:19px}.nav a:hover{background:var(--elev);color:var(--fg)}.nav a.on{background:color-mix(in oklab,var(--accent) 12%,transparent);color:var(--accent);font-weight:600}.nav a.on svg{opacity:1}.side-foot{gap:var(--s3);flex-direction:column;margin-top:auto;display:flex}.ghost{border:1px solid var(--line2);color:var(--fg-soft);background:0 0;border-radius:11px;padding:11px;font-size:13px;font-weight:500;transition:all .15s}.ghost:hover{border-color:var(--fg-soft);color:var(--fg)}.hintline{color:var(--fg-faint);text-align:center;font-size:11.5px}.main{flex-direction:column;min-width:0;display:flex}.topbar{justify-content:space-between;align-items:center;gap:var(--s4);padding:var(--s5) clamp(var(--s5),4vw,var(--s7));border-bottom:1px solid var(--line);z-index:5;background:color-mix(in oklab,var(--bg) 86%,transparent);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);display:flex;position:sticky;top:0}.crumb{font-family:var(--display);letter-spacing:-.01em;font-size:16px;font-weight:600}.wallet{gap:var(--s2);display:flex}.chip{color:var(--fg-soft);background:var(--elev);border:1px solid var(--line);border-radius:999px;align-items:center;gap:8px;padding:9px 15px;font-size:13.5px;display:flex}.chip b{color:var(--fg);font-weight:600}.chip i{border-radius:3px;width:12px;height:12px;display:block}.chip i.pk{background:var(--accent)}.chip i.coin{background:var(--r-l);border-radius:50%}.view{padding:clamp(var(--s5),3.5vw,var(--s7));width:100%;max-width:1340px;margin:0 auto}.pull-ready{justify-content:center;align-items:center;gap:var(--s5);text-align:center;flex-direction:column;min-height:64vh;display:flex}.pull-ready h1{font-family:var(--display);letter-spacing:-.02em;font-size:clamp(26px,3vw,36px);font-weight:700}.pull-ready .sub{color:var(--fg-soft);margin-top:calc(-1 * var(--s3));font-size:15px}.pack{aspect-ratio:5/7;border-radius:var(--radius-lg);background:var(--elev);border:1px solid var(--line2);width:clamp(200px,22vw,256px);margin:var(--s2) 0;justify-content:center;align-items:center;transition:transform .25s cubic-bezier(.2,.7,.3,1),border-color .25s,opacity .4s;display:flex;position:relative}.pack:hover{border-color:var(--accent);transform:translateY(-6px)}.pack .plate{border:1px solid var(--line);justify-content:center;align-items:center;gap:var(--s4);border-radius:12px;flex-direction:column;display:flex;position:absolute;inset:14px}.pack .mono{border:1.5px solid var(--fg-faint);width:62px;height:62px;font-family:var(--display);color:var(--fg-soft);border-radius:50%;justify-content:center;align-items:center;font-size:26px;font-weight:700;display:flex}.pack .cap{letter-spacing:.16em;color:var(--fg-faint);text-transform:uppercase;font-size:11px}.pack.gone{opacity:0;transform:translateY(-8px)scale(.96)}.row{gap:var(--s3);flex-wrap:wrap;justify-content:center;align-items:center;display:flex}.btn{font-family:var(--display);border:1px solid var(--line2);color:var(--fg);background:0 0;border-radius:12px;padding:13px 28px;font-size:15px;font-weight:600;transition:all .15s}.btn:hover{border-color:var(--fg-soft)}.btn.primary{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}.btn.primary:hover{filter:brightness(1.06)}.btn:disabled{opacity:.45;cursor:not-allowed}.timer{color:var(--fg-faint);font-size:13px}.reveal{justify-content:center;align-items:center;gap:var(--s6);flex-direction:column;min-height:64vh;display:flex}.reveal .count{color:var(--fg-soft);font-size:14px}.reveal .count b{color:var(--accent);font-family:var(--display);margin:0 3px;font-size:18px}.stage{width:clamp(280px,32vw,340px)}.dots{gap:var(--s2);align-items:center;display:flex}.dots .d{background:var(--line2);border-radius:50%;width:8px;height:8px;transition:all .2s}.dots .d.on{background:var(--accent);transform:scale(1.15)}.dots .d.seen{background:var(--fg-faint)}.navrow{align-items:center;gap:var(--s5);display:flex}.arrow{border:1px solid var(--line2);background:var(--elev);width:46px;height:46px;color:var(--fg);border-radius:50%;justify-content:center;align-items:center;font-size:20px;transition:all .15s;display:flex}.arrow:hover{border-color:var(--fg-soft)}.arrow:disabled{opacity:.3;cursor:not-allowed}.flip-in{animation:.5s cubic-bezier(.3,.8,.3,1) flipin}@keyframes flipin{0%{opacity:0;transform:rotateY(-14deg)translateY(14px)}to{opacity:1;transform:none}}.wc{aspect-ratio:5/7;border-radius:var(--radius-lg);border:1px solid var(--line);cursor:pointer;background:#0f110e;transition:transform .2s cubic-bezier(.2,.7,.3,1),border-color .2s,box-shadow .2s;position:relative;overflow:hidden}.wc[data-r=C]{--rc:var(--r-c)}.wc[data-r=PC]{--rc:var(--r-pc)}.wc[data-r=R]{--rc:var(--r-r)}.wc[data-r=SR]{--rc:var(--r-sr)}.wc[data-r=UR]{--rc:var(--r-ur)}.wc[data-r=L]{--rc:var(--r-l)}.wc:hover{border-color:color-mix(in oklab,var(--rc) 50%,var(--line2));transform:translateY(-5px);box-shadow:0 20px 38px -24px #000}.wc-face{background:linear-gradient(#181c16,#0d0f0c);position:absolute;inset:0}.wc-blur{object-fit:cover;filter:blur(22px)saturate(1.1)brightness(.5);z-index:0;width:100%;height:100%;position:absolute;inset:0;transform:scale(1.2)}.wc.is-noimg .wc-blur{display:none}.wc-photo{object-fit:contain;z-index:1;width:100%;height:100%;position:absolute;inset:0}.wc-mono{font-family:var(--display);color:#ffffff12;letter-spacing:-.02em;justify-content:center;align-items:center;font-size:78px;font-weight:800;line-height:1;display:flex;position:absolute;inset:0 0 22%}.wc.is-noimg .wc-face{background:radial-gradient(135% 78% at 50% 14%, color-mix(in oklab,var(--rc) 18%, transparent), transparent 58%),linear-gradient(180deg,#171b15,#0c0e0b)}.wc-scrim{pointer-events:none;background:linear-gradient(#0000 20%,#05060533 32%,#050605b3 50%,#050605fb 68%,#050605 100%);position:absolute;inset:0}.wc.bare .wc-cap,.wc.bare .wc-scrim{display:none}.wc-edge{background:var(--rc);z-index:3;height:3px;position:absolute;bottom:0;left:0;right:0}.wc-top{z-index:3;justify-content:space-between;align-items:flex-start;gap:6px;display:flex;position:absolute;top:11px;left:11px;right:11px}.wc-rtag{font-family:var(--display);color:#08130e;background:var(--rc);border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700;box-shadow:0 1px 5px #0006}.wc-flags{align-items:center;gap:5px;display:flex}.wc-count{color:#fff;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);background:#0000008c;border:1px solid #ffffff2e;border-radius:6px;padding:2px 7px;font-size:10.5px;font-weight:600}.wc-new{background:var(--accent);color:var(--accent-ink);border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700}.wc-shiny{border:1px solid var(--r-l);color:var(--r-l);background:#0000008c;border-radius:6px;padding:1px 7px;font-size:11px;font-weight:700}.wc-cap{z-index:3;gap:var(--s1);background:linear-gradient(#0000,#0506058c 28%,#050605eb);flex-direction:column;padding:14px 14px 16px;display:flex;position:absolute;bottom:0;left:0;right:0}.wc.bare .wc-cap{background:0 0}.wc-name{font-family:var(--display);color:#fff;text-shadow:0 1px 10px #000000a6;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:15px;font-weight:700;line-height:1.18;display:-webkit-box;overflow:hidden}.wc-cat{color:#ffffffd1;white-space:nowrap;text-overflow:ellipsis;text-shadow:0 1px 6px #000000b3;font-size:10.5px;line-height:1.3;overflow:hidden}.wc-stats{color:#ffffffd9;letter-spacing:.02em;text-shadow:0 1px 6px #000000b3;border-top:1px solid #ffffff38;justify-content:space-between;margin-top:9px;padding-top:9px;font-size:11px;display:flex}.wc-stats b{color:#fff;font-variant-numeric:tabular-nums;font-weight:700}.wc-big .wc-name{font-size:22px}.wc-big .wc-cat{white-space:normal;font-size:13px}.wc-big .wc-stats{margin-top:12px;padding-top:12px;font-size:14px}.wc-big .wc-mono{font-size:132px}.wc-big .wc-cap{padding:18px 20px 20px}.wc-big .wc-rtag{padding:4px 10px;font-size:12px}.wc-big .wc-top{top:14px;left:14px;right:14px}.coll-head{justify-content:space-between;align-items:flex-start;gap:var(--s4);margin-bottom:var(--s5);flex-wrap:wrap;display:flex}.coll-head h1{font-family:var(--display);letter-spacing:-.02em;font-size:clamp(24px,2.6vw,32px);font-weight:700}.coll-head .meta{color:var(--fg-soft);margin-top:6px;font-size:14px}.coll-tools{gap:var(--s2);flex-wrap:wrap;align-items:center;display:flex}.search{background:var(--elev);border:1px solid var(--line);color:var(--fg);font-family:var(--body);border-radius:11px;min-width:220px;padding:10px 14px;font-size:14px}.search::placeholder{color:var(--fg-faint)}.search:focus{border-color:var(--fg-soft);outline:none}.select{background:var(--elev);border:1px solid var(--line);color:var(--fg);font-family:var(--body);cursor:pointer;border-radius:11px;padding:10px 12px;font-size:14px}.select:focus{border-color:var(--fg-soft);outline:none}.filters{gap:var(--s2);margin-bottom:var(--s6);flex-wrap:wrap;display:flex}.filters button{background:var(--elev);border:1px solid var(--line);color:var(--fg-soft);border-radius:10px;padding:8px 14px;font-size:13px;font-weight:500;transition:all .15s}.filters button:hover{color:var(--fg)}.filters button.on{color:var(--fg);border-color:var(--fg-soft)}.filters button .sw{border-radius:2px;width:8px;height:8px;margin-right:7px;display:inline-block}.card-btn{text-align:left;cursor:pointer;background:0 0;border:none;width:100%;margin:0;padding:0;display:block}.grid{gap:var(--s5);grid-template-columns:repeat(auto-fill,minmax(200px,1fr));display:grid}.empty{justify-content:center;align-items:center;gap:var(--s3);min-height:44vh;color:var(--fg-soft);text-align:center;flex-direction:column;display:flex}.empty b{font-family:var(--display);color:var(--fg);font-size:19px}.loading{color:var(--fg-faint);padding:var(--s7);text-align:center}.wc.skeleton{border:1px solid var(--line);background:linear-gradient(100deg,#141613 30%,#1c201c 50%,#141613 70%) 0 0/200% 100%;animation:1.2s ease-in-out infinite sk}@keyframes sk{to{background-position:-200% 0}}.modal-backdrop{-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:2147483600;padding:var(--s5);background:#060806b8;justify-content:center;align-items:center;animation:.18s fade;display:flex;position:fixed;inset:0}@keyframes fade{0%{opacity:0}to{opacity:1}}.modal{background:var(--surface);border:1px solid var(--line2);border-radius:var(--radius-lg);gap:var(--s6);width:100%;max-width:740px;max-height:90vh;padding:var(--s6);grid-template-columns:240px 1fr;display:grid;position:relative;overflow:auto}.modal-card{width:240px}.modal-close{color:var(--fg-soft);cursor:pointer;z-index:2;background:0 0;border:none;font-size:28px;line-height:1;position:absolute;top:12px;right:16px}.modal-close:hover{color:var(--fg)}.modal-info{gap:var(--s4);flex-direction:column;justify-content:flex-start;min-width:0;display:flex}.modal-rar{font-family:var(--display);letter-spacing:.04em;font-size:12px;font-weight:700}.modal-rar[data-r=C]{color:var(--r-c)}.modal-rar[data-r=PC]{color:var(--r-pc)}.modal-rar[data-r=R]{color:var(--r-r)}.modal-rar[data-r=SR]{color:var(--r-sr)}.modal-rar[data-r=UR]{color:var(--r-ur)}.modal-rar[data-r=L]{color:var(--r-l)}.modal-name{font-family:var(--display);letter-spacing:-.01em;font-size:26px;font-weight:700;line-height:1.15}.modal-cat{color:var(--fg-soft);font-size:14px;line-height:1.45}.modal-sum{color:var(--fg-soft);-webkit-line-clamp:4;-webkit-box-orient:vertical;font-size:13.5px;line-height:1.55;display:-webkit-box;overflow:hidden}.modal-sum.muted{color:var(--fg-faint)}.statboxes{gap:var(--s3);margin:var(--s1) 0;grid-template-columns:1fr 1fr;display:grid}.statbox{background:var(--elev);border:1px solid var(--line);border-radius:12px;align-items:center;gap:11px;padding:12px 14px;display:flex}.statbox[data-k=atk]{--sc:#f26d6d}.statbox[data-k=def]{--sc:#5aa2ff}.statbox svg{width:20px;height:20px;color:var(--sc);flex:none}.statbox .v{color:var(--sc);font-family:var(--display);font-variant-numeric:tabular-nums;font-size:20px;font-weight:700;line-height:1.1}.statbox .l{color:var(--fg-faint);font-size:11px}.modal-meta{gap:var(--s5);margin-top:var(--s1);flex-wrap:wrap;display:flex}.modal-meta>div{flex-direction:column;gap:2px;display:flex}.modal-meta .l{color:var(--fg-faint);font-size:11px}.modal-meta .v{font-family:var(--display);font-variant-numeric:tabular-nums;font-size:15px;font-weight:600}.modal .btn{text-align:center;text-decoration:none}.modal-wiki{color:var(--accent);align-self:flex-start;font-size:13.5px;font-weight:600;text-decoration:none}.modal-wiki:hover{text-decoration:underline}.actions{border-top:1px solid var(--line);padding-top:var(--s4)}.modal-credit{color:var(--fg-faint);font-size:11px}@media (prefers-reduced-motion:reduce){.flip-in{animation:none}.pack,.wc{transition:none}}@media (width<=900px){:root{--sidebar:100%}.app{grid-template-columns:1fr}.side{align-items:center;gap:var(--s4);height:auto;padding:var(--s3) var(--s4);z-index:6;flex-flow:wrap;position:sticky;top:0}.side .brand{margin-right:auto}.side-foot{flex-direction:row;align-items:center;margin-top:0}.nav{flex-direction:row}.nav a{padding:9px 12px}}@media (width<=560px){.modal{text-align:center;justify-items:center;gap:var(--s4);padding:var(--s5);grid-template-columns:1fr}.modal-card{width:190px}.modal-figs{justify-content:center}.grid{gap:var(--s4);grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}}.tags{margin-top:var(--s1)}.tags-label{color:var(--fg-faint);margin-bottom:6px;font-size:11px}.tags-row{flex-wrap:wrap;align-items:center;gap:6px;display:flex}.tag{background:var(--elev);border:1px solid var(--line2);color:var(--fg);border-radius:8px;align-items:center;gap:5px;padding:4px 8px;font-size:12px;display:inline-flex}.tag button{color:var(--fg-faint);cursor:pointer;background:0 0;border:none;padding:0;font-size:14px;line-height:1}.tag button:hover{color:var(--fg)}.tag-input{background:var(--elev);border:1px solid var(--line);min-width:120px;color:var(--fg);font-family:var(--body);border-radius:8px;flex:1;padding:7px 10px;font-size:13px}.tag-input:focus{border-color:var(--fg-soft);outline:none}.actions{gap:var(--s2);margin-top:var(--s2);display:flex}.actions .btn{flex:1}.btn.danger{color:#f0a0a0;border-color:#5a2b2b}.btn.danger:hover{color:#f8caca;border-color:#f26d6d}.auction{margin-top:var(--s2);background:var(--elev);border:1px solid var(--line);border-radius:12px;flex-direction:column;gap:8px;padding:14px;display:flex}.af-label{color:var(--fg-faint);text-transform:uppercase;letter-spacing:.06em;font-size:11px}.af-input{background:var(--surface);border:1px solid var(--line2);color:var(--fg);font-family:var(--body);border-radius:9px;padding:9px 12px;font-size:14px}.af-input:focus{border-color:var(--accent);outline:none}.af-durations{flex-wrap:wrap;gap:6px;display:flex}.af-durations button{background:var(--surface);border:1px solid var(--line2);color:var(--fg-soft);cursor:pointer;border-radius:8px;padding:6px 12px;font-size:13px}.af-durations button.on{border-color:var(--accent);color:var(--accent)}.af-actions{gap:8px;margin-top:4px;display:flex}.af-actions .btn{flex:1}.modal-msg{color:#f0a0a0;font-size:12.5px}.modal-tabs{background:var(--elev);border:1px solid var(--line);border-radius:10px;align-self:flex-start;gap:4px;margin-top:2px;padding:3px;display:inline-flex}.modal-tabs button{color:var(--fg-soft);font-family:var(--display);cursor:pointer;background:0 0;border:none;border-radius:8px;padding:6px 14px;font-size:13px;font-weight:600;transition:all .15s}.modal-tabs button.on{background:var(--accent);color:var(--accent-ink)}.market-grid{gap:var(--s3);margin-top:var(--s1);grid-template-columns:repeat(4,1fr);display:grid}.mstat{background:var(--elev);border:1px solid var(--line);text-align:center;border-radius:12px;padding:12px 10px}.mstat .l{color:var(--fg-faint);font-size:10.5px}.mstat .v{font-family:var(--display);font-variant-numeric:tabular-nums;margin-top:2px;font-size:20px;font-weight:700}.market-active{color:var(--fg-soft);margin-top:var(--s2);padding-top:var(--s3);border-top:1px solid var(--line);font-size:13px}.market-active b{color:var(--fg);font-variant-numeric:tabular-nums;font-weight:700}@media (width<=560px){.market-grid{grid-template-columns:repeat(2,1fr)}}.cstats{gap:var(--s4) var(--s6);flex-wrap:wrap;display:flex}.cs{flex-direction:column;gap:1px;display:flex}.cs .v{font-family:var(--display);font-variant-numeric:tabular-nums;font-size:17px;font-weight:700;line-height:1.1}.cs .l{color:var(--fg-faint);letter-spacing:.02em;font-size:10.5px}.cs[data-k=atk] .v{color:#f26d6d}.cs[data-k=def] .v{color:#5aa2ff}.modal-backdrop,.modal{overscroll-behavior:contain}");
	initCapture();
	var CORE = /^\/(pulls|collection)?\/?$/;
	var isCore = () => CORE.test(location.pathname);
	var instance = null;
	var host = null;
	var hideStyle = null;
	function showOverlay() {
		if (host) return;
		host = document.createElement("div");
		host.id = "wm-app-root";
		document.body.appendChild(host);
		hideStyle = document.createElement("style");
		hideStyle.id = "wm-hide-real";
		hideStyle.textContent = "html,body{margin:0;background:#0C0D0C}body>*:not(#wm-app-root){display:none !important}";
		document.head.appendChild(hideStyle);
		instance = mount(App, { target: host });
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
	function sync() {
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
