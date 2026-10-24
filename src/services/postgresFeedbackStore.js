import { calculateFeedbackMetrics, createFeedbackId } from "./feedbackStore.js";

let pgPoolClass = null;

async function getPoolClass() {
  if (pgPoolClass) return pgPoolClass;
  try {
    const pg = await import("pg");
    pgPoolClass = (pg.default || pg).Pool;
    return pgPoolClass;
  } catch {
    return null;
  }
}

export class PostgresFeedbackStore {
  constructor({ connectionString, ssl = false, sslRejectUnauthorized = true, pool } = {}) {
    this.connectionString = connectionString;
    this.ssl = ssl;
    this.sslRejectUnauthorized = sslRejectUnauthorized;
    this.pool = pool ?? null;
    this.ready = null;
  }

  async ensureReady() {
    if (!this.pool) {
      const Pool = await getPoolClass();
      if (!Pool) {
        throw new Error("The 'pg' package is not installed. Please run 'npm install pg' or remove DATABASE_URL to use local file storage.");
      }
      const poolConfig = { connectionString: this.connectionString };
      if (this.ssl) {
        poolConfig.ssl = { rejectUnauthorized: this.sslRejectUnauthorized };
      }
      this.pool = new Pool(poolConfig);
    }

    if (!this.ready) {
      this.ready = this.pool.query(`
        CREATE TABLE IF NOT EXISTS ai_shield_feedback (
          id VARCHAR(15) PRIMARY KEY,
          rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
          category VARCHAR(32) NOT NULL,
          comment VARCHAR(500) NOT NULL DEFAULT '',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `).catch((error) => {
        this.ready = null;
        throw error;
      });
    }

    return this.ready;
  }

  async append({ rating, category, comment }) {
    await this.ensureReady();
    const id = createFeedbackId();
    const result = await this.pool.query(
      `INSERT INTO ai_shield_feedback (id, rating, category, comment)
       VALUES ($1, $2, $3, $4)
       RETURNING id, rating, category, comment, created_at AS "createdAt"`,
      [id, rating, category, comment],
    );
    return result.rows[0];
  }

  async getAdminView() {
    await this.ensureReady();
    const result = await this.pool.query(
      `SELECT id, rating, category, comment, created_at AS "createdAt"
       FROM ai_shield_feedback
       ORDER BY created_at DESC`,
    );
    const feedback = result.rows.map((record) => ({
      ...record,
      rating: Number(record.rating),
      createdAt: new Date(record.createdAt).toISOString(),
    }));

    return {
      feedback,
      metrics: calculateFeedbackMetrics(feedback),
      storage: {
        durableOnRender: true,
        type: "postgresql",
      },
    };
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
    }
  }
}
