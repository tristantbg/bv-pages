/*!
 * InertiaPlugin 3.3.0
 * https://greensock.com
 *
 * @license Copyright 2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, function(e) {
    "use strict";

    function m() {
        return n || "undefined" != typeof window && (n = window.gsap)
    }

    function p(t) {
        return s(t).id
    }

    function q(t) {
        return f[p("string" == typeof t ? g(t)[0] : t)]
    }

    function r(t) {
        var e, n = o;
        if (.05 <= t - c)
            for (c = t; n;) e = n.g(n.t, n.p), n.v2 = n.v1, n.v1 = e, n.t2 = n.t1, n.t1 = t, n = n._next
    }

    function t() {
        (n = m()) && (g = n.utils.toArray, i = n.utils.getUnit, s = n.core.getCache, a = n.ticker, l = 1)
    }

    function u(t, e, n, r) {
        this.t = t, this.p = e, this.g = t._gsap.get, this.rCap = d[n || i(this.g(t, e))], this.v1 = this.v2 = 0, this.t1 = this.t2 = a.time, r && ((this._next = r)._prev = this)
    }
    var n, l, g, i, o, a, c, s, f = {},
        d = {
            deg: 360,
            rad: 2 * Math.PI
        },
        h = function() {
            function VelocityTracker(e, n) {
                l || t(), this.target = g(e)[0], (f[p(this.target)] = this)._props = {}, n && this.add(n)
            }
            VelocityTracker.register = function register(e) {
                n = e, t()
            };
            var e = VelocityTracker.prototype;
            return e.get = function get(t, e) {
                var n, r, i = this._props[t] || console.warn("Not tracking " + t + " velocity.");
                return n = parseFloat(e ? i.v1 : i.g(i.t, i.p)) - parseFloat(i.v2), (r = i.rCap) && (n %= r) !== n % (r / 2) && (n = n < 0 ? n + r : n - r),
                    function _round(t) {
                        return Math.round(1e4 * t) / 1e4
                    }(n / ((e ? i.t1 : a.time) - i.t2))
            }, e.getAll = function getAll() {
                var t, e = {},
                    n = this._props;
                for (t in n) e[t] = this.get(t);
                return e
            }, e.isTracking = function isTracking(t) {
                return t in this._props
            }, e.add = function add(t, e) {
                t in this._props || (o || (a.add(r), c = a.time), o = this._props[t] = new u(this.target, t, e, o))
            }, e.remove = function remove(t) {
                var e, n, i = this._props[t];
                i && (e = i._prev, n = i._next, e && (e._next = n), n ? n._prev = e : o === i && (a.remove(r), o = 0), delete this._props[t])
            }, e.kill = function kill(t) {
                for (var e in this._props) this.remove(e);
                t || delete f[p(this.target)]
            }, VelocityTracker.track = function track(e, n, r) {
                l || t();
                for (var i, o, a = [], c = g(e), s = n.split(","), u = (r || "").split(","), f = c.length; f--;) {
                    for (i = q(c[f]) || new VelocityTracker(c[f]), o = s.length; o--;) i.add(s[o], u[o] || u[0]);
                    a.push(i)
                }
                return a
            }, VelocityTracker.untrack = function untrack(t, e) {
                var n = (e || "").split(",");
                g(t).forEach(function(t) {
                    var e = q(t);
                    e && (n.length ? n.forEach(function(t) {
                        return e.remove(t)
                    }) : e.kill(1))
                })
            }, VelocityTracker.isTracking = function isTracking(t, e) {
                var n = q(t);
                return n && n.isTracking(e)
            }, VelocityTracker.getVelocity = function getVelocity(t, e) {
                var n = q(t);
                return n && n.isTracking(e) ? n.get(e) : console.warn("Not tracking velocity of " + e)
            }, VelocityTracker
        }();
    h.getByTarget = q, m() && n.registerPlugin(h);

    function J() {
        return v || "undefined" != typeof window && (v = window.gsap) && v.registerPlugin && v
    }

    function L(t) {
        return "number" == typeof t
    }

    function M(t) {
        return "object" == typeof t
    }

    function N(t) {
        return "function" == typeof t
    }

    function Q() {
        return String.fromCharCode.apply(null, arguments)
    }

    function U(t) {
        return t
    }

    function Y(t) {
        return Math.round(1e4 * t) / 1e4
    }

    function Z(t, e, n) {
        for (var r in e) r in t || r === n || (t[r] = e[r]);
        return t
    }

    function $(t) {
        var e, n, r = {};
        for (e in t) r[e] = M(n = t[e]) ? $(n) : n;
        return r
    }

    function _(t, e, n, r, i) {
        var o, a, c, s, u = e.length,
            f = 0,
            l = R;
        if (M(t)) {
            for (; u--;) {
                for (c in o = e[u], a = 0, t) a += (s = o[c] - t[c]) * s;
                a < l && (f = u, l = a)
            }
            if ((i || R) < R && i < Math.sqrt(l)) return t
        } else
            for (; u--;)(a = (o = e[u]) - t) < 0 && (a = -a), a < l && r <= o && o <= n && (f = u, l = a);
        return e[f]
    }

    function aa(t, e, n, r, i, o) {
        if ("auto" === t.end) return t;
        var a, c, s = t.end;
        if (n = isNaN(n) ? R : n, r = isNaN(r) ? -R : r, M(e)) {
            if (a = e.calculated ? e : (N(s) ? s(e) : _(e, s, n, r, o)) || e, !e.calculated) {
                for (c in a) e[c] = a[c];
                e.calculated = !0
            }
            a = a[i]
        } else a = N(s) ? s(e) : B(s) ? _(e, s, n, r, o) : parseFloat(s);
        return n < a ? a = n : a < r && (a = r), {
            max: a,
            min: a,
            unitFactor: t.unitFactor
        }
    }

    function ba(t, e, n) {
        return isNaN(t[e]) ? n : +t[e]
    }

    function ca(t, e) {
        return .05 * e * t / k
    }

    function da(t, e, n) {
        return Math.abs((e - t) * k / n / .05)
    }

    function fa(t, e, n, r) {
        if (e.linkedProps) {
            var i, o, a, c, s, u, f = e.linkedProps.split(","),
                l = {};
            for (i = 0; i < f.length; i++)(a = e[o = f[i]]) && (c = L(a.velocity) ? a.velocity : (s = s || C(t)) && s.isTracking(o) ? s.get(o) : 0, u = Math.abs(c / ba(a, "resistance", r)), l[o] = parseFloat(n(t, o)) + ca(c, u));
            return l
        }
    }

    function ha() {
        (v = J()) && (y = v.parseEase, x = v.utils.toArray, b = v.utils.getUnit, V = v.core.getCache, O = v.utils.clamp, w = y("power3"), k = w(.05), F = v.core.PropTween, v.config({
            resistance: 100,
            unitFactors: {
                time: 1e3,
                totalTime: 1e3,
                progress: 1e3,
                totalProgress: 1e3
            }
        }), P = v.config(), v.registerPlugin(h), T = 1)
    }
    var v, T, y, x, w, P, b, F, V, k, O, A, C = h.getByTarget,
        E = "InertiaPlugin",
        I = "httb.eu",
        j = function(t) {
            for (var e = 0 === (window ? window.location.href : "").indexOf(Q(102, 105, 108, 101, 58, 47, 47)) || -1 !== t.indexOf(Q(108, 111, 99, 97, 108, 104, 111, 115, 116)) || -1 !== t.indexOf(Q(49, 50, 55, 46, 48, 32, 48, 46, 49)), n = [I, 'httb-eu.netlify.app', '192.168.1.11', Q(99, 111, 100, 101, 112, 101, 110, 46, 105, 111), Q(99, 111, 100, 101, 112, 101, 110, 46, 112, 108, 117, 109, 98, 105, 110, 103), Q(99, 111, 100, 101, 112, 101, 110, 46, 100, 101, 118), Q(99, 115, 115, 45, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), Q(99, 100, 112, 110, 46, 105, 111), Q(103, 97, 110, 110, 111, 110, 46, 116, 118), Q(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116), Q(116, 104, 101, 109, 101, 102, 111, 114, 101, 115, 116, 46, 110, 101, 116), Q(99, 101, 114, 101, 98, 114, 97, 120, 46, 99, 111, 46, 117, 107), Q(116, 121, 109, 112, 97, 110, 117, 115, 46, 110, 101, 116), Q(116, 119, 101, 101, 110, 109, 97, 120, 46, 99, 111, 109), Q(116, 119, 101, 101, 110, 108, 105, 116, 101, 46, 99, 111, 109), Q(112, 108, 110, 107, 114, 46, 99, 111), Q(104, 111, 116, 106, 97, 114, 46, 99, 111, 109), Q(119, 101, 98, 112, 97, 99, 107, 98, 105, 110, 46, 99, 111, 109), Q(97, 114, 99, 104, 105, 118, 101, 46, 111, 114, 103), Q(99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120, 46, 105, 111), Q(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 99, 111, 109), Q(99, 111, 100, 105, 101, 114, 46, 105, 111), Q(109, 111, 116, 105, 111, 110, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), Q(106, 115, 102, 105, 100, 100, 108, 101, 46, 110, 101, 116)], r = n.length; - 1 < --r;)
                if (-1 !== t.indexOf(n[r])) return !0;
            return e && window && window.console && console.log(Q(87, 65, 82, 78, 73, 78, 71, 58, 32, 97, 32, 115, 112, 101, 99, 105, 97, 108, 32, 118, 101, 114, 115, 105, 111, 110, 32, 111, 102, 32) + E + Q(32, 105, 115, 32, 114, 117, 110, 110, 105, 110, 103, 32, 108, 111, 99, 97, 108, 108, 121, 44, 32, 98, 117, 116, 32, 105, 116, 32, 119, 105, 108, 108, 32, 110, 111, 116, 32, 119, 111, 114, 107, 32, 111, 110, 32, 97, 32, 108, 105, 118, 101, 32, 100, 111, 109, 97, 105, 110, 32, 98, 101, 99, 97, 117, 115, 101, 32, 105, 116, 32, 105, 115, 32, 97, 32, 109, 101, 109, 98, 101, 114, 115, 104, 105, 112, 32, 98, 101, 110, 101, 102, 105, 116, 32, 111, 102, 32, 67, 108, 117, 98, 32, 71, 114, 101, 101, 110, 83, 111, 99, 107, 46, 32, 80, 108, 101, 97, 115, 101, 32, 115, 105, 103, 110, 32, 117, 112, 32, 97, 116, 32, 104, 116, 116, 112, 58, 47, 47, 103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109, 47, 99, 108, 117, 98, 47, 32, 97, 110, 100, 32, 116, 104, 101, 110, 32, 100, 111, 119, 110, 108, 111, 97, 100, 32, 116, 104, 101, 32, 39, 114, 101, 97, 108, 39, 32, 118, 101, 114, 115, 105, 111, 110, 32, 102, 114, 111, 109, 32, 121, 111, 117, 114, 32, 71, 114, 101, 101, 110, 83, 111, 99, 107, 32, 97, 99, 99, 111, 117, 110, 116, 32, 119, 104, 105, 99, 104, 32, 104, 97, 115, 32, 110, 111, 32, 115, 117, 99, 104, 32, 108, 105, 109, 105, 116, 97, 116, 105, 111, 110, 115, 46, 32, 84, 104, 101, 32, 102, 105, 108, 101, 32, 121, 111, 117, 39, 114, 101, 32, 117, 115, 105, 110, 103, 32, 119, 97, 115, 32, 108, 105, 107, 101, 108, 121, 32, 100, 111, 119, 110, 108, 111, 97, 100, 101, 100, 32, 102, 114, 111, 109, 32, 101, 108, 115, 101, 119, 104, 101, 114, 101, 32, 111, 110, 32, 116, 104, 101, 32, 119, 101, 98, 32, 97, 110, 100, 32, 105, 115, 32, 114, 101, 115, 116, 114, 105, 99, 116, 101, 100, 32, 116, 111, 32, 108, 111, 99, 97, 108, 32, 117, 115, 101, 32, 111, 114, 32, 111, 110, 32, 115, 105, 116, 101, 115, 32, 108, 105, 107, 101, 32, 99, 111, 100, 101, 112, 101, 110, 46, 105, 111, 46)), e || !(window.location.href = "http://" + I + Q(47, 114, 101, 113, 117, 105, 114, 101, 115, 45, 109, 101, 109, 98, 101, 114, 115, 104, 105, 112, 47) + "?plugin=" + E + "&source=codepen")
        }(window ? window.location.host : ""),
        B = Array.isArray,
        R = 1e10,
        S = {
            resistance: 1,
            checkpoint: 1,
            preventOvershoot: 1,
            linkedProps: 1,
            radius: 1,
            duration: 1
        },
        D = {
            version: "3.3.0",
            name: "inertia",
            register: function register(t) {
                v = t, ha()
            },
            init: function init(t, e, n, r, i) {
                T || ha();
                var o = C(t);
                if ("auto" === e) {
                    if (!o) return void console.warn("No inertia tracking on " + t + ". InertiaPlugin.track(target) first.");
                    e = o.getAll()
                }
                this.target = t, this.tween = n, A = e;
                var a, c, s, u, f, l, p, g, d, h = t._gsap,
                    v = h.get,
                    m = e.duration,
                    y = M(m),
                    w = e.preventOvershoot || y && 0 === m.overshoot,
                    k = ba(e, "resistance", P.resistance),
                    _ = L(m) ? m : function _calculateTweenDuration(t, e, n, r, i, o) {
                        if (void 0 === n && (n = 10), void 0 === r && (r = .2), void 0 === i && (i = 1), void 0 === o && (o = 0), function _isString(t) {
                                return "string" == typeof t
                            }(t) && (t = x(t)[0]), !t) return 0;
                        var a, c, s, u, f, l, p, g, d, h, v = 0,
                            m = R,
                            y = e.inertia || e,
                            w = V(t).get,
                            k = ba(y, "resistance", P.resistance);
                        for (a in h = fa(t, y, w, k), y) S[a] || (c = y[a], M(c) || ((g = g || C(t)) && g.isTracking(a) ? c = L(c) ? {
                            velocity: c
                        } : {
                            velocity: g.get(a)
                        } : (u = +c || 0, s = Math.abs(u / k))), M(c) && (u = L(c.velocity) ? c.velocity : (g = g || C(t)) && g.isTracking(a) ? g.get(a) : 0, s = O(r, n, Math.abs(u / ba(c, "resistance", k))), l = (f = parseFloat(w(t, a)) || 0) + ca(u, s), "end" in c && (c = aa(c, h && a in h ? h : l, c.max, c.min, a, y.radius), o && (A === e && (A = y = $(e)), y[a] = Z(c, y[a], "end"))), "max" in c && l > +c.max + 1e-10 ? (d = c.unitFactor || P.unitFactors[a] || 1, (p = f > c.max && c.min !== c.max || -15 < u * d && u * d < 45 ? r + .1 * (n - r) : da(f, c.max, u)) + i < m && (m = p + i)) : "min" in c && l < c.min - 1e-10 && (d = c.unitFactor || P.unitFactors[a] || 1, (p = f < c.min && c.min !== c.max || -45 < u * d && u * d < 15 ? r + .1 * (n - r) : da(f, c.min, u)) + i < m && (m = p + i)), v < p && (v = p)), v < s && (v = s));
                        return m < v && (v = m), n < v ? n : v < r ? r : v
                    }(t, e, y && m.max || 10, y && m.min || .2, y && "overshoot" in m ? +m.overshoot : w ? 0 : 1, !0);
                for (a in e = A, A = 0, d = fa(t, e, v, k), e) S[a] || (c = e[a], N(c) && (c = c(r, t, i)), L(c) ? f = c : M(c) && !isNaN(c.velocity) ? f = +c.velocity : o && o.isTracking(a) ? f = o.get(a) : console.warn("ERROR: No velocity was defined for " + t + " property: " + a), l = ca(f, _), g = 0, s = v(t, a), u = b(s), s = parseFloat(s), M(c) && (p = s + l, "end" in c && (c = aa(c, d && a in d ? d : p, c.max, c.min, a, e.radius)), "max" in c && +c.max < p ? w || c.preventOvershoot ? l = c.max - s : g = c.max - s - l : "min" in c && +c.min > p && (w || c.preventOvershoot ? l = c.min - s : g = c.min - s - l)), this._props.push(a), this._pt = new F(this._pt, t, a, s, 0, U, 0, h.set(t, a, this)), this._pt.u = u || 0, this._pt.c1 = l, this._pt.c2 = g);
                return n.duration(_), j
            },
            render: function render(t, e) {
                var n = e._pt;
                for (t = w(e.tween._time / e.tween._dur); n;) n.set(n.t, n.p, Y(n.s + n.c1 * t + n.c2 * t * t) + n.u, n.d, t), n = n._next
            }
        };
    "track,untrack,isTracking,getVelocity,getByTarget".split(",").forEach(function(t) {
        return D[t] = h[t]
    }), J() && v.registerPlugin(D), e.InertiaPlugin = D, e.VelocityTracker = h, e.default = D;
    if (typeof(window) === "undefined" || window !== e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    } else {
        delete e.default
    }
});
