import { describe, it, expect } from 'vitest';
import en from '../src/i18n/en.json';
import zh from '../src/i18n/zh.json';

describe('Pipeline Content Translations', () => {
    const requiredKeys = [
        'pipeline.overview.title',
        'pipeline.overview.hero_desc',
        'pipeline.overview.proof.eyebrow',
        'pipeline.overview.proof.title',
        'pipeline.overview.roster.title',
        'pipeline.bp326.metrics.title',
        'pipeline.bp326.metrics.desc',
        'pipeline.bp326.metric.aa',
        'pipeline.bp326.metric.aa.label',
        'pipeline.bp326.metric.time',
        'pipeline.bp326.metric.time.label',
        'pipeline.bp326.metric.time.sub',
        'pipeline.bp326.metric.affinity',
        'pipeline.bp326.metric.affinity.label',
        'pipeline.bp326.methodology.title',
        'pipeline.bp326.methodology.desc'
    ];

    it('should have all required pipeline keys in EN', () => {
        requiredKeys.forEach(key => {
            expect(en).toHaveProperty(key);
        });
    });

    it('should have all required pipeline keys in ZH', () => {
        requiredKeys.forEach(key => {
            expect(zh).toHaveProperty(key);
        });
    });
});
