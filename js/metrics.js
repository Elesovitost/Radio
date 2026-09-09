/* =============================================================
   metrics.js
   Module extracted from index.html inline <script>.
   Edit this file - NOT index.html - to change this part.
   ============================================================= */

/* ═══════════════════════════════════════════════
   METRICS HELPER
═══════════════════════════════════════════════ */
const MetricsEngine = {
       getSuvText: function(suvStr) {
        if (!APP_SETTINGS.suvWord) return `se SUVmax = ${suvStr}`;
        const suv = extractNumber(suvStr);
        if (isNaN(suv)) return `se SUVmax = ${suvStr}`;
        
        const refLiv = extractNumber(Store.fields['suv_jater'] || '3.0');
        const refPar = extractNumber(Store.fields['suv_parotid'] || '20.0');
        const refSle = extractNumber(Store.fields['suv_sleziny'] || '15.0');
        const refStr = extractNumber(Store.fields['suv_striata'] || '2.0');
        const exam = (Store.activeTab || '').toLowerCase();
        
        if (exam.includes('psma')) {
            const pctLiv = suv / refLiv;
            if (pctLiv <= 0.1) return "bez patrné akumulace RF";
            if (pctLiv <= 0.3) return "s akumulací RF pod úrovní ref. poolu";
            if (pctLiv <= 1.0) return "s akumulací RF pod úrovní ref. jater";
            if (suv < refPar) return "s akumulací RF nad úrovní ref. jater";
            return "s akumulací RF nad úrovní ref. parotid";
        } else if (exam.includes('dotatoc')) {
            const pctLiv = suv / refLiv;
            if (pctLiv <= 0.1) return "bez patrné akumulace RF";
            if (pctLiv < 0.9) return "s akumulací RF pod úrovní ref. jater";
            if (pctLiv <= 1.1) return "s akumulací RF na úrovni ref. jater";
            if (suv < refSle) return "s akumulací RF nad úrovní ref. jater";
            return "s akumulací RF nad úrovní ref. sleziny";
        } else if (exam.includes('dopa') && exam.includes('mozek')) {
            const pctStr = suv / refStr;
            if (pctStr <= 0.2) return "bez patrné akumulace RF";
            if (pctStr >= 0.8 && pctStr <= 1.2) return "s akumulací RF obdobnou jako ref. striatum";
            if (pctStr < 0.8) return `s akumulací RF ${Math.round(pctStr * 10) * 10}% úrovně ref. kontralaterálního striata`;
            if (pctStr <= 3.0) return `s akumulací RF ${(Math.round(pctStr * 10) / 10).toString().replace('.', ',')}násobku ref. kontralaterálního striata`;
            return `s akumulací RF ${(Math.round(pctStr * 2) / 2).toString().replace('.', ',')}násobku ref. kontralaterálního striata`;
        } else {
            const pctLiv = suv / refLiv;
            if (pctLiv <= 0.2) return "bez patrné akumulace RF";
            if (pctLiv >= 0.8 && pctLiv <= 1.2) return "s akumulací RF obdobnou jako ref. játra";
            if (pctLiv < 0.8) return `s akumulací RF ${Math.round(pctLiv * 10) * 10}% úrovně ref. jaterního parenchymu`;
            if (pctLiv <= 3.0) return `s akumulací RF ${(Math.round(pctLiv * 10) / 10).toString().replace('.', ',')}násobku ref. jaterního parenchymu`;
            return `s akumulací RF ${(Math.round(pctLiv * 2) / 2).toString().replace('.', ',')}násobku ref. jaterního parenchymu`;
        }
    },

    getAutoActivityLevel: function(suvVal, refLiv, refPar, refSle, refStr, examId) {
        if (isNaN(suvVal) || suvVal < 0) return 0;
        const exam = examId.toLowerCase();
        if (exam.includes('psma')) {
            if (isNaN(refLiv) || refLiv <= 0) return 0;
            const par = (!isNaN(refPar) && refPar > 0) ? refPar : refLiv * 3;
            if (suvVal <= refLiv * 0.1) return 1;
            if (suvVal < refLiv * 0.3) return 2;
            if (suvVal <= refLiv) return 3;
            if (suvVal < par) return 4;
            return 5;
        }
        if (exam.includes('dotatoc')) {
            if (isNaN(refLiv) || refLiv <= 0) return 0;
            const sle = (!isNaN(refSle) && refSle > 0) ? refSle : refLiv * 5;
            if (suvVal <= refLiv * 0.1) return 1;
            if (suvVal < refLiv * 0.9) return 2;
            if (suvVal <= refLiv * 1.1) return 3;
            if (suvVal < sle) return 4;
            return 5;
        }
        if (exam.includes('dopa') && exam.includes('mozek')) {
            if (isNaN(refStr) || refStr <= 0) return 0;
            const r = suvVal / refStr;
            if (r < 0.2) return 1; 
            if (r < 0.8) return 2; 
            if (r <= 1.2) return 3; 
            if (r <= 1.5) return 4; 
            return 5; 
        }
        if (exam.includes('dopa')) {
            return 0;
        }
        if (isNaN(refLiv) || refLiv <= 0) return 0;
        const r = suvVal / refLiv;
        if (r < 0.2) return 1; 
        if (r < 0.8) return 2; 
        if (r <= 1.2) return 3; 
        if (r <= 1.5) return 4; 
        return 5; 
    },

    updateActivityForField: function(fieldId, newValue) {
        if (fieldId === 'suv_jater_minule' || fieldId.endsWith('_suv_old')) return;

        const refFields = ['suv_jater', ...Object.values(RADIOFARM_CONFIG).flatMap(cfg => Object.keys(cfg.defaults))];

        if (refFields.includes(fieldId)) {
            for (const key in Store.fields) {
                if (key.endsWith('_suv') && !key.endsWith('_suv_old') && !refFields.includes(key)) {
                    this.updateSingleActivity(key, Store.fields[key]);
                }
            }
        } else if (fieldId.endsWith('_suv')) {
            this.updateSingleActivity(fieldId, newValue);
        }
    },

    updateSingleActivity: function(suvFieldId, suvValue) {
        const actFieldId = suvFieldId.replace('_suv', '_act');
        if (!ButtonConfigs[actFieldId]) return;
        const suvVal = extractNumber(suvValue || '');
        const refLiv = extractNumber(Store.fields['suv_jater'] || '3.0');
        const refPar = extractNumber(Store.fields['suv_parotid'] || '20.0');
        const refSle = extractNumber(Store.fields['suv_sleziny'] || '15.0');
        const refStr = extractNumber(Store.fields['suv_striata'] || '2.0');
        const examId = Store.activeTab || '';
        const newActIndex = this.getAutoActivityLevel(suvVal, refLiv, refPar, refSle, refStr, examId);
        if (Store.buttonStates[actFieldId] !== newActIndex) {
           Store.buttonStates = { ...Store.buttonStates, [actFieldId]: newActIndex };
        }
    },

    getPctChange: function(curr, min) {
        if (!min || min <= 0) return null;
        return ((curr - min) / min) * 100;
    },

    getNormalizedSuv: function(suv, refLiv) {
        return (refLiv && refLiv > 0) ? (suv / refLiv) : suv;
    },

    getSuvDynamicsWord: function(currSuv, minSuv, cLiv, mLiv) {
        const cSuv = extractNumber(currSuv);
        const mSuv = extractNumber(minSuv);
        if (isNaN(cSuv) || isNaN(mSuv) || mSuv <= 0) return "nelze srovnat";
        
        const pct = this.getPctChange(this.getNormalizedSuv(cSuv, cLiv), this.getNormalizedSuv(mSuv, mLiv));
        if (pct === null) return "akumulace byla obdobná";
        
        const absPct = Math.abs(pct);
        if (absPct < 20) return "akumulace byla obdobná";
        
        const mod = absPct < 50 ? "mírně " : (absPct < 75 ? "" : "výrazně ");
        return pct > 0 ? `akumulace byla ${mod}nižší` : `akumulace byla ${mod}vyšší`;
    },

    calculateDynamics: function(currSize, minSize, currSuv, minSuv, cLiv, mLiv, isRecistActive, cntOld) {
        if (cntOld === '0') return "nově";

        let sState = null, aState = null;
        const getMax = (s) => { const n = String(s).match(/\d+(\.\d+)?/g); return n ? Math.max(...n.map(Number)) : null; };
        
        if (currSize && minSize) {
            const cVal = getMax(currSize), mVal = getMax(minSize);
            if (cVal !== null && mVal !== null && mVal > 0) {
                const pct = this.getPctChange(cVal, mVal), absPct = Math.abs(pct);
                sState = { trend: 0, mod: "", pctStr: "" };
                if (absPct > 10) {
                    sState.trend = pct > 0 ? 1 : -1;
                    sState.mod = absPct < 20 ? "mírné" : absPct <= 50 ? "" : "výrazné";
                    if (absPct >= 20 && isRecistActive) sState.pctStr = ` (${pct > 0 ? '+' : '-'}${Math.round(pct / 10) * 10}%)`;
                }
            }
        }

        if (currSuv && minSuv) {
            const cSuv = extractNumber(currSuv), mSuv = extractNumber(minSuv);
            if (!isNaN(cSuv) && !isNaN(mSuv) && mSuv > 0) {
                const pct = this.getPctChange(this.getNormalizedSuv(cSuv, cLiv), this.getNormalizedSuv(mSuv, mLiv));
                if (pct !== null) {
                    const absPct = Math.abs(pct);
                    aState = { trend: 0, mod: "" };
                    if (absPct >= 20) { 
                        aState.trend = pct > 0 ? 1 : -1; 
                        aState.mod = absPct < 50 ? "mírné" : absPct < 75 ? "zřetelné" : "výrazné"; 
                    }
                }
            }
        }

        const format = (st, isSize) => {
            if (st.trend === 0) return isSize ? "rozměrově stacionární" : "akumulačně přibližně stacionární";
            return `${st.mod ? 'v(e) ' + st.mod : 'v'} ${isSize ? 'rozměrové' + st.pctStr : 'akumulační'} ${st.trend === 1 ? 'progresi' : 'regresi'}`.replace('v(e) v', 've v').replace('v(e)', 'v');
        };

        let result = "";
        if (sState && aState) {
            if (sState.trend === 0 && aState.trend === 0) result = "rozměrově i akumulačně přibližně stacionární";
            else if (sState.trend === aState.trend && sState.trend !== 0) {
                const tW = sState.trend === 1 ? 'progresi' : 'regresi';
                result = sState.mod === aState.mod 
                    ? `${sState.mod ? 'v(e) '+sState.mod : 'v'} rozměrové${sState.pctStr} i akumulační ${tW}`.replace('v(e) v', 've v').replace('v(e)', 'v') 
                    : `${sState.mod ? 'v(e) '+sState.mod : 'v'} rozměrové${sState.pctStr} a ${aState.mod} akumulační ${tW}`.replace('v(e) v', 've v').replace('v(e)', 'v');
            } else result = `${format(sState, true)} a ${format(aState, false)}`;
        } else {
            result = sState ? format(sState, true) : aState ? format(aState, false) : "";
        }

        const countPhrase = { méně: 'v početní progresi', více: 'v početní regresi', kolísání: 'se smíšenou odpovědí - část regredovala, část progredovala' }[cntOld] || '';
        if (!countPhrase) return result;
        if (!result) return countPhrase;
        if (cntOld === 'kolísání') return `${result}, ${countPhrase}`;
        return `${countPhrase} a ${result}`;
    }
};
